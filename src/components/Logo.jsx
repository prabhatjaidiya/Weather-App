import React from 'react'
import { PiX } from 'react-icons/pi';
import { TiWeatherCloudy } from "react-icons/ti";
import { useEffect, useState } from "react";

const logo = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <div className="flex justify-center items-center">
            <div className="m-3">
                <TiWeatherCloudy size={30} />
            </div>

        {width > 500 && (
            <span className="text-lg font-semibold">
                Weather App
            </span>
        )}
        </div>
);
 }

export default logo
