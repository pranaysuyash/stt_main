
# # # models.py

# # from extensions import db, bcrypt
# # from datetime import datetime, timedelta
# # from flask import current_app
# # from enum import Enum
# # from sqlalchemy import Enum as SQLAlchemyEnum
# # import jwt


# # class RoleEnum(str, Enum):
# #     ADMIN = 'ADMIN'
# #     USER = 'USER'
# #     MANAGER = 'MANAGER'

# # class UserRole(db.Model):
# #     __tablename__ = 'user_roles'
    
# #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), primary_key=True)
# #     assigned_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# #     user = db.relationship('User', back_populates='user_roles', overlaps="roles,user_roles")
# #     role = db.relationship('Role', back_populates='user_roles', overlaps="users,user_roles")

# # class User(db.Model):
# #     __tablename__ = 'users'
    
# #     id = db.Column(db.Integer, primary_key=True)
# #     email = db.Column(db.String(120), unique=True, nullable=False, index=True)
# #     password_hash = db.Column(db.String(128), nullable=False)
# #     first_name = db.Column(db.String(30))
# #     last_name = db.Column(db.String(30))
# #     is_active = db.Column(db.Boolean, default=False)
# #     confirmed_at = db.Column(db.DateTime)
# #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# #     is_deleted = db.Column(db.Boolean, default=False)
    
# #     user_roles = db.relationship(
# #         'UserRole', 
# #         back_populates='user', 
# #         cascade="all, delete-orphan", 
# #         overlaps="roles,user_roles"
# #     )
# #     roles = db.relationship(
# #         'Role', 
# #         secondary='user_roles', 
# #         back_populates='users', 
# #         overlaps="user_roles,roles"
# #     )
    
# #     memberships = db.relationship('OrganizationMember', back_populates='user', cascade="all, delete-orphan")
# #     workspace_memberships = db.relationship('WorkspaceMember', back_populates='user', cascade="all, delete-orphan")
# #     subscriptions = db.relationship('Subscription', back_populates='user', cascade="all, delete-orphan")
    
# #     def __init__(self, email, password, first_name='', last_name=''):
# #         self.email = email
# #         self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
# #         self.first_name = first_name
# #         self.last_name = last_name

# #     def check_password(self, password):
# #         return bcrypt.check_password_hash(self.password_hash, password)

# #     def get_confirmation_token(self, expires_in=3600):
# #         payload = {
# #             'confirm': self.id,
# #             'exp': datetime.utcnow() + timedelta(seconds=expires_in)
# #         }
# #         token = jwt.encode(
# #             payload,
# #             current_app.config['SECRET_KEY'],
# #             algorithm='HS256'
# #         )
# #         return token

# #     @staticmethod
# #     def verify_confirmation_token(token):
# #         try:
# #             payload = jwt.decode(
# #                 token,
# #                 current_app.config['SECRET_KEY'],
# #                 algorithms=['HS256']
# #             )
# #             user_id = payload.get('confirm')
# #             if user_id is None:
# #                 return None
# #             return User.query.get(user_id)
# #         except jwt.ExpiredSignatureError:
# #             return None
# #         except jwt.InvalidTokenError:
# #             return None

# #     def __repr__(self):
# #         return f"<User {self.email}>"
# #     def to_dict(self):
# #         return {
# #             'id': self.id,
# #             'email': self.email,
# #             'first_name': self.first_name,
# #             'last_name': self.last_name,
# #             'is_active': self.is_active,
# #             'created_at': self.created_at.isoformat() if self.created_at else None,
# #             'updated_at': self.updated_at.isoformat() if self.updated_at else None,
# #             'roles': [role.name for role in self.roles]
# #         }



# # class Role(db.Model):
# #     __tablename__ = 'roles'
    
# #     id = db.Column(db.Integer, primary_key=True)
# #     name = db.Column(SQLAlchemyEnum(RoleEnum, name='roleenum'), unique=True, nullable=False)  # Ensure 'roleenum' is specified
# #     description = db.Column(db.String(255))
    
