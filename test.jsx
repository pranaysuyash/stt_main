// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout'; // Assuming you have a Layout component that includes SideNav and Breadcrumbs
import Loader from './components/common/Loader';

// Lazy-loaded Components
const Dashboard = lazy(() => import('./components/pages/Dashboard'));
const Upload = lazy(() => import('./components/pages/Upload'));
const Library = lazy(() => import('./components/pages/Library'));
const Settings = lazy(() => import('./components/pages/Settings'));
const Help = lazy(() => import('./components/pages/Help'));
const NotFound = lazy(() => import('./components/pages/NotFound'));

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Redirect root to /dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Dashboard Route */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Nested Routes under Dashboard */}
            <Route path="/dashboard/upload" element={<Upload />} />
            <Route path="/dashboard/library" element={<Library />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/help" element={<Help />} />
            
            {/* Fallback Route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
