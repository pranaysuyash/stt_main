import os
from app import app, db
from models import File
from mimetypes import guess_type
from datetime import datetime

UPLOAD_FOLDER = 'static/uploads'

def backfill_files():
    with app.app_context():  # Ensure Flask's application context is set
        # Loop through all files in the static/uploads directory
        for filename in os.listdir(UPLOAD_FOLDER):
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            
            if os.path.isfile(file_path):
                # Check if the file already exists in the database
                existing_file = File.query.filter_by(filename=filename).first()
                if not existing_file:
                    file_size = os.path.getsize(file_path)
                    file_type = guess_type(file_path)[0] or 'application/octet-stream'

                    # Create a new File entry
                    new_file = File(
                        filename=filename,
                        path=file_path,
                        size=file_size,
                        type=file_type,
                        duration='',  # Update if needed
                        uploaded_at=datetime.utcnow()
                    )

                    db.session.add(new_file)
                    try:
                        db.session.commit()
                        print(f"Backfilled file: {filename}")
                    except Exception as e:
                        db.session.rollback()
                        print(f"Error inserting {filename}: {e}")

if __name__ == "__main__":
    backfill_files()
