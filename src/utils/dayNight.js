export const getDayNightState = (weather) => {
    if (!weather?.sunrise || !weather?.sunset) {
        return "day";
    }

    const now = Date.now();

    const sunrise = weather.sunrise * 1000;
    const sunset = weather.sunset * 1000;

    return now >= sunrise && now < sunset
        ? "day"
        : "night";
};