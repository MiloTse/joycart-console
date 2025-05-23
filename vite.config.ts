import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 8080, // can be replaced with any port
    proxy: {
      '/api': {
        target: 'http://localhost:8082', // API服务器地址，应与api.config.ts中保持一致
        changeOrigin: true,
        rewrite: (path) => path
      }
    }
  }
})