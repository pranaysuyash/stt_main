// src/components/common/MediaPlayer.jsx
import React, { useEffect, useRef, useState } from 'react';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faBackward, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPlay, faPause, faStop, faRedo, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import FocusTrap from 'focus-trap-react';

// Keyframes for fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styled Components for Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; /* Above other elements */
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 767px) {
    padding: 15px;
    width: 95%;
    max-width: 100%;
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

  @media (max-width: 767px) {
    top: 10px;
    right: 10px;
    font-size: 1.2rem;
  }
`;

const NavigationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  button {
    margin: 0 15px;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }

  @media (max-width: 767px) {
    button {
      padding: 6px 10px;
      margin: 0 10px;
    }
  }
`;

// MediaPlayer Component as Modal
function MediaPlayer({ 
  fileUrl, 
  fileName, 
  fileType, 
  fileSize, 
  duration = '', // Default value
  onClose, 
  onNextTrack, 
  onPrevTrack 
}) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, []);
  return (
    <ModalOverlay onClick={onClose} aria-modal="true" role="dialog">
      <FocusTrap>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseIcon icon={faTimes} onClick={onClose} aria-label="Close Media Player" ref={closeButtonRef} />
          {fileType && fileType.startsWith('audio/') ? (
            <AudioPlayer
              fileUrl={fileUrl}
              fileName={fileName}
              fileType={fileType}
              fileSize={fileSize}
              duration={duration}
              onClose={onClose}
            />
          ) : (
            <VideoPlayer
              fileUrl={fileUrl}
              fileName={fileName}
              fileType={fileType}
              fileSize={fileSize}
              duration={duration}
              onClose={onClose}
            />
          )}

          {/* Navigation Controls */}
          <NavigationControls>
            <button onClick={onPrevTrack} aria-label="Previous Track">
              <FontAwesomeIcon icon={faBackward} /> Previous
            </button>
            <button onClick={onNextTrack} aria-label="Next Track">
              Next <FontAwesomeIcon icon={faForward} />
            </button>
          </NavigationControls>
        </ModalContent>
      </FocusTrap>
    </ModalOverlay>
  );
}

MediaPlayer.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  duration: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onNextTrack: PropTypes.func.isRequired,
  onPrevTrack: PropTypes.func.isRequired,
};

export default MediaPlayer;
