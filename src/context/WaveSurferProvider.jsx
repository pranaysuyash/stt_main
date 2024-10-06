
import React, { createContext, useRef, useContext, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

const WaveSurferContext = createContext();

export function WaveSurferProvider({ children }) {
  const wavesurferRef = useRef(null);

  useEffect(() => {
    // Ensure that the container exists in the DOM
    const container = document.querySelector('#waveform');
    console.log('WaveSurferProvider: container found:', container); // Debugging

    if (container && !wavesurferRef.current) {
      console.log('WaveSurferProvider: Initializing WaveSurfer');
      wavesurferRef.current = WaveSurfer.create({
        container: container,
        waveColor: '#D9DCFF',
        progressColor: '#4353FF',
        cursorColor: '#4353FF',
        responsive: true,
        height: 100,
        barWidth: 2,
        barRadius: 3,
        backend: 'WebAudio',
      });

      // Log if WaveSurfer initialization succeeded
      console.log('WaveSurferProvider: WaveSurfer initialized', wavesurferRef.current);
    }

    // Clean up when the component is unmounted
    return () => {
      if (wavesurferRef.current) {
        console.log('WaveSurferProvider: Destroying WaveSurfer instance');
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, [children]);

  return (
    <WaveSurferContext.Provider value={wavesurferRef}>
      {children}
    </WaveSurferContext.Provider>
  );
}

export function useWaveSurfer() {
  return useContext(WaveSurferContext);
}
