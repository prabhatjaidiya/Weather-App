const API_KEY = import.meta.env.VITE_OWM_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = async (query, unit, signal) => {
  const weatherResponse = await fetch(
    `${BASE_URL}/weather?${query}&units=${unit}&appid=${API_KEY}`,
    { signal }
  );

  if (!weatherResponse.ok) {
    throw new Error("City not found");
  }

  const weatherData = await weatherResponse.json();

  const forecastResponse = await fetch(
    `${BASE_URL}/forecast?${query}&units=${unit}&appid=${API_KEY}`,
    { signal }
  );

  if (!forecastResponse.ok) {
    throw new Error("Forecast fetch failed");
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