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

# from flask import Blueprint, request, jsonify, url_for
# from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
# from flask_mail import Message
# from sqlalchemy.exc import SQLAlchemyError
# from typing import Tuple, Dict, Any
# from datetime import datetime, timedelta
# import re
# import logging

# from extensions import db, mail, limiter
# from models import User, Role, RoleEnum
# from schemas import UserSchema, LoginSchema, PasswordResetSchema, EmailSchema

# auth_bp = Blueprint('auth', __name__)

# # Configure Logging
# logger = logging.getLogger('auth')
# handler = logging.StreamHandler()
# formatter = logging.Formatter(
#     '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
# )
# handler.setFormatter(formatter)
# logger.addHandler(handler)
# logger.setLevel(logging.INFO)

# def is_strong_password(password: str) -> bool:
#     """
#     Validate the strength of the password.
#     Requirements:
#     - At least 8 characters
#     - Contains both uppercase and lowercase characters
#     - Contains digits
#     - Contains special characters
#     """
#     return all([
#         len(password) >= 8,
#         re.search(r'[A-Z]', password),
#         re.search(r'[a-z]', password),
#         re.search(r'\d', password),
#         re.search(r'[!@#$%^&*(),.?":{}|<>_]', password)
#     ])

# # Utility function for database operations
# def commit_to_db(instance) -> bool:
#     try:
#         with db.session.begin(subtransactions=True):
#         db.session.add(instance)
#         return True
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         logger.error(f"Database error: {str(e)}")
#         return False

# @auth_bp.route('/signup', methods=['POST'])
# @limiter.limit("5 per minute")
# def signup() -> Tuple[Dict[str, Any], int]:
#     logger.info("Signup request received")
    
#     user_schema = UserSchema()
#     errors = user_schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400
    
#     data = user_schema.load(request.json)
    
#     if not is_strong_password(data['password']):
#         return jsonify({"error": "Password does not meet strength requirements."}), 400
    
#     if User.query.filter_by(email=data['email']).first():
#         return jsonify({"error": "User already exists."}), 409
    
#     new_user = User(**data)
#     user_role = Role.query.filter_by(name=RoleEnum.USER.value).first()
#     if not user_role:
#         logger.error("Default 'User' role not found in the database.")
#         return jsonify({"error": "Internal server error."}), 500
    
#     new_user.roles.append(user_role)
#     if not commit_to_db(new_user):
#         return jsonify({"error": "Internal server error."}), 500

#     try:
#         token = new_user.get_confirmation_token()
#         confirm_url = url_for('auth.confirm_email', token=token, _external=True)
        
#         html = f"""
#         <p>Hi {new_user.first_name or 'User'},</p>
#         <p>Thanks for signing up! Please confirm your email by clicking on the link below:</p>
#         <p><a href="{confirm_url}">Confirm Email</a></p>
#         """
#         msg = Message('Confirm Your Email', recipients=[new_user.email], html=html)
#         try:
#         mail.send(msg)
#     except Exception as e:
#         logger.error(f"Mail sending failed: {str(e)}")
#         return jsonify({"error": "Email sending failed. Please try again."}), 500
#     except Exception as e:
#         logger.error(f"Failed to send confirmation email to {data['email']}: {str(e)}")
#         return jsonify({"error": "Failed to send confirmation email. Please try again later."}), 500
    
#     return jsonify({"message": "User created successfully. Please check your email to confirm your account."}), 201

# @auth_bp.route('/confirm/<token>', methods=['GET'])
# @limiter.limit("10 per minute")
# def confirm_email(token: str) -> Tuple[Dict[str, Any], int]:
#     user = User.verify_confirmation_token(token)
#     if not user:
#         return jsonify({"error": "Invalid or expired token."}), 400
#     if user.is_active:
#         return jsonify({"message": "Account already confirmed."}), 200
    
#     user.is_active = True
#     user.confirmed_at = datetime.utcnow()
#     if not commit_to_db(user):
#         return jsonify({"error": "Internal server error."}), 500
    
#     return jsonify({"message": "Email confirmed successfully."}), 200

# @auth_bp.route('/login', methods=['POST'])
# @limiter.limit("10 per minute")
# def login() -> Tuple[Dict[str, Any], int]:
#     login_schema = LoginSchema()
#     errors = login_schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400
    
#     data = login_schema.load(request.json)
    
#     user = User.query.filter_by(email=data['email']).first()
#     if not user:
#         return jsonify({"error": "Invalid email."}), 401
#     if not user.check_password(data['password']):
#         return jsonify({"error": "Invalid password."}), 401
#     if not user.is_active:
#         return jsonify({"error": "Account is not active."}), 403
#         return jsonify({"error": "Invalid email or password."}), 401
    
#     access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=int(os.getenv('ACCESS_TOKEN_EXPIRES_HOURS', 1))))
#     return jsonify({"access_token": access_token}), 200

# @auth_bp.route('/me', methods=['GET'])
# @jwt_required()
# def me() -> Tuple[Dict[str, Any], int]:
#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)
    
#     if not user:
#         return jsonify({"error": "User not found."}), 404
    
#     user_schema = UserSchema()
#     return jsonify({"user": user_schema.dump(user)}), 200

# @auth_bp.route('/forgot-password', methods=['POST'])
# @limiter.limit("5 per hour")
# def forgot_password() -> Tuple[Dict[str, Any], int]:
#     email_schema = EmailSchema()
#     errors = email_schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400
    
#     data = email_schema.load(request.json)
    
#     user = User.query.filter_by(email=data['email']).first()
#     if user:
#         try:
#             token = user.get_reset_token()
#             reset_url = url_for('auth.reset_password', token=token, _external=True)
            
