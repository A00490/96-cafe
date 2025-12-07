import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // MATCH THE HARDCODED PORT 5001
        target: 'http://localhost:5001', 
        changeOrigin: true,
        secure: false,
      },
    }
  }
});