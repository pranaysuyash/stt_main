import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FileDashboard from '../common/FileDashboard';
import Notification from '../common/Notification';

const DashboardContainer = styled.div`
  padding: 20px;
`;

function Dashboard() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: 'success' });

  useEffect(() => {
    fetch('/api/file_history')
      .then((response) => response.json())
      .then((data) => {
        if (data.files) {
          setUploadedFiles(data.files);
        }
      })
      .catch((error) => {
        console.error('Error fetching file history:', error);
        setNotification({ message: 'Failed to fetch file history.', type: 'error' });
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
