import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Local / Cloudflare tunnel: '/'
// GitHub Pages: set VITE_BASE=/bloomday/ in the Actions workflow
const repoBase = process.env.VITE_BASE || '/'

export default defineConfig({
  base: repoBase,
  plugins: [react()],
})
