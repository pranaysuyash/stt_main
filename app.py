
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
    WorkspaceMember,
    File,
    Tag
)
import logging
from sqlalchemy import func, extract

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
                
                # Create a new File entry in the database
                new_file = File(
                    filename=filename,
                    path=file_path,
                    size=os.path.getsize(file_path),
                    type=file_mime_type,
                    duration=''  # You can update this if duration is extracted
                )
                db.session.add(new_file)
                db.session.commit()
                
                file_info = {
                    'id': new_file.id,
                    'filename': new_file.filename,
                    'path': f'/static/uploads/{new_file.filename}',
                    'size': new_file.size,
                    'type': new_file.type,
                    'duration': new_file.duration
                }
                response['uploaded_files'].append(file_info)
                category = get_file_category(filename)
                if category == 'video':
                    audio_filename = f"{os.path.splitext(filename)[0]}_audio.wav"
                    audio_path = os.path.join(app.config['UPLOAD_FOLDER'], audio_filename)
                    success, message = extract_audio(file_path, audio_path)
                    if success:
                        # Create a new File entry for the extracted audio
                        extracted_audio = File(
                            filename=audio_filename,
                            path=audio_path,
                            size=os.path.getsize(audio_path),
                            type=mimetypes.guess_type(audio_path)[0] or 'application/octet-stream',
                            duration=''  # Update if needed
                        )
                        db.session.add(extracted_audio)
                        db.session.commit()
                        
                        file_info['extracted_audio'] = {
                            'id': extracted_audio.id,
                            'filename': extracted_audio.filename,
                            'path': f'/static/uploads/{extracted_audio.filename}',
                            'size': extracted_audio.size,
                            'type': extracted_audio.type,
                            'duration': extracted_audio.duration
                        }
                        response['uploaded_files'].append(file_info)
                    else:
                        response['errors'].append({'filename': filename, 'error': f'Audio extraction failed: {message}'})
                else:
                    response['uploaded_files'].append(file_info)
            except Exception as e:
                db.session.rollback()  # Rollback in case of error
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

# @app.route('/api/file_history', methods=['GET'])
# @limiter.limit("30 per minute")
# def file_history():
#     """
#     Retrieve the list of uploaded files with their metadata.
#     Supports pagination.
#     """
#     page = request.args.get('page', 1, type=int)
#     per_page = request.args.get('per_page', 20, type=int)
#     pagination = File.query.paginate(page=page, per_page=per_page, error_out=False)
#     files = pagination.items
#     file_list = []
#     for file in files:
#         file_info = {
#             'id': file.id,
#             'filename': file.filename,
#             'path': f'/static/uploads/{file.filename}',  # Or adjust path if needed
#             'size': file.size,
#             'type': file.type,
#             'duration': file.duration,
#             'tags': [tag.name for tag in file.tags]  # Include tags here
#         }
#         file_list.append(file_info)
#     return jsonify({
#         'files': file_list,
#         'total': pagination.total,
#         'page': pagination.page,
#         'per_page': pagination.per_page,
#         'pages': pagination.pages
#     }), 200
    

# @app.route('/api/file_history', methods=['GET'])
# @limiter.limit("30 per minute")
# def file_history():
#     """
#     Retrieve the list of uploaded files with their metadata.
#     Supports pagination, filtering by date range, and statistics for day-wise and week-wise uploads.
#     """
#     page = request.args.get('page', 1, type=int)
#     per_page = request.args.get('per_page', 20, type=int)
#     start_date = request.args.get('start_date')
#     end_date = request.args.get('end_date')

#     query = File.query

#     # Filter by date range if provided
#     if start_date:
#         query = query.filter(File.uploaded_at >= start_date)
#     if end_date:
#         query = query.filter(File.uploaded_at <= end_date)

#     # Pagination
#     pagination = query.paginate(page=page, per_page=per_page, error_out=False)
#     files = pagination.items

