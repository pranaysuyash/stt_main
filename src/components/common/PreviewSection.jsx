// frontend/src/components/common/PreviewSection.jsx
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PreviewContainer = styled.div`
  margin-top: 20px;
`;

const PreviewItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const RemoveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.error};
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

function PreviewSection({ selectedFiles, removeFile }) {
  return (
    <PreviewContainer>
      <h3>Selected Files</h3>
      {selectedFiles.map((file, index) => (
        <PreviewItem key={index}>
          <FileInfo>
            <span><strong>{file.name}</strong></span>
            <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
          </FileInfo>
          <RemoveButton onClick={() => removeFile(index)}>Remove</RemoveButton>
        </PreviewItem>
      ))}
    </PreviewContainer>
  );
}

PreviewSection.propTypes = {
  selectedFiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeFile: PropTypes.func.isRequired,
};

export default PreviewSection;
