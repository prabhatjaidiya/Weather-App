export const getWeatherEmoji = (iconCode) => {
const iconMap = {
  "01d": "☀️", "01n": "🌙",
  "02d": "🌤️", "02n": "☁️",
  "03d": "⛅", "03n": "⛅",
  "04d": "☁️", "04n": "☁️",
  "09d": "🌧️", "09n": "🌧️",
  "10d": "🌦️", "10n": "🌧️",
  "11d": "⛈️", "11n": "⛈️",
  "13d": "❄️", "13n": "❄️",
  "50d": "🌫️", "50n": "🌫️",
};

return iconMap[iconCode] || "🌡️";
}

export const getBgGradient = (iconCode) => {
   if (!iconCode) return "linear-gradient(160deg, #0B1120 0%, #1E2D4A 100%)";
  if (iconCode.startsWith("01")) // clear
    return "linear-gradient(160deg, #0B1120 0%, #1a3a6b 50%, #f59e0b22 100%)";
  if (iconCode.startsWith("02") || iconCode.startsWith("03"))
    return "linear-gradient(160deg, #0B1120 0%, #1E2D4A 100%)";
  if (iconCode.startsWith("09") || iconCode.startsWith("10"))
    return "linear-gradient(160deg, #0B1120 0%, #0f2027 50%, #1a2a4a 100%)";
  if (iconCode.startsWith("11")) // storm
    return "linear-gradient(160deg, #0B1120 0%, #1a0533 100%)";
  if (iconCode.startsWith("13")) // snow
    return "linear-gradient(160deg, #1a2a4a 0%, #2d4a6b 100%)";
  return "linear-gradient(160deg, #0B1120 0%, #1E2D4A 100%)";
}