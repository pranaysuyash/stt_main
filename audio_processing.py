# audio_processing.py

from moviepy.editor import VideoFileClip
import matplotlib.pyplot as plt
from pydub import AudioSegment
import numpy as np
import subprocess
import logging
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Use a non-interactive backend for matplotlib
plt.switch_backend('Agg')

def extract_audio_from_video(video_path, output_audio_path):
    """
    Extracts the audio track from a video file and saves it as a separate audio file.

    Args:
    - video_path: Path to the video file.
    - output_audio_path: Path where the extracted audio file will be saved.

    Returns:
    - Path to the extracted audio file or None if the video has no audio or extraction failed.
    """
    try:
        logger.info(f"Attempting to extract audio from video: {video_path}")
        
        # Check if video file exists
        if not os.path.exists(video_path):
            logger.error(f"Video file does not exist: {video_path}")
            return None

        # Initialize VideoFileClip
        video = VideoFileClip(video_path)
        
        # Check if the video has an audio track
        if video.audio is None:
            logger.warning(f"No audio track found in the video: {video_path}")
            video.close()
            return None

        # Write audio to the specified file
        logger.info(f"Extracting audio to: {output_audio_path}")
        video.audio.write_audiofile(output_audio_path, logger=None)  # Suppress moviepy's own logging
        video.close()

        # Verify if audio file was created
        if os.path.exists(output_audio_path):
            logger.info(f"Audio extraction successful: {output_audio_path}")
            return output_audio_path
        else:
            logger.error(f"Audio extraction failed, file not found: {output_audio_path}")
            return None

    except Exception as e:
        logger.exception(f"Exception occurred during audio extraction: {e}")
        return None

def generate_waveform(audio_file, output_image_path):
    """
    Generates a waveform image from an audio file and saves it as an image.

    Args:
    - audio_file: Path to the audio file.
    - output_image_path: Path where the waveform image will be saved.

    Returns:
    - Path to the generated waveform image or None if generation failed.
    """
    try:
        logger.info(f"Generating waveform for audio file: {audio_file}")

        # Check if audio file exists
        if not os.path.exists(audio_file):
            logger.error(f"Audio file does not exist: {audio_file}")
            return None

        # Load the audio file using pydub
        audio = AudioSegment.from_file(audio_file)
        
        # Get the raw audio data as a numpy array
        data = np.array(audio.get_array_of_samples())
        
        # Handle stereo audio by converting to mono
        if audio.channels == 2:
            data = data.reshape((-1, 2))
            data = data.mean(axis=1)
        
        # Create the waveform plot using matplotlib
        plt.figure(figsize=(10, 4))
        plt.plot(data, color='blue')
        plt.fill_between(range(len(data)), data, color='skyblue', alpha=0.4)
        plt.title('Waveform')
        plt.xlabel('Time (samples)')
        plt.ylabel('Amplitude')
        
        # Save the generated waveform image
        plt.savefig(output_image_path)
        plt.close()
        
        logger.info(f"Waveform image saved at: {output_image_path}")
        return output_image_path

    except Exception as e:
        logger.exception(f"Exception occurred during waveform generation: {e}")
        return None
