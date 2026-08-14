const ForecastSkeleton = () => {
  return (
    <div className="w-full rounded-2xl px-5 py-4 mb-3 bg-white/[0.045] border border-white/[0.07] animate-pulse">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 mb-4">
        <div className="h-7 w-48 bg-white/10 rounded-lg" />

        <div className="h-4 w-12 bg-white/10 rounded" />
      </div>

      {/* Forecast Rows */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((day) => (
          <div
            key={day}
            className="
              w-full
              min-h-[76px]
              px-5
              py-4
              rounded-2xl
              bg-white/[0.045]
              border border-white/[0.07]
              flex
              items-center
              justify-between
            "
          >
            {/* Day */}
            <div className="h-5 w-12 bg-white/10 rounded" />

            {/* Weather Icon */}
            <div className="h-10 w-10 bg-white/10 rounded-xl" />

            {/* Temperature */}
            <div className="flex items-center gap-6">
              <div className="h-5 w-14 bg-white/10 rounded" />
              <div className="h-5 w-14 bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastSkeleton;