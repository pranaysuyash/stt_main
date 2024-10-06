
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop, faVolumeUp, faVolumeMute, faRedo, faTimes } from '@fortawesome/free-solid-svg-icons';
import AdvancedWaveformVisualizer from './AdvancedWaveformVisualizer';

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  flex-wrap: wrap;
  gap: 15px;

  button {
    padding: 10px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    transition: background-color 0.3s ease, transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
      transform: scale(1.1);
    }

    &:focus {
      outline: 3px solid ${({ theme }) => theme.colors.secondary};
      outline-offset: 3px;
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.disabled};
      cursor: not-allowed;
    }
  }

  label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
  }

  input[type='range'] {
    width: 120px;
  }
`;

const AudioPlayerContainer = styled.div`
  margin: 30px auto;
  text-align: center;
  max-width: 800px;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

function AudioPlayer({ fileUrl, fileName, fileSize, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [loop, setLoop] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration);
      });
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current.currentTime);
      });
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', () => {});
        audioRef.current.removeEventListener('timeupdate', () => {});
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const toggleLoop = () => {
    setLoop(!loop);
    if (audioRef.current) {
      audioRef.current.loop = !loop;
    }
  };

  return (
    <AudioPlayerContainer>
      <h3>Now Playing: {fileName}</h3>
      {fileSize && <p>File Size: {(fileSize / (1024 * 1024)).toFixed(2)} MB</p>}

      <audio ref={audioRef} src={fileUrl} />

      <AdvancedWaveformVisualizer 
        audioUrl={fileUrl}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        volume={volume}
        speed={speed}
        loop={loop}
      />

      <Controls>
        <button onClick={togglePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button onClick={handleStop} aria-label="Stop">
          <FontAwesomeIcon icon={faStop} />
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
          Speed: {speed}x
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speed}
            onChange={handleSpeedChange}
            aria-label="Speed Control"
          />
        </label>
        <button onClick={toggleLoop} aria-label={loop ? 'Disable Loop' : 'Enable Loop'}>
          <FontAwesomeIcon icon={faRedo} color={loop ? '#4353FF' : 'white'} />
        </button>
      </Controls>

      <button onClick={onClose} aria-label="Close Audio Player" style={{ marginTop: '20px' }}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </AudioPlayerContainer>
  );
}

AudioPlayer.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AudioPlayer;

// import React, { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlay, faPause, faStop, faVolumeUp, faVolumeMute, faRedo, faTimes } from '@fortawesome/free-solid-svg-icons';
// import AdvancedWaveformVisualizer from './AdvancedWaveformVisualizer';

// const Controls = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 15px;
//   flex-wrap: wrap;
//   gap: 15px;

//   button {
//     padding: 10px;
//     border: none;
//     border-radius: 50%;
//     cursor: pointer;
//     background-color: ${({ theme }) => theme.colors.primary};
//     color: white;
//     transition: background-color 0.3s ease, transform 0.2s ease;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 50px;
//     height: 50px;

//     &:hover {
//       background-color: ${({ theme }) => theme.colors.secondary};
//       transform: scale(1.1);
//     }

//     &:focus {
//       outline: 3px solid ${({ theme }) => theme.colors.secondary};
//       outline-offset: 3px;
//     }

//     &:disabled {
//       background-color: ${({ theme }) => theme.colors.disabled};
//       cursor: not-allowed;
//     }
//   }

//   label {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 14px;
//     color: ${({ theme }) => theme.colors.text};
//   }

//   input[type='range'] {
//     width: 120px;
//   }
// `;

// const AudioPlayerContainer = styled.div`
//   margin: 30px auto;
//   text-align: center;
//   max-width: 800px;
//   background-color: ${({ theme }) => theme.colors.background};
//   padding: 25px;
//   border-radius: 15px;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
// `;

