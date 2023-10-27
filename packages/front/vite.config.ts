import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps:{
    exclude: ['.prisma/client/index-browser']
  },
  build: {
    commonjsOptions: {
      exclude: [
        '.prisma/client/index-browser'
      ],
      include: []
    }
  }
})
