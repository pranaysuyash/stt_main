
// // // // import React, { useState, useRef, useEffect } from 'react';
// // // // import PropTypes from 'prop-types';
// // // // import styled from 'styled-components';
// // // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // // import { faPlay, faPause, faStop, faVolumeUp, faVolumeMute, faRedo, faTimes } from '@fortawesome/free-solid-svg-icons';
// // // // import AdvancedWaveformVisualizer from './AdvancedWaveformVisualizer';

// // // // const Controls = styled.div`
// // // //   display: flex;
// // // //   justify-content: center;
// // // //   align-items: center;
// // // //   margin-top: 15px;
// // // //   flex-wrap: wrap;
// // // //   gap: 15px;

// // // //   button {
// // // //     padding: 10px;
// // // //     border: none;
// // // //     border-radius: 50%;
// // // //     cursor: pointer;
// // // //     background-color: ${({ theme }) => theme.colors.primary};
// // // //     color: white;
// // // //     transition: background-color 0.3s ease, transform 0.2s ease;
// // // //     display: flex;
// // // //     align-items: center;
// // // //     justify-content: center;
// // // //     width: 50px;
// // // //     height: 50px;

// // // //     &:hover {
// // // //       background-color: ${({ theme }) => theme.colors.secondary};
// // // //       transform: scale(1.1);
// // // //     }

// // // //     &:focus {
// // // //       outline: 3px solid ${({ theme }) => theme.colors.secondary};
// // // //       outline-offset: 3px;
// // // //     }

// // // //     &:disabled {
// // // //       background-color: ${({ theme }) => theme.colors.disabled};
// // // //       cursor: not-allowed;
// // // //     }
// // // //   }

// // // //   label {
// // // //     display: flex;
// // // //     align-items: center;
// // // //     gap: 10px;
// // // //     font-size: 14px;
// // // //     color: ${({ theme }) => theme.colors.text};
// // // //   }

// // // //   input[type='range'] {
// // // //     width: 120px;
// // // //   }
// // // // `;

// // // // const AudioPlayerContainer = styled.div`
// // // //   margin: 30px auto;
// // // //   text-align: center;
// // // //   max-width: 800px;
// // // //   background-color: ${({ theme }) => theme.colors.background};
// // // //   padding: 25px;
// // // //   border-radius: 15px;
// // // //   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
// // // // `;

// // // // function AudioPlayer({ fileUrl, fileName, fileSize, onClose }) {
// // // //   const [isPlaying, setIsPlaying] = useState(false);
// // // //   const [volume, setVolume] = useState(1);
// // // //   const [loop, setLoop] = useState(false);
// // // //   const [speed, setSpeed] = useState(1);
// // // //   const [duration, setDuration] = useState(0);
// // // //   const [currentTime, setCurrentTime] = useState(0);
// // // //   const audioRef = useRef(null);

// // // //   useEffect(() => {
// // // //     if (audioRef.current) {
// // // //       audioRef.current.addEventListener('loadedmetadata', () => {
// // // //         setDuration(audioRef.current.duration);
// // // //       });
// // // //       audioRef.current.addEventListener('timeupdate', () => {
// // // //         setCurrentTime(audioRef.current.currentTime);
// // // //       });
// // // //     }
// // // //     return () => {
// // // //       if (audioRef.current) {
// // // //         audioRef.current.removeEventListener('loadedmetadata', () => {});
// // // //         audioRef.current.removeEventListener('timeupdate', () => {});
// // // //       }
// // // //     };
// // // //   }, []);

// // // //   const togglePlayPause = () => {
// // // //     if (audioRef.current) {
// // // //       if (isPlaying) {
// // // //         audioRef.current.pause();
// // // //       } else {
// // // //         audioRef.current.play();
// // // //       }
// // // //       setIsPlaying(!isPlaying);
// // // //     }
// // // //   };

// // // //   const handleStop = () => {
// // // //     if (audioRef.current) {
// // // //       audioRef.current.pause();
// // // //       audioRef.current.currentTime = 0;
// // // //       setIsPlaying(false);
// // // //     }
// // // //   };

// // // //   const handleVolumeChange = (e) => {
// // // //     const newVolume = parseFloat(e.target.value);
// // // //     setVolume(newVolume);
// // // //     if (audioRef.current) {
// // // //       audioRef.current.volume = newVolume;
// // // //     }
// // // //   };