#             html = f"""
#             <p>Hi {user.first_name or 'User'},</p>
#             <p>You have requested to reset your password. Please click the link below to reset it:</p>
#             <p><a href="{reset_url}">Reset Password</a></p>
#             <p>If you did not request this, please ignore this email.</p>
#             """
#             msg = Message('Password Reset Request', recipients=[user.email], html=html)
#             mail.send(msg)
#         except Exception as e:
#             logger.error(f"Failed to send password reset email to {data['email']}: {str(e)}")
#             return jsonify({"error": "Failed to send password reset email. Please try again later."}), 500
    
#     return jsonify({"message": "If an account with that email exists, a password reset link has been sent."}), 200

# @auth_bp.route('/reset-password', methods=['POST'])
# @limiter.limit("3 per hour")
# def reset_password() -> Tuple[Dict[str, Any], int]:
#     reset_schema = PasswordResetSchema()
#     errors = reset_schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400
    
#     data = reset_schema.load(request.json)
    
#     user = User.verify_reset_token(data['token'])
#     if not user:
#         return jsonify({"error": "Invalid or expired token."}), 400
    
#     if not is_strong_password(data['password']):
#         return jsonify({"error": "Password does not meet strength requirements."}), 400
    
#     user.set_password(data['password'])
#     if not commit_to_db(user):
#         return jsonify({"error": "Internal server error."}), 500
    
#     return jsonify({"message": "Password has been reset successfully."}), 200

# @auth_bp.route('/settings', methods=['PUT'])
# @jwt_required()
# def update_settings() -> Tuple[Dict[str, Any], int]:
#     user_schema = UserSchema(partial=True)
#     errors = user_schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400
    
#     data = user_schema.load(request.json)
    
#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)
    
#     if not user:
#         return jsonify({"error": "User not found."}), 404
    
#     for key, value in data.items():
#         if key in ['first_name', 'last_name', 'email']:
#             setattr(user, key, value)
    
#     if not commit_to_db(user):
#         return jsonify({"error": "Internal server error."}), 500
    
#     return jsonify({"message": "Settings updated successfully.", "user": user_schema.dump(user)}), 200


# from flask import Blueprint, request, jsonify, url_for
# from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
# from flask_mail import Message
# from sqlalchemy.exc import SQLAlchemyError
# from typing import Tuple, Dict, Any
# from datetime import datetime, timedelta
# import re
# import logging
# import os

# from extensions import db, mail, limiter, bcrypt
# from models import User, Role, RoleEnum
# from schemas import UserSchema, LoginSchema, PasswordResetSchema, EmailSchema

# auth_bp = Blueprint('auth', __name__)

# # Configure Logging
# logger = logging.getLogger('auth')
# handler = logging.StreamHandler()
# formatter = logging.Formatter(
#     '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
# )
# handler.setFormatter(formatter)
# logger.addHandler(handler)
# logger.setLevel(logging.INFO)

# def is_strong_password(password: str) -> bool:
#     """
#     Validate the strength of the password.
#     Requirements:
#     - At least 8 characters
#     - Contains both uppercase and lowercase characters
#     - Contains digits
#     - Contains special characters
#     """
#     return all([
#         len(password) >= 8,
#         re.search(r'[A-Z]', password),
#         re.search(r'[a-z]', password),
#         re.search(r'\d', password),
#         re.search(r'[!@#$%^&*(),.?":{}|<>_]', password)
#     ])

# def commit_to_db(instance) -> bool:
#     try:
#         with db.session.begin(subtransactions=True):
#             db.session.add(instance)
#         return True
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         logger.error(f"Database error: {str(e)}")
#         return False

# @auth_bp.route('/signup', methods=['POST'])
# @limiter.limit("5 per minute")
# def signup() -> Tuple[Dict[str, Any], int]:
#     logger.info("Signup request received")
    
#     user_schema = UserSchema()
#     errors = user_schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400
    
#     data = user_schema.load(request.json)
    
#     if not is_strong_password(data['password']):
#         return jsonify({"error": "Password does not meet strength requirements."}), 400
    
#     if User.query.filter_by(email=data['email']).first():
#         return jsonify({"error": "User already exists."}), 409
    
#     new_user = User(**data)
#     user_role = Role.query.filter_by(name=RoleEnum.USER.value).first()
#     if not user_role:
#         logger.error("Default 'User' role not found in the database.")
#         return jsonify({"error": "Internal server error."}), 500
    
#     new_user.roles.append(user_role)
#     if not commit_to_db(new_user):
#         return jsonify({"error": "Internal server error."}), 500

#     try:
#         token = new_user.get_confirmation_token()
#         confirm_url = url_for('auth.confirm_email', token=token, _external=True)
        
#         html = f"""
#         <p>Hi {new_user.first_name or 'User'},</p>
#         <p>Thanks for signing up! Please confirm your email by clicking on the link below:</p>
#         <p><a href="{confirm_url}">Confirm Email</a></p>
#         """
#         msg = Message('Confirm Your Email', recipients=[new_user.email], html=html)
#         mail.send(msg)
#     except Exception as e:
#         logger.error(f"Failed to send confirmation email to {data['email']}: {str(e)}")
#         return jsonify({"error": "Failed to send confirmation email. Please try again later."}), 500
    
#     logger.info(f"User {new_user.email} created successfully")
#     return jsonify({"message": "User created successfully. Please check your email to confirm your account."}), 201

# @auth_bp.route('/confirm/<token>', methods=['GET'])
# @limiter.limit("10 per minute")
# def confirm_email(token: str) -> Tuple[Dict[str, Any], int]:
#     user = User.verify_confirmation_token(token)
#     if not user:
#         return jsonify({"error": "Invalid or expired token."}), 400
#     if user.is_active:
#         return jsonify({"message": "Account already confirmed."}), 200
    
