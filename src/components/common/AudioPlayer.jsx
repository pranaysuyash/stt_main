
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop, faVolumeUp, faVolumeMute, faRedo, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import Metadata from './Metadata';
import TabView from './TabView';
import AdvancedWaveformVisualizer from './AdvancedWaveformVisualizer';


const AudioPlayerContainer = styled.div`
  margin: 20px auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

function AudioPlayer({
  fileUrl,
  fileName,
  fileType,
  fileId,
  fileSize,
  duration,
  metadata,
  isPlaying,
  setIsPlaying,
  volume,
  setVolume,
  speed,
  setSpeed,
  loop,
  setLoop
}) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.playbackRate = speed;
      audio.loop = loop;
    }
  }, [volume, speed, loop]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const stopAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const toggleLoop = () => {
    setLoop(!loop);
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
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const seekBackward = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(0, audio.currentTime - 10);
    }
  };

  const seekForward = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    }
  };

  const audioContent = (
    <>
      <audio 
        ref={audioRef}
        src={fileUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <ProgressBar value={currentTime} max={duration || 0} />
      <TimeDisplay>
        {formatTime(currentTime)} / {formatTime(parseFloat(duration) || 0)}
      </TimeDisplay>
      <Controls>
        <Button onClick={seekBackward} aria-label="Seek 10 seconds backward">
          <FontAwesomeIcon icon={faBackward} />
        </Button>
        <Button onClick={togglePlay}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button onClick={seekForward} aria-label="Seek 10 seconds forward">
          <FontAwesomeIcon icon={faForward} />
        </Button>
        <Button onClick={stopAudio}>
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
      </Controls>
    </>
  );

  const tabs = [
    {
      label: 'Basic Player',
      content: audioContent,
    },
    {
      label: 'Advanced Waveform',
      content: (
        <AdvancedWaveformVisualizer
          audioUrl={fileUrl}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          volume={volume}
          setVolume={setVolume}
          speed={speed}
          setSpeed={setSpeed}
          loop={loop}
          setLoop={setLoop}
        />
      ),
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
    <AudioPlayerContainer>
      <h3>{fileName}</h3>
      <p>File Type: {fileType}</p>
      <p>File Size: {(fileSize / (1024 * 1024)).toFixed(2)} MB</p>
      <TabView tabs={tabs} />
    </AudioPlayerContainer>
  );
}

AudioPlayer.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired,
  fileId: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  duration: PropTypes.string,
  metadata: PropTypes.object,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  setVolume: PropTypes.func.isRequired,
  speed: PropTypes.number.isRequired,
  setSpeed: PropTypes.func.isRequired,
  loop: PropTypes.bool.isRequired,
  setLoop: PropTypes.func.isRequired,
};

export default AudioPlayer;