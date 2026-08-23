# 🌦️ Weather App

![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?logo=tailwindcss&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?logo=googlechrome&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

A modern, responsive **Progressive Web App (PWA)** for real-time weather information, forecasts, air quality, weather alerts, and weather insights.

Built with **React, Vite, Tailwind CSS, Recharts, and the OpenWeather API**, with a focus on performance, responsive design, accessibility, and a polished user experience.

---

## 🚀 Live Demo

**Live App:**  
https://weather-app-7cfd.vercel.app/

---

## ✨ Features

### 🌤️ Weather

- 🔍 Search weather by city
- 📍 Get weather using current location
- 🌡️ Celsius / Fahrenheit toggle
- 🌅 Sunrise and sunset information
- 💨 Wind information
- 💧 Humidity and atmospheric data
- 🌡️ Feels-like temperature
- 🌙 Dynamic day/night experience
- 🎨 Dynamic weather-based backgrounds

### 📊 Forecasts & Charts

- ⏱️ Hourly weather forecast
- 📅 5-day weather forecast
- 📈 Interactive temperature chart
- 🌧️ Rain probability chart
- 📊 Weather statistics
- 📱 Responsive charts for desktop and mobile

### 🌬️ Air Quality

- Air Quality Index information
- Pollutant information
- Weather + air quality insights

### 🚨 Weather Alerts

- Weather condition alerts
- Context-aware alert information
- Visual alert components

### 🧠 Weather Insights

- Smart weather insights based on forecast data
- Contextual recommendations
- Combined weather and air-quality analysis

### ⭐ Favorites

- Save favorite cities
- Quickly access saved locations
- Persistent favorites using LocalStorage

### 🕘 Recent Searches

- Automatically save recent searches
- Quickly search previously viewed cities
- Persistent search history using LocalStorage

### 📲 Progressive Web App

- Installable on supported mobile and desktop browsers
- Offline application shell
- Service worker
- Automatic PWA updates
- Web App Manifest
- Standalone display mode

---

## ⚡ Performance

The application is optimized for production with:

- ⚡ Vite production builds
- 💤 Lazy-loaded chart components
- 📦 Code splitting
- 🦥 Suspense-based loading states
- 💾 LocalStorage persistence
- 🚫 Request cancellation using `AbortController`
- 🔄 Preventing unnecessary API requests
- 📐 Responsive chart sizing using `ResizeObserver`
- 🦴 Skeleton loading states
- 🧹 ESLint code-quality checks

The application was also tested using production builds and Lighthouse.

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript (ES6+)
- Vite
- Tailwind CSS

### Libraries

- React Icons
- Recharts

### APIs

- OpenWeather API

### PWA

- vite-plugin-pwa
- Service Worker
- Web App Manifest

### Development Tools

- ESLint
- Git
- GitHub
- Vercel

---

## 📸 Screenshots

Add your latest production screenshots here.

```text
screenshots/
├── desktop.png
├── mobile.png
├── forecast.png
└── charts.png