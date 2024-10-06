// // import React, { Suspense } from 'react';
// // import styled from 'styled-components';
// // import GlobalStyle from './styles/GlobalStyle';
// // import ErrorBoundary from './components/common/ErrorBoundary';
// // import Loader from './components/common/Loader';
// // import AppRoutes from './AppRoutes';
// // import './fontAwesome';

// // const AppContainer = styled.div`
// //   max-width: 100%;
// //   margin: 0 auto;
// //   background-color: ${({ theme }) => theme.colors.background};
// // `;

// // function App() {
// //   return (
// //     <ErrorBoundary>
// //       <AppContainer>
// //         <GlobalStyle />
// //         <Suspense fallback={<Loader />}>
// //           <AppRoutes />
// //         </Suspense>
// //       </AppContainer>
// //     </ErrorBoundary>
// //   );
// // }

// // export default App;

// // src/App.jsx
// import React, { Suspense, useState } from 'react';
// import styled, { ThemeProvider } from 'styled-components';
// import GlobalStyle from './styles/GlobalStyle';
// import ErrorBoundary from './components/common/ErrorBoundary';
// import Loader from './components/common/Loader';
// import AppRoutes from './AppRoutes';
// import './fontAwesome';
// import AudioPlayer from './components/AudioPlayer'; // Import AudioPlayer

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
//   },
// };

// function App() {
//   const [currentAudio, setCurrentAudio] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handlePlayAudio = (audio) => {
//     setCurrentAudio(audio);
//     setIsPlaying(true);
//   };

//   const handleClosePlayer = () => {
//     setCurrentAudio(null);
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
//             <AppRoutes
//               onPlayAudio={handlePlayAudio} // Pass handler to AppRoutes
//             />
//           </Suspense>
//           {/* Render AudioPlayer if an audio is selected */}
//           {currentAudio && (
//             <AudioPlayer
//               fileUrl={currentAudio.url}
//               fileName={currentAudio.name}
//               fileSize={currentAudio.size}
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

// // src/App.jsx
// import React, { Suspense, useState } from 'react';
// import styled, { ThemeProvider } from 'styled-components';
// import GlobalStyle from './styles/GlobalStyle';
// import ErrorBoundary from './components/common/ErrorBoundary';
// import Loader from './components/common/Loader';
// import AppRoutes from './AppRoutes';
// import './fontAwesome';
// import AudioPlayer from './components/common/AudioPlayer'; // Import AudioPlayer

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
//     error: '#FF4D4F', // For ErrorBoundary
//     primaryDark: '#2F3AFF', // Darker shade for hover states
//     border: '#CCCCCC', // For input borders
//     // Add other colors as needed
//   },
//   fonts: {
//     primary: 'Arial, sans-serif',
//     // Add other fonts if needed
//   },
//   fontSizes: {
//     body: '16px',
//     h1: '2.5rem',
//     h2: '2rem',
//     h3: '1.75rem',
//     h4: '1.5rem',
//     h5: '1.25rem',
//     h6: '1rem',
//     // Add other font sizes as needed
//   },
//   fontWeights: {
//     regular: 400,
//     medium: 500,
//     semiBold: 600,
//     bold: 700,
//     // Add other font weights as needed
//   },
// };

// function App() {
//   const [currentAudio, setCurrentAudio] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handlePlayAudio = (audio) => {
//     setCurrentAudio(audio);
//     setIsPlaying(true);
//   };

//   const handleClosePlayer = () => {
//     setCurrentAudio(null);
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
//             <AppRoutes onPlayAudio={handlePlayAudio} />
//           </Suspense>
//           {/* Render AudioPlayer if an audio is selected */}
//           {currentAudio && (
//             <AudioPlayer
//               fileUrl={currentAudio.url}
//               fileName={currentAudio.name}
//               fileSize={currentAudio.size}
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
import React, { Suspense, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import ErrorBoundary from './components/common/ErrorBoundary';
import Loader from './components/common/Loader';
import AppRoutes from './AppRoutes';
import './fontAwesome';
import MediaPlayer from './components/common/MediaPlayer';

const AppContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
`;

// Define your theme
const theme = {
  colors: {
    primary: '#4353FF',
    secondary: '#D9DCFF',
    disabled: '#A0A0A0',
    text: '#333333',
    background: '#FFFFFF',
    neutral: '#F8F8F8',
    error: '#FF4D4F',
    primaryDark: '#2F3AFF',
    border: '#CCCCCC',
  },
  fonts: {
    primary: 'Arial, sans-serif',
  },
  fontSizes: {
    body: '16px',
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.75rem',
    h4: '1.5rem',
    h5: '1.25rem',
    h6: '1rem',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
};

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
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <AppContainer>
          <GlobalStyle />
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
        </AppContainer>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;