# auth/routes.py
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
# @limiter.limit("5 per minute")  # Commented out for debugging
def signup():
    logger.info("Signup request received")
    
    # Log request details
    logger.info(f"Request method: {request.method}")
    logger.info(f"Request headers: {request.headers}")
    logger.info(f"Request body: {request.get_data(as_text=True)}")
    
    data = request.get_json()
    logger.info(f"Parsed JSON data: {data}")
    
    # Extracting first_name and last_name
    first_name = data.get('first_name', '').strip()
    last_name = data.get('last_name', '').strip()
    email = data.get('email')
    password = data.get('password')
    
    logger.info(f"First Name: {first_name}")
    logger.info(f"Last Name: {last_name}")
    logger.info(f"Email: {email}")
    logger.info(f"Password length: {len(password) if password else 0}")
    
    if not email or not password:
        logger.warning("Signup attempt with missing email or password.")
        return jsonify({"error": "Email and password are required."}), 400
    
    # Validate email format
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        logger.warning(f"Signup attempt with invalid email format: {email}")
        return jsonify({"error": "Invalid email format."}), 400
    
    # Validate password strength
    if not is_strong_password(password):
        logger.warning(f"Signup attempt with weak password for email: {email}")
        return jsonify({"error": "Password does not meet strength requirements."}), 400
    
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        logger.warning(f"Signup attempt with existing email: {email}")
        return jsonify({"error": "User already exists."}), 409
    
    try:
        # Start a database transaction
        logger.info("Starting database transaction")
        new_user = User(email=email, password=password, first_name=first_name, last_name=last_name)
        db.session.add(new_user)
        db.session.flush()  # Flush to assign an ID to new_user
        logger.info(f"New user created with ID: {new_user.id}")

        # Assign default 'User' role
        user_role = Role.query.filter_by(name=RoleEnum.USER.value).first()
        if user_role:
            new_user.roles.append(user_role)
            logger.info(f"Assigned 'User' role to new user")
        else:
            logger.error("Default 'User' role not found in the database.")
            db.session.rollback()
            return jsonify({"error": "Internal server error."}), 500
        
        db.session.commit()
        logger.info(f"Database transaction committed successfully")

    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error(f"Database error during signup for {email}: {str(e)}")
        return jsonify({"error": "Internal server error."}), 500
    
    try:
        # Send confirmation email
        logger.info("Generating confirmation token")
        token = new_user.get_confirmation_token()
        logger.info(f"Confirmation token generated: {token}")
        confirm_url = url_for('auth.confirm_email', token=token, _external=True)
        logger.info(f"Confirmation URL generated: {confirm_url}")
        
        html = f"""
        <p>Hi {new_user.first_name or 'User'},</p>
        <p>Thanks for signing up! Please confirm your email by clicking on the link below:</p>
        <p><a href="{confirm_url}">Confirm Email</a></p>
        """
        msg = Message('Confirm Your Email', recipients=[new_user.email], html=html)
        mail.send(msg)
        logger.info(f"Confirmation email sent to: {email}")
    except Exception as e:
        logger.error(f"Failed to send confirmation email to {email}: {str(e)}")
        # Optionally, you can mark the user as needing to resend confirmation
        # Or, delete the user if email is critical
        return jsonify({"error": "Failed to send confirmation email. Please try again later."}), 500
    
    logger.info(f"Signup successful for email: {email}")
    return jsonify({"message": "User created successfully. Please check your email to confirm your account."}), 201

@auth_bp.route('/confirm/<token>', methods=['GET'])
@limiter.limit("10 per minute")  # Limit to 10 confirmation attempts per minute per IP
def confirm_email(token):
    user = User.verify_confirmation_token(token)
    if not user:
        logger.warning(f"Email confirmation failed. Invalid or expired token: {token}")
        return jsonify({"error": "Invalid or expired token."}), 400
    if user.is_active:
        logger.info(f"Email confirmation attempted for already active account: {user.email}")
        return jsonify({"message": "Account already confirmed."}), 200
    try:
        user.is_active = True
        user.confirmed_at = datetime.utcnow()
        db.session.commit()
        logger.info(f"Email confirmed for user: {user.email}")
        return jsonify({"message": "Email confirmed successfully."}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        logger.error(f"Database error during email confirmation for {user.email}: {str(e)}")
        return jsonify({"error": "Internal server error."}), 500

@auth_bp.route('/login', methods=['POST'])
@limiter.limit("10 per minute")  # Limit to 10 login attempts per minute per IP
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        logger.warning("Login attempt with missing email or password.")
        return jsonify({"error": "Email and password are required."}), 400
    
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        logger.warning(f"Failed login attempt for email: {email}")
        return jsonify({"error": "Invalid email or password."}), 401
    
    if not user.is_active:
        logger.warning(f"Login attempt for inactive account: {email}")
        return jsonify({"error": "Account is not active. Please confirm your email."}), 403
    
    access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=1))
    logger.info(f"User logged in: {email}")
    return jsonify({"access_token": access_token}), 200

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        logger.warning(f"Authenticated user not found: ID {user_id}")
        return jsonify({"error": "User not found."}), 404
    
    user_data = {
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "is_active": user.is_active,
        "roles": [role.name for role in user.roles],
        "created_at": user.created_at.isoformat(),
        "updated_at": user.updated_at.isoformat()
    }
    logger.info(f"User data fetched for: {user.email}")
    return jsonify({"user": user_data}), 200
