import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import routes from './routes';
import Loader from './components/common/Loader';

function AppRoutes() {
  const location = useLocation();
  const { auth, loading } = useAuth();

  useEffect(() => {
    console.log('Current route:', location.pathname);
    console.log('Auth state:', auth);
    console.log('Loading state:', loading);
  }, [location.pathname, auth, loading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      {routes.map((route, index) => {
        if (route.children) {
          return (
            <Route key={index} path={route.path} element={route.element}>
              {route.children.map((child, childIndex) => (
                <Route
                  key={`${index}-${childIndex}`}
                  path={child.path}
                  element={child.element}
                />
              ))}
            </Route>
          );
        }
        return (
          <Route key={index} path={route.path} element={route.element} />
        );
      })}
    </Routes>
  );
}

export default AppRoutes;