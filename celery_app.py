# # # # celery_app.py

# # # from celery import Celery
# # # import os

# # # def make_celery():
# # #     """
# # #     Initialize Celery with Flask app's configuration.
# # #     """
# # #     celery = Celery(
# # #         'stt_main',
# # #         broker=os.getenv('CELERY_BROKER_URL', 'redis://localhost:6379/0'),
# # #         backend=os.getenv('CELERY_RESULT_BACKEND', 'redis://localhost:6379/0'),
# # #         include=['tasks']
# # #     )
# # #     BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# # #     UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'uploads')
# # #     celery.conf.update(
# # #         task_serializer='json',
# # #         accept_content=['json'],
# # #         result_serializer='json',
# # #         timezone='UTC',
# # #         enable_utc=True,
# # #         UPLOAD_FOLDER=UPLOAD_FOLDER
# # #     )
# # #     return celery

# # # celery = make_celery()

# # # celery_app.py

# # from celery import Celery
# # from app import create_app
# # import os

# # def make_celery(app=None):
# #     """
# #     Initialize Celery with Flask app's configuration.
# #     """
# #     app = app or create_app()
    
# #     celery = Celery(
# #         app.import_name,
# #         broker=app.config['CELERY_BROKER_URL'],
# #         backend=app.config['CELERY_RESULT_BACKEND']
# #     )
# #     celery.conf.update(app.config)
    
# #     class ContextTask(celery.Task):
# #         def __call__(self, *args, **kwargs):
# #             with app.app_context():
# #                 return self.run(*args, **kwargs)
    
# #     celery.Task = ContextTask
# #     return celery

# # celery = make_celery()

# # celery_app.py

# # from celery import Celery
# # from app import create_app
# # import os

# # def make_celery(app=None):
# #     """
# #     Initialize Celery with Flask app's configuration.
# #     """
# #     app = app or create_app()
    
# #     celery = Celery(
# #         app.import_name,
# #         broker=app.config['CELERY_BROKER_URL'],
# #         backend=app.config['CELERY_RESULT_BACKEND']
# #     )
# #     celery.conf.update(app.config)
    
# #     class ContextTask(celery.Task):
# #         def __call__(self, *args, **kwargs):
# #             with app.app_context():
# #                 return self.run(*args, **kwargs)
    
# #     celery.Task = ContextTask
# #     return celery

# # celery = make_celery()
# # celery_app.py

# # from celery import Celery

# # def make_celery():
# #     celery = Celery(
# #         'stt_main',
# #         broker='redis://localhost:6379/0',  # Replace with your broker URL
# #         backend='redis://localhost:6379/0',  # Replace with your backend URL
# #         include=['tasks']
# #     )
# #     celery.config_from_object('celeryconfig')  # Replace with your config module
# #     return celery

# # celery = make_celery()
# # celery_app.py

# from celery import Celery
# from app import create_app

# def make_celery():
#     app = create_app()
#     celery = Celery(
#         app.import_name,
#         broker=app.config['CELERY_BROKER_URL'],
#         backend=app.config['CELERY_RESULT_BACKEND']
#     )
#     celery.conf.update(app.config)

#     class ContextTask(celery.Task):
#         def __call__(self, *args, **kwargs):
#             with app.app_context():
#                 return self.run(*args, **kwargs)

#     celery.Task = ContextTask
#     return celery

# celery = make_celery()

# # Import tasks after Celery app is initialized
# import tasks

from celery import Celery
from app import create_app

def make_celery(app):
    celery = Celery(
        app.import_name,
        broker=app.config['CELERY_BROKER_URL'],
        backend=app.config['CELERY_RESULT_BACKEND']
    )
    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask

    # Autodiscover tasks from the 'tasks' module
    celery.autodiscover_tasks(['tasks'])

    return celery

app = create_app()
celery = make_celery(app)

# Removed: import tasks
