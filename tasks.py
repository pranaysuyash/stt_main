# # # # # tasks.py

# # # # from celery_app import celery
# # # # import os
# # # # import logging
# # # # from audio_processing import extract_audio_from_video, generate_waveform

# # # # # Configure logging
# # # # logging.basicConfig(level=logging.INFO)
# # # # logger = logging.getLogger(__name__)

# # # # @celery.task(bind=True, name='tasks.process_uploaded_file')
# # # # def process_uploaded_file(self, file_path, filename):
# # # #     """
# # # #     Celery task to process the uploaded file.
# # # #     Steps:
# # # #     1. Extract audio if it's a video.
# # # #     2. Generate waveform.
# # # #     """
# # # #     try:
# # # #         # Access Celery's configuration for the upload folder
# # # #         upload_folder = celery.conf.get('UPLOAD_FOLDER', 'static/uploads')
        
# # # #         logger.info(f"Starting processing for file: {filename}")

# # # #         # Determine if the file is a video
# # # #         if filename.lower().endswith(('.mp4', '.avi', '.mov', '.mkv')):
# # # #             base_name = os.path.splitext(filename)[0]
# # # #             audio_output_path = os.path.join(upload_folder, f"{base_name}_audio.wav")
# # # #             waveform_image_path = os.path.join(upload_folder, f"{base_name}_waveform.png")
            
# # # #             # Extract audio
# # # #             extracted_audio = extract_audio_from_video(file_path, audio_output_path)
# # # #             if not extracted_audio:
# # # #                 logger.error(f"Audio extraction failed for file: {filename}")
# # # #                 return {'status': 'failed', 'message': 'Audio extraction failed.'}

# # # #             # Generate waveform
# # # #             generated_waveform = generate_waveform(extracted_audio, waveform_image_path)
# # # #             if not generated_waveform:
# # # #                 logger.error(f"Waveform generation failed for file: {filename}")
# # # #                 return {'status': 'failed', 'message': 'Waveform generation failed.'}
            
# # # #             logger.info(f"Processing completed for file: {filename}")

# # # #         else:
# # # #             # For audio files, directly generate waveform
# # # #             base_name = os.path.splitext(filename)[0]
# # # #             waveform_image_path = os.path.join(upload_folder, f"{base_name}_waveform.png")
            
# # # #             # Generate waveform directly from audio
# # # #             generated_waveform = generate_waveform(file_path, waveform_image_path)
# # # #             if not generated_waveform:
# # # #                 logger.error(f"Waveform generation failed for file: {filename}")
# # # #                 return {'status': 'failed', 'message': 'Waveform generation failed.'}
            
# # # #             logger.info(f"Processing completed for file: {filename}")

# # # #         return {'status': 'success', 'message': 'File processed successfully.'}
    
# # # #     except Exception as e:
# # # #         logger.exception(f"Unexpected error processing file {filename}: {e}")
# # # #         raise  # Let Celery handle the exception

# # # # tasks.py

# # # from celery_app import celery
# # # import os
# # # import logging
# # # from audio_processing import extract_audio_from_video, generate_waveform
# # # from flask_mail import Message
# # # from extensions import mail
# # # from flask import current_app

# # # # Configure logging
# # # logger = logging.getLogger(__name__)
# # # logger.setLevel(logging.INFO)

# # # @celery.task(bind=True, name='tasks.send_email_task', max_retries=3, default_retry_delay=60)
# # # def send_email_task(self, subject, recipients, html):
# # #     """
# # #     Celery task to send emails asynchronously.
# # #     Retries up to 3 times with a 60-second delay if sending fails.
# # #     """
# # #     try:
# # #         with celery.app.app_context():
# # #             msg = Message(subject=subject, recipients=recipients, html=html)
# # #             mail.send(msg)
# # #             logger.info(f"Email sent to {recipients} with subject '{subject}'")
# # #     except Exception as e:
# # #         logger.error(f"Failed to send email to {recipients}: {str(e)}")
# # #         raise self.retry(exc=e)


