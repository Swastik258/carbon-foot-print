import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    port: 5173, // Set the server port to 5173
    host: true,  // Allows external access (useful for Docker)
  },
})
