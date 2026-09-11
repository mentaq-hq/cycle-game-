import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Freebuff injects PORT env — respect it, fallback to 5173
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '5173', 10),
    hmr: false,
    strictPort: false
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '4173', 10),
    strictPort: false
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'r3f': ['@react-three/fiber', '@react-three/drei'],
          'motion': ['framer-motion'],
        }
      }
    }
  },
  optimizeDeps: { include: ['three','@react-three/fiber','@react-three/drei','zustand','framer-motion'] }
})
