export const normalizeWeather = (weather) => {
    return {
        city: weather.name,
        country: weather.sys?.country,

        timezone: weather.timezone,

        temperature: weather.main?.temp,
        feelsLike: weather.main?.feels_like,
        tempMin: weather.main?.temp_min,
        tempMax: weather.main?.temp_max,

        humidity: weather.main?.humidity,
        pressure: weather.main?.pressure,

        windSpeed: weather.wind?.speed ?? 0,
        windDirection: weather.wind?.deg,
        windGust: weather.wind?.gust ?? null,

        condition: weather.weather?.[0]?.main,
        description: weather.weather?.[0]?.description,
        icon: weather.weather?.[0]?.icon,

        visibility: weather.visibility,

        sunrise: weather.sys?.sunrise,
        sunset: weather.sys?.sunset,

        coordinates: {
            latitude: weather.coord?.lat,
            longitude: weather.coord?.lon,
        },
    };
};

export const getAQIInfo = (aqi) => {
    const levels = {
        1: {
            label: "Good",
            description: "Air quality is good.",
        },
        2: {
            label: "Fair",
            description: "Air quality is acceptable.",
        },
        3: {
            label: "Moderate",
            description: "Sensitive people may want to limit prolonged outdoor activity.",
        },
        4: {
            label: "Poor",
            description: "Consider reducing prolonged outdoor activity.",
        },
        5: {
            label: "Very Poor",
            description: "Avoid prolonged outdoor activity if possible.",
        },
    };

    return levels[aqi] ?? {
        label: "Unknown",
        description: "Air quality data unavailable.",
    };
};