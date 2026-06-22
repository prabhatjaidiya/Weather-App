import React from 'react'
import { PiX } from 'react-icons/pi';
import { TiWeatherCloudy } from "react-icons/ti";

const logo = () => {
    if(window.innerWidth<500){
        return(
        <div className='m-3'>
            <span><TiWeatherCloudy size={30} /></span>
        </div>
    )
    }
    if(window.innerWidth>500){
        return(
            <div className='flex justify-center items-center text-lg font-semibold'>
                <div className='m-3'>
                    <span><TiWeatherCloudy size={30} /></span>
                </div>
                <span>Weather App</span>
            </div>
        )
    }
    
 }

export default logo
