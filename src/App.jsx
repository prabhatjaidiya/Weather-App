import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import Card from './components/Card';
import DayData from './components/DayData';
import { getBgGradient } from './components/Utils';



const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Delhi");
  const [unit, setUnit] = useState("metric");
  const [forecast, setForecast] = useState([]);
  const [recentSearch, setRecentSearch] = useState(() => {
    return JSON.parse(localStorage.getItem("recentSearch") || "[]");
  });

  useEffect(() => {
    fetchWeather();
  }, [unit]);  
  
  const fetchWeather = async () => {
      if (!city.trim()) return;
      setLoading(true);
      setError(null);
      const key = import.meta.env.VITE_OWM_API_KEY;
      try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${key}`);
        if(!res.ok) throw new Error("City not found");
        const data = await res.json()
        setWeather(data);

        setRecentSearch(prev => {
          const normalizedCity = city.trim();

          const update = [normalizedCity,...prev.filter(c => c !== city)].slice(0,5);
          localStorage.setItem("recentSearch", JSON.stringify(update));
          return update;
        })

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${key}`);
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
        recentSearch={recentSearch}
      />
      
      <div className=' flex items-start max-[1100px]:flex-wrap max-[1100px]:justify-center w-full max-sm:flex-wrap max-sm:items-center max-sm:w-full'>
        
        <Card 
          weather={weather} 
          loading={loading} 
          error={error} 
          unit={unit} 
          setUnit={setUnit}
        />
        
        <div className='max-sm:w-full w-full max-w-160 md:px-5 md:w-full md:flex md:flex-col mt-12'>
          <h2 className='text-3xl max-sm:text-xl p-4 w-full'>5-DAY FORECAST</h2>
          {forecast.length > 0 && forecast.map((f) => (
            <DayData 
            key={f.dt}
            day= {new Date(f.dt_txt).toLocaleDateString("en-US",{ weekday: "short" })}
            icon={f.weather[0].icon}
            high={Math.round(f.main.temp_max)}
            low={Math.round(f.main.temp_min)}
            unit={unit}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default App
