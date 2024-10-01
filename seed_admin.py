# seed_admin.py

from flask import Flask
from extensions import db, bcrypt
from models import User, Role, UserRole, RoleEnum
from dotenv import load_dotenv
from datetime import datetime
import os

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

def seed_admin():
    with app.app_context():
        admin_email = 'admin@example.com'
        admin_password = 'SecureAdminPass123'  # Choose a strong password

        # Check if admin user already exists
        admin_user = User.query.filter_by(email=admin_email).first()
        if not admin_user:
            # Create admin user
            admin_user = User(
                email=admin_email,
                password=admin_password,
                first_name='Admin',
                last_name='User',
                is_active=True,
                confirmed_at=datetime.utcnow()
            )
            db.session.add(admin_user)
            db.session.commit()
            print("Admin user created.")
        else:
            print("Admin user already exists.")

        # Assign Admin role
        admin_role = Role.query.filter_by(name=RoleEnum.ADMIN.value).first()
        if admin_role:
            admin_user_role = UserRole.query.filter_by(user_id=admin_user.id, role_id=admin_role.id).first()
            if not admin_user_role:
                user_role = UserRole(user_id=admin_user.id, role_id=admin_role.id)
                db.session.add(user_role)
                db.session.commit()
                print("Admin role assigned to admin user.")
            else:
                print("Admin user already has Admin role.")
        else:
            print("Admin role not found. Please seed roles first.")

if __name__ == '__main__':
    seed_admin()