# # # @celery.task(bind=True, name='tasks.process_uploaded_file', max_retries=3, default_retry_delay=60)
# # # def process_uploaded_file(self, file_path, filename):
# # #     """
# # #     Celery task to process the uploaded file.
# # #     Steps:
# # #     1. Extract audio if it's a video.
# # #     2. Generate waveform.
# # #     """
# # #     try:
# # #         # Access Celery's configuration for the upload folder
# # #         upload_folder = celery.conf.get('UPLOAD_FOLDER', 'static/uploads')
        
# # #         logger.info(f"Starting processing for file: {filename}")

# # #         # Determine if the file is a video
# # #         if filename.lower().endswith(('.mp4', '.avi', '.mov', '.mkv')):
# # #             base_name = os.path.splitext(filename)[0]
# # #             audio_output_path = os.path.join(upload_folder, f"{base_name}_audio.wav")
# # #             waveform_image_path = os.path.join(upload_folder, f"{base_name}_waveform.png")
            
# # #             # Extract audio
# # #             extracted_audio = extract_audio_from_video(file_path, audio_output_path)
# # #             if not extracted_audio:
# # #                 logger.error(f"Audio extraction failed for file: {filename}")
# # #                 return {'status': 'failed', 'message': 'Audio extraction failed.'}

# # #             # Generate waveform
# # #             generated_waveform = generate_waveform(extracted_audio, waveform_image_path)
# # #             if not generated_waveform:
# # #                 logger.error(f"Waveform generation failed for file: {filename}")
# # #                 return {'status': 'failed', 'message': 'Waveform generation failed.'}
            
# # #             logger.info(f"Processing completed for video file: {filename}")

# # #         else:
# # #             # For audio files, directly generate waveform
# # #             base_name = os.path.splitext(filename)[0]
# # #             waveform_image_path = os.path.join(upload_folder, f"{base_name}_waveform.png")
            
# # #             # Generate waveform directly from audio
# # #             generated_waveform = generate_waveform(file_path, waveform_image_path)
# # #             if not generated_waveform:
# # #                 logger.error(f"Waveform generation failed for file: {filename}")
# # #                 return {'status': 'failed', 'message': 'Waveform generation failed.'}
            
# # #             logger.info(f"Processing completed for audio file: {filename}")

# # #         return {'status': 'success', 'message': 'File processed successfully.'}
    
# # #     except Exception as e:
# # #         logger.exception(f"Unexpected error processing file {filename}: {e}")
# # #         raise self.retry(exc=e)

# # # tasks.py

# # from celery_app import celery
# # import os
# # import logging
# # from audio_processing import extract_audio_from_video, generate_waveform
# # from flask_mail import Message
# # from extensions import mail
# # from flask import current_app

# # # Configure logging
# # logger = logging.getLogger(__name__)
# # logger.setLevel(logging.INFO)

# # @celery.task(bind=True, name='tasks.send_email_task', max_retries=3, default_retry_delay=60)
# # def send_email_task(self, subject, recipients, html):
# #     """
# #     Celery task to send emails asynchronously.
# #     Retries up to 3 times with a 60-second delay if sending fails.
# #     """
# #     try:
# #         with celery.app.app_context():
# #             msg = Message(subject=subject, recipients=recipients, html=html)
# #             mail.send(msg)
# #             logger.info(f"Email sent to {recipients} with subject '{subject}'")
# #     except Exception as e:
# #         logger.error(f"Failed to send email to {recipients}: {str(e)}")
# #         raise self.retry(exc=e)


# # @celery.task(bind=True, name='tasks.process_uploaded_file', max_retries=3, default_retry_delay=60)
# # def process_uploaded_file(self, file_path, filename):
# #     """
# #     Celery task to process the uploaded file.
# #     Steps:
# #     1. Extract audio if it's a video.
# #     2. Generate waveform.
# #     """
# #     try:
# #         # Access Celery's configuration for the upload folder
# #         upload_folder = celery.conf.get('UPLOAD_FOLDER', 'static/uploads')
        
