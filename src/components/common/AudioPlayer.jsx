// src/components/common/AudioPlayer.jsx
import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

  button, input[type="range"] {
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

  input[type="range"] {
    width: 100px;
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
  onClose 
}) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Volume range: 0 to 1
  const [playbackRate, setPlaybackRate] = useState(1); // Playback speed
  const isUnmounting = useRef(false); // Ref to track if component is unmounting

  useEffect(() => {
    // Initialize WaveSurfer
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

    // Load the audio file
    wavesurferRef.current.load(fileUrl);

    // Set initial volume and playback rate
    wavesurferRef.current.setVolume(volume);
    wavesurferRef.current.setPlaybackRate(playbackRate);

    // Event Handlers
    const handleReady = () => {
      console.log('WaveSurfer is ready');
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleFinish = () => {
      setIsPlaying(false);
    };

    const handleError = (error) => {
      console.error('WaveSurfer error:', error);
      if (!isUnmounting.current) { // Prevent calling onClose during unmount
        onClose(); // Close the media player on error
      }
    };

    // Attach Event Listeners
    wavesurferRef.current.on('ready', handleReady);
    wavesurferRef.current.on('play', handlePlay);
    wavesurferRef.current.on('pause', handlePause);
    wavesurferRef.current.on('finish', handleFinish);
    wavesurferRef.current.on('error', handleError);

    return () => {
      isUnmounting.current = true; // Indicate that component is unmounting
      if (wavesurferRef.current) {
        // Remove Event Listeners to prevent callbacks during destroy
        wavesurferRef.current.unAll(); // Removes all event listeners

        try {
          wavesurferRef.current.destroy();
        } catch (error) {
          console.error('Error destroying WaveSurfer:', error);
        }
        wavesurferRef.current = null;
      }
    };
  }, [fileUrl, onClose, playbackRate, volume]);

  const playPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  const stop = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.stop();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(newVolume);
    }
  };

  const handlePlaybackRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setPlaybackRate(newRate);
    if (wavesurferRef.current) {
      wavesurferRef.current.setPlaybackRate(newRate);
    }
  };

  return (
    <AudioPlayerContainer>
      <h3>Now Playing: {fileName}</h3>
      {fileSize && (
        <p>File Size: {(fileSize / (1024 * 1024)).toFixed(2)} MB</p>
      )}
      {duration && <p>Duration: {duration}</p>}

      <div id="waveform" ref={waveformRef}></div>
      <Controls>
        <button onClick={playPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={stop}>Stop</button>
        <label>
          Volume:
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
        <CloseButton onClick={onClose}>Close</CloseButton>
      </Controls>
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
