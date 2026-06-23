import React from 'react'

const Location = ({handleGeolocate}) => {
    if(window.innerWidth<500){
            return(
            <div>
                <button className='cursor-pointer whitespace-nowrap'>📍</button>
            </div>
        )
        }
        if(window.innerWidth>500){
            return(
            <div>
                <button onClick={handleGeolocate} className='cursor-pointer whitespace-nowrap'>📍 Use my location</button>
            </div>
            )
        }
}

export default Location