# #         logger.info(f"Starting processing for file: {filename}")

# #         # Determine if the file is a video
# #         if filename.lower().endswith(('.mp4', '.avi', '.mov', '.mkv')):
# #             base_name = os.path.splitext(filename)[0]
# #             audio_output_path = os.path.join(upload_folder, f"{base_name}_audio.wav")
# #             waveform_image_path = os.path.join(upload_folder, f"{base_name}_waveform.png")
            
# #             # Extract audio
# #             extracted_audio = extract_audio_from_video(file_path, audio_output_path)
# #             if not extracted_audio:
# #                 logger.error(f"Audio extraction failed for file: {filename}")
# #                 return {'status': 'failed', 'message': 'Audio extraction failed.'}

# #             # Generate waveform
# #             generated_waveform = generate_waveform(extracted_audio, waveform_image_path)
# #             if not generated_waveform:
# #                 logger.error(f"Waveform generation failed for file: {filename}")
# #                 return {'status': 'failed', 'message': 'Waveform generation failed.'}
            
# #             logger.info(f"Processing completed for video file: {filename}")

# #         else:
# #             # For audio files, directly generate waveform
# #             base_name = os.path.splitext(filename)[0]
# #             waveform_image_path = os.path.join(upload_folder, f"{base_name}_waveform.png")
            
# #             # Generate waveform directly from audio
# #             generated_waveform = generate_waveform(file_path, waveform_image_path)
# #             if not generated_waveform:
# #                 logger.error(f"Waveform generation failed for file: {filename}")
# #                 return {'status': 'failed', 'message': 'Waveform generation failed.'}
            
# #             logger.info(f"Processing completed for audio file: {filename}")

# #         return {'status': 'success', 'message': 'File processed successfully.'}
    
# #     except Exception as e:
# #         logger.exception(f"Unexpected error processing file {filename}: {e}")
# #         raise self.retry(exc=e)

# # tasks.py

# from celery_app import celery
# import os
# import logging
# from audio_processing import extract_audio_from_video, generate_waveform
# from flask_mail import Message
# from extensions import mail
# from flask import current_app

# # Configure logging
# logger = logging.getLogger(__name__)
# logger.setLevel(logging.INFO)

# @celery.task(bind=True, name='tasks.send_email_task', max_retries=3, default_retry_delay=60)
# def send_email_task(self, subject, recipients, html):
#     """
#     Celery task to send emails asynchronously.
#     Retries up to 3 times with a 60-second delay if sending fails.
#     """
#     try:
#         with celery.app.app_context():
#             msg = Message(subject=subject, recipients=recipients, html=html)
#             mail.send(msg)
#             logger.info(f"Email sent to {recipients} with subject '{subject}'")
#     except Exception as e:
#         logger.error(f"Failed to send email to {recipients}: {str(e)}")
#         raise self.retry(exc=e)


# @celery.task(bind=True, name='tasks.process_uploaded_file', max_retries=3, default_retry_delay=60)
# def process_uploaded_file(self, file_path, filename):
#     """
#     Celery task to process the uploaded file.
#     Steps:
#     1. Extract audio if it's a video.
#     2. Generate waveform.
#     """
#     try:
#         # Access Celery's configuration for the upload folder
#         upload_folder = celery.conf.get('UPLOAD_FOLDER', 'static/uploads')
        
#         logger.info(f"Starting processing for file: {filename}")

#         # Determine if the file is a video
#         if filename.lower().endswith(('.mp4', '.avi', '.mov', '.mkv')):
#             base_name = os.path.splitext(filename)[0]
#             audio_output_path = os.path.join(upload_folder, f"{base_name}_audio.wav")
#             waveform_image_path = os.path.join(upload_folder, f"{base_name}_waveform.png")
            
#             # Extract audio
#             extracted_audio = extract_audio_from_video(file_path, audio_output_path)
#             if not extracted_audio:
#                 logger.error(f"Audio extraction failed for file: {filename}")
#                 return {'status': 'failed', 'message': 'Audio extraction failed.'}

