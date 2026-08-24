import React from "react";
import { getWeatherEmoji } from "./Utils";

const DayData = ({
  day,
  icon,
  description,
  high,
  low,
  windSpeed,
  rainProbability,
  unit,
  dayNight
}) => {
  return (
    <div
      className="group mt-3 w-full px-4 py-4 rounded-2xl flex items-center justify-between gap-3 bg-white/[0.045] border border-white/[0.07] hover:bg-white/[0.08] hover:border-white/[0.12] hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Day */}
      <div className="w-12 shrink-0">
        <span className={`text-sm sm:text-base font-semibold ` + (dayNight === "night" ? "text-white/80" : "text-slate-900/80")}>
          {day}
        </span>
      </div>

      {/* Weather */}
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-2xl shrink-0">
          {getWeatherEmoji(icon)}
        </span>

        <span
          className={`
          hidden
          md:block
          text-xs
          ` + (dayNight === "night" ? "text-white/35" : "text-slate-900/35") +
            `capitalize
          truncate
          max-w-[140px]
          `}>
          {description}
        </span>
      </div>

      {/* Wind */}
      <div className={`
        sm:flex
        items-center
        gap-1
        min-w-[75px]
        ` + (dayNight === "night" ? "text-white/40" : "text-slate-900/40")}
      >
        <span className="text-xs">
          💨
        </span>

        <span className="text-xs">
          {windSpeed} m/s
        </span>
      </div>

      {/* Temperature */}
      <div className="flex items-center gap-3 shrink-0">
        <span className={`text-sm sm:text-base font-semibold ` + (dayNight === "night" ? "text-white" : "text-slate-900")}>
          {high}°
          {unit === "imperial" ? "F" : "C"}
        </span>

        <span className={`text-sm sm:text-base ` + (dayNight === "night" ? "text-white/40" : "text-slate-900/40")}>
          {low}°
          {unit === "imperial" ? "F" : "C"}
        </span>
      </div>

    </div>
  );
};

export default DayData;