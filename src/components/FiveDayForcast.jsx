import React from "react";
import DayData from "./DayData";
import { formatTemperature, formatWindSpeed } from "../utils/unitUtils";

const FiveDayForcast = ({ forecast, unit, dayNight }) => {

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-1 mb-4">
        <div>
          <p className={`text-xs uppercase tracking-[0.15em] `}>
            Forecast
          </p>

          <h2 className={`mt-1 text-2xl sm:text-3xl font-semibold tracking-tight `}>
            5-Day Forecast
          </h2>
        </div>

        <span className={`hidden sm:block text-xs `}>
          Daily
        </span>
      </div>

      {/* Forecast rows */}
      <div className="space-y-3">
        {forecast?.length > 0 ? (
          forecast.map((f) => (
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
              windSpeed={formatWindSpeed(f.windSpeed, unit)}
              unit={unit}
              dayNight={dayNight}
            />
          ))
        ) : (
          <p className={`text-sm`}>
            Forecast unavailable
          </p>
        )}
      </div>
    </div>
  );
};

export default React.memo(FiveDayForcast);