# #     user_roles = db.relationship(
# #         'UserRole', 
# #         back_populates='role', 
# #         cascade="all, delete-orphan", 
# #         overlaps="users,user_roles"
# #     )
# #     users = db.relationship(
# #         'User', 
# #         secondary='user_roles', 
# #         back_populates='roles', 
# #         overlaps="user_roles,users"
# #     )
    
# #     def __init__(self, name: RoleEnum, description=''):
# #         self.name = name
# #         self.description = description

# #     def to_dict(self):
# #         return {
# #             'id': self.id,
# #             'name': self.name.value,
# #             'description': self.description
# #         }

# # class Organization(db.Model):
# #     __tablename__ = 'organizations'
    
# #     id = db.Column(db.Integer, primary_key=True)
# #     name = db.Column(db.String(150), unique=True, nullable=False)
# #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# #     is_deleted = db.Column(db.Boolean, default=False)
    
# #     members = db.relationship('OrganizationMember', back_populates='organization', cascade="all, delete-orphan")
# #     workspaces = db.relationship('Workspace', back_populates='organization', cascade="all, delete-orphan")

# # class Workspace(db.Model):
# #     __tablename__ = 'workspaces'
    
# #     id = db.Column(db.Integer, primary_key=True)
# #     name = db.Column(db.String(150), nullable=False)
# #     organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
# #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# #     is_deleted = db.Column(db.Boolean, default=False)
    
# #     organization = db.relationship('Organization', back_populates='workspaces')
# #     members = db.relationship('WorkspaceMember', back_populates='workspace', cascade="all, delete-orphan")

# # class WorkspaceMember(db.Model):
# #     __tablename__ = 'workspace_members'
    
# #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# #     workspace_id = db.Column(db.Integer, db.ForeignKey('workspaces.id'), primary_key=True)
# #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
# #     joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# #     user = db.relationship('User', back_populates='workspace_memberships')
# #     workspace = db.relationship('Workspace', back_populates='members')
# #     role = db.relationship('Role')

# # class OrganizationMember(db.Model):
# #     __tablename__ = 'organization_members'
    
# #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# #     organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), primary_key=True)
# #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
# #     joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# #     user = db.relationship('User', back_populates='memberships')
# #     organization = db.relationship('Organization', back_populates='members')
# #     role = db.relationship('Role')

# # class SubscriptionTier(db.Model):
# #     __tablename__ = 'subscription_tiers'
    
# #     id = db.Column(db.Integer, primary_key=True)
# #     name = db.Column(db.String(50), unique=True, nullable=False)
# #     price = db.Column(db.Float, nullable=False)
# #     features = db.Column(db.JSON)
# #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
# #     subscriptions = db.relationship('Subscription', back_populates='tier', cascade="all, delete-orphan")

# # class Subscription(db.Model):
# #     __tablename__ = 'subscriptions'
    
# #     id = db.Column(db.Integer, primary_key=True)
# #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
# #     tier_id = db.Column(db.Integer, db.ForeignKey('subscription_tiers.id'), nullable=False)
# #     start_date = db.Column(db.DateTime, default=datetime.utcnow)
# #     end_date = db.Column(db.DateTime, nullable=True)
# #     is_active = db.Column(db.Boolean, default=True)
# #     is_deleted = db.Column(db.Boolean, default=False)
    
# #     user = db.relationship('User', back_populates='subscriptions')
# #     tier = db.relationship('SubscriptionTier', back_populates='subscriptions')


# # class File(db.Model):
# #     __tablename__ = 'files'
    
# #     id = db.Column(db.Integer, primary_key=True)
# #     filename = db.Column(db.String(255), unique=True, nullable=False, index=True)
# #     path = db.Column(db.String(255), unique=True, nullable=False, index=True)
# #     size = db.Column(db.BigInteger, nullable=False, index=True)  # File size in bytes
# #     type = db.Column(db.String(100), nullable=False)  # MIME type of the file
# #     duration = db.Column(db.String(10))  # Duration if it's a media file like audio or video
# #     uploaded_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False, index=True)
    