// // // //   const handleSpeedChange = (e) => {
// // // //     const newSpeed = parseFloat(e.target.value);
// // // //     setSpeed(newSpeed);
// // // //     if (audioRef.current) {
// // // //       audioRef.current.playbackRate = newSpeed;
// // // //     }
// // // //   };

// // // //   const toggleLoop = () => {
// // // //     setLoop(!loop);
// // // //     if (audioRef.current) {
// // // //       audioRef.current.loop = !loop;
// // // //     }
// // // //   };

// // // //   return (
// // // //     <AudioPlayerContainer>
// // // //       <h3>Now Playing: {fileName}</h3>
// // // //       {fileSize && <p>File Size: {(fileSize / (1024 * 1024)).toFixed(2)} MB</p>}

// // // //       <audio ref={audioRef} src={fileUrl} />

// // // //       <AdvancedWaveformVisualizer 
// // // //         audioUrl={fileUrl}
// // // //         isPlaying={isPlaying}
// // // //         setIsPlaying={setIsPlaying}
// // // //         volume={volume}
// // // //         speed={speed}
// // // //         loop={loop}
// // // //       />

// // // //       <Controls>
// // // //         <button onClick={togglePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
// // // //           <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
// // // //         </button>
// // // //         <button onClick={handleStop} aria-label="Stop">
// // // //           <FontAwesomeIcon icon={faStop} />
// // // //         </button>
// // // //         <label>
// // // //           <FontAwesomeIcon icon={volume > 0 ? faVolumeUp : faVolumeMute} />
// // // //           <input
// // // //             type="range"
// // // //             min="0"
// // // //             max="1"
// // // //             step="0.01"
// // // //             value={volume}
// // // //             onChange={handleVolumeChange}
// // // //             aria-label="Volume Control"
// // // //           />
// // // //         </label>
// // // //         <label>
// // // //           Speed: {speed}x
// // // //           <input
// // // //             type="range"
// // // //             min="0.5"
// // // //             max="2"
// // // //             step="0.1"
// // // //             value={speed}
// // // //             onChange={handleSpeedChange}
// // // //             aria-label="Speed Control"
// // // //           />
// // // //         </label>
// // // //         <button onClick={toggleLoop} aria-label={loop ? 'Disable Loop' : 'Enable Loop'}>
// // // //           <FontAwesomeIcon icon={faRedo} color={loop ? '#4353FF' : 'white'} />
// // // //         </button>
// // // //       </Controls>

// // // //       <button onClick={onClose} aria-label="Close Audio Player" style={{ marginTop: '20px' }}>
// // // //         <FontAwesomeIcon icon={faTimes} />
// // // //       </button>
// // // //     </AudioPlayerContainer>
// // // //   );
// // // // }

// // // // AudioPlayer.propTypes = {
// // // //   fileUrl: PropTypes.string.isRequired,
// // // //   fileName: PropTypes.string.isRequired,
// // // //   fileSize: PropTypes.number.isRequired,
// // // //   onClose: PropTypes.func.isRequired,
// // // // };

// // // // export default AudioPlayer;

// // // // // import React, { useState, useRef, useEffect } from 'react';
// // // // // import PropTypes from 'prop-types';
// // // // // import styled from 'styled-components';
// // // // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // // // import { faPlay, faPause, faStop, faVolumeUp, faVolumeMute, faRedo, faTimes } from '@fortawesome/free-solid-svg-icons';
// // // // // import AdvancedWaveformVisualizer from './AdvancedWaveformVisualizer';

// // // // // const Controls = styled.div`
// // // // //   display: flex;
// // // // //   justify-content: center;
// // // // //   align-items: center;
// // // // //   margin-top: 15px;
// // // // //   flex-wrap: wrap;
// // // // //   gap: 15px;

// // // // //   button {
// // // // //     padding: 10px;
// // // // //     border: none;
// // // // //     border-radius: 50%;
// // // // //     cursor: pointer;
// // // // //     background-color: ${({ theme }) => theme.colors.primary};
// // // // //     color: white;
// // // // //     transition: background-color 0.3s ease, transform 0.2s ease;
// // // // //     display: flex;
// // // // //     align-items: center;
// // // // //     justify-content: center;
// // // // //     width: 50px;
// // // // //     height: 50px;

