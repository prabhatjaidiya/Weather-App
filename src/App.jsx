import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import Card from './components/Card';
import DayData from './components/DayData';

const App = () => {
  const [Weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let city = "Delhi";
  useEffect((setData) => {
    const fetchWeather = async (setWeather) => {
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
    fetchWeather(setWeather);
  }, []);
  return (
    <div className='min-h-screen w-full bg-[#0B1120] font-(family-name:<Space Grotesk,system-ui,sens-serif>) text-[#F0F4FF] flex flex-col'> 
      <Navbar />
      <div className=' flex'>
        <Card Weather={Weather} loading={loading} error={error} />
        <div className='my-12'>
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
