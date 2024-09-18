// src/App.jsx
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';
import ErrorBoundary from './components/common/ErrorBoundary';
import Layout from './components/common/Layout';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import Upload from './components/pages/Upload';
import Settings from './components/pages/Settings';
import Help from './components/pages/Help'; // You'll need to create a Help page
import Library from './components/pages/Library'; // You'll need to create a Library page

const AppContainer = styled.div`
  /* Additional global styles if needed */
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ErrorBoundary>
        <AppContainer>
          <Layout>
            <Switch>
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/upload" component={Upload} />
              <Route path="/library" component={Library} />
              <Route path="/analysis" component={() => <div>Analysis Page (To Be Implemented)</div>} />
              <Route path="/settings" component={Settings} />
              <Route path="/help" component={() => <div>Help Page (To Be Implemented)</div>} />
              <Route path="*">
                <div>404 - Page Not Found</div>
              </Route>
            </Switch>
          </Layout>
        </AppContainer>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
