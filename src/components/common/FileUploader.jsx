// // src/components/common/FileDashboard.jsx

// import React, { useState, useRef } from 'react';
// import MediaPlayer from './MediaPlayer';
// import ImageViewer from './ImageViewer'; // Import ImageViewer
// import {
//   FileItem,
//   FileName,
//   FileTypeIcon,
//   FileActions,
//   ActionButton,
//   ActionIcon,
//   ActionLabel,
//   FilePreview
// } from "./FileDashboardStyles";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { 
//   faForward, 
//   faBackward, 
//   faTimes,
//   faFileAudio,
//   faFileVideo,
//   faFileImage,
//   faDownload,
//   faTrash
// } from "@fortawesome/free-solid-svg-icons";
// import Tooltip from './Tooltip'; 
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// // Styled component for the dashboard container
// const DashboardContainer = styled.div`
//   margin-top: 30px;
// `;

// // Styled component for the grid layout
// // const FileGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
// //   gap: 20px;
// //   @media (max-width: 1199px) {
// //     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
// //   }
// //   @media (max-width: 767px) {
// //     grid-template-columns: 1fr;
// //     gap: 15px;
// //   }
// // `;

// const FileGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//   gap: 20px;

//   @media (max-width: 1199px) {
//     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//   }

//   @media (max-width: 767px) {
//     grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
//     gap: 15px;
//     padding: 10px;
//   }
// `;

// // Styled component for each file card
// // const FileCard = styled.div`
// //   background-color: ${({ theme }) => theme.colors.neutral};
// //   padding: 20px;
// //   border-radius: 10px;
// //   box-sizing: border-box;
// //   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// //   text-align: center;
// //   transition: transform 0.2s ease, box-shadow 0.3s ease;
// //   cursor: pointer;
// //   display: flex;
// //   flex-direction: column;
// //   justify-content: center;
// //   height: 150px; 
// //   &:hover {
// //     transform: translateY(-5px);
// //     box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
// //   }
// //   p {
// //     margin-bottom: 10px;
// //     color: ${({ theme }) => theme.colors.text};
// //     font-size: 1rem; 
// //     font-weight: ${({ theme }) => theme.fontWeights.medium};
// //     overflow: hidden;
// //     text-overflow: ellipsis;
// //     white-space: nowrap;
// //   }
// //   @media (max-width: 767px) {
// //     padding: 15px;
// //     height: auto;
// //     p {
// //       font-size: 0.875rem; 
// //     }
// //   }
// // `;

// const FileCard = styled.div`
//   background-color: ${({ theme }) => theme.colors.neutral};
//   padding: 20px;
//   border-radius: 10px;
//   box-sizing: border-box;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   text-align: center;
//   transition: transform 0.2s ease, box-shadow 0.3s ease;
//   cursor: pointer;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   height: 150px;

//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
//   }

//   p {
//     margin-bottom: 10px;
//     color: ${({ theme }) => theme.colors.text};
//     font-size: 1rem;
//     font-weight: ${({ theme }) => theme.fontWeights.medium};
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//   }

//   @media (max-width: 767px) {
//     padding: 15px;
//     height: auto;

//     p {
//       font-size: 0.875rem;
//     }
//   }

//   @media (max-width: 480px) {
//     height: auto;

//     p {
//       font-size: 0.8125rem;
//     }
//   }
// `;

// function FileDashboard({ uploadedFiles }) {
//   const [currentIndex, setCurrentIndex] = useState(null);
//   const [currentMediaType, setCurrentMediaType] = useState(null); // Track media type
//   const triggerRef = useRef(null);

//   const selectFile = (index, event) => {
//     triggerRef.current = event.currentTarget;
//     const file = uploadedFiles[index];
//     const mimeType = file.type;
//     console.log(`Selected file: ${file.filename}, MIME Type: ${mimeType}`);
//     const isExtractedAudio = file.filename.endsWith('_audio.wav'); // Example condition

