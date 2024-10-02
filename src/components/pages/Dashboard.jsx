// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import styled from 'styled-components';
// // // // // // import { Pie, Bar } from 'react-chartjs-2';
// // // // // // import 'chart.js/auto';
// // // // // // import DatePicker from 'react-datepicker'; // Assuming you have react-datepicker installed
// // // // // // import 'react-datepicker/dist/react-datepicker.css';
// // // // // // import Notification from '../common/Notification';
// // // // // // import api from '../../utils/api'; // Import the api instance

// // // // // // const DashboardContainer = styled.div`
// // // // // //   padding: 20px;
// // // // // // `;

// // // // // // const WidgetContainer = styled.div`
// // // // // //   display: grid;
// // // // // //   grid-template-columns: 1fr 1fr;
// // // // // //   grid-gap: 20px;
// // // // // // `;

// // // // // // const FilterContainer = styled.div`
// // // // // //   margin-bottom: 20px;
// // // // // //   display: flex;
// // // // // //   justify-content: space-between;
// // // // // // `;

// // // // // // function Dashboard() {
// // // // // //   const [uploadedFiles, setUploadedFiles] = useState([]);
// // // // // //   const [notification, setNotification] = useState({ message: '', type: 'success' });
// // // // // //   const [mediaSummary, setMediaSummary] = useState({ images: 0, audio: 0, video: 0 });
// // // // // //   const [uploadsPerDay, setUploadsPerDay] = useState({});
// // // // // //   const [uploadsPerWeek, setUploadsPerWeek] = useState({});
// // // // // //   const [totalUploads, setTotalUploads] = useState(0);
// // // // // //   const [storageUsed, setStorageUsed] = useState(0);
// // // // // //   const [storageLimit, setStorageLimit] = useState(1000); // Assuming 1000MB as a limit for now
// // // // // //   const [startDate, setStartDate] = useState(null);
// // // // // //   const [endDate, setEndDate] = useState(null);
// // // // // //   const [mediaType, setMediaType] = useState('');
// // // // // //   const [tags, setTags] = useState([]);
// // // // // //   const [searchTerm, setSearchTerm] = useState(''); // Define searchTerm in state

// // // // // //   const applySearch = () => {
// // // // // //     const params = {
// // // // // //       search: searchTerm,  // Include the search term in the request
// // // // // //       start_date: startDate ? startDate.toISOString().split('T')[0] : '',
// // // // // //       end_date: endDate ? endDate.toISOString().split('T')[0] : '',
// // // // // //       media_type: mediaType,
// // // // // //       tags: tags.join(',')
// // // // // //     };
// // // // // //   // Fetch available tags from API
// // // // // //   // const fetchTags = async () => {
// // // // // //   //   try {
// // // // // //   //     const response = await api.get('/tags');
// // // // // //   //     return response.data.tags;
// // // // // //   //   } catch (error) {
// // // // // //   //     console.error('Error fetching tags:', error);
// // // // // //   //   }
// // // // // //   // };

// // // // // //   // const applyFilters = () => {
// // // // // //   //   const params = {
// // // // // //   //     start_date: startDate ? startDate.toISOString().split('T')[0] : '',
// // // // // //   //     end_date: endDate ? endDate.toISOString().split('T')[0] : '',
// // // // // //   //     media_type: mediaType,
// // // // // //   //     tags: tags.join(',')
// // // // // //   //   };

// // // // // //     api.get('/file_history', { params })
// // // // // //       .then((response) => {
// // // // // //         const files = response.data.files;
// // // // // //         setUploadedFiles(files);

// // // // // //         // Process and categorize media files
// // // // // //         const summary = files.reduce(
// // // // // //           (acc, file) => {
// // // // // //             if (file.type.startsWith('image')) acc.images += 1;
// // // // // //             if (file.type.startsWith('audio')) acc.audio += 1;
// // // // // //             if (file.type.startsWith('video')) acc.video += 1;
// // // // // //             return acc;
// // // // // //           },
// // // // // //           { images: 0, audio: 0, video: 0 }
// // // // // //         );
// // // // // //         setMediaSummary(summary);

// // // // // //         // Calculate total uploads and storage usage
// // // // // //         setTotalUploads(files.length);
// // // // // //         const totalStorage = files.reduce((acc, file) => acc + file.size, 0);
// // // // // //         setStorageUsed(totalStorage / 1024 / 1024); // Convert to MB

// // // // // //         // Calculate day-wise and week-wise uploads
// // // // // //         const dayWiseUploads = files.reduce((acc, file) => {
// // // // // //           const uploadDate = new Date(file.uploaded_at).toLocaleDateString();
// // // // // //           acc[uploadDate] = (acc[uploadDate] || 0) + 1;
// // // // // //           return acc;
// // // // // //         }, {});
// // // // // //         setUploadsPerDay(dayWiseUploads);

// // // // // //         const weekWiseUploads = files.reduce((acc, file) => {
// // // // // //           const weekStart = new Date(file.uploaded_at);
// // // // // //           const week = `${weekStart.getFullYear()}-W${Math.ceil(weekStart.getDate() / 7)}`;
// // // // // //           acc[week] = (acc[week] || 0) + 1;
// // // // // //           return acc;
// // // // // //         }, {});
// // // // // //         setUploadsPerWeek(weekWiseUploads);
// // // // // //       })
// // // // // //       .catch((error) => {
// // // // // //         console.error('Error fetching file history:', error);
// // // // // //         setNotification({ message: 'Failed to fetch file history.', type: 'error' });
// // // // // //       });
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     // Fetch tags on component mount
// // // // // //     const fetchTags = async () => {
// // // // // //       try {
// // // // // //         const response = await api.get('/tags');
// // // // // //         setTags(response.data.tags);
// // // // // //       } catch (error) {
// // // // // //         console.error('Error fetching tags:', error);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchTags();
// // // // // //     applySearch();  // Fetch files on initial load
// // // // // //   }, []);

// // // // // //   return (
// // // // // //     <DashboardContainer>
// // // // // //       <h1>Dashboard</h1>
// // // // // //       {notification.message && (
// // // // // //         <Notification
// // // // // //           message={notification.message}
// // // // // //           type={notification.type}
// // // // // //           onClose={() => setNotification({ message: '', type: 'success' })}
// // // // // //         />
// // // // // //       )}
// // // // // //             <FilterContainer>

// // // // // // <input
// // // // // //   type="text"
// // // // // //   placeholder="Search files..."
// // // // // //   value={searchTerm}
// // // // // //   onChange={(e) => setSearchTerm(e.target.value)}
// // // // // //   onKeyPress={(e) => e.key === 'Enter' && applySearch()}
// // // // // // />


// // // // // //         <div>
// // // // // //           <label>Date Range: </label>
// // // // // //           <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="Start Date" />
// // // // // //           <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} placeholderText="End Date" />
// // // // // //         </div>

// // // // // //         <div>
// // // // // //           <label>Media Type: </label>
// // // // // //           <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
// // // // // //             <option value="">All</option>
// // // // // //             <option value="image">Images</option>
// // // // // //             <option value="audio">Audio</option>
// // // // // //             <option value="video">Video</option>
// // // // // //           </select>
// // // // // //         </div>

// // // // // //         <div>
// // // // // //           <label>Tags: </label>
// // // // // //           <select multiple value={tags} onChange={(e) => setTags([...e.target.selectedOptions].map(o => o.value))}>
// // // // // //             {tags.map((tag) => (
// // // // // //               <option key={tag.id} value={tag.name}>{tag.name}</option>
// // // // // //             ))}
// // // // // //           </select>
// // // // // //         </div>

// // // // // //         <button onClick={applySearch}>Apply Filters</button>
// // // // // //       </FilterContainer>

// // // // // //       {/* Charts */}
// // // // // //       <WidgetContainer>
// // // // // //         {/* Total Uploads */}
// // // // // //         <div>
// // // // // //           <h2>Total Uploads: {totalUploads}</h2>
// // // // // //         </div>

