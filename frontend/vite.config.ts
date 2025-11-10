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
  //代理
  server: {
    proxy: {
      // 捕获所有以 /api 开头的请求
      '/api': {
        // 将请求转发到实际的后端地址
        target: 'http://localhost:8080',
        // 重写路径：将请求中的 /api 移除
        // 例如：前端请求 /api/users
        //       实际发给后端的是 http://localhost:8080/users
        rewrite: (path) => path.replace(/^\/api/, ''),
        // 允许跨域
        changeOrigin: true,
      }
    }
  }
})
