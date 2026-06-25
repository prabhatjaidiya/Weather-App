import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Weather App',
        short_name: 'Weather',
        theme_color: '#2196f3',
        background_color: '#2196f3',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/weather_icon_192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/weather_icon_512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})