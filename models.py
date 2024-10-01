# # # # # # # # models.py

# # # # # # # from extensions import db, bcrypt
# # # # # # # from datetime import datetime
# # # # # # # from itsdangerous import URLSafeTimedSerializer as Serializer
# # # # # # # from flask import current_app
# # # # # # # from enum import Enum

# # # # # # # class RoleEnum(Enum):
# # # # # # #     ADMIN = 'Admin'
# # # # # # #     USER = 'User'
# # # # # # #     MANAGER = 'Manager'

# # # # # # # class User(db.Model):
# # # # # # #     __tablename__ = 'users'
    
# # # # # # #     id = db.Column(db.Integer, primary_key=True)
# # # # # # #     email = db.Column(db.String(120), unique=True, nullable=False, index=True)
# # # # # # #     password_hash = db.Column(db.String(128), nullable=False)
# # # # # # #     first_name = db.Column(db.String(30))
# # # # # # #     last_name = db.Column(db.String(30))
# # # # # # #     is_active = db.Column(db.Boolean, default=False)
# # # # # # #     confirmed_at = db.Column(db.DateTime)
# # # # # # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # # # # # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# # # # # # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # # # # # #     # Relationships
# # # # # # #     roles = db.relationship('Role', secondary='user_roles', back_populates='users')
# # # # # # #     memberships = db.relationship('OrganizationMember', back_populates='user', cascade="all, delete-orphan")
# # # # # # #     workspace_memberships = db.relationship('WorkspaceMember', back_populates='user', cascade="all, delete-orphan")
# # # # # # #     subscriptions = db.relationship('Subscription', back_populates='user', cascade="all, delete-orphan")
    
# # # # # # #     def __init__(self, email, password, first_name='', last_name=''):
# # # # # # #         self.email = email
# # # # # # #         self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
# # # # # # #         self.first_name = first_name
# # # # # # #         self.last_name = last_name

# # # # # # #     def check_password(self, password):
# # # # # # #         return bcrypt.check_password_hash(self.password_hash, password)

# # # # # # #     def get_confirmation_token(self, expires_sec=3600):
# # # # # # #         s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
# # # # # # #         return s.dumps({'user_id': self.id}).decode('utf-8')

# # # # # # #     @staticmethod
# # # # # # #     def verify_confirmation_token(token):
# # # # # # #         s = Serializer(current_app.config['SECRET_KEY'])
# # # # # # #         try:
# # # # # # #             user_id = s.loads(token)['user_id']
# # # # # # #         except Exception:
# # # # # # #             return None
# # # # # # #         return User.query.get(user_id)
    
# # # # # # #     def __repr__(self):
# # # # # # #         return f"<User {self.email}>"


# # # # # # # class Role(db.Model):
# # # # # # #     __tablename__ = 'roles'
    
# # # # # # #     id = db.Column(db.Integer, primary_key=True)
# # # # # # #     name = db.Column(db.Enum(RoleEnum, name='role_enum'), unique=True, nullable=False)

# # # # # # #     description = db.Column(db.String(255))
    
# # # # # # #     # Relationships
# # # # # # #     users = db.relationship('User', secondary='user_roles', back_populates='roles')
# # # # # # #     def __init__(self, name: RoleEnum, description=''):
# # # # # # #         if not isinstance(name, RoleEnum):
# # # # # # #             raise ValueError("name must be an instance of RoleEnum")
# # # # # # #         self.name = name
# # # # # # #         self.description = description


# # # # # # # class UserRole(db.Model):
# # # # # # #     __tablename__ = 'user_roles'
    
# # # # # # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# # # # # # #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), primary_key=True)
# # # # # # #     assigned_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# # # # # # #     # Relationships
# # # # # # #     user = db.relationship('User', back_populates='roles')
# # # # # # #     role = db.relationship('Role', back_populates='users')


# # # # # # # class Organization(db.Model):
# # # # # # #     __tablename__ = 'organizations'
    
# # # # # # #     id = db.Column(db.Integer, primary_key=True)
# # # # # # #     name = db.Column(db.String(150), unique=True, nullable=False)
# # # # # # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # # # # # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# # # # # # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # # # # # #     # Relationships
# # # # # # #     members = db.relationship('OrganizationMember', back_populates='organization', cascade="all, delete-orphan")
# # # # # # #     workspaces = db.relationship('Workspace', back_populates='organization', cascade="all, delete-orphan")


# # # # # # # class Workspace(db.Model):
# # # # # # #     __tablename__ = 'workspaces'
    
# # # # # # #     id = db.Column(db.Integer, primary_key=True)
# # # # # # #     name = db.Column(db.String(150), nullable=False)
# # # # # # #     organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
# # # # # # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # # # # # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# # # # # # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # # # # # #     # Relationships
# # # # # # #     organization = db.relationship('Organization', back_populates='workspaces')
# # # # # # #     members = db.relationship('WorkspaceMember', back_populates='workspace', cascade="all, delete-orphan")


# # # # # # # class WorkspaceMember(db.Model):
# # # # # # #     __tablename__ = 'workspace_members'
    
# # # # # # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# # # # # # #     workspace_id = db.Column(db.Integer, db.ForeignKey('workspaces.id'), primary_key=True)
# # # # # # #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
# # # # # # #     joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# # # # # # #     # Relationships
# # # # # # #     user = db.relationship('User', back_populates='workspace_memberships')
# # # # # # #     workspace = db.relationship('Workspace', back_populates='members')
# # # # # # #     role = db.relationship('Role')


# # # # # # # class OrganizationMember(db.Model):
# # # # # # #     __tablename__ = 'organization_members'
    
# # # # # # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# # # # # # #     organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), primary_key=True)
# # # # # # #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
# # # # # # #     joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# # # # # # #     # Relationships
# # # # # # #     user = db.relationship('User', back_populates='memberships')
# # # # # # #     organization = db.relationship('Organization', back_populates='members')
# # # # # # #     role = db.relationship('Role')


