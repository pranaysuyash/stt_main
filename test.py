# models.py

from sqlalchemy import Column, Integer, String, Enum, ForeignKey, Table
from sqlalchemy.orm import relationship
from extensions import db
from enum import Enum as PyEnum

class RoleEnum(PyEnum):
    ADMIN = 'ADMIN'
    USER = 'USER'
    MANAGER = 'MANAGER'

class Role(db.Model):
    __tablename__ = 'roles'
    
    id = Column(Integer, primary_key=True)
    name = Column(Enum(RoleEnum, name='roleenum'), unique=True, nullable=False)
    description = Column(String(255))
    users = relationship('User', secondary='user_roles', back_populates='roles')

class User(db.Model):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(200), nullable=False)
    roles = relationship('Role', secondary='user_roles', back_populates='users')

class UserRole(db.Model):
    __tablename__ = 'user_roles'
    
    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    role_id = Column(Integer, ForeignKey('roles.id'), primary_key=True)

class Organization(db.Model):
    __tablename__ = 'organizations'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)
    members = relationship('OrganizationMember', back_populates='organization')

class Workspace(db.Model):
    __tablename__ = 'workspaces'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    organization_id = Column(Integer, ForeignKey('organizations.id'), nullable=False)
    organization = relationship('Organization', back_populates='workspaces')
    members = relationship('WorkspaceMember', back_populates='workspace')

class SubscriptionTier(db.Model):
    __tablename__ = 'subscription_tiers'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True, nullable=False)
    price = Column(Integer, nullable=False)
    features = Column(String(500))

class Subscription(db.Model):
    __tablename__ = 'subscriptions'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    tier_id = Column(Integer, ForeignKey('subscription_tiers.id'), nullable=False)
    start_date = Column(String, nullable=False)
    end_date = Column(String, nullable=False)
    user = relationship('User')
    tier = relationship('SubscriptionTier')

class OrganizationMember(db.Model):
    __tablename__ = 'organization_members'
    
    id = Column(Integer, primary_key=True)
    organization_id = Column(Integer, ForeignKey('organizations.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    organization = relationship('Organization', back_populates='members')
    user = relationship('User')

class WorkspaceMember(db.Model):
    __tablename__ = 'workspace_members'
    
    id = Column(Integer, primary_key=True)
    workspace_id = Column(Integer, ForeignKey('workspaces.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    workspace = relationship('Workspace', back_populates='members')
    user = relationship('User')

class File(db.Model):
    __tablename__ = 'files'
    
    id = Column(Integer, primary_key=True)
    filename = Column(String, nullable=False)
    path = Column(String, nullable=False)
    type = Column(String, nullable=False)
    size = Column(Integer, nullable=False)
    duration = Column(String)  # e.g., "02:30"
    tags = relationship('Tag', back_populates='file')

class Tag(db.Model):
    __tablename__ = 'tags'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    file_id = Column(Integer, ForeignKey('files.id'), nullable=False)
    file = relationship('File', back_populates='tags')
