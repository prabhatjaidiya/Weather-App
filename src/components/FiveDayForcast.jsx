import React from "react";
import DayData from "./DayData";
import { formatTemperature } from "../utils/unitUtils";

const FiveDayForcast = ({ forecast, unit, dayNight }) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-1 mb-4">
        <div>
          <p className={`text-xs uppercase tracking-[0.15em] ` + (dayNight === "night" ? "text-white/45" : "text-slate-900/45")}>
            Forecast
          </p>

          <h2 className={`mt-1 text-2xl sm:text-3xl font-semibold tracking-tight ` + (dayNight === "night" ? "text-white/85" : "text-slate-900/85")}>
            5-Day Forecast
          </h2>
        </div>

        <span className={`hidden sm:block text-xs ` + (dayNight === "night" ? "text-white/40" : "text-slate-900/40")}>
          Daily
        </span>
      </div>

      {/* Forecast rows */}
      <div className="space-y-3">
        {forecast?.length > 0 ? (
          forecast.map((f, index) => (
            <DayData
              key={f.id}
              day={new Date(f.timestamp * 1000).toLocaleDateString("en-US", {
                weekday: "short"
              })}
              icon={f.icon}
              description={f.description}
              high={formatTemperature(f.high, unit)}
              low={formatTemperature(f.low, unit)}
              rainProbability={f.rainProbability}
              windSpeed={Number(f.windSpeed).toFixed(1)}
              unit={unit}
              dayNight={dayNight}
            />
          ))
        ) : (
          <div className={`rounded-2xl p-6  bg-white/[0.045] border border-white/[0.07] transition-all duration-300 shadow-[0_20px_80px_rgba(0,0,0,0.25)] text-center text-sm ` + (dayNight === "night" ? "text-white/55" : "text-slate-900/55")}>
            Forecast unavailable
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(FiveDayForcast);