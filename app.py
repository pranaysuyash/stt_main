# app.py

import os
import mimetypes
from flask import Flask, request, jsonify, send_from_directory, abort
from flask_mail import Mail
from flask_cors import CORS
from datetime import datetime
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from extensions import db, mail, bcrypt, jwt, migrate, limiter
from auth.routes import auth_bp  # Ensure this file contains only the blueprint definitions
from models import (
    User,
    Role,
    UserRole,
    Organization,
    Workspace,
    SubscriptionTier,
    Subscription,
    OrganizationMember,
    WorkspaceMember
)
import logging

from utils import allowed_file, get_file_category, extract_audio  # Import helper functions

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Configure logging at the top of app.py
logging.basicConfig(level=logging.DEBUG)

# Load allowed origins from environment variable
ALLOWED_ORIGINS = os.getenv('ALLOWED_ORIGINS', 'http://localhost:5173').split(',')

# CORS setup
cors_config = {
    "origins": ALLOWED_ORIGINS,
    "methods": ["GET", "HEAD", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    "allow_headers": ["Content-Type", "Authorization"],
    "expose_headers": ["Content-Type", "X-CSRFToken"],
    "supports_credentials": True,
    "max_age": 600,
    "vary_header": True
}

CORS(app, resources={r"/api/*": cors_config})

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Mail Configuration
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS') == 'True'
app.config['MAIL_USE_SSL'] = os.getenv('MAIL_USE_SSL') == 'True'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')



# Upload Configuration
UPLOAD_FOLDER = 'static/uploads'
MAX_CONTENT_LENGTH = 300 * 1024 * 1024  # 300MB

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

# Ensure the upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# MIME Types Configuration
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

# Initialize Extensions with app
db.init_app(app)
mail.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
migrate.init_app(app, db)
limiter.init_app(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')

# Define Routes

@app.route('/api/upload', methods=['POST'])
@limiter.limit("10 per minute")  # Example: Limit to 10 uploads per minute per IP
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
@limiter.limit("20 per minute")  # Example: Limit to 20 checks per minute per IP
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
@limiter.limit("30 per minute")  # Example: Limit to 30 history fetches per minute per IP
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

# Define Error Handlers

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
    Handle generic exceptions by logging them and returning a generic error message.
    """
    app.logger.error('Unhandled Exception: %s', e, exc_info=True)
    return jsonify({'error': 'An unexpected error occurred.'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555, debug=True)
