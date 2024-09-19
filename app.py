# File: app.py

import os
import mimetypes
from flask import Flask, request, jsonify, send_from_directory, abort
from werkzeug.utils import secure_filename
from flask_cors import CORS
from moviepy.editor import VideoFileClip
from datetime import datetime

app = Flask(__name__)

UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {
    'audio': {'mp3', 'wav', 'aac', 'flac', 'ogg', 'm4a'},
    'video': {'mp4', 'avi', 'mov', 'mkv', 'flv', 'wmv'},
    'image': {'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'}
}
MAX_CONTENT_LENGTH = 300 * 1024 * 1024  # 300MB

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

mimetypes.init()
mimetypes.add_type('audio/mp3', '.mp3')
mimetypes.add_type('audio/wav', '.wav')
mimetypes.add_type('audio/aac', '.aac')
mimetypes.add_type('audio/flac', '.flac')
mimetypes.add_type('audio/ogg', '.ogg')
mimetypes.add_type('audio/m4a', '.m4a')
mimetypes.add_type('video/mp4', '.mp4')
mimetypes.add_type('video/x-msvideo', '.avi')
mimetypes.add_type('video/quicktime', '.mov')
mimetypes.add_type('video/x-matroska', '.mkv')
mimetypes.add_type('video/x-flv', '.flv')
mimetypes.add_type('video/x-ms-wmv', '.wmv')
mimetypes.add_type('image/jpeg', '.jpg')
mimetypes.add_type('image/jpeg', '.jpeg')
mimetypes.add_type('image/png', '.png')
mimetypes.add_type('image/gif', '.gif')
mimetypes.add_type('image/bmp', '.bmp')
mimetypes.add_type('image/webp', '.webp')

CORS(app, resources={r"/api/*": {"origins": "*"}})

def allowed_file(filename):
    """
    Check if the file has an allowed extension.
    """
    if '.' not in filename:
        return False
    ext = filename.rsplit('.', 1)[1].lower()
    for category in ALLOWED_EXTENSIONS:
        if ext in ALLOWED_EXTENSIONS[category]:
            return True
    return False

def get_file_category(filename):
    """
    Determine the category of the file based on its extension.
    Returns 'audio', 'video', 'image', or None.
    """
    if '.' not in filename:
        return None
    ext = filename.rsplit('.', 1)[1].lower()
    for category, extensions in ALLOWED_EXTENSIONS.items():
        if ext in extensions:
            return category
    return None

def extract_audio(video_path, audio_path):
    """
    Extract audio from a video file and save it.
    """
    try:
        with VideoFileClip(video_path) as video:
            audio = video.audio
            if audio:
                audio.write_audiofile(audio_path)
                return True, ""
            else:
                return False, "No audio track found in the video."
    except Exception as e:
        return False, str(e)

@app.route('/api/upload', methods=['POST'])
def upload_file():
    """
    Handle file uploads.
    """
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request.'}), 400
    files = request.files.getlist('file')
    if not files:
        return jsonify({'error': 'No files selected for uploading.'}), 400
    response = {
        'uploaded_files': [],
        'errors': []
    }
    for file in files:
        if file.filename == '':
            response['errors'].append({'filename': '', 'error': 'No selected file.'})
            continue
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            if os.path.exists(file_path):
                response['errors'].append({'filename': filename, 'error': 'File already exists.'})
                continue
            try:
                file.save(file_path)
                file_mime_type = mimetypes.guess_type(file_path)[0] or 'application/octet-stream'
                print(f"Uploaded File: {filename}, MIME Type: {file_mime_type}")  # Debugging log
                file_info = {
                    'filename': filename,
                    'path': f'/static/uploads/{filename}',
                    'size': os.path.getsize(file_path),
                    'type': file_mime_type,
                    'duration': ''
                }
                category = get_file_category(filename)
                if category == 'video':
                    audio_filename = f"{os.path.splitext(filename)[0]}_audio.wav"
                    audio_path = os.path.join(app.config['UPLOAD_FOLDER'], audio_filename)
                    success, message = extract_audio(file_path, audio_path)
                    if success:
                        file_info['extracted_audio'] = {
                            'filename': audio_filename,
                            'path': f'/static/uploads/{audio_filename}',
                            'size': os.path.getsize(audio_path),
                            'type': mimetypes.guess_type(audio_path)[0] or 'application/octet-stream',
                            'duration': ''  
                        }
                        response['uploaded_files'].append(file_info)
                    else:
                        response['errors'].append({'filename': filename, 'error': f'Audio extraction failed: {message}'})
                else:
                    response['uploaded_files'].append(file_info)
            except Exception as e:
                response['errors'].append({'filename': filename, 'error': str(e)})
        else:
            response['errors'].append({'filename': file.filename, 'error': 'File type not allowed.'})
    return jsonify(response), 200

@app.route('/api/file_exists', methods=['GET'])
def file_exists():
    """
    Check if a file with the given filename exists.
    """
    filename = request.args.get('filename', '')
    if not filename:
        return jsonify({'error': 'Filename parameter is missing.'}), 400
    filename = secure_filename(filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    exists = os.path.exists(file_path)
    return jsonify({'exists': exists}), 200

@app.route('/api/file_history', methods=['GET'])
def file_history():
    """
    Retrieve the list of uploaded files with their metadata.
    """
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    file_list = []
    for f in files:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], f)
        if os.path.isfile(file_path):
            mime_type, _ = mimetypes.guess_type(file_path)
            category = get_file_category(f)
            duration = ''
            if category in ['audio', 'video']:
                try:
                    if category == 'audio':
                        from moviepy.editor import AudioFileClip
                        with AudioFileClip(file_path) as clip:
                            duration = str(int(clip.duration // 60)).zfill(2) + ":" + str(int(clip.duration % 60)).zfill(2)
                    elif category == 'video':
                        from moviepy.editor import VideoFileClip
                        with VideoFileClip(file_path) as clip:
                            duration = str(int(clip.duration // 60)).zfill(2) + ":" + str(int(clip.duration % 60)).zfill(2)
                except Exception as e:
                    duration = ''
            file_info = {
                'filename': f,
                'path': f'/static/uploads/{f}',
                'size': os.path.getsize(file_path),
                'type': mime_type or 'application/octet-stream',
                'duration': duration
            }
            file_list.append(file_info)
    return jsonify({'files': file_list}), 200

@app.route('/static/uploads/<path:filename>', methods=['GET'])
def serve_file(filename):
    """
    Serve uploaded files.
    """
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.errorhandler(413)
def request_entity_too_large(error):
    """
    Handle file size limit error.
    """
    return jsonify({'error': 'File is too large. Maximum upload size is 300MB.'}), 413

@app.errorhandler(404)
def not_found(error):
    """
    Handle 404 errors.
    """
    return jsonify({'error': 'Resource not found.'}), 404

@app.errorhandler(405)
def method_not_allowed(error):
    """
    Handle 405 errors.
    """
    return jsonify({'error': 'Method not allowed.'}), 405

@app.errorhandler(Exception)
def handle_exception(e):
    """
    Handle generic exceptions.
    """
    return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555, debug=True)