# # # # # # # class SubscriptionTier(db.Model):
# # # # # # #     __tablename__ = 'subscription_tiers'
    
# # # # # # #     id = db.Column(db.Integer, primary_key=True)
# # # # # # #     name = db.Column(db.String(50), unique=True, nullable=False)  # e.g., Free, Tier 1, Tier 2
# # # # # # #     price = db.Column(db.Float, nullable=False)
# # # # # # #     features = db.Column(db.JSON)  # Using JSON for structured features
# # # # # # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # # # # # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
# # # # # # #     # Relationships
# # # # # # #     subscriptions = db.relationship('Subscription', back_populates='tier', cascade="all, delete-orphan")


# # # # # # # class Subscription(db.Model):
# # # # # # #     __tablename__ = 'subscriptions'
    
# # # # # # #     id = db.Column(db.Integer, primary_key=True)
# # # # # # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
# # # # # # #     tier_id = db.Column(db.Integer, db.ForeignKey('subscription_tiers.id'), nullable=False)
# # # # # # #     start_date = db.Column(db.DateTime, default=datetime.utcnow)
# # # # # # #     end_date = db.Column(db.DateTime, nullable=True)  # Null for ongoing subscriptions
# # # # # # #     is_active = db.Column(db.Boolean, default=True)
# # # # # # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # # # # # #     # Relationships
# # # # # # #     user = db.relationship('User', back_populates='subscriptions')
# # # # # # #     tier = db.relationship('SubscriptionTier', back_populates='subscriptions')

# # # # # # # models.py

# # # # # # from extensions import db, bcrypt
# # # # # # from datetime import datetime
# # # # # # from itsdangerous import URLSafeTimedSerializer as Serializer
# # # # # # from flask import current_app
# # # # # # from enum import Enum

# # # # # # # Define RoleEnum using Python's Enum
# # # # # # class RoleEnum(Enum):
# # # # # #     ADMIN = 'Admin'
# # # # # #     USER = 'User'
# # # # # #     MANAGER = 'Manager'

# # # # # # # User Model
# # # # # # class User(db.Model):
# # # # # #     __tablename__ = 'users'
    
# # # # # #     id = db.Column(db.Integer, primary_key=True)
# # # # # #     email = db.Column(db.String(120), unique=True, nullable=False, index=True)
# # # # # #     password_hash = db.Column(db.String(128), nullable=False)
# # # # # #     first_name = db.Column(db.String(30))
# # # # # #     last_name = db.Column(db.String(30))
# # # # # #     is_active = db.Column(db.Boolean, default=False)
# # # # # #     confirmed_at = db.Column(db.DateTime)
# # # # # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # # # # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# # # # # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # # # # #     # Relationships
# # # # # #     user_roles = db.relationship('UserRole', back_populates='user', cascade="all, delete-orphan")
# # # # # #     roles = db.relationship('Role', secondary='user_roles', back_populates='users')
    
# # # # # #     memberships = db.relationship('OrganizationMember', back_populates='user', cascade="all, delete-orphan")
# # # # # #     workspace_memberships = db.relationship('WorkspaceMember', back_populates='user', cascade="all, delete-orphan")
# # # # # #     subscriptions = db.relationship('Subscription', back_populates='user', cascade="all, delete-orphan")
    
# # # # # #     def __init__(self, email, password, first_name='', last_name=''):
# # # # # #         self.email = email
# # # # # #         self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
# # # # # #         self.first_name = first_name
# # # # # #         self.last_name = last_name

# # # # # #     def check_password(self, password):
# # # # # #         return bcrypt.check_password_hash(self.password_hash, password)

# # # # # #     def get_confirmation_token(self, expires_sec=3600):
# # # # # #         s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
# # # # # #         return s.dumps({'user_id': self.id}).decode('utf-8')

# # # # # #     @staticmethod
# # # # # #     def verify_confirmation_token(token):
# # # # # #         s = Serializer(current_app.config['SECRET_KEY'])
# # # # # #         try:
# # # # # #             user_id = s.loads(token)['user_id']
# # # # # #         except Exception:
# # # # # #             return None
# # # # # #         return User.query.get(user_id)
    
# # # # # #     def __repr__(self):
# # # # # #         return f"<User {self.email}>"

# # # # # # # Role Model
# # # # # # class Role(db.Model):
# # # # # #     __tablename__ = 'roles'
    
# # # # # #     id = db.Column(db.Integer, primary_key=True)
# # # # # #     name = db.Column(db.Enum(RoleEnum, name='role_enum'), unique=True, nullable=False)
# # # # # #     description = db.Column(db.String(255))
    
# # # # # #     # Relationships
# # # # # #     user_roles = db.relationship('UserRole', back_populates='role', cascade="all, delete-orphan")
# # # # # #     users = db.relationship('User', secondary='user_roles', back_populates='roles')
    
# # # # # #     def __init__(self, name: RoleEnum, description=''):
# # # # # #         if not isinstance(name, RoleEnum):
# # # # # #             raise ValueError("name must be an instance of RoleEnum")
# # # # # #         self.name = name
# # # # # #         self.description = description

# # # # # # # Association Table with Additional Fields (UserRole)
# # # # # # class UserRole(db.Model):
# # # # # #     __tablename__ = 'user_roles'
    
# # # # # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# # # # # #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), primary_key=True)
# # # # # #     assigned_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# # # # # #     # Relationships
# # # # # #     user = db.relationship('User', back_populates='user_roles')
# # # # # #     role = db.relationship('Role', back_populates='user_roles')

# # # # # # # Organization Model
# # # # # # class Organization(db.Model):
# # # # # #     __tablename__ = 'organizations'
    
