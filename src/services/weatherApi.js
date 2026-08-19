const API_KEY = import.meta.env.VITE_OWM_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = async (query, unit, signal) => {
  const weatherResponse = await fetch(
    `${BASE_URL}/weather?${query}&units=${unit}&appid=${API_KEY}`,
    { signal }
  );

  if (!weatherResponse.ok) {
    if (weatherResponse.status === 404) {
      throw new Error(
        "CITY_NOT_FOUND"
      );
    }

    if (weatherResponse.status === 401) {
      throw new Error(
        "INVALID_API_KEY"
      );
    }

    if (weatherResponse.status === 429) {
      throw new Error(
        "API_LIMIT_REACHED"
      );
    }

    throw new Error(
      "WEATHER_SERVICE_ERROR"
    );
  }

  const weatherData = await weatherResponse.json();

  const forecastResponse = await fetch(
    `${BASE_URL}/forecast?${query}&units=${unit}&appid=${API_KEY}`,
    { signal }
  );

  if (!forecastResponse.ok) {
    if (forecastResponse.status === 429) {
      throw new Error(
        "API_LIMIT_REACHED"
      );
    }

    throw new Error(
      "FORECAST_SERVICE_ERROR"
    );
  }

  const forecastData =
    await forecastResponse.json();

  return {
    weather: weatherData,
    forecast: forecastData,
  };
};

export const getWeatherByCity = (
  city,
  unit,
  signal
) => {
  const query =
    `q=${encodeURIComponent(city)}`;

  return getWeatherData(
    query,
    unit,
    signal
  );
};

export const getCitySuggestions = async (
  city,
  signal
) => {
  if (!city.trim()) return [];

  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      city
    )}&limit=5&appid=${API_KEY}`,
    { signal }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch city suggestions");
  }

  return response.json();
};

export const getWeatherByCoordinates = (
  latitude,
  longitude,
  unit,
  signal
) => {
  const query =
    `lat=${latitude}&lon=${longitude}`;

  return getWeatherData(
    query,
    unit,
    signal
  );
};

export const getAirQuality = async (
  latitude,
  longitude,
  signal
) => {
  const response = await fetch(
    `${BASE_URL}/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`,
    { signal }
  );

  if (!response.ok) {
    throw new Error("Air quality fetch failed");
  }

  return response.json();
};