// // // // //     &:hover {
// // // // //       background-color: ${({ theme }) => theme.colors.secondary};
// // // // //       transform: scale(1.1);
// // // // //     }

// // // // //     &:focus {
// // // // //       outline: 3px solid ${({ theme }) => theme.colors.secondary};
// // // // //       outline-offset: 3px;
// // // // //     }

// // // // //     &:disabled {
// // // // //       background-color: ${({ theme }) => theme.colors.disabled};
// // // // //       cursor: not-allowed;
// // // // //     }
// // // // //   }

// // // // //   label {
// // // // //     display: flex;
// // // // //     align-items: center;
// // // // //     gap: 10px;
// // // // //     font-size: 14px;
// // // // //     color: ${({ theme }) => theme.colors.text};
// // // // //   }

// // // // //   input[type='range'] {
// // // // //     width: 120px;
// // // // //   }
// // // // // `;

// // // // // const AudioPlayerContainer = styled.div`
// // // // //   margin: 30px auto;
// // // // //   text-align: center;
// // // // //   max-width: 800px;
// // // // //   background-color: ${({ theme }) => theme.colors.background};
// // // // //   padding: 25px;
// // // // //   border-radius: 15px;
// // // // //   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
// // // // // `;

// // // // // function AudioPlayer({ fileUrl, fileName, fileSize, onClose, isPlaying, setIsPlaying }) {
// // // // //   const [volume, setVolume] = useState(1);
// // // // //   const [loop, setLoop] = useState(false);
// // // // //   const [speed, setSpeed] = useState(1);
// // // // //   const [duration, setDuration] = useState(0);
// // // // //   const [currentTime, setCurrentTime] = useState(0);
// // // // //   const audioRef = useRef(null);

// // // // //   useEffect(() => {
// // // // //     if (audioRef.current) {
// // // // //       audioRef.current.addEventListener('loadedmetadata', () => {
// // // // //         setDuration(audioRef.current.duration);
// // // // //       });
// // // // //       audioRef.current.addEventListener('timeupdate', () => {
// // // // //         setCurrentTime(audioRef.current.currentTime);
// // // // //       });
// // // // //     }
// // // // //     return () => {
// // // // //       if (audioRef.current) {
// // // // //         audioRef.current.removeEventListener('loadedmetadata', () => {});
// // // // //         audioRef.current.removeEventListener('timeupdate', () => {});
// // // // //       }
// // // // //     };
// // // // //   }, []);

// // // // //   const togglePlayPause = () => {
// // // // //     if (audioRef.current) {
// // // // //       if (isPlaying) {
// // // // //         audioRef.current.pause();
// // // // //       } else {
// // // // //         audioRef.current.play();
// // // // //       }
// // // // //       setIsPlaying(!isPlaying);
// // // // //     }
// // // // //   };

// // // // //   const handleStop = () => {
// // // // //     if (audioRef.current) {
// // // // //       audioRef.current.pause();
// // // // //       audioRef.current.currentTime = 0;
// // // // //       setIsPlaying(false);
// // // // //     }
// // // // //   };

// // // // //   const handleVolumeChange = (e) => {
// // // // //     const newVolume = parseFloat(e.target.value);
// // // // //     setVolume(newVolume);
// // // // //     if (audioRef.current) {
// // // // //       audioRef.current.volume = newVolume;
// // // // //     }
// // // // //   };

// // // // //   const handleSpeedChange = (e) => {
// // // // //     const newSpeed = parseFloat(e.target.value);
// // // // //     setSpeed(newSpeed);
// // // // //     if (audioRef.current) {
// // // // //       audioRef.current.playbackRate = newSpeed;
// // // // //     }
// // // // //   };

// // // // //   const toggleLoop = () => {
// // // // //     setLoop(!loop);
// // // // //     if (audioRef.current) {
// // // // //       audioRef.current.loop = !loop;
// // // // //     }
// // // // //   };

// // // // //   const handleSeek = (newTime) => {
// // // // //     if (audioRef.current) {
// // // // //       audioRef.current.currentTime = newTime;
// // // // //       setCurrentTime(newTime);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <AudioPlayerContainer>
// // // // //       <h3>Now Playing: {fileName}</h3>
// // // // //       {fileSize && <p>File Size: {(fileSize / (1024 * 1024)).toFixed(2)} MB</p>}

