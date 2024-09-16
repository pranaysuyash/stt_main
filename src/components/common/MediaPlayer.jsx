// src/components/common/MediaPlayer.jsx
import React from 'react';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';
import PropTypes from 'prop-types';

// MediaPlayer Component
function MediaPlayer({ 
  fileUrl, 
  fileName, 
  fileType, 
  fileSize, 
  duration = '', // Default value
  onClose 
}) {
  return (
    <>
      {fileType && fileType.startsWith('audio/') ? (
        <AudioPlayer
          fileUrl={fileUrl}
          fileName={fileName}
          fileType={fileType}
          fileSize={fileSize}
          duration={duration}
          onClose={onClose}
        />
      ) : (
        <VideoPlayer
          fileUrl={fileUrl}
          fileName={fileName}
          fileType={fileType}
          fileSize={fileSize}
          duration={duration}
          onClose={onClose}
        />
      )}
    </>
  );
}

MediaPlayer.propTypes = {
  fileUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  duration: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default MediaPlayer;
