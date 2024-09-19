// src/components/common/FileDashboardStyles.jsx

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Container for each file item
export const FileItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.neutral};
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

// File name styling
export const FileName = styled.span`
  flex: 1;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Icon representing the file type
export const FileTypeIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.primary};
`;

// Container for action buttons (e.g., play, download, delete)
export const FileActions = styled.div`
  display: flex;
  align-items: center;
`;

// Individual action button
export const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

// Icon inside the action button
export const ActionIcon = styled(FontAwesomeIcon)`
  pointer-events: none;
`;

// Label for accessibility (screen readers)
export const ActionLabel = styled.span`
  display: none;
`;

// Preview section (e.g., waveform for audio, thumbnail for video)
export const FilePreview = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 100px; /* Adjust as needed */
  background-color: #f9f9f9;
  border: 1px dashed #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 0.9rem;
`;
