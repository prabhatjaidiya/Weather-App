import React from "react";

const Data = ({ icon, data, text }) => {
  return (
    <div
      className="
        group
        min-w-0
        rounded-2xl
        p-3.5
        sm:p-4
        bg-white/[0.035]
        border border-white/[0.06]
        hover:bg-white/[0.06]
        hover:border-white/[0.10]
        transition-all
        duration-300
      "
    >

      <div className="
        flex
        items-center
        gap-2
        text-white/35
        group-hover:text-white/55
        transition-colors
      ">
        {icon}

        <span className="
          text-[10px]
          sm:text-xs
          text-white/35
          truncate
        ">
          {text}
        </span>
      </div>

      <p className="
        mt-2
        text-sm
        sm:text-lg
        font-medium
        text-white/85
        truncate
      ">
        {data}
      </p>

    </div>
  );
};

export default Data;