# # # # # #     id = db.Column(db.Integer, primary_key=True)
# # # # # #     name = db.Column(db.String(150), unique=True, nullable=False)
# # # # # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # # # # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# # # # # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # # # # #     # Relationships
# # # # # #     members = db.relationship('OrganizationMember', back_populates='organization', cascade="all, delete-orphan")
# # # # # #     workspaces = db.relationship('Workspace', back_populates='organization', cascade="all, delete-orphan")

# # # # # # # Workspace Model
# # # # # # class Workspace(db.Model):
# # # # # #     __tablename__ = 'workspaces'
    
# # # # # #     id = db.Column(db.Integer, primary_key=True)
# # # # # #     name = db.Column(db.String(150), nullable=False)
# # # # # #     organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
# # # # # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # # # # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# # # # # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # # # # #     # Relationships
# # # # # #     organization = db.relationship('Organization', back_populates='workspaces')
# # # # # #     members = db.relationship('WorkspaceMember', back_populates='workspace', cascade="all, delete-orphan")

# # # # # # # WorkspaceMember Model
# # # # # # class WorkspaceMember(db.Model):
# # # # # #     __tablename__ = 'workspace_members'
    
# # # # # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# # # # # #     workspace_id = db.Column(db.Integer, db.ForeignKey('workspaces.id'), primary_key=True)
# # # # # #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
# # # # # #     joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# # # # # #     # Relationships
# # # # # #     user = db.relationship('User', back_populates='workspace_memberships')
# # # # # #     workspace = db.relationship('Workspace', back_populates='members')
# # # # # #     role = db.relationship('Role')

# # # # # # # OrganizationMember Model
# # # # # # class OrganizationMember(db.Model):
# # # # # #     __tablename__ = 'organization_members'
    
# # # # # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# # # # # #     organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), primary_key=True)
# # # # # #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
# # # # # #     joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# # # # # #     # Relationships
# # # # # #     user = db.relationship('User', back_populates='memberships')
# # # # # #     organization = db.relationship('Organization', back_populates='members')
# # # # # #     role = db.relationship('Role')

# # # # # # # SubscriptionTier Model
# # # # # # class SubscriptionTier(db.Model):
# # # # # #     __tablename__ = 'subscription_tiers'
    
# # # # # #     id = db.Column(db.Integer, primary_key=True)
# # # # # #     name = db.Column(db.String(50), unique=True, nullable=False)  # e.g., Free, Tier 1, Tier 2
# # # # # #     price = db.Column(db.Float, nullable=False)
# # # # # #     features = db.Column(db.JSON)  # Using JSON for structured features
# # # # # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # # # # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
# # # # # #     # Relationships
# # # # # #     subscriptions = db.relationship('Subscription', back_populates='tier', cascade="all, delete-orphan")

# # # # # # # Subscription Model
# # # # # # class Subscription(db.Model):
# # # # # #     __tablename__ = 'subscriptions'
    
# # # # # #     id = db.Column(db.Integer, primary_key=True)
# # # # # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
# # # # # #     tier_id = db.Column(db.Integer, db.ForeignKey('subscription_tiers.id'), nullable=False)
# # # # # #     start_date = db.Column(db.DateTime, default=datetime.utcnow)
# # # # # #     end_date = db.Column(db.DateTime, nullable=True)  # Null for ongoing subscriptions
# # # # # #     is_active = db.Column(db.Boolean, default=True)
# # # # # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # # # # #     # Relationships
# # # # # #     user = db.relationship('User', back_populates='subscriptions')
# # # # # #     tier = db.relationship('SubscriptionTier', back_populates='subscriptions')

# # # # # # models.py

# # # # # from extensions import db, bcrypt
# # # # # from datetime import datetime
# # # # # from itsdangerous import URLSafeTimedSerializer as Serializer
# # # # # from flask import current_app
# # # # # from enum import Enum

# # # # # # Define RoleEnum using Python's Enum
# # # # # class RoleEnum(Enum):
# # # # #     ADMIN = 'Admin'
# # # # #     USER = 'User'
# # # # #     MANAGER = 'Manager'

# # # # # # Association Table with Additional Fields (UserRole)
# # # # # class UserRole(db.Model):
# # # # #     __tablename__ = 'user_roles'
    
# # # # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# # # # #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), primary_key=True)
# # # # #     assigned_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# # # # #     # Relationships
# # # # #     user = db.relationship('User', back_populates='user_roles')
# # # # #     role = db.relationship('Role', back_populates='user_roles')

# # # # # # User Model
# # # # # class User(db.Model):
# # # # #     __tablename__ = 'users'
    
# # # # #     id = db.Column(db.Integer, primary_key=True)
# # # # #     email = db.Column(db.String(120), unique=True, nullable=False, index=True)
# # # # #     password_hash = db.Column(db.String(128), nullable=False)
# # # # #     first_name = db.Column(db.String(30))
# # # # #     last_name = db.Column(db.String(30))
# # # # #     is_active = db.Column(db.Boolean, default=False)
# # # # #     confirmed_at = db.Column(db.DateTime)
# # # # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # # # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# # # # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # # # #     # Relationships
# # # # #     user_roles = db.relationship('UserRole', back_populates='user', cascade="all, delete-orphan")
# # # # #     roles = db.relationship('Role', secondary='user_roles', back_populates='users')
    
# # # # #     memberships = db.relationship('OrganizationMember', back_populates='user', cascade="all, delete-orphan")
# # # # #     workspace_memberships = db.relationship('WorkspaceMember', back_populates='user', cascade="all, delete-orphan")
# # # # #     subscriptions = db.relationship('Subscription', back_populates='user', cascade="all, delete-orphan")
    
# # # # #     def __init__(self, email, password, first_name='', last_name=''):
# # # # #         self.email = email
# # # # #         self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
# # # # #         self.first_name = first_name
# # # # #         self.last_name = last_name