#     user.is_active = True
#     user.confirmed_at = datetime.utcnow()
#     if not commit_to_db(user):
#         return jsonify({"error": "Internal server error."}), 500
    
#     logger.info(f"User {user.email} confirmed their email")
#     return jsonify({"message": "Email confirmed successfully."}), 200

# @auth_bp.route('/login', methods=['POST'])
# @limiter.limit("10 per minute")
# def login() -> Tuple[Dict[str, Any], int]:
#     logger.info("Login request received")
#     login_schema = LoginSchema()
#     errors = login_schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400
    
#     data = login_schema.load(request.json)
    
#     user = User.query.filter_by(email=data['email']).first()
#     if not user or not user.check_password(data['password']) or not user.is_active:
#         return jsonify({"error": "Invalid email or password."}), 401
    
#     access_token = create_access_token(
#         identity=user.id,
#         expires_delta=timedelta(hours=int(os.getenv('ACCESS_TOKEN_EXPIRES_HOURS', 1))),
#         fresh=True
#     )
#     logger.info(f"User {user.email} logged in successfully")
#     return jsonify({"access_token": access_token}), 200

# @auth_bp.route('/me', methods=['GET'])
# @jwt_required()
# def me() -> Tuple[Dict[str, Any], int]:
#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)
    
#     if not user:
#         return jsonify({"error": "User not found."}), 404
    
#     user_schema = UserSchema()
#     return jsonify({"user": user_schema.dump(user)}), 200

# @auth_bp.route('/forgot-password', methods=['POST'])
# @limiter.limit("5 per hour")
# def forgot_password() -> Tuple[Dict[str, Any], int]:
#     email_schema = EmailSchema()
#     errors = email_schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400
    
#     data = email_schema.load(request.json)
    
#     user = User.query.filter_by(email=data['email']).first()
#     if user:
#         try:
#             token = user.get_reset_token()
#             reset_url = url_for('auth.reset_password', token=token, _external=True)
            
#             html = f"""
#             <p>Hi {user.first_name or 'User'},</p>
#             <p>You have requested to reset your password. Please click the link below to reset it:</p>
#             <p><a href="{reset_url}">Reset Password</a></p>
#             <p>If you did not request this, please ignore this email.</p>
#             """
#             msg = Message('Password Reset Request', recipients=[user.email], html=html)
#             mail.send(msg)
#             logger.info(f"Password reset email sent to {user.email}")
#         except Exception as e:
#             logger.error(f"Failed to send password reset email to {data['email']}: {str(e)}")
#             return jsonify({"error": "Failed to send password reset email. Please try again later."}), 500
    
#     return jsonify({"message": "If an account with that email exists, a password reset link has been sent."}), 200

# @auth_bp.route('/reset-password', methods=['POST'])
# @limiter.limit("3 per hour")
# def reset_password() -> Tuple[Dict[str, Any], int]:
#     reset_schema = PasswordResetSchema()
#     errors = reset_schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400
    
#     data = reset_schema.load(request.json)
    
#     user = User.verify_reset_token(data['token'])
#     if not user:
#         return jsonify({"error": "Invalid or expired token."}), 400
    
#     if not is_strong_password(data['password']):
#         return jsonify({"error": "Password does not meet strength requirements."}), 400
    
#     user.set_password(data['password'])
#     if not commit_to_db(user):
#         return jsonify({"error": "Internal server error."}), 500
    
#     logger.info(f"Password reset successfully for user {user.email}")
#     return jsonify({"message": "Password has been reset successfully."}), 200

# @auth_bp.route('/settings', methods=['PUT'])
# @jwt_required()
# def update_settings() -> Tuple[Dict[str, Any], int]:
#     user_schema = UserSchema(partial=True)
#     errors = user_schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400
    
#     data = user_schema.load(request.json)
    
#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)
    
#     if not user:
#         return jsonify({"error": "User not found."}), 404
    
#     for key, value in data.items():
#         if key in ['first_name', 'last_name', 'email']:
#             setattr(user, key, value)
    
#     if not commit_to_db(user):
#         return jsonify({"error": "Internal server error."}), 500
    
#     logger.info(f"Settings updated successfully for user {user.email}")
#     return jsonify({"message": "Settings updated successfully.", "user": user_schema.dump(user)}), 200

# @auth_bp.route('/refresh', methods=['POST'])
# @jwt_required(refresh=True)
# def refresh() -> Tuple[Dict[str, Any], int]:
#     user_id = get_jwt_identity()
#     access_token = create_access_token(
#         identity=user_id,
#         expires_delta=timedelta(hours=int(os.getenv('ACCESS_TOKEN_EXPIRES_HOURS', 1)))
#     )
#     logger.info(f"Access token refreshed for user ID {user_id}")
#     return jsonify({"access_token": access_token}), 200

# from flask import Blueprint, request, jsonify, url_for, current_app
# from flask_jwt_extended import (
#     create_access_token, create_refresh_token, 
#     jwt_required, get_jwt_identity, get_jwt
# )
# from flask_mail import Message
# from sqlalchemy.exc import SQLAlchemyError
# from datetime import datetime, timedelta
# import logging
# import os
# import re

# from extensions import db, mail, limiter, jwt
# from models import User, Role, RoleEnum
# from .schemas import UserSchema, LoginSchema, PasswordResetSchema, EmailSchema, TokenBlocklistSchema

# auth_bp = Blueprint('auth', __name__)

# # Configure Logging
# logger = logging.getLogger('auth')
# handler = logging.StreamHandler()
# formatter = logging.Formatter(
#     '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
# )
# handler.setFormatter(formatter)
# logger.addHandler(handler)
# logger.setLevel(logging.INFO)

