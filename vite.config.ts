import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@app': '/src/app',
      '@assets': '/src/assets',
      '@components': '/src/components',
      "@features": '/src/features/',
      '@pages': '/src/pages',
      '@shared': '/src/shared',
      '@styles': '/src/styles'
    }
  }
})
