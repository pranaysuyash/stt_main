import React, { Suspense } from 'react';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import ErrorBoundary from './components/common/ErrorBoundary';
import Loader from './components/common/Loader';
import AppRoutes from './AppRoutes';
import './fontAwesome';

const AppContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
`;

function App() {
  return (
    <ErrorBoundary>
      <AppContainer>
        <GlobalStyle />
        <Suspense fallback={<Loader />}>
          <AppRoutes />
        </Suspense>
      </AppContainer>
    </ErrorBoundary>
  );
}

export default App;