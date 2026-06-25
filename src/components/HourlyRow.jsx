import React from 'react'
import { getWeatherEmoji } from './Utils'

const HourlyRow = ({hourly,unit}) => {
  return (
    <div id='hourltRow' className='flex gap-12 overflow-x-auto pb-8 my-6 px-12 max-sm:px-8 scrollbar-none'>
      { hourly.map((h)=>(
        <div key={h.dt} className='flex flex-col items-center gap-y-4 max-sm:gap-y-2 min-w-[60px]'>
            <span className='text-sm'>
                {new Date(h.dt * 1000).toLocaleTimeString("en-US",{
                    hour: "numeric" , hour12: true
                })}
            </span>
            <span className='text-2xl'>{getWeatherEmoji(h.weather[0].icon)}</span>
            <span className='font-semibold'>{Math.round(h.main.temp)}°{unit === "imperial" ? "F" : "C"}</span>
        </div>
      ))}
    </div>
  )
}

export default HourlyRow