#     # Calculate uploads per day and week
#     day_wise_uploads = (
#         db.session.query(
#             func.date(File.uploaded_at).label('day'),
#             func.count(File.id).label('upload_count')
#         )
#         .group_by(func.date(File.uploaded_at))
#         .all()
#     )

#     week_wise_uploads = (
#         db.session.query(
#             func.year(File.uploaded_at).label('year'),
#             func.week(File.uploaded_at).label('week'),
#             func.count(File.id).label('upload_count')
#         )
#         .group_by(func.year(File.uploaded_at), func.week(File.uploaded_at))
#         .all()
#     )

#     # Build response
#     file_list = []
#     for file in files:
#         file_info = {
#             'id': file.id,
#             'filename': file.filename,
#             'path': f'/static/uploads/{file.filename}',  # Or adjust path if needed
#             'size': file.size,
#             'type': file.type,
#             'duration': file.duration,
#             'uploaded_at': file.uploaded_at.isoformat(),
#             'tags': [tag.name for tag in file.tags]  # Include tags here
#         }
#         file_list.append(file_info)

#     return jsonify({
#         'files': file_list,
#         'total': pagination.total,
#         'page': pagination.page,
#         'per_page': pagination.per_page,
#         'pages': pagination.pages,
#         'uploads_per_day': {str(day): count for day, count in day_wise_uploads},
#         'uploads_per_week': {f"{year}-W{week}": count for year, week, count in week_wise_uploads}
#     }), 200
# @app.route('/api/file_history', methods=['GET'])
# @limiter.limit("30 per minute")
# def file_history():
#     try:
#         # Pagination and filtering parameters
#         page = request.args.get('page', 1, type=int)
#         per_page = request.args.get('per_page', 20, type=int)
#         start_date = request.args.get('start_date')
#         end_date = request.args.get('end_date')

#         query = File.query

#         # Filter by date range if provided
#         if start_date:
#             query = query.filter(File.uploaded_at >= start_date)
#         if end_date:
#             query = query.filter(File.uploaded_at <= end_date)

#         # Pagination
#         pagination = query.paginate(page=page, per_page=per_page, error_out=False)
#         files = pagination.items

#         # Day-wise uploads (using strftime for SQLite compatibility)
#         day_wise_uploads = (
#             db.session.query(
#                 func.strftime('%Y-%m-%d', File.uploaded_at).label('day'),
#                 func.count(File.id).label('upload_count')
#             )
#             .group_by(func.strftime('%Y-%m-%d', File.uploaded_at))
#             .all()
#         )

#         # Week-wise uploads (using strftime for SQLite compatibility)
#         week_wise_uploads = (
#             db.session.query(
#                 func.strftime('%Y', File.uploaded_at).label('year'),
#                 func.strftime('%W', File.uploaded_at).label('week'),
#                 func.count(File.id).label('upload_count')
#             )
#             .group_by(func.strftime('%Y', File.uploaded_at), func.strftime('%W', File.uploaded_at))
#             .all()
#         )

#         # Build response
#         file_list = []
#         for file in files:
#             file_info = {
#                 'id': file.id,
#                 'filename': file.filename,
#                 'path': f'/static/uploads/{file.filename}',  # Or adjust path if needed
#                 'size': file.size,
#                 'type': file.type,
#                 'duration': file.duration,
#                 'uploaded_at': file.uploaded_at.isoformat(),
#                 'tags': [tag.name for tag in file.tags]  # Include tags here
#             }
#             file_list.append(file_info)

#         return jsonify({
#             'files': file_list,
#             'total': pagination.total,
#             'page': pagination.page,
#             'per_page': pagination.per_page,
#             'pages': pagination.pages,
#             'uploads_per_day': {day: count for day, count in day_wise_uploads},
#             'uploads_per_week': {f"{year}-W{week}": count for year, week, count in week_wise_uploads}
#         }), 200

#     except Exception as e:
#         app.logger.error(f"Error in /file_history: {str(e)}")
#         return jsonify({"error": "An error occurred while fetching file history.", "details": str(e)}), 500