# def is_strong_password(password: str) -> bool:
#     """
#     Validate the strength of the password.
#     Requirements:
#     - At least 8 characters
#     - Contains both uppercase and lowercase characters
#     - Contains digits
#     - Contains special characters
#     """
#     return all([
#         len(password) >= 8,
#         re.search(r'[A-Z]', password),
#         re.search(r'[a-z]', password),
#         re.search(r'\d', password),
#         re.search(r'[!@#$%^&*(),.?":{}|<>_]', password)
#     ])

# @auth_bp.route('/signup', methods=['POST'])
# @limiter.limit("5 per minute")
# def signup():
#     logger.info("Signup request received")
    
#     user_schema = UserSchema()
#     errors = user_schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400
    
#     data = user_schema.load(request.json)
    
#     if not is_strong_password(data['password']):
#         return jsonify({"error": "Password does not meet strength requirements."}), 400
    
#     if User.query.filter_by(email=data['email']).first():
#         return jsonify({"error": "User already exists."}), 409
    
#     new_user = User(**data)
#     user_role = Role.query.filter_by(name=RoleEnum.USER.value).first()
#     if not user_role:
#         logger.error("Default 'User' role not found in the database.")
#         return jsonify({"error": "Internal server error."}), 500
    
#     new_user.roles.append(user_role)
    
#     try:
#         db.session.add(new_user)
#         db.session.commit()
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         logger.error(f"Database error: {str(e)}")
#         return jsonify({"error": "Internal server error."}), 500

#     try:
#         token = new_user.get_confirmation_token()
#         confirm_url = url_for('auth.confirm_email', token=token, _external=True)
        
#         html = f"""
#         <p>Hi {new_user.first_name or 'User'},</p>
#         <p>Thanks for signing up! Please confirm your email by clicking on the link below:</p>
#         <p><a href="{confirm_url}">Confirm Email</a></p>
#         """
#         msg = Message('Confirm Your Email', recipients=[new_user.email], html=html)
#         mail.send(msg)
#     except Exception as e:
#         logger.error(f"Failed to send confirmation email to {data['email']}: {str(e)}")
#         return jsonify({"error": "Failed to send confirmation email. Please try again later."}), 500
    
#     logger.info(f"User {new_user.email} created successfully")
#     return jsonify({"message": "User created successfully. Please check your email to confirm your account."}), 201

# @auth_bp.route('/confirm/<token>', methods=['GET'])
# @limiter.limit("10 per minute")
# def confirm_email(token: str):
#     user = User.verify_confirmation_token(token)
#     if not user:
#         return jsonify({"error": "Invalid or expired token."}), 400
#     if user.is_active:
#         return jsonify({"message": "Account already confirmed."}), 200
    
#     user.is_active = True
#     user.confirmed_at = datetime.utcnow()
#     try:
#         db.session.commit()
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         logger.error(f"Database error: {str(e)}")
#         return jsonify({"error": "Internal server error."}), 500
    
#     logger.info(f"User {user.email} confirmed their email")
#     return jsonify({"message": "Email confirmed successfully."}), 200

# @auth_bp.route('/login', methods=['POST'])
# @limiter.limit("10 per minute")
# def login():
#     logger.info("Login request received")
#     login_schema = LoginSchema()
#     errors = login_schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400
    
#     data = login_schema.load(request.json)
    
#     user = User.query.filter_by(email=data['email']).first()
#     if not user or not user.check_password(data['password']) or not user.is_active:
#         return jsonify({"error": "Invalid email or password."}), 401
    
#     access_token = create_access_token(
#         identity=user.id,
#         fresh=True,
#         expires_delta=timedelta(minutes=int(os.getenv('ACCESS_TOKEN_EXPIRES_MINUTES', 15)))
#     )
#     refresh_token = create_refresh_token(
#         identity=user.id,
#         expires_delta=timedelta(days=int(os.getenv('REFRESH_TOKEN_EXPIRES_DAYS', 30)))
#     )
#     logger.info(f"User {user.email} logged in successfully")
#     return jsonify({
#         "access_token": access_token,
#         "refresh_token": refresh_token,
#         "user": UserSchema().dump(user)
#     }), 200

# @auth_bp.route('/refresh', methods=['POST'])
# @jwt_required(refresh=True)
# def refresh():
#     user_id = get_jwt_identity()
#     access_token = create_access_token(
#         identity=user_id,
#         fresh=False,
#         expires_delta=timedelta(minutes=int(os.getenv('ACCESS_TOKEN_EXPIRES_MINUTES', 15)))
#     )
#     logger.info(f"Access token refreshed for user ID {user_id}")
#     return jsonify({"access_token": access_token}), 200

# @auth_bp.route('/logout', methods=['POST'])
# @jwt_required()
# def logout():
#     jti = get_jwt()["jti"]
#     now = datetime.utcnow()
#     db.session.add(TokenBlocklist(jti=jti, created_at=now))
#     db.session.commit()
#     return jsonify(msg="Successfully logged out"), 200

# @jwt.token_in_blocklist_loader
# def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
#     jti = jwt_payload["jti"]
#     token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()
#     return token is not None

# @auth_bp.route('/me', methods=['GET'])
# @jwt_required()
# def me():
#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)
    
#     if not user:
#         return jsonify({"error": "User not found."}), 404
    
#     user_schema = UserSchema()
#     return jsonify({"user": user_schema.dump(user)}), 200

# @auth_bp.route('/forgot-password', methods=['POST'])
# @limiter.limit("5 per hour")
# def forgot_password():
#     email_schema = EmailSchema()
#     errors = email_schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400
    
#     data = email_schema.load(request.json)
    
