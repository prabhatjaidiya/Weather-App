const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const weatherCache = new Map();

export const getCachedWeather = (key) => {
    const cached = weatherCache.get(key);

    if (!cached) {
        return null;
    }

    const isExpired =
        Date.now() - cached.timestamp > CACHE_DURATION;

    if (isExpired) {
        weatherCache.delete(key);
        return null;
    }

    return cached.data;
};

export const setCachedWeather = (key, data) => {
    weatherCache.set(key, {
        data,
        timestamp: Date.now(),
    });
};

export const clearWeatherCache = () => {
    weatherCache.clear();
};