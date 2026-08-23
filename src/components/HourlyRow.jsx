import React, { useMemo } from "react";
import { getWeatherEmoji } from "./Utils";
import { formatTemperature } from "../utils/unitUtils";

const HourlyRow = ({ hourly, unit, dayNight }) => {
  const data = useMemo(() => {
    if (!hourly?.length) return [];

    return hourly.map((h, index) => ({
      ...h,
      displayTime:
        index === 0
          ? "Now"
          : new Date(
            h.localTimestamp * 1000
          ).toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
            timeZone: "UTC",
          }),
    }));
  }, [hourly]);

  if (!data.length) return null;

  const isNight = dayNight === "night";

  return (
    <div className="flex gap-2.5 sm:gap-3 overflow-x-auto py-2 px-1 scrollbar-none snap-x snap-mandatory">
      {data.map((h, index) => (
        <div
          key={h.id}
          className={`snap-start shrink-0 w-[76px] sm:w-[82px] rounded-2xl px-2.5 sm:px-3 py-3.5 sm:py-4 flex flex-col items-center gap-2.5 border transition-all duration-300
            ${index === 0
              ? "bg-white/[0.09] border-white/[0.12]"
              : "bg-white/[0.035] border-white/[0.06] hover:bg-white/[0.07] hover:border-white/[0.10]"
            }

            ${isNight
              ? "text-white/60"
              : "text-slate-900/60"
            }
          `}
        >
          {/* TIME */}
          <span
            className={`text-[11px] sm:text-xs ${isNight
                ? "text-white/45"
                : "text-slate-900/45"
              }`}
          >
            {h.displayTime}
          </span>

          {/* ICON */}
          <span className="text-2xl sm:text-[26px] leading-none">
            {getWeatherEmoji(h.icon)}
          </span>

          {/* TEMPERATURE */}
          <span
            className={`text-sm sm:text-base font-medium ${isNight
                ? "text-white/85"
                : "text-slate-900/85"
              }`}
          >
            {formatTemperature(
              h.temperature,
              unit
            )}
            °{unit === "imperial" ? "F" : "C"}
          </span>

          {/* RAIN */}
          <span
            className={`text-[10px] ${isNight
                ? "text-sky-300/70"
                : "text-sky-700/70"
              }`}
          >
            Rain {h.rainProbability}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default React.memo(HourlyRow);