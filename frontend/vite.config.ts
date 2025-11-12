import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // Proxy for API requests
  server: {
    proxy: {
      // Capture all requests starting with /api
      '/api': {
        // Forward the request to the actual backend address
        target: 'http://localhost:8080',
        // Rewrite the path: remove /api from the request
        rewrite: (path) => path.replace(/^\/api/, ''),
        // Allow cross-origin requests
        changeOrigin: true,
      }
    }
  }
})
