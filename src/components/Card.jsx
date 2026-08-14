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

const Card = ({
  weather,
  loading,
  error,
  unit,
  setUnit,
  hourly,
}) => {
  if (!loading && !weather && !error) {
    return (
      <div
        className="
          w-full min-h-[520px]
          rounded-[28px]
          p-6
          flex flex-col
          justify-center
          items-center
          gap-5
          bg-white/[0.06]
          backdrop-blur-2xl
          border border-white/[0.08]
          shadow-[0_20px_80px_rgba(0,0,0,0.25)]
          text-center
        "
      >
        <div className="text-[110px] sm:text-[140px] leading-none">
          🌎
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-semibold">
            Search for a city
          </h2>

          <p className="mt-2 text-sm sm:text-base text-white/40">
            Get real-time weather information and forecasts
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          w-full min-h-[520px]
          rounded-[28px]
          p-6
          flex flex-col
          justify-center
          items-center
          text-center
          bg-white/[0.06]
          backdrop-blur-2xl
          border border-red-400/10
          shadow-[0_20px_80px_rgba(0,0,0,0.25)]
        "
      >
        <div className="text-5xl mb-5">
          🌧️
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-red-300">
          Unable to fetch weather
        </h2>

        <p className="mt-2 text-sm text-white/40 max-w-sm">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`
        ${loading ? "opacity-70 blur-[0.5px]" : ""}
        w-full
        rounded-[28px]
        p-5 sm:p-7 lg:p-8
        bg-white/[0.07]
        backdrop-blur-2xl
        border border-white/[0.10]
        shadow-[0_20px_80px_rgba(0,0,0,0.25)]
        transition-all duration-500
      `}
    >

      {/* PREMIUM WEATHER HERO */}
      <section className="relative overflow-hidden">

        {/* Ambient glow */}
        <div
          className="
      pointer-events-none
      absolute
      -top-32
      right-0
      h-72
      w-72
      rounded-full
      bg-sky-400/[0.04]
      blur-3xl
    "
        />

        <div
          className="
      relative
      flex
      flex-col
      gap-7

      lg:grid
      lg:grid-cols-[0.8fr_1.5fr]
      lg:gap-12
      lg:items-center
    "
        >

          {/* LEFT — WEATHER INFORMATION */}
          <div className="w-full lg:min-h-[280px] lg:flex lg:flex-col lg:justify-between">

            {/* Location + description */}
            <div>

              <div
                className="
            inline-flex
            items-center
            gap-2
            text-[10px]
            sm:text-[11px]
            font-medium
            tracking-[0.18em]
            uppercase
            text-white/40
          "
              >
                <span
                  className="
              h-1.5
              w-1.5
              rounded-full
              bg-emerald-400
              shadow-[0_0_10px_rgba(52,211,153,0.6)]
            "
                />

                Current Weather
              </div>


              {/* MOBILE / TABLET:
            Location + temperature on same line
        */}
              <div
                className="
            mt-4
            flex
            items-center
            justify-between
            gap-4

            lg:block
          "
              >

                {/* LOCATION */}
                <h1
                  className="
              min-w-0
              text-4xl
              sm:text-5xl
              font-light
              tracking-[-0.045em]
              leading-none
              text-white
              truncate

              lg:mt-5
              lg:text-[64px]
            "
                >
                  {weather?.city}
                </h1>


                {/* MOBILE / TABLET TEMPERATURE */}
                <div
                  className="
              shrink-0
              flex
              items-start
              gap-2

              lg:hidden
            "
                >

                  <span
                    className="
                text-5xl
                sm:text-6xl
                leading-[0.8]
                font-extralight
                tracking-[-0.07em]
                text-white
              "
                  >
                    {Math.round(weather.temperature)}
                  </span>

                  <div className="flex flex-col">

                    <span className="text-lg font-light text-white/40">
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
                      className="
                  mt-2
                  whitespace-nowrap
                  px-2
                  py-1
                  rounded-full
                  border border-white/10
                  bg-white/[0.04]
                  text-[9px]
                  sm:text-[10px]
                  tracking-wide
                  text-white/40
                  hover:bg-white/[0.08]
                  hover:text-white/70
                  transition-all
                "
                    >
                      °{unit === "imperial" ? "C" : "F"}
                    </button>

                  </div>

                </div>

              </div>


              {/* DESCRIPTION */}
              <p
                className="
            mt-3
            text-sm
            sm:text-lg
            font-light
            tracking-wide
            text-white/40
            capitalize
          "
              >
                {weather?.description}
              </p>

            </div>


            {/* DESKTOP TEMPERATURE */}
            <div className="hidden lg:block">

              <div className="flex items-start">

                <span
                  className="
              text-[108px]
              leading-[0.8]
              font-extralight
              tracking-[-0.075em]
              text-white
            "
                >
                  {Math.round(weather.temperature)}
                </span>

                <div className="ml-3 pt-1">

                  <span className="text-2xl font-light text-white/40">
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
                    className="
                block
                mt-4
                px-2.5
                py-1
                rounded-full
                border border-white/10
                bg-white/[0.04]
                text-[11px]
                tracking-wide
                text-white/40
                hover:bg-white/[0.08]
                hover:text-white/70
                transition-all
              "
                  >
                    Switch to °{unit === "imperial" ? "C" : "F"}
                  </button>

                </div>

              </div>

            </div>

          </div>


          {/* WEATHER ANIMATION */}
          <div
            className="
        relative
        w-full
        lg:translate-y-1
      "
          >

            <WeatherAnimation
              icon={weather?.icon}
            />

            {/* FEELS LIKE */}
            <div
              className="
          absolute
          bottom-3
          right-3
          sm:bottom-5
          sm:right-5
          px-3
          py-2.5
          sm:px-4
          sm:py-3
          rounded-xl
          bg-black/10
          backdrop-blur-md
          border border-white/[0.08]
        "
            >

              <p
                className="
            text-[9px]
            sm:text-[10px]
            uppercase
            tracking-[0.16em]
            text-white/35
          "
              >
                Feels like
              </p>

              <p
                className="
            mt-0.5
            text-base
            sm:text-lg
            font-medium
            text-white/85
          "
              >
                {Math.round(weather?.feelsLike)}°
                {unit === "imperial" ? "F" : "C"}
              </p>

            </div>

          </div>

        </div>


        {/* DIVIDER */}
        <div
          className="
      mt-7
      lg:mt-9
      h-px
      w-full
      bg-gradient-to-r
      from-white/10
      via-white/[0.04]
      to-transparent
    "
        />


        {/* CONTEXT */}
        <div
          className="
      mt-3
      flex
      items-center
      justify-between
      text-[10px]
      sm:text-xs
      tracking-wide
      text-white/30
    "
        >
          <span>Today</span>
          <span>Live conditions</span>
        </div>

      </section>

      {/* HOURLY FORECAST */}
      <div className="mt-8 sm:mt-10">

        <div className="flex items-end justify-between mb-3 px-1">
          <div>
            <h2 className="text-xs sm:text-sm font-medium tracking-[0.12em] text-white/50 uppercase">
              Hourly Forecast
            </h2>

            <p className="mt-1 text-[10px] sm:text-xs text-white/25">
              Next 24 hours
            </p>
          </div>

          <span className="text-[10px] text-white/25 lg:hidden">
            Swipe →
          </span>
        </div>

        <HourlyRow
          hourly={hourly}
          unit={unit}
        />

      </div>


      {/* WEATHER DETAILS */}
      <div className="mt-8 sm:mt-10">

        <div className="mb-3 px-1">
          <h2 className="text-xs sm:text-sm font-medium tracking-[0.12em] text-white/50 uppercase">
            Weather Details
          </h2>

          <p className="mt-1 text-[10px] sm:text-xs text-white/25">
            Current atmospheric conditions
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">

          <Data
            icon={<FaDroplet size={20} />}
            data={`${weather?.humidity}%`}
            text="Humidity"
          />

          <Data
            icon={<FaWind size={20} />}
            data={`${weather?.windSpeed} m/s`}
            text="Wind Speed"
          />

          <Data
            icon={<CiTempHigh size={22} />}
            data={`H:${Math.round(weather?.tempMax)}° / L:${Math.round(weather?.tempMin)}°`}
            text={`Range °${unit === "imperial" ? "F" : "C"}`}
          />

          <Data
            icon={<FaTachometerAlt size={19} />}
            data={`${weather?.pressure} mb`}
            text="Pressure"
          />

          <Data
            icon={<FaEye size={19} />}
            data={`${(weather?.visibility / 1000).toFixed(1)} km`}
            text="Visibility"
          />

          <Data
            icon={<WiStrongWind size={22} />}
            data={
              weather?.windGust
                ? `${weather.windGust} m/s`
                : "—"
            }
            text="Wind Gust"
          />

        </div>

      </div>


      {/* SUNRISE / SUNSET */}
      <div className="mt-8 sm:mt-10">
        <SunriseSunsetCard weather={weather} />
      </div>

    </div>
  );
};

export default Card;