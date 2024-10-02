// // src/routes.jsx

import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/common/Layout';

const Dashboard = lazy(() => import('./components/pages/Dashboard'));
const Upload = lazy(() => import('./components/pages/Upload'));
const Library = lazy(() => import('./components/pages/Library'));
const Settings = lazy(() => import('./components/pages/Settings'));
const Help = lazy(() => import('./components/pages/Help'));
const NotFound = lazy(() => import('./components/pages/NotFound'));
const Analysis = lazy(() => import('./components/pages/Analysis'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/auth/ResetPassword'));
const LandingPage = lazy(() => import('./components/pages/LandingPage'));

const routes = [
  {
    path: '/',
    element: <Navigate to="/home" replace />,
  },
  {
    path: '/home',
    element: <LandingPage />,
    breadcrumb: 'Home',
  },
  {
    path: '/login',
    element: <Login />,
    breadcrumb: 'Login',
  },
  {
    path: '/register',
    element: <Register />,
    breadcrumb: 'Register',
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    breadcrumb: 'Forgot Password',
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />,
    breadcrumb: 'Reset Password',
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <Dashboard />, breadcrumb: 'Dashboard' },
      { path: 'upload', element: <Upload />, breadcrumb: 'Upload' },
      { path: 'library', element: <Library />, breadcrumb: 'Library' },
      { path: 'analysis', element: <Analysis />, breadcrumb: 'Analysis' },
      { path: 'settings', element: <Settings />, breadcrumb: 'Settings' },
      { path: 'help', element: <Help />, breadcrumb: 'Help' },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
    breadcrumb: 'Not Found',
  },
];

export default routes;