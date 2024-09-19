# celery_app.py

from celery import Celery
import os

def make_celery():
    """
    Initialize Celery with Flask app's configuration.
    """
    celery = Celery(
        'stt_main',
        broker=os.getenv('CELERY_BROKER_URL', 'redis://localhost:6379/0'),
        backend=os.getenv('CELERY_RESULT_BACKEND', 'redis://localhost:6379/0'),
        include=['tasks']
    )
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'uploads')
    celery.conf.update(
        task_serializer='json',
        accept_content=['json'],
        result_serializer='json',
        timezone='UTC',
        enable_utc=True,
        UPLOAD_FOLDER=UPLOAD_FOLDER
    )
    return celery

celery = make_celery()
