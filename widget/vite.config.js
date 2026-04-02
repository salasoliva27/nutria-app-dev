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
    'import.meta.env.VITE_ANTHROPIC_API_KEY': JSON.stringify(process.env.ANTHROPIC_API_KEY || ''),
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(process.env.SUPABASE_URL || ''),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.SUPABASE_SERVICE_ROLE_KEY || ''),
  },
})
