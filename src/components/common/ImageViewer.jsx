// src/components/common/ImageViewer.jsx

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, 
  faSearchPlus, 
  faSearchMinus, 
  faForward, 
  faBackward
} from '@fortawesome/free-solid-svg-icons';
import Metadata from './Metadata';

const ViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  transform: scale(${props => props.zoom});
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }
`;

function ImageViewer({ fileUrl, fileName, fileId, metadata, fileType, onClose, goToNext, goToPrevious }) {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowRight':
        goToNext();
        break;
      case 'ArrowLeft':
        goToPrevious();
        break;
      case '+':
        handleZoomIn();
        break;
      case '-':
        handleZoomOut();
        break;
      case 'Escape':
        onClose();
        break;
      default:
        break;
    }
  }, [goToNext, goToPrevious, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <ViewerContainer>
      <h3>{fileName}</h3>
      <ImageContainer>
        <Image src={fileUrl} alt={fileName} zoom={zoom} />
      </ImageContainer>
      <Controls>
        <Button onClick={handleZoomOut} aria-label="Zoom Out">
          <FontAwesomeIcon icon={faSearchMinus} />
        </Button>
        <Button onClick={handleZoomIn} aria-label="Zoom In">
          <FontAwesomeIcon icon={faSearchPlus} />
        </Button>
        <Button onClick={goToPrevious} aria-label="Previous Image">
          <FontAwesomeIcon icon={faBackward} />
        </Button>
        <Button onClick={goToNext} aria-label="Next Image">
          <FontAwesomeIcon icon={faForward} />
        </Button>
        <Button onClick={onClose} aria-label="Close Image Viewer">
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </Controls>
      <Metadata 
        metadata={metadata} 
        fileId={fileId} 
        fileName={fileName} 
        fileUrl={fileUrl} 
        fileType={fileType} // Pass fileType here
      />
    </ViewerContainer>
  );
}

ImageViewer.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  fileId: PropTypes.string.isRequired,
  metadata: PropTypes.object,
  fileType: PropTypes.string.isRequired, // Add fileType to propTypes
  onClose: PropTypes.func.isRequired,
  goToNext: PropTypes.func.isRequired,
  goToPrevious: PropTypes.func.isRequired,
};

export default ImageViewer;