#     user = User.query.filter_by(email=data['email']).first()
#     if user:
#         try:
#             token = user.get_reset_token()
#             reset_url = url_for('auth.reset_password', token=token, _external=True)
            
#             html = f"""
#             <p>Hi {user.first_name or 'User'},</p>
#             <p>You have requested to reset your password. Please click the link below to reset it:</p>
#             <p><a href="{reset_url}">Reset Password</a></p>
#             <p>If you did not request this, please ignore this email.</p>
#             """
#             msg = Message('Password Reset Request', recipients=[user.email], html=html)
#             mail.send(msg)
#             logger.info(f"Password reset email sent to {user.email}")
#         except Exception as e:
#             logger.error(f"Failed to send password reset email to {data['email']}: {str(e)}")
#             return jsonify({"error": "Failed to send password reset email. Please try again later."}), 500
    
#     return jsonify({"message": "If an account with that email exists, a password reset link has been sent."}), 200

# @auth_bp.route('/reset-password', methods=['POST'])
# @limiter.limit("3 per hour")
# def reset_password():
#     reset_schema = PasswordResetSchema()
#     errors = reset_schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400
    
#     data = reset_schema.load(request.json)
    
#     user = User.verify_reset_token(data['token'])
#     if not user:
#         return jsonify({"error": "Invalid or expired token."}), 400
    
#     if not is_strong_password(data['password']):
#         return jsonify({"error": "Password does not meet strength requirements."}), 400
    
#     user.set_password(data['password'])
#     try:
#         db.session.commit()
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         logger.error(f"Database error: {str(e)}")
#         return jsonify({"error": "Internal server error."}), 500
    
#     logger.info(f"Password reset successfully for user {user.email}")
#     return jsonify({"message": "Password has been reset successfully."}), 200

# @auth_bp.route('/settings', methods=['PUT'])
# @jwt_required()
# def update_settings():
#     user_schema = UserSchema(partial=True)
#     errors = user_schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400
    
#     data = user_schema.load(request.json)
    
#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)
    
#     if not user:
#         return jsonify({"error": "User not found."}), 404
    
#     for key, value in data.items():
#         if key in ['first_name', 'last_name', 'email']:
#             setattr(user, key, value)
    
#     try:
#         db.session.commit()
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         logger.error(f"Database error: {str(e)}")
#         return jsonify({"error": "Internal server error."}), 500
    
#     logger.info(f"Settings updated successfully for user {user.email}")
#     return jsonify({"message": "Settings updated successfully.", "user": user_schema.dump(user)}), 200

# @auth_bp.route('/change-password', methods=['POST'])
# @jwt_required()
# def change_password():
#     data = request.get_json()
#     if not data or 'current_password' not in data or 'new_password' not in data:
#         return jsonify({"error": "Current password and new password are required."}), 400

#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)

#     if not user:
#         return jsonify({"error": "User not found."}), 404

#     if not user.check_password(data['current_password']):
#         return jsonify({"error": "Current password is incorrect."}), 400

#     if not is_strong_password(data['new_password']):
#         return jsonify({"error": "New password does not meet strength requirements."}), 400

#     user.set_password(data['new_password'])
#     try:
#         db.session.commit()
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         logger.error(f"Database error: {str(e)}")
#         return jsonify({"error": "Internal server error."}), 500

#     logger.info(f"Password changed successfully for user {user.email}")
#     return jsonify({"message": "Password changed successfully."}), 200

# from flask import Blueprint, request, jsonify, url_for, current_app
# from flask_jwt_extended import (
#     create_access_token, create_refresh_token, 
#     jwt_required, get_jwt_identity, get_jwt
# )
# from flask_mail import Message
# from sqlalchemy.exc import SQLAlchemyError
# from datetime import datetime, timedelta, timezone
# import logging
# import os

# from extensions import db, mail, limiter, jwt
# from models import User, Role, RoleEnum
# from .schemas import (
#     UserSchema, LoginSchema, TokenSchema, PasswordResetRequestSchema,
#     PasswordResetSchema, ChangePasswordSchema
# )

# auth_bp = Blueprint('auth', __name__)

# # Configure Logging
# logger = logging.getLogger('auth')
# handler = logging.StreamHandler()
# formatter = logging.Formatter(
#     '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
# )
# handler.setFormatter(formatter)
# logger.addHandler(handler)
# logger.setLevel(logging.INFO)


# # Global set to store revoked tokens
# BLOCKLIST = set()


# @auth_bp.route('/signup', methods=['POST'])
# @limiter.limit("5 per minute")
# def signup():
#     logger.info("Signup request received")
    
#     user_schema = UserSchema()
#     errors = user_schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400
    
#     data = user_schema.load(request.json)
    
#     if User.query.filter_by(email=data['email']).first():
#         return jsonify({"error": "User already exists."}), 409
    
#     new_user = User(email=data['email'], password=data['password'], 
#                     first_name=data.get('first_name', ''), 
#                     last_name=data.get('last_name', ''))
#     user_role = Role.query.filter_by(name=RoleEnum.USER).first()
#     if not user_role:
#         logger.error("Default 'User' role not found in the database.")
#         return jsonify({"error": "Internal server error."}), 500
    
#     new_user.roles.append(user_role)
    
#     try:
#         db.session.add(new_user)
#         db.session.commit()
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         logger.error(f"Database error: {str(e)}")
#         return jsonify({"error": "Internal server error."}), 500

#     try:
#         token = new_user.get_confirmation_token()
#         confirm_url = url_for('auth.confirm_email', token=token, _external=True)
        
