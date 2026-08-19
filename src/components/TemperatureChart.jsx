import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const TemperatureChart = ({ hourly, unit }) => {
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

    temperature: Math.round(item.temperature),
    feelsLike: Math.round(item.feelsLike),
  }));

  const temperatures = data.map(
    (item) => item.temperature
  );

  const feelsLikeValues = data
    .map((item) => item.feelsLike)
    .filter(Number.isFinite);

  const high = Math.max(...temperatures);
  const low = Math.min(...temperatures);

  const average =
    Math.round(
      temperatures.reduce(
        (sum, value) => sum + value,
        0
      ) / temperatures.length
    );

  const averageFeelsLike = feelsLikeValues.length
    ? Math.round(
      feelsLikeValues.reduce(
        (sum, value) => sum + value,
        0
      ) / feelsLikeValues.length
    )
    : null;

  const tempUnit = unit === "imperial" ? "F" : "C";

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
              Weather Trends
            </p>

            <h2 className="text-xl font-semibold mt-1">
              Temperature
            </h2>
          </div>

          <div className="text-right">
            <p className="text-2xl font-semibold">
              {average}°{tempUnit}
            </p>

            <p className="text-[11px] text-white/35">
              average
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
  ">
          <span>
            ↑ {high}°
          </span>

          <span>
            ↓ {low}°
          </span>

          {averageFeelsLike !== null && (
            <span>
              Feels like {averageFeelsLike}°
            </span>
          )}
        </div>

      </div>

      <div className="h-[220px] sm:h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
              domain={["dataMin - 2", "dataMax + 2"]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgba(255,255,255,0.42)",
                fontSize: 10,
              }}
              tickFormatter={(value) => `${value}°`}
            />

            <Tooltip
              cursor={{
                stroke: "rgba(255,255,255,0.15)",
              }}
              contentStyle={{
                background: "#162238",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "14px",
              }}
              formatter={(value, name) => [
                `${value}°${tempUnit}`,
                name === "feelsLike"
                  ? "Feels Like"
                  : "Temperature",
              ]}
            />

            <Line
              type="monotone"
              dataKey="temperature"
              connectNulls
              stroke="#F5F7FF"
              strokeWidth={3}
              dot={{
                r: 3.5,
                fill: "#F5F7FF",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 6,
              }}
            />
            <Line
              type="monotone"
              dataKey="feelsLike"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{
                r: 4,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TemperatureChart;