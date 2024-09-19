// src/components/common/FileDashboard.jsx

import React, { useState, useRef } from 'react';
import MediaPlayer from './MediaPlayer';
import ImageViewer from './ImageViewer'; // Import ImageViewer
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faBackward, faTimes } from '@fortawesome/free-solid-svg-icons';
import Tooltip from './Tooltip'; 

const DashboardContainer = styled.div`
  margin-top: 30px;
`;

const FileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  @media (max-width: 1199px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const FileCard = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral};
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 150px; 
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
  p {
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem; 
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media (max-width: 767px) {
    padding: 15px;
    height: auto;
    p {
      font-size: 0.875rem; 
    }
  }
`;

function FileDashboard({ uploadedFiles }) {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentMediaType, setCurrentMediaType] = useState(null); // Track media type
  const triggerRef = useRef(null);

  const selectFile = (index, event) => {
    triggerRef.current = event.currentTarget;
    const file = uploadedFiles[index];
    const mimeType = file.type;
    if (mimeType.startsWith('audio/') || mimeType.startsWith('video/')) {
      setCurrentMediaType('media');
      setCurrentIndex(index);
    } else if (mimeType.startsWith('image/')) {
      setCurrentMediaType('image');
      setCurrentIndex(index);
    } else {
      console.error('Unsupported media type:', mimeType);
      // Optionally, show a notification to the user
    }
  };

  const closeViewer = () => {
    setCurrentIndex(null);
    setCurrentMediaType(null);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  const handleNextTrack = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === null) return 0;
      return (prevIndex + 1) % uploadedFiles.length;
    });
  };

  const handlePrevTrack = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === null) return uploadedFiles.length - 1;
      return (prevIndex - 1 + uploadedFiles.length) % uploadedFiles.length;
    });
  };

  return (
    <DashboardContainer>
      <h2>Uploaded Files</h2>
      <FileGrid>
        {uploadedFiles.length > 0 ? (
          uploadedFiles.map((file, index) => (
            <FileCard 
              key={index} 
              onClick={(e) => selectFile(index, e)} 
              tabIndex="0" 
              onKeyPress={(e) => {
                if (e.key === 'Enter') selectFile(index, e);
              }}
              aria-label={`Play or view ${file.filename}`}
            >
              <Tooltip $text={file.filename}>
                <p>{file.filename}</p>
              </Tooltip>
              <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </FileCard>
          ))
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </FileGrid>
      {currentIndex !== null && currentMediaType === 'media' && (
        <MediaPlayer
          fileUrl={
            uploadedFiles[currentIndex].path.startsWith('/static/uploads') 
              ? `${window.location.origin}${uploadedFiles[currentIndex].path}` 
              : uploadedFiles[currentIndex].path
          }
          fileName={uploadedFiles[currentIndex].filename}
          fileType={uploadedFiles[currentIndex].type}
          fileSize={uploadedFiles[currentIndex].size}
          duration={uploadedFiles[currentIndex].duration}
          onClose={closeViewer}
          onNextTrack={handleNextTrack}
          onPrevTrack={handlePrevTrack}
        />
      )}
      {currentIndex !== null && currentMediaType === 'image' && (
        <ImageViewer
          fileUrl={
            uploadedFiles[currentIndex].path.startsWith('/static/uploads') 
              ? `${window.location.origin}${uploadedFiles[currentIndex].path}` 
              : uploadedFiles[currentIndex].path
          }
          fileName={uploadedFiles[currentIndex].filename}
          onClose={closeViewer}
        />
      )}
    </DashboardContainer>
  );
}

FileDashboard.propTypes = {
  uploadedFiles: PropTypes.arrayOf(
    PropTypes.shape({
      filename: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      duration: PropTypes.string,
    })
  ).isRequired,
};

export default FileDashboard;