# # # # #     def check_password(self, password):
# # # # #         return bcrypt.check_password_hash(self.password_hash, password)

# # # # #     def get_confirmation_token(self, expires_sec=3600):
# # # # #         s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
# # # # #         return s.dumps({'user_id': self.id}).decode('utf-8')

# # # # #     @staticmethod
# # # # #     def verify_confirmation_token(token):
# # # # #         s = Serializer(current_app.config['SECRET_KEY'])
# # # # #         try:
# # # # #             user_id = s.loads(token)['user_id']
# # # # #         except Exception:
# # # # #             return None
# # # # #         return User.query.get(user_id)
    
# # # # #     def __repr__(self):
# # # # #         return f"<User {self.email}>"

# # # # # # Role Model
# # # # # class Role(db.Model):
# # # # #     __tablename__ = 'roles'
    
# # # # #     id = db.Column(db.Integer, primary_key=True)
# # # # #     name = db.Column(db.Enum(RoleEnum, name='role_enum'), unique=True, nullable=False)
# # # # #     description = db.Column(db.String(255))
    
# # # # #     # Relationships
# # # # #     user_roles = db.relationship('UserRole', back_populates='role', cascade="all, delete-orphan")
# # # # #     users = db.relationship('User', secondary='user_roles', back_populates='roles')
    
# # # # #     def __init__(self, name: RoleEnum, description=''):
# # # # #         if not isinstance(name, RoleEnum):
# # # # #             raise ValueError("name must be an instance of RoleEnum")
# # # # #         self.name = name
# # # # #         self.description = description

# # # # # # Organization Model
# # # # # class Organization(db.Model):
# # # # #     __tablename__ = 'organizations'
    
# # # # #     id = db.Column(db.Integer, primary_key=True)
# # # # #     name = db.Column(db.String(150), unique=True, nullable=False)
# # # # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # # # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# # # # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # # # #     # Relationships
# # # # #     members = db.relationship('OrganizationMember', back_populates='organization', cascade="all, delete-orphan")
# # # # #     workspaces = db.relationship('Workspace', back_populates='organization', cascade="all, delete-orphan")

# # # # # # Workspace Model
# # # # # class Workspace(db.Model):
# # # # #     __tablename__ = 'workspaces'
    
# # # # #     id = db.Column(db.Integer, primary_key=True)
# # # # #     name = db.Column(db.String(150), nullable=False)
# # # # #     organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
# # # # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # # # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# # # # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # # # #     # Relationships
# # # # #     organization = db.relationship('Organization', back_populates='workspaces')
# # # # #     members = db.relationship('WorkspaceMember', back_populates='workspace', cascade="all, delete-orphan")

# # # # # # WorkspaceMember Model
# # # # # class WorkspaceMember(db.Model):
# # # # #     __tablename__ = 'workspace_members'
    
# # # # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# # # # #     workspace_id = db.Column(db.Integer, db.ForeignKey('workspaces.id'), primary_key=True)
# # # # #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
# # # # #     joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# # # # #     # Relationships
# # # # #     user = db.relationship('User', back_populates='workspace_memberships')
# # # # #     workspace = db.relationship('Workspace', back_populates='members')
# # # # #     role = db.relationship('Role')

# # # # # # OrganizationMember Model
# # # # # class OrganizationMember(db.Model):
# # # # #     __tablename__ = 'organization_members'
    
# # # # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# # # # #     organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), primary_key=True)
# # # # #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
# # # # #     joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# # # # #     # Relationships
# # # # #     user = db.relationship('User', back_populates='memberships')
# # # # #     organization = db.relationship('Organization', back_populates='members')
# # # # #     role = db.relationship('Role')

# # # # # # SubscriptionTier Model
# # # # # class SubscriptionTier(db.Model):
# # # # #     __tablename__ = 'subscription_tiers'
    
# # # # #     id = db.Column(db.Integer, primary_key=True)
# # # # #     name = db.Column(db.String(50), unique=True, nullable=False)  # e.g., Free, Tier 1, Tier 2
# # # # #     price = db.Column(db.Float, nullable=False)
# # # # #     features = db.Column(db.JSON)  # Using JSON for structured features
# # # # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # # # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
# # # # #     # Relationships
# # # # #     subscriptions = db.relationship('Subscription', back_populates='tier', cascade="all, delete-orphan")

# # # # # # Subscription Model
# # # # # class Subscription(db.Model):
# # # # #     __tablename__ = 'subscriptions'
    
# # # # #     id = db.Column(db.Integer, primary_key=True)
# # # # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
# # # # #     tier_id = db.Column(db.Integer, db.ForeignKey('subscription_tiers.id'), nullable=False)
# # # # #     start_date = db.Column(db.DateTime, default=datetime.utcnow)
# # # # #     end_date = db.Column(db.DateTime, nullable=True)  # Null for ongoing subscriptions
# # # # #     is_active = db.Column(db.Boolean, default=True)
# # # # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # # # #     # Relationships
# # # # #     user = db.relationship('User', back_populates='subscriptions')
# # # # #     tier = db.relationship('SubscriptionTier', back_populates='subscriptions')


# # # # # models.py

# # # # from extensions import db, bcrypt
# # # # from datetime import datetime
# # # # from itsdangerous import URLSafeTimedSerializer as Serializer
# # # # from flask import current_app
# # # # from enum import Enum

# # # # # Define RoleEnum using Python's Enum
# # # # class RoleEnum(Enum):
# # # #     ADMIN = 'Admin'
# # # #     USER = 'User'
# # # #     MANAGER = 'Manager'

# # # # # Association Object with Additional Fields (UserRole)
# # # # class UserRole(db.Model):
# # # #     __tablename__ = 'user_roles'
    
# # # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# # # #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), primary_key=True)
# # # #     assigned_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# # # #     # Relationships
# # # #     user = db.relationship('User', back_populates='user_roles')
# # # #     role = db.relationship('Role', back_populates='user_roles')

