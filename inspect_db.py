from app import app, db
from models import File

# Use the app context
with app.app_context():
    # Reflect the database schema
    db.reflect()

    # Retrieve the File table
    file_table = db.metadata.tables.get('files')

    if file_table is not None:
        print(f"Table 'files' structure:")
        for column in file_table.columns:
            print(f" - {column.name}: {column.type}")
    else:
        print("Table 'files' not found.")
