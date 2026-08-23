import React from "react";

const Data = ({ icon, data, text, dayNight }) => {
  return (
    <div
      className="group min-w-0 rounded-2xl p-3.5 sm:p-4 bg-white/[0.035] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.10] transition-all duration-300"
    >

      <div className={`flex items-center gap-2 ` + (dayNight === "night" ? "text-white/35 group-hover:text-white/55" : "text-slate-900/35 group-hover:text-slate-900/55") + ` transition-colors`}>
        {icon}

        <span className={`
          text-[10px]
          sm:text-xs
          ` + (dayNight === "night" ? "text-white/35 group-hover:text-white/55" : "text-slate-900/35 group-hover:text-slate-900/55") + ` truncate
        `}>
          {text}
        </span>
      </div>

      <p className={`
        mt-2
        text-sm
        sm:text-lg
        font-medium
        ` + (dayNight === "night" ? "text-white/85" : "text-slate-900/85") + `truncate`}>
        {data}
      </p>

    </div>
  );
};

export default React.memo(Data);