//     if (isExtractedAudio) {
//       // Optionally, display a tooltip or message indicating it's an extracted audio file
//       return; // Prevent opening in MediaPlayer
//     }

//     if (mimeType.startsWith('audio/') || mimeType.startsWith('video/')) {
//       setCurrentMediaType('media');
//       setCurrentIndex(index);
//       console.log('Opening MediaPlayer');
//     } else if (mimeType.startsWith('image/')) {
//       setCurrentMediaType('image');
//       setCurrentIndex(index);
//       console.log('Opening ImageViewer');
//     } else {
//       console.error('Unsupported media type:', mimeType);
//       // Optionally, show a notification to the user
//     }
//   };

//   const closeViewer = () => {
//     setCurrentIndex(null);
//     setCurrentMediaType(null);
//     if (triggerRef.current) {
//       triggerRef.current.focus(); // Return focus to the last clicked file card
//     }
//   };

//   const handleNextTrack = () => {
//     setCurrentIndex((prevIndex) => {
//       if (prevIndex === null) return 0;
//       return (prevIndex + 1) % uploadedFiles.length;
//     });
//   };

//   const handlePrevTrack = () => {
//     setCurrentIndex((prevIndex) => {
//       if (prevIndex === null) return uploadedFiles.length - 1;
//       return (prevIndex - 1 + uploadedFiles.length) % uploadedFiles.length;
//     });
//   };

//   return (
//     <DashboardContainer>
//       <h2>Uploaded Files</h2>
//       <FileGrid>
//         {uploadedFiles.length > 0 ? (
//           uploadedFiles.map((file, index) => (
//             <FileCard 
//               key={index} 
//               onClick={(e) => selectFile(index, e)} 
//               tabIndex="0" 
//               onKeyPress={(e) => {
//                 if (e.key === 'Enter') selectFile(index, e);
//               }}
//               aria-label={`${
//                 file.type.startsWith('image/') ? 'View' : 'Play'
//               } ${file.filename}`}
//             >
//               <Tooltip $text={file.filename}>
//                 <p>{file.filename}</p>
//               </Tooltip>
//               <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
//             </FileCard>
//           ))
//         ) : (
//           <p>No files uploaded yet.</p>
//         )}
//       </FileGrid>
//       {currentIndex !== null && currentMediaType === 'media' && (
//         <MediaPlayer
//           fileUrl={
//             uploadedFiles[currentIndex].path.startsWith('/static/uploads') 
//               ? `${window.location.origin}${uploadedFiles[currentIndex].path}` 
//               : uploadedFiles[currentIndex].path
//           }
//           fileName={uploadedFiles[currentIndex].filename}
//           fileType={uploadedFiles[currentIndex].type}
//           fileSize={uploadedFiles[currentIndex].size}
//           duration={uploadedFiles[currentIndex].duration}
//           onClose={closeViewer}
//           onNextTrack={handleNextTrack}
//           onPrevTrack={handlePrevTrack}
//         />
//       )}
//       {currentIndex !== null && currentMediaType === 'image' && (
//         <ImageViewer
//           fileUrl={
//             uploadedFiles[currentIndex].path.startsWith('/static/uploads') 
//               ? `${window.location.origin}${uploadedFiles[currentIndex].path}` 
//               : uploadedFiles[currentIndex].path
//           }
//           fileName={uploadedFiles[currentIndex].filename}
//           onClose={closeViewer}
//         />
//       )}
//     </DashboardContainer>
//   );
// }

// FileDashboard.propTypes = {
//   uploadedFiles: PropTypes.arrayOf(
//     PropTypes.shape({
//       filename: PropTypes.string.isRequired,
//       path: PropTypes.string.isRequired,
//       size: PropTypes.number.isRequired,
//       type: PropTypes.string.isRequired,
//       duration: PropTypes.string,
//     })
//   ).isRequired,
// };

// // export default FileDashboard;

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
// import api from '../../utils/api';
// import FileDashboard from './FileDashboard';

