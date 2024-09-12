from flask import Flask, render_template, request, jsonify
import os
import logging
from werkzeug.utils import secure_filename

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)

# Ensure the uploads directory exists
UPLOAD_FOLDER = 'static/uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 200 * 1024 * 1024  # 200MB max file size

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    app.logger.info('Upload request received')
    app.logger.info(f'Request Content-Length: {request.content_length}')
    app.logger.info(f'MAX_CONTENT_LENGTH: {app.config["MAX_CONTENT_LENGTH"]}')
    
    if 'file' not in request.files:
        app.logger.error('No file part in the request')
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    app.logger.info(f'Received file: {file.filename}, Size: {file.content_length}')
    
    if file.filename == '':
        app.logger.error('No selected file')
        return jsonify({'error': 'No selected file'}), 400
    
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        app.logger.info(f'Saving file to: {file_path}')
        try:
            file.save(file_path)
            file_size = os.path.getsize(file_path)
            app.logger.info(f'File saved successfully. Size on disk: {file_size} bytes')
            return jsonify({'filename': filename, 'path': f'/static/uploads/{filename}'})
        except Exception as e:
            app.logger.error(f'Error saving file: {str(e)}')
            return jsonify({'error': 'Failed to save file'}), 500
    
    app.logger.error('Unexpected error occurred')
    return jsonify({'error': 'Unexpected error'}), 500

@app.route('/file_history', methods=['GET'])
def file_history():
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    file_list = [{'filename': f, 'path': f'/static/uploads/{f}'} for f in files]
    return jsonify(file_list)

@app.errorhandler(413)
def request_entity_too_large(error):
    app.logger.error('File too large')
    return jsonify({
        'error': 'File too large',
        'max_size': '200MB',
        'message': 'Please try compressing your file or splitting it into smaller parts before uploading.'
    }), 413

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555, debug=True)
