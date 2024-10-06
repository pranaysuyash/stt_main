
import React from 'react';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';
import PropTypes from 'prop-types';

function MediaPlayer({
  fileUrl,
  fileName,
  fileType,
  fileSize,
  duration = '',
  onClose,
  isPlaying,
  togglePlayPause
}) {
  if (fileType.startsWith('audio/')) {
    return (
      <AudioPlayer
        fileUrl={fileUrl}
        fileName={fileName}
        fileSize={fileSize}
        onClose={onClose}
        isPlaying={isPlaying}
        setIsPlaying={togglePlayPause}
      />
    );
  } else if (fileType.startsWith('video/')) {
    return (
      <VideoPlayer
        fileUrl={fileUrl}
        fileName={fileName}
        fileType={fileType}
        fileSize={fileSize}
        duration={duration}
        onClose={onClose}
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
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
  fileSize: PropTypes.number.isRequired,
  duration: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  togglePlayPause: PropTypes.func.isRequired,
};

export default MediaPlayer;