#             # Generate waveform
#             generated_waveform = generate_waveform(extracted_audio, waveform_image_path)
#             if not generated_waveform:
#                 logger.error(f"Waveform generation failed for file: {filename}")
#                 return {'status': 'failed', 'message': 'Waveform generation failed.'}
            
#             logger.info(f"Processing completed for video file: {filename}")

#         else:
#             # For audio files, directly generate waveform
#             base_name = os.path.splitext(filename)[0]
#             waveform_image_path = os.path.join(upload_folder, f"{base_name}_waveform.png")
            
#             # Generate waveform directly from audio
#             generated_waveform = generate_waveform(file_path, waveform_image_path)
#             if not generated_waveform:
#                 logger.error(f"Waveform generation failed for file: {filename}")
#                 return {'status': 'failed', 'message': 'Waveform generation failed.'}
            
#             logger.info(f"Processing completed for audio file: {filename}")

#         return {'status': 'success', 'message': 'File processed successfully.'}
    
#     except Exception as e:
#         logger.exception(f"Unexpected error processing file {filename}: {e}")
#         raise self.retry(exc=e)

from celery_app import celery
import logging
from flask_mail import Message
from extensions import mail
from audio_processing import extract_audio_from_video, generate_waveform
import os

# Configure logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

@celery.task(bind=True, name='tasks.send_email_task', max_retries=3, default_retry_delay=60)
def send_email_task(self, subject, recipients, html):
    """
    Celery task to send emails asynchronously.
    Retries up to 3 times with a 60-second delay if sending fails.
    """
    try:
        msg = Message(subject=subject, recipients=recipients, html=html)
        mail.send(msg)
        logger.info(f"Email sent to {recipients} with subject '{subject}'")
    except Exception as e:
        logger.error(f"Failed to send email to {recipients}: {str(e)}")
        raise self.retry(exc=e)


@celery.task(bind=True, name='tasks.process_uploaded_file', max_retries=3, default_retry_delay=60)
def process_uploaded_file(self, file_path, filename):
    """
    Celery task to process the uploaded file.
    Steps:
    1. Extract audio if it's a video.
    2. Generate waveform.
    """
    try:
        # Access Celery's configuration for the upload folder
        upload_folder = celery.conf.get('UPLOAD_FOLDER', 'static/uploads')
        
        logger.info(f"Starting processing for file: {filename}")

        # Determine if the file is a video
        if filename.lower().endswith(('.mp4', '.avi', '.mov', '.mkv')):
            base_name = os.path.splitext(filename)[0]
            audio_output_path = os.path.join(upload_folder, f"{base_name}_audio.wav")
            waveform_image_path = os.path.join(upload_folder, f"{base_name}_waveform.png")
            
            # Extract audio
            extracted_audio = extract_audio_from_video(file_path, audio_output_path)
            if not extracted_audio:
                logger.error(f"Audio extraction failed for file: {filename}")
                return {'status': 'failed', 'message': 'Audio extraction failed.'}

            # Generate waveform
            generated_waveform = generate_waveform(extracted_audio, waveform_image_path)
            if not generated_waveform:
                logger.error(f"Waveform generation failed for file: {filename}")
                return {'status': 'failed', 'message': 'Waveform generation failed.'}
            
            logger.info(f"Processing completed for video file: {filename}")

        else:
            # For audio files, directly generate waveform
            base_name = os.path.splitext(filename)[0]
            waveform_image_path = os.path.join(upload_folder, f"{base_name}_waveform.png")
            
            # Generate waveform directly from audio
            generated_waveform = generate_waveform(file_path, waveform_image_path)
            if not generated_waveform:
                logger.error(f"Waveform generation failed for file: {filename}")
                return {'status': 'failed', 'message': 'Waveform generation failed.'}
            
            logger.info(f"Processing completed for audio file: {filename}")

        return {'status': 'success', 'message': 'File processed successfully.'}
    
    except Exception as e:
        logger.exception(f"Unexpected error processing file {filename}: {e}")
        raise self.retry(exc=e)
