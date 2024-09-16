// src/components/common/VideoPlayer.jsx
import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Styled Components
const VideoPlayerContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  text-align: center;
`;

const Video = styled.video`
  width: 100%;
  max-width: 800px;
  border-radius: 5px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;

  button {
    margin: 0 10px;
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
`;

const CloseButton = styled.button`
  margin-top: 15px;
  background-color: ${({ theme }) => theme.colors.error};
  border: none;
  color: white;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

// VideoPlayer Component
function VideoPlayer({ 
  fileUrl, 
  fileName, 
  fileType, 
  fileSize, 
  duration = '', // Default value
  onClose 
}) {
  const videoRef = useRef(null);

  const handleError = (e) => {
    console.error('Video playback error:', e);
    onClose(); // Close the media player on error
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) { /* Safari */
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) { /* IE11 */
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <VideoPlayerContainer>
      <h3>Now Playing: {fileName}</h3>
      {fileSize && (
        <p>File Size: {(fileSize / (1024 * 1024)).toFixed(2)} MB</p>
      )}
      {duration && <p>Duration: {duration}</p>}

      <Video
        ref={videoRef}
        src={fileUrl}
        controls
        onError={handleError}
        aria-label={`Video player for ${fileName}`}
      >
        Your browser does not support the video tag.
      </Video>

      <Controls>
        <button onClick={handleFullscreen}>Fullscreen</button>
      </Controls>

      <CloseButton onClick={onClose}>Close</CloseButton>
    </VideoPlayerContainer>
  );
}

VideoPlayer.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  duration: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default VideoPlayer;