// // // // // //         {/* Storage Usage */}
// // // // // //         <div>
// // // // // //           <h2>Storage Used: {storageUsed.toFixed(2)} MB / {storageLimit} MB</h2>
// // // // // //           <div style={{ width: '100%', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '5px' }}>
// // // // // //             <div
// // // // // //               style={{
// // // // // //                 width: `${(storageUsed / storageLimit) * 100}%`,
// // // // // //                 height: '100%',
// // // // // //                 backgroundColor: storageUsed / storageLimit > 0.8 ? 'red' : '#36A2EB',
// // // // // //                 borderRadius: '5px'
// // // // // //               }}
// // // // // //             />
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Pie Chart for Media Summary */}
// // // // // //         <div style={{ maxWidth: '400px', margin: '0 auto' }}>
// // // // // //           <h2>Media Summary</h2>
// // // // // //           <Pie data={{
// // // // // //             labels: ['Images', 'Audio', 'Videos'],
// // // // // //             datasets: [{
// // // // // //               data: [mediaSummary.images, mediaSummary.audio, mediaSummary.video],
// // // // // //               backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
// // // // // //             }],
// // // // // //           }} style={{ width: '100%', height: '300px' }} />
// // // // // //         </div>

// // // // // //         {/* Day-wise Uploads Bar Chart */}
// // // // // //         <div style={{ maxWidth: '600px', margin: '0 auto' }}>
// // // // // //           <h2>Uploads Per Day</h2>
// // // // // //           <Bar data={{
// // // // // //             labels: Object.keys(uploadsPerDay),
// // // // // //             datasets: [{ label: 'Uploads Per Day', data: Object.values(uploadsPerDay), backgroundColor: '#36A2EB' }],
// // // // // //           }} style={{ width: '100%', height: '300px' }} />
// // // // // //         </div>

// // // // // //         {/* Week-wise Uploads Bar Chart */}
// // // // // //         <div style={{ maxWidth: '600px', margin: '0 auto' }}>
// // // // // //           <h2>Uploads Per Week</h2>
// // // // // //           <Bar data={{
// // // // // //             labels: Object.keys(uploadsPerWeek),
// // // // // //             datasets: [{ label: 'Uploads Per Week', data: Object.values(uploadsPerWeek), backgroundColor: '#FFCE56' }],
// // // // // //           }} style={{ width: '100%', height: '300px' }} />
// // // // // //         </div>
// // // // // //       </WidgetContainer>
// // // // // //     </DashboardContainer>
// // // // // //   );
// // // // // // }

// // // // // // export default Dashboard;

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import styled from 'styled-components';
// // // // // import { Pie, Bar } from 'react-chartjs-2';
// // // // // import 'chart.js/auto';
// // // // // import DatePicker from 'react-datepicker'; // Assuming you have react-datepicker installed
// // // // // import 'react-datepicker/dist/react-datepicker.css';
// // // // // import Notification from '../common/Notification';
// // // // // import api from '../../utils/api'; // Import the api instance

// // // // // const DashboardContainer = styled.div`
// // // // //   padding: 20px;
// // // // // `;

// // // // // const WidgetContainer = styled.div`
// // // // //   display: grid;
// // // // //   grid-template-columns: 1fr 1fr;
// // // // //   grid-gap: 20px;
// // // // // `;

// // // // // const FilterContainer = styled.div`
// // // // //   margin-bottom: 20px;
// // // // //   display: flex;
// // // // //   justify-content: space-between;
// // // // // `;

// // // // // function Dashboard() {
// // // // //   const [uploadedFiles, setUploadedFiles] = useState([]);
// // // // //   const [notification, setNotification] = useState({ message: '', type: 'success' });
// // // // //   const [mediaSummary, setMediaSummary] = useState({ images: 0, audio: 0, video: 0 });
// // // // //   const [uploadsPerDay, setUploadsPerDay] = useState({});
// // // // //   const [uploadsPerWeek, setUploadsPerWeek] = useState({});
// // // // //   const [totalUploads, setTotalUploads] = useState(0);
// // // // //   const [storageUsed, setStorageUsed] = useState(0);
// // // // //   const [storageLimit, setStorageLimit] = useState(1000); // Assuming 1000MB as a limit for now
// // // // //   const [startDate, setStartDate] = useState(null);
// // // // //   const [endDate, setEndDate] = useState(null);
// // // // //   const [mediaType, setMediaType] = useState('');
// // // // //   const [tags, setTags] = useState([]);
// // // // //   const [searchTerm, setSearchTerm] = useState(''); // Define searchTerm in state

// // // // //   const applySearch = () => {
// // // // //     const params = {
// // // // //       search: searchTerm,  // Include the search term in the request
// // // // //       start_date: startDate ? startDate.toISOString().split('T')[0] : '',
// // // // //       end_date: endDate ? endDate.toISOString().split('T')[0] : '',
// // // // //       media_type: mediaType,
// // // // //       tags: tags.join(',')
// // // // //     };

// // // // //     api.get('/file_history', { params })
// // // // //       .then((response) => {
// // // // //         const files = response.data.files;
// // // // //         setUploadedFiles(files);

// // // // //         // Process and categorize media files
// // // // //         const summary = files.reduce(
// // // // //           (acc, file) => {
// // // // //             if (file.type.startsWith('image')) acc.images += 1;
// // // // //             if (file.type.startsWith('audio')) acc.audio += 1;
// // // // //             if (file.type.startsWith('video')) acc.video += 1;
// // // // //             return acc;
// // // // //           },
// // // // //           { images: 0, audio: 0, video: 0 }
// // // // //         );
// // // // //         setMediaSummary(summary);

// // // // //         // Calculate total uploads and storage usage
// // // // //         setTotalUploads(files.length);
// // // // //         const totalStorage = files.reduce((acc, file) => acc + file.size, 0);
// // // // //         setStorageUsed(totalStorage / 1024 / 1024); // Convert to MB

// // // // //         // Calculate day-wise and week-wise uploads
// // // // //         const dayWiseUploads = files.reduce((acc, file) => {
// // // // //           const uploadDate = new Date(file.uploaded_at).toLocaleDateString();
// // // // //           acc[uploadDate] = (acc[uploadDate] || 0) + 1;
// // // // //           return acc;
// // // // //         }, {});
// // // // //         setUploadsPerDay(dayWiseUploads);

// // // // //         const weekWiseUploads = files.reduce((acc, file) => {
// // // // //           const weekStart = new Date(file.uploaded_at);
// // // // //           const week = `${weekStart.getFullYear()}-W${Math.ceil(weekStart.getDate() / 7)}`;
// // // // //           acc[week] = (acc[week] || 0) + 1;
// // // // //           return acc;
// // // // //         }, {});
// // // // //         setUploadsPerWeek(weekWiseUploads);
// // // // //       })
// // // // //       .catch((error) => {
// // // // //         console.error('Error fetching file history:', error);
// // // // //         setNotification({ message: 'Failed to fetch file history.', type: 'error' });
// // // // //       });
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     // Fetch tags on component mount
// // // // //     const fetchTags = async () => {
// // // // //       try {
// // // // //         const response = await api.get('/tags');
// // // // //         setTags(response.data.tags);
// // // // //       } catch (error) {
// // // // //         console.error('Error fetching tags:', error);
// // // // //       }
// // // // //     };

// // // // //     fetchTags();
// // // // //     applySearch();  // Fetch files on initial load
// // // // //   }, []);

// // // // //   return (
// // // // //     <DashboardContainer>
// // // // //       <h1>Dashboard</h1>
// // // // //       {notification.message && (
// // // // //         <Notification
// // // // //           message={notification.message}
// // // // //           type={notification.type}
// // // // //           onClose={() => setNotification({ message: '', type: 'success' })}
// // // // //         />
// // // // //       )}
// // // // //       <FilterContainer>

// // // // //         <input
// // // // //           type="text"
// // // // //           placeholder="Search files..."
// // // // //           value={searchTerm}  // Link searchTerm to input value
// // // // //           onChange={(e) => setSearchTerm(e.target.value)}  // Update state on input change
// // // // //           onKeyPress={(e) => e.key === 'Enter' && applySearch()}  // Trigger search on Enter key
// // // // //         />

// // // // //         <div>
// // // // //           <label>Date Range: </label>
// // // // //           <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="Start Date" />
// // // // //           <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} placeholderText="End Date" />
// // // // //         </div>