// const UploaderContainer = styled.div`
//   margin-bottom: 20px;
// `;

// const UploadArea = styled.div`
//   border: 2px dashed ${({ theme }) => theme.colors.primary};
//   border-radius: 5px;
//   padding: 20px;
//   text-align: center;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: ${({ theme }) => theme.colors.background};
//   }
// `;

// const UploadIcon = styled(FontAwesomeIcon)`
//   font-size: 48px;
//   color: ${({ theme }) => theme.colors.primary};
//   margin-bottom: 10px;
// `;

// const UploadText = styled.p`
//   margin: 0;
//   font-size: 18px;
//   color: ${({ theme }) => theme.colors.text};
// `;

// const HiddenInput = styled.input`
//   display: none;
// `;

// function FileUploader({ uploadedFiles, setUploadedFiles, setNotification }) {
//   const [isDragging, setIsDragging] = useState(false);

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//     const files = [...e.dataTransfer.files];
//     uploadFiles(files);
//   };

//   const handleFileSelect = (e) => {
//     const files = [...e.target.files];
//     uploadFiles(files);
//   };

//   const uploadFiles = async (files) => {
//     const formData = new FormData();
//     files.forEach(file => {
//       formData.append('file', file);
//     });

//     try {
//       const response = await api.post('/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       setUploadedFiles(prevFiles => [...prevFiles, ...response.data.uploaded_files]);
//       setNotification({ message: 'Files uploaded successfully!', type: 'success' });
//     } catch (error) {
//       console.error('Upload error:', error);
//       setNotification({ message: 'Failed to upload files. Please try again.', type: 'error' });
//     }
//   };

//   return (
//     <UploaderContainer>
//       <UploadArea
//         onDragEnter={handleDragEnter}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         onClick={() => document.getElementById('fileInput').click()}
//         style={{ backgroundColor: isDragging ? '#f0f0f0' : 'transparent' }}
//       >
//         <UploadIcon icon={faCloudUploadAlt} />
//         <UploadText>Drag & Drop files here or click to select</UploadText>
//         <HiddenInput
//           id="fileInput"
//           type="file"
//           multiple
//           onChange={handleFileSelect}
//         />
//       </UploadArea>
//       <FileDashboard uploadedFiles={uploadedFiles} />
//     </UploaderContainer>
//   );
// }

// export default FileUploader;

// src/components/common/FileUploader.jsx
import React, { useState, useRef } from "react";
import styled from "styled-components";
import PreviewSection from "./PreviewSection";
import ProgressBar from "./ProgressBar";
import Button from "./Button";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { ErrorMessage } from "./Messages";
import axios from "axios"; // Import axios

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

const OverwriteButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  button {
    flex: 1;
  }
