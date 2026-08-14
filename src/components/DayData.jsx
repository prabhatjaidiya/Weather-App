import React from "react";
import { getWeatherEmoji } from "./Utils";

const DayData = ({
  day,
  icon,
  high,
  low,
  rainProbability,
  unit,
}) => {
  return (
    <div
      className="
        group
        mt-3
        w-full
        px-4 py-4
        rounded-2xl
        flex items-center
        justify-between
        bg-white/[0.045]
        border border-white/[0.07]
        hover:bg-white/[0.08]
        hover:border-white/[0.12]
        hover:-translate-y-0.5
        transition-all duration-300
      "
    >
      {/* Day */}
      <span className="w-12 text-sm sm:text-base font-semibold text-white/80">
        {day}
      </span>

      {/* Weather */}
      <span className="text-2xl">
        {getWeatherEmoji(icon)}
      </span>

      {/* Rain */}
      <div className="flex items-center gap-1 min-w-[55px]">
        <span className="text-blue-300 text-sm">
          💧
        </span>

        <span className="text-sm text-blue-300">
          {rainProbability}%
        </span>
      </div>

      {/* Temperature */}
      <div className="flex items-center gap-3">
        <span className="text-sm sm:text-base font-semibold text-white">
          {high}°
          {unit === "imperial" ? "F" : "C"}
        </span>

        <span className="text-sm sm:text-base text-white/40">
          {low}°
          {unit === "imperial" ? "F" : "C"}
        </span>
      </div>
    </div>
  );
};

export default DayData;