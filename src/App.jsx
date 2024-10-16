

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