import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

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
        }
    }
})