#         html = f"""
#         <p>Hi {new_user.first_name or 'User'},</p>
#         <p>Thanks for signing up! Please confirm your email by clicking on the link below:</p>
#         <p><a href="{confirm_url}">Confirm Email</a></p>
#         """
#         msg = Message('Confirm Your Email', recipients=[new_user.email], html=html)
#         mail.send(msg)
#     except Exception as e:
#         logger.error(f"Failed to send confirmation email to {data['email']}: {str(e)}")
#         return jsonify({"error": "Failed to send confirmation email. Please try again later."}), 500
    
#     logger.info(f"User {new_user.email} created successfully")
#     return jsonify({"message": "User created successfully. Please check your email to confirm your account."}), 201

# @auth_bp.route('/confirm/<token>', methods=['GET'])
# @limiter.limit("10 per minute")
# def confirm_email(token: str):
#     user = User.verify_confirmation_token(token)
#     if not user:
#         return jsonify({"error": "Invalid or expired token."}), 400
#     if user.is_active:
#         return jsonify({"message": "Account already confirmed."}), 200
    
#     user.is_active = True
#     user.confirmed_at = datetime.utcnow()
#     try:
#         db.session.commit()
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         logger.error(f"Database error: {str(e)}")
#         return jsonify({"error": "Internal server error."}), 500
    
#     logger.info(f"User {user.email} confirmed their email")
#     return jsonify({"message": "Email confirmed successfully."}), 200

# @auth_bp.route('/login', methods=['POST'])
# @limiter.limit("10 per minute")
# def login():
#     logger.info("Login request received")
#     login_schema = LoginSchema()
#     errors = login_schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400
    
#     data = login_schema.load(request.json)
    
#     user = User.query.filter_by(email=data['email']).first()
#     if not user or not user.check_password(data['password']) or not user.is_active:
#         return jsonify({"error": "Invalid email or password."}), 401
    
#     access_token = create_access_token(
#         identity=user.id,
#         fresh=True,
#         expires_delta=timedelta(minutes=int(os.getenv('ACCESS_TOKEN_EXPIRES_MINUTES', 15)))
#     )
#     refresh_token = create_refresh_token(
#         identity=user.id,
#         expires_delta=timedelta(days=int(os.getenv('REFRESH_TOKEN_EXPIRES_DAYS', 30)))
#     )
#     logger.info(f"User {user.email} logged in successfully")
#     return jsonify(TokenSchema().dump({
#         "access_token": access_token,
#         "refresh_token": refresh_token
#     })), 200

# @auth_bp.route('/refresh', methods=['POST'])
# @jwt_required(refresh=True)
# def refresh():
#     user_id = get_jwt_identity()
#     access_token = create_access_token(
#         identity=user_id,
#         fresh=False,
#         expires_delta=timedelta(minutes=int(os.getenv('ACCESS_TOKEN_EXPIRES_MINUTES', 15)))
#     )
#     logger.info(f"Access token refreshed for user ID {user_id}")
#     return jsonify({"access_token": access_token}), 200

# @auth_bp.route('/logout', methods=['POST'])
# @jwt_required()
# def logout():
#     jti = get_jwt()["jti"]
#     BLOCKLIST.add(jti)
#     return jsonify(msg="Successfully logged out"), 200

# @jwt.token_in_blocklist_loader
# def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
#     jti = jwt_payload["jti"]
#     return jti in BLOCKLIST

# # Optional: Cleanup function to remove expired tokens from BLOCKLIST
# @auth_bp.route('/cleanup-blocklist', methods=['POST'])
# def cleanup_blocklist():
#     now = datetime.now(timezone.utc)
#     for token in list(BLOCKLIST):
#         try:
#             # Check if token is expired
#             jwt.decode(token, options={"verify_signature": False})
#         except jwt.ExpiredSignatureError:
#             BLOCKLIST.remove(token)
#     return jsonify(msg="Blocklist cleaned up"), 200

# @auth_bp.route('/me', methods=['GET'])
# @jwt_required()
# def me():
#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)
    
#     if not user:
#         return jsonify({"error": "User not found."}), 404
    
#     user_schema = UserSchema()
#     return jsonify({"user": user_schema.dump(user)}), 200

# @auth_bp.route('/forgot-password', methods=['POST'])
# @limiter.limit("5 per hour")
# def forgot_password():
#     schema = PasswordResetRequestSchema()
#     errors = schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400
    
#     data = schema.load(request.json)
    
#     user = User.query.filter_by(email=data['email']).first()
#     if user:
#         try:
#             token = user.get_reset_token()
#             reset_url = url_for('auth.reset_password', token=token, _external=True)
            
#             html = f"""
#             <p>Hi {user.first_name or 'User'},</p>
#             <p>You have requested to reset your password. Please click the link below to reset it:</p>
#             <p><a href="{reset_url}">Reset Password</a></p>
#             <p>If you did not request this, please ignore this email.</p>
#             """
#             msg = Message('Password Reset Request', recipients=[user.email], html=html)
#             mail.send(msg)
#             logger.info(f"Password reset email sent to {user.email}")
#         except Exception as e:
#             logger.error(f"Failed to send password reset email to {data['email']}: {str(e)}")
#             return jsonify({"error": "Failed to send password reset email. Please try again later."}), 500
    
#     return jsonify({"message": "If an account with that email exists, a password reset link has been sent."}), 200

# @auth_bp.route('/reset-password', methods=['POST'])
# @limiter.limit("3 per hour")
# def reset_password():
#     schema = PasswordResetSchema()
#     errors = schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400
    
#     data = schema.load(request.json)
    
#     user = User.verify_reset_token(data['token'])
#     if not user:
#         return jsonify({"error": "Invalid or expired token."}), 400
    
#     user.set_password(data['password'])
#     try:
#         db.session.commit()
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         logger.error(f"Database error: {str(e)}")
#         return jsonify({"error": "Internal server error."}), 500
    
#     logger.info(f"Password reset successfully for user {user.email}")
#     return jsonify({"message": "Password has been reset successfully."}), 200

