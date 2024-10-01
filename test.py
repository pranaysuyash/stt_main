# auth/routes.py

from flask import Blueprint, request, jsonify, url_for
from extensions import db, mail
from models import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_mail import Message

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Email and password are required."}), 400
    
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User already exists."}), 409
    
    # Create new user
    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    
    # Assign default 'User' role
    user_role = Role.query.filter_by(name='User').first()
    if user_role:
        new_user.roles.append(user_role)
        db.session.commit()
    
    # Send confirmation email
    token = new_user.get_confirmation_token()
    confirm_url = url_for('auth.confirm_email', token=token, _external=True)
    html = f"""
    <p>Hi {new_user.first_name or 'User'},</p>
    <p>Thanks for signing up! Please confirm your email by clicking on the link below:</p>
    <p><a href="{confirm_url}">Confirm Email</a></p>
    """
    msg = Message('Confirm Your Email', recipients=[new_user.email], html=html)
    mail.send(msg)
    
    return jsonify({"message": "User created successfully. Please check your email to confirm your account."}), 201

@auth_bp.route('/confirm/<token>', methods=['GET'])
def confirm_email(token):
    user = User.verify_confirmation_token(token)
    if not user:
        return jsonify({"error": "Invalid or expired token."}), 400
    if user.is_active:
        return jsonify({"message": "Account already confirmed."}), 200
    user.is_active = True
    user.confirmed_at = datetime.utcnow()
    db.session.commit()
    return jsonify({"message": "Email confirmed successfully."}), 200

@auth_bp.route('/login', methods=['POST'])
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
