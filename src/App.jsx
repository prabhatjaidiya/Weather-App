import React, { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar';
import Card from './components/Card';
import { getBgGradient } from './components/Utils';
import WeatherSkeleton from './components/WeatherSkeleton';
import ForecastSkeleton from './components/ForecastSkeleton';
import FiveDayForcast from './components/FiveDayForcast';
import useWeather from "./hooks/useWeather";
import useLocalStorage from "./hooks/useLocalStorage";
import useDebounce from "./hooks/useDebounce";
import usePWA from "./hooks/usePWA";
import AirQuality from "./components/AirQuality";
import TemperatureChart from "./components/TemperatureChart";
import RainProbabilityChart from "./components/RainProbabilityChart";
import { getWeatherInsights } from "./utils/weatherInsights";
import WeatherInsights from "./components/WeatherInsights";
import FavoriteCities from "./components/FavoriteCities";
import useFavorites from "./hooks/useFavorites";
import useRecentSearch from "./hooks/useRecentSearch";
import { getWeatherAlerts } from "./utils/weatherAlerts";
import WeatherAlerts from "./components/WeatherAlerts";


const App = () => {
  const { weather, loading, error, forecast, hourly, unit, setUnit, fetchWeather, handleGeolocate, airQuality } = useWeather();
  const insights = getWeatherInsights(weather, airQuality, hourly);
  const alerts = getWeatherAlerts(weather, airQuality, hourly);
  const { showInstall, isStandalone, isIOS, isInStandaloneIOS, handleInstall } = usePWA();
  const [city, setCity] = useState("");
  const { recentSearch, saveRecentSearch } = useRecentSearch();
  const [lastCity, setLastCity] = useLocalStorage("lastCity", "");
  const isInitialLoad = useRef(true);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    if (city.trim()) fetchWeather(city);
  }, [unit]);

  useEffect(() => {
    if (lastCity) {
      setCity(lastCity);
      fetchWeather(lastCity);
    }
  }, []);


  const debouncedSearch = useDebounce(async (value) => {
    if (!value.trim()) return;

    const success = await fetchWeather(value.trim());

    if (success) {
      const searchedCity = value.trim();

      saveRecentSearch(searchedCity);
      setLastCity(searchedCity);
    }
  }, 500);

  const handleInputChange = (e) => {
    const value = e.target.value;

    setCity(value);

    debouncedSearch(value);
  };

  return (
    <div
      style={{
        background: getBgGradient(weather?.icon),
      }}
      className="
      h-full
      w-full
      text-[#F5F7FF]
      flex flex-col
      overflow-x-hidden
      transition-all duration-700 ease-in-out
      bg-[#07111F]
    "
    >

      <Navbar
        fetchWeather={fetchWeather}
        city={city}
        setCity={setCity}
        handleGeolocate={handleGeolocate}
        handleInputChange={handleInputChange}
        recentSearch={recentSearch}
        loading={loading}
      />

      <main className="
      w-full
      max-w-[1440px]
      mx-auto
      px-4 sm:px-6 lg:px-8
      py-6 lg:py-8
    ">
        <FavoriteCities
          favorites={favorites}
          setCity={setCity}
          setLastCity={setLastCity}
          fetchWeather={fetchWeather}
          toggleFavorite={toggleFavorite}
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
                toggleFavorite={() =>
                  toggleFavorite(weather?.city)
                }
                isFavorite={isFavorite(weather?.city)}
                retryWeather={() => fetchWeather(city)}
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
              />
            )}

            {/* Temperature Chart */}
            <TemperatureChart
              hourly={hourly}
              unit={unit}
            />

            <RainProbabilityChart
              hourly={hourly}
            />
            
            {alerts.length > 0 && (
              <WeatherAlerts alerts={alerts} />
            )}

            {insights.length > 0 && (
              <WeatherInsights insights={insights} />
            )}

          </div>

        </div>

      </main>

      {showInstall && !isStandalone && (
        <button
          onClick={handleInstall}
          className="
          fixed bottom-6 right-6 z-50
          px-5 py-3
          rounded-2xl
          bg-white/10
          backdrop-blur-xl
          border border-white/15
          text-white
          font-medium
          shadow-[0_10px_40px_rgba(0,0,0,0.3)]
          hover:bg-white/15
          hover:-translate-y-1
          transition-all duration-300
        "
        >
          📲 Install App
        </button>
      )}

      {isIOS && !isInStandaloneIOS && !showInstall && (
        <div className="
        fixed bottom-6 left-6 z-50
        max-w-[280px]
        px-4 py-3
        rounded-2xl
        bg-white/10
        backdrop-blur-xl
        border border-white/10
        text-sm
        text-white/80
        shadow-lg
      ">
          Tap <b>Share</b> → <b>Add to Home Screen</b>
        </div>
      )}

    </div>
  )
}
export default App
