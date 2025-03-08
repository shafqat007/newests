import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures correct relative asset paths
  build: {
    outDir: 'dist' // Explicitly setting output directory
  }
})