# @auth_bp.route('/change-password', methods=['POST'])
# @jwt_required()
# def change_password():
#     schema = ChangePasswordSchema()
#     errors = schema.validate(request.json)
#     if errors:
#         return jsonify({"error": errors}), 400

#     data = schema.load(request.json)

#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)

#     if not user:
#         return jsonify({"error": "User not found."}), 404

#     if not user.check_password(data['current_password']):
#         return jsonify({"error": "Current password is incorrect."}), 400

#     user.set_password(data['new_password'])
#     try:
#         db.session.commit()
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         logger.error(f"Database error: {str(e)}")
#         return jsonify({"error": "Internal server error."}), 500

#     logger.info(f"Password changed successfully for user {user.email}")
#     return jsonify({"message": "Password changed successfully."}), 200


# # auth/routes.py

# from flask import Blueprint, request, jsonify, url_for, current_app
# from flask_jwt_extended import (
#     create_access_token, create_refresh_token, 
#     jwt_required, get_jwt_identity, get_jwt
# )
# from flask_mail import Message
# from sqlalchemy.exc import SQLAlchemyError
# from datetime import datetime, timedelta
# import logging

# from extensions import db, mail, limiter, jwt, redis_client
# from models import User, Role, RoleEnum
# from .schemas import (
#     UserSchema, LoginSchema, TokenSchema, PasswordResetRequestSchema,
#     PasswordResetSchema, ChangePasswordSchema
# )
# from .validators import validate_password
# # from tasks import send_email_task  # Asynchronous email sending
# from marshmallow import ValidationError

# from . import auth_bp

# logger = logging.getLogger('auth')

# # Remove the in-memory BLOCKLIST and use Redis instead
# def send_email(subject, recipients, html):
#     try:
#         msg = Message(subject=subject, recipients=recipients, html=html)
#         mail.send(msg)
#         current_app.logger.info(f"Email sent to {recipients} with subject '{subject}'")
#     except Exception as e:
#         current_app.logger.error(f"Failed to send email to {recipients}: {str(e)}")
#         raise
# @auth_bp.route('/signup', methods=['POST'])
# @limiter.limit("5 per minute")
# def signup():
#     logger.info("Signup request received")
    
#     user_schema = UserSchema()
#     try:
#         data = user_schema.load(request.json)
#     except ValidationError as err:
#         logger.warning(f"Signup validation failed: {err.messages}")
#         return jsonify({"error": err.messages}), 400
    
#     if User.query.filter_by(email=data['email']).first():
#         logger.warning(f"Signup attempt with existing email: {data['email']}")
#         return jsonify({"error": "User already exists."}), 409
    
#     new_user = User(
#         email=data['email'], 
#         password=data['password'], 
#         first_name=data.get('first_name', ''), 
#         last_name=data.get('last_name', '')
#     )
#     user_role = Role.query.filter_by(name=RoleEnum.USER).first()
#     if not user_role:
#         logger.error("Default 'User' role not found in the database.")
#         return jsonify({"error": "Internal server error."}), 500
    
#     new_user.roles.append(user_role)
    
#     try:
#         db.session.add(new_user)
#         db.session.commit()
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         logger.error(f"Database error during signup: {str(e)}")
#         return jsonify({"error": "Internal server error."}), 500

#     try:
#         token = new_user.get_confirmation_token()
#         confirm_url = url_for('auth.confirm_email', token=token, _external=True)
        
#         html = f"""
#         <p>Hi {new_user.first_name or 'User'},</p>
#         <p>Thanks for signing up! Please confirm your email by clicking on the link below:</p>
#         <p><a href="{confirm_url}">Confirm Email</a></p>
#         """
#         # Send confirmation email asynchronously
#         send_email(
#             subject='Confirm Your Email',
#             recipients=[new_user.email],
#             html=html
#         )
#     except Exception as e:
#         logger.error(f"Failed to send confirmation email to {new_user.email}: {str(e)}")
#         return jsonify({"error": "Failed to send confirmation email. Please try again later."}), 500
    
#     logger.info(f"User {new_user.email} created successfully")
#     return jsonify({"message": "User created successfully. Please check your email to confirm your account."}), 201

# @auth_bp.route('/confirm/<token>', methods=['GET'])
# @limiter.limit("10 per minute")
# def confirm_email(token: str):
#     user = User.verify_confirmation_token(token)
#     if not user:
#         logger.warning("Email confirmation failed due to invalid or expired token.")
#         return jsonify({"error": "Invalid or expired token."}), 400
#     if user.is_active:
#         logger.info(f"User {user.email} attempted to confirm an already active account.")
#         return jsonify({"message": "Account already confirmed."}), 200
    
#     user.is_active = True
#     user.confirmed_at = datetime.utcnow()
#     try:
#         db.session.commit()
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         logger.error(f"Database error during email confirmation: {str(e)}")
#         return jsonify({"error": "Internal server error."}), 500
    
#     logger.info(f"User {user.email} confirmed their email successfully")
#     return jsonify({"message": "Email confirmed successfully."}), 200

# @auth_bp.route('/login', methods=['POST'])
# @limiter.limit("5 per minute")  # Stricter limit for login
# def login():
#     logger.info("Login request received")
#     login_schema = LoginSchema()
#     try:
#         data = login_schema.load(request.json)
#     except ValidationError as err:
#         logger.warning(f"Login validation failed: {err.messages}")
#         return jsonify({"error": err.messages}), 400
    
#     user = User.query.filter_by(email=data['email']).first()
#     if not user or not user.check_password(data['password']) or not user.is_active:
#         logger.warning(f"Invalid login attempt for email: {data['email']}")
#         return jsonify({"error": "Invalid email or password."}), 401
    
