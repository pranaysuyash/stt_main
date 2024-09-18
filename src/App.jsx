// src/App.jsx
import React , { Suspense, lazy } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';
import ErrorBoundary from './components/common/ErrorBoundary';
import Layout from './components/common/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from './components/pages/Dashboard';
// import Upload from './components/pages/Upload';
// import Settings from './components/pages/Settings';
// import Help from './components/pages/Help'; // You'll need to create a Help page
// import Library from './components/pages/Library'; // You'll need to create a Library page
import Loader from './components/common/Loader'; // Create a Loader component

// Lazy-loaded page components
const Dashboard = lazy(() => import('./components/pages/Dashboard'));
const Upload = lazy(() => import('./components/pages/Upload'));
const Library = lazy(() => import('./components/pages/Library'));
const Settings = lazy(() => import('./components/pages/Settings'));
const Help = lazy(() => import('./components/pages/Help'));

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// function App() {
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [notification, setNotification] = useState({ message: '', type: '' }); // Define notification state

//   // Fetch uploaded files when the app loads
//   useEffect(() => {
//     fetch('/api/file_history')
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.files) {
//           setUploadedFiles(data.files);
//         }
//       })
//       .catch((error) => console.error('Error fetching files:', error));
//   }, []);

//   return (
//     <ThemeProvider theme={theme}>
//       <GlobalStyle />
//       <ErrorBoundary>
//         <Container>
//           <h1>Audio/Video Waveform Analyzer</h1>
          
//           {/* Display Notification if exists */}
//           {notification.message && (
//             <Notification 
//               message={notification.message} 
//               type={notification.type} 
//               onClose={() => setNotification({ message: '', type: '' })} 
//             />
//           )}
          
//           <FileUploader 
//             setUploadedFiles={setUploadedFiles} 
//             setNotification={setNotification} 
//           />
//           <FileDashboard uploadedFiles={uploadedFiles} />
//         </Container>
//       </ErrorBoundary>
//     </ThemeProvider>
//   );
// }


// export default App;
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ErrorBoundary>
        <AppContainer>
          <Layout>
            <Suspense fallback={<Loader />}>
            <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/library" element={<Library />} />
              <Route path="/analysis" element={<div>Analysis Page (To Be Implemented)</div>} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
            </Suspense>
          </Layout>
        </AppContainer>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
