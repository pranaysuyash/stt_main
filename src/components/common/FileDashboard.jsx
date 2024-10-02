// src/components/common/FileDashboard.jsx

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ViewerModal from './ViewerModal'; // Replace with the correct path to your ViewerModal
import PropTypes from 'prop-types';
import Tooltip from './Tooltip'; // Replace with the correct path to your Tooltip component
import { isAudioFile, isVideoFile, isImageFile } from '../../utils/mediaUtils'; // Replace with the correct path
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faTimes } from '@fortawesome/free-solid-svg-icons';

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
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
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
  justify-content: space-between;
  height: 200px;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  .file-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  p {
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  @media (max-width: 767px) {
    padding: 15px;
    height: auto;

    p {
      font-size: 0.875rem;
    }
  }
`;

const TagButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  margin-top: 10px;
`;

const TagInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-top: 5px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 5px;
`;

const Tag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.neutral};
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
`;

const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.neutral};
  cursor: pointer;
  margin-left: 5px;
  padding: 0;
  font-size: 0.8rem;
`;
function FileDashboard({ uploadedFiles, onTagFile, onRemoveTag }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const [fileToTag, setFileToTag] = useState(null);
  const triggerRef = useRef(null);

  console.log('FileDashboard received uploadedFiles:', uploadedFiles);

  if (!uploadedFiles || uploadedFiles.length === 0) {
    return <p>Loading files... or No files to display.</p>;
  }

  const selectFile = (index, event) => {
    if (event.target.closest('button, input, a')) {
      return;
    }
    if (!uploadedFiles || index >= uploadedFiles.length) return;

    triggerRef.current = event.currentTarget;
    const file = uploadedFiles[index];
    const mimeType = file.type;

    if (isAudioFile(mimeType) || isVideoFile(mimeType) || isImageFile(mimeType)) {
      setSelectedIndex(index);
      setIsViewerOpen(true);
    } else {
      console.error('Unsupported media type:', mimeType);
    }
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
    setSelectedIndex(null);
    if (triggerRef.current) {
      triggerRef.current.focus(); // Important for accessibility
    }
  };

  const handleTagClick = (file, event) => {
    event.stopPropagation();
    setFileToTag(file);
  };

  const handleTagSubmit = (event) => {
    event.preventDefault();
    if (fileToTag && tagInput) {
      onTagFile(fileToTag.id, tagInput);
      setTagInput('');
      setFileToTag(null);
    }
  };

  const handleRemoveTag = (fileId, tag, event) => {
    event.stopPropagation();
    onRemoveTag(fileId, tag);
  };

  return (
    <DashboardContainer>
      <h2>Uploaded Files</h2>
      <FileGrid>
        {uploadedFiles.map((file, index) => (
          <FileCard 
            key={file.id} 
            onClick={(e) => selectFile(index, e)} 
            tabIndex="0" 
            onKeyPress={(e) => { if (e.key === 'Enter') selectFile(index, e); }}
            aria-label={`${isImageFile(file.type) ? 'View' : 'Play'} ${file.filename}`}
          >
            <div className="file-info">
              <Tooltip $text={file.filename}>  {/* Make sure you have a Tooltip component */}
                <p>{file.filename}</p>
              </Tooltip>
              <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
            <div>
              <TagList>
                {file.tags && file.tags.map((tag, tagIndex) => (
                  <Tag key={tagIndex}>
                    {tag}
                    <RemoveTagButton onClick={(e) => handleRemoveTag(file.id, tag, e)}>
                      <FontAwesomeIcon icon={faTimes} />
                    </RemoveTagButton>
                  </Tag>
                ))}
              </TagList>
              {fileToTag === file ? (
                <form onSubmit={handleTagSubmit}>
                  <TagInput
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Enter tag"
                    onClick={(e) => e.stopPropagation()}
                  />
                </form>
              ) : (
                <TagButton onClick={(e) => handleTagClick(file, e)}>
                  <FontAwesomeIcon icon={faTag} /> Add Tag
                </TagButton>
              )}
            </div>
          </FileCard>
        ))}
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
      id: PropTypes.number.isRequired,
      filename: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired, // Or 'url' if using full URLs
      size: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      duration: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  onTagFile: PropTypes.func.isRequired,
  onRemoveTag: PropTypes.func.isRequired,
};

export default FileDashboard;