# @app.route('/api/file_history', methods=['GET'])
# @limiter.limit("30 per minute")
# def file_history():
#     """
#     Retrieve the list of uploaded files with metadata.
#     Supports pagination, filtering by date, and provides stats for day-wise and week-wise uploads.
#     """
#     try:
#         # Pagination and filtering parameters
#         page = request.args.get('page', 1, type=int)
#         per_page = request.args.get('per_page', 20, type=int)
#         start_date = request.args.get('start_date')
#         end_date = request.args.get('end_date')

#         query = File.query

#         # Filter by date range if provided
#         if start_date:
#             query = query.filter(File.uploaded_at >= start_date)
#         if end_date:
#             query = query.filter(File.uploaded_at <= end_date)

#         # Pagination
#         pagination = query.paginate(page=page, per_page=per_page, error_out=False)
#         files = pagination.items

#         # Day-wise uploads (using TO_CHAR for PostgreSQL compatibility)
#         day_wise_uploads = (
#             db.session.query(
#                 func.to_char(File.uploaded_at, 'YYYY-MM-DD').label('day'),
#                 func.count(File.id).label('upload_count')
#             )
#             .group_by(func.to_char(File.uploaded_at, 'YYYY-MM-DD'))
#             .all()
#         )

#         # Week-wise uploads (using TO_CHAR for PostgreSQL compatibility)
#         week_wise_uploads = (
#             db.session.query(
#                 func.to_char(File.uploaded_at, 'YYYY').label('year'),
#                 func.to_char(File.uploaded_at, 'IW').label('week'),
#                 func.count(File.id).label('upload_count')
#             )
#             .group_by(func.to_char(File.uploaded_at, 'YYYY'), func.to_char(File.uploaded_at, 'IW'))
#             .all()
#         )

#         # Build response
#         file_list = []
#         for file in files:
#             file_info = {
#                 'id': file.id,
#                 'filename': file.filename,
#                 'path': f'/static/uploads/{file.filename}',  # Or adjust path if needed
#                 'size': file.size,
#                 'type': file.type,
#                 'duration': file.duration,
#                 'uploaded_at': file.uploaded_at.isoformat(),
#                 'tags': [tag.name for tag in file.tags]  # Include tags here
#             }
#             file_list.append(file_info)

#         return jsonify({
#             'files': file_list,
#             'total': pagination.total,
#             'page': pagination.page,
#             'per_page': pagination.per_page,
#             'pages': pagination.pages,
#             'uploads_per_day': {day: count for day, count in day_wise_uploads},
#             'uploads_per_week': {f"{year}-W{week}": count for year, week, count in week_wise_uploads}
#         }), 200

#     except Exception as e:
#         app.logger.error(f"Error in /file_history: {str(e)}")
#         return jsonify({"error": "An error occurred while fetching file history.", "details": str(e)}), 500

