import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Serves at https://saruchishukla.github.io/ with VITE_BASE=/
const repoBase = process.env.VITE_BASE || '/'

export default defineConfig({
  base: repoBase,
  plugins: [react()],
})
