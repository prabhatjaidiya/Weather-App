import React from 'react'
import Data from './Data'
import { getWeatherEmoji } from './Utils';
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
    <div className='w-180 min-h-120 bg-[#1E2D4A] rounded-2xl p-6 flex-col justify-between gap-4 m-12 border border-[rgba(74,144,217,0.18)]'>
        <div className='flex px-6 pt-6 justify-between gap-4'>
        <div className='flex flex-col gap-2 mb-4'>
            <h3 className='text-[#A8C8F0] text-lg tracking-wider'>📍LOCATION</h3>
            <h1 className='text-[#F0F4FF] text-3xl font-bold'>{Weather?.name}</h1>
            <h2 className='text-[#A8C8F0] text-2xl'>{Weather?.weather?.[0]?.description}</h2>
            <span className='text-7xl'>{getWeatherEmoji(Weather?.weather?.[0]?.icon)}</span>
        </div>
        <div className='flex flex-col'>
            <div className='flex mb-4'>
                <span className='text-9xl font-[#F0F4FF] font-semibold'>{Math.round(Weather?.main?.temp)}</span>
                <p className='pt-6 font-semibold text-4xl pr-8 text-[#FFD166]'>°F</p>
            </div>
            <div className='flex gap-2 justify-between px-4'>
                <p className='text-[#A8C8F0] text-lg tracking-wider'>Feels Like:</p>
                <p className='text-[#A8C8F0] text-lg tracking-wider mr-12'>{Math.round(Weather?.main?.feels_like)}°F</p>
            </div>
        </div>
        </div>
        <div className='flex justify-between mt-8 mb-2 mx-8 p-4 gap-3 flex-wrap'>
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
