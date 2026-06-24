import React from 'react'

const Data = ({ icon, data, text }) => {
  return (
      <div className='h-28 w-52 flex gap-4 p-12 md:py-1 md:px-3 max-sm:px-3 max-sm:h-30 max-sm:w-40 w-70 h-30 max-w-60 justify-center items-center bg-[rgba(255,255,255,0.05)] border border-[rgba(74,144,217,0.18)] rounded-2xl'>
        {icon}
        <div>
          <p className='text-[#A8C8F0] text-sm md:text-md max-sm:text-sm'>{text}</p>
          <p className='text-[#F0F4FF] text-sm font-normal md:text-xl max-sm:text-4sm'>{data}</p>
        </div>
      </div>
  )
}

export default Data
