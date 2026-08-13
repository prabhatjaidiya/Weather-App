const API_KEY = import.meta.env.VITE_OWM_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeatherByCity = async (city, unit, signal) => {
  const weatherResponse = await fetch(
    `${BASE_URL}/weather?q=${city}&units=${unit}&appid=${API_KEY}`,
    { signal }
  );

  if (!weatherResponse.ok) {
    throw new Error("City not found");
  }

  const weatherData = await weatherResponse.json();

  const forecastResponse = await fetch(
    `${BASE_URL}/forecast?q=${city}&units=${unit}&appid=${API_KEY}`,
    { signal }
  );

  if (!forecastResponse.ok) {
    throw new Error("Forecast fetch failed");
  }

  const forecastData = await forecastResponse.json();

  return {
    weather: weatherData,
    forecast: forecastData,
  };
};

export const getWeatherByCoordinates = async (
  latitude,
  longitude,
  unit,
  signal
) => {
  const weatherResponse = await fetch(
    `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${API_KEY}`,
    { signal }
  );

  if (!weatherResponse.ok) {
    throw new Error("Can't fetch location weather.");
  }

  const weatherData = await weatherResponse.json();

  const forecastResponse = await fetch(
    `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${API_KEY}`,
    { signal }
  );

  if (!forecastResponse.ok) {
    throw new Error("Can't fetch forecast data.");
  }

  const forecastData = await forecastResponse.json();

  return {
    weather: weatherData,
    forecast: forecastData,
  };
};