// src/components/common/ImageViewer.jsx

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import FocusTrap from 'focus-trap-react';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #ccc;
  }

  &:focus {
    outline: 2px solid #3498db;
    outline-offset: 2px;
  }
`;

const ZoomControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;

  button {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #3498db;
    }

    &:focus {
      outline: 2px solid #3498db;
      outline-offset: 2px;
    }
  }
`;

const ImageStyled = styled.img`
  max-width: 100%;
  max-height: 80vh;
  transform: scale(${({ zoom }) => zoom});
  transition: transform 0.3s ease;
`;

function ImageViewer({ fileUrl, fileName, onClose }) {
  const [zoom, setZoom] = React.useState(1);
  const imageRef = useRef(null);

  const zoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.2, 3));
  };

  const zoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.2, 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === '+') {
        zoomIn();
      }
      if (e.key === '-') {
        zoomOut();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <ModalOverlay onClick={onClose} aria-modal="true" role="dialog">
      <FocusTrap>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose} aria-label="Close Image Viewer">
            <FontAwesomeIcon icon="times" />
          </CloseButton>
          <h3>{fileName}</h3>
          <ImageStyled src={fileUrl} alt={fileName} zoom={zoom} ref={imageRef} />
          <ZoomControls>
            <button onClick={zoomIn} aria-label="Zoom In">
              <FontAwesomeIcon icon="search-plus" />
            </button>
            <button onClick={zoomOut} aria-label="Zoom Out">
              <FontAwesomeIcon icon="search-minus" />
            </button>
          </ZoomControls>
        </ModalContent>
      </FocusTrap>
    </ModalOverlay>
  );
}

ImageViewer.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageViewer;
