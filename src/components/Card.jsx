import React from 'react'
import Data from './Data'
import { getWeatherEmoji,getBgGradient } from './Utils';
import { FaDroplet } from "react-icons/fa6";
import { WiStrongWind } from "react-icons/wi";
import { CiTempHigh } from "react-icons/ci";
import { FaWind } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import HourlyRow from './HourlyRow';
import SunriseSunsetCard from './SunriseSunsetCard';

const Card = ({ weather, loading, error,unit,setUnit,hourly }) => {
    if(!loading && !weather && !error) return (
        <div className='w-full max-sm:w-[355px] h-96 bg-[#1E2D4A] rounded-2xl p-6 flex flex-col justify-center items-center gap-4 m-12 border border-[rgba(74,144,217,0.18)]'>
            <div className='pb-12' style={{fontSize:150}}>🌎</div>
            <p className='text-[#F0F4FF] max-sm:text-xl text-3xl font-bold whitespace-nowrap'>Search any city to see the weather</p>
        </div>
    )

    if(error){
    return (
        <div className='w-full max-sm:w-[355px] h-96 bg-[#1E2D4A] rounded-2xl p-6 flex justify-center items-center gap-4 m-12 border border-[rgba(74,144,217,0.18)]'>
            <h1 className='text-red-400  text-5xl font-bold'>{error}</h1>
        </div>
    );
  }
  return (
    <div className='w-full max-sm:w-[355px] max-w-[730px] animate-[fadeIn_0.4s-ease] max-w-180 max-sm:m-4 max-sm:p-2 min-h-120 bg-[#1E2D4A] rounded-2xl p-6 flex-col justify-between gap-4 m-12 max-sm:gap-2 border border-[rgba(74,144,217,0.18)]'>
        <h1 className='mx-6 my-2 text-4xl md:pl-4 max-sm:text-xl'>Today Weather</h1>
        <div className='flex max-sm:w-full pt-6 justify-between'>
        <div className='flex flex-col gap-2 mb-4 md:pl-7 max-sm:ml-2'>
            <h3 className='text-[#A8C8F0] text-lg tracking-wider max-sm:whitespace-nowrap max-sm:text-sm'>📍LOCATION</h3>
            <h1 className='text-[#F0F4FF] text-3xl font-bold max-sm:font-semibold max-sm:text-xl'>{weather?.name}</h1>
            <h2 className='text-[#A8C8F0] text-2xl max-sm:text-5sm'>{weather?.weather?.[0]?.description}</h2>
            <span className='text-7xl md:text-5xl max-sm:text-3xl'>{getWeatherEmoji(weather?.weather?.[0]?.icon)}</span>
        </div>
        <div className='flex flex-col max-sm:pl-6 max-sm:w-min'>
            <div className='flex mb-4 max-sm:mt-2'>
                <span className='text-9xl max-sm:text-5xl md:text-8xl font-[#F0F4FF] max-sm:mt-5 max-sm:ml-12 font-semibold'>{Math.round(weather?.main?.temp)}</span>
                <p  className='pt-6 font-semibold text-2xl pr-4 mb-12 text-[#FFD166]'>°{unit === "imperial" ? "F" : "C"}</p>
                {weather && (
                <button
                    aria-label="Toggle temperature unit"
                    title="Switch temperature unit"
                    onClick={() => setUnit(u => u === "imperial" ? "metric" : "imperial")} 
                    className='
                        h-10 w-10
                        mt-4
                        rounded-full
                        text-lg font-semibold
                        backdrop-blur-md
                        bg-white/10
                        border border-white/20
                        text-[#F0F4FF]
                        hover:bg-[#F0F4FF]/20
                        hover:text-[#F0F4FF]
                        transition-all duration-300
                        shadow-lg
                        cursor-pointer
'
                >°{unit === "imperial" ? "C" : "F"}
                </button>
                )}
            </div>
            <div className='flex gap-2 justify-between px-4 max-sm:ml-6 max-sm:px-1'>
                <p className='text-[#A8C8F0] text-lg tracking-wider max-sm:text-medium max-sm:whitespace-nowrap max-sm:ml-2'>Feels Like:</p>
                <p className='text-[#A8C8F0] text-lg tracking-wider mr-12'>{Math.round(weather?.main?.feels_like)}°{unit === "imperial" ? "F" : "C"}</p>
            </div>
        </div>
        </div>
        <HourlyRow hourly={hourly} unit={unit} />
        <div className='flex w-full justify-evenly gap-10 max-sm:gap-4 mb-12 my-6 max-sm:w-full max-sm:items-center max-sm:justify-center flex-wrap'>
            <Data icon={<FaDroplet size={30} />} data={`${weather?.main?.humidity}%`} text='Humidity' />
            <Data icon={<FaWind size={30} />} data={`${weather?.wind?.speed} m/s`} text='Wind Speed' />
            <Data icon={<CiTempHigh size={30} />} data={`H:${Math.round(weather?.main?.temp_max)}°${unit === "imperial" ? "F" : "C"} / L:${Math.round(weather?.main?.temp_min)}°${unit === "imperial" ? "F" : "C"}`} text='Range' />
            <Data icon={<FaTachometerAlt size={30} />} data={`${weather?.main?.pressure} mb`} text='Pressure' />
            <Data icon={<FaEye size={30}/>} data={`${weather?.visibility / 1000} km`} text='Visibility' />
            <Data icon={<WiStrongWind size={30} />} data={`${weather?.wind?.gust} m/s`} text='Wind Gust' />
            <SunriseSunsetCard weather={weather}/>
        </div>
    </div>
  )
}

export default Card
