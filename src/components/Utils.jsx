export const getBgGradient = (iconCode) => {
  if (!iconCode) {
    return "linear-gradient(160deg, #1E3A5F 0%, #4A6FA5 100%)";
  }

  const isNight = iconCode.endsWith("n");

  // CLEAR
  if (iconCode.startsWith("01")) {
    return isNight
      ? "linear-gradient(160deg, #020617 0%, #0B1430 50%, #111936 100%)"
      : "linear-gradient(160deg, #5DB7E8 0%, #8DD3EF 50%, #D9EEF5 100%)";
  }

  // FEW / SCATTERED CLOUDS
  if (
    iconCode.startsWith("02") ||
    iconCode.startsWith("03")
  ) {
    return isNight
      ? "linear-gradient(160deg, #030712 0%, #111827 55%, #172554 100%)"
      : "linear-gradient(160deg, #6FB9DD 0%, #A8D8EA 55%, #E2F0F4 100%)";
  }

  // BROKEN CLOUDS
  if (iconCode.startsWith("04")) {
    return isNight
      ? "linear-gradient(160deg, #020617 0%, #172033 55%, #263552 100%)"
      : "linear-gradient(160deg, #7897A8 0%, #AFC5CF 55%, #DCE7EA 100%)";
  }

  // RAIN
  if (
    iconCode.startsWith("09") ||
    iconCode.startsWith("10")
  ) {
    return isNight
      ? "linear-gradient(160deg, #020617 0%, #0B1728 50%, #162A46 100%)"
      : "linear-gradient(160deg, #47758C 0%, #7099AA 50%, #B7CDD5 100%)";
  }

  // THUNDERSTORM
  if (iconCode.startsWith("11")) {
    return isNight
      ? "linear-gradient(160deg, #02030A 0%, #160D2D 55%, #29134A 100%)"
      : "linear-gradient(160deg, #40526B 0%, #665C7D 55%, #8D8298 100%)";
  }

  // SNOW
  if (iconCode.startsWith("13")) {
    return isNight
      ? "linear-gradient(160deg, #07101F 0%, #16243D 55%, #263B5A 100%)"
      : "linear-gradient(160deg, #A8D2E3 0%, #D4E8EF 55%, #F3F7F8 100%)";
  }

  // MIST / FOG
  if (iconCode.startsWith("50")) {
    return isNight
      ? "linear-gradient(160deg, #07101A 0%, #182632 55%, #293943 100%)"
      : "linear-gradient(160deg, #91AEB8 0%, #C1D1D5 55%, #E6EEEE 100%)";
  }

  return isNight
    ? "linear-gradient(160deg, #020617 0%, #0F172A 100%)"
    : "linear-gradient(160deg, #75BFE8 0%, #D9EEF5 100%)";
};

export const getWeatherEmoji = (iconCode) => {
  const iconMap = {
    "01d": "☀️",
    "01n": "🌙",
    "02d": "🌤️",
    "02n": "☁️",
    "03d": "⛅",
    "03n": "⛅",
    "04d": "☁️",
    "04n": "☁️",
    "09d": "🌧️",
    "09n": "🌧️",
    "10d": "🌦️",
    "10n": "🌧️",
    "11d": "⛈️",
    "11n": "⛈️",
    "13d": "❄️",
    "13n": "❄️",
    "50d": "🌫️",
    "50n": "🌫️",
  };
  return iconMap[iconCode] || "🌡️";
}