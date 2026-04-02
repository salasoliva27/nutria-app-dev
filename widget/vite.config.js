import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
    },
  },
  build: {
    lib: {
      entry: 'src/main.jsx',
      name: 'NutriaWidget',
      fileName: () => 'widget.js',
      formats: ['iife'],
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
})
