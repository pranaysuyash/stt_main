// // src/components/pages/Upload.jsx
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import FileUploader from '../common/FileUploader';
// import Notification from '../common/Notification';

// const UploadContainer = styled.div`
//   padding: 20px;
// `;

// function Upload() {
//   const [notification, setNotification] = useState({ message: '', type: 'success' });
//   const [uploadedFiles, setUploadedFiles] = useState([]);

//   return (
//     <UploadContainer>
//       <h1>Upload Files</h1>
//       {notification.message && (
//         <Notification 
//           message={notification.message} 
//           type={notification.type} 
//           onClose={() => setNotification({ message: '', type: 'success' })} 
//         />
//       )}
//       <FileUploader 
//         setUploadedFiles={setUploadedFiles} 
//         setNotification={setNotification} 
//       />
//       {}
//       {uploadedFiles.length > 0 && (
//         <div>
//           <h2>Uploaded Files:</h2>
//           <ul>
//             {uploadedFiles.map((file, index) => (
//               <li key={index}>{file.filename}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </UploadContainer>
//   );
// }

// export default Upload;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FileUploader from '../common/FileUploader';
import Notification from '../common/Notification';
import api from '../../utils/api';

const UploadContainer = styled.div`
  padding: 20px;
`;

function Upload() {
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        const response = await api.get('/file_history');
        setUploadedFiles(response.data.files || []);
      } catch (error) {
        console.error('Error fetching file history:', error);
        setNotification({
          message: 'Failed to fetch uploaded files. Please try again.',
          type: 'error'
        });
      }
    };

    fetchUploadedFiles();
  }, []);

  return (
    <UploadContainer>
      <h1>Upload Files</h1>
      {notification.message && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification({ message: '', type: 'success' })} 
        />
      )}
      <FileUploader 
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles} 
        setNotification={setNotification} 
      />
    </UploadContainer>
  );
}

export default Upload;