
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from './routes';

function AppRoutes({ onPlayMedia }) {
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

        if (route.path === '/library') {
          return (
            <Route
              key={index}
              path={route.path}
              element={React.cloneElement(route.element, { onPlayMedia })}
            />
          );
        }

        return (
          <Route key={index} path={route.path} element={route.element} />
        );
      })}
    </Routes>
  );
}

AppRoutes.propTypes = {
  onPlayMedia: PropTypes.func.isRequired,
};

export default AppRoutes;