#     access_token = create_access_token(
#         identity=user.id,
#         fresh=True,
#         expires_delta=timedelta(seconds=current_app.config['JWT_ACCESS_TOKEN_EXPIRES'])
#     )
#     refresh_token = create_refresh_token(
#         identity=user.id,
#         expires_delta=timedelta(seconds=current_app.config['JWT_REFRESH_TOKEN_EXPIRES'])
#     )
#     logger.info(f"User {user.email} logged in successfully")
#     return jsonify(TokenSchema().dump({
#         "access_token": access_token,
#         "refresh_token": refresh_token
#     })), 200

# @auth_bp.route('/refresh', methods=['POST'])
# @jwt_required(refresh=True)
# def refresh():
#     user_id = get_jwt_identity()
#     access_token = create_access_token(
#         identity=user_id,
#         fresh=False,
#         expires_delta=timedelta(seconds=current_app.config['JWT_ACCESS_TOKEN_EXPIRES'])
#     )
#     logger.info(f"Access token refreshed for user ID {user_id}")
#     return jsonify({"access_token": access_token}), 200

# @auth_bp.route('/logout', methods=['POST'])
# @jwt_required()
# def logout():
#     jti = get_jwt()["jti"]
#     exp_timestamp = get_jwt()["exp"]
#     now = datetime.utcnow().timestamp()
#     remaining = int(exp_timestamp) - int(now)
#     if remaining > 0:
#         redis_client.setex(jti, timedelta(seconds=remaining), 'revoked')
#         logger.info(f"Token {jti} has been revoked and stored in Redis")
#     else:
#         logger.warning(f"Attempted to revoke expired token {jti}")
#     return jsonify({"message": "Successfully logged out."}), 200

# @jwt.token_in_blocklist_loader
# def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
#     jti = jwt_payload["jti"]
#     is_revoked = redis_client.get(jti) is not None
#     if is_revoked:
#         logger.debug(f"Token {jti} is revoked.")
#     return is_revoked

# # Removed the in-memory /cleanup-blocklist route

# @auth_bp.route('/me', methods=['GET'])
# @jwt_required()
# def me():
#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)
    
#     if not user:
#         logger.warning(f"User with ID {user_id} not found.")
#         return jsonify({"error": "User not found."}), 404
    
#     user_schema = UserSchema()
#     logger.info(f"User data retrieved for {user.email}")
#     return jsonify({"user": user_schema.dump(user)}), 200

# @auth_bp.route('/forgot-password', methods=['POST'])
# @limiter.limit("5 per hour")
# def forgot_password():
#     schema = PasswordResetRequestSchema()
#     try:
#         data = schema.load(request.json)
#     except ValidationError as err:
#         logger.warning(f"Password reset request validation failed: {err.messages}")
#         return jsonify({"error": err.messages}), 400
    
#     user = User.query.filter_by(email=data['email']).first()
#     if user:
#         try:
#             token = user.get_reset_token()
#             reset_url = url_for('auth.reset_password', token=token, _external=True)
            
#             html = f"""
#             <p>Hi {user.first_name or 'User'},</p>
#             <p>You have requested to reset your password. Please click the link below to reset it:</p>
#             <p><a href="{reset_url}">Reset Password</a></p>
#             <p>If you did not request this, please ignore this email.</p>
#             """
#             # Send password reset email asynchronously
#             send_email(
#                 subject='Password Reset Request',
#                 recipients=[user.email],
#                 html=html
#             )
#             logger.info(f"Password reset email queued for {user.email}")
#         except Exception as e:
#             logger.error(f"Failed to send password reset email to {user.email}: {str(e)}")
#             return jsonify({"error": "Failed to send password reset email. Please try again later."}), 500
    
#     # Always respond with the same message to prevent email enumeration
#     return jsonify({"message": "If an account with that email exists, a password reset link has been sent."}), 200

# @auth_bp.route('/reset-password', methods=['POST'])
# @limiter.limit("3 per hour")
# def reset_password():
#     schema = PasswordResetSchema()
#     try:
#         data = schema.load(request.json)
#     except ValidationError as err:
#         logger.warning(f"Password reset validation failed: {err.messages}")
#         return jsonify({"error": err.messages}), 400
    
#     user = User.verify_reset_token(data['token'])
#     if not user:
#         logger.warning("Password reset failed due to invalid or expired token.")
#         return jsonify({"error": "Invalid or expired token."}), 400
    
#     user.set_password(data['password'])
#     try:
#         db.session.commit()
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         logger.error(f"Database error during password reset: {str(e)}")
#         return jsonify({"error": "Internal server error."}), 500
    
#     logger.info(f"Password reset successfully for user {user.email}")
#     return jsonify({"message": "Password has been reset successfully."}), 200

# @auth_bp.route('/change-password', methods=['POST'])
# @jwt_required()
# def change_password():
#     schema = ChangePasswordSchema()
#     try:
#         data = schema.load(request.json)
#     except ValidationError as err:
#         logger.warning(f"Change password validation failed: {err.messages}")
#         return jsonify({"error": err.messages}), 400

#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)

#     if not user:
#         logger.warning(f"Change password attempted for non-existent user ID {user_id}")
#         return jsonify({"error": "User not found."}), 404

#     if not user.check_password(data['current_password']):
#         logger.warning(f"Incorrect current password for user {user.email}")
#         return jsonify({"error": "Current password is incorrect."}), 400

#     user.set_password(data['new_password'])
#     try:
#         db.session.commit()
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         logger.error(f"Database error during password change: {str(e)}")
#         return jsonify({"error": "Internal server error."}), 500

#     logger.info(f"Password changed successfully for user {user.email}")
#     return jsonify({"message": "Password changed successfully."}), 200
