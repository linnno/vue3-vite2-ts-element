import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteSvgIcons from 'vite-plugin-svg-icons';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/vue3-vite2-ts-element/' : '/',
  server: {
    https: false,
    port: 3001
  },
  resolve: {
    alias: { // 还需在tscofig中配置
      '@': resolve(__dirname, './src')
    }
  },
  define: {
    'process.env': process.env
  },
  plugins: [
    vue(),
    viteSvgIcons({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
  ]
});