// // // // //         <div>
// // // // //           <label>Media Type: </label>
// // // // //           <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
// // // // //             <option value="">All</option>
// // // // //             <option value="image">Images</option>
// // // // //             <option value="audio">Audio</option>
// // // // //             <option value="video">Video</option>
// // // // //           </select>
// // // // //         </div>

// // // // //         <div>
// // // // //           <label>Tags: </label>
// // // // //           <select multiple value={tags} onChange={(e) => setTags([...e.target.selectedOptions].map(o => o.value))}>
// // // // //             {tags.map((tag) => (
// // // // //               <option key={tag.id} value={tag.name}>{tag.name}</option>
// // // // //             ))}
// // // // //           </select>
// // // // //         </div>

// // // // //         <button onClick={applySearch}>Apply Filters</button>
// // // // //       </FilterContainer>

// // // // //       {/* Charts */}
// // // // //       <WidgetContainer>
// // // // //         {/* Total Uploads */}
// // // // //         <div>
// // // // //           <h2>Total Uploads: {totalUploads}</h2>
// // // // //         </div>

// // // // //         {/* Storage Usage */}
// // // // //         <div>
// // // // //           <h2>Storage Used: {storageUsed.toFixed(2)} MB / {storageLimit} MB</h2>
// // // // //           <div style={{ width: '100%', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '5px' }}>
// // // // //             <div
// // // // //               style={{
// // // // //                 width: `${(storageUsed / storageLimit) * 100}%`,
// // // // //                 height: '100%',
// // // // //                 backgroundColor: storageUsed / storageLimit > 0.8 ? 'red' : '#36A2EB',
// // // // //                 borderRadius: '5px'
// // // // //               }}
// // // // //             />
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Pie Chart for Media Summary */}
// // // // //         <div style={{ maxWidth: '400px', margin: '0 auto' }}>
// // // // //           <h2>Media Summary</h2>
// // // // //           <Pie data={{
// // // // //             labels: ['Images', 'Audio', 'Videos'],
// // // // //             datasets: [{
// // // // //               data: [mediaSummary.images, mediaSummary.audio, mediaSummary.video],
// // // // //               backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
// // // // //             }],
// // // // //           }} style={{ width: '100%', height: '300px' }} />
// // // // //         </div>

// // // // //         {/* Day-wise Uploads Bar Chart */}
// // // // //         <div style={{ maxWidth: '600px', margin: '0 auto' }}>
// // // // //           <h2>Uploads Per Day</h2>
// // // // //           <Bar data={{
// // // // //             labels: Object.keys(uploadsPerDay),
// // // // //             datasets: [{ label: 'Uploads Per Day', data: Object.values(uploadsPerDay), backgroundColor: '#36A2EB' }],
// // // // //           }} style={{ width: '100%', height: '300px' }} />
// // // // //         </div>

// // // // //         {/* Week-wise Uploads Bar Chart */}
// // // // //         <div style={{ maxWidth: '600px', margin: '0 auto' }}>
// // // // //           <h2>Uploads Per Week</h2>
// // // // //           <Bar data={{
// // // // //             labels: Object.keys(uploadsPerWeek),
// // // // //             datasets: [{ label: 'Uploads Per Week', data: Object.values(uploadsPerWeek), backgroundColor: '#FFCE56' }],
// // // // //           }} style={{ width: '100%', height: '300px' }} />
// // // // //         </div>
// // // // //       </WidgetContainer>
// // // // //     </DashboardContainer>
// // // // //   );
// // // // // }

// // // // // export default Dashboard;


// // // // import React, { useState, useEffect } from 'react';
// // // // import styled from 'styled-components';
// // // // import { Pie, Bar } from 'react-chartjs-2';
// // // // import 'chart.js/auto';
// // // // import DatePicker from 'react-datepicker';
// // // // import 'react-datepicker/dist/react-datepicker.css';
// // // // import Notification from '../common/Notification';
// // // // import api from '../../utils/api';

// // // // const DashboardContainer = styled.div`
// // // //   padding: 20px;
// // // // `;

// // // // const WidgetContainer = styled.div`
// // // //   display: grid;
// // // //   grid-template-columns: 1fr 1fr;
// // // //   grid-gap: 20px;
// // // // `;

// // // // const FilterContainer = styled.div`
// // // //   margin-bottom: 20px;
// // // //   display: flex;
// // // //   justify-content: space-between;
// // // // `;

// // // // function Dashboard() {
// // // //   const [uploadedFiles, setUploadedFiles] = useState([]);
// // // //   const [notification, setNotification] = useState({ message: '', type: 'success' });
// // // //   const [mediaSummary, setMediaSummary] = useState({ images: 0, audio: 0, video: 0 });
// // // //   const [uploadsPerDay, setUploadsPerDay] = useState({});
// // // //   const [uploadsPerWeek, setUploadsPerWeek] = useState({});
// // // //   const [totalUploads, setTotalUploads] = useState(0);
// // // //   const [storageUsed, setStorageUsed] = useState(0);
// // // //   const [storageLimit, setStorageLimit] = useState(1000); // Assuming 1000MB as a limit for now
// // // //   const [startDate, setStartDate] = useState(null);
// // // //   const [endDate, setEndDate] = useState(null);
// // // //   const [mediaType, setMediaType] = useState('');
// // // //   const [tags, setTags] = useState([]);
// // // //   const [searchTerm, setSearchTerm] = useState(''); // Fixed: Add state for searchTerm
// // // //   const [sortOrder, setSortOrder] = useState('asc'); // New state for sorting order
// // // //   const [filterMediaType, setFilterMediaType] = useState({ images: true, audio: true, video: true }); // Filter control

// // // //   const applySearch = () => {
// // // //     const params = {
// // // //       search: searchTerm,
// // // //       start_date: startDate ? startDate.toISOString().split('T')[0] : '',
// // // //       end_date: endDate ? endDate.toISOString().split('T')[0] : '',
// // // //       media_type: mediaType,
// // // //       tags: tags.join(','),
// // // //     };

// // // //     api.get('/file_history', { params })
// // // //       .then((response) => {
// // // //         const files = response.data.files;
// // // //         setUploadedFiles(files);

// // // //         // Process and categorize media files
// // // //         const summary = files.reduce(
// // // //           (acc, file) => {
// // // //             if (file.type.startsWith('image') && filterMediaType.images) acc.images += 1;
// // // //             if (file.type.startsWith('audio') && filterMediaType.audio) acc.audio += 1;
// // // //             if (file.type.startsWith('video') && filterMediaType.video) acc.video += 1;
// // // //             return acc;
// // // //           },
// // // //           { images: 0, audio: 0, video: 0 }
// // // //         );
// // // //         setMediaSummary(summary);

// // // //         setTotalUploads(files.length);
// // // //         const totalStorage = files.reduce((acc, file) => acc + file.size, 0);
// // // //         setStorageUsed(totalStorage / 1024 / 1024); // Convert to MB

// // // //         // Sort data by date
// // // //         const sortedFiles = files.sort((a, b) => sortOrder === 'asc'
// // // //           ? new Date(a.uploaded_at) - new Date(b.uploaded_at)
// // // //           : new Date(b.uploaded_at) - new Date(a.uploaded_at));

// // // //         // Calculate day-wise and week-wise uploads
// // // //         const dayWiseUploads = sortedFiles.reduce((acc, file) => {
// // // //           const uploadDate = new Date(file.uploaded_at).toLocaleDateString();
// // // //           acc[uploadDate] = (acc[uploadDate] || 0) + 1;
// // // //           return acc;
// // // //         }, {});
// // // //         setUploadsPerDay(dayWiseUploads);

// // // //         const weekWiseUploads = sortedFiles.reduce((acc, file) => {
// // // //           const weekStart = new Date(file.uploaded_at);
// // // //           const week = `${weekStart.getFullYear()}-W${Math.ceil(weekStart.getDate() / 7)}`;
// // // //           acc[week] = (acc[week] || 0) + 1;
// // // //           return acc;
// // // //         }, {});
// // // //         setUploadsPerWeek(weekWiseUploads);
// // // //       })
// // // //       .catch((error) => {
// // // //         setNotification({ message: 'Failed to fetch file history.', type: 'error' });
// // // //       });
// // // //   };

