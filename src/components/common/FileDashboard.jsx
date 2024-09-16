// src/components/common/FileDashboard.jsx
import React, { useState } from 'react';
import MediaPlayer from './MediaPlayer';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DashboardContainer = styled.div`
  margin-top: 30px;
`;

const FileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;

  @media (max-width: 1199px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const FileCard = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral};
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  p {
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
    font-weight: 500;
  }
`;

function FileDashboard({ uploadedFiles }) {
  const [currentFile, setCurrentFile] = useState(null);

  const selectFile = (file) => {
    const fullPath = file.path.startsWith('/static/uploads')
      ? `${window.location.origin}${file.path}`
      : file.path;
    setCurrentFile({ 
      fileUrl: fullPath, 
      fileName: file.filename, 
      fileSize: file.size, 
      duration: file.duration, 
      fileType: file.type // Ensure this is the correct MIME type
    });
  };

  const closeMediaPlayer = () => {
    setCurrentFile(null);
  };

  return (
    <DashboardContainer>
      <h2>Uploaded Files</h2>
      <FileGrid>
        {uploadedFiles.length > 0 ? (
          uploadedFiles.map((file, index) => (
            <FileCard key={index} onClick={() => selectFile(file)}>
              <p>{file.filename}</p>
            </FileCard>
          ))
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </FileGrid>
      {currentFile && (
        <MediaPlayer
          fileUrl={currentFile.fileUrl}
          fileName={currentFile.fileName}
          fileType={currentFile.fileType}
          fileSize={currentFile.fileSize}
          duration={currentFile.duration}
          onClose={closeMediaPlayer}
        />
      )}
    </DashboardContainer>
  );
}

FileDashboard.propTypes = {
  uploadedFiles: PropTypes.arrayOf(
    PropTypes.shape({
      filename: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      duration: PropTypes.string,
    })
  ).isRequired,
};

export default FileDashboard;
