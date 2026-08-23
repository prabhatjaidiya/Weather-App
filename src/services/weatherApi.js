import {
  getCachedWeather,
  setCachedWeather,
} from "./weatherCache";
import {
  getCachedAirQuality,
  setCachedAirQuality,
} from "./airQualityCache";

const API_KEY = import.meta.env.VITE_OWM_API_KEY;

const BASE_URL =
  "https://api.openweathermap.org/data/2.5";

const buildUrl = (endpoint, query) => {
  return `${BASE_URL}/${endpoint}?${query}&units=metric&appid=${API_KEY}`;
};

const handleApiError = (response, fallbackError) => {
  switch (response.status) {
    case 404:
      throw new Error("CITY_NOT_FOUND");

    case 401:
      throw new Error("INVALID_API_KEY");

    case 429:
      throw new Error("API_LIMIT_REACHED");

    default:
      throw new Error(fallbackError);
  }
};

const getWeatherData = async (query, signal) => {
  const cacheKey = query;

  const cachedData = getCachedWeather(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const weatherResponse = await fetch(
    buildUrl("weather", query),
    { signal }
  );

  if (!weatherResponse.ok) {
    handleApiError(
      weatherResponse,
      "WEATHER_SERVICE_ERROR"
    );
  }

  const weatherData =
    await weatherResponse.json();

  const forecastResponse = await fetch(
    buildUrl("forecast", query),
    { signal }
  );

  if (!forecastResponse.ok) {
    handleApiError(
      forecastResponse,
      "FORECAST_SERVICE_ERROR"
    );
  }

  const forecastData =
    await forecastResponse.json();

  const result = {
    weather: weatherData,
    forecast: forecastData,
  };

  setCachedWeather(cacheKey, result);

  return result;
};

export const getWeatherByCity = (
  city,
  signal
) => {
  const query =
    `q=${encodeURIComponent(city.trim().toLowerCase())}`;

  return getWeatherData(
    query,
    signal
  );
};

export const getWeatherByCoordinates = (
  latitude,
  longitude,
  signal
) => {
  const query =
    `lat=${latitude}&lon=${longitude}`;

  return getWeatherData(
    query,
    signal
  );
};

export const getAirQuality = async (
  latitude,
  longitude,
  signal
) => {
  const key = `${latitude.toFixed(2)},${longitude.toFixed(2)}`;

  const cachedData = getCachedAirQuality(key);

  if (cachedData) {
    return cachedData;
  }

  const query =
    `lat=${latitude}&lon=${longitude}`;

  const response = await fetch(
    `${BASE_URL}/air_pollution?${query}&appid=${API_KEY}`,
    { signal }
  );

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("API_LIMIT_REACHED");
    }

    throw new Error("WEATHER_SERVICE_ERROR");
  }

  const data = await response.json();

  setCachedAirQuality(key, data);

  return data;
};