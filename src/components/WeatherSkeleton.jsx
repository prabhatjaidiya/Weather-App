const WeatherSkeleton = () => {
  return (
    <div className="w-full max-w-180 m-12 mx-12 rounded-2xl bg-[#1c2e4a] p-8 animate-pulse">
      
      {/* Header */}
      <div className="h-8 w-52 bg-white/10 rounded mb-6" />

      {/* Location + Temp Row */}
      <div className="flex justify-between items-start">
        <div>
          <div className="h-5 w-24 bg-white/10 rounded mb-3" />
          <div className="h-7 w-32 bg-white/10 rounded mb-2" />
          <div className="h-4 w-20 bg-white/10 rounded" />

          {/* Weather icon */}
          <div className="h-16 w-16 bg-white/10 rounded-full mt-5" />
        </div>

        {/* Temperature */}
        <div className="text-right">
          <div className="h-20 w-32 bg-white/10 rounded mb-3" />
          <div className="h-5 w-40 bg-white/10 rounded" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 w-full sm:grid-cols-2 gap-12 mt-10 mx-12">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="h-34 w-55 flex rounded-xl bg-white/10"
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherSkeleton;