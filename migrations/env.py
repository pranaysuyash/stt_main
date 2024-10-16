# # import logging
# # from logging.config import fileConfig

# # from flask import current_app

# # from alembic import context
# # import sys
# # import os

# # from sqlalchemy import engine_from_config
# # from sqlalchemy import pool

# # # Add your app's directory to the sys.path
# # sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# # from app import app  # Adjust based on your project structure

# # # This is the Alembic Config object, which provides access to the values within the .ini file in use.
# # config = context.config

# # # Interpret the config file for Python logging.
# # # This line sets up loggers basically.
# # fileConfig(config.config_file_name)
# # logger = logging.getLogger('alembic.env')


# # def get_engine():
# #     try:
# #         # This works with Flask-SQLAlchemy<3 and Alchemical
# #         return current_app.extensions['migrate'].db.get_engine()
# #     except (TypeError, AttributeError):
# #         # This works with Flask-SQLAlchemy>=3
# #         return current_app.extensions['migrate'].db.engine


# # def get_engine_url():
# #     try:
# #         return get_engine().url.render_as_string(hide_password=False).replace('%', '%%')
# #     except AttributeError:
# #         return str(get_engine().url).replace('%', '%%')


# # # Add your model's MetaData object here for 'autogenerate' support
# # # from myapp import mymodel
# # # target_metadata = mymodel.Base.metadata
# # target_metadata = app.extensions['migrate'].db.metadata

# # config.set_main_option('sqlalchemy.url', app.config['SQLALCHEMY_DATABASE_URI'])
# # target_db = current_app.extensions['migrate'].db

# # # Other values from the config, defined by the needs of env.py, can be acquired:
# # # my_important_option = config.get_main_option("my_important_option")
# # # ... etc.


# # def get_metadata():
# #     if hasattr(target_db, 'metadatas'):
# #         return target_db.metadatas[None]
# #     return target_db.metadata


# # def process_revision_directives(context, revision, directives):
# #     if getattr(config.cmd_opts, 'autogenerate', False):
# #         script = directives[0]

# #         # Handle multiple UpgradeOps entries
# #         if hasattr(script, 'upgrade_ops_list'):
# #             # Check if all upgrade_ops are empty
# #             empty = all(upgrade_ops.is_empty() for upgrade_ops in script.upgrade_ops_list)
# #         else:
# #             empty = script.upgrade_ops.is_empty()

# #         if empty:
# #             directives[:] = []
# #             logger.info('No changes in schema detected.')


# # def run_migrations_offline():
# #     """Run migrations in 'offline' mode."""
# #     url = config.get_main_option("sqlalchemy.url")
# #     context.configure(
# #         url=url,
# #         target_metadata=get_metadata(),
# #         literal_binds=True,
# #         **current_app.extensions['migrate'].configure_args  # Use configure_args here
# #     )

# #     with context.begin_transaction():
# #         context.run_migrations()


# # def run_migrations_online():
# #     """Run migrations in 'online' mode."""
# #     connectable = get_engine()

# #     with connectable.connect() as connection:
# #         # Prepare configure_args
# #         configure_args = current_app.extensions['migrate'].configure_args.copy()

# #         # Ensure compare_type is set, but only if not already present
# #         configure_args.setdefault('compare_type', True)

# #         # Attach the process_revision_directives function
# #         configure_args.setdefault('process_revision_directives', process_revision_directives)

# #         context.configure(
# #             connection=connection,
# #             target_metadata=get_metadata(),
# #             **configure_args  # Pass all configure_args here
# #         )

# #         with context.begin_transaction():
# #             context.run_migrations()


# # if context.is_offline_mode():
# #     run_migrations_offline()
# # else:
# #     run_migrations_online()


# # env.py

# import logging
# from logging.config import fileConfig

# from flask import current_app

# from alembic import context
# import sys
# import os

# from sqlalchemy import engine_from_config
# from sqlalchemy import pool

# # Add your app's directory to the sys.path
# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# from app import create_app  # Adjust based on your project structure

# # This is the Alembic Config object, which provides access to the values within the .ini file in use.
# config = context.config

# # Interpret the config file for Python logging.
# fileConfig(config.config_file_name)
# logger = logging.getLogger('alembic.env')

# # Create the Flask app context
# app = create_app()
# app.app_context().push()

# def get_engine():
#     try:
#         # This works with Flask-SQLAlchemy<3 and Alchemical
#         return current_app.extensions['migrate'].db.get_engine()
#     except (TypeError, AttributeError):
#         # This works with Flask-SQLAlchemy>=3
#         return current_app.extensions['migrate'].db.engine

# def get_engine_url():
#     try:
#         return get_engine().url.render_as_string(hide_password=False).replace('%', '%%')
#     except AttributeError:
#         return str(get_engine().url).replace('%', '%%')

# # Add your model's MetaData object here for 'autogenerate' support
# target_metadata = current_app.extensions['migrate'].db.metadata

# config.set_main_option('sqlalchemy.url', app.config['SQLALCHEMY_DATABASE_URI'])
# target_db = current_app.extensions['migrate'].db

# def get_metadata():
#     if hasattr(target_db, 'metadatas'):
#         return target_db.metadatas[None]
#     return target_db.metadata

# def process_revision_directives(context, revision, directives):
#     if getattr(config.cmd_opts, 'autogenerate', False):
#         script = directives[0]

#         # Handle multiple UpgradeOps entries
#         if hasattr(script, 'upgrade_ops_list'):
#             # Check if all upgrade_ops are empty
#             empty = all(upgrade_ops.is_empty() for upgrade_ops in script.upgrade_ops_list)
#         else:
#             empty = script.upgrade_ops.is_empty()

#         if empty:
#             directives[:] = []
#             logger.info('No changes in schema detected.')

# def run_migrations_offline():
#     """Run migrations in 'offline' mode."""
#     url = config.get_main_option("sqlalchemy.url")
#     context.configure(
#         url=url,
#         target_metadata=get_metadata(),
#         literal_binds=True,
#         **current_app.extensions['migrate'].configure_args
#     )

#     with context.begin_transaction():
#         context.run_migrations()

# def run_migrations_online():
#     """Run migrations in 'online' mode."""
#     connectable = get_engine()

#     with connectable.connect() as connection:
#         configure_args = current_app.extensions['migrate'].configure_args.copy()
#         configure_args.setdefault('compare_type', True)
#         configure_args.setdefault('process_revision_directives', process_revision_directives)

#         context.configure(
#             connection=connection,
#             target_metadata=get_metadata(),
#             **configure_args
#         )

#         with context.begin_transaction():
#             context.run_migrations()

# if context.is_offline_mode():
#     run_migrations_offline()
# else:
#     run_migrations_online()
# env.py

import os
import sys
import logging
from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool

# Import the Flask application factory and the database instance
from app import create_app, db  # Adjust this import based on your project structure

# This is the Alembic Config object, which provides access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
fileConfig(config.config_file_name)
logger = logging.getLogger('alembic.env')

# Add your app's directory to the sys.path to ensure modules can be imported correctly
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Create an instance of the Flask application
app = create_app()

# Set the SQLAlchemy URL to the one specified in your Flask configuration
config.set_main_option('sqlalchemy.url', app.config.get('SQLALCHEMY_DATABASE_URI'))

# Set the target metadata for Alembic autogeneration
target_metadata = db.metadata

def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    """Run migrations in 'online' mode."""
    # Use the engine from the Flask application's SQLAlchemy instance
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix='sqlalchemy.',
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()