import React from 'react'
import { useEffect, useState } from "react";

const Location = ({handleGeolocate,loading}) => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div>
        {width < 500 ? (
            <button
                onClick={handleGeolocate}
                className="cursor-pointer whitespace-nowrap"
                aria-label="Use my location"
            >
                📍
            </button>
        ) : (
            <button
                onClick={handleGeolocate}
                disabled={loading}
                style={{
                    opacity: loading ? 0.5 : 1,
                    cursor: loading ? "not-allowed" : "pointer"
                }}
                className="cursor-pointer whitespace-nowrap"
            >
                📍 Use my location
            </button>
        )}
        </div>
    );
}

export default Location
