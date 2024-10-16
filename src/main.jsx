

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ChakraProvider } from '@chakra-ui/react';
import { theme as styledTheme } from './styles/theme';
import chakraTheme from './styles/chakraTheme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledThemeProvider theme={styledTheme}>
        <ChakraProvider theme={chakraTheme}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ChakraProvider>
      </StyledThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);