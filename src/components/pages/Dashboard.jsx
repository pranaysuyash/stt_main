
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faChevronDown, faChevronUp, faBug } from '@fortawesome/free-solid-svg-icons';
import Notification from '../common/Notification';
import api from '../../utils/api';
import { formatInTimeZone } from 'date-fns-tz';
import { toDate } from 'date-fns'; // Correct import
import { enUS } from 'date-fns/locale';
import { startOfDay, endOfDay } from 'date-fns';
import { parseISO } from 'date-fns';




const DashboardContainer = styled.div`
  padding: 2rem;
  background-color: #f8f9fa;
`;

const Header = styled.h1`
  color: #343a40;
  margin-bottom: 1.5rem;
`;

const FilterSection = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SearchInput = styled.div`
  flex-grow: 1;
  position: relative;
  input {
    width: 100%;
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
  }
  .icon {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6c757d;
  }
`;

const AdvancedFilters = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  margin-top: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: white;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  &:hover {
    background-color: #0056b3;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #343a40;
`;

const StatLabel = styled.div`
  color: #6c757d;
  margin-top: 0.5rem;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ChartCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const ChartTitle = styled.h3`
  margin-bottom: 1rem;
  color: #343a40;
`;

const ChartContainer = styled.div`
  flex-grow: 1;
  position: relative;
`;

const StorageBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
`;

const StorageUsed = styled.div`
  width: ${props => props.percentage}%;
  height: 100%;
  background-color: ${props => props.percentage > 80 ? '#dc3545' : '#28a745'};
  border-radius: 10px;
`;

const DebugSection = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 4px;
  white-space: pre-wrap;
`;

function Dashboard() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [mediaSummary, setMediaSummary] = useState({ images: 0, audio: 0, video: 0 });
  const [uploadsPerDay, setUploadsPerDay] = useState({});
  const [uploadsPerWeek, setUploadsPerWeek] = useState({});
  const [totalUploads, setTotalUploads] = useState(0);
  const [storageUsed, setStorageUsed] = useState(0);
  const [storageLimit] = useState(1000);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [mediaType, setMediaType] = useState('');
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterMediaType, setFilterMediaType] = useState({ images: true, audio: true, video: true });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  const [showDebug, setShowDebug] = useState(false);
  
    // Initialize timezone to 'Asia/Kolkata'
    const [timeZone, setTimeZone] = useState(() => {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return tz || 'Asia/Kolkata'; // Default to 'Asia/Kolkata' if undefined
    });
  
    // Inside the Dashboard component
