

// ViewerModal.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import MediaPlayer from './MediaPlayer';
import ImageViewer from './ImageViewer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import FocusTrap from 'focus-trap-react';
import PropTypes from 'prop-types';
import { isAudioFile, isVideoFile, isImageFile } from '../../utils/mediaUtils';

// Styled Components
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
`;

const ModalContent = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 30px 20px 20px 20px;
  border-radius: 10px;
  width: 95%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavigationControls = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const CloseIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.errorDark};
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  margin: 20px 0;
  text-align: center;
  font-size: 1rem;
`;

const NavigationButton = styled.button`
  background-color: ${({ theme, disabled }) => 
    disabled ? theme.colors.disabled : theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme, disabled }) => 
      !disabled && theme.colors.primaryDark};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;

function ViewerModal({ uploadedFiles, initialIndex, onClose }) {
  // Validate initialIndex
  const validInitialIndex = useMemo(() => {
    if (
      Array.isArray(uploadedFiles) &&
      uploadedFiles.length > 0 &&
      initialIndex >= 0 &&
      initialIndex < uploadedFiles.length
    ) {
      return initialIndex;
    }
    return 0;
  }, [uploadedFiles, initialIndex]);

  const [currentIndex, setCurrentIndex] = useState(validInitialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  const currentFile = useMemo(() => uploadedFiles[currentIndex], [uploadedFiles, currentIndex]);

  const mediaType = useMemo(() => {
    if (!currentFile) return 'unsupported';
    if (isAudioFile(currentFile.type)) return 'audio';
    if (isVideoFile(currentFile.type)) return 'video';
    if (isImageFile(currentFile.type)) return 'image';
    return 'unsupported';
  }, [currentFile]);

  useEffect(() => {
    if (!currentFile) {
      setError('File not found.');
    } else {
      setError(null);
      setIsPlaying(false);
    }
  }, [currentFile]);

  const goToNext = useCallback(() => {
    if (currentIndex < uploadedFiles.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  }, [currentIndex, uploadedFiles.length]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }, [currentIndex]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const renderMedia = () => {
    if (error) {
      return <ErrorMessage>{error}</ErrorMessage>;
    }

    if (!currentFile) {
      return <ErrorMessage>No file selected.</ErrorMessage>;
    }

    const commonProps = {
      key: currentFile.id,
      fileUrl: currentFile.path,
      fileName: currentFile.filename,
      fileId: currentFile.id.toString(),
      metadata: currentFile.meta_data || {},
      onClose,
    };

    switch (mediaType) {
      case 'video':
      case 'audio':
        return (
          <MediaPlayer
            {...commonProps}
            fileType={currentFile.type}
            fileSize={currentFile.size}
            duration={currentFile.duration}
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
          />
        );
      case 'image':
        return (
          <ImageViewer
            {...commonProps}
            fileType={currentFile.type}
            goToNext={goToNext}
            goToPrevious={goToPrevious}
          />
        );
      default:
        return <ErrorMessage>Unsupported media type.</ErrorMessage>;
    }
  };

  // Handle keyboard navigation for accessibility
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'Escape') {
        onClose();
      }
    },
    [goToNext, goToPrevious, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent rendering if no files are uploaded
  if (!Array.isArray(uploadedFiles) || uploadedFiles.length === 0) {
    return null;
  }

  return (
    <ModalOverlay onClick={onClose} aria-modal="true" role="dialog">
      <FocusTrap>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseIcon
            icon={faTimes}
            onClick={onClose}
            aria-label="Close Viewer"
          />
          {renderMedia()}
          <NavigationControls>
            <NavigationButton
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              aria-label="Previous File"
            >
              <FontAwesomeIcon icon={faBackward} />
              Previous
            </NavigationButton>
            <NavigationButton
              onClick={goToNext}
              disabled={currentIndex === uploadedFiles.length - 1}
              aria-label="Next File"
            >
              Next
              <FontAwesomeIcon icon={faForward} />
            </NavigationButton>
          </NavigationControls>
        </ModalContent>
      </FocusTrap>
    </ModalOverlay>
  );
}

ViewerModal.propTypes = {
  uploadedFiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      filename: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      meta_data: PropTypes.object,
    })
  ).isRequired,
  initialIndex: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

ViewerModal.defaultProps = {
  initialIndex: 0,
};

export default ViewerModal;
