import React from 'react'

const ReactenSrc = ({recentSearch}) => {
        return(
            <div className='flex items-center gap-4 text-[#F0F4FF]/50 pr-2 max-sm:gap-2 max-sm:text-sm w-min'>
                {recentSearch.map(c => (
                    <button className='cursor-pointer hover:text-[#F0F4FF] transition-all duration-300 whitespace-nowrap' key={c} onClick={()=>{setCity(c); fetchWeather(c); }}>
                        {c}
                    </button>
                ))}
            </div>
        )
    }

export default ReactenSrc
