# auth/routes.py

from flask import Blueprint, request, jsonify, make_response
from extensions import db, mail, bcrypt, limiter
from models import User, Role, UserRole, RoleEnum
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity,
    set_access_cookies,
    unset_jwt_cookies
)
from flask_mail import Message
from datetime import datetime, timedelta
from sqlalchemy.exc import SQLAlchemyError
import re
import logging

auth_bp = Blueprint('auth', __name__)

# Configure Logging
logger = logging.getLogger('auth')
handler = logging.StreamHandler()
formatter = logging.Formatter(
    '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
)
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.INFO)

def is_strong_password(password):
    # ... (same as before)
    pass

@auth_bp.route('/login', methods=['POST'])
@limiter.limit("10 per minute")
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Email and password are required."}), 400
    
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid email or password."}), 401
    
    if not user.is_active:
        return jsonify({"error": "Account is not active. Please confirm your email."}), 403
    
    access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=1))
    response = jsonify({"message": "Login successful"})
    set_access_cookies(response, access_token)
    return response, 200

@auth_bp.route('/logout', methods=['POST'])
def logout():
    response = jsonify({"message": "Logout successful"})
    unset_jwt_cookies(response)
    return response, 200

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found."}), 404
    
    return jsonify({"user": user.to_dict()}), 200

# ... (other routes remain the same)