// // // // //       <audio 
// // // // //         ref={audioRef} 
// // // // //         src={fileUrl}
// // // // //         onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
// // // // //         onEnded={() => setIsPlaying(false)}
// // // // //       />

// // // // //       <AdvancedWaveformVisualizer 
// // // // //         audioUrl={fileUrl}
// // // // //         isPlaying={isPlaying}
// // // // //         setIsPlaying={setIsPlaying}
// // // // //         volume={volume}
// // // // //         setVolume={setVolume}
// // // // //         speed={speed}
// // // // //         setSpeed={setSpeed}
// // // // //         loop={loop}
// // // // //         setLoop={setLoop}
// // // // //         currentTime={currentTime}
// // // // //         onSeek={handleSeek}
// // // // //         togglePlayPause={togglePlayPause}
// // // // //       />

// // // // //       <Controls>
// // // // //         <button onClick={togglePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
// // // // //           <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
// // // // //         </button>
// // // // //         <button onClick={handleStop} aria-label="Stop">
// // // // //           <FontAwesomeIcon icon={faStop} />
// // // // //         </button>
// // // // //         <label>
// // // // //           <FontAwesomeIcon icon={volume > 0 ? faVolumeUp : faVolumeMute} />
// // // // //           <input
// // // // //             type="range"
// // // // //             min="0"
// // // // //             max="1"
// // // // //             step="0.01"
// // // // //             value={volume}
// // // // //             onChange={handleVolumeChange}
// // // // //             aria-label="Volume Control"
// // // // //           />
// // // // //         </label>
// // // // //         <label>
// // // // //           Speed: {speed}x
// // // // //           <input
// // // // //             type="range"
// // // // //             min="0.5"
// // // // //             max="2"
// // // // //             step="0.1"
// // // // //             value={speed}
// // // // //             onChange={handleSpeedChange}
// // // // //             aria-label="Speed Control"
// // // // //           />
// // // // //         </label>
// // // // //         <button onClick={toggleLoop} aria-label={loop ? 'Disable Loop' : 'Enable Loop'}>
// // // // //           <FontAwesomeIcon icon={faRedo} color={loop ? '#4353FF' : 'white'} />
// // // // //         </button>
// // // // //       </Controls>

// // // // //       <button onClick={onClose} aria-label="Close Audio Player" style={{ marginTop: '20px' }}>
// // // // //         <FontAwesomeIcon icon={faTimes} />
// // // // //       </button>
// // // // //     </AudioPlayerContainer>
// // // // //   );
// // // // // }

// // // // // AudioPlayer.propTypes = {
// // // // //   fileUrl: PropTypes.string.isRequired,
// // // // //   fileName: PropTypes.string.isRequired,
// // // // //   fileSize: PropTypes.number.isRequired,
// // // // //   onClose: PropTypes.func.isRequired,
// // // // //   isPlaying: PropTypes.bool.isRequired,
// // // // //   setIsPlaying: PropTypes.func.isRequired,
// // // // // };

// // // // // export default AudioPlayer;

// // // import React, { useState, useRef, useEffect } from 'react';
// // // import styled from 'styled-components';
// // // import PropTypes from 'prop-types';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faPlay, faPause, faStop, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
// // // import Metadata from './Metadata';

// // // const AudioPlayerContainer = styled.div`
// // //   margin: 20px auto;
// // //   padding: 20px;
// // //   background-color: ${({ theme }) => theme.colors.background};
// // //   border-radius: 10px;
// // //   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// // // `;

// // // const Controls = styled.div`
// // //   display: flex;
// // //   justify-content: center;
// // //   align-items: center;
// // //   margin-top: 20px;
// // // `;

// // // const Button = styled.button`
// // //   background-color: ${({ theme }) => theme.colors.primary};
// // //   color: white;
// // //   border: none;
// // //   padding: 10px 15px;
// // //   margin: 0 5px;
// // //   border-radius: 5px;
// // //   cursor: pointer;
// // //   transition: background-color 0.3s;

// // //   &:hover {
// // //     background-color: ${({ theme }) => theme.colors.secondary};
// // //   }

// // //   &:disabled {
// // //     background-color: ${({ theme }) => theme.colors.disabled};
// // //     cursor: not-allowed;
// // //   }
// // // `;

