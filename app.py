

# app.py

import os
import mimetypes
from flask import Flask, request, jsonify, send_from_directory
from flask_mail import Mail
from flask_cors import CORS
from datetime import datetime
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from extensions import db, mail, bcrypt, jwt, migrate, limiter
from models import (
    User, Role, RoleEnum, UserRole, Organization, Workspace,
    SubscriptionTier, Subscription, OrganizationMember, WorkspaceMember,
    MediaFile, Tag
)
import logging
from sqlalchemy import func
from flask_jwt_extended import (
    JWTManager, jwt_required, get_jwt_identity, create_access_token,
    set_access_cookies, unset_jwt_cookies
)

# Import utility functions from utils.py (in the root directory)
from utils import (
    allowed_file, get_file_category, extract_audio,
    extract_image_metadata, extract_audio_metadata, extract_video_metadata
)

# Load environment variables from .env file
load_dotenv()

def create_app():
    app = Flask(__name__)

    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]',
        handlers=[logging.StreamHandler()]
    )

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

    CORS(app, resources={r"/api/*": cors_config}, supports_credentials=True)

    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # JWT Configuration
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    app.config['JWT_COOKIE_SECURE'] = False  # Should be True in production with HTTPS
    app.config['JWT_COOKIE_HTTPONLY'] = True
    app.config['JWT_COOKIE_SAMESITE'] = 'Lax'
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False  # Set to True if implementing CSRF protection

    # Initialize JWTManager
    jwt = JWTManager(app)

    # Mail Configuration
    app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
    app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
    app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS') == 'True'
    app.config['MAIL_USE_SSL'] = os.getenv('MAIL_USE_SSL') == 'True'
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')

    # Upload Configuration
    app.config['UPLOAD_FOLDER'] = 'static/uploads'
    app.config['MAX_CONTENT_LENGTH'] = 300 * 1024 * 1024  # 300MB

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

    # Initialize Extensions
    db.init_app(app)
    mail.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)
    limiter.init_app(app)

    # Register Blueprints
    from auth.routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    # Define Routes
    @app.route('/api/upload', methods=['POST'])
    @jwt_required()  # This ensures that only authenticated users can upload files
    @limiter.limit("10 per minute")
    def upload_file():
        current_user_id = get_jwt_identity()  # Get the ID of the authenticated user
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

                    # Extract metadata based on file type
                    category = get_file_category(filename)
                    metadata = {}
                    if category == 'image':
                        metadata = extract_image_metadata(file_path)
                    elif category == 'audio':
                        metadata = extract_audio_metadata(file_path)
                    elif category == 'video':
                        metadata = extract_video_metadata(file_path)

                    media_info = {
                        'file_size': os.path.getsize(file_path),
                        'file_type': file_mime_type,
                    }

                    # Update media_info with extracted metadata
                    media_info.update(metadata)

                    new_media_file = MediaFile(
                        user_id=current_user_id,  # Set the user_id
                        filename=filename,
                        storage_path=file_path,
                        file_size=media_info['file_size'],
                        file_type=media_info['file_type'],
                        duration=media_info.get('duration'),
                        uploaded_at=datetime.utcnow(),
                        meta_data=metadata,  # Store additional metadata here
                    )
                    db.session.add(new_media_file)
                    db.session.commit()

                    file_info = new_media_file.to_dict()
                    file_info['path'] = f'/static/uploads/{new_media_file.filename}'
                    response['uploaded_files'].append(file_info)

                    if category == 'video':
                        audio_filename = f"{os.path.splitext(filename)[0]}_audio.wav"
                        audio_path = os.path.join(app.config['UPLOAD_FOLDER'], audio_filename)
                        success, message = extract_audio(file_path, audio_path)
                        if success:
                            # Handle extracted audio as a new MediaFile
                            audio_mime_type = mimetypes.guess_type(audio_path)[0] or 'application/octet-stream'

                            # Extract metadata for the extracted audio
                            audio_metadata = extract_audio_metadata(audio_path)
                            audio_media_info = {
                                'file_size': os.path.getsize(audio_path),
                                'file_type': audio_mime_type,
                            }
                            audio_media_info.update(audio_metadata)

                            audio_media_file = MediaFile(
                                user_id=current_user_id,  # Set the user_id for the audio file as well
                                filename=audio_filename,
                                storage_path=audio_path,
                                file_size=audio_media_info['file_size'],
                                file_type=audio_media_info['file_type'],
                                duration=audio_media_info.get('duration'),
                                uploaded_at=datetime.utcnow(),
                                meta_data=audio_metadata,  # Store audio metadata here
                            )
                            db.session.add(audio_media_file)
                            db.session.commit()

                            file_info['extracted_audio'] = audio_media_file.to_dict()
                            file_info['extracted_audio']['path'] = f'/static/uploads/{audio_media_file.filename}'
                        else:
                            response['errors'].append({'filename': filename, 'error': f'Audio extraction failed: {message}'})
                except Exception as e:
                    db.session.rollback()
                    app.logger.error(f"Error uploading file {filename}: {str(e)}")
                    response['errors'].append({'filename': filename, 'error': str(e)})
            else:
                response['errors'].append({'filename': file.filename, 'error': 'File type not allowed.'})
        return jsonify(response), 200

    @app.route('/api/file_exists', methods=['GET'])
    @limiter.limit("20 per minute")
    def file_exists():
        filename = request.args.get('filename', '')
        if not filename:
            return jsonify({'error': 'Filename parameter is missing.'}), 400
        filename = secure_filename(filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        exists = os.path.exists(file_path)
        return jsonify({'exists': exists}), 200

    @app.route('/api/file_history', methods=['GET'])
    @jwt_required()  # This ensures that only authenticated users can access file history
    @limiter.limit("30 per minute")
    def file_history():
        try:
            current_user_id = get_jwt_identity()  # Get the ID of the authenticated user
            page = request.args.get('page', 1, type=int)
            per_page = request.args.get('per_page', 20, type=int)
            start_date = request.args.get('start_date')
            end_date = request.args.get('end_date')
            media_type = request.args.get('media_type')
            search_term = request.args.get('search')
            tags = request.args.get('tags', '').split(',')

            query = MediaFile.query.filter_by(user_id=current_user_id)  # Filter files by the current user

            if search_term:
                query = query.filter(MediaFile.filename.ilike(f'%{search_term}%'))

            if media_type:
                query = query.filter(MediaFile.file_type.ilike(f'{media_type}%'))

            if start_date:
                query = query.filter(MediaFile.uploaded_at >= start_date)
            if end_date:
                query = query.filter(MediaFile.uploaded_at <= end_date)

            if tags and tags[0]:
                query = query.join(MediaFile.tags).filter(Tag.name.in_(tags))

            pagination = query.paginate(page=page, per_page=per_page, error_out=False)
            media_files = pagination.items

            day_wise_uploads = db.session.query(
                func.to_char(MediaFile.uploaded_at, 'YYYY-MM-DD').label('day'),
                func.count(MediaFile.id).label('upload_count')
            ).filter(MediaFile.user_id == current_user_id).group_by(func.to_char(MediaFile.uploaded_at, 'YYYY-MM-DD')).all()

            week_wise_uploads = db.session.query(
                func.to_char(MediaFile.uploaded_at, 'YYYY').label('year'),
                func.to_char(MediaFile.uploaded_at, 'IW').label('week'),
                func.count(MediaFile.id).label('upload_count')
            ).filter(MediaFile.user_id == current_user_id).group_by(func.to_char(MediaFile.uploaded_at, 'YYYY'), func.to_char(MediaFile.uploaded_at, 'IW')).all()

            media_file_list = [{
                'id': media_file.id,
                'filename': media_file.filename,
                'path': f'/static/uploads/{media_file.filename}',
                'size': media_file.file_size,
                'type': media_file.file_type,
                'duration': media_file.duration,
                'uploaded_at': media_file.uploaded_at.isoformat(),
                'tags': [tag.name for tag in media_file.tags],
                'meta_data': media_file.meta_data  # Include metadata in the response
            } for media_file in media_files]

            return jsonify({
                'files': media_file_list,
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
    @jwt_required()  # This ensures that only authenticated users can access tags
    @limiter.limit("30 per minute")
    def get_tags():
        try:
            current_user_id = get_jwt_identity()  # Get the ID of the authenticated user
            tags = Tag.query.join(MediaFile.tags).filter(MediaFile.user_id == current_user_id).distinct().all()
            return jsonify({'tags': [{'id': tag.id, 'name': tag.name} for tag in tags]}), 200
        except Exception as e:
            app.logger.error(f"Error fetching tags: {str(e)}")
            return jsonify({"error": "Failed to fetch tags", "details": str(e)}), 500
    # Define the File Details Route **before** the file serving route
    @app.route('/api/files/<int:file_id>', methods=['GET'])
    @jwt_required()  # Ensure the user is authenticated
    @limiter.limit("30 per minute")
    def get_file_details(file_id):
        current_user_id = get_jwt_identity()
        media_file = MediaFile.query.filter_by(id=file_id, user_id=current_user_id).first()
        if not media_file:
            return jsonify({"error": "File not found or you don't have permission to access it."}), 404
        
        # Prepare the file details
        file_details = {
            'id': media_file.id,
            'filename': media_file.filename,
            'path': f'/static/uploads/{media_file.filename}',
            'size': media_file.file_size,
            'type': media_file.file_type,
            'duration': media_file.duration,
            'uploaded_at': media_file.uploaded_at.isoformat(),
            'tags': [tag.name for tag in media_file.tags],
            'meta_data': media_file.meta_data
        }
        
        return jsonify(file_details), 200
    @app.route('/static/uploads/<path:filename>', methods=['GET'])
    @jwt_required()  # This ensures that only authenticated users can access files
    def serve_file(filename):
        current_user_id = get_jwt_identity()  # Get the ID of the authenticated user
        media_file = MediaFile.query.filter_by(filename=filename, user_id=current_user_id).first()
        if not media_file:
            return jsonify({"error": "File not found or you don't have permission to access it."}), 404
        app.logger.info(f"Serving file: {filename} from {app.config['UPLOAD_FOLDER']}")
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

    @app.route('/api/files/<string:file_id>/tag', methods=['POST'])
    @jwt_required()
    def tag_file(file_id):
        current_user_id = get_jwt_identity()
        media_file = MediaFile.query.filter_by(id=file_id, user_id=current_user_id).first()
        if not media_file:
            return jsonify({"error": "File not found or you don't have permission to tag it."}), 404

        data = request.json
        tag_names = data.get('tags', [])

        if not tag_names:
            return jsonify({"error": "No tags provided."}), 400

        for tag_name in tag_names:
            tag_name = tag_name.strip().capitalize()

            tag = Tag.query.filter_by(name=tag_name).first()
            if not tag:
                tag = Tag(name=tag_name)
                db.session.add(tag)

            if tag not in media_file.tags:
                media_file.tags.append(tag)

        try:
            db.session.commit()
            return jsonify({"message": "Tags added successfully."}), 200
        except Exception as e:
            db.session.rollback()
            app.logger.error(f"Error tagging file {file_id}: {str(e)}")
            return jsonify({"error": str(e)}), 500

    @app.route('/api/files/<string:file_id>/remove_tag', methods=['POST'])
    @jwt_required()
    def remove_tag(file_id):
        current_user_id = get_jwt_identity()
        media_file = MediaFile.query.filter_by(id=file_id, user_id=current_user_id).first()
        if not media_file:
            return jsonify({"error": "File not found or you don't have permission to remove tags from it."}), 404

        data = request.json
        tag_names = data.get('tags', [])

        if not tag_names:
            return jsonify({"error": "No tags provided."}), 400

        for tag_name in tag_names:
            tag_name = tag_name.strip().capitalize()
            tag = Tag.query.filter_by(name=tag_name).first()

            if tag and tag in media_file.tags:
                media_file.tags.remove(tag)

        try:
            db.session.commit()
            return jsonify({"message": "Tags removed successfully."}), 200
        except Exception as e:
            db.session.rollback()
            app.logger.error(f"Error removing tags from file {file_id}: {str(e)}")
            return jsonify({"error": str(e)}), 500

    # Error Handlers
    @app.errorhandler(413)
    def request_entity_too_large(error):
        return jsonify({'error': 'File is too large. Maximum upload size is 300MB.'}), 413

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Resource not found.'}), 404

    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({'error': 'Method not allowed.'}), 405

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500

    @app.errorhandler(Exception)
    def handle_exception(e):
        app.logger.error('Unhandled Exception: %s', e, exc_info=True)
        return jsonify({'error': 'An unexpected error occurred.'}), 500

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5555, debug=True)
