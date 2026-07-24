import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Le proxy renvoie /api vers le backend FastAPI en développement,
// pour que le front puisse appeler fetch('/api/predict') sans CORS.
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: process.env.VITE_BACKEND_URL || 'http://localhost:8000',
                changeOrigin: true,
            },
        },
    },
});
