import React from 'react'

const DayData = ({ text }) => {
  return (
    <div className='mt-8 w-150 max-sm:ml-8 max-sm:m-2 max-sm-py-2 max-sm:pr-2 my-10 py-4 pr-4 rounded-2xl max-sm:w-85 flex justify-evenly bg-[rgba(255,255,255,0.05)] border border-[rgba(74,144,217,0.18)]'>
      <span className='max-sm:text-sm max-sm:w-8 text-xl font-semibold w-10 mr-4'>{text}</span>
      <span className='max-sm:text-sm text-xl font-semibold'>🌤️</span>
      <span className='max-sm:text-sm text-xl font-semibold'>72°</span>
      <span className='max-sm:text-sm text-xl font-semibold'>58°</span>
    </div>
  )
}

export default DayData
