import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  server: {
    host: true,
    port: 3000,
    allowedHosts: [
      'localhost',
      'warm-walls-return.loca.lt',
    ],
  },
  resolve: {
    alias: {
      '@layout': path.resolve(__dirname, 'src/assets/styles/layout'),
      '@context': path.resolve(__dirname, 'src/contexts'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@utilities': path.resolve(__dirname, 'src/assets/styles/utilities'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@routes': path.resolve(__dirname, 'src/routes'),
    }
  }
})