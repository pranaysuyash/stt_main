# # seed_roles.py

# from flask import Flask
# from extensions import db
# from models import Role, RoleEnum
# from dotenv import load_dotenv
# import os

# load_dotenv()

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db.init_app(app)

# def seed_roles():
#     with app.app_context():
#         roles = [role.value for role in RoleEnum]
#         for role_name in roles:
#             existing_role = Role.query.filter_by(name=role_name).first()
#             if not existing_role:
#                 new_role = Role(name=role_name, description=f'{role_name} role')
#                 db.session.add(new_role)
#         db.session.commit()
#         print("Roles seeded successfully.")

# if __name__ == '__main__':
#     seed_roles()

from app import app
from extensions import db
from models import Role, RoleEnum

def seed_roles():
    with app.app_context():
        roles = [
            Role(name=RoleEnum.ADMIN, description='Administrator'),
            Role(name=RoleEnum.USER, description='Regular User'),
            Role(name=RoleEnum.MANAGER, description='Manager'),
        ]
        for role in roles:
            existing_role = Role.query.filter_by(name=role.name).first()
            if not existing_role:
                db.session.add(role)
        db.session.commit()
        print("Roles seeded successfully.")

if __name__ == '__main__':
    seed_roles()
