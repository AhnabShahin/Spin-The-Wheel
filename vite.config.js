import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'src/main.jsx',
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  server: {
    port: 3000,
    cors: true,
    strictPort: true,
    hmr: {
      port: 3000,
      host: 'wordpress.test',
      protocol: 'ws',
      overlay: true,
      clientPort: 3000
    },
    watch: {
      usePolling: true,
      interval: 1000
    }
  },
  base: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : '/wp-content/plugins/Spin-The-Wheel/dist/'
})
