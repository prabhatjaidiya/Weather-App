import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import Logo from './Logo';
import Location from './Location';


const Navbar = ({city,setCity,fetchWeather,handleGeolocate,recentSearch}) => {   
    return (
    <div className='h-15 w-full max-sm:gap-3 max-sm:px-3 gap-5 px-6 mt-4 bg-transparent flex justify-between items-center'>
        <Logo />
        <div className='flex-1 flex items-center gap-3 ml-30 max-sm:ml-0 bg-[#1E2D4A] p-2 rounded-2xl border border-[rgba(74,144,217,0.18)]'>
        <label htmlFor='search-input' className='flex items-center gap-3 w-full h-full cursor-text'>
            <button
                onClick={()=>{
                    fetchWeather(city)
                }} 
                className=' text-[#A8C8F0] cursor-pointer'>{<IoSearchSharp size={30} />}</button>            
            <input 
                id='search-input'
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
        {recentSearch.length > 0 && (
            <div style={{display:'flex',alignItems:"center",gap:12,marginTop:6,width:"full"}}>
                {recentSearch.map(c => (
                    <button className='cursor-pointer' key={c} onClick={()=>{setCity(c); fetchWeather(c); }}>
                        {c}
                    </button>
                ))}
            </div>
        )}
        </div>
        <Location handleGeolocate={handleGeolocate}/>
    </div>
  )
}
export default Navbar
