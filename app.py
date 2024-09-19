# app.py

from flask import Flask, request, jsonify, send_file
import os
import logging
from werkzeug.utils import secure_filename
from flask_cors import CORS
from celery_app import celery  # Import Celery instance
from celery.result import AsyncResult
import mimetypes

# Initialize Flask app
app = Flask(__name__)

# Determine the absolute path for the upload folder
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'uploads')

# Configure Flask app
app.config.update(
    CELERY_BROKER_URL='redis://localhost:6379/0',
    CELERY_RESULT_BACKEND='redis://localhost:6379/0',
    UPLOAD_FOLDER=UPLOAD_FOLDER,
    MAX_CONTENT_LENGTH=1024 * 1024 * 1024  # 1024 MB max total file size
)

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Set Celery's UPLOAD_FOLDER configuration
celery.conf.update(
    UPLOAD_FOLDER=app.config['UPLOAD_FOLDER']
)

# Configure CORS
CORS(app, resources={
    r"/api/*": {"origins": "*"},
    r"/static/uploads/*": {"origins": "*"}
})

ALLOWED_EXTENSIONS = {'mp3', 'wav', 'mp4', 'avi', 'mov', 'mkv'}

def allowed_file(filename):
    """Check if the file has an allowed extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.errorhandler(413)
def request_entity_too_large(error):
    """Handle file too large error."""
    logger.error('File too large')
    return jsonify({
        'error': 'File too large',
        'max_size': '300MB',
        'message': 'Please try compressing your file or splitting it into smaller parts before uploading.'
    }), 413

@app.route('/api/upload', methods=['POST'])
def upload_file():
    """Handle file uploads."""
    if 'file' not in request.files:
        logger.error('No file part in request.')
        return jsonify({'error': 'No file part in the request.'}), 400

    files = request.files.getlist('file')
    if not files or len(files) == 0:
        logger.error('No files selected for upload.')
        return jsonify({'error': 'No files selected for upload.'}), 400

    allowed_mimetypes = {
        'audio/mpeg',
        'audio/wav',
        'video/mp4',
        'video/x-msvideo',
        'video/quicktime'  
    }

    uploaded_files = []
    errors = []
    task_ids = []

    for file in files:
        if file.filename == '':
            logger.warning('Empty filename encountered, skipping file.')
            errors.append({'filename': '', 'error': 'Empty filename.'})
            continue  

        if not allowed_file(file.filename):
            logger.warning(f'Unsupported file extension: {file.filename}')
            errors.append({'filename': file.filename, 'error': 'Unsupported file extension.'})
            continue

        if file.mimetype not in allowed_mimetypes:
            logger.warning(f'Unsupported MIME type: {file.filename} with type {file.mimetype}')
            errors.append({'filename': file.filename, 'error': 'Unsupported MIME type.'})
            continue

        file.seek(0, os.SEEK_END)
        file_length = file.tell()
        file.seek(0, 0) 

        if file_length > app.config['MAX_CONTENT_LENGTH']:
            logger.warning(f'File too large: {file.filename}')
            errors.append({'filename': file.filename, 'error': 'File size exceeds the 250MB limit.'})
            continue

        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        try:
            file.save(file_path)
            logger.info(f'File saved: {file_path}')

            file_info = {
                'filename': filename,
                'path': f'/static/uploads/{filename}',
                'size': os.path.getsize(file_path),
                'type': file.mimetype
            }
            uploaded_files.append(file_info)

            # Enqueue Celery task using fully qualified task name
            task = celery.send_task('tasks.process_uploaded_file', args=[file_path, filename])
            task_ids.append({'filename': filename, 'task_id': task.id})
            logger.info(f'Task enqueued for {filename} with task ID {task.id}')

        except Exception as e:
            logger.error(f'Error processing file {filename}: {e}')
            errors.append({'filename': filename, 'error': 'Failed to process the file.'})

    response = {}
    if uploaded_files:
        response['uploaded_files'] = uploaded_files
    if task_ids:
        response['task_ids'] = task_ids
    if errors:
        response['errors'] = errors

    status_code = 200 if uploaded_files and not errors else 207  
    return jsonify(response), status_code

@app.route('/api/task_status/<task_id>', methods=['GET'])
def task_status(task_id):
    """Check the status of a Celery task."""
    task = AsyncResult(task_id, app=celery)
    if task.state == 'PENDING':
        response = {
            'state': task.state,
            'status': 'Pending...'
        }
    elif task.state == 'SUCCESS':
        response = {
            'state': task.state,
            'status': 'Task completed successfully.',
            'result': task.result
        }
    elif task.state == 'FAILURE':
        # Access exception information
        response = {
            'state': task.state,
            'status': str(task.info),  # This will include the exception message
            'traceback': task.traceback  # Optional: Include traceback for debugging
        }
    else:
        response = {
            'state': task.state,
            'status': str(task.info)
        }
    return jsonify(response)

@app.route('/api/waveform/<filename>', methods=['GET'])
def get_waveform(filename):
    """Generate and return waveform image for a given audio/video file."""
    audio_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    base_name, ext = os.path.splitext(filename)
    waveform_image = os.path.join(app.config['UPLOAD_FOLDER'], f'{base_name}_waveform.png')

    if not os.path.exists(audio_path):
        logger.error(f'File not found: {audio_path}')
        return jsonify({'error': 'File not found.'}), 404

    if filename.lower().endswith(('.mp4', '.avi', '.mov', '.mkv')):
        extracted_audio = os.path.join(app.config['UPLOAD_FOLDER'], f'{base_name}_audio.wav')
        try:
            # Extract audio
            extract_audio_from_video(audio_path, extracted_audio)

            # Check if audio extraction was successful
            if not os.path.exists(extracted_audio):
                logger.error(f'Audio extraction failed for {filename}')
                return jsonify({'error': 'Failed to extract audio from video.'}), 500

            # Generate waveform
            generate_waveform(extracted_audio, waveform_image)
        except Exception as e:
            logger.error(f'Error generating waveform for {filename}: {e}')
            return jsonify({'error': 'Failed to generate waveform.'}), 500
    else:
        try:
            # Generate waveform directly from audio
            generate_waveform(audio_path, waveform_image)
        except Exception as e:
            logger.error(f'Error generating waveform for {filename}: {e}')
            return jsonify({'error': 'Failed to generate waveform.'}), 500

    if not os.path.exists(waveform_image):
        logger.error(f'Waveform image not found: {waveform_image}')
        return jsonify({'error': 'Waveform image not found.'}), 404

    return send_file(waveform_image, mimetype='image/png')

@app.route('/api/file_exists', methods=['GET'])
def file_exists():
    """Check if a file exists."""
    filename = request.args.get('filename')
    if not filename:
        return jsonify({'error': 'No filename provided'}), 400

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(filename))
    if os.path.isfile(file_path):
        return jsonify({'exists': True})
    return jsonify({'exists': False})

@app.route('/api/file_history', methods=['GET'])
def file_history():
    """Retrieve the list of uploaded files."""
    try:
        files = os.listdir(app.config['UPLOAD_FOLDER'])
    except Exception as e:
        logger.error(f'Error accessing upload folder: {e}')
        return jsonify({'error': 'Failed to access upload folder.'}), 500

    file_list = []
    for f in files:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], f)
        if os.path.isfile(file_path):
            mime_type, _ = mimetypes.guess_type(file_path)
            file_info = {
                'filename': f,
                'path': f'/static/uploads/{f}',
                'size': os.path.getsize(file_path),
                'type': mime_type or 'application/octet-stream',
            }
            file_list.append(file_info)
    return jsonify({'files': file_list})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5555, debug=True)