`;

const DropZone = styled.div`
  border: 2px dashed #bbb;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  transition: background-color 0.3s ease, box-shadow 0.2s ease;
  cursor: pointer;
  &:hover,
  &.drag-over {
    background-color: ${({ theme }) => theme.colors.background};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  i {
    font-size: 50px;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 10px;
  }
`;

function FileUploader({ setUploadedFiles, setNotification }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [overwritePrompt, setOverwritePrompt] = useState(false);
  const [overwriteFile, setOverwriteFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFiles = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setErrorMessages([]);
    setNotification({ message: "", type: "" });
    let files;
    if (event.type === "drop") {
      files = event.dataTransfer.files;
    } else {
      files = event.target.files;
    }
    if (files.length === 0) {
      setErrorMessages(["No files selected."]);
      return;
    }
    const allowedMimeTypes = [
      "audio/mpeg", "audio/wav", "audio/aac", "audio/flac", "audio/ogg", "audio/x-m4a",
      "video/mp4", "video/x-msvideo", "video/quicktime", "video/x-matroska", "video/x-flv", "video/x-ms-wmv",
      "image/jpeg", "image/png", "image/gif", "image/bmp", "image/webp"
    ];
    const invalidTypeFiles = Array.from(files).filter(
      (file) => !allowedMimeTypes.includes(file.type)
    );
    const oversizedFiles = Array.from(files).filter(
      (file) => file.size > 300 * 1024 * 1024
    );
    let newErrorMessages = [];
    if (invalidTypeFiles.length > 0) {
      newErrorMessages.push(
        `Unsupported file types: ${invalidTypeFiles
          .map((f) => f.name)
          .join(", ")}`
      );
    }
    if (oversizedFiles.length > 0) {
      newErrorMessages.push(
        `Files too large (max 300MB): ${oversizedFiles
          .map((f) => f.name)
          .join(", ")}`
      );
    }
    if (newErrorMessages.length > 0) {
      setErrorMessages(newErrorMessages);
      return;
    }
    setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleFiles(event);
  };

  const checkFileExists = async (fileName) => {
    try {
      const response = await axios.get(
        `/api/file_exists?filename=${encodeURIComponent(fileName)}`
      );
      const data = response.data;
      return data.exists;
    } catch (error) {
      console.error("Error checking file existence:", error);
      return false;
    }
  };

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) {
      setErrorMessages(["Please select files to upload."]);
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

  const handleUpload = async (files) => {
    setIsUploading(true);
    setUploadProgress(0);
    setErrorMessages([]);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });
    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total;
          const current = progressEvent.loaded;
          const percentCompleted = Math.round((current / total) * 100);
          setUploadProgress(percentCompleted);
        },
      });
      const data = response.data;
      if (response.status === 200 || response.status === 207) {
        if (data.uploaded_files) {
          setNotification({
            message: "Files uploaded successfully!",
            type: "success",
          });
        }
        if (data.errors) {
          const newErrors = data.errors.map(
            (err) => `${err.filename}: ${err.error}`
          );
          setErrorMessages(newErrors);
        }
        setSelectedFiles([]);
        const historyResponse = await axios.get("/api/file_history");
        const historyData = historyResponse.data;
        if (historyData.files) {
          setUploadedFiles(historyData.files);
        }
      } else if (response.status === 413) {
        const errorData = response.data;
        setErrorMessages([`${errorData.error}: ${errorData.message}`]);
      } else {
        setNotification({
          message: "Error uploading files. Please try again.",
          type: "error",
        });
        console.error("Error uploading files:", data);
      }
    } catch (error) {
      if (error.response && error.response.status === 413) {
        const errorData = error.response.data;
        setErrorMessages([`${errorData.error}: ${errorData.message}`]);
      } else {
        setNotification({
          message: "Network error during file upload.",
          type: "error",
        });
        console.error("Network error:", error);
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(0); // Reset progress after upload
    }
  };

  const removeFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <UploadSection>
      <DropZone
        role="button"
        aria-label="File Upload Zone"
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
        className={isUploading ? "disabled" : ""}
      >
        <i className="fas fa-cloud-upload-alt"></i>
        <p>Click here or drag and drop audio or video files (max 300MB)</p>
        <input
          type="file"
          id="file-input"
          accept="audio/*,video/*"
          multiple
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFiles}
        />
      </DropZone>
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
            aria-label={isUploading ? "Uploading files" : "Upload Files"}
          >
            {isUploading ? "Uploading..." : "Upload Files"}
          </Button>
          {isUploading && <ProgressBar progress={uploadProgress} />}
        </>
      )}
      {errorMessages.length > 0 && (
        <ErrorMessage>
          {errorMessages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </ErrorMessage>
      )}
      {overwritePrompt && (
        <OverwritePrompt>
          <p>
            File "{overwriteFile}" already exists. Do you want to overwrite it?
          </p>
          <OverwriteButtons>
            <Button
              variant="secondary"
              customColor="#2ecc71"
              onClick={() => {
                handleUpload(selectedFiles);
                setOverwritePrompt(false);
              }}
              aria-label="Yes, overwrite the existing file"
            >
              Yes
            </Button>
            <Button
              variant="secondary"
              customColor="#e74c3c"
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