import { defineConfig } from 'cypress';
import { devServer } from '@cypress/vite-dev-server';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  component: {
    devServer: async (devServerConfig) => {
      // Dynamically import Vite configuration
      const { default: viteConfig } = await import(path.resolve(__dirname, './vite.config.js'));
      return devServer({
        ...devServerConfig,
        framework: 'react',
        viteConfig, // Pass the Vite configuration
      });
    },
  },
  e2e: {
    experimentalStudio: true, // Enable Cypress Studio for visual test creation
    setupNodeEvents() {
      // You can add node event listeners here when needed
    },
  },
});