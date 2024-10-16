

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FileUploader from '../common/FileUploader';
import Notification from '../common/Notification';
import ViewerModal from '../common/ViewerModal';
import api from '../../utils/api';

const UploadContainer = styled.div`
  padding: 20px;
`;

const FileList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

const FileItem = styled.li`
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #eee;
  &:hover {
    background-color: #f5f5f5;
  }
`;

function Upload() {
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);

  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        const response = await api.get('/file_history');
        setUploadedFiles(response.data.files || []);
      } catch (error) {
        console.error('Error fetching file history:', error);
        setNotification({
          message: 'Failed to fetch uploaded files. Please try again.',
          type: 'error'
        });
      }
    };

    fetchUploadedFiles();
  }, []);

  const openViewerModal = (index) => {
    setSelectedFileIndex(index);
  };

  const closeViewerModal = () => {
    setSelectedFileIndex(null);
  };

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
      <h2>Uploaded Files</h2>
      <FileList>
        {uploadedFiles.map((file, index) => (
          <FileItem key={file.filename} onClick={() => openViewerModal(index)}>
            {file.filename}
          </FileItem>
        ))}
      </FileList>
      {selectedFileIndex !== null && (
        <ViewerModal
          uploadedFiles={uploadedFiles}
          initialIndex={selectedFileIndex}
          onClose={closeViewerModal}
        />
      )}
    </UploadContainer>
  );
}

export default Upload;