# # # # # User Model
# # # # class User(db.Model):
# # # #     __tablename__ = 'users'
    
# # # #     id = db.Column(db.Integer, primary_key=True)
# # # #     email = db.Column(db.String(120), unique=True, nullable=False, index=True)
# # # #     password_hash = db.Column(db.String(128), nullable=False)
# # # #     first_name = db.Column(db.String(30))
# # # #     last_name = db.Column(db.String(30))
# # # #     is_active = db.Column(db.Boolean, default=False)
# # # #     confirmed_at = db.Column(db.DateTime)
# # # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# # # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # # #     # Relationships
# # # #     user_roles = db.relationship('UserRole', back_populates='user', cascade="all, delete-orphan")
# # # #     roles = db.relationship('Role', secondary='user_roles', back_populates='users')
    
# # # #     memberships = db.relationship('OrganizationMember', back_populates='user', cascade="all, delete-orphan")
# # # #     workspace_memberships = db.relationship('WorkspaceMember', back_populates='user', cascade="all, delete-orphan")
# # # #     subscriptions = db.relationship('Subscription', back_populates='user', cascade="all, delete-orphan")
    
# # # #     def __init__(self, email, password, first_name='', last_name=''):
# # # #         self.email = email
# # # #         self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
# # # #         self.first_name = first_name
# # # #         self.last_name = last_name

# # # #     def check_password(self, password):
# # # #         return bcrypt.check_password_hash(self.password_hash, password)

# # # #     def get_confirmation_token(self, expires_sec=3600):
# # # #         s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
# # # #         return s.dumps({'user_id': self.id}).decode('utf-8')

# # # #     @staticmethod
# # # #     def verify_confirmation_token(token):
# # # #         s = Serializer(current_app.config['SECRET_KEY'])
# # # #         try:
# # # #             user_id = s.loads(token)['user_id']
# # # #         except Exception:
# # # #             return None
# # # #         return User.query.get(user_id)
    
# # # #     def __repr__(self):
# # # #         return f"<User {self.email}>"

# # # # # Role Model
# # # # class Role(db.Model):
# # # #     __tablename__ = 'roles'
    
# # # #     id = db.Column(db.Integer, primary_key=True)
# # # #     name = db.Column(db.Enum(RoleEnum, name='role_enum'), unique=True, nullable=False)
# # # #     description = db.Column(db.String(255))
    
# # # #     # Relationships
# # # #     user_roles = db.relationship('UserRole', back_populates='role', cascade="all, delete-orphan")
# # # #     users = db.relationship('User', secondary='user_roles', back_populates='roles')
    
# # # #     def __init__(self, name: RoleEnum, description=''):
# # # #         if not isinstance(name, RoleEnum):
# # # #             raise ValueError("name must be an instance of RoleEnum")
# # # #         self.name = name
# # # #         self.description = description

# # # # # Organization Model
# # # # class Organization(db.Model):
# # # #     __tablename__ = 'organizations'
    
# # # #     id = db.Column(db.Integer, primary_key=True)
# # # #     name = db.Column(db.String(150), unique=True, nullable=False)
# # # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# # # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # # #     # Relationships
# # # #     members = db.relationship('OrganizationMember', back_populates='organization', cascade="all, delete-orphan")
# # # #     workspaces = db.relationship('Workspace', back_populates='organization', cascade="all, delete-orphan")

# # # # # Workspace Model
# # # # class Workspace(db.Model):
# # # #     __tablename__ = 'workspaces'
    
# # # #     id = db.Column(db.Integer, primary_key=True)
# # # #     name = db.Column(db.String(150), nullable=False)
# # # #     organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
# # # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# # # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # # #     # Relationships
# # # #     organization = db.relationship('Organization', back_populates='workspaces')
# # # #     members = db.relationship('WorkspaceMember', back_populates='workspace', cascade="all, delete-orphan")

# # # # # WorkspaceMember Model
# # # # class WorkspaceMember(db.Model):
# # # #     __tablename__ = 'workspace_members'
    
# # # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# # # #     workspace_id = db.Column(db.Integer, db.ForeignKey('workspaces.id'), primary_key=True)
# # # #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
# # # #     joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# # # #     # Relationships
# # # #     user = db.relationship('User', back_populates='workspace_memberships')
# # # #     workspace = db.relationship('Workspace', back_populates='members')
# # # #     role = db.relationship('Role')

# # # # # OrganizationMember Model
# # # # class OrganizationMember(db.Model):
# # # #     __tablename__ = 'organization_members'
    
# # # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# # # #     organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), primary_key=True)
# # # #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
# # # #     joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# # # #     # Relationships
# # # #     user = db.relationship('User', back_populates='memberships')
# # # #     organization = db.relationship('Organization', back_populates='members')
# # # #     role = db.relationship('Role')

# # # # # SubscriptionTier Model
# # # # class SubscriptionTier(db.Model):
# # # #     __tablename__ = 'subscription_tiers'
    
# # # #     id = db.Column(db.Integer, primary_key=True)
# # # #     name = db.Column(db.String(50), unique=True, nullable=False)  # e.g., Free, Tier 1, Tier 2
# # # #     price = db.Column(db.Float, nullable=False)
# # # #     features = db.Column(db.JSON)  # Using JSON for structured features
# # # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
# # # #     # Relationships
# # # #     subscriptions = db.relationship('Subscription', back_populates='tier', cascade="all, delete-orphan")

# # # # # Subscription Model
# # # # class Subscription(db.Model):
# # # #     __tablename__ = 'subscriptions'
    
