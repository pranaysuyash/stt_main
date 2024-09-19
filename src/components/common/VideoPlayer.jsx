// src/components/common/VideoPlayer.jsx

import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faPause, 
  faStop, 
  faRedo, 
  faExpand, 
  faCompress, 
  faVolumeUp, 
  faVolumeMute 
} from '@fortawesome/free-solid-svg-icons';

const VideoPlayerContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  border-radius: 10px;
  outline: none; 
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
  flex-wrap: wrap;
  gap: 10px;

  button {
    margin: 5px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
    gap: 5px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }
  }

  label {
    display: flex;
    align-items: center;
    margin: 5px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
  }

  input[type="range"] {
    width: 100px;
    margin-left: 5px;
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

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.error};
    outline-offset: 2px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

function VideoPlayer({
  fileUrl,
  fileName,
  fileType,
  fileSize,
  duration = '', 
  onClose,
  isPlaying,
  togglePlayPause,
}) {
  const videoRef = useRef(null);
  const [loop, setLoop] = React.useState(false);
  const [volume, setVolume] = React.useState(1);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [error, setError] = React.useState('');

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.loop = loop;
      video.volume = volume;
      video.playbackRate = playbackRate;

      if (isPlaying) {
        video.play().catch((e) => {
          console.error('Video play error:', e);
          setError('Failed to play the video.');
          onClose();
        });
      } else {
        video.pause();
      }

      video.addEventListener('ended', () => {
        if (!loop) {
          togglePlayPause();
        }
      });

      video.addEventListener('error', (e) => {
        console.error('Video playback error:', e);
        setError('Failed to play the video. It might be corrupted or unsupported.');
        // Do not call onClose here to prevent unmounting during destroy
      });

      return () => {
        video.removeEventListener('ended', () => {});
        video.removeEventListener('error', () => {});
      };
    }
  }, [isPlaying, loop, volume, playbackRate, onClose, togglePlayPause]);

  const toggleLoop = () => {
    setLoop(!loop);
  };

  const stop = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      togglePlayPause(); 
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) { 
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) { 
        video.msRequestFullscreen();
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handlePlaybackRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setPlaybackRate(newRate);
  };

  const closePlayer = () => {
    onClose();
  };

  return (
    <VideoPlayerContainer tabIndex="-1" aria-label="Video Player">
      <h3>Now Playing: {fileName}</h3>
      {fileSize && (
        <p>File Size: {(fileSize / (1024 * 1024)).toFixed(2)} MB</p>
      )}
      {duration && <p>Duration: {duration}</p>}
      {error && (
        <ErrorMessage role="alert">
          {error}
        </ErrorMessage>
      )}
      <Video
        ref={videoRef}
        src={fileUrl}
        controls={true} // Enable standard HTML5 controls
        aria-label={`Video player for ${fileName}`}
      >
        Your browser does not support the video tag.
      </Video>
      <Controls>
        <button onClick={togglePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
          <FontAwesomeIcon icon={isPlaying ? 'pause' : 'play'} />
        </button>
        <button onClick={stop} aria-label="Stop">
          <FontAwesomeIcon icon="stop" />
        </button>
        <button 
          onClick={toggleLoop} 
          aria-label={loop ? 'Disable Loop' : 'Enable Loop'}
          className={loop ? 'loop-active' : ''}
        >
          {loop ? 'Looping' : 'Loop'}
        </button>
        <button onClick={toggleFullscreen} aria-label="Fullscreen">
          <FontAwesomeIcon icon="expand" /> {/* Use 'expand' instead of 'fullscreen' */}
        </button>
        <label>
          <FontAwesomeIcon icon={volume > 0 ? 'volume-up' : 'volume-mute'} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Volume Control"
          />
        </label>
        <label>
          Speed:
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={playbackRate}
            onChange={handlePlaybackRateChange}
            aria-label="Playback Speed Control"
          />
        </label>
      </Controls>
      <CloseButton onClick={closePlayer} aria-label="Close Video Player">
        Close
      </CloseButton>
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
  isPlaying: PropTypes.bool.isRequired, 
  togglePlayPause: PropTypes.func.isRequired, 
};

export default VideoPlayer;
