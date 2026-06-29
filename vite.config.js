import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: ['favicon.svg', 'robots.txt'],

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
            type: 'image/png',
          },
          {
            src: '/weather_icon_512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },

      workbox: {
        navigateFallback: '/',
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.origin === 'https://api.openweathermap.org',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'weather-api-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },

      devOptions: {
        enabled: true,
      },
    }),
  ],
})