// src/components/pages/Library.jsx
import React from 'react';
import styled from 'styled-components';
import FileDashboard from '../common/FileDashboard';

const LibraryContainer = styled.div`
  padding: 20px;
`;

function Library() {
  const dummyFiles = [
    {
      filename: 'SampleAudio1.mp3',
      path: '/static/uploads/SampleAudio1.mp3',
      size: 10485760, // 10MB
      type: 'audio/mpeg',
      duration: '03:45',
    },
    {
      filename: 'SampleVideo1.mp4',
      path: '/static/uploads/SampleVideo1.mp4',
      size: 52428800, // 50MB
      type: 'video/mp4',
      duration: '10:20',
    },
  ];

  return (
    <LibraryContainer>
      <h1>Library</h1>
      <FileDashboard uploadedFiles={dummyFiles} />
    </LibraryContainer>
  );
}

export default Library;
