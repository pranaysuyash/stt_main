// src/components/common/AudioPlayer.jsx
import React, { useEffect, useRef, useReducer, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop, faRedo, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import debounce from 'lodash.debounce'; 

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
      outline: none;
    }
  }
  label {
    display: flex;
    align-items: center;
    margin: 0 10px;
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
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.errorHover || '#c0392b'};
    outline: none;
  }
`;

const initialState = {
  isPlaying: false,
  volume: 1,
  playbackRate: 1,
  loop: false,
  duration: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'PLAY_PAUSE':
      return { ...state, isPlaying: !state.isPlaying };
    case 'STOP':
      return { ...state, isPlaying: false };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'SET_PLAYBACK_RATE':
      return { ...state, playbackRate: action.payload };
    case 'TOGGLE_LOOP':
      return { ...state, loop: !state.loop };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    default:
      return state;
  }
}

function AudioPlayer({
  fileUrl,
  fileName,
  fileType,
  fileSize,
  duration = '',
  onClose,
  triggerRef, 
}) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isPlaying, volume, playbackRate, loop, duration: trackDuration } = state;
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const debouncedSetVolume = useCallback(
    debounce((newVolume) => {
      if (wavesurferRef.current) {
        wavesurferRef.current.setVolume(newVolume);
      }
    }, 300),
    []
  );

  const debouncedSetPlaybackRate = useCallback(
    debounce((newRate) => {
      if (wavesurferRef.current) {
        wavesurferRef.current.setPlaybackRate(newRate);
      }
    }, 300),
    []
  );

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
    wavesurferRef.current.on('ready', () => {
      const totalDuration = wavesurferRef.current.getDuration();
      const formattedDuration = new Date(totalDuration * 1000).toISOString().substr(14, 5);
      dispatch({ type: 'SET_DURATION', payload: formattedDuration });
    });
    wavesurferRef.current.on('play', () => dispatch({ type: 'PLAY_PAUSE' }));
    wavesurferRef.current.on('pause', () => dispatch({ type: 'PLAY_PAUSE' }));
    wavesurferRef.current.on('finish', () => {
      dispatch({ type: 'STOP' });
      if (stateRef.current.loop) {
        wavesurferRef.current.play();
      }
    });
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [fileUrl]);

  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(volume);
      wavesurferRef.current.setPlaybackRate(playbackRate);
    }
  }, [volume, playbackRate]);

  const playPause = () => {
    dispatch({ type: 'PLAY_PAUSE' });
    wavesurferRef.current?.playPause();
  };

  const stop = () => {
    dispatch({ type: 'STOP' });
    wavesurferRef.current?.stop();
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    dispatch({ type: 'SET_VOLUME', payload: newVolume });
    debouncedSetVolume(newVolume);
  };

  const handlePlaybackRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    dispatch({ type: 'SET_PLAYBACK_RATE', payload: newRate });
    debouncedSetPlaybackRate(newRate);
  };

  const toggleLoop = () => {
    dispatch({ type: 'TOGGLE_LOOP' });
  };

  const closePlayer = () => {
    onClose();
    if (triggerRef && triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  return (
    <AudioPlayerContainer tabIndex="-1" aria-label="Audio Player">      
      <h3>Now Playing: {fileName}</h3>
      {fileSize && (
        <p>File Size: {(fileSize / (1024 * 1024)).toFixed(2)} MB</p>
      )}
      {trackDuration && <p>Duration: {trackDuration}</p>}
      <div id="waveform" ref={waveformRef} role="region"
        aria-label={`Waveform for ${fileName}`}
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            playPause();          
          }
        }}
        style={{ position: 'relative' }}>
        {}
        <div
          tabIndex="-1"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></div>
      </div>
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
  triggerRef: PropTypes.object, 
};

export default AudioPlayer;
