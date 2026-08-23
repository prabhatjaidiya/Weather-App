import React from "react";
import { getAQIInfo } from "../utils/weatherUtils";

const AirQuality = ({ airQuality, dayNight }) => {
  if (!airQuality?.list?.length) return null;

  const current = airQuality.list[0];

  const aqi = current?.main?.aqi;
  const components = current?.components;

  const info = getAQIInfo(aqi);

  return (
    <section
      className="group min-w-0 rounded-2xl p-3.5 sm:p-4 bg-white/[0.035] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.10] transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4">

        <div className="flex items-center gap-4">

          <div
            className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-emerald-400/[0.08] border border-emerald-400/[0.15] flex items-center justify-center text-2xl"
          >
            🌿
          </div>

          <div>
            <p className={`text-xs uppercase tracking-[0.15em] ` + (dayNight === "night" ? "text-white/45" : "text-slate-900/45")}>
              Air Quality
            </p>

            <h2 className="mt-1 text-xl sm:text-2xl font-semibold">
              {info.label}
            </h2>
          </div>

        </div>

        {/* AQI Score */}
        <div className="text-right">

          <p className={`text-xs ` + (dayNight === "night" ? "text-white/40" : "text-slate-900/40")}>
            AQI
          </p>

          <p className="text-3xl sm:text-4xl font-semibold">
            {aqi}
          </p>

        </div>

      </div>

      {/* Description */}
      <p className={`mt-5 text-sm sm:text-base ` + (dayNight === "night" ? "text-white/65" : "text-slate-900/65") + ` max-w-2xl`}>
        {info.description}
      </p>

      {/* Pollutants */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">

        <Pollutant
          label="PM2.5"
          value={components?.pm2_5}
          dayNight={dayNight}
        />

        <Pollutant
          label="PM10"
          value={components?.pm10}
          dayNight={dayNight}
        />

        <Pollutant
          label="NO₂"
          value={components?.no2}
          dayNight={dayNight}
        />

        <Pollutant
          label="O₃"
          value={components?.o3}
          dayNight={dayNight}
        />

      </div>
    </section>
  );
};


const Pollutant = React.memo(({ label, value, dayNight }) => {
  return (
    <div
      className="rounded-2xl p-4 bg-white/[0.045] border border-white/[0.07] hover:bg-white/[0.08] transition-all duration-300"
    >
      <p
        className={`text-xs ${dayNight === "night" ? "text-white/55" : "text-slate-900/55"}`}
      >
        {label}
      </p>

      <p
        className={`mt-2 text-base sm:text-lg font-semibold ${dayNight === "night"
            ? "text-white/85"
            : "text-slate-900/85"
          }`}
      >
        {value != null
          ? `${value.toFixed(1)} μg/m³`
          : "—"}
      </p>
    </div>
  );
});

export default React.memo(AirQuality);