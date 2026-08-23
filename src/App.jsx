import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import Navbar from './components/Navbar';
import Card from './components/Card';
import { getBgGradient } from './components/Utils';
import WeatherSkeleton from './components/WeatherSkeleton';
import ForecastSkeleton from './components/ForecastSkeleton';
import FiveDayForcast from './components/FiveDayForcast';
import useWeather from "./hooks/useWeather";
import useLocalStorage from "./hooks/useLocalStorage";
import usePWA from "./hooks/usePWA";
import { getWeatherInsights } from "./utils/weatherInsights";
import WeatherInsights from "./components/WeatherInsights";
import FavoriteCities from "./components/FavoriteCities";
import useFavorites from "./hooks/useFavorites";
import useRecentSearch from "./hooks/useRecentSearch";
import { getWeatherAlerts } from "./utils/weatherAlerts";
import WeatherAlerts from "./components/WeatherAlerts";
import { getDayNightState } from "./utils/dayNight";

const TemperatureChart = lazy(
  () => import("./components/TemperatureChart")
);

const RainProbabilityChart = lazy(
  () => import("./components/RainProbabilityChart")
);

const App = () => {
  const { weather, loading, error, forecast, hourly, unit, setUnit, fetchWeather, handleGeolocate, airQuality } = useWeather();
  const { showInstall, isStandalone, isIOS, isInStandaloneIOS, handleInstall } = usePWA();
  const [city, setCity] = useState("");
  const [lastSearchType, setLastSearchType] = useState("city");
  const { recentSearch, saveRecentSearch } = useRecentSearch();
  const [lastCity, setLastCity] = useLocalStorage("lastCity", "");
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const dayNight = getDayNightState(weather);
  const insights = useMemo(
    () => getWeatherInsights(weather, airQuality, hourly),
    [weather, airQuality, hourly]
  );

  const alerts = useMemo(
    () => getWeatherAlerts(weather, airQuality, hourly),
    [weather, airQuality, hourly]
  );

  useEffect(() => {
    if (lastCity) {
      setCity(lastCity);
      setLastSearchType("city");
      fetchWeather(lastCity);
    }
  }, []);

  const handleCitySearch = useCallback(async (cityName) => {
    if (!cityName?.trim()) return false;

    setLastSearchType("city");

    const searchedCity = cityName.trim();

    const success = await fetchWeather(searchedCity);

    if (success) {
      setCity(searchedCity);
      saveRecentSearch(searchedCity);
      setLastCity(searchedCity);
    }

    return success;
  }, [
    fetchWeather,
    saveRecentSearch,
    setLastCity,
  ]);

  const handleInputChange = useCallback((e) => {
    setCity(e.target.value);
  }, []);

  const handleLocation = useCallback(() => {
    setLastSearchType("location");
    handleGeolocate();
  }, [handleGeolocate]);

  const handleToggleFavorite = useCallback(() => {
    if (weather?.city) {
      toggleFavorite(weather.city);
    }
  }, [weather?.city, toggleFavorite]);

  const handleRetry = useCallback(() => {
    if (lastSearchType === "location") {
      handleLocation();
      return;
    }

    if (city.trim()) {
      handleCitySearch(city.trim());
    }
  }, [
    lastSearchType,
    city,
    handleLocation,
    handleCitySearch,
  ]);

  return (
    <div
      style={{
        background:
          dayNight === "night"
            ? "linear-gradient(135deg, #020617, #0f172a, #172554)"
            : getBgGradient(weather?.icon, unit),
      }}
      className={`relative isolate min-h-screen w-full  flex flex-col overflow-x-hidden transition-all duration-700 ease-in-out
        ${dayNight === "night"
          ? "bg-[#020617] text-[#F5F7FF]"
          : "bg-[#75BFE8] text-slate-900"
        }
      `}
    >

      {dayNight === "night" && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[-10] overflow-hidden"
        >
          {/* Atmospheric upper glow */}
          <div
            className="absolute -top-[35%] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-500/[0.055] blur-[140px]"
          />

          {/* Atmospheric side glow */}
          <div
            className="absolute -right-[15%] top-[18%] h-[500px] w-[500px] rounded-full bg-blue-400/[0.035] blur-[130px]"
          />

          {/* Very subtle fine star field */}
          <div
            className="absolute inset-0 opacity-[0.16] bg-[radial-gradient(circle,rgba(255,255,255,0.9)_0.7px,transparent_0.9px)] bg-[length:90px_90px]"
          />

          {/* Secondary star field */}
          <div
            className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(circle,rgba(191,219,254,0.9)_0.8px,transparent_1px)] bg-[length:137px_137px] bg-[position:35px_20px]"
          />

          {/* Hero star — top right */}
          <div
            className="absolute top-[14%] right-[17%] h-1 w-1 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.75)] animate-pulse"
          />

          {/* Hero star — left */}
          <div
            className="absolute top-[31%] left-[13%] h-[3px] w-[3px] rounded-full bg-white/65 shadow-[0_0_7px_rgba(255,255,255,0.6)]"
          />

          {/* Hero star — lower right */}
          <div
            className="absolute top-[43%] right-[8%] h-[3px] w-[3px] rounded-full bg-blue-100/65 shadow-[0_0_8px_rgba(191,219,254,0.65)] animate-pulse"
          />

          {/* Very soft bottom atmospheric haze */}
          <div
            className="absolute -bottom-[25%] left-1/2 h-[400px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/[0.025] blur-[120px]"
          />
        </div>
      )}

      <Navbar
        fetchWeather={handleCitySearch}
        city={city}
        setCity={setCity}
        handleGeolocate={handleLocation}
        handleInputChange={handleInputChange}
        recentSearch={recentSearch}
        loading={loading}
        dayNight={dayNight}
      />

      <main className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <FavoriteCities
          favorites={favorites}
          setCity={setCity}
          setLastCity={setLastCity}
          fetchWeather={handleCitySearch}
          toggleFavorite={toggleFavorite}
          dayNight={dayNight}
        />

        <div className="mt-5 grid grid-cols-1 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.75fr)] gap-6 lg:gap-8 items-start">

          {/* LEFT — Weather */}
          <div className="min-w-0">
            {loading && !weather ? (
              <WeatherSkeleton />
            ) : (
              <Card
                weather={weather}
                loading={loading}
                error={error}
                unit={unit}
                setUnit={setUnit}
                hourly={hourly}
                airQuality={airQuality}
                toggleFavorite={handleToggleFavorite}
                isFavorite={isFavorite(weather?.city)}
                retryWeather={handleRetry}
                dayNight={dayNight}
              />
            )}
          </div>


          {/* RIGHT — Forecast + Chart */}
          <div className="min-w-0 flex flex-col gap-6">

            {/* 5 Day Forecast */}
            {loading && !weather ? (
              <ForecastSkeleton />
            ) : (
              <FiveDayForcast
                forecast={forecast}
                unit={unit}
                dayNight={dayNight}
              />
            )}

            {/* Temperature Chart */}
            <Suspense
              fallback={
                <div className="w-full h-[280px] rounded-[28px] bg-white/[0.045] border border-white/[0.07] animate-pulse" />
              }
            >
              <TemperatureChart
                hourly={hourly}
                unit={unit}
                dayNight={dayNight}
              />

              <RainProbabilityChart
                hourly={hourly}
                dayNight={dayNight}
              />
            </Suspense>

            {alerts.length > 0 && (
              <WeatherAlerts alerts={alerts} dayNight={dayNight} />
            )}

            {insights.length > 0 && (
              <WeatherInsights insights={insights} dayNight={dayNight} />
            )}

          </div>

        </div>

      </main>

      {/* PWA INSTALL — Android / Desktop */}
      {showInstall && !isStandalone && (
        <button
          onClick={handleInstall}
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl backdrop-blur-xl font-medium shadow-[0_10px_40px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300
            ${dayNight === "night"
              ? `
              bg-white/10
              border border-white/15
              text-white
              hover:bg-white/15
            `
              : `
              bg-white/55
              border border-white/60
              text-slate-900
              shadow-[0_10px_40px_rgba(30,64,85,0.18)]
              hover:bg-white/70
            `
            }
          `}
        >
          📲 Install App
        </button>
      )}


      {/* iOS INSTALL GUIDE */}
      {isIOS && !isInStandaloneIOS && !showInstall && (
        <div
          className={`fixed bottom-6 left-6 z-50 max-w-[280px] px-4 py-3 rounded-2xl backdrop-blur-xl text-sm shadow-lg transition-all duration-500
            ${dayNight === "night"
              ? `
              bg-white/10
              border border-white/10
              text-white/80
              shadow-[0_10px_40px_rgba(0,0,0,0.3)]
            `
              : `
              bg-white/55
              border border-white/50
              text-slate-800/80
              shadow-[0_10px_40px_rgba(30,64,85,0.18)]
            `
            }
          `}
        >
          Tap <b>Share</b> → <b>Add to Home Screen</b>
        </div>
      )}

    </div>
  )
}
export default App