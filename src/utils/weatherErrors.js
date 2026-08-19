export const getWeatherErrorMessage = (error) => {
    switch (error) {
        case "CITY_NOT_FOUND":
            return {
                title: "City not found",
                message:
                    "We couldn't find that location. Try checking the spelling or search for another city.",
            };

        case "INVALID_API_KEY":
            return {
                title: "Weather service unavailable",
                message:
                    "There is a problem with the weather service configuration.",
            };

        case "API_LIMIT_REACHED":
            return {
                title: "Too many requests",
                message:
                    "The weather service is temporarily rate-limited. Please try again in a moment.",
            };

        case "FORECAST_SERVICE_ERROR":
            return {
                title: "Forecast unavailable",
                message:
                    "We couldn't load the forecast right now. Please try again.",
            };

        case "WEATHER_SERVICE_ERROR":
            return {
                title: "Weather service unavailable",
                message:
                    "We couldn't retrieve weather data right now. Please try again.",
            };

        case "NETWORK_ERROR":
            return {
                title: "Connection problem",
                message:
                    "We couldn't connect to the weather service. Check your internet connection and try again.",
            };

        default:
            return {
                title: "Something went wrong",
                message:
                    "We couldn't load the weather. Please try again.",
            };
    }
};