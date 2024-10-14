import React, { useState } from 'react';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';
import PropTypes from 'prop-types';
import TabView from './TabView';

function MediaPlayer({
  fileUrl,
  fileName,
  fileType,
  fileId,
  fileSize,
  duration = '',
  metadata,
  onClose,
  isPlaying,
  togglePlayPause
}) {
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(false);

  if (fileType.startsWith('audio/')) {
    return (
      <AudioPlayer
        fileUrl={fileUrl}
        fileName={fileName}
        fileType={fileType}
        fileId={fileId}
        fileSize={fileSize}
        duration={duration}
        metadata={metadata}
        onClose={onClose}
        isPlaying={isPlaying}
        setIsPlaying={togglePlayPause}
        volume={volume}
        setVolume={setVolume}
        speed={speed}
        setSpeed={setSpeed}
        loop={loop}
        setLoop={setLoop}
      />
    );
  } else if (fileType.startsWith('video/')) {
    return (
      <VideoPlayer
        fileUrl={fileUrl}
        fileName={fileName}
        fileType={fileType}
        fileId={fileId}
        fileSize={fileSize}
        duration={duration}
        metadata={metadata}
        onClose={onClose}
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        volume={volume}
        setVolume={setVolume}
        speed={speed}
        setSpeed={setSpeed}
        loop={loop}
        setLoop={setLoop}
      />
    );
  } else {
    return <div role="alert">Unsupported media type selected.</div>;
  }
}

MediaPlayer.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired,
  fileId: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  duration: PropTypes.string,
  metadata: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  togglePlayPause: PropTypes.func.isRequired,
};

export default MediaPlayer;