// function AudioPlayer({ fileUrl, fileName, fileSize, onClose, isPlaying, setIsPlaying }) {
//   const [volume, setVolume] = useState(1);
//   const [loop, setLoop] = useState(false);
//   const [speed, setSpeed] = useState(1);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.addEventListener('loadedmetadata', () => {
//         setDuration(audioRef.current.duration);
//       });
//       audioRef.current.addEventListener('timeupdate', () => {
//         setCurrentTime(audioRef.current.currentTime);
//       });
//     }
//     return () => {
//       if (audioRef.current) {
//         audioRef.current.removeEventListener('loadedmetadata', () => {});
//         audioRef.current.removeEventListener('timeupdate', () => {});
//       }
//     };
//   }, []);

//   const togglePlayPause = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const handleStop = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//       setIsPlaying(false);
//     }
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (audioRef.current) {
//       audioRef.current.volume = newVolume;
//     }
//   };

//   const handleSpeedChange = (e) => {
//     const newSpeed = parseFloat(e.target.value);
//     setSpeed(newSpeed);
//     if (audioRef.current) {
//       audioRef.current.playbackRate = newSpeed;
//     }
//   };

//   const toggleLoop = () => {
//     setLoop(!loop);
//     if (audioRef.current) {
//       audioRef.current.loop = !loop;
//     }
//   };

//   const handleSeek = (newTime) => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = newTime;
//       setCurrentTime(newTime);
//     }
//   };

//   return (
//     <AudioPlayerContainer>
//       <h3>Now Playing: {fileName}</h3>
//       {fileSize && <p>File Size: {(fileSize / (1024 * 1024)).toFixed(2)} MB</p>}

//       <audio 
//         ref={audioRef} 
//         src={fileUrl}
//         onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
//         onEnded={() => setIsPlaying(false)}
//       />

//       <AdvancedWaveformVisualizer 
//         audioUrl={fileUrl}
//         isPlaying={isPlaying}
//         setIsPlaying={setIsPlaying}
//         volume={volume}
//         setVolume={setVolume}
//         speed={speed}
//         setSpeed={setSpeed}
//         loop={loop}
//         setLoop={setLoop}
//         currentTime={currentTime}
//         onSeek={handleSeek}
//         togglePlayPause={togglePlayPause}
//       />

//       <Controls>
//         <button onClick={togglePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
//           <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
//         </button>
//         <button onClick={handleStop} aria-label="Stop">
//           <FontAwesomeIcon icon={faStop} />
//         </button>
//         <label>
//           <FontAwesomeIcon icon={volume > 0 ? faVolumeUp : faVolumeMute} />
//           <input
//             type="range"
//             min="0"
//             max="1"
//             step="0.01"
//             value={volume}
//             onChange={handleVolumeChange}
//             aria-label="Volume Control"
//           />
//         </label>
//         <label>
//           Speed: {speed}x
//           <input
//             type="range"
//             min="0.5"
//             max="2"
//             step="0.1"
//             value={speed}
//             onChange={handleSpeedChange}
//             aria-label="Speed Control"
//           />
//         </label>
//         <button onClick={toggleLoop} aria-label={loop ? 'Disable Loop' : 'Enable Loop'}>
//           <FontAwesomeIcon icon={faRedo} color={loop ? '#4353FF' : 'white'} />
//         </button>
//       </Controls>

//       <button onClick={onClose} aria-label="Close Audio Player" style={{ marginTop: '20px' }}>
//         <FontAwesomeIcon icon={faTimes} />
//       </button>
//     </AudioPlayerContainer>
//   );
// }

// AudioPlayer.propTypes = {
//   fileUrl: PropTypes.string.isRequired,
//   fileName: PropTypes.string.isRequired,
//   fileSize: PropTypes.number.isRequired,
//   onClose: PropTypes.func.isRequired,
//   isPlaying: PropTypes.bool.isRequired,
//   setIsPlaying: PropTypes.func.isRequired,
// };

// export default AudioPlayer;