# #     # Many-to-many relationship with Tag
# #     tags = db.relationship('Tag', secondary='file_tags', back_populates='files')

# #     def to_dict(self):
# #         return {
# #             'id': self.id,
# #             'filename': self.filename,
# #             'path': self.path,
# #             'size': self.size,
# #             'type': self.type,
# #             'duration': self.duration,
# #             'uploaded_at': self.uploaded_at.isoformat(),
# #             'tags': [tag.name for tag in self.tags]
# #         }


# # class Tag(db.Model):
# #     __tablename__ = 'tags'
    
# #     id = db.Column(db.Integer, primary_key=True)
# #     name = db.Column(db.String(50), unique=True, nullable=False)
    
# #     # Many-to-many relationship with File
# #     files = db.relationship('File', secondary='file_tags', back_populates='tags')

# # file_tags = db.Table('file_tags',
# #     db.Column('file_id', db.Integer, db.ForeignKey('files.id'), primary_key=True),
# #     db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True)
# # )


# # models.py

# from extensions import db, bcrypt
# from datetime import datetime, timedelta
# from flask import current_app
# from enum import Enum
# from sqlalchemy import Enum as SQLAlchemyEnum
# import jwt


# class RoleEnum(str, Enum):
#     ADMIN = 'ADMIN'
#     USER = 'USER'
#     MANAGER = 'MANAGER'


# class UserRole(db.Model):
#     __tablename__ = 'user_roles'
    
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
#     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), primary_key=True)
#     assigned_at = db.Column(db.DateTime, default=datetime.utcnow)
    
#     user = db.relationship('User', back_populates='user_roles', overlaps="roles,user_roles")
#     role = db.relationship('Role', back_populates='user_roles', overlaps="users,user_roles")


# class User(db.Model):
#     __tablename__ = 'users'
    
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(120), unique=True, nullable=False, index=True)
#     password_hash = db.Column(db.String(128), nullable=False)
#     first_name = db.Column(db.String(30))
#     last_name = db.Column(db.String(30))
#     is_active = db.Column(db.Boolean, default=False)
#     confirmed_at = db.Column(db.DateTime)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
#     is_deleted = db.Column(db.Boolean, default=False)
    
#     user_roles = db.relationship(
#         'UserRole', 
#         back_populates='user', 
#         cascade="all, delete-orphan", 
#         overlaps="roles,user_roles"
#     )
#     roles = db.relationship(
#         'Role', 
#         secondary='user_roles', 
#         back_populates='users', 
#         overlaps="user_roles,roles"
#     )
    
#     memberships = db.relationship('OrganizationMember', back_populates='user', cascade="all, delete-orphan")
#     workspace_memberships = db.relationship('WorkspaceMember', back_populates='user', cascade="all, delete-orphan")
#     subscriptions = db.relationship('Subscription', back_populates='user', cascade="all, delete-orphan")
    
#     def __init__(self, email, password, first_name='', last_name=''):
#         self.email = email
#         self.set_password(password)
#         self.first_name = first_name
#         self.last_name = last_name

#     def set_password(self, password):
#         self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

#     def check_password(self, password):
#         return bcrypt.check_password_hash(self.password_hash, password)

#     def get_confirmation_token(self, expires_in=3600):
#         payload = {
#             'confirm': self.id,
#             'exp': datetime.utcnow() + timedelta(seconds=expires_in)
#         }
#         token = jwt.encode(
#             payload,
#             current_app.config['SECRET_KEY'],
#             algorithm='HS256'
#         )
#         return token

#     @staticmethod
#     def verify_confirmation_token(token):
#         try:
#             payload = jwt.decode(
#                 token,
#                 current_app.config['SECRET_KEY'],
#                 algorithms=['HS256']
#             )
#             user_id = payload.get('confirm')
#             if user_id is None:
#                 return None
#             return User.query.get(user_id)
#         except jwt.ExpiredSignatureError:
#             return None
#         except jwt.InvalidTokenError:
#             return None

