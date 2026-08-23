export const celsiusToFahrenheit = (celsius) => {
    if (!Number.isFinite(celsius)) return null;

    return (celsius * 9) / 5 + 32;
};

export const metersPerSecondToMph = (value) => {
    if (!Number.isFinite(value)) return null;

    return value * 2.23694;
};

export const metersToMiles = (value) => {
    if (!Number.isFinite(value)) return null;

    return value * 0.000621371;
};

export const formatTemperature = (
    temperature,
    unit
) => {
    if (!Number.isFinite(temperature)) {
        return "—";
    }

    const value =
        unit === "imperial"
            ? celsiusToFahrenheit(temperature)
            : temperature;

    return Math.round(value);
};

export const formatWindSpeed = (
    value,
    unit
) => {
    if (!Number.isFinite(Number(value))) {
        return "—";
    }

    const speed = Number(value);

    if (unit === "imperial") {
        return `${metersPerSecondToMph(speed).toFixed(1)} mph`;
    }

    return `${speed.toFixed(1)} m/s`;
};

export const formatVisibility = (
    meters,
    unit
) => {
    if (!Number.isFinite(Number(meters))) {
        return "—";
    }

    const visibility = Number(meters);

    if (unit === "imperial") {
        return `${metersToMiles(visibility).toFixed(1)} mi`;
    }

    return `${(visibility / 1000).toFixed(1)} km`;
};