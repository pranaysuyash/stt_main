# auth/validators.py

import re
from marshmallow import ValidationError

def validate_password(password):
    """
    Validates the strength of the password.
    Raises ValidationError if the password does not meet criteria.
    """
    if len(password) < 8:
        raise ValidationError('Password must be at least 8 characters long.')
    if not re.search(r'[A-Z]', password):
        raise ValidationError('Password must contain at least one uppercase letter.')
    if not re.search(r'[a-z]', password):
        raise ValidationError('Password must contain at least one lowercase letter.')
    if not re.search(r'\d', password):
        raise ValidationError('Password must contain at least one number.')
    if not re.search(r'[!@#$%^&*(),.?":{}|<>_]', password):
        raise ValidationError('Password must contain at least one special character.')
