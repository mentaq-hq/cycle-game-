import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 5173,
    hmr: false
  },
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 4173
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'r3f': ['@react-three/fiber', '@react-three/drei'],
          'motion': ['framer-motion']
        }
      }
    }
  },
  optimizeDeps: { include: ['three', '@react-three/fiber', '@react-three/drei', 'zustand', 'framer-motion'] }
})
