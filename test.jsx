import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import DatePicker from 'react-datepicker'; // Assuming you have react-datepicker installed
import 'react-datepicker/dist/react-datepicker.css';
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

const FilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [mediaType, setMediaType] = useState('');
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const applySearch = () => {
    const params = {
      search: searchTerm,  // Include the search term in the request
      start_date: startDate ? startDate.toISOString().split('T')[0] : '',
      end_date: endDate ? endDate.toISOString().split('T')[0] : '',
      media_type: mediaType,
      tags: tags.join(',')
    };

    api.get('/file_history', { params })
      .then((response) => {
        const files = response.data.files;
        setUploadedFiles(files);

        // Process and categorize media files
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

        // Calculate total uploads and storage usage
        setTotalUploads(files.length);
        const totalStorage = files.reduce((acc, file) => acc + file.size, 0);
        setStorageUsed(totalStorage / 1024 / 1024); // Convert to MB

        // Calculate day-wise and week-wise uploads
        const dayWiseUploads = files.reduce((acc, file) => {
          const uploadDate = new Date(file.uploaded_at).toLocaleDateString();
          acc[uploadDate] = (acc[uploadDate] || 0) + 1;
          return acc;
        }, {});
        setUploadsPerDay(dayWiseUploads);

        const weekWiseUploads = files.reduce((acc, file) => {
          const weekStart = new Date(file.uploaded_at);
          const week = `${weekStart.getFullYear()}-W${Math.ceil(weekStart.getDate() / 7)}`;
          acc[week] = (acc[week] || 0) + 1;
          return acc;
        }, {});
        setUploadsPerWeek(weekWiseUploads);
      })
      .catch((error) => {
        console.error('Error fetching file history:', error);
        setNotification({ message: 'Failed to fetch file history.', type: 'error' });
      });
  };

  useEffect(() => {
    // Fetch tags on component mount
    const fetchTags = async () => {
      try {
        const response = await api.get('/tags');
        setTags(response.data.tags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
    applySearch();  // Fetch files on initial load
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

      <FilterContainer>
        <input
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && applySearch()}
        />

        <div>
          <label>Date Range: </label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="Start Date" />
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} placeholderText="End Date" />
        </div>

        <div>
          <label>Media Type: </label>
          <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
            <option value="">All</option>
            <option value="image">Images</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div>
          <label>Tags: </label>
          <select multiple value={tags} onChange={(e) => setTags([...e.target.selectedOptions].map(o => o.value))}>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.name}>{tag.name}</option>
            ))}
          </select>
        </div>

        <button onClick={applySearch}>Apply Filters</button>
      </FilterContainer>

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
          <Pie data={{
            labels: ['Images', 'Audio', 'Videos'],
            datasets: [{
              data: [mediaSummary.images, mediaSummary.audio, mediaSummary.video],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            }],
          }} style={{ width: '100%', height: '300px' }} />
        </div>

        {/* Day-wise Uploads Bar Chart */}
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2>Uploads Per Day</h2>
          <Bar data={{
            labels: Object.keys(uploadsPerDay),
            datasets: [{ label: 'Uploads Per Day', data: Object.values(uploadsPerDay), backgroundColor: '#36A2EB' }],
          }} style={{ width: '100%', height: '300px' }} />
        </div>

        {/* Week-wise Uploads Bar Chart */}
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2>Uploads Per Week</h2>
          <Bar data={{
            labels: Object.keys(uploadsPerWeek),
            datasets: [{ label: 'Uploads Per Week', data: Object.values(uploadsPerWeek), backgroundColor: '#FFCE56' }],
          }} style={{ width: '100%', height: '300px' }} />
        </div>
      </WidgetContainer>
    </DashboardContainer>
  );
}

export default Dashboard;
