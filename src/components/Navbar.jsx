import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import Logo from './Logo';


const Navbar = ({handleSearch,city,setCity}) => {   
    return (
    <div className='h-15 w-full max-sm:gap-3 max-sm:px-3 gap-5 px-6 mt-4 bg-transparent flex justify-between items-center'>
        <Logo />
        <div className='flex-1 flex items-center gap-3 ml-30 max-sm:ml-0 bg-[#1E2D4A] p-2 rounded-2xl border border-[rgba(74,144,217,0.18)]'>
        <label htmlFor='search-input' className='flex items-center gap-3 w-full h-full cursor-text'>
            <button
                onClick={()=>{
                    handleSearch(city)
                }} 
                className=' text-[#A8C8F0] cursor-pointer'>{<IoSearchSharp size={30} />}</button>            
            <input 
                id='search-input'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                        handleSearch(city)}
                    } 
                }
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