// // // //   useEffect(() => {
// // // //     applySearch();
// // // //   }, [sortOrder, filterMediaType]);

// // // //   const toggleFilter = (type) => {
// // // //     setFilterMediaType((prev) => ({ ...prev, [type]: !prev[type] }));
// // // //   };

// // // //   return (
// // // //     <DashboardContainer>
// // // //       <h1>Dashboard</h1>
// // // //       {notification.message && (
// // // //         <Notification
// // // //           message={notification.message}
// // // //           type={notification.type}
// // // //           onClose={() => setNotification({ message: '', type: 'success' })}
// // // //         />
// // // //       )}
// // // //      <FilterContainer>
// // // //         <input
// // // //           type="text"
// // // //           placeholder="Search files..."
// // // //           value={searchTerm}  // Fixed: Bind searchTerm to input value
// // // //           onChange={(e) => setSearchTerm(e.target.value)}  // Fixed: Update searchTerm state on input
// // // //           onKeyPress={(e) => e.key === 'Enter' && applySearch()}  // Trigger search on "Enter" key
// // // //         />

// // // //         <div>
// // // //           <label>Date Range: </label>
// // // //           <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="Start Date" />
// // // //           <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} placeholderText="End Date" />
// // // //         </div>

// // // //         <div>
// // // //           <label>Media Type: </label>
// // // //           <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
// // // //             <option value="">All</option>
// // // //             <option value="image">Images</option>
// // // //             <option value="audio">Audio</option>
// // // //             <option value="video">Video</option>
// // // //           </select>
// // // //         </div>

// // // //         <div>
// // // //           <label>Tags: </label>
// // // //           <select multiple value={tags} onChange={(e) => setTags([...e.target.selectedOptions].map(o => o.value))}>
// // // //             {tags.map((tag) => (
// // // //               <option key={tag.id} value={tag.name}>{tag.name}</option>
// // // //             ))}
// // // //           </select>
// // // //         </div>

// // // //         <button onClick={applySearch}>Apply Filters</button>
// // // //       </FilterContainer>

// // // //       {/* Sorting */}
// // // //       <div>
// // // //         <label>Sort by Date: </label>
// // // //         <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
// // // //           <option value="asc">Oldest First</option>
// // // //           <option value="desc">Newest First</option>
// // // //         </select>
// // // //       </div>

// // // //       {/* Filters on Media Summary */}
// // // //       <div>
// // // //         <label>
// // // //           <input type="checkbox" checked={filterMediaType.images} onChange={() => toggleFilter('images')} />
// // // //           Images
// // // //         </label>
// // // //         <label>
// // // //           <input type="checkbox" checked={filterMediaType.audio} onChange={() => toggleFilter('audio')} />
// // // //           Audio
// // // //         </label>
// // // //         <label>
// // // //           <input type="checkbox" checked={filterMediaType.video} onChange={() => toggleFilter('video')} />
// // // //           Videos
// // // //         </label>
// // // //       </div>

// // // //       {/* Charts */}
// // // //       <WidgetContainer>
// // // //         <div>
// // // //           <h2>Total Uploads: {totalUploads}</h2>
// // // //         </div>

// // // //         <div>
// // // //           <h2>Storage Used: {storageUsed.toFixed(2)} MB / {storageLimit} MB</h2>
// // // //           <div style={{ width: '100%', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '5px' }}>
// // // //             <div
// // // //               style={{
// // // //                 width: `${(storageUsed / storageLimit) * 100}%`,
// // // //                 height: '100%',
// // // //                 backgroundColor: storageUsed / storageLimit > 0.8 ? 'red' : '#36A2EB',
// // // //                 borderRadius: '5px'
// // // //               }}
// // // //             />
// // // //           </div>
// // // //         </div>

// // // //         <div style={{ maxWidth: '400px', margin: '0 auto' }}>
// // // //           <h2>Media Summary</h2>
// // // //           <Pie
// // // //             data={{
// // // //               labels: ['Images', 'Audio', 'Videos'],
// // // //               datasets: [{
// // // //                 data: [mediaSummary.images, mediaSummary.audio, mediaSummary.video],
// // // //                 backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
// // // //               }],
// // // //             }}
// // // //             style={{ width: '100%', height: '300px' }}
// // // //           />
// // // //         </div>

// // // //         <div style={{ maxWidth: '600px', margin: '0 auto' }}>
// // // //           <h2>Uploads Per Day</h2>
// // // //           <Bar
// // // //             data={{
// // // //               labels: Object.keys(uploadsPerDay),
// // // //               datasets: [{
// // // //                 label: 'Uploads Per Day',
// // // //                 data: Object.values(uploadsPerDay),
// // // //                 backgroundColor: '#36A2EB'
// // // //               }],
// // // //             }}
// // // //             style={{ width: '100%', height: '300px' }}
// // // //           />
// // // //         </div>

// // // //         <div style={{ maxWidth: '600px', margin: '0 auto' }}>
// // // //           <h2>Uploads Per Week</h2>
// // // //           <Bar
// // // //             data={{
// // // //               labels: Object.keys(uploadsPerWeek),
// // // //               datasets: [{
// // // //                 label: 'Uploads Per Week',
// // // //                 data: Object.values(uploadsPerWeek),
// // // //                 backgroundColor: '#FFCE56'
// // // //               }],
// // // //             }}
// // // //             style={{ width: '100%', height: '300px' }}
// // // //           />
// // // //         </div>
// // // //       </WidgetContainer>
// // // //     </DashboardContainer>
// // // //   );
// // // // }

// // // // export default Dashboard;


// // // import React, { useState, useEffect } from 'react';
// // // import styled from 'styled-components';
// // // import { Pie, Bar } from 'react-chartjs-2';
// // // import 'chart.js/auto';
// // // import DatePicker from 'react-datepicker';
// // // import 'react-datepicker/dist/react-datepicker.css';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
// // // import Notification from '../common/Notification';
// // // import api from '../../utils/api';

// // // const DashboardContainer = styled.div`
// // //   padding: 20px;
// // //   background-color: #f5f7fa;
// // // `;

// // // const Header = styled.h1`
// // //   color: #2c3e50;
// // //   margin-bottom: 1rem;
// // // `;

// // // const FilterContainer = styled.div`
// // //   display: flex;
// // //   flex-wrap: wrap;
// // //   gap: 1rem;
// // //   margin-bottom: 1rem;
// // //   background-color: white;
// // //   padding: 1rem;
// // //   border-radius: 8px;
// // //   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// // // `;

// // // const SearchInput = styled.div`
// // //   flex: 1;
// // //   min-width: 200px;
// // //   position: relative;

// // //   input {
// // //     width: 100%;
// // //     padding: 0.5rem 2rem 0.5rem 0.5rem;
// // //     border: 1px solid #ddd;
// // //     border-radius: 4px;
// // //   }

// // //   .icon {
// // //     position: absolute;
// // //     right: 0.5rem;
// // //     top: 50%;
// // //     transform: translateY(-50%);
// // //     color: #7f8c8d;
// // //   }
// // // `;

// // // const Select = styled.select`
// // //   padding: 0.5rem;
// // //   border: 1px solid #ddd;
// // //   border-radius: 4px;
// // // `;

// // // const Button = styled.button`
// // //   background-color: #3498db;
// // //   color: white;
// // //   border: none;
// // //   padding: 0.5rem 1rem;
// // //   border-radius: 4px;
// // //   cursor: pointer;
// // //   transition: background-color 0.3s;

// // //   &:hover {
// // //     background-color: #2980b9;
// // //   }
// // // `;

// // // const WidgetContainer = styled.div`
// // //   display: grid;
// // //   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
// // //   gap: 20px;
// // // `;

// // // const Widget = styled.div`
// // //   background-color: white;
// // //   padding: 1.5rem;
// // //   border-radius: 8px;
// // //   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// // // `;

// // // const StorageBar = styled.div`
// // //   width: 100%;
// // //   height: 20px;
// // //   background-color: #e0e0e0;
// // //   border-radius: 10px;
// // //   overflow: hidden;
// // //   margin-top: 10px;
// // // `;

