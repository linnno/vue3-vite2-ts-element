import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/vue3-vite2-ts-element/' : '/',
  server: {
    https: false,
    // proxy: createProxy(VITE_PROXY),
  },
  plugins: [vue()]
})


// export default({ command }) => {
//   return {
//     base: process.env.NODE_ENV === 'production' ? '/[项目名]/' : '/',
//     // 服务端渲染
//     server: {
//       https: false,
//       // proxy: createProxy(VITE_PROXY),
//     },
//     plugins: [vue()]
//   };
// };
