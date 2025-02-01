import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',  // Explicitly set base path
  plugins: [react()],
  assetsInclude: ["**/*.glb"],
})
