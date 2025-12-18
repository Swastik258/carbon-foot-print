import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
  port: 5173,
  host: '0.0.0.0',
allowedHosts: [
      'carbon-foot-print-production.up.railway.app',
    ],
  },
})
