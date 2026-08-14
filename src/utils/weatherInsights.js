export const getWeatherInsights = (weather, airQuality, hourly = []) => {
  if (!weather) return [];

  const insights = [];

  const temperature = weather.temperature;
  const feelsLike = weather.feelsLike;
  const humidity = weather.humidity;
  const windSpeed = weather.windSpeed;

  // 🌡️ Temperature
  if (temperature >= 40) {
    insights.push({
      type: "warning",
      icon: "🔥",
      title: "Extreme heat",
      message:
        "Very high temperatures are expected. Stay hydrated and avoid prolonged exposure to the heat.",
    });
  } else if (temperature >= 35) {
    insights.push({
      type: "warning",
      icon: "☀️",
      title: "Hot weather",
      message:
        "It's quite hot today. Stay hydrated and try to avoid direct sunlight for long periods.",
    });
  } else if (temperature <= 10) {
    insights.push({
      type: "info",
      icon: "🥶",
      title: "Cold weather",
      message:
        "Temperatures are low today. Consider wearing warm clothing when heading outside.",
    });
  }

  // 🌡️ Feels like
  if (Math.abs(feelsLike - temperature) >= 5) {
    insights.push({
      type: "info",
      icon: "🌡️",
      title: "Feels different",
      message: `It feels like ${Math.round(
        feelsLike
      )}° compared with an actual temperature of ${Math.round(
        temperature
      )}°.`,
    });
  }

  // 💧 Humidity
  if (humidity >= 80) {
    insights.push({
      type: "info",
      icon: "💧",
      title: "High humidity",
      message:
        "Humidity is high, which may make the weather feel warmer and less comfortable.",
    });
  }

  // 💨 Wind
  if (windSpeed >= 10) {
    insights.push({
      type: "warning",
      icon: "💨",
      title: "Strong winds",
      message:
        "Strong winds are currently present. Be cautious when outdoors.",
    });
  }

  // 🌧️ Rain
  const highestRainProbability = Math.max(
    ...hourly.map((hour) => hour.rainProbability ?? 0),
    0
  );

  if (highestRainProbability >= 70) {
    insights.push({
      type: "warning",
      icon: "🌧️",
      title: "Rain likely",
      message:
        "There is a high chance of rain in the upcoming hours. Carry an umbrella if you're heading outside.",
    });
  } else if (highestRainProbability >= 40) {
    insights.push({
      type: "info",
      icon: "🌦️",
      title: "Possible rain",
      message:
        "Rain is possible during the upcoming hours, so keep an eye on the forecast.",
    });
  }

  // 🌿 Air quality
  const aqi = airQuality?.list?.[0]?.main?.aqi;

  if (aqi >= 4) {
    insights.push({
      type: "warning",
      icon: "😷",
      title: "Poor air quality",
      message:
        "Air quality is currently poor. Consider reducing prolonged outdoor activity.",
    });
  } else if (aqi === 3) {
    insights.push({
      type: "info",
      icon: "🌫️",
      title: "Moderate air quality",
      message:
        "Air quality is moderate. Sensitive individuals may want to limit prolonged outdoor exposure.",
    });
  }

  return insights;
};