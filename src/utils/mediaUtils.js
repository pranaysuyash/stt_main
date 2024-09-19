// File: src/utils/mediaUtils.js

export const isAudioFile = (mimeType) => {
    return mimeType.startsWith('audio/');
  };
  
  export const isVideoFile = (mimeType) => {
    return mimeType.startsWith('video/');
  };
  
  export const isImageFile = (mimeType) => {
    return mimeType.startsWith('image/');
  };
  