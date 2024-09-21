// src/components/common/FileDashboard.jsx

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ViewerModal from './ViewerModal';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';
import { isAudioFile, isVideoFile, isImageFile } from "../../utils/mediaUtils";

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
  gap: 15px;
  padding: 10px;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 150px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  p {
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 767px) {
    padding: 15px;
    height: auto;

    p {
      font-size: 0.875rem;
    }
  }
`;

function FileDashboard({ uploadedFiles }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const triggerRef = useRef(null);

  const selectFile = (index, event) => {
    triggerRef.current = event.currentTarget;
    const file = uploadedFiles[index];
    const mimeType = file.type;

    if (isAudioFile(mimeType) || isVideoFile(mimeType) || isImageFile(mimeType)) {
      setSelectedIndex(index);
      setIsViewerOpen(true);
    } else {
      console.error('Unsupported media type:', mimeType);
      // Optionally, display a user-friendly message here
    }
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
    setSelectedIndex(null);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  return (
    <DashboardContainer>
      <h2>Uploaded Files</h2>
      <FileGrid>
        {uploadedFiles.length > 0 ? (
          uploadedFiles.map((file, index) => (
            <FileCard
              key={index}
              onClick={(e) => selectFile(index, e)}
              tabIndex="0"
              onKeyPress={(e) => {
                if (e.key === 'Enter') selectFile(index, e);
              }}
              aria-label={`${
                isImageFile(file.type) ? 'View' : 'Play'
              } ${file.filename}`}
            >
              <Tooltip $text={file.filename}>
                <p>{file.filename}</p>
              </Tooltip>
              <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </FileCard>
          ))
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </FileGrid>
      {isViewerOpen && selectedIndex !== null && (
        <ViewerModal
          uploadedFiles={uploadedFiles}
          initialIndex={selectedIndex}
          onClose={closeViewer}
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
