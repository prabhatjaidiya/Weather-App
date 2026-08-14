import React from "react";
import DayData from "./DayData";

const FiveDayForcast = ({ forecast, unit }) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-1 mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-white/35">
            Forecast
          </p>

          <h2 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">
            5-Day Forecast
          </h2>
        </div>

        <span className="hidden sm:block text-xs text-white/30">
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
              high={Math.round(f.high)}
              low={Math.round(f.low)}
              rainProbability={f.rainProbability}
              unit={unit}
            />
          ))
        ) : (
          <div className="
            rounded-2xl
            p-6
            bg-white/[0.045]
            border border-white/[0.07]
            text-center
            text-sm
            text-white/35
          ">
            Forecast unavailable
          </div>
        )}
      </div>
    </div>
  );
};

export default FiveDayForcast;