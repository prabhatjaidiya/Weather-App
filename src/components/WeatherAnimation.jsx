import React from "react";

const WeatherAnimation = ({ icon }) => {
    const condition = icon?.slice(0, 2);

    return (
        <div className="relative w-full h-[220px] sm:h-[260px] overflow-hidden rounded-[24px] bg-gradient-to-b from-sky-900/40 to-indigo-950/50 border border-white/[0.08]">

            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.12),transparent_55%)]" />

            {/* CLEAR */}
            {condition === "01" && (
                <>
                    <div className="absolute top-10 right-[18%] h-24 w-24 rounded-full bg-yellow-300/90 shadow-[0_0_70px_rgba(255,210,80,0.7)] animate-[sunPulse_4s_ease-in-out_infinite]" />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,220,100,0.2),transparent_35%)]" />
                </>
            )}

            {/* CLOUDS */}
            {(condition === "02" ||
                condition === "03" ||
                condition === "04") && (
                    <>
                        <div className="absolute top-16 left-[12%] text-7xl opacity-80 animate-[cloudMove_12s_linear_infinite]">
                            ☁️
                        </div>

                        <div className="absolute top-24 right-[10%] text-6xl opacity-60 animate-[cloudMove_16s_linear_infinite_reverse]">
                            ☁️
                        </div>

                        <div className="absolute top-8 left-[48%] text-5xl opacity-40 animate-[cloudMove_20s_linear_infinite]">
                            ☁️
                        </div>
                    </>
                )}

            {/* RAIN */}
            {(condition === "09" || condition === "10") && (
                <>
                    <div className="absolute top-10 left-[15%] text-7xl opacity-90">
                        🌧️
                    </div>

                    <div className="absolute top-20 right-[15%] text-6xl opacity-70">
                        ☁️
                    </div>

                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(35)].map((_, i) => (
                            <span
                                key={i}
                                className="absolute top-[-20px] w-[2px] h-5 bg-blue-300/60 rounded-full animate-[rainFall_1s_linear_infinite]"
                                style={{
                                    left: `${(i * 29) % 100}%`,
                                    animationDelay: `${(i % 10) * 0.12}s`,
                                }}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* THUNDERSTORM */}
            {condition === "11" && (
                <>
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
                        {[...Array(30)].map((_, i) => (
                            <span
                                key={i}
                                className="absolute top-[-20px] rounded-full bg-white/80 animate-[snowFall_4s_linear_infinite]"
                                style={{
                                    width: `${4 + (i % 4)}px`,
                                    height: `${4 + (i % 4)}px`,
                                    left: `${(i * 31) % 100}%`,
                                    animationDelay: `${(i % 8) * 0.4}s`,
                                }}
                            />
                        ))}
                    </div>
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

export default WeatherAnimation;