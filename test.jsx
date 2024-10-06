import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useWaveSurfer } from '../../context/WaveSurferProvider';

const WaveformViewerContainer = styled.div`
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.neutral};
  padding: 20px;
  border-radius: 10px;
`;

function WaveformViewer() {
  const wavesurferRef = useWaveSurfer();

  useEffect(() => {
    if (wavesurferRef.current) {
      // Ensure the waveform is rendered if needed.
      wavesurferRef.current.drawBuffer();
    }
  }, [wavesurferRef]);

  return (
    <WaveformViewerContainer>
      <h3>Waveform Preview</h3>
      <div id="waveform" aria-label="Audio waveform visualization"></div>
    </WaveformViewerContainer>
  );
}

export default WaveformViewer;
