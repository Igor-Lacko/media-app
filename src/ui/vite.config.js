import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            'pages': '/src/pages',
            'components': '/src/components',
            'hooks': '/src/hooks',
            'context': '/src/context',
            'utils': '/src/utils',
            'data': '/src/data',
            'layouts': '/src/layouts',
            // Does not work normally for some reason
            '@shared': path.resolve(__dirname, '../shared'),
            '@api': path.resolve(__dirname, '../api/src'),
        }
    }
})