import React from "react";

const WeatherAlerts = ({ alerts }) => {
    if (!alerts?.length) return null;

    return (
        <section
            className="w-full rounded-[28px] p-5 sm:p-6 bg-white/[0.07] backdrop-blur-2xl border border-white/[0.10] shadow-[0_20px_80px_rgba(0,0,0,0.20)]"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
                <div
                    className="h-11 w-11 rounded-xl bg-red-400/[0.08] border border-red-300/[0.10] flex items-center justify-center text-xl"
                >
                    ⚠️
                </div>

                <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                        Important conditions
                    </p>

                    <h2 className="text-xl font-semibold">
                        Weather Alerts
                    </h2>
                </div>
            </div>

            {/* Alerts */}
            <div className="grid gap-3">
                {alerts.map((alert, index) => (
                    <div
                        key={`${alert.title}-${index}`}
                        className={`flex gap-3 p-4 rounded-2xl border transition-all duration-300
                            ${alert.type === "danger"
                                ? "bg-red-400/[0.07] border-red-300/[0.14] hover:bg-red-400/[0.11]"
                                : "bg-amber-400/[0.06] border-amber-300/[0.12] hover:bg-amber-400/[0.10]"
                            }
                        `}
                    >
                        {/* Icon */}
                        <div
                            className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center text-xl
                                ${alert.type === "danger"
                                    ? "bg-red-400/[0.10]"
                                    : "bg-amber-400/[0.10]"
                                }
                            `}
                        >
                            {alert.icon}
                        </div>

                        {/* Content */}
                        <div className="min-w-0">
                            <h3 className="font-semibold text-sm sm:text-base">
                                {alert.title}
                            </h3>

                            <p className="mt-1 text-xs sm:text-sm text-white/50 leading-relaxed">
                                {alert.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WeatherAlerts;