# # # #     id = db.Column(db.Integer, primary_key=True)
# # # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
# # # #     tier_id = db.Column(db.Integer, db.ForeignKey('subscription_tiers.id'), nullable=False)
# # # #     start_date = db.Column(db.DateTime, default=datetime.utcnow)
# # # #     end_date = db.Column(db.DateTime, nullable=True)  # Null for ongoing subscriptions
# # # #     is_active = db.Column(db.Boolean, default=True)
# # # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # # #     # Relationships
# # # #     user = db.relationship('User', back_populates='subscriptions')
# # # #     tier = db.relationship('SubscriptionTier', back_populates='subscriptions')

# # # # models.py

# # # from extensions import db, bcrypt
# # # from datetime import datetime
# # # from itsdangerous import URLSafeTimedSerializer as Serializer
# # # from flask import current_app
# # # from enum import Enum

# # # # Define RoleEnum using Python's Enum
# # # class RoleEnum(Enum):
# # #     ADMIN = 'Admin'
# # #     USER = 'User'
# # #     MANAGER = 'Manager'

# # # # Association Object with Additional Fields (UserRole)
# # # class UserRole(db.Model):
# # #     __tablename__ = 'user_roles'
    
# # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# # #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), primary_key=True)
# # #     assigned_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# # #     # Relationships
# # #     user = db.relationship('User', back_populates='user_roles', overlaps="roles,user_roles")
# # #     role = db.relationship('Role', back_populates='user_roles', overlaps="users,user_roles")

# # # # User Model
# # # class User(db.Model):
# # #     __tablename__ = 'users'
    
# # #     id = db.Column(db.Integer, primary_key=True)
# # #     email = db.Column(db.String(120), unique=True, nullable=False, index=True)
# # #     password_hash = db.Column(db.String(128), nullable=False)
# # #     first_name = db.Column(db.String(30))
# # #     last_name = db.Column(db.String(30))
# # #     is_active = db.Column(db.Boolean, default=False)
# # #     confirmed_at = db.Column(db.DateTime)
# # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # #     # Relationships
# # #     user_roles = db.relationship('UserRole', back_populates='user', cascade="all, delete-orphan", overlaps="roles")
# # #     roles = db.relationship('Role', secondary='user_roles', back_populates='users', overlaps="user_roles")
    
# # #     memberships = db.relationship('OrganizationMember', back_populates='user', cascade="all, delete-orphan")
# # #     workspace_memberships = db.relationship('WorkspaceMember', back_populates='user', cascade="all, delete-orphan")
# # #     subscriptions = db.relationship('Subscription', back_populates='user', cascade="all, delete-orphan")
    
# # #     def __init__(self, email, password, first_name='', last_name=''):
# # #         self.email = email
# # #         self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
# # #         self.first_name = first_name
# # #         self.last_name = last_name

# # #     def check_password(self, password):
# # #         return bcrypt.check_password_hash(self.password_hash, password)

# # #     def get_confirmation_token(self, expires_sec=3600):
# # #         s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
# # #         return s.dumps({'user_id': self.id}).decode('utf-8')

# # #     @staticmethod
# # #     def verify_confirmation_token(token):
# # #         s = Serializer(current_app.config['SECRET_KEY'])
# # #         try:
# # #             user_id = s.loads(token)['user_id']
# # #         except Exception:
# # #             return None
# # #         return User.query.get(user_id)
    
# # #     def __repr__(self):
# # #         return f"<User {self.email}>"

# # # # Role Model
# # # class Role(db.Model):
# # #     __tablename__ = 'roles'
    
# # #     id = db.Column(db.Integer, primary_key=True)
# # #     name = db.Column(db.Enum(RoleEnum, name='role_enum'), unique=True, nullable=False)
# # #     description = db.Column(db.String(255))
    
# # #     # Relationships
# # #     user_roles = db.relationship('UserRole', back_populates='role', cascade="all, delete-orphan", overlaps="users")
# # #     users = db.relationship('User', secondary='user_roles', back_populates='roles', overlaps="user_roles")
    
# # #     def __init__(self, name: RoleEnum, description=''):
# # #         if not isinstance(name, RoleEnum):
# # #             raise ValueError("name must be an instance of RoleEnum")
# # #         self.name = name
# # #         self.description = description

# # # # Organization Model
# # # class Organization(db.Model):
# # #     __tablename__ = 'organizations'
    
# # #     id = db.Column(db.Integer, primary_key=True)
# # #     name = db.Column(db.String(150), unique=True, nullable=False)
# # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # #     # Relationships
# # #     members = db.relationship('OrganizationMember', back_populates='organization', cascade="all, delete-orphan")
# # #     workspaces = db.relationship('Workspace', back_populates='organization', cascade="all, delete-orphan")

# # # # Workspace Model
# # # class Workspace(db.Model):
# # #     __tablename__ = 'workspaces'
    
# # #     id = db.Column(db.Integer, primary_key=True)
# # #     name = db.Column(db.String(150), nullable=False)
# # #     organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
# # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # #     # Relationships
# # #     organization = db.relationship('Organization', back_populates='workspaces')
# # #     members = db.relationship('WorkspaceMember', back_populates='workspace', cascade="all, delete-orphan")

# # # # WorkspaceMember Model
# # # class WorkspaceMember(db.Model):
# # #     __tablename__ = 'workspace_members'
    
# # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# # #     workspace_id = db.Column(db.Integer, db.ForeignKey('workspaces.id'), primary_key=True)
# # #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
# # #     joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# # #     # Relationships
# # #     user = db.relationship('User', back_populates='workspace_memberships')
# # #     workspace = db.relationship('Workspace', back_populates='members')
# # #     role = db.relationship('Role')

# # # # OrganizationMember Model
# # # class OrganizationMember(db.Model):
# # #     __tablename__ = 'organization_members'
    
# # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# # #     organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), primary_key=True)
# # #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
# # #     joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# # #     # Relationships
# # #     user = db.relationship('User', back_populates='memberships')
# # #     organization = db.relationship('Organization', back_populates='members')
# # #     role = db.relationship('Role')