// // // const StorageUsed = styled.div`
// // //   width: ${props => props.percentage}%;
// // //   height: 100%;
// // //   background-color: ${props => props.percentage > 80 ? 'red' : '#36A2EB'};
// // //   border-radius: 10px;
// // // `;

// // // const CheckboxContainer = styled.div`
// // //   display: flex;
// // //   gap: 1rem;
// // //   margin-top: 1rem;
// // // `;

// // // function Dashboard() {
// // //   const [uploadedFiles, setUploadedFiles] = useState([]);
// // //   const [notification, setNotification] = useState({ message: '', type: 'success' });
// // //   const [mediaSummary, setMediaSummary] = useState({ images: 0, audio: 0, video: 0 });
// // //   const [uploadsPerDay, setUploadsPerDay] = useState({});
// // //   const [uploadsPerWeek, setUploadsPerWeek] = useState({});
// // //   const [totalUploads, setTotalUploads] = useState(0);
// // //   const [storageUsed, setStorageUsed] = useState(0);
// // //   const [storageLimit] = useState(1000); // Assuming 1000MB as a limit
// // //   const [startDate, setStartDate] = useState(null);
// // //   const [endDate, setEndDate] = useState(null);
// // //   const [mediaType, setMediaType] = useState('');
// // //   const [tags, setTags] = useState([]);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [sortOrder, setSortOrder] = useState('asc');
// // //   const [filterMediaType, setFilterMediaType] = useState({ images: true, audio: true, video: true });

// // //   const applySearch = () => {
// // //     const params = {
// // //       search: searchTerm,
// // //       start_date: startDate ? startDate.toISOString().split('T')[0] : '',
// // //       end_date: endDate ? endDate.toISOString().split('T')[0] : '',
// // //       media_type: mediaType,
// // //       tags: tags.join(','),
// // //     };

// // //     api.get('/file_history', { params })
// // //       .then((response) => {
// // //         const files = response.data.files;
// // //         setUploadedFiles(files);

// // //         // Process and categorize media files
// // //         const summary = files.reduce(
// // //           (acc, file) => {
// // //             if (file.type.startsWith('image') && filterMediaType.images) acc.images += 1;
// // //             if (file.type.startsWith('audio') && filterMediaType.audio) acc.audio += 1;
// // //             if (file.type.startsWith('video') && filterMediaType.video) acc.video += 1;
// // //             return acc;
// // //           },
// // //           { images: 0, audio: 0, video: 0 }
// // //         );
// // //         setMediaSummary(summary);

// // //         setTotalUploads(files.length);
// // //         const totalStorage = files.reduce((acc, file) => acc + file.size, 0);
// // //         setStorageUsed(totalStorage / 1024 / 1024); // Convert to MB

// // //         // Sort data by date
// // //         const sortedFiles = files.sort((a, b) => sortOrder === 'asc'
// // //           ? new Date(a.uploaded_at) - new Date(b.uploaded_at)
// // //           : new Date(b.uploaded_at) - new Date(a.uploaded_at));

// // //         // Calculate day-wise and week-wise uploads
// // //         const dayWiseUploads = sortedFiles.reduce((acc, file) => {
// // //           const uploadDate = new Date(file.uploaded_at).toLocaleDateString();
// // //           acc[uploadDate] = (acc[uploadDate] || 0) + 1;
// // //           return acc;
// // //         }, {});
// // //         setUploadsPerDay(dayWiseUploads);

// // //         const weekWiseUploads = sortedFiles.reduce((acc, file) => {
// // //           const weekStart = new Date(file.uploaded_at);
// // //           const week = `${weekStart.getFullYear()}-W${Math.ceil(weekStart.getDate() / 7)}`;
// // //           acc[week] = (acc[week] || 0) + 1;
// // //           return acc;
// // //         }, {});
// // //         setUploadsPerWeek(weekWiseUploads);
// // //       })
// // //       .catch((error) => {
// // //         setNotification({ message: 'Failed to fetch file history.', type: 'error' });
// // //       });
// // //   };

// // //   useEffect(() => {
// // //     applySearch();
// // //   }, [sortOrder, filterMediaType]);

// // //   const toggleFilter = (type) => {
// // //     setFilterMediaType((prev) => ({ ...prev, [type]: !prev[type] }));
// // //   };

// // //   return (
// // //     <DashboardContainer>
// // //       <Header>Dashboard</Header>
// // //       {notification.message && (
// // //         <Notification
// // //           message={notification.message}
// // //           type={notification.type}
// // //           onClose={() => setNotification({ message: '', type: 'success' })}
// // //         />
// // //       )}
// // //       <FilterContainer>
// // //         <SearchInput>
// // //           <input
// // //             type="text"
// // //             placeholder="Search files..."
// // //             value={searchTerm}
// // //             onChange={(e) => setSearchTerm(e.target.value)}
// // //             onKeyPress={(e) => e.key === 'Enter' && applySearch()}
// // //           />
// // //           <FontAwesomeIcon icon={faSearch} className="icon" />
// // //         </SearchInput>

// // //         <DatePicker
// // //           selected={startDate}
// // //           onChange={(date) => setStartDate(date)}
// // //           placeholderText="Start Date"
// // //         />
// // //         <DatePicker
// // //           selected={endDate}
// // //           onChange={(date) => setEndDate(date)}
// // //           placeholderText="End Date"
// // //         />

// // //         <Select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
// // //           <option value="">All</option>
// // //           <option value="image">Images</option>
// // //           <option value="audio">Audio</option>
// // //           <option value="video">Video</option>
// // //         </Select>

// // //         <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
// // //           <option value="asc">Oldest First</option>
// // //           <option value="desc">Newest First</option>
// // //         </Select>

// // //         <Button onClick={applySearch}>
// // //           <FontAwesomeIcon icon={faFilter} /> Apply Filters
// // //         </Button>
// // //       </FilterContainer>

// // //       <CheckboxContainer>
// // //         <label>
// // //           <input
// // //             type="checkbox"
// // //             checked={filterMediaType.images}
// // //             onChange={() => toggleFilter('images')}
// // //           />
// // //           Images
// // //         </label>
// // //         <label>
// // //           <input
// // //             type="checkbox"
// // //             checked={filterMediaType.audio}
// // //             onChange={() => toggleFilter('audio')}
// // //           />
// // //           Audio
// // //         </label>
// // //         <label>
// // //           <input
// // //             type="checkbox"
// // //             checked={filterMediaType.video}
// // //             onChange={() => toggleFilter('video')}
// // //           />
// // //           Videos
// // //         </label>
// // //       </CheckboxContainer>

// // //       <WidgetContainer>
// // //         <Widget>
// // //           <h2>Total Uploads: {totalUploads}</h2>
// // //         </Widget>

// // //         <Widget>
// // //           <h2>Storage Used: {storageUsed.toFixed(2)} MB / {storageLimit} MB</h2>
// // //           <StorageBar>
// // //             <StorageUsed percentage={(storageUsed / storageLimit) * 100} />
// // //           </StorageBar>
// // //         </Widget>

// // //         <Widget>
// // //           <h2>Media Summary</h2>
// // //           <Pie
// // //             data={{
// // //               labels: ['Images', 'Audio', 'Videos'],
// // //               datasets: [{
// // //                 data: [mediaSummary.images, mediaSummary.audio, mediaSummary.video],
// // //                 backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
// // //               }],
// // //             }}
// // //           />
// // //         </Widget>

// // //         <Widget>
// // //           <h2>Uploads Per Day</h2>
// // //           <Bar
// // //             data={{
// // //               labels: Object.keys(uploadsPerDay),
// // //               datasets: [{
// // //                 label: 'Uploads Per Day',
// // //                 data: Object.values(uploadsPerDay),
// // //                 backgroundColor: '#36A2EB'
// // //               }],
// // //             }}
// // //           />
// // //         </Widget>

// // //         <Widget>
// // //           <h2>Uploads Per Week</h2>
// // //           <Bar
// // //             data={{
// // //               labels: Object.keys(uploadsPerWeek),
// // //               datasets: [{
// // //                 label: 'Uploads Per Week',
// // //                 data: Object.values(uploadsPerWeek),
// // //                 backgroundColor: '#FFCE56'
// // //               }],
// // //             }}
// // //           />
// // //         </Widget>
// // //       </WidgetContainer>
// // //     </DashboardContainer>
// // //   );
// // // }

