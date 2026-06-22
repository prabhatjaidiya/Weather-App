import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import Card from './components/Card';
import DayData from './components/DayData';
import { getBgGradient } from './components/Utils';



const App = () => {
  const [Weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Delhi") 
  useEffect(() => {
    fetchWeather( setWeather );
    setCity("")
  }, []);  
  const handleSearch = (city,fetchWeather) => {
  const trimmed = city.trim();
  if(!trimmed) return;
  fetchWeather(trimmed)
}
  const fetchWeather = async () => {
      if (!city || !city.trim()) return;
      setLoading(true);
      setError(null);
      const key = import.meta.env.VITE_OWM_API_KEY;
      try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`);
        if(!res.ok) throw new Error("City not found");
        const data = await res.json()
        setWeather(data);
        console.log(data);
      }catch (err) {
        setError(err.message);
      }finally{
        setLoading(false);
      }
      
      const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`);
      const forecastData = await forecastResponse.json();
      console.log(forecastData);
    }
  return (
    <div style={{
      background: getBgGradient(Weather?.weather?.[0]?.icon),
    }} className='min-h-screen w-full bg-[#0B1120] font-(family-name:<Space Grotesk,system-ui,sens-serif>) text-[#F0F4FF] flex flex-col md:flex-wrap'> 
      <Navbar handleSearch={ fetchWeather } city={city} setCity={setCity} setWeather={setWeather}/>
      <div className=' flex md:flex-wrap md:items-center md:ml-12 max-sm:flex-wrap'>
        <Card Weather={Weather} loading={loading} error={error} />
        <div className='my-12 md:px-5 md:m-12 max-sm:my-5 '>
          <h2 className='text-xl p-4'>7-DAY FORECAST</h2>
          <DayData text='Monday'/>
          <DayData text='Tuesday' />
          <DayData text='Wednesday' />
          <DayData text='Thusrday' />
          <DayData text='Friday' />
          <DayData text='Saturday' />
          <DayData text='Sunday' />
        </div>
      </div>
    </div>
  )
}
export default App
