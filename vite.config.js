import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow external network access
    port: 3000, // Change this to your preferred port if needed
    allowedHosts: [
      'ecom-demo-0c3u.onrender.com', // Add this host to the allowed list
    ],
  },
})
