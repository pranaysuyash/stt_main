// src/components/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FileDashboard from '../common/FileDashboard';
import Notification from '../common/Notification';
import api from '../../utils/api'; // Import the api instance

const DashboardContainer = styled.div`
  padding: 20px;
`;

function Dashboard() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: 'success' });

  useEffect(() => {
    api.get('/file_history')
      .then((response) => { /* ... */ })
      .catch((error) => {
        console.error('Error fetching file history:', error);
        let errorMessage = 'Failed to fetch file history.';
        if (error.response && error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error; // More specific error message
        } else if (error.response && error.response.status) {
          errorMessage = `HTTP error ${error.response.status}`; // Generic HTTP error
        } // Add more specific error handling as needed
        setNotification({ message: errorMessage, type: 'error' });
      });
  }, []);
  return (
    <DashboardContainer>
      <h1>Dashboard</h1>
      {notification.message && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification({ message: '', type: 'success' })} 
        />
      )}
      <FileDashboard uploadedFiles={uploadedFiles} />
    </DashboardContainer>
  );
}

export default Dashboard;
