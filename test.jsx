import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FileDashboard from '../common/FileDashboard';
import Notification from '../common/Notification';
import api from '../../utils/api'; // Import the api instance
import { Pie, Bar } from 'react-chartjs-2'; // Importing Chart.js components
import 'chart.js/auto';

const DashboardContainer = styled.div`
  padding: 20px;
`;

function Dashboard() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [mediaSummary, setMediaSummary] = useState({ images: 0, audio: 0, video: 0 });

  useEffect(() => {
    api.get('/file_history')
      .then((response) => {
        const files = response.data.files;
        setUploadedFiles(files);

        // Categorize media files and update media summary
        const summary = files.reduce(
          (acc, file) => {
            if (file.type.startsWith('image')) acc.images += 1;
            if (file.type.startsWith('audio')) acc.audio += 1;
            if (file.type.startsWith('video')) acc.video += 1;
            return acc;
          },
          { images: 0, audio: 0, video: 0 }
        );
        setMediaSummary(summary);
      })
      .catch((error) => {
        console.error('Error fetching file history:', error);
        let errorMessage = 'Failed to fetch file history.';
        if (error.response && error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error; // More specific error message
        } else if (error.response && error.response.status) {
          errorMessage = `HTTP error ${error.response.status}`; // Generic HTTP error
        }
        setNotification({ message: errorMessage, type: 'error' });
      });
  }, []);

  const pieData = {
    labels: ['Images', 'Audio', 'Videos'],
    datasets: [
      {
        data: [mediaSummary.images, mediaSummary.audio, mediaSummary.video],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const barData = {
    labels: ['Images', 'Audio', 'Videos'],
    datasets: [
      {
        label: 'Media Files',
        data: [mediaSummary.images, mediaSummary.audio, mediaSummary.video],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

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
      <div>
        <h2>Media Summary (Pie Chart)</h2>
        <Pie data={pieData} />
      </div>
      <div>
        <h2>Media Summary (Bar Chart)</h2>
        <Bar data={barData} />
      </div>
      <FileDashboard uploadedFiles={uploadedFiles} />
    </DashboardContainer>
  );
}

export default Dashboard;