// // // export default Dashboard;
// // import React, { useState, useEffect } from 'react';
// // import styled from 'styled-components';
// // import { Pie, Bar } from 'react-chartjs-2';
// // import 'chart.js/auto';
// // import DatePicker from 'react-datepicker';
// // import 'react-datepicker/dist/react-datepicker.css';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faSearch, faFilter, faChevronDown } from '@fortawesome/free-solid-svg-icons';
// // import Notification from '../common/Notification';
// // import api from '../../utils/api';

// // const DashboardContainer = styled.div`
// //   padding: 2rem;
// //   background-color: #f8f9fa;
// // `;

// // const Header = styled.h1`
// //   color: #343a40;
// //   margin-bottom: 1.5rem;
// // `;

// // const FilterBar = styled.div`
// //   display: flex;
// //   flex-wrap: wrap;
// //   align-items: center;
// //   gap: 1rem;
// //   margin-bottom: 2rem;
// //   background-color: white;
// //   padding: 1rem;
// //   border-radius: 8px;
// //   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// // `;

// // const SearchInput = styled.div`
// //   flex-grow: 1;
// //   position: relative;
// //   min-width: 200px;
// //   input {
// //     width: 100%;
// //     padding: 0.5rem 2rem 0.5rem 0.75rem;
// //     border: 1px solid #ced4da;
// //     border-radius: 4px;
// //   }
// //   .icon {
// //     position: absolute;
// //     right: 0.75rem;
// //     top: 50%;
// //     transform: translateY(-50%);
// //     color: #6c757d;
// //   }
// // `;

// // const Select = styled.select`
// //   padding: 0.5rem;
// //   border: 1px solid #ced4da;
// //   border-radius: 4px;
// //   background-color: white;
// // `;

// // const Button = styled.button`
// //   background-color: #007bff;
// //   color: white;
// //   border: none;
// //   padding: 0.5rem 1rem;
// //   border-radius: 4px;
// //   cursor: pointer;
// //   &:hover {
// //     background-color: #0056b3;
// //   }
// // `;

// // const CheckboxContainer = styled.div`
// //   display: flex;
// //   gap: 1rem;
// //   align-items: center;
// //   flex-wrap: wrap;
// // `;

// // const StatsGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
// //   gap: 1rem;
// //   margin-bottom: 2rem;
// // `;

// // const StatCard = styled.div`
// //   background-color: white;
// //   padding: 1.5rem;
// //   border-radius: 8px;
// //   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// //   text-align: center;
// // `;

// // const StatValue = styled.div`
// //   font-size: 1.5rem;
// //   font-weight: bold;
// //   color: #343a40;
// // `;

// // const StatLabel = styled.div`
// //   color: #6c757d;
// //   margin-top: 0.5rem;
// // `;

// // const ChartGrid = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
// //   gap: 2rem;
// // `;

// // const ChartCard = styled.div`
// //   background-color: white;
// //   padding: 1.5rem;
// //   border-radius: 8px;
// //   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// // `;

// // const StorageBar = styled.div`
// //   width: 100%;
// //   height: 20px;
// //   background-color: #e9ecef;
// //   border-radius: 10px;
// //   overflow: hidden;
// //   margin-top: 10px;
// // `;

// // const StorageUsed = styled.div`
// //   width: ${props => props.percentage}%;
// //   height: 100%;
// //   background-color: ${props => props.percentage > 80 ? '#dc3545' : '#28a745'};
// //   border-radius: 10px;
// // `;

// // function Dashboard() {
// //   const [uploadedFiles, setUploadedFiles] = useState([]);
// //   const [notification, setNotification] = useState({ message: '', type: 'success' });
// //   const [mediaSummary, setMediaSummary] = useState({ images: 0, audio: 0, video: 0 });
// //   const [uploadsPerDay, setUploadsPerDay] = useState({});
// //   const [uploadsPerWeek, setUploadsPerWeek] = useState({});
// //   const [totalUploads, setTotalUploads] = useState(0);
// //   const [storageUsed, setStorageUsed] = useState(0);
// //   const [storageLimit] = useState(1000);
// //   const [startDate, setStartDate] = useState(null);
// //   const [endDate, setEndDate] = useState(null);
// //   const [mediaType, setMediaType] = useState('');
// //   const [tags, setTags] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [sortOrder, setSortOrder] = useState('asc');
// //   const [filterMediaType, setFilterMediaType] = useState({ images: true, audio: true, video: true });

// //   const applySearch = () => {
// //     const params = {
// //       search: searchTerm,
// //       start_date: startDate ? startDate.toISOString().split('T')[0] : '',
// //       end_date: endDate ? endDate.toISOString().split('T')[0] : '',
// //       media_type: mediaType,
// //       tags: tags.join(','),
// //     };

// //     api.get('/file_history', { params })
// //       .then((response) => {
// //         const files = response.data.files;
// //         setUploadedFiles(files);

// //         const summary = files.reduce(
// //           (acc, file) => {
// //             if (file.type.startsWith('image') && filterMediaType.images) acc.images += 1;
// //             if (file.type.startsWith('audio') && filterMediaType.audio) acc.audio += 1;
// //             if (file.type.startsWith('video') && filterMediaType.video) acc.video += 1;
// //             return acc;
// //           },
// //           { images: 0, audio: 0, video: 0 }
// //         );
// //         setMediaSummary(summary);

// //         setTotalUploads(files.length);
// //         const totalStorage = files.reduce((acc, file) => acc + file.size, 0);
// //         setStorageUsed(totalStorage / 1024 / 1024);

// //         const sortedFiles = files.sort((a, b) => sortOrder === 'asc'
// //           ? new Date(a.uploaded_at) - new Date(b.uploaded_at)
// //           : new Date(b.uploaded_at) - new Date(a.uploaded_at));

// //         const dayWiseUploads = sortedFiles.reduce((acc, file) => {
// //           const uploadDate = new Date(file.uploaded_at).toLocaleDateString();
// //           acc[uploadDate] = (acc[uploadDate] || 0) + 1;
// //           return acc;
// //         }, {});
// //         setUploadsPerDay(dayWiseUploads);

// //         const weekWiseUploads = sortedFiles.reduce((acc, file) => {
// //           const weekStart = new Date(file.uploaded_at);
// //           const week = `${weekStart.getFullYear()}-W${Math.ceil(weekStart.getDate() / 7)}`;
// //           acc[week] = (acc[week] || 0) + 1;
// //           return acc;
// //         }, {});
// //         setUploadsPerWeek(weekWiseUploads);
// //       })
// //       .catch((error) => {
// //         console.error('Error fetching file history:', error);
// //         setNotification({ message: 'Failed to fetch file history.', type: 'error' });
// //       });
// //   };

// //   useEffect(() => {
// //     applySearch();
// //   }, [sortOrder, filterMediaType]);

// //   const toggleFilter = (type) => {
// //     setFilterMediaType(prev => ({ ...prev, [type]: !prev[type] }));
// //   };

// //   return (
// //     <DashboardContainer>
// //       <Header>Dashboard</Header>
// //       {notification.message && (
// //         <Notification
// //           message={notification.message}
// //           type={notification.type}
// //           onClose={() => setNotification({ message: '', type: 'success' })}
// //         />
// //       )}
// //       <FilterBar>
// //         <SearchInput>
// //           <input
// //             type="text"
// //             placeholder="Search files..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             onKeyPress={(e) => e.key === 'Enter' && applySearch()}
// //           />
// //           <FontAwesomeIcon icon={faSearch} className="icon" />
// //         </SearchInput>
// //         <DatePicker
// //           selected={startDate}
// //           onChange={(date) => setStartDate(date)}
// //           placeholderText="Start Date"
// //         />
// //         <DatePicker
// //           selected={endDate}
// //           onChange={(date) => setEndDate(date)}
// //           placeholderText="End Date"
// //         />
// //         <Select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
// //           <option value="">All Media Types</option>
// //           <option value="image">Images</option>
// //           <option value="audio">Audio</option>
// //           <option value="video">Video</option>
// //         </Select>
// //         <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
// //           <option value="asc">Oldest First</option>
// //           <option value="desc">Newest First</option>
// //         </Select>
// //         <Button onClick={applySearch}>
// //           <FontAwesomeIcon icon={faFilter} /> Apply Filters
// //         </Button>
// //       </FilterBar>

