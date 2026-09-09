/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Deployed to GitHub Pages under the /tic-tac-toe/ subpath
  base: '/tic-tac-toe/',
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setup.ts'],
  },
})
