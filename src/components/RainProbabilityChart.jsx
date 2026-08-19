import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const RainProbabilityChart = ({ hourly }) => {
  if (!hourly?.length) return null;

  const data = hourly.map((item, index) => ({
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

    rain: item.rainProbability ?? 0,
  }));

  const rainValues = data.map((item) => item.rain);

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

  return (
    <div
      className="
        w-full
        rounded-[28px]
        p-5 sm:p-6
        bg-white/[0.07]
        backdrop-blur-2xl
        border border-white/[0.10]
        shadow-[0_20px_80px_rgba(0,0,0,0.20)]
      "
    >
      <div className="mb-5">

        <div className="flex items-end justify-between gap-4">

          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              Precipitation
            </p>

            <h2 className="text-xl font-semibold mt-1">
              Rain Probability
            </h2>
          </div>

          <div className="text-right">
            <p className="text-2xl font-semibold">
              {maxRain}%
            </p>

            <p className="text-[11px] text-white/35">
              highest chance
            </p>
          </div>

        </div>

        <div className="
    mt-4
    flex
    items-center
    gap-4
    text-xs
    text-white/45
    flex-wrap
  ">
          <span>
            Avg {averageRain}%
          </span>

          <span>
            {highRiskHours}{" "}
            {highRiskHours === 1 ? "hour" : "hours"} ≥ 50%
          </span>
        </div>

      </div>

      <div className="h-[220px] sm:h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 5,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid
              stroke="rgba(255,255,255,0.06)"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              interval="preserveStartEnd"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgba(255,255,255,0.42)",
                fontSize: 10,
              }}
            />

            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgba(255,255,255,0.42)",
                fontSize: 10,
              }}
              tickFormatter={(value) => `${value}%`}
            />

            <Tooltip
              cursor={{
                fill: "rgba(255,255,255,0.04)",
              }}
              contentStyle={{
                background: "#162238",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "14px",
              }}
              formatter={(value) => [
                `${value}%`,
                "Chance of rain",
              ]}
            />

            <Bar
              dataKey="rain"
              fill="rgba(96,165,250,0.65)"
              radius={[8, 8, 2, 2]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RainProbabilityChart;