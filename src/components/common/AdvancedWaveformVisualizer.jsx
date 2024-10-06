
import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Play, Pause, ZoomIn, ZoomOut, Scissors, Download, Volume2, VolumeX, RotateCcw, FastForward } from 'lucide-react';


const CanvasContainer = styled.div`
  margin: 20px auto;
  text-align: center;
  max-width: 800px;
  background-color: ${({ theme }) => theme.colors.background || '#fff'};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Controls = styled.div`
  // ... (keep the styled components as they are)
`;

const TimelineContainer = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  background-color: #f0f0f0;
  margin-top: 10px;
`;

const TimelineMarker = styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.position}%;
  width: 2px;
  height: 100%;
  background-color: red;
`;

const VolumeControl = styled.input`
  width: 100px;
  margin: 0 10px;
`;

const SpeedControl = styled.select`
  margin: 0 10px;
`;

const TimeDisplay = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

function AdvancedWaveformVisualizer({ audioUrl, isPlaying, setIsPlaying, volume, setVolume, speed, setSpeed, loop, setLoop }) {
    const dynamicCanvasRef = useRef(null);
  const staticCanvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState({ start: null, end: null });
  const animationRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const previousVolume = useRef(volume);

  useEffect(() => {
    if (!audioUrl) return;

    const context = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = context;
    const analyserNode = context.createAnalyser();
    analyserNode.fftSize = 2048;
    analyserRef.current = analyserNode;

    fetch(audioUrl)
      .then(response => response.arrayBuffer())
      .then(data => context.decodeAudioData(data))
      .then(buffer => {
        setAudioBuffer(buffer);
        setDuration(buffer.duration);
        drawStaticWaveform(buffer);
      })
      .catch(error => console.error('Error loading audio:', error));

    return () => {
      if (context.state !== 'closed') {
        context.close();
      }
    };
  }, [audioUrl]);

  const drawWaveform = useCallback((canvasRef, dataArray, bufferLength, isStatic = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasCtx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    canvasCtx.fillStyle = 'rgba(255, 255, 255, 1)';
    canvasCtx.fillRect(0, 0, width, height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = '#4353FF';
    canvasCtx.beginPath();

    const sliceWidth = (width * 1.0) / (bufferLength * zoomLevel);
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * height) / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();

    if (!isStatic) {
      // Draw playhead on dynamic waveform
      const playheadX = (currentTime / duration) * width;
      canvasCtx.beginPath();
      canvasCtx.moveTo(playheadX, 0);
      canvasCtx.lineTo(playheadX, height);
      canvasCtx.strokeStyle = 'red';
      canvasCtx.stroke();
    }

    if (selectedRegion.start !== null && selectedRegion.end !== null) {
      const startX = (selectedRegion.start / duration) * width;
      const endX = (selectedRegion.end / duration) * width;
      canvasCtx.fillStyle = 'rgba(67, 83, 255, 0.2)';
      canvasCtx.fillRect(startX, 0, endX - startX, height);
    }
  }, [zoomLevel, duration, selectedRegion, currentTime]);

  const drawStaticWaveform = useCallback((buffer) => {
    const canvas = staticCanvasRef.current;
    if (!canvas) return;

    const canvasCtx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const data = buffer.getChannelData(0);
    const step = Math.ceil(data.length / width);
    const amp = height / 2;

    canvasCtx.fillStyle = 'rgba(255, 255, 255, 1)';
    canvasCtx.fillRect(0, 0, width, height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = '#4353FF';
    canvasCtx.beginPath();

    for (let i = 0; i < width; i++) {
      let min = 1.0;
      let max = -1.0;
      for (let j = 0; j < step; j++) {
        const datum = data[(i * step) + j];
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }
      canvasCtx.moveTo(i, (1 + min) * amp);
      canvasCtx.lineTo(i, (1 + max) * amp);
    }

    canvasCtx.stroke();
  }, []);

  const updateAudioState = useCallback(() => {
    if (audioContextRef.current && analyserRef.current && sourceNodeRef.current) {
      const bufferLength = analyserRef.current.fftSize;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteTimeDomainData(dataArray);
      drawWaveform(dynamicCanvasRef, dataArray, bufferLength);

      if (isPlaying) {
        setCurrentTime(audioContextRef.current.currentTime);
      }

      animationRef.current = requestAnimationFrame(updateAudioState);
    }
  }, [drawWaveform, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateAudioState);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, updateAudioState]);

  const startPlayback = useCallback((startTime) => {
    if (audioContextRef.current && audioBuffer) {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
      }
      const newSource = audioContextRef.current.createBufferSource();
      newSource.buffer = audioBuffer;
      const gainNode = audioContextRef.current.createGain();
      gainNode.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
      newSource.connect(gainNode);
      gainNode.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
      newSource.start(0, startTime);
      newSource.onended = () => setIsPlaying(false);
      sourceNodeRef.current = newSource;
      setCurrentTime(startTime);
      setIsPlaying(true);
    }
  }, [audioBuffer, volume, setIsPlaying]);

  useEffect(() => {
    if (isPlaying && audioBuffer && !sourceNodeRef.current) {
      startPlayback(currentTime);
    } else if (!isPlaying && sourceNodeRef.current) {
      sourceNodeRef.current.stop();
      sourceNodeRef.current = null;
    }
  }, [isPlaying, audioBuffer, currentTime, startPlayback]);

  useEffect(() => {
    if (sourceNodeRef.current) {
      sourceNodeRef.current.playbackRate.value = speed;
    }
  }, [speed]);

  useEffect(() => {
    if (sourceNodeRef.current) {
      sourceNodeRef.current.loop = loop;
    }
  }, [loop]);

  const handleStaticCanvasClick = (e) => {
    const canvas = staticCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickTime = (x / canvas.width) * duration;

    setCurrentTime(clickTime);
    if (isPlaying) {
      startPlayback(clickTime);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prevZoom => Math.min(prevZoom * 2, 16));
  };

  const handleZoomOut = () => {
    setZoomLevel(prevZoom => Math.max(prevZoom / 2, 1));
  };

  // ... (keep other functions like handleTrimAudio, handleDownload, etc.)
const handleTrimAudio = () => {
    if (selectedRegion.start !== null && selectedRegion.end !== null && audioBuffer) {
      const start = Math.min(selectedRegion.start, selectedRegion.end);
      const end = Math.max(selectedRegion.start, selectedRegion.end);
      
      const trimmedBuffer = audioContextRef.current.createBuffer(
        audioBuffer.numberOfChannels,
        (end - start) * audioBuffer.sampleRate,
        audioBuffer.sampleRate
      );

      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const newChannelData = trimmedBuffer.getChannelData(channel);
        const originalChannelData = audioBuffer.getChannelData(channel);
        for (let i = 0; i < newChannelData.length; i++) {
          newChannelData[i] = originalChannelData[i + Math.floor(start * audioBuffer.sampleRate)];
        }
      }

      setAudioBuffer(trimmedBuffer);
      setDuration(trimmedBuffer.duration);
      setCurrentTime(0);
      setSelectedRegion({ start: null, end: null });
      drawStaticWaveform(trimmedBuffer);
    }
  };

  const handleDownload = () => {
    if (audioBuffer) {
      const offlineContext = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
      );

      const source = offlineContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(offlineContext.destination);
      source.start();

      offlineContext.startRendering().then((renderedBuffer) => {
        const wav = audioBufferToWav(renderedBuffer);
        const blob = new Blob([new DataView(wav)], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'trimmed_audio.wav';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }
  };

  const audioBufferToWav = (buffer) => {
    const numOfChan = buffer.numberOfChannels;
    const length = buffer.length * numOfChan * 2 + 44;
    const out = new ArrayBuffer(length);
    const view = new DataView(out);
    const channels = [];
    let sample;
    let offset = 0;
    let pos = 0;

    // Write WAVE header
    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"

    setUint32(0x20746d66); // "fmt " chunk
    setUint32(16); // length = 16
    setUint16(1); // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2); // block-align
    setUint16(16); // 16-bit

    setUint32(0x61746164); // "data" - chunk
    setUint32(length - pos - 4); // chunk length

    // Write interleaved data
    for (let i = 0; i < buffer.numberOfChannels; i++) {
      channels.push(buffer.getChannelData(i));
    }

    while (pos < length) {
      for (let i = 0; i < numOfChan; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
        view.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }

    return out;

    function setUint16(data) {
      view.setUint16(pos, data, true);
      pos += 2;
    }

    function setUint32(data) {
      view.setUint32(pos, data, true);
      pos += 4;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (sourceNodeRef.current) {
      sourceNodeRef.current.gain.setValueAtTime(newVolume, audioContextRef.current.currentTime);
    }
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setSpeed(newSpeed);
    if (sourceNodeRef.current) {
      sourceNodeRef.current.playbackRate.setValueAtTime(newSpeed, audioContextRef.current.currentTime);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume.current);
      setIsMuted(false);
    } else {
      previousVolume.current = volume;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const resetAudio = () => {
    setCurrentTime(0);
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
      startPlayback(0);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  return (
    <CanvasContainer>
      <h3>Advanced Waveform Visualizer</h3>
      <canvas ref={dynamicCanvasRef} width={800} height={200} />
      <canvas ref={staticCanvasRef} width={800} height={200} onClick={handleStaticCanvasClick} style={{ cursor: 'pointer' }} />
      <TimelineContainer>
        <TimelineMarker position={duration > 0 ? (currentTime / duration) * 100 : 0} />
      </TimelineContainer>
      <TimeDisplay>
        {formatTime(currentTime)} / {formatTime(duration)}
      </TimeDisplay>
      <Controls>
        <button onClick={() => setIsPlaying(!isPlaying)} aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={resetAudio} aria-label="Reset">
          <RotateCcw size={24} />
        </button>
        <button onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
        <VolumeControl
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          aria-label="Volume"
        />
        <SpeedControl value={speed} onChange={handleSpeedChange} aria-label="Playback Speed">
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </SpeedControl>
        <button onClick={() => setLoop(!loop)} aria-label={loop ? "Disable Loop" : "Enable Loop"}>
          <FastForward size={24} color={loop ? "#4353FF" : "currentColor"} />
        </button>
        <button onClick={handleZoomIn} aria-label="Zoom In">
          <ZoomIn size={24} />
        </button>
        <button onClick={handleZoomOut} aria-label="Zoom Out">
          <ZoomOut size={24} />
        </button>
        <button onClick={handleTrimAudio} aria-label="Trim Audio" disabled={!selectedRegion.start || !selectedRegion.end}>
          <Scissors size={24} />
        </button>
        <button onClick={handleDownload} aria-label="Download Audio" disabled={!audioBuffer}>
          <Download size={24} />
        </button>
      </Controls>
    </CanvasContainer>
  );
}

AdvancedWaveformVisualizer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  setVolume: PropTypes.func.isRequired,
  speed: PropTypes.number.isRequired,
  setSpeed: PropTypes.func.isRequired,
  loop: PropTypes.bool.isRequired,
  setLoop: PropTypes.func.isRequired,
};

export default AdvancedWaveformVisualizer;
