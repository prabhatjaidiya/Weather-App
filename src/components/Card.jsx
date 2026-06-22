import React from 'react'
import Data from './Data'
import { getWeatherEmoji,getBgGradient } from './Utils';
import { FaDroplet } from "react-icons/fa6";
import { WiStrongWind } from "react-icons/wi";
import { CiTempHigh } from "react-icons/ci";
import { FaWind } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Card = ({ Weather, loading, error }) => {
   if(loading){
    return (
        <div className='w-180 min-h-120 bg-[#1E2D4A] rounded-2xl p-6 flex justify-center items-center gap-4 m-12 border border-[rgba(74,144,217,0.18)]'>
            <h1 className='text-[#F0F4FF] text-5xl font-bold'>Loading...</h1>
        </div>
    );
  }
  if(error){
    return (
        <div className='w-180 min-h-120 bg-[#1E2D4A] rounded-2xl p-6 flex justify-center items-center gap-4 m-12 border border-[rgba(74,144,217,0.18)]'>
            <h1 className='text-[#F0F4FF] text-5xl font-bold'>{error}</h1>
        </div>
    );
  }
  return (
    <div className='w-180 max-sm:w-min max-sm:ml-8 max-sm:m-2 max-sm:p-2 md:w-155 min-h-120 bg-[#1E2D4A] rounded-2xl p-6 flex-col justify-between gap-4 m-12 max-sm:gap-2 border border-[rgba(74,144,217,0.18)]'>
        <h1 className='mx-6 my-2 text-4xl md:pl-4 max-sm:text-xl'>Today Weather</h1>
        <div className='flex max-sm:w-min pt-6 justify-between'>
        <div className='flex flex-col gap-2 mb-4 md:pl-7 max-sm:ml-2'>
            <h3 className='text-[#A8C8F0] text-lg tracking-wider max-sm:whitespace-nowrap max-sm:text-sm'>📍LOCATION</h3>
            <h1 className='text-[#F0F4FF] text-3xl font-bold max-sm:font-semibold max-sm:text-xl'>{Weather?.name}</h1>
            <h2 className='text-[#A8C8F0] text-2xl max-sm:text-5sm'>{Weather?.weather?.[0]?.description}</h2>
            <span className='text-7xl md:text-5xl max-sm:text-3xl'>{getWeatherEmoji(Weather?.weather?.[0]?.icon)}</span>
        </div>
        <div className='flex flex-col max-sm:w-min'>
            <div className='flex mb-4 max-sm:ml-4 max-sm:mt-2'>
                <span className='text-9xl max-sm:text-5xl md:text-8xl font-[#F0F4FF] max-sm:mt-5 max-sm:ml-12 font-semibold'>{Math.round(Weather?.main?.temp)}</span>
                <p className='pt-6 font-semibold text-xl pr-8 text-[#FFD166]'>°F</p>
            </div>
            <div className='flex gap-2 justify-between px-4 max-sm:ml-6 max-sm:px-1'>
                <p className='text-[#A8C8F0] text-lg tracking-wider max-sm:text-medium max-sm:whitespace-nowrap max-sm:ml-2'>Feels Like:</p>
                <p className='text-[#A8C8F0] text-lg tracking-wider mr-12'>{Math.round(Weather?.main?.feels_like)}°F</p>
            </div>
        </div>
        </div>
        <div className='flex mt-8 mb-2 max-sm:w-85 gap-2 flex-wrap'>
            <Data icon={<FaDroplet size={30} />} data={`${Weather?.main?.humidity}%`} text='Humidity' />
            <Data icon={<FaWind size={30} />} data={`${Weather?.wind?.speed} m/s`} text='Wind Speed' />
            <Data icon={<CiTempHigh size={30} />} data={`H:${Math.round(Weather?.main?.temp_max)}°F / L:${Math.round(Weather?.main?.temp_min)}°F`} text='Temperature Range' />
            <Data icon={<FaTachometerAlt size={30} />} data={`${Weather?.main?.pressure} mb`} text='Pressure' />
            <Data icon={<FaEye size={30}/>} data={`${Weather?.visibility / 1000} km`} text='Visibility' />
            <Data icon={<WiStrongWind size={30} />} data={`${Weather?.wind?.gust} m/s`} text='Wind Gust' />
        </div>
    </div>
  )
}

export default Card
