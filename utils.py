
# utils.py

import os
from werkzeug.utils import secure_filename
from moviepy.editor import VideoFileClip
from PIL import Image
import ffmpeg

# Define your allowed extensions categorized by type
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

def extract_image_metadata(file_path):
    """
    Extract metadata from an image file.
    """
    try:
        with Image.open(file_path) as img:
            return {
                'width': img.width,
                'height': img.height,
                'format': img.format,
                'mode': img.mode,
            }
    except Exception as e:
        print(f"Error extracting image metadata: {e}")
        return {}

def extract_audio_metadata(file_path):
    """
    Extract metadata from an audio file using ffmpeg.
    """
    try:
        probe = ffmpeg.probe(file_path)
        format_info = probe.get('format', {})
        streams = probe.get('streams', [])
        audio_streams = [s for s in streams if s.get('codec_type') == 'audio']
        if not audio_streams:
            return {}
        audio_stream = audio_streams[0]
        return {
            'duration': float(format_info.get('duration', 0)),
            'bit_rate': int(format_info.get('bit_rate', 0)),
            'sample_rate': int(audio_stream.get('sample_rate', 0)),
            'channels': int(audio_stream.get('channels', 0)),
            'codec_name': audio_stream.get('codec_name'),
        }
    except Exception as e:
        print(f"Error extracting audio metadata: {e}")
        return {}

def extract_video_metadata(file_path):
    """
    Extract metadata from a video file using ffmpeg.
    """
    try:
        probe = ffmpeg.probe(file_path)
        format_info = probe.get('format', {})
        streams = probe.get('streams', [])
        video_streams = [s for s in streams if s.get('codec_type') == 'video']
        if not video_streams:
            return {}
        video_stream = video_streams[0]
        return {
            'duration': float(format_info.get('duration', 0)),
            'bit_rate': int(format_info.get('bit_rate', 0)),
            'width': int(video_stream.get('width', 0)),
            'height': int(video_stream.get('height', 0)),
            'frame_rate': eval(video_stream.get('r_frame_rate', '0')),
            'codec_name': video_stream.get('codec_name'),
        }
    except Exception as e:
        print(f"Error extracting video metadata: {e}")
        return {}
