// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Optional: Alias for easier imports
    },
  },
  server: {
    port: 5173, // Explicitly set the port
    host: true, // Allows access from other devices on your network
    strictPort: false, // Allows Vite to increment the port if 5173 is already in use
    proxy: {
      '/upload': 'http://localhost:5555', 
      '/api': 'http://localhost:5555', // Proxy API calls to Flask backend
      '/static': {
        target: 'http://localhost:5555',   // Proxy static file requests (uploads, etc.)
        changeOrigin: true,
      },
    },
    open: true, // Automatically open the app in the browser when the server starts
  },
  base: './', // Ensures correct asset path resolution
});
