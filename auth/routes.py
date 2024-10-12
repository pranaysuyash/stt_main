# # auth/routes.py
from flask import Blueprint, request, jsonify, url_for
from extensions import db, mail, bcrypt, limiter
from models import User, Role, UserRole, RoleEnum
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
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
    """
    Validate the strength of the password.
    Requirements:
    - At least 8 characters
    - Contains both uppercase and lowercase characters
    - Contains digits
    - Contains special characters
    """
    if len(password) < 8:
        return False
    if not re.search(r'[A-Z]', password):
        return False
    if not re.search(r'[a-z]', password):
        return False
    if not re.search(r'\d', password):
        return False
    if not re.search(r'[!@#$%^&*(),.?":{}|<>_]', password):
        return False
    return True

@auth_bp.route('/signup', methods=['POST'])
@limiter.limit("5 per minute")
def signup():
    logger.info("Signup request received")
    data = request.get_json()
    
    first_name = data.get('first_name', '').strip()
    last_name = data.get('last_name', '').strip()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Email and password are required."}), 400
    
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"error": "Invalid email format."}), 400
    
    if not is_strong_password(password):
        return jsonify({"error": "Password does not meet strength requirements."}), 400
    
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User already exists."}), 409
    
    try:
        new_user = User(email=email, password=password, first_name=first_name, last_name=last_name)
        db.session.add(new_user)
        
        user_role = Role.query.filter_by(name=RoleEnum.USER.value).first()
        if user_role:
            new_user.roles.append(user_role)
        else:
            logger.error("Default 'User' role not found in the database.")
            db.session.rollback()
            return jsonify({"error": "Internal server error."}), 500
        
        db.session.commit()

        token = new_user.get_confirmation_token()
        confirm_url = url_for('auth.confirm_email', token=token, _external=True)
        
        html = f"""
        <p>Hi {new_user.first_name or 'User'},</p>
        <p>Thanks for signing up! Please confirm your email by clicking on the link below:</p>
        <p><a href="{confirm_url}">Confirm Email</a></p>
        """
        msg = Message('Confirm Your Email', recipients=[new_user.email], html=html)
        mail.send(msg)

    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error(f"Database error during signup for {email}: {str(e)}")
        return jsonify({"error": "Internal server error."}), 500
    except Exception as e:
        logger.error(f"Failed to send confirmation email to {email}: {str(e)}")
        return jsonify({"error": "Failed to send confirmation email. Please try again later."}), 500
    
    return jsonify({"message": "User created successfully. Please check your email to confirm your account."}), 201

@auth_bp.route('/confirm/<token>', methods=['GET'])
@limiter.limit("10 per minute")
def confirm_email(token):
    user = User.verify_confirmation_token(token)
    if not user:
        return jsonify({"error": "Invalid or expired token."}), 400
    if user.is_active:
        return jsonify({"message": "Account already confirmed."}), 200
    try:
        user.is_active = True
        user.confirmed_at = datetime.utcnow()
        db.session.commit()
        return jsonify({"message": "Email confirmed successfully."}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error(f"Database error during email confirmation for {user.email}: {str(e)}")
        return jsonify({"error": "Internal server error."}), 500

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
    return jsonify({"access_token": access_token}), 200

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found."}), 404
    
    return jsonify({"user": user.to_dict()}), 200

@auth_bp.route('/forgot-password', methods=['POST'])
@limiter.limit("5 per hour")
def forgot_password():
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return jsonify({"error": "Email is required."}), 400
    
    user = User.query.filter_by(email=email).first()
    if user:
        token = user.get_reset_token()
        reset_url = url_for('auth.reset_password', token=token, _external=True)
        
        html = f"""
        <p>Hi {user.first_name or 'User'},</p>
        <p>You have requested to reset your password. Please click the link below to reset it:</p>
        <p><a href="{reset_url}">Reset Password</a></p>
        <p>If you did not request this, please ignore this email.</p>
        """
        msg = Message('Password Reset Request', recipients=[user.email], html=html)
        mail.send(msg)
    
    return jsonify({"message": "If an account with that email exists, a password reset link has been sent."}), 200

@auth_bp.route('/reset-password', methods=['POST'])
@limiter.limit("3 per hour")
def reset_password():
    data = request.get_json()
    token = data.get('token')
    new_password = data.get('password')
    
    if not token or not new_password:
        return jsonify({"error": "Token and new password are required."}), 400
    
    user = User.verify_reset_token(token)
    if not user:
        return jsonify({"error": "Invalid or expired token."}), 400
    
    if not is_strong_password(new_password):
        return jsonify({"error": "Password does not meet strength requirements."}), 400
    
    user.set_password(new_password)
    db.session.commit()
    
    return jsonify({"message": "Password has been reset successfully."}), 200

@auth_bp.route('/settings', methods=['PUT'])
@jwt_required()
def update_settings():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"error": "User not found."}), 404
    
    data = request.get_json()
    
    if 'first_name' in data:
        user.first_name = data['first_name']
    if 'last_name' in data:
        user.last_name = data['last_name']
    if 'email' in data:
        if User.query.filter(User.email == data['email'], User.id != user.id).first():
            return jsonify({"error": "Email already in use."}), 400
        user.email = data['email']
    
    if 'current_password' in data and 'new_password' in data:
        if not user.check_password(data['current_password']):
            return jsonify({"error": "Current password is incorrect."}), 400
        if not is_strong_password(data['new_password']):
            return jsonify({"error": "New password does not meet strength requirements."}), 400
        user.set_password(data['new_password'])
    
    db.session.commit()
    
    return jsonify({"message": "Settings updated successfully.", "user": user.to_dict()}), 200
