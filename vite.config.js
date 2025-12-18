import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    port: 5173,        // Vite dev server port
    host: '0.0.0.0',   // Allow access from everywhere (Docker / LAN / VM)
  },
})
