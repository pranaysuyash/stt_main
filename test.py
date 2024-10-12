# models.py

from extensions import db, bcrypt
from datetime import datetime, timedelta
from flask import current_app
from enum import Enum
from sqlalchemy import Enum as SQLAlchemyEnum, ForeignKey, Table
import jwt
import uuid

# Define RoleEnum
class RoleEnum(str, Enum):
    ADMIN = 'ADMIN'
    USER = 'USER'
    MANAGER = 'MANAGER'

# Association table for User and Role (UserRole)
class UserRole(db.Model):
    __tablename__ = 'user_roles'
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), primary_key=True)
    assigned_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', back_populates='user_roles', overlaps="roles,user_roles")
    role = db.relationship('Role', back_populates='user_roles', overlaps="users,user_roles")

# User Model
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
    
    # Relationships
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
    media_files = db.relationship('MediaFile', back_populates='user', cascade="all, delete-orphan")
    workflows = db.relationship('Workflow', back_populates='user', cascade="all, delete-orphan")
    user_profile = db.relationship('UserProfile', back_populates='user', uselist=False, cascade="all, delete-orphan")

    # Methods for password management, token generation, etc.
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

# Role Model
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

# UserProfile Model
class UserProfile(db.Model):
    __tablename__ = 'user_profiles'
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    industry = db.Column(db.String(100))
    job_role = db.Column(db.String(100))
    experience_level = db.Column(db.String(50))
    use_cases = db.Column(db.Text)
    
    # Relationship
    user = db.relationship('User', back_populates='user_profile')

# Organization Model
class Organization(db.Model):
    __tablename__ = 'organizations'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_deleted = db.Column(db.Boolean, default=False)
    
    members = db.relationship('OrganizationMember', back_populates='organization', cascade="all, delete-orphan")
    workspaces = db.relationship('Workspace', back_populates='organization', cascade="all, delete-orphan")

# Workspace Model
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

# WorkspaceMember Model
class WorkspaceMember(db.Model):
    __tablename__ = 'workspace_members'
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    workspace_id = db.Column(db.Integer, db.ForeignKey('workspaces.id'), primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', back_populates='workspace_memberships')
    workspace = db.relationship('Workspace', back_populates='members')
    role = db.relationship('Role')

# OrganizationMember Model
class OrganizationMember(db.Model):
    __tablename__ = 'organization_members'
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', back_populates='memberships')
    organization = db.relationship('Organization', back_populates='members')
    role = db.relationship('Role')

# SubscriptionTier Model
class SubscriptionTier(db.Model):
    __tablename__ = 'subscription_tiers'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    price = db.Column(db.Float, nullable=False)
    features = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    subscriptions = db.relationship('Subscription', back_populates='tier', cascade="all, delete-orphan")

# Subscription Model
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

# Association table for MediaFile and Tag
media_file_tags = db.Table('media_file_tags',
    db.Column('media_file_id', db.String(36), db.ForeignKey('media_files.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True)
)

# Tag Model
class Tag(db.Model):
    __tablename__ = 'tags'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    
    # Many-to-many relationship with MediaFile
    media_files = db.relationship('MediaFile', secondary=media_file_tags, back_populates='tags')

# MediaFile Model
class MediaFile(db.Model):
    __tablename__ = 'media_files'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    filename = db.Column(db.String(255), nullable=False, index=True)
    storage_path = db.Column(db.String(500), nullable=False)
    file_size = db.Column(db.BigInteger, nullable=False)  # File size in bytes
    file_type = db.Column(db.String(50), nullable=False)  # e.g., 'video', 'audio', 'image'
    duration = db.Column(db.Float)  # Duration in seconds if media file
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False, index=True)
    metadata = db.Column(db.JSON)  # Additional metadata as JSON
    is_deleted = db.Column(db.Boolean, default=False)
    
    # Relationships
    user = db.relationship('User', back_populates='media_files')
    processed_artifacts = db.relationship('ProcessedArtifact', back_populates='media_file', cascade="all, delete-orphan")
    analysis_results = db.relationship('AnalysisResult', back_populates='media_file', cascade="all, delete-orphan")
    tags = db.relationship('Tag', secondary=media_file_tags, back_populates='media_files')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'filename': self.filename,
            'storage_path': self.storage_path,
            'file_size': self.file_size,
            'file_type': self.file_type,
            'duration': self.duration,
            'uploaded_at': self.uploaded_at.isoformat(),
            'metadata': self.metadata,
            'tags': [tag.name for tag in self.tags]
        }

# ProcessedArtifact Model
class ProcessedArtifact(db.Model):
    __tablename__ = 'processed_artifacts'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    media_file_id = db.Column(db.String(36), db.ForeignKey('media_files.id'), nullable=False)
    artifact_type = db.Column(db.String(50), nullable=False)  # e.g., 'audio_chunk', 'video_chunk', 'frame'
    file_path = db.Column(db.String(500), nullable=False)
    metadata = db.Column(db.JSON)  # Additional metadata as JSON
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    media_file = db.relationship('MediaFile', back_populates='processed_artifacts')
    analysis_results = db.relationship('AnalysisResult', back_populates='processed_artifact', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'media_file_id': self.media_file_id,
            'artifact_type': self.artifact_type,
            'file_path': self.file_path,
            'metadata': self.metadata,
            'created_at': self.created_at.isoformat()
        }

# AnalysisResult Model
class AnalysisResult(db.Model):
    __tablename__ = 'analysis_results'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    media_file_id = db.Column(db.String(36), db.ForeignKey('media_files.id'), nullable=True)
    processed_artifact_id = db.Column(db.String(36), db.ForeignKey('processed_artifacts.id'), nullable=True)
    analysis_type = db.Column(db.String(100), nullable=False)  # e.g., 'transcription', 'sentiment_analysis'
    result = db.Column(db.JSON, nullable=False)  # Analysis result as JSON
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    media_file = db.relationship('MediaFile', back_populates='analysis_results')
    processed_artifact = db.relationship('ProcessedArtifact', back_populates='analysis_results')

    def to_dict(self):
        return {
            'id': self.id,
            'media_file_id': self.media_file_id,
            'processed_artifact_id': self.processed_artifact_id,
            'analysis_type': self.analysis_type,
            'result': self.result,
            'created_at': self.created_at.isoformat()
        }

# Workflow Model
class Workflow(db.Model):
    __tablename__ = 'workflows'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    steps = db.Column(db.JSON, nullable=False)  # Ordered list of analysis steps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', back_populates='workflows')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'steps': self.steps,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }