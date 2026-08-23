import React, { useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, } from "recharts";
import { formatTemperature } from "../utils/unitUtils";
import useElementWidth from "../hooks/useElementWidth";

const TemperatureChart = ({ hourly, unit, dayNight }) => {
  const isNight = dayNight === "night";
  const [chartRef, chartWidth] = useElementWidth();

  const data = useMemo(() => {
    if (!hourly?.length) return [];

    return hourly.map((item, index) => ({
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

      temperature: item.temperature,
      feelsLike: item.feelsLike,
    }));
  }, [hourly]);

  const stats = useMemo(() => {
    const temperatures = data
      .map((item) => item.temperature)
      .filter(Number.isFinite);

    const feelsLikeValues = data
      .map((item) => item.feelsLike)
      .filter(Number.isFinite);

    if (!temperatures.length) return null;

    const high = Math.max(...temperatures);
    const low = Math.min(...temperatures);

    const average = Math.round(
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

    return { high, low, average, averageFeelsLike, };
  }, [data]);

  if (!stats) return null;

  const tempUnit = unit === "imperial" ? "F" : "C";

  const primaryText = isNight
    ? "text-white"
    : "text-slate-900";

  const secondaryText = isNight
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
      className="w-full rounded-[28px] p-5 sm:p-6 bg-white/[0.045] border border-white/[0.07] transition-all duration-300 shadow-[0_20px_80px_rgba(0,0,0,0.25)]"
    >
      {/* HEADER */}
      <div className="mb-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p
              className={`text-[10px] uppercase tracking-[0.18em] ${secondaryText}`}
            >
              Weather Trends
            </p>

            <h2
              className={`text-xl font-semibold mt-1 ${primaryText}`}
            >
              Temperature
            </h2>
          </div>

          <div className="text-right">
            <p
              className={`text-2xl font-semibold ${primaryText}`}
            >
              {formatTemperature(
                stats.average,
                unit
              )}
              °{tempUnit}
            </p>

            <p
              className={`
                text-[11px]
                ${secondaryText}
              `}
            >
              average
            </p>
          </div>
        </div>

        {/* STATS */}
        <div
          className={`mt-4 flex flex-wrap items-center gap-4 text-xs ${secondaryText}`}
        >
          <span>
            ↑ {formatTemperature(stats.high, unit)}°
          </span>

          <span>
            ↓ {formatTemperature(stats.low, unit)}°
          </span>

          {stats.averageFeelsLike !== null && (
            <span>
              Feels like{" "}
              {formatTemperature(
                stats.averageFeelsLike,
                unit
              )}
              °
            </span>
          )}
        </div>
      </div>

      {/* CHART */}
      <div
        ref={chartRef}
        className="h-[240px] w-full"
      >
        {chartWidth > 0 && (
          <LineChart
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
              domain={["dataMin - 2", "dataMax + 2"]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: axisColor,
                fontSize: 10,
              }}
              tickFormatter={(value) =>
                `${formatTemperature(value, unit)}°`
              }
            />

            <Tooltip
              cursor={{
                stroke: isNight
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(15,23,42,0.15)",
              }}
              contentStyle={{
                background: isNight
                  ? "#162238"
                  : "rgba(255,255,255,0.94)",

                color: isNight
                  ? "#F5F7FF"
                  : "#0F172A",

                border: isNight
                  ? "1px solid rgba(255,255,255,0.10)"
                  : "1px solid rgba(15,23,42,0.10)",

                borderRadius: "14px",
              }}
              formatter={(value, name) => [
                `${formatTemperature(
                  value,
                  unit
                )}°${tempUnit}`,

                name === "feelsLike"
                  ? "Feels Like"
                  : "Temperature",
              ]}
            />

            <Line
              type="monotone"
              dataKey="temperature"
              connectNulls
              stroke={
                isNight
                  ? "#F5F7FF"
                  : "#0F172A"
              }
              strokeWidth={3}
              dot={{
                r: 3.5,
                fill: isNight
                  ? "#F5F7FF"
                  : "#0F172A",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 6,
              }}
            />

            <Line
              type="monotone"
              dataKey="feelsLike"
              stroke={
                isNight
                  ? "rgba(255,255,255,0.35)"
                  : "rgba(15,23,42,0.35)"
              }
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{
                r: 4,
              }}
            />
          </LineChart>
        )}
      </div>
    </div>
  );
};

export default React.memo(TemperatureChart);