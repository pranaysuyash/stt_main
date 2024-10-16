
// src/utils/fileUtils.js

/**
 * Helper functions to determine file types.
 */

/**
 * Checks if the file type is audio.
 * @param {string} type - The MIME type of the file.
 * @returns {boolean}
 */
export const isAudioFile = (type) => typeof type === 'string' && type.startsWith('audio/');

/**
 * Checks if the file type is video.
 * @param {string} type - The MIME type of the file.
 * @returns {boolean}
 */
export const isVideoFile = (type) => typeof type === 'string' && type.startsWith('video/');

/**
 * Checks if the file type is image.
 * @param {string} type - The MIME type of the file.
 * @returns {boolean}
 */
export const isImageFile = (type) => typeof type === 'string' && type.startsWith('image/');