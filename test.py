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
from models import File, Tag
import logging
from utils import allowed_file, get_file_category, extract_audio  # Import helper functions

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Configure logging
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

@app.route('/api/file_history', methods=['GET'])
@limiter.limit("30 per minute")
def file_history():
    try:
        # Pagination and filtering parameters
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')

        query = File.query

        # Filter by date range if provided
        if start_date:
            query = query.filter(File.uploaded_at >= start_date)
        if end_date:
            query = query.filter(File.uploaded_at <= end_date)

        # Pagination
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)
        files = pagination.items

        # Day-wise uploads (using strftime for SQLite compatibility)
        day_wise_uploads = (
            db.session.query(
                func.strftime('%Y-%m-%d', File.uploaded_at).label('day'),
                func.count(File.id).label('upload_count')
            )
            .group_by(func.strftime('%Y-%m-%d', File.uploaded_at))
            .all()
        )

        # Week-wise uploads (using strftime for SQLite compatibility)
        week_wise_uploads = (
            db.session.query(
                func.strftime('%Y', File.uploaded_at).label('year'),
                func.strftime('%W', File.uploaded_at).label('week'),
                func.count(File.id).label('upload_count')
            )
            .group_by(func.strftime('%Y', File.uploaded_at), func.strftime('%W', File.uploaded_at))
            .all()
        )

        # Build response
        file_list = []
        for file in files:
            file_info = {
                'id': file.id,
                'filename': file.filename,
                'path': f'/static/uploads/{file.filename}',  # Or adjust path if needed
                'size': file.size,
                'type': file.type,
                'duration': file.duration,
                'uploaded_at': file.uploaded_at.isoformat(),
                'tags': [tag.name for tag in file.tags]  # Include tags here
            }
            file_list.append(file_info)

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


@app.route('/static/uploads/<path:filename>', methods=['GET'])
def serve_file(filename):
    """
    Serve uploaded files.
    """
    app.logger.info(f"Serving file: {filename} from {app.config['UPLOAD_FOLDER']}")
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Error Handlers
@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555, debug=True)
