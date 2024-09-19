import React, { Suspense } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';
import ErrorBoundary from './components/common/ErrorBoundary';
import Layout from './components/common/Layout';
import { Routes, Route } from 'react-router-dom';
import Loader from './components/common/Loader';
import routes from './routes'; // Updated import statement

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  // padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ErrorBoundary>
        <AppContainer>
          <Layout>
            <Suspense fallback={<Loader />}>
              <Routes>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </Suspense>
          </Layout>
        </AppContainer>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;