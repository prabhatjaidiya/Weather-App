import React from "react";
import { IoTimeOutline } from "react-icons/io5";

const ReactenSrc = ({
  recentSearch,
  setCity,
  fetchWeather,
}) => {
  if (!recentSearch?.length) return null;

  const handleSelect = (city) => {
    setCity(city);
    fetchWeather(city);
  };

  return (
    <div
      className="
        absolute
        left-0
        right-0
        top-[calc(100%+8px)]
        z-[200]
        p-2
        rounded-2xl
        bg-[#101c2e]/95
        backdrop-blur-2xl
        border border-white/[0.10]
        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
        animate-[fadeIn_0.2s_ease]
      "
    >
      <div className="px-3 py-2">
        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.15em]
            text-white/30
          "
        >
          Recent searches
        </p>
      </div>

      <div className="space-y-1">
        {recentSearch.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => handleSelect(city)}
            className="
              group
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-xl
              text-left
              text-sm
              text-white/55
              hover:text-white
              hover:bg-white/[0.07]
              transition-all duration-200
            "
          >
            <span
              className="
                h-8 w-8
                shrink-0
                rounded-lg
                bg-white/[0.05]
                border border-white/[0.06]
                flex items-center justify-center
                text-white/30
                group-hover:text-white/70
                transition-colors
              "
            >
              <IoTimeOutline size={16} />
            </span>

            <span className="truncate">
              {city}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReactenSrc;