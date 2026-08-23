import React from "react";
import { IoTimeOutline } from "react-icons/io5";

const ReactenSrc = ({
  recentSearch,
  setCity,
  fetchWeather,
  dayNight,
}) => {
  if (!recentSearch?.length) return null;

  const isNight = dayNight === "night";

  const handleSelect = (city) => {
    setCity(city);
    fetchWeather(city);
  };

  const dropdownBg = isNight
    ? "bg-[#101c2e]/95"
    : "bg-white/[0.94]";

  const borderColor = isNight
    ? "border-white/[0.10]"
    : "border-slate-900/[0.10]";

  const headingText = isNight
    ? "text-white/35"
    : "text-slate-900/45";

  const itemText = isNight
    ? "text-white/55"
    : "text-slate-900/60";

  const itemHover = isNight
    ? "hover:text-white hover:bg-white/[0.07]"
    : "hover:text-slate-900 hover:bg-slate-900/[0.06]";

  const iconBg = isNight
    ? "bg-white/[0.05] border-white/[0.06]"
    : "bg-slate-900/[0.04] border-slate-900/[0.07]";

  const iconText = isNight
    ? "text-white/30 group-hover:text-white/70"
    : "text-slate-900/35 group-hover:text-slate-900/70";

  return (
    <div
      id="recent-searches"
      role="listbox"
      aria-label="Recent searches"
      className={`
        absolute
        left-0
        right-0
        top-[calc(100%+8px)]
        z-[200]
        p-2
        rounded-2xl
        backdrop-blur-2xl
        border
        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
        animate-[fadeIn_0.2s_ease]

        ${dropdownBg}
        ${borderColor}
      `}
    >
      {/* Header */}
      <div className="px-3 py-2">
        <p
          className={`
            text-[10px]
            uppercase
            tracking-[0.15em]
            ${headingText}
          `}
        >
          Recent searches
        </p>
      </div>

      {/* Searches */}
      <div className="space-y-1">
        {recentSearch.map((city, index) => (
          <button
            key={`${city}-${index}`}
            type="button"
            role="option"
            aria-label={`Search weather for ${city}`}
            onClick={() => handleSelect(city)}
            className={`
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
              transition-all
              duration-200

              ${itemText}
              ${itemHover}
            `}
          >
            {/* Icon */}
            <span
              className={`
                h-8
                w-8
                shrink-0
                rounded-lg
                border
                flex
                items-center
                justify-center
                transition-colors

                ${iconBg}
                ${iconText}
              `}
              aria-hidden="true"
            >
              <IoTimeOutline size={16} />
            </span>

            {/* City */}
            <span className="truncate">
              {city}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ReactenSrc);