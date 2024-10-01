
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const { auth, loading } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute - Current path:', location.pathname);
  console.log('ProtectedRoute - Authenticated:', auth.isAuthenticated);
  console.log('ProtectedRoute - Loading:', loading);

  if (loading) {
    return <Loader />;
  }

  if (!auth.isAuthenticated) {
    console.log('ProtectedRoute - Redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;