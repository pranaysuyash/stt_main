// src/components/pages/Upload.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import FileUploader from '../common/FileUploader';
import Notification from '../common/Notification';

const UploadContainer = styled.div`
  padding: 20px;
`;

function Upload() {
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  return (
    <UploadContainer>
      <h1>Upload Files</h1>
      {notification.message && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification({ message: '', type: 'success' })} 
        />
      )}
      <FileUploader 
        setUploadedFiles={setUploadedFiles} 
        setNotification={setNotification} 
      />
      {}
      {uploadedFiles.length > 0 && (
        <div>
          <h2>Uploaded Files:</h2>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file.filename}</li>
            ))}
          </ul>
        </div>
      )}
    </UploadContainer>
  );
}

export default Upload;
