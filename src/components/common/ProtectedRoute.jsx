// // import React from 'react';
// // import { Navigate, useLocation } from 'react-router-dom';
// // import { useAuth } from '../../context/AuthContext';
// // import Loader from '../common/Loader';

// // const ProtectedRoute = ({ children }) => {
// //   const { auth, loading } = useAuth();
// //   const location = useLocation();

// //   console.log('ProtectedRoute - Current path:', location.pathname);
// //   console.log('ProtectedRoute - Auth state:', auth);
// //   console.log('ProtectedRoute - Loading state:', loading);

// //   if (loading) {
// //     return <Loader />;
// //   }

// //   if (!auth.isAuthenticated) {
// //     console.log('ProtectedRoute - Redirecting to login');
// //     return <Navigate to="/login" state={{ from: location }} replace />;
// //   }

// //   return children;
// // };

// // export default ProtectedRoute;
// // src/components/common/ProtectedRoute.jsx

// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import Loader from './Loader';

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();
//   const location = useLocation();

//   console.log('ProtectedRoute - Current path:', location.pathname);
//   console.log('ProtectedRoute - Authenticated:', isAuthenticated);

//   if (loading) {
//       return <Loader />;
//   }
//   if (!isAuthenticated) {
//     console.log('ProtectedRoute - Redirecting to login');
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

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