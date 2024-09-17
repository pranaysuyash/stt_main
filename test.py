from flask import Flask, render_template, request, jsonify, send_file
import os
import logging
from werkzeug.utils import secure_filename
from audio_processing import extract_audio_from_video, generate_waveform
from flask_cors import CORS
import mimetypes

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/static/uploads/*": {"origins": "*"}})
logging.basicConfig(level=logging.DEBUG)

# Ensure uploads directory exists
UPLOAD_FOLDER = 'static/uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 250 * 1024 * 1024  # 250MB max file size
ALLOWED_EXTENSIONS = {'mp3', 'wav', 'mp4', 'avi', 'mov', 'mkv'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Single Error handler for large files
@app.errorhandler(413)
def request_entity_too_large(error):
    app.logger.error('File too large')
    return jsonify({
        'error': 'File too large',
        'max_size': '250MB',
        'message': 'Please try compressing your file or splitting it into smaller parts before uploading.'
    }), 413

@app.route('/')
def index():
    return render_template('index.html')

# Handle file uploads (audio/video)
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        app.logger.error('No file part in request.')
        return jsonify({'error': 'No file part in the request.'}), 400

    files = request.files.getlist('file')
    if not files or len(files) == 0:
        app.logger.error('No files selected for upload.')
        return jsonify({'error': 'No files selected for upload.'}), 400

    allowed_mimetypes = {
        'audio/mpeg',
        'audio/wav',
        'video/mp4',
        'video/x-msvideo',
        'video/quicktime'  # Added to allow .mov files
    }

    uploaded_files = []
    errors = []

    for file in files:
        if file.filename == '':
            app.logger.warning('Empty filename encountered, skipping file.')
            errors.append({'filename': '', 'error': 'Empty filename.'})
            continue  # Skip files with no filename

        if not allowed_file(file.filename):
            app.logger.warning(f'Unsupported file extension: {file.filename}')
            errors.append({'filename': file.filename, 'error': 'Unsupported file extension.'})
            continue

        if file.mimetype not in allowed_mimetypes:
            app.logger.warning(f'Unsupported MIME type: {file.filename} with type {file.mimetype}')
            errors.append({'filename': file.filename, 'error': 'Unsupported MIME type.'})
            continue

        if file.content_length > app.config['MAX_CONTENT_LENGTH']:
            app.logger.warning(f'File too large: {file.filename}')
            errors.append({'filename': file.filename, 'error': 'File size exceeds the 250MB limit.'})
            continue

        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        try:
            file.save(file_path)
            app.logger.info(f'File saved: {file_path}')

            file_info = {
                'filename': filename,
                'path': f'/static/uploads/{filename}',
                'size': os.path.getsize(file_path),
                'type': file.mimetype
            }

            uploaded_files.append(file_info)

        except Exception as e:
            app.logger.error(f'Error processing file {filename}: {e}')
            errors.append({'filename': filename, 'error': 'Failed to process the file.'})

    response = {}
    if uploaded_files:
        response['uploaded_files'] = uploaded_files
    if errors:
        response['errors'] = errors

    status_code = 200 if uploaded_files and not errors else 207  # 207 Multi-Status if partial success

    return jsonify(response), status_code

# Endpoint to fetch waveform for previously uploaded files (optional)
@app.route('/waveform/<filename>', methods=['GET'])
def get_waveform(filename):
    audio_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    waveform_image = os.path.join(app.config['UPLOAD_FOLDER'], 'waveform.png')

    # Check if the file is a video
    if filename.endswith('.mp4') or filename.endswith('.avi') or filename.endswith('.mov') or filename.endswith('.mkv'):
        extract_audio_from_video(audio_path, os.path.join(app.config['UPLOAD_FOLDER'], 'extracted_audio.wav'))
    
    # Generate waveform for audio
    generate_waveform(os.path.join(app.config['UPLOAD_FOLDER'], 'extracted_audio.wav'), waveform_image)

    # Return the waveform image
    return send_file(waveform_image, mimetype='image/png')

@app.route('/api/file_exists', methods=['GET'])
def file_exists():
    filename = request.args.get('filename')
    if not filename:
        return jsonify({'error': 'No filename provided'}), 400

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(filename))
    if os.path.isfile(file_path):
        return jsonify({'exists': True})
    return jsonify({'exists': False})

# List upload history
@app.route('/api/file_history', methods=['GET'])
def file_history():
    files = os.listdir(app.config['UPLOAD_FOLDER'])
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

# Main function to run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555, debug=True)
