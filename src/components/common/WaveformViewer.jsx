// src/components/common/WaveformViewer.jsx
import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styled from 'styled-components';

const WaveformViewerContainer = styled.div`
  margin-top: 20px;
`;

function WaveformViewer({ fileUrl }) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    if (waveformRef.current && fileUrl) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#D9DCFF',
        progressColor: '#4353FF',
        cursorColor: '#4353FF',
      });

      wavesurferRef.current.load(fileUrl);

      return () => {
        if (wavesurferRef.current) {
          wavesurferRef.current.destroy();
        }
      };
    }
  }, [fileUrl]);

  return (
    <WaveformViewerContainer>
      <div id="waveform-viewer" ref={waveformRef}></div>
    </WaveformViewerContainer>
  );
}

export default WaveformViewer;
