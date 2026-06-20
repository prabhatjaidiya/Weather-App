import React from 'react'
import Data from './Data'

const Card = () => {
  return (
    <div className='w-180 min-h-120 bg-[#1E2D4A] rounded-2xl p-6 flex-col justify-between gap-4 m-12 border border-[rgba(74,144,217,0.18)]'>
        <div className='flex px-6 pt-6 justify-between gap-4'>
        <div className='flex flex-col gap-2 mb-4'>
            <h3 className='text-[#A8C8F0] text-lg tracking-wider'>📍LOCATION</h3>
            <h1 className='text-[#F0F4FF] text-3xl font-bold'>San Francisco, CA</h1>
            <h2 className='text-[#A8C8F0] text-2xl'>Party Cloudy</h2>
            <span className='text-7xl'>⛅</span>
        </div>
        <div className='flex'>
            <span className='text-9xl font-[#F0F4FF] font-semibold'>68</span>
            <p className='pt-6 font-semibold text-4xl pr-8 text-[#FFD166]'>°F</p>
        </div>
        </div>
        <div className='flex justify-between mt-8 mb-2 mx-8 p-4 gap-3 flex-wrap'>
            <Data />
            <Data />
            <Data />
            <Data />
        </div>
    </div>
  )
}

export default Card