// // // const VolumeControl = styled.input`
// // //   width: 100px;
// // //   margin: 0 10px;
// // // `;

// // // function AudioPlayer({ fileUrl, fileName, fileId, metadata }) {
// // //   const [isPlaying, setIsPlaying] = useState(false);
// // //   const [volume, setVolume] = useState(1);
// // //   const audioRef = useRef(null);

// // //   useEffect(() => {
// // //     const audio = audioRef.current;
// // //     audio.volume = volume;
// // //   }, [volume]);

// // //   const togglePlay = () => {
// // //     if (isPlaying) {
// // //       audioRef.current.pause();
// // //     } else {
// // //       audioRef.current.play();
// // //     }
// // //     setIsPlaying(!isPlaying);
// // //   };

// // //   const stopAudio = () => {
// // //     audioRef.current.pause();
// // //     audioRef.current.currentTime = 0;
// // //     setIsPlaying(false);
// // //   };

// // //   const handleVolumeChange = (e) => {
// // //     setVolume(parseFloat(e.target.value));
// // //   };

// // //   return (
// // //     <AudioPlayerContainer>
// // //       <h3>{fileName}</h3>
// // //       <audio ref={audioRef} src={fileUrl} />
// // //       <Controls>
// // //         <Button onClick={togglePlay}>
// // //           <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
// // //         </Button>
// // //         <Button onClick={stopAudio}>
// // //           <FontAwesomeIcon icon={faStop} />
// // //         </Button>
// // //         <FontAwesomeIcon icon={volume > 0 ? faVolumeUp : faVolumeMute} />
// // //         <VolumeControl
// // //           type="range"
// // //           min="0"
// // //           max="1"
// // //           step="0.1"
// // //           value={volume}
// // //           onChange={handleVolumeChange}
// // //         />
// // //       </Controls>
// // //       <Metadata metadata={metadata} fileId={fileId} />
// // //     </AudioPlayerContainer>
// // //   );
// // // }

// // // AudioPlayer.propTypes = {
// // //   fileUrl: PropTypes.string.isRequired,
// // //   fileName: PropTypes.string.isRequired,
// // //   fileId: PropTypes.string.isRequired,
// // //   metadata: PropTypes.object,
// // // };

// // // export default AudioPlayer;

// // import React, { useState, useRef, useEffect } from 'react';
// // import styled from 'styled-components';
// // import PropTypes from 'prop-types';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faPlay, faPause, faStop, faVolumeUp, faVolumeMute, faRedo } from '@fortawesome/free-solid-svg-icons';
// // import Metadata from './Metadata';

// // const AudioPlayerContainer = styled.div`
// //   margin: 20px auto;
// //   padding: 20px;
// //   background-color: ${({ theme }) => theme.colors.background};
// //   border-radius: 10px;
// //   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// // `;

// // const Controls = styled.div`
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   margin-top: 20px;
// //   flex-wrap: wrap;
// // `;

// // const Button = styled.button`
// //   background-color: ${({ theme }) => theme.colors.primary};
// //   color: white;
// //   border: none;
// //   padding: 10px 15px;
// //   margin: 0 5px;
// //   border-radius: 5px;
// //   cursor: pointer;
// //   transition: background-color 0.3s;

// //   &:hover {
// //     background-color: ${({ theme }) => theme.colors.secondary};
// //   }

// //   &:disabled {
// //     background-color: ${({ theme }) => theme.colors.disabled};
// //     cursor: not-allowed;
// //   }
// // `;

// // const VolumeControl = styled.input`
// //   width: 100px;
// //   margin: 0 10px;
// // `;

// // const Range = styled.input`
// //   width: 100px;
// //   margin: 0 10px;
// // `;

// // const Label = styled.label`
// //   display: flex;
// //   align-items: center;
// //   margin: 0 10px;
// // `;

// // const MetadataSection = styled.div`
// //   margin-top: 20px;
// //   text-align: left;
// // `;

// // function AudioPlayer({ fileUrl, fileName, fileId, metadata, fileSize, duration }) {
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const [volume, setVolume] = useState(1);
// //   const [loop, setLoop] = useState(false);
// //   const [playbackRate, setPlaybackRate] = useState(1);
// //   const audioRef = useRef(null);

// //   useEffect(() => {
// //     const audio = audioRef.current;
// //     if (audio) {
// //       audio.volume = volume;
// //       audio.loop = loop;
// //       audio.playbackRate = playbackRate;
// //     }
// //   }, [volume, loop, playbackRate]);

