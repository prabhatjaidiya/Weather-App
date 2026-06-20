import React from 'react'
import { TiWeatherCloudy } from "react-icons/ti";
import { IoSearchSharp } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className='h-15 w-full gap-5 px-6 mt-4 bg-[#0B1120] flex justify-between items-center'>
        <span className='font-22 font-bold tracking-<-0.02em> text-[#f0f4ff] whitespace-nowrap flex'>
            <span className='mr-4 text-[#4A90D9]'><TiWeatherCloudy size={25}/></span> Weather App
        </span>
        <div className='flex-1 flex items-center gap-3 ml-30 bg-[#1E2D4A] p-2 rounded-2xl border border-[rgba(74,144,217,0.18)]'>
        <label htmlFor='search-input' className='flex items-center gap-3 w-full h-full cursor-text'>
            <a className=' text-[#A8C8F0] pointer-events-none'><IoSearchSharp size={30} /></a>            
            <input 
                id='search-input'
                type="text" 
                placeholder='Search city or Zip...' 
                className='bg-[#1E2D4A] text-[#F0F4FF] placeholder:text-[#A8C8F0] focus:outline-none'
            />
        </label>
        </div>
    </div>
  )
}

export default Navbar
