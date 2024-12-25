import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({

  publicDir: './',

  plugins: [react(), svgr()],

  server: {
    host: true,
  },

  build: {
    emptyOutDir: true,
  }

})
