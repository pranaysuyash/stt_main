// // // import { defineConfig } from 'vite';
// // // import react from '@vitejs/plugin-react';
// // // import path from 'path';

// // // export default defineConfig({
// // //   plugins: [react()],
// // //   resolve: {
// // //     extensions: ['.js', '.jsx', '.json'],
// // //     alias: {
// // //       '@': path.resolve(__dirname, './src'),
// // //     },
// // //   },
// // //   server: {
// // //     port: 5173,
// // //     host: true,
// // //     strictPort: false,
// // //     proxy: {
// // //       '/api': {
// // //         target: 'http://localhost:5555',
// // //         changeOrigin: true,
// // //         secure: false,
// // //       },
// // //       '/static': {
// // //         target: 'http://localhost:5555',
// // //         changeOrigin: true,
// // //         secure: false,
// // //       },
// // //     },
// // //     open: true,
// // //   },
// // //   base: './',
// // // });

// // import { defineConfig } from 'vite';
// // import react from '@vitejs/plugin-react';
// // import path from 'path';

// // export default defineConfig({
// //   plugins: [react()],
// //   resolve: {
// //     alias: {
// //       '@': path.resolve(__dirname, './src'),
// //     },
// //   },
// //   server: {
// //     port: 5173,
// //     open: '/',
// //     proxy: {
// //       '/api': {
// //         target: 'http://localhost:5000',
// //         changeOrigin: true,
// //         secure: false,
// //       },
// //     },
// //   },
// // });
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
//   server: {
//     port: 5173,
//     open: true,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//     historyApiFallback: true,
//   },
//   build: {
//     outDir: 'dist',
//     assetsDir: 'assets',
//     manifest: true,
//     rollupOptions: {
//       input: 'src/main.jsx',
//     },
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5555', // Corrected port
        changeOrigin: true,
        secure: false,
      },
      '/static': {
        target: 'http://localhost:5555', // Ensure static files are also proxied
        changeOrigin: true,
        secure: false,
      },
    },
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    manifest: true,
    rollupOptions: {
      input: 'src/main.jsx',
    },
  },
});
