const WeatherSkeleton = () => {
  return (
    <div
      className="
        w-full
        min-h-[520px]
        rounded-[28px]
        p-5 sm:p-7 lg:p-8
        bg-white/[0.07]
        backdrop-blur-2xl
        border border-white/[0.10]
        shadow-[0_20px_80px_rgba(0,0,0,0.25)]
        animate-pulse
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          {/* Current weather badge */}
          <div className="h-7 w-36 bg-white/10 rounded-full" />

          {/* City */}
          <div className="h-9 w-44 bg-white/10 rounded-lg mt-4" />

          {/* Description */}
          <div className="h-4 w-28 bg-white/10 rounded mt-2" />
        </div>

        {/* Weather icon */}
        <div
          className="
            h-20 w-20
            sm:h-24 sm:w-24
            rounded-full
            bg-white/10
            border border-white/[0.08]
          "
        />
      </div>

      {/* Temperature */}
      <div className="mt-8 flex items-end justify-between">

        <div className="flex items-start">
          {/* Temperature */}
          <div className="h-24 sm:h-28 w-32 sm:w-40 bg-white/10 rounded-lg" />

          {/* Unit */}
          <div className="ml-2">
            <div className="h-6 w-8 bg-white/10 rounded" />

            {/* Unit toggle */}
            <div className="h-9 w-9 bg-white/10 rounded-full mt-3" />
          </div>
        </div>

        {/* Feels like */}
        <div
          className="
            h-[76px]
            w-28
            rounded-2xl
            bg-white/[0.045]
            border border-white/[0.07]
            p-3
          "
        >
          <div className="h-3 w-16 bg-white/10 rounded" />
          <div className="h-5 w-12 bg-white/10 rounded mt-2" />
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="mt-8">

        <div className="flex justify-between mb-3">
          <div className="h-4 w-32 bg-white/10 rounded" />
          <div className="h-3 w-20 bg-white/10 rounded" />
        </div>

        <div className="flex gap-3 overflow-hidden">

          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="
                shrink-0
                min-w-[82px]
                h-[145px]
                rounded-2xl
                bg-white/[0.045]
                border border-white/[0.07]
                p-4
                flex flex-col
                items-center
                gap-4
              "
            >
              <div className="h-4 w-10 bg-white/10 rounded" />

              <div className="h-8 w-8 bg-white/10 rounded-full" />

              <div className="h-5 w-12 bg-white/10 rounded" />

              <div className="h-3 w-10 bg-white/10 rounded" />
            </div>
          ))}

        </div>
      </div>

      {/* Weather Details */}
      <div className="mt-6">

        <div className="h-4 w-32 bg-white/10 rounded mb-3" />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="
                h-[82px]
                rounded-2xl
                bg-white/[0.045]
                border border-white/[0.07]
                p-4
              "
            >
              <div className="h-5 w-5 bg-white/10 rounded mb-3" />
              <div className="h-3 w-16 bg-white/10 rounded" />
              <div className="h-4 w-20 bg-white/10 rounded mt-2" />
            </div>
          ))}

        </div>
      </div>

      {/* Sunrise / Sunset */}
      <div className="mt-5 h-[180px] rounded-2xl bg-white/[0.045] border border-white/[0.07]" />

    </div>
  );
};

export default WeatherSkeleton;