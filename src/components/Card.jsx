import React from "react";
import Data from "./Data";
import { FaDroplet } from "react-icons/fa6";
import { WiStrongWind } from "react-icons/wi";
import { CiTempHigh } from "react-icons/ci";
import { FaWind } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import HourlyRow from "./HourlyRow";
import SunriseSunsetCard from "./SunriseSunsetCard";
import WeatherAnimation from "./WeatherAnimation";
import AirQuality from "./AirQuality";
import { formatTemperature, formatWindSpeed, formatVisibility } from "../utils/unitUtils";

const Card = ({ weather, loading, error, unit, setUnit, hourly, toggleFavorite, isFavorite, retryWeather, airQuality, dayNight }) => {

  if (!loading && !weather && !error) {
    return (
      <div
        className="w-full min-h-[520px] rounded-2xl p-6 flex flex-col justify-center items-center gap-5 bg-white/[0.045] border border-white/[0.07] transition-all duration-300 shadow-[0_20px_80px_rgba(0,0,0,0.25)] text-center"
      >
        <div className="text-[110px] sm:text-[140px] leading-none">
          🌎
        </div>

        <div>
          <h2 className={`text-2xl font-semibold`}>
            Search for a city
          </h2>

          <p className={`mt-2 text-sm sm:text-base`}>
            Get real-time weather information and forecasts
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="w-full min-h-[520px] rounded-2xl p-6 sm:p-8 flex flex-col justify-center items-center text-center bg-white/[0.045] border border-white/[0.07] transition-all duration-300 shadow-[0_20px_80px_rgba(0,0,0,0.25)]"
      >
        {/* Icon */}
        <div
          className="h-16 w-16 rounded-2xl flex items-center justify-center bg-red-400/[0.08] border border-red-300/[0.10] mb-5"
        >
          <span className="text-3xl">
            ⚠️
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-xl sm:text-2xl font-semibold text-white"
        >
          {error.title}
        </h2>

        {/* Message */}
        <p
          className="mt-3 max-w-md text-sm sm:text-base leading-relaxed text-white/40"
        >
          {error.message}
        </p>

        {/* Retry */}
        <button
          type="button"
          onClick={retryWeather}
          className="mt-6 px-5 py-2.5 rounded-xl bg-white/[0.08] border border-white/[0.10] text-sm font-medium text-white/70 hover:bg-white/[0.13] hover:text-white hover:-translate-y-0.5 transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div
      className={`${loading ? "opacity-70 blur-[0.5px]" : ""} w-full rounded-2xl p-5 sm:p-7 lg:p-8 bg-white/[0.045] border border-white/[0.07] transition-all duration-300 shadow-[0_20px_80px_rgba(0,0,0,0.25)]`}
    >

      {/* PREMIUM WEATHER HERO */}
      <section className="relative overflow-hidden">

        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-sky-400/[0.04] blur-3xl"
        />

        <div
          className="relative flex flex-col gap-7 lg:grid lg:grid-cols-[0.8fr_1.5fr] lg:gap-12 lg:items-center"
        >

          {/* LEFT — WEATHER INFORMATION */}
          <div className="w-full lg:min-h-[280px] lg:flex lg:flex-col lg:justify-between">

            {/* Location + description */}
            <div>

              <div
                className="inline-flex items-center gap-2 text-[10px] sm:text-[11px]"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"
                />

                Current Weather
              </div>


              {/* MOBILE / TABLET:Location + temperature on same line*/}
              <div
                className="mt-4 flex items-center justify-between gap-4 lg:block"
              >

                {/* LOCATION */}
                <div className="flex items-center gap-3">
                  <h1
                    className={`text-5xl sm:text-6xl lg:text-[64px] leading-none font-light tracking-[-0.045em] ${dayNight === "night" ? "text-white" : "text-slate-900"} truncate`}
                  >
                    {weather?.city}
                  </h1>

                  <button
                    type="button"
                    onClick={() => toggleFavorite()}
                    aria-label={
                      isFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                    className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center border transition-all duration-300
                      ${isFavorite
                        ? "hidden"
                        : "bg-white/[0.04] border-white/[0.08] hover:text-yellow-300 hover:bg-yellow-300/10"
                      }
                      ${dayNight === "night" ? "text-white/30" : "text-slate-900/30"}
                    `}
                  >
                    <span className="text-xl">
                      {isFavorite ? "★" : "☆"}
                    </span>
                  </button>
                </div>


                {/* MOBILE / TABLET TEMPERATURE */}
                <div
                  className="shrink-0 flex items-start gap-2 lg:hidden"
                >

                  <span
                    className={`text-5xl sm:text-6xl leading-[0.8] font-extralight tracking-[-0.07em] ${dayNight === "night" ? "text-white" : "text-slate-900"}`}
                  >
                    {formatTemperature(weather.temperature, unit)}
                  </span>

                  <div className="flex flex-col">

                    <span className={`text-lg font-light ${dayNight === "night" ? "text-white/60" : "text-slate-900/60"}`}>
                      °{unit === "imperial" ? "F" : "C"}
                    </span>

                    <button
                      onClick={() =>
                        setUnit((u) =>
                          u === "imperial"
                            ? "metric"
                            : "imperial"
                        )
                      }
                      className={`mt-2 whitespace-nowrap px-2 py-1 rounded-full border border-white/10 bg-white/[0.04] text-[9px] sm:text-[10px] tracking-wide ${dayNight === "night" ? "text-white/40 hover:bg-white/[0.08] hover:text-white/70" : "text-slate-900/40 hover:bg-slate-900/[0.08] hover:text-slate-900/70"} transition-all`}
                    >
                      °{unit === "imperial" ? "C" : "F"}
                    </button>

                  </div>

                </div>

              </div>


              {/* DESCRIPTION */}
              <p
                className={`mt-3 text-sm sm:text-lg font-light tracking-wide ${dayNight === "night" ? "text-white/80" : "text-slate-900/80"} capitalize`}
              >
                {weather?.description}
              </p>

            </div>


            {/* DESKTOP TEMPERATURE */}
            <div className="hidden lg:block">

              <div className="flex items-start">

                <span
                  className={`text-[108px] leading-[0.8] font-extralight tracking-[-0.075em] ${dayNight === "night" ? "text-white" : "text-slate-900"}`}
                >
                  {formatTemperature(weather.temperature, unit)}
                </span>

                <div className="ml-3 pt-1">

                  <span className={`text-2xl font-light ${dayNight === "night" ? "text-white/60" : "text-slate-900/60"}`}>
                    °{unit === "imperial" ? "F" : "C"}
                  </span>

                  <button
                    onClick={() =>
                      setUnit((u) =>
                        u === "imperial"
                          ? "metric"
                          : "imperial"
                      )
                    }
                    className={`block mt-4 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04] text-[11px] tracking-wide ${dayNight === "night" ? "text-white/40 hover:bg-white/[0.08] hover:text-white/70" : "text-slate-900/40 hover:bg-slate-900/[0.08] hover:text-slate-900/70"} transition-all`}
                  >
                    Switch to °{unit === "imperial" ? "C" : "F"}
                  </button>

                </div>

              </div>

            </div>

          </div>


          {/* WEATHER ANIMATION */}
          <div
            className="relative w-full lg:translate-y-1"
          >

            <WeatherAnimation
              icon={weather?.icon}
              dayNight={dayNight}
            />

            {/* FEELS LIKE */}
            <div
              className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-black/10 backdrop-blur-md border border-white/[0.08]"
            >

              <p
                className={`text-[9px] sm:text-[10px] uppercase tracking-[0.16em] ${dayNight === "night" ? "text-white/80" : "text-slate-900/80"}`}
              >
                Feels like
              </p>

              <p
                className={`mt-0.5 text-base sm:text-lg font-medium ${dayNight === "night" ? "text-white/85" : "text-slate-900/85"}`}
              >
                {formatTemperature(weather?.feelsLike, unit)}°
                {unit === "imperial" ? "F" : "C"}
              </p>

            </div>

          </div>

        </div>


        {/* DIVIDER */}
        <div
          className={`mt-7 lg:mt-9 h-px w-full bg-gradient-to-r ${dayNight === "night" ? "from-white/10 via-white/[0.04] to-transparent" : "from-slate-900/10 via-slate-900/[0.04] to-transparent"}`}
        />


        {/* CONTEXT */}
        <div
          className={`mt-3 flex items-center justify-between text-[10px] sm:text-xs tracking-wide ${dayNight === "night" ? "text-white/40" : "text-slate-900/40"}`}
        >
          <span>Today</span>
          <span>Live conditions</span>
        </div>

      </section>

      {/* HOURLY FORECAST */}
      <div className="mt-8 sm:mt-10">

        <div className="flex items-end justify-between mb-3 px-1">
          <div>
            <h2 className={`text-xs sm:text-sm font-medium tracking-[0.12em] ${dayNight === "night" ? "text-white/50" : "text-slate-900/50"} uppercase`}>
              Hourly Forecast
            </h2>

            <p className={`mt-1 text-[10px] sm:text-xs ${dayNight === "night" ? "text-white/35" : "text-slate-900/35"}`}>
              Next 24 hours
            </p>
          </div>

          <span className={`text-[10px] ${dayNight === "night" ? "text-white/35" : "text-slate-900/35"} lg:hidden`}>
            Swipe →
          </span>
        </div>

        <HourlyRow
          hourly={hourly}
          unit={unit}
          dayNight={dayNight}
        />

      </div>


      {/* WEATHER DETAILS */}
      <div className="mt-8 sm:mt-10">

        <div className="mb-3 px-1">
          <h2 className={`text-xs sm:text-sm font-medium tracking-[0.12em] ${dayNight === "night" ? "text-white/50" : "text-slate-900/50"} uppercase`}>
            Weather Details
          </h2>

          <p className={`mt-1 text-[10px] sm:text-xs ${dayNight === "night" ? "text-white/35" : "text-slate-900/35"}`}>
            Current atmospheric conditions
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">

          <Data
            icon={<FaDroplet size={20} />}
            data={`${weather?.humidity}%`}
            text="Humidity"
            dayNight={dayNight}
          />

          <Data
            icon={<FaWind size={20} />}
            data={formatWindSpeed(weather?.windSpeed, unit)}
            text="Wind Speed"
            dayNight={dayNight}
          />

          <Data
            icon={<CiTempHigh size={22} />}
            data={`H:${formatTemperature(
              weather?.tempMax,
              unit
            )}° / L:${formatTemperature(
              weather?.tempMin,
              unit
            )}°`}
            text={`Range °${unit === "imperial" ? "F" : "C"}`}
            dayNight={dayNight}
          />

          <Data
            icon={<FaTachometerAlt size={19} />}
            data={`${weather?.pressure} mb`}
            text="Pressure"
            dayNight={dayNight}
          />

          <Data
            icon={<FaEye size={19} />}
            data={formatVisibility(weather?.visibility, unit)}
            text="Visibility"
            dayNight={dayNight}
          />

          <Data
            icon={<WiStrongWind size={22} />}
            data={formatWindSpeed(weather?.windGust, unit)}
            text="Wind Gust"
            dayNight={dayNight}
          />

        </div>

      </div>

      {airQuality && (
        <div className="mt-6 lg:mt-8">
          <AirQuality airQuality={airQuality} dayNight={dayNight} />
        </div>
      )}

      {/* SUNRISE / SUNSET */}
      <div className="mt-8 sm:mt-10">
        <SunriseSunsetCard weather={weather} />
      </div>
    </div>
  );
};

export default React.memo(Card);