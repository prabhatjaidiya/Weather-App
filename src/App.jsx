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
  const [recentSearch, setRecentSearch] = useState(() => {
    return JSON.parse(localStorage.getItem("recentSearch") || "[]");
  });
  const debounceRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value
    setCity(value);
    if(error) setError(null)

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if(value.trim()) fetchWeather(value.trim());
    }, 500);
  }

  useEffect(() => {
    if(city.trim()) fetchWeather(city);
  }, [unit]);  
  
  const fetchWeather = async (cityName = city) => {
      if (!cityName.trim()) return;
      setLoading(true);
      setError(null);
      const key = import.meta.env.VITE_OWM_API_KEY;
      try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${key}`);
        if(!res.ok) throw new Error("City not found");
        const data = await res.json()
        setWeather(data);
        setCity(cityName);

        setRecentSearch(prev => {
          const normalizedCity = cityName.trim();
          const width = window.innerWidth;
          
          const update = [normalizedCity,...prev.filter(c => c !== normalizedCity)];
          
          const finalList = width >= 500 ? update.slice(0,5) : update.slice(0,2);
          
          localStorage.setItem("recentSearch", JSON.stringify(finalList));

          return finalList;
        })

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${unit}&appid=${key}`);
        const forecastData = await forecastResponse.json();

        const daily = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0,7)
        setForecast(daily)
      }catch (err) {
        setError(err.message);
        setForecast([]);
      }finally{
        setLoading(false);
      }
      
      
    }
  const handleGeolocate = () => {
    if(!navigator.geolocation){
      setError("Geolocation isn't support by your browser.")
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
          const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${key}`);
          if(!res.ok) throw new Error("Can't fetch location weather.");
          const data = await res.json();
          setWeather(data);
          setCity(data.name);

          //forcast weather
          const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${key}`);
          if(!forecastResponse.ok) throw new Error("Can't fetch forcast data. ");

          const forecastData = await forecastResponse.json();

          const daily = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0,7)
          
          setForecast(daily)
        }catch(err){
          setError(err.message)
          setForecast([])
        }finally{
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied. Enter a city manually.")
        setLoading(false);
      }
    );
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
        {loading ? <WeatherSkeleton /> : <Card 
          weather={weather} 
          loading={loading} 
          error={error} 
          unit={unit} 
          setUnit={setUnit}
        />}
        {loading ? <ForecastSkeleton /> : <FiveDayForcast forecast={forecast} unit={unit}/>}
      </div>
    </div>
  )
}
export default App
