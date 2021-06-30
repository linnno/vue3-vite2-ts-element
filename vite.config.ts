import { resolve } from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/vue3-vite2-ts-element/' : '/',
  server: {
    https: false,
  },
  resolve: {
    alias: { // 还需在tscofig中配置
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [vue()]
})