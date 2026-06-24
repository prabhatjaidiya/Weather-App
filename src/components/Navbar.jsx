import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import Logo from './Logo';
import Location from './Location';
import ReactenSrc from './ReactenSrc';


const Navbar = ({city,setCity,fetchWeather,handleGeolocate,recentSearch,loading,handleInputChange}) => {   
    return (
    <div className='h-15 w-full max-sm:gap-3 max-sm:px-3 gap-5 px-6 mt-4 bg-transparent flex justify-between items-center'>
        <Logo />
        <div className='flex-1 flex items-center gap-3 ml-30 max-sm:ml-0 bg-[#1E2D4A] p-2 rounded-2xl border border-[rgba(74,144,217,0.18)]'>
        <label htmlFor='search-input' className='flex items-center gap-3 w-full h-full cursor-text'>
            <button
                onClick={()=>{
                    fetchWeather(city)
                }} 
                disabled={loading}
                className=' text-[#A8C8F0] text-4xl cursor-pointer'
                style={{
                    opacity: loading ? 0.5 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "opacity 0.2s"
                }}
            >
                {loading ? "..." : <IoSearchSharp size={30} />}
            </button>            
            <input 
                id='search-input'
                value={city}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                        fetchWeather(city)}
                    } 
                }
                type="text" 
                placeholder='Search city or Zip...' 
                className='bg-[#1E2D4A] w-full text-[#F0F4FF] placeholder:text-[#A8C8F0] focus:outline-none'
            />
        </label>
        {recentSearch.length > 0 && (<ReactenSrc recentSearch={recentSearch}/>)}
        </div>
        <Location handleGeolocate={handleGeolocate} loading={loading}/>
    </div>
  )
}
export default Navbar
