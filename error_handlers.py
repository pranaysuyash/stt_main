# error_handlers.py

from flask import jsonify, request
from marshmallow import ValidationError
from sqlalchemy.exc import SQLAlchemyError
import logging

logger = logging.getLogger(__name__)

def register_error_handlers(app):
    @app.errorhandler(ValidationError)
    def handle_validation_error(e):
        logger.warning(f"Validation error: {e.messages}")
        return jsonify({"error": e.messages}), 400

    @app.errorhandler(SQLAlchemyError)
    def handle_database_error(e):
        logger.error(f"Database error: {str(e)}")
        return jsonify({"error": "Internal server error."}), 500

    @app.errorhandler(404)
    def handle_404_error(e):
        logger.warning(f"404 error: {request.url}")
        return jsonify({"error": "Resource not found."}), 404

    @app.errorhandler(500)
    def handle_500_error(e):
        logger.error(f"500 error: {str(e)}")
        return jsonify({"error": "Internal server error."}), 500

    # Add more custom error handlers as needed