@app.route('/api/file_history', methods=['GET'])
@limiter.limit("30 per minute")
def file_history():
    """
    Retrieve the list of uploaded files with their metadata.
    Supports pagination, filtering by date range, media type, search, and tags.
    """
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        media_type = request.args.get('media_type')
        search_term = request.args.get('search')
        tags = request.args.get('tags', '').split(',')

        query = File.query

        # Search by filename
        if search_term:
            query = query.filter(File.filename.ilike(f'%{search_term}%'))

        # Filter by media type
        if media_type:
            query = query.filter(File.type.ilike(f'{media_type}%'))

        # Filter by date range
        if start_date:
            query = query.filter(File.uploaded_at >= start_date)
        if end_date:
            query = query.filter(File.uploaded_at <= end_date)

        # Filter by tags
        if tags and tags[0]:
            query = query.join(File.tags).filter(Tag.name.in_(tags))

        # Pagination
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)
        files = pagination.items

        # Day-wise uploads
        day_wise_uploads = db.session.query(
            func.to_char(File.uploaded_at, 'YYYY-MM-DD').label('day'),
            func.count(File.id).label('upload_count')
        ).group_by(func.to_char(File.uploaded_at, 'YYYY-MM-DD')).all()

        # Week-wise uploads
        week_wise_uploads = db.session.query(
            func.to_char(File.uploaded_at, 'YYYY').label('year'),
            func.to_char(File.uploaded_at, 'IW').label('week'),
            func.count(File.id).label('upload_count')
        ).group_by(func.to_char(File.uploaded_at, 'YYYY'), func.to_char(File.uploaded_at, 'IW')).all()

        # Build response
        file_list = [{
            'id': file.id,
            'filename': file.filename,
            'path': f'/static/uploads/{file.filename}',
            'size': file.size,
            'type': file.type,
            'duration': file.duration,
            'uploaded_at': file.uploaded_at.isoformat(),
            'tags': [tag.name for tag in file.tags]
        } for file in files]

        return jsonify({
            'files': file_list,
            'total': pagination.total,
            'page': pagination.page,
            'per_page': pagination.per_page,
            'pages': pagination.pages,
            'uploads_per_day': {day: count for day, count in day_wise_uploads},
            'uploads_per_week': {f"{year}-W{week}": count for year, week, count in week_wise_uploads}
        }), 200

    except Exception as e:
        app.logger.error(f"Error in /file_history: {str(e)}")
        return jsonify({"error": "An error occurred while fetching file history.", "details": str(e)}), 500


@app.route('/api/tags', methods=['GET'])
@limiter.limit("30 per minute")
def get_tags():
    """
    Retrieve the list of all available tags.
    """
    try:
        tags = Tag.query.all()
        return jsonify({'tags': [{'id': tag.id, 'name': tag.name} for tag in tags]}), 200
    except Exception as e:
        app.logger.error(f"Error fetching tags: {str(e)}")
        return jsonify({"error": "Failed to fetch tags", "details": str(e)}), 500


@app.route('/static/uploads/<path:filename>', methods=['GET'])
def serve_file(filename):
     """
#     Serve uploaded files.
#    """
     app.logger.info(f"Serving file: {filename} from {app.config['UPLOAD_FOLDER']}")
     return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/api/files/<int:file_id>/tag', methods=['POST'])
def tag_file(file_id):
    """
    Endpoint to tag a file with multiple tags.
    """
    file = File.query.get(file_id)
    if not file:
        return jsonify({"error": "File not found."}), 404

    # Get tags from the request body
    data = request.json
    tag_names = data.get('tags', [])

    if not tag_names:
        return jsonify({"error": "No tags provided."}), 400

    # Add each tag to the file, create the tag if it doesn't exist
    for tag_name in tag_names:
        tag_name = tag_name.strip().capitalize()  # Sentence case

        tag = Tag.query.filter_by(name=tag_name).first()
        if not tag:
            tag = Tag(name=tag_name)
            db.session.add(tag)

        if tag not in file.tags:
            file.tags.append(tag)

    # Commit the changes to the database
    try:
        db.session.commit()
        return jsonify({"message": "Tags added successfully."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route('/api/files/<int:file_id>/remove_tag', methods=['POST'])
def remove_tag(file_id):
    """
    Endpoint to remove multiple tags from a file.
    """
    file = File.query.get(file_id)
    if not file:
        return jsonify({"error": "File not found."}), 404

    # Get tags from the request body
    data = request.json
    tag_names = data.get('tags', [])

    if not tag_names:
        return jsonify({"error": "No tags provided."}), 400

    # Remove each tag from the file
    for tag_name in tag_names:
        tag_name = tag_name.strip().capitalize()  # Sentence case
        tag = Tag.query.filter_by(name=tag_name).first()
        
        if tag and tag in file.tags:
            file.tags.remove(tag)

    # Commit the changes to the database
    try:
        db.session.commit()
        return jsonify({"message": "Tags removed successfully."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
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

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(Exception)
def handle_exception(e):
    """
    Handle generic exceptions by logging them and returning a generic error message.
    """
    app.logger.error('Unhandled Exception: %s', e, exc_info=True)
    return jsonify({'error': 'An unexpected error occurred.'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555, debug=True)
