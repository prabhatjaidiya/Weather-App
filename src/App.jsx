import React, { useState } from 'react'
import Navbar from './components/Navbar';
import Card from './components/Card';
import DayData from './components/DayData';

const clickedThemeChange = () => {
  console.log('clicked');
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className='min-h-screen w-full bg-[#0B1120] font-(family-name:<Space Grotesk,system-ui,sens-serif>) text-[#F0F4FF] flex flex-col'> 
      <Navbar />
      <div className=' flex'>
        <Card />
        <div className='my-12'>
          <h2 className='text-xl p-4'>5-DAY FORECAST</h2>
          <DayData />
          <DayData />
          <DayData />
          <DayData />
          <DayData />
        </div>
      </div>
    </div>
  )
}

export default App