#     def get_reset_token(self, expires_in=3600):
#         payload = {
#             'reset': self.id,
#             'exp': datetime.utcnow() + timedelta(seconds=expires_in)
#         }
#         token = jwt.encode(
#             payload,
#             current_app.config['SECRET_KEY'],
#             algorithm='HS256'
#         )
#         return token

#     @staticmethod
#     def verify_reset_token(token):
#         try:
#             payload = jwt.decode(
#                 token,
#                 current_app.config['SECRET_KEY'],
#                 algorithms=['HS256']
#             )
#             user_id = payload.get('reset')
#             if user_id is None:
#                 return None
#             return User.query.get(user_id)
#         except jwt.ExpiredSignatureError:
#             return None
#         except jwt.InvalidTokenError:
#             return None

#     def __repr__(self):
#         return f"<User {self.email}>"

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'email': self.email,
#             'first_name': self.first_name,
#             'last_name': self.last_name,
#             'is_active': self.is_active,
#             'created_at': self.created_at.isoformat() if self.created_at else None,
#             'updated_at': self.updated_at.isoformat() if self.updated_at else None,
#             'roles': [role.name for role in self.roles]
#         }


# class Role(db.Model):
#     __tablename__ = 'roles'
    
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(SQLAlchemyEnum(RoleEnum, name='roleenum'), unique=True, nullable=False)
#     description = db.Column(db.String(255))
    
#     user_roles = db.relationship(
#         'UserRole', 
#         back_populates='role', 
#         cascade="all, delete-orphan", 
#         overlaps="users,user_roles"
#     )
#     users = db.relationship(
#         'User', 
#         secondary='user_roles', 
#         back_populates='roles', 
#         overlaps="user_roles,users"
#     )
    
#     def __init__(self, name: RoleEnum, description=''):
#         self.name = name
#         self.description = description

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'name': self.name.value,
#             'description': self.description
#         }


# class Organization(db.Model):
#     __tablename__ = 'organizations'
    
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(150), unique=True, nullable=False)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
#     is_deleted = db.Column(db.Boolean, default=False)
    
#     members = db.relationship('OrganizationMember', back_populates='organization', cascade="all, delete-orphan")
#     workspaces = db.relationship('Workspace', back_populates='organization', cascade="all, delete-orphan")


# class Workspace(db.Model):
#     __tablename__ = 'workspaces'
    
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(150), nullable=False)
#     organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
#     is_deleted = db.Column(db.Boolean, default=False)
    
#     organization = db.relationship('Organization', back_populates='workspaces')
#     members = db.relationship('WorkspaceMember', back_populates='workspace', cascade="all, delete-orphan")


# class WorkspaceMember(db.Model):
#     __tablename__ = 'workspace_members'
    
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
#     workspace_id = db.Column(db.Integer, db.ForeignKey('workspaces.id'), primary_key=True)
#     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
#     joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
#     user = db.relationship('User', back_populates='workspace_memberships')
#     workspace = db.relationship('Workspace', back_populates='members')
#     role = db.relationship('Role')


# class OrganizationMember(db.Model):
#     __tablename__ = 'organization_members'
    
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
#     organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), primary_key=True)
#     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
#     joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
#     user = db.relationship('User', back_populates='memberships')
#     organization = db.relationship('Organization', back_populates='members')
#     role = db.relationship('Role')


# class SubscriptionTier(db.Model):
#     __tablename__ = 'subscription_tiers'
    
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50), unique=True, nullable=False)
#     price = db.Column(db.Float, nullable=False)
#     features = db.Column(db.JSON)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
#     subscriptions = db.relationship('Subscription', back_populates='tier', cascade="all, delete-orphan")


# class Subscription(db.Model):
#     __tablename__ = 'subscriptions'
    
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     tier_id = db.Column(db.Integer, db.ForeignKey('subscription_tiers.id'), nullable=False)
#     start_date = db.Column(db.DateTime, default=datetime.utcnow)
#     end_date = db.Column(db.DateTime, nullable=True)
#     is_active = db.Column(db.Boolean, default=True)
#     is_deleted = db.Column(db.Boolean, default=False)
    
