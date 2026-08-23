import React, { useEffect, useState } from "react";

const SunriseSunsetCard = ({ weather }) => {
  const getLocalDate = (timestamp) => {
    return new Date(
      (timestamp + weather.timezone) * 1000
    );
  };
  const getCurrentCityTime = () => {
    return new Date(
      Date.now() + weather.timezone * 1000
    );
  };

  const sunriseDate = getLocalDate(weather.sunrise);

  const sunrise = {
    h: sunriseDate.getUTCHours(),
    m: sunriseDate.getUTCMinutes(),
  };

  const sunsetDate = getLocalDate(weather.sunset);

  const sunset = {
    h: sunsetDate.getUTCHours(),
    m: sunsetDate.getUTCMinutes(),
  };

  function toMin(h, m) {
    return h * 60 + m;
  }

  function fmt(h, m) {
    const ap = h >= 12 ? "PM" : "AM";

    return `${((h % 12) || 12)
      .toString()
      .padStart(2, "0")}:${m
        .toString()
        .padStart(2, "0")} ${ap}`;
  }

  const SR = toMin(sunrise.h, sunrise.m);
  const SS = toMin(sunset.h, sunset.m);

  const DAY_DUR = SS - SR;
  const NIGHT_DUR = 1440 - DAY_DUR;

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, 10000);

    return () => clearInterval(id);
  }, []);

  const cityNow = getCurrentCityTime();

  const cur = toMin(
    cityNow.getUTCHours(),
    cityNow.getUTCMinutes()
  );

  const isDay = cur >= SR && cur < SS;

  let progress;

  if (isDay) {
    progress = (cur - SR) / DAY_DUR;
  } else {
    const sinceSet =
      cur >= SS
        ? cur - SS
        : cur + (1440 - SS);

    progress = sinceSet / NIGHT_DUR;
  }

  progress = Math.max(0, Math.min(1, progress));

  const R = 100;
  const CX = 160;
  const CY = 150;

  const angle = progress * Math.PI;

  const sunX = CX - R * Math.cos(angle);
  const sunY = CY - R * Math.sin(angle);

  const sunColor = isDay
    ? "#FFE87A"
    : "#C8C8FF";

  const glowRgb = isDay
    ? "255,200,60"
    : "160,180,255";

  const skyTop = isDay
    ? `hsl(${205 + progress * 15},70%,${18 + progress * 18}%)`
    : "hsl(235,45%,7%)";

  const skyBot = isDay
    ? `hsl(28,${65 + progress * 20}%,${52 + progress * 12}%)`
    : "hsl(225,30%,13%)";

  const horizon0 = isDay
    ? 0.15 + progress * 0.35
    : 0.04;

  const stars = [
    [50, 28],
    [88, 16],
    [132, 22],
    [198, 14],
    [242, 38],
    [42, 58],
    [112, 46],
    [262, 20],
    [278, 52],
    [178, 32],
  ];

  const star0 = isDay
    ? 0
    : Math.min(1, progress * 5);

  const nextLabel = isDay
    ? "Sunset"
    : "Sunrise";

  const nextTime = isDay
    ? fmt(sunset.h, sunset.m)
    : fmt(sunrise.h, sunrise.m);

  const nowStr = fmt(
    cityNow.getUTCHours(),
    cityNow.getUTCMinutes()
  );

  const arcTicks = [
    {
      t: 0,
      label: isDay
        ? fmt(sunrise.h, sunrise.m)
        : fmt(sunset.h, sunset.m),
    },
    {
      t: 0.5,
      label: isDay ? "Noon" : "Midnight",
    },
    {
      t: 1,
      label: isDay
        ? fmt(sunset.h, sunset.m)
        : fmt(sunrise.h, sunrise.m),
    },
  ].map(({ t, label }) => {
    const a = t * Math.PI;

    return {
      x: CX - R * Math.cos(a),
      y: CY - R * Math.sin(a),
      label,
      t,
    };
  });

  return (
    <div
      className="
        w-full
        overflow-hidden
        rounded-[24px]
        border border-white/[0.08]
        shadow-[0_15px_50px_rgba(0,0,0,0.2)]
        transition-all duration-300
        hover:border-white/[0.14]
      "
      style={{
        background: `linear-gradient(
          to bottom,
          ${skyTop},
          ${skyBot}
        )`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-white/40">
            Sun cycle
          </p>

          <h3 className="mt-1 text-base font-medium text-white/90">
            Sunrise & Sunset
          </h3>
        </div>

        <div className="
          px-3 py-1.5
          rounded-full
          bg-black/10
          border border-white/10
          text-xs
          text-white/60
        ">
          {isDay ? "☀️ Daytime" : "🌙 Night"}
        </div>
      </div>

      {/* Sun animation */}
      <div
        className="
          relative
          h-[220px]
          sm:h-[240px]
          mt-1
        "
        style={{
          background: `radial-gradient(
            ellipse 80% 100% at 50% 100%,
            rgba(255,150,50,${horizon0}),
            transparent
          )`,
        }}
      >
        <svg
          viewBox="0 0 320 200"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <filter
              id="halo"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur
                stdDeviation="10"
                result="b"
              />

              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Stars */}
          {star0 > 0.02 &&
            stars.map(([sx, sy], i) => (
              <circle
                key={i}
                cx={sx}
                cy={sy}
                r={1 + (i % 3) * 0.4}
                fill="white"
                opacity={
                  star0 * (0.4 + (i % 3) * 0.2)
                }
              />
            ))}

          {/* Arc */}
          <path
            d={`
              M ${CX - R} ${CY}
              A ${R} ${R} 0 0 1
              ${CX + R} ${CY}
            `}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={1.5}
            strokeDasharray="4.6"
          />

          {/* Horizon */}
          <line
            x1={18}
            y1={CY}
            x2={302}
            y2={CY}
            stroke="rgba(255,255,255,0.16)"
            strokeWidth={1}
          />

          {/* Labels */}
          {arcTicks.map((tk, i) => (
            <text
              key={i}
              x={tk.x}
              y={i === 1 ? tk.y - 13 : tk.y + 15}
              textAnchor="middle"
              fill="rgba(255,255,255,0.45)"
              fontSize={8.5}
              fontFamily="Inter,sans-serif"
            >
              {tk.label}
            </text>
          ))}

          {/* Glow */}
          <circle
            cx={sunX}
            cy={sunY}
            r={18}
            fill={`rgba(${glowRgb},0.22)`}
            filter="url(#halo)"
          />

          {/* Sun / Moon */}
          {isDay ? (
            <circle
              cx={sunX}
              cy={sunY}
              r={10}
              fill={`rgba(${glowRgb})`}
              stroke="white"
              strokeWidth={2}
            />
          ) : (
            <g>
              <circle
                cx={sunX + 4.5}
                cy={sunY - 2.5}
                r={10}
                fill={sunColor}
                stroke="rgba(200,200,255,0.5)"
                strokeWidth={1.5}
              />

              <circle
                cx={sunX + 4.5}
                cy={sunY - 2.5}
                r={7.5}
                fill={`hsl(
                  230,
                  35%,
                  ${9 + progress * 6}%
                )`}
              />
            </g>
          )}
        </svg>
      </div>

      {/* Time information */}
      <div className="
        grid
        grid-cols-3
        border-t border-white/[0.08]
        bg-black/[0.10]
      ">
        <div className="
          p-4
          text-center
          border-r border-white/[0.08]
        ">
          <p className="text-[11px] uppercase tracking-wider text-white/35">
            Sunrise
          </p>

          <p className="mt-1 text-sm font-medium text-white/80">
            🌅 {fmt(sunrise.h, sunrise.m)}
          </p>
        </div>

        <div className="
          p-4
          text-center
          border-r border-white/[0.08]
        ">
          <p className="text-[11px] uppercase tracking-wider text-white/35">
            Now
          </p>

          <p className="mt-1 text-sm font-medium text-white/80">
            {nowStr}
          </p>
        </div>

        <div className="p-4 text-center">
          <p className="text-[11px] uppercase tracking-wider text-white/35">
            Sunset
          </p>

          <p className="mt-1 text-sm font-medium text-white/80">
            🌇 {fmt(sunset.h, sunset.m)}
          </p>
        </div>
      </div>

      {/* Next event */}
      <div className="
        flex items-center justify-between
        px-5 py-3
        border-t border-white/[0.06]
        bg-black/[0.08]
      ">
        <span className="text-xs text-white/35">
          Next event
        </span>

        <span className="text-xs font-medium text-white/70">
          {nextLabel} · {nextTime}
        </span>
      </div>
    </div>
  );
};

export default React.memo(SunriseSunsetCard);