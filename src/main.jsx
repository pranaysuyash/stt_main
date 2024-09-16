import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure FontAwesome is installed

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
