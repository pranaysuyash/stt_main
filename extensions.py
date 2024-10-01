# extensions.py

from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# Initialize Extensions
db = SQLAlchemy()
mail = Mail()
bcrypt = Bcrypt()
jwt = JWTManager()
migrate = Migrate()
limiter = Limiter(key_func=get_remote_address)
