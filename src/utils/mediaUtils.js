// File: src/utils/mediaUtils.js

export const isAudioFile = (mimeType) => 
  ['audio/mpeg', 'audio/wav', 'audio/ogg'].includes(mimeType);

  export const isVideoFile = (mimeType) => {
    return mimeType.startsWith('video/');
  };
  
  export const isImageFile = (mimeType) => {
    return mimeType.startsWith('image/');
  };
  