// //       <CheckboxContainer>
// //         <label>
// //           <input
// //             type="checkbox"
// //             checked={filterMediaType.images}
// //             onChange={() => toggleFilter('images')}
// //           />
// //           Images
// //         </label>
// //         <label>
// //           <input
// //             type="checkbox"
// //             checked={filterMediaType.audio}
// //             onChange={() => toggleFilter('audio')}
// //           />
// //           Audio
// //         </label>
// //         <label>
// //           <input
// //             type="checkbox"
// //             checked={filterMediaType.video}
// //             onChange={() => toggleFilter('video')}
// //           />
// //           Videos
// //         </label>
// //       </CheckboxContainer>

// //       <StatsGrid>
// //         <StatCard>
// //           <StatValue>{totalUploads}</StatValue>
// //           <StatLabel>Total Uploads</StatLabel>
// //         </StatCard>
// //         <StatCard>
// //           <StatValue>{storageUsed.toFixed(2)} MB / {storageLimit} MB</StatValue>
// //           <StatLabel>Storage Used</StatLabel>
// //           <StorageBar>
// //             <StorageUsed percentage={(storageUsed / storageLimit) * 100} />
// //           </StorageBar>
// //         </StatCard>
// //       </StatsGrid>

// //       <ChartGrid>
// //         <ChartCard>
// //           <h3>Media Summary</h3>
// //           <Pie
// //             data={{
// //               labels: ['Images', 'Audio', 'Videos'],
// //               datasets: [{
// //                 data: [mediaSummary.images, mediaSummary.audio, mediaSummary.video],
// //                 backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
// //               }],
// //             }}
// //             options={{ responsive: true, maintainAspectRatio: false }}
// //           />
// //         </ChartCard>
// //         <ChartCard>
// //           <h3>Uploads Per Day</h3>
// //           <Bar
// //             data={{
// //               labels: Object.keys(uploadsPerDay),
// //               datasets: [{
// //                 label: 'Uploads',
// //                 data: Object.values(uploadsPerDay),
// //                 backgroundColor: '#36a2eb',
// //               }],
// //             }}
// //             options={{
// //               responsive: true,
// //               maintainAspectRatio: false,
// //               scales: {
// //                 y: {
// //                   beginAtZero: true,
// //                   ticks: { precision: 0 }
// //                 }
// //               }
// //             }}
// //           />
// //         </ChartCard>
// //         <ChartCard>
// //           <h3>Uploads Per Week</h3>
// //           <Bar
// //             data={{
// //               labels: Object.keys(uploadsPerWeek),
// //               datasets: [{
// //                 label: 'Uploads',
// //                 data: Object.values(uploadsPerWeek),
// //                 backgroundColor: '#ffce56',
// //               }],
// //             }}
// //             options={{
// //               responsive: true,
// //               maintainAspectRatio: false,
// //               scales: {
// //                 y: {
// //                   beginAtZero: true,
// //                   ticks: { precision: 0 }
// //                 }
// //               }
// //             }}
// //           />
// //         </ChartCard>
// //       </ChartGrid>
// //     </DashboardContainer>
// //   );
// // }

// // export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { Pie, Bar } from 'react-chartjs-2';
// import 'chart.js/auto';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faFilter, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
// import Notification from '../common/Notification';
// import api from '../../utils/api';

// const DashboardContainer = styled.div`
//   padding: 2rem;
//   background-color: #f8f9fa;
// `;

// const Header = styled.h1`
//   color: #343a40;
//   margin-bottom: 1.5rem;
// `;

// const FilterBar = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   margin-bottom: 1rem;
//   background-color: white;
//   padding: 1rem;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// `;

// const SearchInput = styled.div`
//   flex-grow: 1;
//   position: relative;
//   min-width: 200px;
//   input {
//     width: 100%;
//     padding: 0.5rem 2rem 0.5rem 0.75rem;
//     border: 1px solid #ced4da;
//     border-radius: 4px;
//   }
//   .icon {
//     position: absolute;
//     right: 0.75rem;
//     top: 50%;
//     transform: translateY(-50%);
//     color: #6c757d;
//   }
// `;

// const AdvancedFilters = styled.div`
//   background-color: white;
//   padding: 1rem;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//   margin-bottom: 1rem;
//   display: ${props => props.isOpen ? 'block' : 'none'};
// `;

// const FilterGroup = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 1rem;
//   margin-bottom: 1rem;
// `;

// const Select = styled.select`
//   padding: 0.5rem;
//   border: 1px solid #ced4da;
//   border-radius: 4px;
//   background-color: white;
// `;

// const Button = styled.button`
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 0.5rem 1rem;
//   border-radius: 4px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const CheckboxContainer = styled.div`
//   display: flex;
//   gap: 1rem;
//   align-items: center;
//   flex-wrap: wrap;
// `;

// const StatsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   gap: 1rem;
//   margin-bottom: 2rem;
// `;

// const StatCard = styled.div`
//   background-color: white;
//   padding: 1.5rem;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//   text-align: center;
// `;

// const StatValue = styled.div`
//   font-size: 1.5rem;
//   font-weight: bold;
//   color: #343a40;
// `;

// const StatLabel = styled.div`
//   color: #6c757d;
//   margin-top: 0.5rem;
// `;

// const ChartGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   gap: 2rem;
// `;

// const ChartCard = styled.div`
//   background-color: white;
//   padding: 1.5rem;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//   height: 400px; // Fixed height for all chart containers
// `;

// const StorageBar = styled.div`
//   width: 100%;
//   height: 20px;
//   background-color: #e9ecef;
//   border-radius: 10px;
//   overflow: hidden;
//   margin-top: 10px;
// `;

// const StorageUsed = styled.div`
//   width: ${props => props.percentage}%;
//   height: 100%;
//   background-color: ${props => props.percentage > 80 ? '#dc3545' : '#28a745'};
//   border-radius: 10px;
// `;

// function Dashboard() {
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [notification, setNotification] = useState({ message: '', type: 'success' });
//   const [mediaSummary, setMediaSummary] = useState({ images: 0, audio: 0, video: 0 });
//   const [uploadsPerDay, setUploadsPerDay] = useState({});
//   const [uploadsPerWeek, setUploadsPerWeek] = useState({});
//   const [totalUploads, setTotalUploads] = useState(0);
//   const [storageUsed, setStorageUsed] = useState(0);
//   const [storageLimit] = useState(1000);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [mediaType, setMediaType] = useState('');
//   const [tags, setTags] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [filterMediaType, setFilterMediaType] = useState({ images: true, audio: true, video: true });
//   const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

//   const applySearch = () => {
//     const params = {
//       search: searchTerm,
//       start_date: startDate ? startDate.toISOString().split('T')[0] : '',
//       end_date: endDate ? endDate.toISOString().split('T')[0] : '',
//       media_type: mediaType,
//       tags: tags.join(','),
//     };

//     api.get('/file_history', { params })
//       .then((response) => {
//         const files = response.data.files;
//         setUploadedFiles(files);
//         processData(files);
//       })
//       .catch((error) => {
//         console.error('Error fetching file history:', error);
//         setNotification({ message: 'Failed to fetch file history.', type: 'error' });
//       });
//   };

//   const processData = (files) => {
//     const summary = files.reduce(
//       (acc, file) => {
//         if (file.type.startsWith('image') && filterMediaType.images) acc.images += 1;
//         if (file.type.startsWith('audio') && filterMediaType.audio) acc.audio += 1;
//         if (file.type.startsWith('video') && filterMediaType.video) acc.video += 1;
//         return acc;
//       },
//       { images: 0, audio: 0, video: 0 }
//     );
//     setMediaSummary(summary);

//     setTotalUploads(files.length);
//     const totalStorage = files.reduce((acc, file) => acc + file.size, 0);
//     setStorageUsed(totalStorage / 1024 / 1024);

