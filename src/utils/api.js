
// // src/utils/api.js

// import axios from 'axios';

// const api = axios.create({
//   baseURL: '/api',
//   withCredentials: true,
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('jwtToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     console.log('API Request:', config.method.toUpperCase(), config.url);
//     return config;
//   },
//   (error) => {
//     console.error('API Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     console.log('API Response:', response.status, response.data);
//     return response;
//   },
//   (error) => {
//     console.error('API Response Error:', error.response?.status, error.response?.data);
//     return Promise.reject(error);
//   }
// );

// export default api;


// api.js

import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // Include cookies with requests
});

// Optional: You can keep the interceptors for logging purposes if you wish
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
