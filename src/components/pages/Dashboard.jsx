// // src/components/pages/Dashboard.jsx
// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import FileDashboard from '../common/FileDashboard';
// import Notification from '../common/Notification';

// const DashboardContainer = styled.div`
//   padding: 20px;
// `;

// function Dashboard() {
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [notification, setNotification] = useState({ message: '', type: 'success' });

//   useEffect(() => {
//     fetch('/api/file_history') 
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch file history.');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         if (data.files) {
//           setUploadedFiles(data.files);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching file history:', error);
//         setNotification({ message: 'Failed to fetch file history.', type: 'error' });
//       });
//   }, []);

//   return (
//     <DashboardContainer>
//       <h1>Dashboard</h1>
//       {notification.message && (
//         <Notification 
//           message={notification.message} 
//           type={notification.type} 
//           onClose={() => setNotification({ message: '', type: 'success' })} 
//         />
//       )}
//       <FileDashboard uploadedFiles={uploadedFiles} />
//     </DashboardContainer>
//   );
// }

// export default Dashboard;

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
    api.get('/file_history') // Use the api instance
      .then((response) => {
        const data = response.data;
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
