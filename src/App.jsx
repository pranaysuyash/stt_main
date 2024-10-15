
// import React, { Suspense, useState } from 'react';
// import styled, { ThemeProvider } from 'styled-components';
// import GlobalStyle from './styles/GlobalStyle';
// import ErrorBoundary from './components/common/ErrorBoundary';
// import Loader from './components/common/Loader';
// import AppRoutes from './AppRoutes';
// import './fontAwesome';
// import MediaPlayer from './components/common/MediaPlayer';

// const AppContainer = styled.div`
//   max-width: 100%;
//   margin: 0 auto;
//   background-color: ${({ theme }) => theme.colors.background};
// `;

// // Define your theme
// const theme = {
//   colors: {
//     primary: '#4353FF',
//     secondary: '#D9DCFF',
//     disabled: '#A0A0A0',
//     text: '#333333',
//     background: '#FFFFFF',
//     neutral: '#F8F8F8',
//     error: '#FF4D4F',
//     primaryDark: '#2F3AFF',
//     border: '#CCCCCC',
//   },
//   fonts: {
//     primary: 'Arial, sans-serif',
//   },
//   fontSizes: {
//     body: '16px',
//     h1: '2.5rem',
//     h2: '2rem',
//     h3: '1.75rem',
//     h4: '1.5rem',
//     h5: '1.25rem',
//     h6: '1rem',
//   },
//   fontWeights: {
//     regular: 400,
//     medium: 500,
//     semiBold: 600,
//     bold: 700,
//   },
// };

// function App() {
//   const [currentMedia, setCurrentMedia] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handlePlayMedia = (media) => {
//     setCurrentMedia(media);
//     setIsPlaying(true);
//   };

//   const handleClosePlayer = () => {
//     setCurrentMedia(null);
//     setIsPlaying(false);
//   };

//   const togglePlayPause = (playing) => {
//     setIsPlaying(playing);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <ErrorBoundary>
//         <AppContainer>
//           <GlobalStyle />
//           <Suspense fallback={<Loader />}>
//             <AppRoutes onPlayMedia={handlePlayMedia} />
//           </Suspense>
//           {currentMedia && (
//             <MediaPlayer
//               fileUrl={currentMedia.url}
//               fileName={currentMedia.name}
//               fileType={currentMedia.type}
//               fileSize={currentMedia.size}
//               onClose={handleClosePlayer}
//               isPlaying={isPlaying}
//               togglePlayPause={togglePlayPause}
//             />
//           )}
//         </AppContainer>
//       </ErrorBoundary>
//     </ThemeProvider>
//   );
// }

// export default App;

///////using chakraui and removing modal and moving to grid based
// src/App.jsx

import React, { Suspense, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
// import GlobalStyle from './styles/GlobalStyle'; // You can adjust or remove this if fully migrating to Chakra
import ErrorBoundary from './components/common/ErrorBoundary';
import Loader from './components/common/Loader';
import AppRoutes from './AppRoutes';
import './fontAwesome';
import MediaPlayer from './components/common/MediaPlayer';
import theme from './styles/chakraTheme'; // Updated theme to integrate with Chakra

function App() {
  const [currentMedia, setCurrentMedia] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayMedia = (media) => {
    setCurrentMedia(media);
    setIsPlaying(true);
  };

  const handleClosePlayer = () => {
    setCurrentMedia(null);
    setIsPlaying(false);
  };

  const togglePlayPause = (playing) => {
    setIsPlaying(playing);
  };

  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary>
        {/* GlobalStyle can be optional if you fully migrate to Chakra */}
        <Suspense fallback={<Loader />}>
          <AppRoutes onPlayMedia={handlePlayMedia} />
        </Suspense>
        {currentMedia && (
          <MediaPlayer
            fileUrl={currentMedia.url}
            fileName={currentMedia.name}
            fileType={currentMedia.type}
            fileSize={currentMedia.size}
            onClose={handleClosePlayer}
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
          />
        )}
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;