// //   const togglePlay = () => {
// //     if (isPlaying) {
// //       audioRef.current.pause();
// //     } else {
// //       audioRef.current.play();
// //     }
// //     setIsPlaying(!isPlaying);
// //   };

// //   const stopAudio = () => {
// //     audioRef.current.pause();
// //     audioRef.current.currentTime = 0;
// //     setIsPlaying(false);
// //   };

// //   const toggleLoop = () => {
// //     setLoop(!loop);
// //   };

// //   const handleVolumeChange = (e) => {
// //     setVolume(parseFloat(e.target.value));
// //   };

// //   const handlePlaybackRateChange = (e) => {
// //     setPlaybackRate(parseFloat(e.target.value));
// //   };

// //   return (
// //     <AudioPlayerContainer>
// //       <h3>{fileName}</h3>
// //       <MetadataSection>
// //         <p>File Size: {(fileSize / (1024 * 1024)).toFixed(2)} MB</p>
// //         <p>Duration: {duration || 'Unknown'}</p>
// //       </MetadataSection>
// //       <audio 
// //         ref={audioRef} 
// //         src={fileUrl}
// //         onEnded={() => setIsPlaying(false)}
// //       />
// //       <Controls>
// //         <Button onClick={togglePlay}>
// //           <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
// //           {isPlaying ? 'Pause' : 'Play'}
// //         </Button>
// //         <Button onClick={stopAudio}>
// //           <FontAwesomeIcon icon={faStop} />
// //           Stop
// //         </Button>
// //         <Button onClick={toggleLoop}>
// //           <FontAwesomeIcon icon={faRedo} />
// //           {loop ? 'Looping' : 'Loop'}
// //         </Button>
// //         <Label>
// //           <FontAwesomeIcon icon={volume > 0 ? faVolumeUp : faVolumeMute} />
// //           <VolumeControl
// //             type="range"
// //             min="0"
// //             max="1"
// //             step="0.1"
// //             value={volume}
// //             onChange={handleVolumeChange}
// //             aria-label="Volume Control"
// //           />
// //         </Label>
// //         <Label>
// //           Speed:
// //           <Range
// //             type="range"
// //             min="0.5"
// //             max="2"
// //             step="0.1"
// //             value={playbackRate}
// //             onChange={handlePlaybackRateChange}
// //             aria-label="Playback Speed Control"
// //           />
// //         </Label>
// //       </Controls>
// //       <Metadata metadata={metadata} fileId={fileId} />
// //     </AudioPlayerContainer>
// //   );
// // }

// // AudioPlayer.propTypes = {
// //   fileUrl: PropTypes.string.isRequired,
// //   fileName: PropTypes.string.isRequired,
// //   fileId: PropTypes.string.isRequired,
// //   metadata: PropTypes.object,
// //   fileSize: PropTypes.number.isRequired,
// //   duration: PropTypes.string,
// // };

// // export default AudioPlayer;

// import React, { useState, useRef, useEffect } from 'react';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlay, faPause, faStop, faVolumeUp, faVolumeMute, faRedo, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
// import Metadata from './Metadata';
// import TabView from './TabView';

// const AudioPlayerContainer = styled.div`
//   margin: 20px auto;
//   padding: 20px;
//   background-color: ${({ theme }) => theme.colors.background};
//   border-radius: 10px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// `;

// const Controls = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 20px;
//   flex-wrap: wrap;
// `;

// const Button = styled.button`
//   background-color: ${({ theme }) => theme.colors.primary};
//   color: white;
//   border: none;
//   padding: 10px 15px;
//   margin: 0 5px;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: ${({ theme }) => theme.colors.secondary};
//   }

//   &:disabled {
//     background-color: ${({ theme }) => theme.colors.disabled};
//     cursor: not-allowed;
//   }
// `;

// const VolumeControl = styled.input`
//   width: 100px;
//   margin: 0 10px;
// `;

// const SpeedControl = styled.select`
//   margin: 0 10px;
// `;

// const ProgressBar = styled.progress`
//   width: 100%;
//   height: 10px;
//   margin-top: 10px;
// `;

// const TimeDisplay = styled.div`
//   font-size: 14px;
//   margin-top: 5px;
//   text-align: center;
// `;

