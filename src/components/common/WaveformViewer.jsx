// src/components/common/WaveformViewer.jsx
import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styled from 'styled-components';

const WaveformViewerContainer = styled.div`
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.neutral};
  padding: 20px;
  border-radius: 10px;
`;

const Waveform = styled.div`
  width: 100%;
  height: 150px;
`;

function WaveformViewer({ fileUrl }) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const resizeTimeout = useRef(null);

  useEffect(() => {
    if (waveformRef.current && fileUrl) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#D9DCFF',
        progressColor: '#4353FF',
        cursorColor: '#4353FF',
        responsive: true,
        height: 150,
        barWidth: 2,
        barRadius: 3,
        backend: 'WebAudio',
      });

      wavesurferRef.current.load(fileUrl);

      // Handle errors
      wavesurferRef.current.on('error', (error) => {
        console.error('WaveSurfer error:', error);
      });

      // Debounced resize handler
      const handleResize = () => {
        clearTimeout(resizeTimeout.current);
        resizeTimeout.current = setTimeout(() => {
          if (wavesurferRef.current) {
            wavesurferRef.current.empty();
            wavesurferRef.current.drawBuffer();
          }
        }, 300);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout.current);
        if (wavesurferRef.current) {
          wavesurferRef.current.destroy();
        }
      };
    }
  }, [fileUrl]);

  return (
    <WaveformViewerContainer>
      <h3>Waveform Preview</h3>
      <Waveform id="waveform-viewer" ref={waveformRef} aria-label="Audio waveform visualization"></Waveform>
    </WaveformViewerContainer>
  );
}

WaveformViewer.propTypes = {
  fileUrl: PropTypes.string.isRequired,
};

export default WaveformViewer;
