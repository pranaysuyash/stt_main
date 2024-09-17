// src/components/common/AudioPlayer.jsx
import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop, faRedo, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

// Styled Components
const AudioPlayerContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  border-radius: 10px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;

  button {
    margin: 0 10px;
    padding: 10px;
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

  input[type="range"] {
    width: 100px;
    margin: 0 10px;
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

// AudioPlayer Component
function AudioPlayer({
  fileUrl,
  fileName,
  fileType,
  fileSize,
  duration = '', // Default value
  onClose,
}) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loop, setLoop] = useState(false);
  const loopRef = useRef(loop); // Ref to keep track of loop state

  // Update loopRef whenever loop state changes
  useEffect(() => {
    loopRef.current = loop;
  }, [loop]);

  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#D9DCFF',
      progressColor: '#4353FF',
      cursorColor: '#4353FF',
      responsive: true,
      height: 100,
      cursorWidth: 2,
      barWidth: 2,
    });

    wavesurferRef.current.load(fileUrl);
    wavesurferRef.current.setVolume(volume);
    wavesurferRef.current.setPlaybackRate(playbackRate);

    wavesurferRef.current.on('play', () => setIsPlaying(true));
    wavesurferRef.current.on('pause', () => setIsPlaying(false));
    wavesurferRef.current.on('finish', () => {
      setIsPlaying(false);
      if (loopRef.current) {
        wavesurferRef.current.play();
      }
    });

    return () => {
      wavesurferRef.current.destroy();
    };
  }, [fileUrl]);

  const playPause = () => {
    wavesurferRef.current.playPause();
  };

  const stop = () => {
    wavesurferRef.current.stop();
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    wavesurferRef.current.setVolume(newVolume);
  };

  const handlePlaybackRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setPlaybackRate(newRate);
    wavesurferRef.current.setPlaybackRate(newRate);
  };

  const toggleLoop = () => {
    setLoop(!loop);
  };

  return (
    <AudioPlayerContainer>
      <h3>Now Playing: {fileName}</h3>
      {fileSize && <p>File Size: {(fileSize / (1024 * 1024)).toFixed(2)} MB</p>}
      {duration && <p>Duration: {duration}</p>}

      <div id="waveform" ref={waveformRef}></div>
      <Controls>
        <button onClick={playPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button onClick={stop} aria-label="Stop">
          <FontAwesomeIcon icon={faStop} />
        </button>
        <button onClick={toggleLoop} aria-label={loop ? 'Disable Loop' : 'Enable Loop'} style={{ backgroundColor: loop ? '#e74c3c' : '' }}>
          <FontAwesomeIcon icon={faRedo} />
        </button>
        <label>
          <FontAwesomeIcon icon={volume > 0 ? faVolumeUp : faVolumeMute} />
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
      <CloseButton onClick={onClose} aria-label="Close Audio Player">Close</CloseButton>
    </AudioPlayerContainer>
  );
}

AudioPlayer.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  duration: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default AudioPlayer;
