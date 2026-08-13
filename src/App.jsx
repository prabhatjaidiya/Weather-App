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


const App = () => {
  const { weather, loading, error, forecast, hourly, unit, setUnit, fetchWeather, handleGeolocate } = useWeather();
  const { showInstall, isStandalone, isIOS, isInStandaloneIOS, handleInstall } = usePWA();
  const [city, setCity] = useState("");
  const [recentSearch, setRecentSearch] = useLocalStorage("recentSearch", []);
  const [lastCity, setLastCity] = useLocalStorage("lastCity", "");
  const isInitialLoad = useRef(true);

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


  const saveRecentSearch = (cityName) => {
    const normalized = cityName.trim().toLowerCase();
    const width = window.innerWidth;

    setRecentSearch((prev) => {
      const updated = [
        cityName.trim(),
        ...prev.filter(
          (c) => c.toLowerCase() !== normalized
        ),
      ];

      return width >= 500
        ? updated.slice(0, 5)
        : updated.slice(0, 2);
    });
  };

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
        background: getBgGradient(weather?.weather?.[0]?.icon),
      }}
      className='min-h-screen w-full overflow-hidden bg-[#0B1120] text-[#F0F4FF] flex flex-col transition-all duration-500 ease-in-out will-change-[background]'>

      <Navbar
        fetchWeather={fetchWeather}
        city={city}
        setCity={setCity}
        handleGeolocate={handleGeolocate}
        handleInputChange={handleInputChange}
        recentSearch={recentSearch}
        loading={loading}
      />

      <div className=' flex items-start max-[1100px]:flex-wrap max-[1100px]:justify-center w-full max-sm:flex-wrap max-sm:items-center max-sm:w-full'>
        {loading && !weather ? <WeatherSkeleton /> : (<Card
          weather={weather}
          loading={loading}
          error={error}
          unit={unit}
          setUnit={setUnit}
          hourly={hourly}
        />)}
        {loading && !weather ? <ForecastSkeleton /> : <FiveDayForcast forecast={forecast} unit={unit} />}
      </div>
      {showInstall && !isStandalone && (
        <button
          onClick={handleInstall}
          className="fixed bottom-6 right-6 z-50 bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg transition-all"
        >
          📲 Install App
        </button>
      )}
      {isIOS && !isInStandaloneIOS && !showInstall && (
        <div className="fixed bottom-6 left-6 bg-black/80 text-white px-4 py-2 rounded-lg">
          Tap <b>Share</b> → <b>Add to Home Screen</b>
        </div>
      )}
    </div>
  )
}
export default App