# # # # SubscriptionTier Model
# # # class SubscriptionTier(db.Model):
# # #     __tablename__ = 'subscription_tiers'
    
# # #     id = db.Column(db.Integer, primary_key=True)
# # #     name = db.Column(db.String(50), unique=True, nullable=False)  # e.g., Free, Tier 1, Tier 2
# # #     price = db.Column(db.Float, nullable=False)
# # #     features = db.Column(db.JSON)  # Using JSON for structured features
# # #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# # #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
# # #     # Relationships
# # #     subscriptions = db.relationship('Subscription', back_populates='tier', cascade="all, delete-orphan")

# # # # Subscription Model
# # # class Subscription(db.Model):
# # #     __tablename__ = 'subscriptions'
    
# # #     id = db.Column(db.Integer, primary_key=True)
# # #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
# # #     tier_id = db.Column(db.Integer, db.ForeignKey('subscription_tiers.id'), nullable=False)
# # #     start_date = db.Column(db.DateTime, default=datetime.utcnow)
# # #     end_date = db.Column(db.DateTime, nullable=True)  # Null for ongoing subscriptions
# # #     is_active = db.Column(db.Boolean, default=True)
# # #     is_deleted = db.Column(db.Boolean, default=False)
    
# # #     # Relationships
# # #     user = db.relationship('User', back_populates='subscriptions')
# # #     tier = db.relationship('SubscriptionTier', back_populates='subscriptions')


# # from extensions import db, bcrypt
# # from datetime import datetime
# # from itsdangerous import URLSafeTimedSerializer as Serializer
# # from flask import current_app
# # from enum import Enum
# # from sqlalchemy import Enum as SQLAlchemyEnum

# # # Define RoleEnum using Python's Enum with uppercase values
# # class RoleEnum(Enum):
# #     ADMIN = 'ADMIN'
# #     USER = 'USER'
# #     MANAGER = 'MANAGER'

# # # Association Object with Additional Fields (UserRole)
# # class UserRole(db.Model):
# #     __tablename__ = 'user_roles'
    
# #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), primary_key=True)
# #     assigned_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# #     # Relationships
# #     user = db.relationship('User', back_populates='user_roles', overlaps="roles,user_roles")
# #     role = db.relationship('Role', back_populates='user_roles', overlaps="users,user_roles")

# # # User Model
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
    
# #     # Relationships
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

# #     def get_confirmation_token(self, expires_sec=3600):
# #         s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
# #         return s.dumps({'user_id': self.id}).decode('utf-8')

# #     @staticmethod
# #     def verify_confirmation_token(token):
# #         s = Serializer(current_app.config['SECRET_KEY'])
# #         try:
# #             user_id = s.loads(token)['user_id']
# #         except Exception:
# #             return None
# #         return User.query.get(user_id)
    
# #     def __repr__(self):
# #         return f"<User {self.email}>"

# # # Role Model
# # class Role(db.Model):
# #     __tablename__ = 'roles'
    
# #     id = db.Column(db.Integer, primary_key=True)
# #     name = db.Column(
# #         SQLAlchemyEnum(RoleEnum, name='role_enum'), 
# #         unique=True, 
# #         nullable=False
# #     )
# #     description = db.Column(db.String(255))
    
# #     # Relationships
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
# #         if not isinstance(name, RoleEnum):
# #             raise ValueError("name must be an instance of RoleEnum")
# #         self.name = name.value  # Use the enum's value
# #         self.description = description

# # # Organization Model
# # class Organization(db.Model):
# #     __tablename__ = 'organizations'
    
# #     id = db.Column(db.Integer, primary_key=True)
# #     name = db.Column(db.String(150), unique=True, nullable=False)
# #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# #     is_deleted = db.Column(db.Boolean, default=False)
    
# #     # Relationships
# #     members = db.relationship('OrganizationMember', back_populates='organization', cascade="all, delete-orphan")
# #     workspaces = db.relationship('Workspace', back_populates='organization', cascade="all, delete-orphan")

# # # Workspace Model
# # class Workspace(db.Model):
# #     __tablename__ = 'workspaces'
    
# #     id = db.Column(db.Integer, primary_key=True)
# #     name = db.Column(db.String(150), nullable=False)
# #     organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
# #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
# #     is_deleted = db.Column(db.Boolean, default=False)
    
# #     # Relationships
# #     organization = db.relationship('Organization', back_populates='workspaces')
# #     members = db.relationship('WorkspaceMember', back_populates='workspace', cascade="all, delete-orphan")

# # # WorkspaceMember Model
# # class WorkspaceMember(db.Model):
# #     __tablename__ = 'workspace_members'
    
# #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# #     workspace_id = db.Column(db.Integer, db.ForeignKey('workspaces.id'), primary_key=True)
# #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
# #     joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# #     # Relationships
# #     user = db.relationship('User', back_populates='workspace_memberships')
# #     workspace = db.relationship('Workspace', back_populates='members')
# #     role = db.relationship('Role')

# # # OrganizationMember Model
# # class OrganizationMember(db.Model):
# #     __tablename__ = 'organization_members'
    
# #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
# #     organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), primary_key=True)
# #     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
# #     joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
# #     # Relationships
# #     user = db.relationship('User', back_populates='memberships')
# #     organization = db.relationship('Organization', back_populates='members')
# #     role = db.relationship('Role')

# # # SubscriptionTier Model
# # class SubscriptionTier(db.Model):
# #     __tablename__ = 'subscription_tiers'
    
# #     id = db.Column(db.Integer, primary_key=True)
# #     name = db.Column(db.String(50), unique=True, nullable=False)  # e.g., Free, Tier 1, Tier 2
# #     price = db.Column(db.Float, nullable=False)
# #     features = db.Column(db.JSON)  # Using JSON for structured features
# #     created_at = db.Column(db.DateTime, default=datetime.utcnow)
# #     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
# #     # Relationships
# #     subscriptions = db.relationship('Subscription', back_populates='tier', cascade="all, delete-orphan")

