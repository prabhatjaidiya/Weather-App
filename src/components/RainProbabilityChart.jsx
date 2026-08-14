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

  const data = hourly.map((item) => ({
    time: new Date(item.timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    }),
    rain: item.rainProbability ?? 0,
  }));

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
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
          Precipitation
        </p>

        <h2 className="text-xl font-semibold mt-1">
          Rain Probability
        </h2>
      </div>

      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 5,
              left: -15,
              bottom: 5,
            }}
          >
            <CartesianGrid
              stroke="rgba(255,255,255,0.06)"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgba(255,255,255,0.42)",
                fontSize: 10,
              }}
            />

            <YAxis
              domain={[0, 100]}
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
                "Rain probability",
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