#     user = db.relationship('User', back_populates='subscriptions')
#     tier = db.relationship('SubscriptionTier', back_populates='subscriptions')


# class File(db.Model):
#     __tablename__ = 'files'
    
#     id = db.Column(db.Integer, primary_key=True)
#     filename = db.Column(db.String(255), unique=True, nullable=False, index=True)
#     path = db.Column(db.String(255), unique=True, nullable=False, index=True)
#     size = db.Column(db.BigInteger, nullable=False, index=True)  # File size in bytes
#     type = db.Column(db.String(100), nullable=False)  # MIME type of the file
#     duration = db.Column(db.String(10))  # Duration if it's a media file like audio or video
#     uploaded_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False, index=True)
    
#     # Many-to-many relationship with Tag
#     tags = db.relationship('Tag', secondary='file_tags', back_populates='files')

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'filename': self.filename,
#             'path': self.path,
#             'size': self.size,
#             'type': self.type,
#             'duration': self.duration,
#             'uploaded_at': self.uploaded_at.isoformat(),
#             'tags': [tag.name for tag in self.tags]
#         }


# class Tag(db.Model):
#     __tablename__ = 'tags'
    
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50), unique=True, nullable=False)
    
#     # Many-to-many relationship with File
#     files = db.relationship('File', secondary='file_tags', back_populates='tags')


# file_tags = db.Table('file_tags',
#     db.Column('file_id', db.Integer, db.ForeignKey('files.id'), primary_key=True),
#     db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True)
# )

# models.py

from extensions import db, bcrypt
from datetime import datetime, timedelta
from flask import current_app
from enum import Enum
from sqlalchemy import Enum as SQLAlchemyEnum
import jwt


class RoleEnum(str, Enum):
    ADMIN = 'ADMIN'
    USER = 'USER'
    MANAGER = 'MANAGER'


class UserRole(db.Model):
    __tablename__ = 'user_roles'
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), primary_key=True)
    assigned_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', back_populates='user_roles', overlaps="roles,user_roles")
    role = db.relationship('Role', back_populates='user_roles', overlaps="users,user_roles")


class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(128), nullable=False)
    first_name = db.Column(db.String(30))
    last_name = db.Column(db.String(30))
    is_active = db.Column(db.Boolean, default=False)
    confirmed_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_deleted = db.Column(db.Boolean, default=False)
    
    user_roles = db.relationship(
        'UserRole', 
        back_populates='user', 
        cascade="all, delete-orphan", 
        overlaps="roles,user_roles"
    )
    roles = db.relationship(
        'Role', 
        secondary='user_roles', 
        back_populates='users', 
        overlaps="user_roles,roles"
    )
    
    memberships = db.relationship('OrganizationMember', back_populates='user', cascade="all, delete-orphan")
    workspace_memberships = db.relationship('WorkspaceMember', back_populates='user', cascade="all, delete-orphan")
    subscriptions = db.relationship('Subscription', back_populates='user', cascade="all, delete-orphan")
    
    def __init__(self, email, password, first_name='', last_name=''):
        self.email = email
        self.set_password(password)
        self.first_name = first_name
        self.last_name = last_name

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def get_confirmation_token(self, expires_in=3600):
        payload = {
            'confirm': self.id,
            'exp': datetime.utcnow() + timedelta(seconds=expires_in)
        }
        token = jwt.encode(
            payload,
            current_app.config['SECRET_KEY'],
            algorithm='HS256'
        )
        return token

    @staticmethod
    def verify_confirmation_token(token):
        try:
            payload = jwt.decode(
                token,
                current_app.config['SECRET_KEY'],
                algorithms=['HS256']
            )
            user_id = payload.get('confirm')
            if user_id is None:
                return None
            return User.query.get(user_id)
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None

    def get_reset_token(self, expires_in=3600):
        payload = {
            'reset': self.id,
            'exp': datetime.utcnow() + timedelta(seconds=expires_in)
        }
        token = jwt.encode(
            payload,
            current_app.config['SECRET_KEY'],
            algorithm='HS256'
        )
        return token

    @staticmethod
    def verify_reset_token(token):
        try:
            payload = jwt.decode(
                token,
                current_app.config['SECRET_KEY'],
                algorithms=['HS256']
            )
            user_id = payload.get('reset')
            if user_id is None:
                return None
            return User.query.get(user_id)
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None

    def __repr__(self):
        return f"<User {self.email}>"

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'roles': [role.name for role in self.roles]
        }


