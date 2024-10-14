

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faStop,
  faVolumeUp,
  faVolumeMute,
  faExpand,
  faCompress,
  faRedo,
  faForward,
  faBackward,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import TabView from './TabView';
import Metadata from './Metadata';

const VideoPlayerContainer = styled.div`
  margin: 20px auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Video = styled.video`
  width: 100%;
  max-width: 800px;
  height: auto;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
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

const VolumeControl = styled.input`
  width: 100px;
  margin: 0 10px;
`;

const SpeedControl = styled.select`
  margin: 0 10px;
`;

const ProgressBar = styled.progress`
  width: 100%;
  height: 10px;
  margin-top: 10px;
`;

const TimeDisplay = styled.div`
  font-size: 14px;
  margin-top: 5px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 10px;
`;

// const NavigationControls = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-top: 20px;
// `;

function VideoPlayer({
  fileUrl,
  fileName,
  fileType,
  fileId,
  fileSize,
  duration,
  metadata,
  isPlaying,
  togglePlayPause,
  volume,
  setVolume,
  speed,
  setSpeed,
  loop,
  setLoop,
  onNext,
  onPrevious
}) {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState('');
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.volume = volume;
      video.playbackRate = speed;
      video.loop = loop;
    }
  }, [volume, speed, loop]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && videoLoaded) {
      const playVideo = async () => {
        try {
          if (isPlaying) {
            await video.play();
          } else {
            video.pause();
          }
        } catch (e) {
          console.error('Video play error:', e);
          setError('Failed to play the video. It might be unsupported or corrupted.');
        }
      };

      playVideo();
    }
  }, [isPlaying, videoLoaded]);

  const stopVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      togglePlayPause(false);
    }
  };

  const toggleLoop = () => {
    setLoop(!loop);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      if (!document.fullscreenElement) {
        video.requestFullscreen().then(() => {
          setIsFullscreen(true);
        }).catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(1);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleSpeedChange = (e) => {
    setSpeed(parseFloat(e.target.value));
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const seekBackward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.max(0, video.currentTime - 10);
    }
  };

  const seekForward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.min(video.duration, video.currentTime + 10);
    }
  };

  const handleVideoError = (e) => {
    console.error('Video error:', e);
    setError('Failed to load the video. It might be unsupported or corrupted.');
  };

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    setError('');
  };

  const videoContent = (
    <>
      {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
      <Video
        ref={videoRef}
        src={fileUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => togglePlayPause(false)}
        onError={handleVideoError}
        onLoadedMetadata={handleVideoLoaded}
      >
        Your browser does not support the video tag.
      </Video>
      <ProgressBar value={currentTime} max={duration || 0} />
      <TimeDisplay>
        {formatTime(currentTime)} / {formatTime(parseFloat(duration) || 0)}
      </TimeDisplay>
      <Controls>
        <Button onClick={seekBackward} aria-label="Seek 10 seconds backward">
          <FontAwesomeIcon icon={faBackward} />
        </Button>
        <Button onClick={() => togglePlayPause(!isPlaying)} disabled={!videoLoaded}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button onClick={seekForward} aria-label="Seek 10 seconds forward">
          <FontAwesomeIcon icon={faForward} />
        </Button>
        <Button onClick={stopVideo}>
          <FontAwesomeIcon icon={faStop} />
          Stop
        </Button>
        <Button onClick={toggleLoop}>
          <FontAwesomeIcon icon={faRedo} />
          {loop ? 'Looping' : 'Loop'}
        </Button>
        <Button onClick={toggleMute}>
          <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
        </Button>
        <VolumeControl
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          aria-label="Volume Control"
        />
        <SpeedControl value={speed} onChange={handleSpeedChange} aria-label="Playback Speed">
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </SpeedControl>
        <Button onClick={toggleFullscreen}>
          <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </Button>
      </Controls>
    </>
  );

  const tabs = [
    {
      label: 'Video',
      content: videoContent,
    },
    {
      label: 'Metadata',
      content: (
        <Metadata
          metadata={metadata}
          fileId={fileId}
          fileName={fileName}
          fileUrl={fileUrl}
          fileType={fileType}
        />
      ),
    },
  ];

  return (
    <VideoPlayerContainer>
      <h3>{fileName}</h3>
      <p>File Type: {fileType}</p>
      <p>File Size: {(fileSize / (1024 * 1024)).toFixed(2)} MB</p>
      <TabView tabs={tabs} />
      {/* <NavigationControls>
        <Button onClick={onPrevious}>
          <FontAwesomeIcon icon={faChevronLeft} /> Previous
        </Button>
        <Button onClick={onNext}>
          Next <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </NavigationControls> */}
    </VideoPlayerContainer>
  );
}

VideoPlayer.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired,
  fileId: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  duration: PropTypes.string,
  metadata: PropTypes.object,
  isPlaying: PropTypes.bool.isRequired,
  togglePlayPause: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  setVolume: PropTypes.func.isRequired,
  speed: PropTypes.number.isRequired,
  setSpeed: PropTypes.func.isRequired,
  loop: PropTypes.bool.isRequired,
  setLoop: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};

export default VideoPlayer;