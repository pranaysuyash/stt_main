# # # extensions.py

# # from flask_sqlalchemy import SQLAlchemy
# # from flask_mail import Mail
# # from flask_bcrypt import Bcrypt
# # from flask_jwt_extended import JWTManager
# # from flask_migrate import Migrate
# # from flask_limiter import Limiter
# # from flask_limiter.util import get_remote_address

# # # Initialize Extensions
# # db = SQLAlchemy()
# # mail = Mail()
# # bcrypt = Bcrypt()
# # jwt = JWTManager()
# # migrate = Migrate()
# # limiter = Limiter(key_func=get_remote_address)

# from flask_sqlalchemy import SQLAlchemy
# from flask_mail import Mail
# from flask_bcrypt import Bcrypt
# from flask_jwt_extended import JWTManager
# from flask_migrate import Migrate
# from flask_limiter import Limiter
# from flask_limiter.util import get_remote_address

# # Initialize Extensions
# db = SQLAlchemy()
# mail = Mail()
# bcrypt = Bcrypt()
# jwt = JWTManager()
# migrate = Migrate()
# limiter = Limiter(key_func=get_remote_address)

# extensions.py

# import os
# from flask_sqlalchemy import SQLAlchemy
# from flask_mail import Mail
# from flask_bcrypt import Bcrypt
# from flask_jwt_extended import JWTManager
# from flask_migrate import Migrate
# from flask_limiter import Limiter
# from flask_limiter.util import get_remote_address
# from redis import Redis

# # Initialize Redis connection
# redis_url = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
# redis_client = Redis.from_url(redis_url)

# # Initialize Extensions
# db = SQLAlchemy()
# mail = Mail()
# bcrypt = Bcrypt()
# jwt = JWTManager()
# migrate = Migrate()
# limiter = Limiter(
#     key_func=get_remote_address,
#     storage_uri=redis_url  # Configure Redis as the storage backend
# )

# extensions.py

import os
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from redis import Redis

# Initialize Redis connection for rate limiting and token blocklist
redis_url = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
redis_client = Redis.from_url(redis_url, decode_responses=True)

# Initialize Extensions
db = SQLAlchemy()
mail = Mail()
bcrypt = Bcrypt()
jwt = JWTManager()
migrate = Migrate()
limiter = Limiter(
    key_func=get_remote_address,
    storage_uri=redis_url,  # Configure Redis as the storage backend
    # default_limits=["200 per day", "50 per hour"]  # Default rate limits
)
