import React from "react";

const RAIN_DROPS = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: `${(i * 29) % 100}%`,
    delay: `${(i % 10) * 0.12}s`,
}));

const SNOW_FLAKES = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: 4 + (i % 4),
    left: `${(i * 31) % 100}%`,
    delay: `${(i % 8) * 0.4}s`,
}));

const WeatherAnimation = ({ icon, dayNight }) => {
    const condition = icon?.slice(0, 2);
    const isNight = dayNight === "night";

    return (
        <div
            className={`relative w-full h-[220px] sm:h-[260px] overflow-hidden rounded-[24px] border border-white/[0.08] transition-all duration-1000
                ${isNight
                    ? "bg-gradient-to-b from-[#020617]/80 via-[#0b1430]/80 to-[#111936]/90"
                    : "bg-gradient-to-b from-sky-400/25 via-sky-800/35 to-indigo-950/50"
                }
            `}
        >

            {/* Background glow */}
            <div
                className={`absolute inset-0 transition-all duration-1000
                    ${isNight
                        ? "bg-[radial-gradient(circle_at_70%_25%,rgba(129,140,248,0.12),transparent_45%)]"
                        : "bg-[radial-gradient(circle_at_70%_25%,rgba(255,220,100,0.16),transparent_45%)]"
                    }
                `}
            />

            {/* CLEAR */}
            {condition === "01" && (
                <>
                    {isNight ? (
                        <>
                            {/* Moon glow */}
                            <div
                                className="absolute top-8 right-[17%] h-32 w-32 rounded-full bg-indigo-300/10 blur-3xl"
                            />

                            {/* Moon */}
                            <div
                                className="absolute top-10 right-[18%] h-24 w-24 rounded-full bg-slate-100 shadow-[0_0_50px_rgba(191,219,254,0.45)]"
                            >
                                {/* Moon craters */}
                                <span className="absolute top-5 left-6 h-3 w-3 rounded-full bg-slate-300/50" />
                                <span className="absolute top-14 left-14 h-4 w-4 rounded-full bg-slate-300/40" />
                                <span className="absolute top-9 right-5 h-2.5 w-2.5 rounded-full bg-slate-300/40" />
                            </div>

                            {/* Small stars */}
                            <span className="absolute top-8 left-[20%] text-white/80 text-xs">
                                ✦
                            </span>

                            <span className="absolute top-20 left-[35%] text-blue-100/70 text-sm">
                                ✦
                            </span>

                            <span className="absolute top-12 right-[38%] text-white/60 text-xs">
                                ·
                            </span>

                            <span className="absolute bottom-20 right-[22%] text-white/70 text-xs">
                                ✦
                            </span>
                        </>
                    ) : (
                        <>
                            {/* Sun */}
                            <div
                                className="absolute top-10 right-[18%] h-24 w-24 rounded-full bg-yellow-300/90 shadow-[0_0_70px_rgba(255,210,80,0.7)] animate-[sunPulse_4s_ease-in-out_infinite]"
                            />

                            {/* Sun glow */}
                            <div
                                className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,220,100,0.2),transparent_35%)]"
                            />
                        </>
                    )}
                </>
            )}

            {/* CLOUDS */}
            {(condition === "02" ||
                condition === "03" ||
                condition === "04") && (
                    <>
                        <div
                            className={`absolute top-16 left-[12%] text-7xl animate-[cloudMove_12s_linear_infinite]${isNight ? "opacity-45 grayscale" : "opacity-80"}`}
                        >
                            ☁️
                        </div>

                        <div
                            className={`absolute top-24 right-[10%] text-6xl animate-[cloudMove_16s_linear_infinite_reverse] ${isNight ? "opacity-35 grayscale" : "opacity-60"}`}
                        >
                            ☁️
                        </div>

                        <div
                            className={`absolute top-8 left-[48%] text-5xl animate-[cloudMove_20s_linear_infinite] ${isNight ? "opacity-25 grayscale" : "opacity-40"}`}
                        >
                            ☁️
                        </div>
                    </>
                )}

            {/* RAIN */}
            {(condition === "09" || condition === "10") && (
                <>
                    <div
                        className={`absolute top-10 left-[15%] text-7xl ${isNight ? "opacity-65 grayscale-[20%]" : "opacity-90"}`}
                    >
                        🌧️
                    </div>

                    <div className="absolute top-20 right-[15%] text-6xl opacity-70">
                        ☁️
                    </div>

                    <div className="absolute inset-0 overflow-hidden">
                        {RAIN_DROPS.map((drop) => (
                            <span
                                key={drop.id}
                                className="absolute top-[-20px] w-[2px] h-5 bg-blue-300/60 rounded-full animate-[rainFall_1s_linear_infinite]"
                                style={{
                                    left: drop.left,
                                    animationDelay: drop.delay,
                                }}
                            />
                        ))}
                    </div>

                    {isNight && (
                        <div
                            className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(96,165,250,0.10),transparent_45%)]"
                        />
                    )}
                </>
            )}

            {/* THUNDERSTORM */}
            {condition === "11" && (
                <>
                    {isNight && (
                        <div
                            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(99,102,241,0.15),transparent_55%)]"
                        />
                    )}

                    <div className="absolute top-12 left-[30%] text-8xl animate-[cloudShake_4s_ease-in-out_infinite]">
                        ⛈️
                    </div>

                    <div className="absolute inset-0 bg-yellow-300/0 animate-[lightning_5s_infinite]" />
                </>
            )}

            {/* SNOW */}
            {(condition === "13") && (
                <>
                    <div className="absolute top-10 left-[30%] text-7xl opacity-80">
                        ☁️
                    </div>

                    <div className="absolute inset-0 overflow-hidden">
                        {SNOW_FLAKES.map((flake) => (
                            <span
                                key={flake.id}
                                className="absolute top-[-20px] rounded-full bg-white/80 animate-[snowFall_4s_linear_infinite]"
                                style={{
                                    width: `${flake.size}px`,
                                    height: `${flake.size}px`,
                                    left: flake.left,
                                    animationDelay: flake.delay,
                                }}
                            />
                        ))}
                    </div>

                    {isNight && (
                        <div
                            className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(96,165,250,0.10),transparent_45%)]"
                        />
                    )}
                </>
            )}

            {/* MIST */}
            {(condition === "50" ||
                condition === "51" ||
                condition === "52" ||
                condition === "53" ||
                condition === "54" ||
                condition === "55" ||
                condition === "56" ||
                condition === "57" ||
                condition === "80") && (
                    <>
                        <div className="absolute inset-x-[-20%] top-24 h-8 rounded-full bg-white/10 blur-xl animate-[fogMove_8s_ease-in-out_infinite]" />

                        <div className="absolute inset-x-[-30%] top-36 h-10 rounded-full bg-white/10 blur-xl animate-[fogMove_11s_ease-in-out_infinite_reverse]" />

                        <div className="absolute inset-x-[-20%] top-48 h-8 rounded-full bg-white/10 blur-xl animate-[fogMove_14s_ease-in-out_infinite]" />
                    </>
                )}

            {/* Ground glow */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent" />

        </div>
    );
};

export default React.memo(WeatherAnimation);