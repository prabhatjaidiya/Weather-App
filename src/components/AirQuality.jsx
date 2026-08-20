import React from "react";
import { getAQIInfo } from "../utils/weatherUtils";

const AirQuality = ({ airQuality }) => {
  if (!airQuality?.list?.length) return null;

  const current = airQuality.list[0];

  const aqi = current?.main?.aqi;
  const components = current?.components;

  const info = getAQIInfo(aqi);

  return (
    <section
      className="
        group
        min-w-0
        rounded-2xl
        p-3.5
        sm:p-4
        bg-white/[0.035]
        border border-white/[0.06]
        hover:bg-white/[0.06]
        hover:border-white/[0.10]
        transition-all
        duration-300
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4">

        <div className="flex items-center gap-4">

          <div
            className="
              h-14 w-14
              sm:h-16 sm:w-16
              rounded-2xl
              bg-emerald-400/[0.08]
              border border-emerald-400/[0.15]
              flex items-center justify-center
              text-2xl
            "
          >
            🌿
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-white/35">
              Air Quality
            </p>

            <h2 className="mt-1 text-xl sm:text-2xl font-semibold">
              {info.label}
            </h2>
          </div>

        </div>

        {/* AQI Score */}
        <div className="text-right">

          <p className="text-xs text-white/30">
            AQI
          </p>

          <p className="text-3xl sm:text-4xl font-semibold">
            {aqi}
          </p>

        </div>

      </div>

      {/* Description */}
      <p className="mt-5 text-sm sm:text-base text-white/45 max-w-2xl">
        {info.description}
      </p>

      {/* Pollutants */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">

        <Pollutant
          label="PM2.5"
          value={components?.pm2_5}
        />

        <Pollutant
          label="PM10"
          value={components?.pm10}
        />

        <Pollutant
          label="NO₂"
          value={components?.no2}
        />

        <Pollutant
          label="O₃"
          value={components?.o3}
        />

      </div>
    </section>
  );
};


const Pollutant = ({ label, value }) => {
  return (
    <div
      className="
        rounded-2xl
        p-4
        bg-white/[0.045]
        border border-white/[0.07]
        hover:bg-white/[0.08]
        transition-all duration-300
      "
    >
      <p className="text-xs text-white/35">
        {label}
      </p>

      <p className="mt-2 text-base sm:text-lg font-semibold">
        {value != null
          ? `${value.toFixed(1)} μg/m³`
          : "—"}
      </p>
    </div>
  );
};


export default AirQuality;