import React, { useEffect, useState } from 'react'

const SunriseSunsetCard = ({weather}) => {
    const sunrise = {
                        h:new Date(weather.sys.sunrise*1000).getHours(),
                        m:new Date(weather.sys.sunrise*1000).getMinutes()
                    };
    const sunset = {
                        h:new Date(weather.sys.sunset*1000).getHours(),
                        m:new Date(weather.sys.sunset*1000).getMinutes()
                    };
    
    function toMin(h,m) { return h * 60 + m }
    function fmt(h,m){
        const ap = h >= 12 ? "PM" : "AM";
        return `${((h%12) || 12).toString().padStart(2,"0")}:${m.toString().padStart(2,"0")} ${ap}`;
    }

    const SR = toMin(sunrise.h,sunrise.m);
    const SS = toMin(sunset.h,sunset.m);
    const DAY_DUR = SS - SR;
    const NIGHT_DUR = 1440 - DAY_DUR;
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()),10000);
        return () => clearInterval(id);
    },[]);

    const cur = toMin(now.getHours(),now.getMinutes());
    const isDay = cur >= SR && cur < SS;

    let progress;
    if(isDay){
        progress = (cur - SR) / DAY_DUR;
    }else{
        const sinceSet = cur >= SS ? cur - SS : cur + (1440 - SS);
        progress = sinceSet / NIGHT_DUR;
    }
    progress = Math.max(0,Math.min(1,progress));

    const R = 100;
    const CX = 160;
    const CY = 150;
    const angle = progress * Math.PI;
    const sunX = CX - R * Math.cos(angle);
    const sunY = CY - R * Math.sin(angle);

    //colors
    const sunColor = isDay ? "#FFE87A" : "C8C8FF";
    const glowRgb = isDay ? "255,200,60" : "160,180,255";
    const skyTop = isDay ? `hsl(${205 + progress*15},70%,${18 + progress*18}%)` : "hsl(235,45%,7%)";
    const skyBot = isDay ? `hsl(28,${65 + progress*20}%,${52 + progress*12}%)` : "hsl(225,30%,13%)";
    const horizon0 = isDay ? 0.15 + progress * 0.35 : 0.04;

    const stars = [[50,28],[88,16],[132,22],[198,14],[242,38],[42,58],[112,46],[262,20],[278,52],[178,32]];
    const star0 = isDay ? 0 : Math.min(1,progress * 5);
    
    const nextLabel = isDay ? "Sunset" : "Sunrise";
    const nextTime = isDay ? fmt(sunset.h,sunset.m) : fmt(sunrise.h,sunrise.m);
    const nowStr = fmt(now.getHours(),now.getMinutes());

    const arcTicks = [
        { t: 0, label: isDay ? fmt(sunrise.h, sunrise.m) : fmt(sunset.h,sunset.m) },
        { t: 0.5, label: isDay ? "Noon" : "Midnight" },
        { t: 1, label: isDay ? fmt(sunset.h, sunset.m) : fmt(sunrise.h, sunrise.m) }
    ].map(({ t,label }) => {
        const a = t * Math.PI;
        return { x: CX - R * Math.cos(a), y: CY - R * Math.sin(a), label, t };
    })
    
    return (
        <div className='h-[340px] w-[450px] max-sm:h-[210px] max-sm:w-[270px] overflow-hidden rounded-2xl'
             style={{background: `linear-gradient(to bottom, ${skyTop}, ${skyBot})`}}   
        >
            <div 
                className='h-[270px] max-sm:h-[160px]'
                style={{background:`radial-gradient(ellipse 80% 100% at 50% 100%, rgba(255,150,50,${horizon0}),transparent)`}}
            >
                <svg viewBox='0 0 320 200' className='block'>
                    <defs>
                        <filter id='halo' x="-100%" y="-100%" width="300%" height="300%">
                            <faGaussianBlur stdDeviation="10" result="b" />
                            <feMerge><feMergeNode in='b' /><feMergeNode in='SourceGraphic' /></feMerge>
                        </filter>
                    </defs>

                    {star0 > 0.02 && stars.map(([sx, sy], i) => (
                        <circle key={i} cx={sx} cy={sy} r={1 + (i%3)*0.4}
                            fill='white' opacity={star0 * (0.4 + (i%3*0.2))} /> 
                    ))}

                    <path
                        d={`M ${CX-R} ${CY} A ${R} ${R} 0 0 1 ${CX+R} ${CY}`}
                        fill='none' stroke='rgba(255,255,255,0.13)'
                        strokeWidth={1.5} strokeDasharray="4.6"
                    />

                    <line x1={18} y1={CY} x2={302} y2={CY}
                        stroke='rgba(255,255,255,0.18' strokeWidth={1}
                    />

                    {arcTicks.map((tk, i) => (
                        <text key={i}
                        x={tk.x}
                        y={i === 1 ? tk.y - 13 : tk.y + 15}
                        textAnchor='middle'
                        fill='rgba(255,255,255,0.4)'
                        fontSize={8.5} fontFamily='Inter,sans-serif'>
                            {tk.label}
                        </text>
                    ))}

                    <circle cx={sunX} cy={sunY} r={18}
                        fill={`rgba(${glowRgb},0.22)`} filter='url(#halo)' />

                        {isDay ? (
                            <circle cx={sunX} cy={sunY} r={10}
                                fill={`rgba(${glowRgb})`} stroke='white' strokeWidth={2} />
                        ) : (
                            <g>
                                <circle cx={sunX+4.5} cy={sunY-2.5} r={10}
                                fill={sunColor} stroke='rgba(200,200,255,0.5)' strokeWidth={1.5} />
                                <circle cx={sunX+4.5} cy={sunY-2.5} r={7.5}
                                    fill={`hsl(230,35%,${9 + progress*6}%)`} />
                            </g>
                        )}
                </svg>

                <div className='px-[42px] max-sm:px-5 w-full flex justify-between items-end text-white opacity-65'>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='max-sm:text-xs'>
                            🌅 Sunrise
                        </div>
                        <div className='max-sm:text-sm'>
                            {fmt(sunrise.h, sunrise.m)}
                        </div>
                    </div>
                    
                    <div className='flex flex-col items-center justify-center'>
                        <div className='max-sm:text-xs'>Now</div>
                        <div className='max-sm:text-sm'>{nowStr}</div>
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                        <div className='max-sm:text-xs'>
                            🌇 Sunset
                        </div>
                        <div className='max-sm:text-sm'>
                            {fmt(sunset.h,sunset.m)}
                        </div>
                    </div>
                     
                </div>


            </div>
        </div>
    )
}

export default SunriseSunsetCard
