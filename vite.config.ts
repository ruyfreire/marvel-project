/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    include: ['**/*.test.tsx'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
  },
  server: {
    host: true,
    port: 5173,
  },
})
