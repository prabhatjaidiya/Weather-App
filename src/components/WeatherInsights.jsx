import React from "react";

const WeatherInsights = ({ insights }) => {
  if (!insights?.length) return null;

  return (
    <section
      className="
        w-full
        rounded-[28px]
        p-5 sm:p-6 lg:p-7
        bg-white/[0.07]
        backdrop-blur-2xl
        border border-white/[0.10]
        shadow-[0_20px_80px_rgba(0,0,0,0.20)]
      "
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="
            h-11 w-11
            rounded-xl
            bg-white/[0.07]
            border border-white/[0.08]
            flex items-center justify-center
            text-xl
          "
        >
          🤖
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
            Smart Analysis
          </p>

          <h2 className="text-xl font-semibold">
            Weather Insights
          </h2>
        </div>
      </div>

      {/* Insights */}
      <div className="grid gap-3">
        {insights.map((insight, index) => (
          <div
            key={`${insight.title}-${index}`}
            className="
              flex
              gap-3
              p-4
              rounded-2xl
              bg-white/[0.045]
              border border-white/[0.07]
              hover:bg-white/[0.08]
              transition-all duration-300
            "
          >
            <div className="text-2xl shrink-0">
              {insight.icon}
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold text-sm sm:text-base">
                {insight.title}
              </h3>

              <p className="mt-1 text-xs sm:text-sm text-white/45 leading-relaxed">
                {insight.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeatherInsights;