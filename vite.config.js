import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',  // Use relative base path for assets
  plugins: [react()],
  assetsInclude: ["**/*.glb"],
  publicDir: 'public', // Explicitly set public directory
})
