import React, { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar';
import Card from './components/Card';
import { getBgGradient } from './components/Utils';
import WeatherSkeleton from './components/WeatherSkeleton';
import ForecastSkeleton from './components/ForecastSkeleton';
import FiveDayForcast from './components/FiveDayForcast';



const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("metric");
  const [forecast, setForecast] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [recentSearch, setRecentSearch] = useState(() => {
    return JSON.parse(localStorage.getItem("recentSearch") || "[]");
  });
  const debounceRef = useRef(null);
  const isInitialLoad = useRef(true);
  const controllerRef = useRef(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  const isInStandaloneIOS = window.navigator.standalone === true;
  const [isStandalone, setIsStandalone] = useState(false);


  useEffect(() => {
    setIsStandalone(
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  }, []);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    controllerRef.current?.abort();
    if (city.trim()) fetchWeather(city);
  }, [unit]);

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");

    if (lastCity) {
      setCity(lastCity);
      fetchWeather(lastCity);
    }
  }, []);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // prevent browser default mini-bar
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);
  
  useEffect(() => {
    const onInstalled = () => {
      setShowInstall(false);
      setDeferredPrompt(null);
      console.log("App installed");
    };

    window.addEventListener("appinstalled", onInstalled);
    return () => window.removeEventListener("appinstalled", onInstalled);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value
    setCity(value);
    if(error) setError(null)

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if(value.trim()) fetchWeather(value.trim());
    }, 500);
  }

  const fetchWeather = async (cityName = city) => {
    if (!cityName.trim()) return;

    controllerRef.current?.abort();


    const controller = new AbortController();
    controllerRef.current = controller;
    const signal = controller.signal;


    const key = import.meta.env.VITE_OWM_API_KEY;


    try {
      
      setLoading(true);
      setError(null);
      
      // Current weather
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${key}`,
        { signal }
      );

      if (!res.ok) throw new Error("City not found");

      const data = await res.json();
      
      //  Forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${unit}&appid=${key}`,
        { signal }
      );

      if (!forecastResponse.ok) throw new Error("Forecast fetch failed");

      const forecastData = await forecastResponse.json();
      
      if(!signal.aborted){
        setWeather(data);
        setCity(cityName);
        setHourly(forecastData.list.slice(0, 8));
        setForecast(
          forecastData.list
          .filter(item => item.dt_txt.includes("12:00:00"))
          .slice(0, 7)
        );
      }
      
      // Local storage
      localStorage.setItem("lastCity", cityName);

      setRecentSearch(prev => {
        const normalized = cityName.trim().toLowerCase();
        const width = window.innerWidth;

        const updated = [
          cityName.trim(),
          ...prev.filter(c => c.toLowerCase() !== normalized),
        ];

        const finalList = width >= 500
          ? updated.slice(0, 5)
          : updated.slice(0, 2);

        localStorage.setItem("recentSearch", JSON.stringify(finalList));
        return finalList;

      });

    } catch (err) {
      if(err.name !== "AbortError"){
        setError(err.message || "Failed to fetch data");
        setForecast([]);
        setHourly([]);
      }
    }finally{
      if(!signal.aborted){
        setLoading(false);
      }
    }
  };

  const handleGeolocate = () => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    const { signal } = controllerRef.current;

    if(!navigator.geolocation){
      setError("Geolocation isn't supported by your browser.")
      return;
    }

    setLoading(true);
    setError(null);

    const key = import.meta.env.VITE_OWM_API_KEY;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        try{
          //current weather
          const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${key}`,{ signal });
          if(!res.ok) throw new Error("Can't fetch location weather.");
          const data = await res.json();
          setWeather(data);
          setCity(data.name);
          localStorage.setItem("lastCity", data.name);

          //forcast weather
          const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${key}`,{ signal });
          if(!forecastResponse.ok) throw new Error("Can't fetch forecast data. ");

          const forecastData = await forecastResponse.json();

          const hourly = forecastData.list.slice(0, 8);
          setHourly(hourly);
          
          const daily = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0,7)
          
          setForecast(daily)
        }catch(err){
          setError(err.message)
          setForecast([])
          setHourly([])
        }finally{
          if(!signal.aborted){
            setLoading(false);
          }
        }
      },
      () => {
        setError("Location access denied. Enter a city manually.")
        setLoading(false);
      }
    );
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("PWA installed");
    }else {
      console.log("User dismissed install");
    }

    setDeferredPrompt(null);
    setShowInstall(false);
  };

  return (
    <div 
      style={{
        background: getBgGradient(weather?.weather?.[0]?.icon),
      }} 
      className='min-h-screen w-full overflow-hidden bg-[#0B1120] text-[#F0F4FF] flex flex-col transition-all duration-500 ease-in-out will-change-[background]'> 
      
      <Navbar 
        fetchWeather={ fetchWeather } 
        city={city} 
        setCity={setCity} 
        setWeather={setWeather}
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
        {loading && !weather ? <ForecastSkeleton /> : <FiveDayForcast forecast={forecast} unit={unit}/>}
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
