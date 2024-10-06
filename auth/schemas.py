# from marshmallow import Schema, fields, validate, validates, ValidationError
# from models import RoleEnum
# import re

# class RoleSchema(Schema):
#     id = fields.Int(dump_only=True)
#     name = fields.Enum(RoleEnum, by_value=True)
#     description = fields.Str()

# class UserSchema(Schema):
#     id = fields.Int(dump_only=True)
#     email = fields.Email(required=True)
#     password = fields.Str(required=True, load_only=True)
#     first_name = fields.Str()
#     last_name = fields.Str()
#     is_active = fields.Boolean(dump_only=True)
#     confirmed_at = fields.DateTime(dump_only=True)
#     created_at = fields.DateTime(dump_only=True)
#     updated_at = fields.DateTime(dump_only=True)
#     is_deleted = fields.Boolean(dump_only=True)
#     roles = fields.List(fields.Nested(RoleSchema), dump_only=True)

#     @validates('password')
#     def validate_password(self, value):
#         if len(value) < 8:
#             raise ValidationError('Password must be at least 8 characters long.')
#         if not re.search(r'[A-Z]', value):
#             raise ValidationError('Password must contain at least one uppercase letter.')
#         if not re.search(r'[a-z]', value):
#             raise ValidationError('Password must contain at least one lowercase letter.')
#         if not re.search(r'\d', value):
#             raise ValidationError('Password must contain at least one number.')
#         if not re.search(r'[!@#$%^&*(),.?":{}|<>_]', value):
#             raise ValidationError('Password must contain at least one special character.')

# class LoginSchema(Schema):
#     email = fields.Email(required=True)
#     password = fields.Str(required=True)

# class TokenSchema(Schema):
#     access_token = fields.Str(required=True)
#     refresh_token = fields.Str(required=True)

# class PasswordResetRequestSchema(Schema):
#     email = fields.Email(required=True)

# class PasswordResetSchema(Schema):
#     token = fields.Str(required=True)
#     password = fields.Str(required=True)

#     @validates('password')
#     def validate_password(self, value):
#         if len(value) < 8:
#             raise ValidationError('Password must be at least 8 characters long.')
#         if not re.search(r'[A-Z]', value):
#             raise ValidationError('Password must contain at least one uppercase letter.')
#         if not re.search(r'[a-z]', value):
#             raise ValidationError('Password must contain at least one lowercase letter.')
#         if not re.search(r'\d', value):
#             raise ValidationError('Password must contain at least one number.')
#         if not re.search(r'[!@#$%^&*(),.?":{}|<>_]', value):
#             raise ValidationError('Password must contain at least one special character.')

# class ChangePasswordSchema(Schema):
#     current_password = fields.Str(required=True)
#     new_password = fields.Str(required=True)

#     @validates('new_password')
#     def validate_new_password(self, value):
#         if len(value) < 8:
#             raise ValidationError('Password must be at least 8 characters long.')
#         if not re.search(r'[A-Z]', value):
#             raise ValidationError('Password must contain at least one uppercase letter.')
#         if not re.search(r'[a-z]', value):
#             raise ValidationError('Password must contain at least one lowercase letter.')
#         if not re.search(r'\d', value):
#             raise ValidationError('Password must contain at least one number.')
#         if not re.search(r'[!@#$%^&*(),.?":{}|<>_]', value):
#             raise ValidationError('Password must contain at least one special character.')

# class TokenBlocklistSchema(Schema):
#     id = fields.Int(dump_only=True)
#     jti = fields.Str(required=True)
#     created_at = fields.DateTime(dump_only=True)

# auth/schemas.py

from marshmallow import Schema, fields, validates, ValidationError
from marshmallow_enum import EnumField
from models import RoleEnum
from .validators import validate_password

class RoleSchema(Schema):
    id = fields.Int(dump_only=True)
    name = EnumField(RoleEnum, by_value=True)
    description = fields.Str()

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    email = fields.Email(required=True)
    password = fields.Str(required=True, load_only=True, validate=validate_password)
    first_name = fields.Str()
    last_name = fields.Str()
    is_active = fields.Boolean(dump_only=True)
    confirmed_at = fields.DateTime(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    is_deleted = fields.Boolean(dump_only=True)
    roles = fields.List(fields.Nested(RoleSchema), dump_only=True)

class LoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)

class TokenSchema(Schema):
    access_token = fields.Str(required=True)
    refresh_token = fields.Str(required=True)

class PasswordResetRequestSchema(Schema):
    email = fields.Email(required=True)

class PasswordResetSchema(Schema):
    token = fields.Str(required=True)
    password = fields.Str(required=True, validate=validate_password)

class ChangePasswordSchema(Schema):
    current_password = fields.Str(required=True)
    new_password = fields.Str(required=True, validate=validate_password)

class TokenBlocklistSchema(Schema):
    id = fields.Int(dump_only=True)
    jti = fields.Str(required=True)
    created_at = fields.DateTime(dump_only=True)
