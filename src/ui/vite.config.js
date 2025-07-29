import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      'pages': '/src/pages',
      'components': '/src/components',
      'hooks': '/src/hooks',
      'context': '/src/context',
      'utils': '/src/utils',
      'data': '/src/data',
      'layouts': '/src/layouts',
      'not-found': '/src/not-found',
      'electron': '/src/electron',
      // Does not work normally for some reason
      '@shared': path.resolve(__dirname, '../shared'),
    }
  },
  server: {
    port: 5173
  }
});