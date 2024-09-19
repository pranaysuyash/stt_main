// src/components/common/AudioPlayer.jsx

import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faPause, 
  faStop, 
  faRedo, 
  faVolumeUp, 
  faVolumeMute 
} from '@fortawesome/free-solid-svg-icons';

const AudioPlayerContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  border-radius: 10px;
  outline: none; 
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

function AudioPlayer({
  fileUrl,
  fileName,
  fileType,
  fileSize,
  duration = '',
  onClose,
  isPlaying,
  togglePlayPause,
}) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [volume, setVolume] = React.useState(1);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const [loop, setLoop] = React.useState(false);
  const [error, setError] = React.useState('');

  useEffect(() => {
    if (waveformRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#D9DCFF',
        progressColor: '#4353FF',
        cursorColor: '#4353FF',
        responsive: true,
        height: 100,
        barWidth: 2,
        barRadius: 3,
        backend: 'WebAudio',
      });

      wavesurferRef.current.load(fileUrl);

      wavesurferRef.current.on('ready', () => {
        // Audio is ready to play
        if (isPlaying) {
          wavesurferRef.current.play();
        }
      });

      wavesurferRef.current.on('finish', () => {
        if (loop) {
          wavesurferRef.current.play();
        } else {
          togglePlayPause(); 
        }
      });

      wavesurferRef.current.on('error', (e) => {
        console.error('WaveSurfer error:', e);
        setError('Failed to play the audio. It might be corrupted or unsupported.');
        // Do not call onClose here to prevent unmounting during destroy
      });

      return () => {
        if (wavesurferRef.current) {
          try {
            wavesurferRef.current.destroy();
          } catch (err) {
            console.error('WaveSurfer destroy error:', err);
          }
        }
      };
    }
  }, [fileUrl, loop, onClose, togglePlayPause, isPlaying]);

  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(volume);
      wavesurferRef.current.setPlaybackRate(playbackRate);
      if (isPlaying) {
        wavesurferRef.current.play();
      } else {
        wavesurferRef.current.pause();
      }
    }
  }, [volume, playbackRate, isPlaying]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handlePlaybackRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setPlaybackRate(newRate);
  };

  const toggleLoop = () => {
    setLoop(!loop);
  };

  const stop = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.stop();
      togglePlayPause(); 
    }
  };

  const closePlayer = () => {
    onClose();
  };

  return (
    <AudioPlayerContainer tabIndex="-1" aria-label="Audio Player">      
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
      <div 
        id="waveform" 
        ref={waveformRef} 
        role="region"
        aria-label={`Waveform for ${fileName}`}
        tabIndex="0"
      >
      </div>
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
      <CloseButton onClick={closePlayer} aria-label="Close Audio Player">
        Close
      </CloseButton>
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
  isPlaying: PropTypes.bool.isRequired, 
  togglePlayPause: PropTypes.func.isRequired, 
};

export default AudioPlayer;
