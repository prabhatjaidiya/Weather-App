const addAlert = (alerts, alert) => {
    const exists = alerts.some(
        (item) => item.title === alert.title
    );

    if (!exists) {
        alerts.push(alert);
    }
};

export const getWeatherAlerts = (
    weather,
    airQuality,
    hourly = []
) => {
    if (!weather) return [];

    const alerts = [];

    const temperature = weather.temperature;
    const feelsLike = weather.feelsLike;
    const windSpeed = weather.windSpeed;

    const rainValues = hourly.map(
        (hour) => hour.rainProbability ?? 0
    );

    const highestRainProbability = Math.max(
        ...rainValues,
        0
    );

    const aqi =
        airQuality?.list?.[0]?.main?.aqi;

    // 🔥 Extreme heat
    if (temperature >= 40 || feelsLike >= 45) {
        addAlert(alerts, {
            type: "danger",
            icon: "🔥",
            title: "Extreme heat",
            message:
                "Extreme heat conditions are present. Stay hydrated and avoid prolonged outdoor exposure.",
        });
    }

    // 🥶 Extreme cold
    if (temperature <= 5 || feelsLike <= 2) {
        addAlert(alerts, {
            type: "danger",
            icon: "🥶",
            title: "Very cold conditions",
            message:
                "Very cold conditions are present. Wear warm layers and limit prolonged exposure outdoors.",
        });
    }

    // 🌧️ Heavy rain probability
    if (highestRainProbability >= 80) {
        addAlert(alerts, {
            type: "warning",
            icon: "🌧️",
            title: "High rain risk",
            message:
                "There is a very high chance of rain in the upcoming hours. Carry an umbrella and plan accordingly.",
        });
    }

    // 💨 Strong wind
    if (windSpeed >= 15) {
        addAlert(alerts, {
            type: "warning",
            icon: "💨",
            title: "Strong winds",
            message:
                "Strong winds are expected. Take extra care when travelling or spending time outdoors.",
        });
    }

    // 😷 Poor air quality
    if (aqi >= 4) {
        addAlert(alerts, {
            type: "danger",
            icon: "😷",
            title: "Poor air quality",
            message:
                "Air quality is poor. Consider reducing prolonged outdoor activity.",
        });
    }

    // 🌫️ Moderate air quality
    if (aqi === 3) {
        addAlert(alerts, {
            type: "warning",
            icon: "🌫️",
            title: "Moderate air quality",
            message:
                "Air quality is moderate. Sensitive individuals should consider limiting prolonged outdoor exposure.",
        });
    }

    const priority = {
        danger: 3,
        warning: 2,
    };

    return alerts
        .sort(
            (a, b) =>
                (priority[b.type] || 0) -
                (priority[a.type] || 0)
        )
        .slice(0, 3);
};