// // src/context/AuthContext.jsx

// import React, { createContext, useState, useEffect, useContext } from 'react';
// import api from '../utils/api';

// export const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({ isAuthenticated: false, user: null });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initializeAuth = async () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//           const response = await api.get('/auth/me');
//           setAuth({ isAuthenticated: true, user: response.data.user });
//         } catch (error) {
//           console.error('Failed to fetch user:', error);
//           localStorage.removeItem('token');
//           delete api.defaults.headers.common['Authorization'];
//           setAuth({ isAuthenticated: false, user: null });
//         }
//       }
//       setLoading(false);
//     };
//     initializeAuth();
//   }, []);

//   const login = (token, user) => {
//     localStorage.setItem('token', token);
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     setAuth({ isAuthenticated: true, user });
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     delete api.defaults.headers.common['Authorization'];
//     setAuth({ isAuthenticated: false, user: null });
//   };

//   return (
//     <AuthContext.Provider value={{ auth, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await api.get('/auth/me');
        setAuth({ isAuthenticated: true, user: response.data.user });
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setAuth({ isAuthenticated: false, user: null });
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      await api.post('/auth/login', { email, password });
      const response = await api.get('/auth/me');
      setAuth({ isAuthenticated: true, user: response.data.user });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setAuth({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