# # # Subscription Model
# # class Subscription(db.Model):
# #     __tablename__ = 'subscriptions'
    
# #     id = db.Column(db.Integer, primary_key=True)
# #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
# #     tier_id = db.Column(db.Integer, db.ForeignKey('subscription_tiers.id'), nullable=False)
# #     start_date = db.Column(db.DateTime, default=datetime.utcnow)
# #     end_date = db.Column(db.DateTime, nullable=True)  # Null for ongoing subscriptions
# #     is_active = db.Column(db.Boolean, default=True)
# #     is_deleted = db.Column(db.Boolean, default=False)
    
# #     # Relationships
# #     user = db.relationship('User', back_populates='subscriptions')
# #     tier = db.relationship('SubscriptionTier', back_populates='subscriptions')


# from extensions import db, bcrypt
# from datetime import datetime, timedelta
# from flask import current_app
# from enum import Enum
# from sqlalchemy import Enum as SQLAlchemyEnum
# import jwt  # Import PyJWT

# # Define RoleEnum using Python's Enum with uppercase values
# class RoleEnum(Enum):
#     ADMIN = 'ADMIN'
#     USER = 'USER'
#     MANAGER = 'MANAGER'

# # Association Object with Additional Fields (UserRole)
# class UserRole(db.Model):
#     __tablename__ = 'user_roles'
    
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
#     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), primary_key=True)
#     assigned_at = db.Column(db.DateTime, default=datetime.utcnow)
    
#     # Relationships
#     user = db.relationship('User', back_populates='user_roles', overlaps="roles,user_roles")
#     role = db.relationship('Role', back_populates='user_roles', overlaps="users,user_roles")

# # User Model
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
    
#     # Relationships
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
#         self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
#         self.first_name = first_name
#         self.last_name = last_name

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
#             return None  # Token has expired
#         except jwt.InvalidTokenError:
#             return None  # Invalid token

#     def __repr__(self):
#         return f"<User {self.email}>"

# # Role Model
# class Role(db.Model):
#     __tablename__ = 'roles'
    
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(
#         SQLAlchemyEnum(RoleEnum, name='role_enum'), 
#         unique=True, 
#         nullable=False
#     )
#     description = db.Column(db.String(255))
    
#     # Relationships
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
#         if not isinstance(name, RoleEnum):
#             raise ValueError("name must be an instance of RoleEnum")
#         self.name = name.value  # Use the enum's value
#         self.description = description

# # Organization Model
# class Organization(db.Model):
#     __tablename__ = 'organizations'
    
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(150), unique=True, nullable=False)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
#     is_deleted = db.Column(db.Boolean, default=False)
    
#     # Relationships
#     members = db.relationship('OrganizationMember', back_populates='organization', cascade="all, delete-orphan")
#     workspaces = db.relationship('Workspace', back_populates='organization', cascade="all, delete-orphan")

# # Workspace Model
# class Workspace(db.Model):
#     __tablename__ = 'workspaces'
    
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(150), nullable=False)
#     organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
#     is_deleted = db.Column(db.Boolean, default=False)
    
#     # Relationships
#     organization = db.relationship('Organization', back_populates='workspaces')
#     members = db.relationship('WorkspaceMember', back_populates='workspace', cascade="all, delete-orphan")

# # WorkspaceMember Model
# class WorkspaceMember(db.Model):
#     __tablename__ = 'workspace_members'
    
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
#     workspace_id = db.Column(db.Integer, db.ForeignKey('workspaces.id'), primary_key=True)
#     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
#     joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
#     # Relationships
#     user = db.relationship('User', back_populates='workspace_memberships')
#     workspace = db.relationship('Workspace', back_populates='members')
#     role = db.relationship('Role')

# # OrganizationMember Model
# class OrganizationMember(db.Model):
#     __tablename__ = 'organization_members'
    
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
#     organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), primary_key=True)
#     role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
#     joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
#     # Relationships
#     user = db.relationship('User', back_populates='memberships')
#     organization = db.relationship('Organization', back_populates='members')
#     role = db.relationship('Role')

# # SubscriptionTier Model
# class SubscriptionTier(db.Model):
#     __tablename__ = 'subscription_tiers'
    
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50), unique=True, nullable=False)  # e.g., Free, Tier 1, Tier 2
#     price = db.Column(db.Float, nullable=False)
#     features = db.Column(db.JSON)  # Using JSON for structured features
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
#     # Relationships
#     subscriptions = db.relationship('Subscription', back_populates='tier', cascade="all, delete-orphan")

# # Subscription Model
# class Subscription(db.Model):
#     __tablename__ = 'subscriptions'
    
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     tier_id = db.Column(db.Integer, db.ForeignKey('subscription_tiers.id'), nullable=False)
#     start_date = db.Column(db.DateTime, default=datetime.utcnow)
#     end_date = db.Column(db.DateTime, nullable=True)  # Null for ongoing subscriptions
#     is_active = db.Column(db.Boolean, default=True)
#     is_deleted = db.Column(db.Boolean, default=False)
    
#     # Relationships
#     user = db.relationship('User', back_populates='subscriptions')
#     tier = db.relationship('SubscriptionTier', back_populates='subscriptions')

from extensions import db, bcrypt
from datetime import datetime, timedelta
from flask import current_app
from enum import Enum
from sqlalchemy import Enum as SQLAlchemyEnum
import jwt  # Import PyJWT

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
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        self.first_name = first_name
        self.last_name = last_name

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

    def __repr__(self):
        return f"<User {self.email}>"

class Role(db.Model):
    __tablename__ = 'roles'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(SQLAlchemyEnum(RoleEnum), unique=True, nullable=False)
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