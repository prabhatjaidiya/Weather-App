const CACHE_DURATION = 5 * 60 * 1000;

const airQualityCache = new Map();

export const getCachedAirQuality = (key) => {
    const cached = airQualityCache.get(key);

    if (!cached) {
        return null;
    }

    const isExpired =
        Date.now() - cached.timestamp > CACHE_DURATION;

    if (isExpired) {
        airQualityCache.delete(key);
        return null;
    }

    return cached.data;
};

export const setCachedAirQuality = (key, data) => {
    airQualityCache.set(key, {
        data,
        timestamp: Date.now(),
    });
};

export const clearAirQualityCache = () => {
    airQualityCache.clear();
};