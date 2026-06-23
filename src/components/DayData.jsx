import React from 'react'
import { getWeatherEmoji } from './Utils';

const DayData = ({ day,icon,high,low,unit }) => {
  return (
    <div className='mt-8 w-150 max-sm:my-3 my-6 py-4 pr-4 rounded-2xl max-sm:w-full flex justify-evenly bg-[rgba(255,255,255,0.05)] border border-[rgba(74,144,217,0.18)]'>
      <span className='max-sm:text-sm max-sm:w-8 text-xl font-semibold w-10 mr-4'>{day}</span>
      <span className='max-sm:text-sm text-xl font-semibold'>{getWeatherEmoji(icon)}</span>
      <span className='max-sm:text-sm text-xl font-semibold'>{high}°{unit === "imperial" ? "F" : "C"}</span>
      <span className='max-sm:text-sm text-xl font-semibold'>{low}°{unit === "imperial" ? "F" : "C"}</span>
    </div>
  )
}

export default DayData
