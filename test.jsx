import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Notification from '../common/Notification';
import api from '../../utils/api'; // Import the api instance

const DashboardContainer = styled.div`
  padding: 20px;
`;

const WidgetContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;

function Dashboard() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [mediaSummary, setMediaSummary] = useState({ images: 0, audio: 0, video: 0 });
  const [uploadsPerDay, setUploadsPerDay] = useState({});
  const [uploadsPerWeek, setUploadsPerWeek] = useState({});
  const [totalUploads, setTotalUploads] = useState(0);
  const [storageUsed, setStorageUsed] = useState(0);
  const [storageLimit, setStorageLimit] = useState(1000); // Assuming 1000MB as a limit for now

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

        // Calculate total uploads
        setTotalUploads(files.length);

        // Calculate storage usage (assuming file.size is in bytes)
        const totalStorage = files.reduce((acc, file) => acc + file.size, 0);
        setStorageUsed(totalStorage / 1024 / 1024); // Convert to MB

        // Day-wise uploads
        setUploadsPerDay(response.data.uploads_per_day);

        // Week-wise uploads
        setUploadsPerWeek(response.data.uploads_per_week);
      })
      .catch((error) => {
        console.error('Error fetching file history:', error);
        setNotification({
          message: 'Error fetching file history. Please try again later.',
          type: 'error'
        });
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

  const dayWiseBarData = {
    labels: Object.keys(uploadsPerDay),
    datasets: [
      {
        label: 'Uploads Per Day',
        data: Object.values(uploadsPerDay),
        backgroundColor: '#36A2EB',
      },
    ],
  };

  const weekWiseBarData = {
    labels: Object.keys(uploadsPerWeek),
    datasets: [
      {
        label: 'Uploads Per Week',
        data: Object.values(uploadsPerWeek),
        backgroundColor: '#FFCE56',
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
      
      <WidgetContainer>
        {/* Total Uploads */}
        <div>
          <h2>Total Uploads: {totalUploads}</h2>
        </div>

        {/* Storage Usage */}
        <div>
          <h2>Storage Used: {storageUsed.toFixed(2)} MB / {storageLimit} MB</h2>
          <div style={{ width: '100%', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '5px' }}>
            <div
              style={{
                width: `${(storageUsed / storageLimit) * 100}%`,
                height: '100%',
                backgroundColor: storageUsed / storageLimit > 0.8 ? 'red' : '#36A2EB',
                borderRadius: '5px'
              }}
            />
          </div>
        </div>

        {/* Pie Chart for Media Summary */}
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2>Media Summary</h2>
          <Pie data={pieData} style={{ width: '100%', height: '300px' }} />
        </div>

        {/* Day-wise Uploads Bar Chart */}
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2>Uploads Per Day</h2>
          <Bar data={dayWiseBarData} style={{ width: '100%', height: '300px' }} />
        </div>

        {/* Week-wise Uploads Bar Chart */}
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2>Uploads Per Week</h2>
          <Bar data={weekWiseBarData} style={{ width: '100%', height: '300px' }} />
        </div>
      </WidgetContainer>
    </DashboardContainer>
  );
}

export default Dashboard;