// function AudioPlayer({
//   fileUrl,
//   fileName,
//   fileType,
//   fileId,
//   fileSize,
//   duration,
//   metadata,
//   isPlaying,
//   setIsPlaying,
//   volume,
//   setVolume,
//   speed,
//   setSpeed,
//   loop,
//   setLoop
// }) {
//   const audioRef = useRef(null);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [isMuted, setIsMuted] = useState(false);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (audio) {
//       audio.volume = volume;
//       audio.playbackRate = speed;
//       audio.loop = loop;
//     }
//   }, [volume, speed, loop]);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (audio) {
//       if (isPlaying) {
//         audio.play();
//       } else {
//         audio.pause();
//       }
//     }
//   }, [isPlaying]);

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const stopAudio = () => {
//     const audio = audioRef.current;
//     if (audio) {
//       audio.pause();
//       audio.currentTime = 0;
//       setIsPlaying(false);
//     }
//   };

//   const toggleLoop = () => {
//     setLoop(!loop);
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     setIsMuted(newVolume === 0);
//   };

//   const toggleMute = () => {
//     if (isMuted) {
//       setVolume(1);
//       setIsMuted(false);
//     } else {
//       setVolume(0);
//       setIsMuted(true);
//     }
//   };

//   const handleSpeedChange = (e) => {
//     setSpeed(parseFloat(e.target.value));
//   };

//   const handleTimeUpdate = () => {
//     const audio = audioRef.current;
//     if (audio) {
//       setCurrentTime(audio.currentTime);
//     }
//   };

//   const formatTime = (timeInSeconds) => {
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = Math.floor(timeInSeconds % 60);
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const seekBackward = () => {
//     const audio = audioRef.current;
//     if (audio) {
//       audio.currentTime = Math.max(0, audio.currentTime - 10);
//     }
//   };

//   const seekForward = () => {
//     const audio = audioRef.current;
//     if (audio) {
//       audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
//     }
//   };

//   return (
//     <AudioPlayerContainer>
//       <h3>{fileName}</h3>
//       <audio 
//         ref={audioRef}
//         src={fileUrl}
//         onTimeUpdate={handleTimeUpdate}
//         onEnded={() => setIsPlaying(false)}
//       />
//       <ProgressBar value={currentTime} max={duration || 0} />
//       <TimeDisplay>
//         {formatTime(currentTime)} / {formatTime(parseFloat(duration) || 0)}
//       </TimeDisplay>
//       <Controls>
//         <Button onClick={seekBackward} aria-label="Seek 10 seconds backward">
//           <FontAwesomeIcon icon={faBackward} />
//         </Button>
//         <Button onClick={togglePlay}>
//           <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
//           {isPlaying ? 'Pause' : 'Play'}
//         </Button>
//         <Button onClick={seekForward} aria-label="Seek 10 seconds forward">
//           <FontAwesomeIcon icon={faForward} />
//         </Button>
//         <Button onClick={stopAudio}>
//           <FontAwesomeIcon icon={faStop} />
//           Stop
//         </Button>
//         <Button onClick={toggleLoop}>
//           <FontAwesomeIcon icon={faRedo} />
//           {loop ? 'Looping' : 'Loop'}
//         </Button>
//         <Button onClick={toggleMute}>
//           <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
//         </Button>
//         <VolumeControl
//           type="range"
//           min="0"
//           max="1"
//           step="0.1"
//           value={volume}
//           onChange={handleVolumeChange}
//           aria-label="Volume Control"
//         />
//         <SpeedControl value={speed} onChange={handleSpeedChange} aria-label="Playback Speed">
//           <option value="0.5">0.5x</option>
//           <option value="1">1x</option>
//           <option value="1.5">1.5x</option>
//           <option value="2">2x</option>
//         </SpeedControl>
//       </Controls>
//       <Metadata metadata={metadata} fileId={fileId} fileName={fileName} fileUrl={fileUrl} />
//     </AudioPlayerContainer>
//   );
// }

// AudioPlayer.propTypes = {
//   fileUrl: PropTypes.string.isRequired,
//   fileName: PropTypes.string.isRequired,
//   fileId: PropTypes.string.isRequired,
//   fileSize: PropTypes.number.isRequired,
//   duration: PropTypes.string,
//   metadata: PropTypes.object,
//   isPlaying: PropTypes.bool.isRequired,
//   setIsPlaying: PropTypes.func.isRequired,
//   volume: PropTypes.number.isRequired,
//   setVolume: PropTypes.func.isRequired,
//   speed: PropTypes.number.isRequired,
//   setSpeed: PropTypes.func.isRequired,
//   loop: PropTypes.bool.isRequired,
//   setLoop: PropTypes.func.isRequired,
// };

// export default AudioPlayer;

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop, faVolumeUp, faVolumeMute, faRedo, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import Metadata from './Metadata';
import TabView from './TabView';
import AdvancedWaveformVisualizer from './AdvancedWaveformVisualizer';


const AudioPlayerContainer = styled.div`
  margin: 20px auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const VolumeControl = styled.input`
  width: 100px;
  margin: 0 10px;
`;

const SpeedControl = styled.select`
  margin: 0 10px;
`;

const ProgressBar = styled.progress`
  width: 100%;
  height: 10px;
  margin-top: 10px;
`;

const TimeDisplay = styled.div`
  font-size: 14px;
  margin-top: 5px;
  text-align: center;
`;

function AudioPlayer({
  fileUrl,
  fileName,
  fileType,
  fileId,
  fileSize,
  duration,
  metadata,
  isPlaying,
  setIsPlaying,
  volume,
  setVolume,
  speed,
  setSpeed,
  loop,
  setLoop
}) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.playbackRate = speed;
      audio.loop = loop;
    }
  }, [volume, speed, loop]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const stopAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const toggleLoop = () => {
    setLoop(!loop);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(1);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleSpeedChange = (e) => {
    setSpeed(parseFloat(e.target.value));
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const seekBackward = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(0, audio.currentTime - 10);
    }
  };

  const seekForward = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    }
  };

  const audioContent = (
    <>
      <audio 
        ref={audioRef}
        src={fileUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <ProgressBar value={currentTime} max={duration || 0} />
      <TimeDisplay>
        {formatTime(currentTime)} / {formatTime(parseFloat(duration) || 0)}
      </TimeDisplay>
      <Controls>
        <Button onClick={seekBackward} aria-label="Seek 10 seconds backward">
          <FontAwesomeIcon icon={faBackward} />
        </Button>
        <Button onClick={togglePlay}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button onClick={seekForward} aria-label="Seek 10 seconds forward">
          <FontAwesomeIcon icon={faForward} />
        </Button>
        <Button onClick={stopAudio}>
          <FontAwesomeIcon icon={faStop} />
          Stop
        </Button>
        <Button onClick={toggleLoop}>
          <FontAwesomeIcon icon={faRedo} />
          {loop ? 'Looping' : 'Loop'}
        </Button>
        <Button onClick={toggleMute}>
          <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
        </Button>
        <VolumeControl
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          aria-label="Volume Control"
        />
        <SpeedControl value={speed} onChange={handleSpeedChange} aria-label="Playback Speed">
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </SpeedControl>
      </Controls>
    </>
  );

  const tabs = [
    {
      label: 'Basic Player',
      content: audioContent,
    },
    {
      label: 'Advanced Waveform',
      content: (
        <AdvancedWaveformVisualizer
          audioUrl={fileUrl}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          volume={volume}
          setVolume={setVolume}
          speed={speed}
          setSpeed={setSpeed}
          loop={loop}
          setLoop={setLoop}
        />
      ),
    },
    {
      label: 'Metadata',
      content: (
        <Metadata
          metadata={metadata}
          fileId={fileId}
          fileName={fileName}
          fileUrl={fileUrl}
          fileType={fileType}
        />
      ),
    },
  ];

  return (
    <AudioPlayerContainer>
      <h3>{fileName}</h3>
      <p>File Type: {fileType}</p>
      <p>File Size: {(fileSize / (1024 * 1024)).toFixed(2)} MB</p>
      <TabView tabs={tabs} />
    </AudioPlayerContainer>
  );
}

AudioPlayer.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired,
  fileId: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  duration: PropTypes.string,
  metadata: PropTypes.object,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  setVolume: PropTypes.func.isRequired,
  speed: PropTypes.number.isRequired,
  setSpeed: PropTypes.func.isRequired,
  loop: PropTypes.bool.isRequired,
  setLoop: PropTypes.func.isRequired,
};

export default AudioPlayer;