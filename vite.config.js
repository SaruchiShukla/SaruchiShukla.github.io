import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Local / Cloudflare tunnel: '/'
// GitHub Pages: set VITE_BASE=/bloomday/ in the Actions workflow
const repoBase = process.env.VITE_BASE || '/'

function spaFallback() {
  return {
    name: 'spa-github-pages-fallback',
    closeBundle() {
      const index = resolve('dist/index.html')
      copyFileSync(index, resolve('dist/404.html'))
    },
  }
}

export default defineConfig({
  base: repoBase,
  plugins: [react(), spaFallback()],
})
