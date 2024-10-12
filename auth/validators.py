# auth/validators.py
import re
from marshmallow import ValidationError

def validate_password(password):
    """
 Validates the strength of the password.
 Raises ValidationError if the password does not meet criteria..
 
 Criteria:
 - At least 8 characters long
 - Contains at least one uppercase letter
 - Contains at least one lowercase letter
 - Contains at least one number
 - Contains at least one special character
 """
    # Check length
    if len(password) < 8:
        raise ValidationError('Password must be at least 8 characters long.')
    
    # Check for uppercase letters
    if not re.search(r'[A-Z]', password):
        raise ValidationError('Password must contain at least one uppercase letter.')
    
    # Check for lowercase letters
    if not re.search(r'[a-z]', password):
        raise ValidationError('Password must contain at least one lowercase letter.')
    
    # Check for numbers
    if not re.search(r'\d', password):
        raise ValidationError('Password must contain at least one number.')
    
    # Check for special characters
    if not re.search(r'[!@#$%^&*(),.?":{}|<>_]', password):
        raise ValidationError('Password must contain at least one special character.')
