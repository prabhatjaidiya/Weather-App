const addInsight = (insights, insight) => {
  const exists = insights.some(
    (item) => item.title === insight.title
  );

  if (!exists) {
    insights.push(insight);
  }
};

export const getWeatherInsights = (
  weather,
  airQuality,
  hourly = []
) => {
  if (!weather) return [];

  const insights = [];

  const temperature = weather.temperature;
  const feelsLike = weather.feelsLike;
  const humidity = weather.humidity;
  const windSpeed = weather.windSpeed;

  const rainValues = hourly.map(
    (hour) => hour.rainProbability ?? 0
  );

  const highestRainProbability = Math.max(
    ...rainValues,
    0
  );

  const averageRainProbability =
    rainValues.length > 0
      ? Math.round(
        rainValues.reduce(
          (sum, value) => sum + value,
          0
        ) / rainValues.length
      )
      : 0;

  const aqi = airQuality?.list?.[0]?.main?.aqi;

  // 🌡️ Temperature
  if (temperature >= 40) {
    addInsight(insights, {
      type: "warning",
      icon: "🔥",
      title: "Extreme heat",
      message:
        "Very high temperatures are expected. Stay hydrated and avoid prolonged exposure to the heat.",
    });
  } else if (temperature >= 35) {
    addInsight(insights, {
      type: "warning",
      icon: "☀️",
      title: "Hot weather",
      message:
        "It's quite hot today. Stay hydrated and try to avoid direct sunlight for long periods.",
    });
  } else if (temperature <= 10) {
    addInsight(insights, {
      type: "info",
      icon: "🥶",
      title: "Cold weather",
      message:
        "Temperatures are low today. Consider wearing warm clothing when heading outside.",
    });
  }

  // 🌡️ Feels like
  if (
    Number.isFinite(feelsLike) &&
    Number.isFinite(temperature) &&
    Math.abs(feelsLike - temperature) >= 5
  ) {
    addInsight(insights, {
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
    addInsight(insights, {
      type: "info",
      icon: "💧",
      title: "High humidity",
      message:
        "Humidity is high, which may make the weather feel warmer and less comfortable.",
    });
  } else if (humidity <= 30) {
    addInsight(insights, {
      type: "info",
      icon: "🏜️",
      title: "Dry air",
      message:
        "The air is relatively dry. Staying hydrated can help you stay comfortable.",
    });
  }

  // 💨 Wind
  if (windSpeed >= 10) {
    addInsight(insights, {
      type: "warning",
      icon: "💨",
      title: "Strong winds",
      message:
        "Strong winds are currently present. Be cautious when outdoors.",
    });
  }

  // 🌧️ Rain + Umbrella
  if (
    highestRainProbability >= 60 &&
    averageRainProbability >= 30
  ) {
    addInsight(insights, {
      type: "warning",
      icon: "☂️",
      title: "Umbrella recommended",
      message:
        "Rain chances remain elevated across the upcoming hours. Carrying an umbrella would be a good idea.",
    });
  } else if (highestRainProbability >= 70) {
    addInsight(insights, {
      type: "warning",
      icon: "🌧️",
      title: "Rain likely",
      message:
        "There is a high chance of rain in the upcoming hours.",
    });
  } else if (highestRainProbability >= 40) {
    addInsight(insights, {
      type: "info",
      icon: "🌦️",
      title: "Possible rain",
      message:
        "Rain is possible during the upcoming hours, so keep an eye on the forecast.",
    });
  }

  // 🏃 Outdoor activity
  const comfortableTemperature =
    temperature >= 15 && temperature <= 30;

  const manageableWind = windSpeed < 8;
  const manageableRain = highestRainProbability < 40;
  const acceptableAirQuality = !aqi || aqi <= 2;

  if (
    comfortableTemperature &&
    manageableWind &&
    manageableRain &&
    acceptableAirQuality
  ) {
    addInsight(insights, {
      type: "success",
      icon: "🏃",
      title: "Good outdoor conditions",
      message:
        "Temperature, wind, rain chances, and air quality look favorable for outdoor activities.",
    });
  }

  // 👕 Clothing
  if (temperature >= 30) {
    addInsight(insights, {
      type: "info",
      icon: "👕",
      title: "Light clothing recommended",
      message:
        "Warm conditions are expected. Light, breathable clothing should be comfortable.",
    });
  } else if (temperature <= 15) {
    addInsight(insights, {
      type: "info",
      icon: "🧥",
      title: "Warm clothing recommended",
      message:
        "Cool conditions are expected. Consider wearing a jacket or other warm layers.",
    });
  }

  // 🌿 Air quality
  if (aqi >= 4) {
    addInsight(insights, {
      type: "warning",
      icon: "😷",
      title: "Poor air quality",
      message:
        "Air quality is currently poor. Consider reducing prolonged outdoor activity.",
    });
  } else if (aqi === 3) {
    addInsight(insights, {
      type: "info",
      icon: "🌫️",
      title: "Moderate air quality",
      message:
        "Air quality is moderate. Sensitive individuals may want to limit prolonged outdoor exposure.",
    });
  } else if (aqi === 1) {
    addInsight(insights, {
      type: "success",
      icon: "🌿",
      title: "Good air quality",
      message:
        "Air quality is currently good, making outdoor activities more comfortable.",
    });
  }

  const priority = {
    warning: 3,
    info: 2,
    success: 1,
  };

  return insights
    .sort(
      (a, b) =>
        (priority[b.type] || 0) -
        (priority[a.type] || 0)
    )
    .slice(0, 5);
};