class Role(db.Model):
    __tablename__ = 'roles'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(SQLAlchemyEnum(RoleEnum, name='roleenum'), unique=True, nullable=False)
    description = db.Column(db.String(255))
    
    user_roles = db.relationship(
        'UserRole', 
        back_populates='role', 
        cascade="all, delete-orphan", 
        overlaps="users,user_roles"
    )
    users = db.relationship(
        'User', 
        secondary='user_roles', 
        back_populates='roles', 
        overlaps="user_roles,users"
    )
    
    def __init__(self, name: RoleEnum, description=''):
        self.name = name
        self.description = description

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name.value,
            'description': self.description
        }


class Organization(db.Model):
    __tablename__ = 'organizations'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_deleted = db.Column(db.Boolean, default=False)
    
    members = db.relationship('OrganizationMember', back_populates='organization', cascade="all, delete-orphan")
    workspaces = db.relationship('Workspace', back_populates='organization', cascade="all, delete-orphan")


class Workspace(db.Model):
    __tablename__ = 'workspaces'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_deleted = db.Column(db.Boolean, default=False)
    
    organization = db.relationship('Organization', back_populates='workspaces')
    members = db.relationship('WorkspaceMember', back_populates='workspace', cascade="all, delete-orphan")


class WorkspaceMember(db.Model):
    __tablename__ = 'workspace_members'
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    workspace_id = db.Column(db.Integer, db.ForeignKey('workspaces.id'), primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', back_populates='workspace_memberships')
    workspace = db.relationship('Workspace', back_populates='members')
    role = db.relationship('Role')


class OrganizationMember(db.Model):
    __tablename__ = 'organization_members'
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', back_populates='memberships')
    organization = db.relationship('Organization', back_populates='members')
    role = db.relationship('Role')


class SubscriptionTier(db.Model):
    __tablename__ = 'subscription_tiers'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    price = db.Column(db.Float, nullable=False)
    features = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    subscriptions = db.relationship('Subscription', back_populates='tier', cascade="all, delete-orphan")


class Subscription(db.Model):
    __tablename__ = 'subscriptions'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    tier_id = db.Column(db.Integer, db.ForeignKey('subscription_tiers.id'), nullable=False)
    start_date = db.Column(db.DateTime, default=datetime.utcnow)
    end_date = db.Column(db.DateTime, nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    is_deleted = db.Column(db.Boolean, default=False)
    
    user = db.relationship('User', back_populates='subscriptions')
    tier = db.relationship('SubscriptionTier', back_populates='subscriptions')


class File(db.Model):
    __tablename__ = 'files'
    
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), unique=True, nullable=False, index=True)
    path = db.Column(db.String(255), unique=True, nullable=False, index=True)
    size = db.Column(db.BigInteger, nullable=False, index=True)  # File size in bytes
    type = db.Column(db.String(100), nullable=False)  # MIME type of the file
    duration = db.Column(db.String(10))  # Duration if it's a media file like audio or video
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False, index=True)
    
    # Many-to-many relationship with Tag
    tags = db.relationship('Tag', secondary='file_tags', back_populates='files')

    def to_dict(self):
        return {
            'id': self.id,
            'filename': self.filename,
            'path': f'/static/uploads/{self.filename}',
            'size': self.size,
            'type': self.type,
            'duration': self.duration,
            'uploaded_at': self.uploaded_at.isoformat(),
            'tags': [tag.name for tag in self.tags]
        }


class Tag(db.Model):
    __tablename__ = 'tags'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    
    # Many-to-many relationship with File
    files = db.relationship('File', secondary='file_tags', back_populates='tags')


file_tags = db.Table('file_tags',
    db.Column('file_id', db.Integer, db.ForeignKey('files.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True)
)