const applySearch = () => {
  let utcStartDate = '';
  let utcEndDate = '';

  if (startDate) {
    const localStart = startOfDay(startDate); // 00:00:00 on selected day in local timezone
    utcStartDate = formatInTimeZone(localStart, 'UTC', "yyyy-MM-dd'T'HH:mm:ss'Z'");
  }

  if (endDate) {
    const localEnd = endOfDay(endDate); // 23:59:59 on selected day in local timezone
    utcEndDate = formatInTimeZone(localEnd, 'UTC', "yyyy-MM-dd'T'HH:mm:ss'Z'");
  }

  const params = {
    search: searchTerm,
    start_date: utcStartDate,
    end_date: utcEndDate,
    media_type: mediaType,
    tags: tags.join(','),
  };

    
      api.get('/file_history', { params })
        .then((response) => {
          const files = response.data.files;
          const localFiles = files.map(file => {
            let uploadedAtString = file.uploaded_at;
  
            // Append 'Z' if it's missing to treat it as UTC
            if (!uploadedAtString.endsWith('Z')) {
              uploadedAtString += 'Z';
            }
  
            let uploadedAt = new Date(uploadedAtString);
    
            // If the uploaded_at is a valid date, convert to the local timezone
            if (!isNaN(uploadedAt.getTime())) {
              const formattedDate = formatInTimeZone(uploadedAt, timeZone, 'yyyy-MM-dd HH:mm:ss', { locale: enUS });
              
              // Enhanced Debug Logging
              console.log(`File: ${file.filename}`);
              console.log(`Original uploaded_at: ${file.uploaded_at}`);
              console.log(`Parsed Date object: ${uploadedAt.toISOString()}`);
              console.log(`Formatted Local Date: ${formattedDate}`);
              console.log(`Applied Timezone: ${timeZone}`);
              console.log('-------------------------');
    
              return {
                ...file,
                uploadedAtFormatted: formattedDate, // New property for formatted date
                uploadedAtDate: uploadedAt, // New property preserving the Date object
              };
            } else {
              // Invalid date, handle it gracefully
              setDebugInfo(`Invalid date format for file: ${file.filename}`);
              return { ...file, uploadedAtFormatted: 'Invalid date' };
            }
          });
          setUploadedFiles(localFiles);
          processData(localFiles);
          verifyData(localFiles);
        })
        .catch((error) => {
          console.error('Error fetching file history:', error);
          setNotification({ message: 'Failed to fetch file history.', type: 'error' });
          setDebugInfo(`Error fetching data: ${error.message}`);
        });
    };

    const processData = (files) => {
      const summary = files.reduce(
        (acc, file) => {
          if (file.type.startsWith('image') && filterMediaType.images) acc.images += 1;
          if (file.type.startsWith('audio') && filterMediaType.audio) acc.audio += 1;
          if (file.type.startsWith('video') && filterMediaType.video) acc.video += 1;
          return acc;
        },
        { images: 0, audio: 0, video: 0 }
      );
      setMediaSummary(summary);
    
      setTotalUploads(files.length);
      const totalStorage = files.reduce((acc, file) => acc + file.size, 0);
      setStorageUsed(totalStorage / 1024 / 1024); // Converting size to MB
    
      const sortedFiles = [...files].sort((a, b) => sortOrder === 'asc'
        ? a.uploadedAtDate - b.uploadedAtDate
        : b.uploadedAtDate - a.uploadedAtDate
      );
    
      const dayWiseUploads = sortedFiles.reduce((acc, file) => {
        const uploadDate = formatInTimeZone(file.uploadedAtDate, timeZone, 'yyyy-MM-dd');
        acc[uploadDate] = (acc[uploadDate] || 0) + 1;
        return acc;
      }, {});
      
      const today = formatInTimeZone(new Date(), timeZone, 'yyyy-MM-dd');
      if (!dayWiseUploads[today]) {
        dayWiseUploads[today] = 0;
      }
    
      setUploadsPerDay(dayWiseUploads);
    
      const weekWiseUploads = sortedFiles.reduce((acc, file) => {
        const week = formatInTimeZone(file.uploadedAtDate, timeZone, 'yyyy-ww');
        acc[week] = (acc[week] || 0) + 1;
        return acc;
      }, {});
      
      const currentWeek = formatInTimeZone(new Date(), timeZone, 'yyyy-ww');
      if (!weekWiseUploads[currentWeek]) {
        weekWiseUploads[currentWeek] = 0;
      }
    
      setUploadsPerWeek(weekWiseUploads);
    };
    
  
    const verifyData = (files) => {
      let debugOutput = 'Data Verification Results:\n';
      debugOutput += `Current Time Zone: ${timeZone}\n`;
      debugOutput += `Local Time: ${formatInTimeZone(new Date(), timeZone, 'yyyy-MM-dd HH:mm:ss zzz')}\n\n`;
    
      debugOutput += `Total files received: ${files.length}\n`;
    
      const today = formatInTimeZone(new Date(), timeZone, 'yyyy-MM-dd');
      const todayUploads = files.filter(file => 
        formatInTimeZone(file.uploadedAtDate, timeZone, 'yyyy-MM-dd') === today
      );
      debugOutput += `Uploads for today (${today}): ${todayUploads.length}\n`;
    
      const filesWithoutDates = files.filter(file => !file.uploadedAtDate);
      debugOutput += `Files without upload dates: ${filesWithoutDates.length}\n`;
    
      const futureFiles = files.filter(file => file.uploadedAtDate > new Date());
      debugOutput += `Files with future upload dates: ${futureFiles.length}\n`;
    
      const recentUploads = files.slice(-5).map(file => 
        `${file.filename} (${file.uploadedAtFormatted})`
      ).join('\n');
      debugOutput += `5 most recent uploads:\n${recentUploads}\n`;
    
      setDebugInfo(debugOutput);
    };
    
  

  useEffect(() => {
    applySearch();
  }, [sortOrder, filterMediaType, timeZone]);

  const toggleFilter = (type) => {
    setFilterMediaType(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 }
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <DashboardContainer>
      <Header>Dashboard</Header>
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: 'success' })}
        />
      )}
      <FilterSection>
        <FilterBar>
          <SearchInput>
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && applySearch()}
            />
            <FontAwesomeIcon icon={faSearch} className="icon" />
          </SearchInput>
          <Button onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
            <FontAwesomeIcon icon={showAdvancedFilters ? faChevronUp : faChevronDown} />
            {showAdvancedFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </FilterBar>

        <AdvancedFilters isOpen={showAdvancedFilters}>
          <FilterGroup>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Start Date"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="End Date"
            />
            <Select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
              <option value="">All Media Types</option>
              <option value="image">Images</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
            </Select>
            <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="asc">Oldest First</option>
              <option value="desc">Newest First</option>
            </Select>
            <Select value={timeZone} onChange={(e) => setTimeZone(e.target.value)}>
              {Intl.supportedValuesOf('timeZone').map(tz => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </Select>
          </FilterGroup>
          <CheckboxContainer>
            <label>
              <input
                type="checkbox"
                checked={filterMediaType.images}
                onChange={() => toggleFilter('images')}
              />
              Images
            </label>
            <label>
              <input
                type="checkbox"
                checked={filterMediaType.audio}
                onChange={() => toggleFilter('audio')}
              />
              Audio
            </label>
            <label>
              <input
                type="checkbox"
                checked={filterMediaType.video}
                onChange={() => toggleFilter('video')}
              />
              Videos
            </label>
          </CheckboxContainer>
          <Button onClick={applySearch}>
            <FontAwesomeIcon icon={faFilter} /> Apply Filters
          </Button>
        </AdvancedFilters>
      </FilterSection>
      <StatsGrid>
        <StatCard>
          <StatValue>{totalUploads}</StatValue>
          <StatLabel>Total Uploads</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{storageUsed.toFixed(2)} MB / {storageLimit} MB</StatValue>
          <StatLabel>Storage Used</StatLabel>
          <StorageBar>
            <StorageUsed percentage={(storageUsed / storageLimit) * 100} />
          </StorageBar>
        </StatCard>
      </StatsGrid>

      <ChartGrid>
        <ChartCard>
          <ChartTitle>Media Summary</ChartTitle>
          <ChartContainer>
            <Pie
              data={{
                labels: ['Images', 'Audio', 'Videos'],
                datasets: [{
                  data: [mediaSummary.images, mediaSummary.audio, mediaSummary.video],
                  backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
                }],
              }}
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  }
                }
              }}
            />
          </ChartContainer>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Uploads Per Day</ChartTitle>
          <ChartContainer>
            <Bar
              data={{
                labels: Object.keys(uploadsPerDay).slice(-7),
                datasets: [{
                  label: 'Uploads',
                  data: Object.values(uploadsPerDay).slice(-7),
                  backgroundColor: '#36a2eb',
                }],
              }}
              options={barChartOptions}
            />
          </ChartContainer>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Uploads Per Week</ChartTitle>
          <ChartContainer>
            <Bar
              data={{
                labels: Object.keys(uploadsPerWeek).slice(-4),
                datasets: [{
                  label: 'Uploads',
                  data: Object.values(uploadsPerWeek).slice(-4),
                  backgroundColor: '#ffce56',
                }],
              }}
              options={barChartOptions}
            />
          </ChartContainer>
        </ChartCard>
      </ChartGrid>

      <Button onClick={() => setShowDebug(!showDebug)}>
        <FontAwesomeIcon icon={faBug} /> {showDebug ? 'Hide Debug Info' : 'Show Debug Info'}
      </Button>

      {showDebug && (
        <DebugSection>
          <h4>Debug Information</h4>
          <pre>{debugInfo}</pre>
        </DebugSection>
      )}
    </DashboardContainer>
  );
}

export default Dashboard;
