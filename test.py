import os
import mimetypes
from flask import Flask, request, jsonify, send_from_directory
from flask_mail import Mail
from flask_cors import CORS
from werkzeug.utils import secure_filename
from sqlalchemy import func
from extensions import db, mail, bcrypt, jwt, migrate, limiter
from auth.routes import auth_bp
from models import File, Tag
from utils import allowed_file, get_file_category, extract_audio
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 300 * 1024 * 1024  # 300MB

# Initialize extensions
db.init_app(app)
mail.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
migrate.init_app(app, db)
limiter.init_app(app)

# CORS setup
cors_config = {
    "origins": os.getenv('ALLOWED_ORIGINS', 'http://localhost:5173').split(','),
    "methods": ["GET", "HEAD", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    "allow_headers": ["Content-Type", "Authorization"],
    "expose_headers": ["Content-Type", "X-CSRFToken"],
    "supports_credentials": True,
    "max_age": 600,
    "vary_header": True
}
CORS(app, resources={r"/api/*": cors_config})

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')

# Ensure the upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# MIME Types Configuration
mimetypes.init()
mimetypes.add_type('audio/mp3', '.mp3')
mimetypes.add_type('video/mp4', '.mp4')
mimetypes.add_type('image/jpeg', '.jpg')
mimetypes.add_type('image/png', '.png')


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
    Serve uploaded files.
    """
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


# Error Handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found.'}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500


@app.errorhandler(Exception)
def handle_exception(e):
    app.logger.error('Unhandled Exception: %s', e, exc_info=True)
    return jsonify({'error': 'An unexpected error occurred.'}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555, debug=True)
