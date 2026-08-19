import { useRef, useState } from "react";
import {
    getWeatherByCity,
    getWeatherByCoordinates,
    getAirQuality,
} from "../services/weatherApi";
import {
    getHourlyForecast,
    getDailyForecast,
} from "../utils/forecastUtils";
import { normalizeWeather } from "../utils/weatherUtils";
import { getWeatherErrorMessage } from "../utils/weatherErrors";

const useWeather = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [airQuality, setAirQuality] = useState(null);
    const [error, setError] = useState(null);
    const [unit, setUnit] = useState("metric");
    const [forecast, setForecast] = useState([]);
    const [hourly, setHourly] = useState([]);

    const controllerRef = useRef(null);

    const fetchAirQuality = async (latitude, longitude, signal) => {
        try {
            const data = await getAirQuality(
                latitude,
                longitude,
                signal
            );

            if (!signal.aborted) {
                setAirQuality(data);
            }
        } catch (err) {
            if (err.name !== "AbortError") {
                console.error("Air quality error:", err);
                setAirQuality(null);
            }
        }
    };

    const fetchWeather = async (cityName) => {
        if (!cityName.trim()) return;

        controllerRef.current?.abort();

        const controller = new AbortController();
        controllerRef.current = controller;

        const { signal } = controller;

        try {
            setLoading(true);
            setError(null);

            const data = await getWeatherByCity(
                cityName,
                unit,
                signal
            );

            const forecastData = data.forecast;

            if (!signal.aborted) {
                const normalizedWeather =
                    normalizeWeather(data.weather);

                setWeather(normalizedWeather);

                fetchAirQuality(
                    normalizedWeather.coordinates.latitude,
                    normalizedWeather.coordinates.longitude,
                    signal
                );

                setHourly(
                    getHourlyForecast(forecastData.list)
                );

                setForecast(
                    getDailyForecast(forecastData.list)
                );

                return true;
            }

        } catch (err) {
            if (err.name !== "AbortError") {
                const errorCode =
                    err instanceof TypeError
                        ? "NETWORK_ERROR"
                        : err.message;
                const errorInfo =
                    getWeatherErrorMessage(errorCode);

                setError(errorInfo);

                setWeather(null);
                setAirQuality(null);
                setForecast([]);
                setHourly([]);

                return false;
            }

        } finally {
            if (!signal.aborted) {
                setLoading(false);
            }
        }
    };

    const handleGeolocate = () => {
        controllerRef.current?.abort();

        controllerRef.current = new AbortController();

        const { signal } = controllerRef.current;

        if (!navigator.geolocation) {
            setError("Geolocation isn't supported by your browser.");
            return;
        }

        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;

                try {
                    const data = await getWeatherByCoordinates(
                        latitude,
                        longitude,
                        unit,
                        signal
                    );

                    if (signal.aborted) return;

                    const normalizedWeather =
                        normalizeWeather(data.weather);

                    setWeather(normalizedWeather);

                    fetchAirQuality(
                        normalizedWeather.coordinates.latitude,
                        normalizedWeather.coordinates.longitude,
                        signal
                    );

                    return data.weather.name;

                } catch (err) {
                    if (err.name !== "AbortError") {
                        const errorCode =
                            err instanceof TypeError
                                ? "NETWORK_ERROR"
                                : err.message;

                        const errorInfo =
                            getWeatherErrorMessage(errorCode);

                        setError(errorInfo);

                        setWeather(null);
                        setAirQuality(null);
                        setForecast([]);
                        setHourly([]);
                    }
                } finally {
                    if (!signal.aborted) {
                        setLoading(false);
                    }
                }
            },

            (error) => {
                let errorInfo;

                switch (error.code) {
                    case 1:
                        errorInfo = {
                            title: "Location permission denied",
                            message:
                                "Allow location access in your browser settings or search for a city manually.",
                        };
                        break;

                    case 2:
                        errorInfo = {
                            title: "Location unavailable",
                            message:
                                "We couldn't determine your current location. Please try again or search for a city manually.",
                        };
                        break;

                    case 3:
                        errorInfo = {
                            title: "Location request timed out",
                            message:
                                "Getting your location took too long. Please try again.",
                        };
                        break;

                    default:
                        errorInfo = {
                            title: "Unable to get your location",
                            message:
                                "Please try again or search for a city manually.",
                        };
                }

                setError(errorInfo);
                setLoading(false);
            }
        );
    };

    return {
        weather,
        loading,
        error,
        forecast,
        hourly,
        airQuality,
        unit,
        setUnit,
        fetchWeather,
        handleGeolocate,
    };
};

export default useWeather;