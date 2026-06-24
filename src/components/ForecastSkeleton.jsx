const ForecastSkeleton = () => {
  return (
    <div className="w-full max-w-4xl m-12 mt-18 animate-pulse">
      
      {/* Title */}
      <div className="h-8 w-56 bg-white/10 rounded mb-12" />

      {/* Forecast Rows */}
      <div className="space-y-16">
        {[1, 2, 3, 4, 5].map((day) => (
          <div
            key={day}
            className="flex items-center justify-between px-6 py-5 rounded-2xl bg-white/10 backdrop-blur-sm"
          >
            {/* Day */}
            <div className="h-5 w-16 bg-white/20 rounded" />

            {/* Weather Icon */}
            <div className="h-10 w-10 bg-white/20 rounded-full" />

            {/* Max Temp */}
            <div className="h-5 w-14 bg-white/20 rounded" />

            {/* Min Temp */}
            <div className="h-5 w-14 bg-white/20 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastSkeleton;