from moviepy.editor import VideoFileClip
import matplotlib.pyplot as plt
from pydub import AudioSegment
import numpy as np

plt.switch_backend('Agg')

# Function to extract audio from a video file
def extract_audio_from_video(video_path, output_audio_path):
    """
    Extracts the audio track from a video file and saves it as a separate audio file.

    Args:
    - video_path: Path to the video file.
    - output_audio_path: Path where the extracted audio file will be saved.

    Returns:
    - Path to the extracted audio file or None if the video has no audio.
    """
    video = VideoFileClip(video_path)

    # Check if the video has an audio track
    if video.audio is None:
        print("No audio track found in the video.")
        return None

    # If audio is present, write it to the specified file
    audio = video.audio
    audio.write_audiofile(output_audio_path)
    return output_audio_path

# Function to generate a waveform image from an audio file
def generate_waveform(audio_file, output_image_path):
    """
    Generates a waveform image from an audio file and saves it as an image.

    Args:
    - audio_file: Path to the audio file.
    - output_image_path: Path where the waveform image will be saved.

    Returns:
    - Path to the generated waveform image.
    """
    # Load the audio file using pydub
    audio = AudioSegment.from_file(audio_file)
    
    # Get the raw audio data as a numpy array
    data = np.array(audio.get_array_of_samples())
    
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

    return output_image_path
