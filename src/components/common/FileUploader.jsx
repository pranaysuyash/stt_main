// src/components/common/FileUploader.jsx
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PreviewSection from './PreviewSection';
import ProgressBar from './ProgressBar';
import Button from './Button'; // Ensure this component exists
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { ErrorMessage } from './Messages'; // Import only ErrorMessage

const UploadSection = styled.div`
  margin-top: 20px;
`;

const OverwritePrompt = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.colors.warning};
  border-radius: 5px;
  margin-top: 20px;
  
  p {
    margin-bottom: 15px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.body};
  }
`;

// New styled component for button container
const OverwriteButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px; /* Space between buttons */
  
  button {
    flex: 1; /* Ensure both buttons take equal space */
  }
`;

const DropZone = styled.div`
  border: 2px dashed #bbb;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.neutral};
  padding: 40px;
  text-align: center;
  transition: background-color 0.3s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover, &.drag-over {
    background-color: ${({ theme }) => theme.colors.background};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  i {
    font-size: 50px;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 10px;
  }

  p {
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.body};
  }
`;

function FileUploader({ setUploadedFiles, setNotification }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessages, setErrorMessages] = useState([]); // Changed to array
  const [isUploading, setIsUploading] = useState(false);
  const [overwritePrompt, setOverwritePrompt] = useState(false);
  const [overwriteFile, setOverwriteFile] = useState(null);
  const fileInputRef = useRef(null);

  // Handle file selection from input or drag-and-drop
  const handleFiles = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setErrorMessages([]);
    setNotification({ message: '', type: '' });

    let files;
    if (event.type === 'drop') {
      files = event.dataTransfer.files;
    } else {
      files = event.target.files;
    }

    if (files.length === 0) {
      setErrorMessages(['No files selected.']);
      return;
    }

    const allowedMimeTypes = [
      'audio/mpeg',
      'audio/wav',
      'video/mp4',
      'video/x-msvideo',
      'video/quicktime' // Include quicktime to allow .mov files
    ];

    const invalidTypeFiles = Array.from(files).filter(
      file => !allowedMimeTypes.includes(file.type)
    );

    const oversizedFiles = Array.from(files).filter(
      file => file.size > 200 * 1024 * 1024 // 200MB
    );

    let newErrorMessages = [];

    if (invalidTypeFiles.length > 0) {
      newErrorMessages.push(`Unsupported file types: ${invalidTypeFiles.map(f => f.name).join(', ')}`);
    }

    if (oversizedFiles.length > 0) {
      newErrorMessages.push(`Files too large (max 200MB): ${oversizedFiles.map(f => f.name).join(', ')}`);
    }

    if (newErrorMessages.length > 0) {
      setErrorMessages(newErrorMessages);
      return;
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
  };

  // Prevent default behavior in drag events
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleFiles(event);
  };

  // Check if the file already exists
  const checkFileExists = async (fileName) => {
    try {
      const response = await fetch(`/api/file_exists?filename=${encodeURIComponent(fileName)}`);
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking file existence:', error);
      return false;
    }
  };

  // Handle file upload to the server
  const uploadFiles = async () => {
    if (selectedFiles.length === 0) {
      setErrorMessages(['Please select files to upload.']);
      return;
    }

    const fileExists = await checkFileExists(selectedFiles[0].name);

    if (fileExists) {
      setOverwritePrompt(true);
      setOverwriteFile(selectedFiles[0].name);
      return;
    }

    handleUpload(selectedFiles);
  };

  const handleUpload = async(files) => {
    setIsUploading(true);
    setUploadProgress(0);
    setErrorMessages([]);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });

  //   const xhr = new XMLHttpRequest();

  //   xhr.upload.addEventListener('progress', (event) => {
  //     if (event.lengthComputable) {
  //       const percentComplete = Math.round((event.loaded / event.total) * 100);
  //       setUploadProgress(percentComplete);
  //     }
  //   });

  //   xhr.onreadystatechange = () => {
  //     if (xhr.readyState === 4) {
  //       setIsUploading(false);
  //       setUploadProgress(0);

  //       if (xhr.status === 200 || xhr.status === 207) {
  //         const response = JSON.parse(xhr.responseText);
  //         if (response.uploaded_files) {
  //           setNotification({ message: 'Files uploaded successfully!', type: 'success' });
  //         }
  //         if (response.errors) {
  //           const newErrors = response.errors.map(err => `${err.filename}: ${err.error}`);
  //           setErrorMessages(newErrors);
  //         }
  //         setSelectedFiles([]);
  //         fetch('/api/file_history')
  //           .then((res) => res.json())
  //           .then((data) => {
  //             if (data.files) {
  //               setUploadedFiles(data.files);
  //             }
  //           })
  //           .catch((error) => console.error('Error fetching files:', error));
  //       } else if (xhr.status === 413) {
  //         const response = JSON.parse(xhr.responseText);
  //         setErrorMessages([`${response.error}: ${response.message}`]);
  //       } else {
  //         setNotification({ message: 'Error uploading files. Please try again.', type: 'error' });
  //         console.error('Error uploading files:', xhr.responseText);
  //       }
  //     }
  //   };

  //   xhr.open('POST', '/upload');
  //   xhr.send(formData);
  // };

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    // Calculate upload progress manually since fetch doesn't provide progress updates
    // For more advanced progress tracking, consider using Axios

    const data = await response.json();

    if (response.ok || response.status === 207) {
      if (data.uploaded_files) {
        setNotification({ message: 'Files uploaded successfully!', type: 'success' });
      }
      if (data.errors) {
        const newErrors = data.errors.map(err => `${err.filename}: ${err.error}`);
        setErrorMessages(newErrors);
      }
      setSelectedFiles([]);
      const historyResponse = await fetch('/api/file_history');
      const historyData = await historyResponse.json();
      if (historyData.files) {
        setUploadedFiles(historyData.files);
      }
    } else if (response.status === 413) {
      const errorData = await response.json();
      setErrorMessages([`${errorData.error}: ${errorData.message}`]);
    } else {
      setNotification({ message: 'Error uploading files. Please try again.', type: 'error' });
      console.error('Error uploading files:', data);
    }
  } catch (error) {
    setNotification({ message: 'Network error during file upload.', type: 'error' });
    console.error('Network error:', error);
  } finally {
    setIsUploading(false);
    setUploadProgress(0);
  }
};

  // Remove selected files
  const removeFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <UploadSection>
      {/* Drop zone for files */}
      <DropZone
        role="button"
        aria-label="File Upload Zone"
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
        className={isUploading ? 'disabled' : ''}
      >
        <i className="fas fa-cloud-upload-alt"></i>
        <p>Click here or drag and drop audio or video files (max 200MB)</p>
        <input
          type="file"
          id="file-input"
          accept="audio/*,video/*"
          multiple
          style={{ display: 'none' }}
          onChange={handleFiles}
          ref={fileInputRef}
        />
      </DropZone>

      {/* Display selected files */}
      {selectedFiles.length > 0 && (
        <>
          <PreviewSection
            selectedFiles={selectedFiles}
            removeFile={removeFile}
          />
          <Button
            variant="primary"
            icon={faUpload}
            onClick={uploadFiles}
            disabled={isUploading}
            aria-label={isUploading ? 'Uploading files' : 'Upload Files'}
          >
            {isUploading ? 'Uploading...' : 'Upload Files'}
          </Button>
          <ProgressBar progress={uploadProgress} />
        </>
      )}

      {/* Display error messages */}
      {errorMessages.length > 0 && (
        <ErrorMessage>
          {errorMessages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </ErrorMessage>
      )}

      {/* Overwrite Prompt */}
      {overwritePrompt && (
        <OverwritePrompt>
          <p>File "{overwriteFile}" already exists. Do you want to overwrite it?</p>
          <OverwriteButtons>
            <Button
              variant="secondary"
              customColor="#2ecc71" /* Complimentary green for "Yes" button */
              onClick={() => {
                handleUpload(selectedFiles);
                setOverwritePrompt(false);
              }}
              aria-label="Yes, overwrite the existing file"
            >
              Yes
            </Button>
            <Button
              variant="secondary" /* Changed from 'tertiary' to 'secondary' for consistent styling */
              customColor="#e74c3c" /* Custom red color for "No" button */
              onClick={() => setOverwritePrompt(false)}
              aria-label="No, cancel the upload"
            >
              No
            </Button>
          </OverwriteButtons>
        </OverwritePrompt>
      )}
    </UploadSection>
  );
}

FileUploader.propTypes = {
  setUploadedFiles: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default FileUploader;
