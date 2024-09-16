// src/App.jsx
import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import FileUploader from './components/common/FileUploader';
import FileDashboard from './components/common/FileDashboard';
import Button from './components/common/Button';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';
import { faUpload } from '@fortawesome/free-solid-svg-icons'; 
import Notification from './components/common/Notification'; // Import Notification component
import ErrorBoundary from './components/common/ErrorBoundary'; // Import ErrorBoundary


const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' }); // Define notification state

  // Fetch uploaded files when the app loads
  useEffect(() => {
    fetch('/api/file_history')
      .then((response) => response.json())
      .then((data) => {
        if (data.files) {
          setUploadedFiles(data.files);
        }
      })
      .catch((error) => console.error('Error fetching files:', error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ErrorBoundary>
        <Container>
          <h1>Audio/Video Waveform Analyzer</h1>
          
          {/* Display Notification if exists */}
          {notification.message && (
            <Notification 
              message={notification.message} 
              type={notification.type} 
              onClose={() => setNotification({ message: '', type: '' })} 
            />
          )}
          
          <FileUploader 
            setUploadedFiles={setUploadedFiles} 
            setNotification={setNotification} 
          />
          <FileDashboard uploadedFiles={uploadedFiles} />
        </Container>
      </ErrorBoundary>
    </ThemeProvider>
  );
}


export default App;
