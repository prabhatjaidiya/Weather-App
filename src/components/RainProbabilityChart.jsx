import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import useElementWidth from "../hooks/useElementWidth";

const RainProbabilityChart = ({ hourly, dayNight }) => {
  const isNight = dayNight === "night";
  const [chartRef, chartWidth] = useElementWidth();

  /*
   * Keep the weather data untouched.
   * Only reduce the number of points rendered by Recharts.
   */
  const data = useMemo(() => {
    if (!hourly?.length) return [];

    return hourly.slice(0, 12).map((item, index) => ({
      time:
        index === 0
          ? "Now"
          : new Date(
            item.localTimestamp * 1000
          ).toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
            timeZone: "UTC",
          }),

      rain: Number(item.rainProbability) || 0,
    }));
  }, [hourly]);

  const stats = useMemo(() => {
    if (!hourly?.length) return null;

    const rainValues = hourly.map(
      (item) => Number(item.rainProbability) || 0
    );

    const maxRain = Math.max(...rainValues);

    const averageRain = Math.round(
      rainValues.reduce(
        (sum, value) => sum + value,
        0
      ) / rainValues.length
    );

    const highRiskHours = rainValues.filter(
      (value) => value >= 50
    ).length;

    return {
      maxRain,
      averageRain,
      highRiskHours,
    };
  }, [hourly]);

  if (!stats || !data.length) return null;

  const textPrimary = isNight
    ? "text-white"
    : "text-slate-900";

  const textSecondary = isNight
    ? "text-white/45"
    : "text-slate-700/60";

  const gridColor = isNight
    ? "rgba(255,255,255,0.06)"
    : "rgba(15,23,42,0.08)";

  const axisColor = isNight
    ? "rgba(255,255,255,0.42)"
    : "rgba(15,23,42,0.55)";

  return (
    <div
      className="
        w-full
        rounded-[28px]
        p-5 sm:p-6
        bg-white/[0.045]
        border border-white/[0.07]
        transition-all duration-300
        shadow-[0_20px_80px_rgba(0,0,0,0.25)]
      "
    >
      {/* HEADER */}
      <div className="mb-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p
              className={`
                text-[10px]
                uppercase
                tracking-[0.18em]
                ${textSecondary}
              `}
            >
              Precipitation
            </p>

            <h2
              className={`
                text-xl
                font-semibold
                mt-1
                ${textPrimary}
              `}
            >
              Rain Probability
            </h2>
          </div>

          <div className="text-right">
            <p
              className={`
                text-2xl
                font-semibold
                ${textPrimary}
              `}
            >
              {stats.maxRain}%
            </p>

            <p
              className={`
                text-[11px]
                ${textSecondary}
              `}
            >
              highest chance
            </p>
          </div>
        </div>

        {/* STATS */}
        <div
          className={`
            mt-4
            flex
            flex-wrap
            items-center
            gap-4
            text-xs
            ${textSecondary}
          `}
        >
          <span>
            Avg {stats.averageRain}%
          </span>

          <span>
            {stats.highRiskHours}{" "}
            {stats.highRiskHours === 1
              ? "hour"
              : "hours"}{" "}
            ≥ 50%
          </span>
        </div>
      </div>

      {/* CHART */}
      <div
        ref={chartRef}
        className="h-[220px] sm:h-[240px] w-full"
      >
        {chartWidth > 0 && (
          <BarChart
            width={chartWidth}
            height={240}
            data={data}
            margin={{
              top: 10,
              right: 5,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid
              stroke={gridColor}
              vertical={false}
            />

            <XAxis
              dataKey="time"
              interval="preserveStartEnd"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: axisColor,
                fontSize: 10,
              }}
            />

            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: axisColor,
                fontSize: 10,
              }}
              tickFormatter={(value) =>
                `${value}%`
              }
            />

            <Tooltip
              cursor={{
                fill: isNight
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(15,23,42,0.05)",
              }}
              contentStyle={{
                background: isNight
                  ? "#162238"
                  : "rgba(255,255,255,0.92)",
                color: isNight
                  ? "#F5F7FF"
                  : "#0F172A",
                border: isNight
                  ? "1px solid rgba(255,255,255,0.10)"
                  : "1px solid rgba(15,23,42,0.10)",
                borderRadius: "14px",
              }}
              formatter={(value) => [
                `${value}%`,
                "Chance of rain",
              ]}
            />

            <Bar
              dataKey="rain"
              fill={
                isNight
                  ? "rgba(96,165,250,0.65)"
                  : "rgba(37,99,235,0.60)"
              }
              radius={[8, 8, 2, 2]}
              barSize={20}
              isAnimationActive={false}
            />
          </BarChart>
        )}
      </div>
    </div >
  );
};

export default React.memo(RainProbabilityChart);