//     const sortedFiles = files.sort((a, b) => sortOrder === 'asc'
//       ? new Date(a.uploaded_at) - new Date(b.uploaded_at)
//       : new Date(b.uploaded_at) - new Date(a.uploaded_at));

//     const dayWiseUploads = sortedFiles.reduce((acc, file) => {
//       const uploadDate = new Date(file.uploaded_at).toLocaleDateString();
//       acc[uploadDate] = (acc[uploadDate] || 0) + 1;
//       return acc;
//     }, {});
//     setUploadsPerDay(dayWiseUploads);

//     const weekWiseUploads = sortedFiles.reduce((acc, file) => {
//       const weekStart = new Date(file.uploaded_at);
//       const week = `${weekStart.getFullYear()}-W${Math.ceil(weekStart.getDate() / 7)}`;
//       acc[week] = (acc[week] || 0) + 1;
//       return acc;
//     }, {});
//     setUploadsPerWeek(weekWiseUploads);
//   };

//   useEffect(() => {
//     applySearch();
//   }, [sortOrder, filterMediaType]);

//   const toggleFilter = (type) => {
//     setFilterMediaType(prev => ({ ...prev, [type]: !prev[type] }));
//   };

//   return (
//     <DashboardContainer>
//       <Header>Dashboard</Header>
//       {notification.message && (
//         <Notification
//           message={notification.message}
//           type={notification.type}
//           onClose={() => setNotification({ message: '', type: 'success' })}
//         />
//       )}
//       <FilterBar>
//         <SearchInput>
//           <input
//             type="text"
//             placeholder="Search files..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && applySearch()}
//           />
//           <FontAwesomeIcon icon={faSearch} className="icon" />
//         </SearchInput>
//         <Button onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
//           <FontAwesomeIcon icon={showAdvancedFilters ? faChevronUp : faChevronDown} />
//           {showAdvancedFilters ? 'Hide Filters' : 'Show Filters'}
//         </Button>
//       </FilterBar>

//       <AdvancedFilters isOpen={showAdvancedFilters}>
//         <FilterGroup>
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             placeholderText="Start Date"
//           />
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             placeholderText="End Date"
//           />
//           <Select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
//             <option value="">All Media Types</option>
//             <option value="image">Images</option>
//             <option value="audio">Audio</option>
//             <option value="video">Video</option>
//           </Select>
//           <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
//             <option value="asc">Oldest First</option>
//             <option value="desc">Newest First</option>
//           </Select>
//         </FilterGroup>
//         <CheckboxContainer>
//           <label>
//             <input
//               type="checkbox"
//               checked={filterMediaType.images}
//               onChange={() => toggleFilter('images')}
//             />
//             Images
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               checked={filterMediaType.audio}
//               onChange={() => toggleFilter('audio')}
//             />
//             Audio
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               checked={filterMediaType.video}
//               onChange={() => toggleFilter('video')}
//             />
//             Videos
//           </label>
//         </CheckboxContainer>
//         <Button onClick={applySearch}>
//           <FontAwesomeIcon icon={faFilter} /> Apply Filters
//         </Button>
//       </AdvancedFilters>

//       <StatsGrid>
//         <StatCard>
//           <StatValue>{totalUploads}</StatValue>
//           <StatLabel>Total Uploads</StatLabel>
//         </StatCard>
//         <StatCard>
//           <StatValue>{storageUsed.toFixed(2)} MB / {storageLimit} MB</StatValue>
//           <StatLabel>Storage Used</StatLabel>
//           <StorageBar>
//             <StorageUsed percentage={(storageUsed / storageLimit) * 100} />
//           </StorageBar>
//         </StatCard>
//       </StatsGrid>

//       <ChartGrid>
//         <ChartCard>
//           <h3>Media Summary</h3>
//           <Pie
//             data={{
//               labels: ['Images', 'Audio', 'Videos'],
//               datasets: [{
//                 data: [mediaSummary.images, mediaSummary.audio, mediaSummary.video],
//                 backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
//               }],
//             }}
//             options={{ 
//               responsive: true, 
//               maintainAspectRatio: false,
//               plugins: {
//                 legend: {
//                   position: 'bottom',
//                 }
//               }
//             }}
//           />
//         </ChartCard>
//         <ChartCard>
//           <h3>Uploads Per Day</h3>
//           <Bar
//             data={{
//               labels: Object.keys(uploadsPerDay),
//               datasets: [{
//                 label: 'Uploads',
//                 data: Object.values(uploadsPerDay),
//                 backgroundColor: '#36a2eb',
//               }],
//             }}
//             options={{
//               responsive: true,
//               maintainAspectRatio: false,
//               scales: {
//                 y: {
//                   beginAtZero: true,
//                   ticks: { precision: 0 }
//                 }
//               }
//             }}
//           />
//         </ChartCard>
//         <ChartCard>
//           <h3>Uploads Per Week</h3>
//           <Bar
//             data={{
//               labels: Object.keys(uploadsPerWeek),
//               datasets: [{
//                 label: 'Uploads',
//                 data: Object.values(uploadsPerWeek),
//                 backgroundColor: '#ffce56',
//               }],
//             }}
//             options={{
//               responsive: true,
//               maintainAspectRatio: false,
//               scales: {
//                 y: {
//                   beginAtZero: true,
//                   ticks: { precision: 0 }
//                 }
//               }
//             }}
//           />
//         </ChartCard>
//       </ChartGrid>
//     </DashboardContainer>
//   );
// }

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Notification from '../common/Notification';
import api from '../../utils/api';

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

  const applySearch = () => {
    const params = {
      search: searchTerm,
      start_date: startDate ? startDate.toISOString().split('T')[0] : '',
      end_date: endDate ? endDate.toISOString().split('T')[0] : '',
      media_type: mediaType,
      tags: tags.join(','),
    };

    api.get('/file_history', { params })
      .then((response) => {
        const files = response.data.files;
        setUploadedFiles(files);
        processData(files);
      })
      .catch((error) => {
        console.error('Error fetching file history:', error);
        setNotification({ message: 'Failed to fetch file history.', type: 'error' });
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
    setStorageUsed(totalStorage / 1024 / 1024);

    const sortedFiles = files.sort((a, b) => sortOrder === 'asc'
      ? new Date(a.uploaded_at) - new Date(b.uploaded_at)
      : new Date(b.uploaded_at) - new Date(a.uploaded_at));

    const dayWiseUploads = sortedFiles.reduce((acc, file) => {
      const uploadDate = new Date(file.uploaded_at).toLocaleDateString();
      acc[uploadDate] = (acc[uploadDate] || 0) + 1;
      return acc;
    }, {});
    setUploadsPerDay(dayWiseUploads);

    const weekWiseUploads = sortedFiles.reduce((acc, file) => {
      const weekStart = new Date(file.uploaded_at);
      const week = `${weekStart.getFullYear()}-W${Math.ceil(weekStart.getDate() / 7)}`;
      acc[week] = (acc[week] || 0) + 1;
      return acc;
    }, {});
    setUploadsPerWeek(weekWiseUploads);
  };

  useEffect(() => {
    applySearch();
  }, [sortOrder, filterMediaType]);

  const toggleFilter = (type) => {
    setFilterMediaType(prev => ({ ...prev, [type]: !prev[type] }));
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
                labels: Object.keys(uploadsPerDay),
                datasets: [{
                  label: 'Uploads',
                  data: Object.values(uploadsPerDay),
                  backgroundColor: '#36a2eb',
                }],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { precision: 0 }
                  }
                }
              }}
            />
          </ChartContainer>
        </ChartCard>
        <ChartCard>
          <ChartTitle>Uploads Per Week</ChartTitle>
          <ChartContainer>
            <Bar
              data={{
                labels: Object.keys(uploadsPerWeek),
                datasets: [{
                  label: 'Uploads',
                  data: Object.values(uploadsPerWeek),
                  backgroundColor: '#ffce56',
                }],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { precision: 0 }
                  }
                }
              }}
            />
          </ChartContainer>
        </ChartCard>
      </ChartGrid>
    </DashboardContainer>
  );
}

export default Dashboard;