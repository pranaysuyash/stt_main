// src/components/common/ViewerModal.jsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MediaPlayer from './MediaPlayer';
import ImageViewer from './ImageViewer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import FocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  animation: fadeIn 0.3s ease-out;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  border-radius: 10px;
  width: 95%;
  max-width: 900px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 15px;
    width: 100%;
    border-radius: 0;
    height: 100vh;
    max-height: 100vh;
  }
`;

const CloseIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.5rem;

  &:hover {
    color: #c0392b;
  }

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    font-size: 1.2rem;
  }
`;

const NavigationControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  width: 100%;

  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
    gap: 5px;

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }

    &:disabled {
      color: #7f8c8d;
      cursor: not-allowed;
    }
  }

  @media (max-width: 768px) {
    button {
      font-size: 1rem;
    }
  }
`;

function ViewerModal({ 
  uploadedFiles, 
  initialIndex, 
  mediaType,
  onClose 
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false); // Manage play state here

  const currentFile = uploadedFiles[currentIndex];

  const goToNext = () => {
    if (currentIndex < uploadedFiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(false); // Reset play state when navigating
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsPlaying(false); // Reset play state when navigating
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // Reset isPlaying when file changes
    setIsPlaying(false);
  }, [currentIndex]);

  const mimeType = currentFile.type;

  const renderViewer = () => {
    if (mediaType === 'audio' || mediaType === 'video') {
      return (
        <MediaPlayer
          key={currentFile.filename} // Force remount on file change
          fileUrl={
            currentFile.path.startsWith('/static/uploads') 
              ? `${window.location.origin}${currentFile.path}` 
              : currentFile.path
          }
          fileName={currentFile.filename}
          fileType={currentFile.type}
          fileSize={currentFile.size}
          duration={currentFile.duration}
          onClose={onClose}
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
        />
      );
    } else if (mediaType === 'image') {
      return (
        <ImageViewer
          key={currentFile.filename} // Force remount on file change
          fileUrl={
            currentFile.path.startsWith('/static/uploads') 
              ? `${window.location.origin}${currentFile.path}` 
              : currentFile.path
          }
          fileName={currentFile.filename}
          onClose={onClose}
        />
      );
    } else {
      return <div role="alert">Unsupported media type selected.</div>;
    }
  };

  return (
    <ModalOverlay onClick={onClose} aria-modal="true" role="dialog">
      <FocusTrap>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseIcon 
            icon="times" 
            onClick={onClose} 
            aria-label="Close Viewer"
          />
          {renderViewer()}
          <NavigationControls>
            <button 
              onClick={goToPrevious} 
              disabled={currentIndex === 0}
              aria-label="Previous File"
            >
              <FontAwesomeIcon icon="backward" />
              Previous
            </button>
            <button 
              onClick={goToNext} 
              disabled={currentIndex === uploadedFiles.length - 1}
              aria-label="Next File"
            >
              Next
              <FontAwesomeIcon icon="forward" />
            </button>
          </NavigationControls>
        </ModalContent>
      </FocusTrap>
    </ModalOverlay>
  );
}

ViewerModal.propTypes = {
  uploadedFiles: PropTypes.arrayOf(
    PropTypes.shape({
      filename: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      duration: PropTypes.string,
    })
  ).isRequired,
  initialIndex: PropTypes.number.isRequired,
  mediaType: PropTypes.oneOf(['audio', 'video', 'image']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ViewerModal;
