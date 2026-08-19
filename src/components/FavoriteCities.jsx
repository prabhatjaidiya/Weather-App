import React from "react";
import { FaStar } from "react-icons/fa";

const FavoriteCities = ({
    favorites,
    setCity,
    setLastCity,
    fetchWeather,
    toggleFavorite,
}) => {
    if (!favorites?.length) return null;

    const handleSelect = (city) => {
        setCity(city);
        setLastCity(city);
        fetchWeather(city);
    };

    return (
        <div className="w-full mt-4">

            <div className="flex items-center gap-2 mb-3 px-1">
                <FaStar
                    size={12}
                    className="text-yellow-300"
                />

                <span className="
          text-[10px]
          uppercase
          tracking-[0.15em]
          text-white/35
        ">
                    Favorite Cities
                </span>
            </div>

            <div className="
        flex
        gap-2
        overflow-x-auto
        scrollbar-none
        pb-1
      ">
                {favorites.map((city) => (
                    <div
                        key={city}
                        className="
              shrink-0
              flex
              items-center
              rounded-xl
              bg-white/[0.045]
              border border-white/[0.07]
              hover:bg-white/[0.08]
              transition-all duration-200
            "
                    >

                        {/* CITY */}
                        <button
                            type="button"
                            onClick={() => handleSelect(city)}
                            className="
                px-3
                py-2
                text-sm
                text-white/60
                hover:text-white
                transition-colors
              "
                        >
                            {city}
                        </button>

                        {/* REMOVE */}
                        <button
                            type="button"
                            onClick={() => toggleFavorite(city)}
                            aria-label={`Remove ${city} from favorites`}
                            className="
                px-2
                text-xs
                text-white/20
                hover:text-red-300
                transition-colors
              "
                        >
                            ×
                        </button>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default FavoriteCities;