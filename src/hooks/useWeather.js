import { useCallback, useRef, useState } from "react";
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
    const [lastRequest, setLastRequest] = useState(null);

    const controllerRef = useRef(null);

    const fetchAirQuality = useCallback(
        async (latitude, longitude, signal) => {
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
        },
        []
    );

    // Process weather + forecast data in one place
    const processWeatherData = useCallback(
        (data, signal) => {
            if (signal.aborted) return;

            const normalizedWeather =
                normalizeWeather(data.weather);

            const forecastData = data.forecast;

            setWeather(normalizedWeather);

            setHourly(
                getHourlyForecast(
                    forecastData.list,
                    data.weather.timezone
                )
            );

            setForecast(
                getDailyForecast(
                    forecastData.list,
                    data.weather.timezone
                )
            );

            fetchAirQuality(
                normalizedWeather.coordinates.latitude,
                normalizedWeather.coordinates.longitude,
                signal
            );
        },
        [fetchAirQuality]
    );

    const fetchWeather = useCallback(
        async (cityName) => {
            if (!cityName?.trim()) return false;

            const searchedCity = cityName.trim();

            setLastRequest({
                type: "city",
                city: searchedCity,
            });

            controllerRef.current?.abort();

            const controller = new AbortController();
            controllerRef.current = controller;

            const { signal } = controller;

            try {
                setLoading(true);
                setError(null);

                const data = await getWeatherByCity(
                    searchedCity,
                    signal
                );

                processWeatherData(data, signal);

                if (signal.aborted) {
                    return false;
                }

                return true;

            } catch (err) {
                if (err.name === "AbortError") {
                    return false;
                }

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

            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        },
        [processWeatherData]
    );

    const fetchWeatherByCoordinates = useCallback(
        async (latitude, longitude, signal) => {
            try {
                setLoading(true);
                setError(null);

                const data =
                    await getWeatherByCoordinates(
                        latitude,
                        longitude,
                        signal
                    );

                processWeatherData(data, signal);

                if (signal.aborted) {
                    return false;
                }

                return data.weather.name;

            } catch (err) {
                if (err.name === "AbortError") {
                    return false;
                }

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

            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        },
        [processWeatherData]
    );

    const handleGeolocate = useCallback(() => {
        controllerRef.current?.abort();

        const controller = new AbortController();
        controllerRef.current = controller;

        const { signal } = controller;

        if (!navigator.geolocation) {
            setError({
                title: "Location unavailable",
                message:
                    "Geolocation isn't supported by your browser. Search for a city manually.",
            });

            return;
        }

        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const {
                    latitude,
                    longitude,
                } = pos.coords;

                if (signal.aborted) return;

                setLastRequest({
                    type: "coordinates",
                    latitude,
                    longitude,
                });

                await fetchWeatherByCoordinates(
                    latitude,
                    longitude,
                    signal
                );
            },

            (error) => {
                if (signal.aborted) return;

                let errorInfo;

                switch (error.code) {
                    case 1:
                        errorInfo = {
                            title:
                                "Location permission denied",
                            message:
                                "Allow location access in your browser settings or search for a city manually.",
                        };
                        break;

                    case 2:
                        errorInfo = {
                            title:
                                "Location unavailable",
                            message:
                                "We couldn't determine your current location. Please try again or search for a city manually.",
                        };
                        break;

                    case 3:
                        errorInfo = {
                            title:
                                "Location request timed out",
                            message:
                                "Getting your location took too long. Please try again.",
                        };
                        break;

                    default:
                        errorInfo = {
                            title:
                                "Unable to get your location",
                            message:
                                "Please try again or search for a city manually.",
                        };
                }

                setError(errorInfo);
                setLoading(false);
            }
        );
    }, [fetchWeatherByCoordinates]);

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
        fetchWeatherByCoordinates,
        handleGeolocate,
        lastRequest,
    };
};

export default useWeather;