import React from 'react'
import DayData from './DayData'

const FiveDayForcast = ({forecast,unit}) => {
  return (
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
  )
}

export default FiveDayForcast
