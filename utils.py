# utils.py

import os
from werkzeug.utils import secure_filename
from moviepy.editor import VideoFileClip

# Define your allowed extensions
ALLOWED_EXTENSIONS = {
    'audio': {'mp3', 'wav', 'aac', 'flac', 'ogg', 'm4a'},
    'video': {'mp4', 'avi', 'mov', 'mkv', 'flv', 'wmv'},
    'image': {'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'}
}

def allowed_file(filename):
    """
    Check if the file has an allowed extension.
    """
    if '.' not in filename:
        return False
    ext = filename.rsplit('.', 1)[1].lower()
    for category in ALLOWED_EXTENSIONS:
        if ext in ALLOWED_EXTENSIONS[category]:
            return True
    return False

def get_file_category(filename):
    """
    Determine the category of the file based on its extension.
    Returns 'audio', 'video', 'image', or None.
    """
    if '.' not in filename:
        return None
    ext = filename.rsplit('.', 1)[1].lower()
    for category, extensions in ALLOWED_EXTENSIONS.items():
        if ext in extensions:
            return category
    return None

def extract_audio(video_path, audio_path):
    """
    Extract audio from a video file and save it.
    """
    try:
        with VideoFileClip(video_path) as video:
            audio = video.audio
            if audio:
                audio.write_audiofile(audio_path)
                return True, ""
            else:
                return False, "No audio track found in the video."
    except Exception as e:
        return False, str(e)
