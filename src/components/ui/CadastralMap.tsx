import React from 'react';

const CadastralMap: React.FC = () => {
  // We extract the exact path string from your highway to use for the animation guide
  const highwayPathD = "M380,860 C420,760 380,680 460,580 C520,500 480,420 540,340 C590,270 700,230 760,170";

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 900 900"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f3e6c0" stopOpacity="1" />
            <stop offset="100%" stopColor="#c8a951" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c8a951" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c8a951" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* ── Irregular cadastral parcel grid ── */}
        <g stroke="#c8a951" strokeOpacity="0.16" strokeWidth="1" fill="none">
          <path d="M40,120 L180,90 L260,150 L230,260 L120,300 L20,230 Z" />
          <path d="M180,90 L320,60 L380,140 L260,150 Z" />
          <path d="M260,150 L380,140 L420,250 L230,260 Z" />
          <path d="M420,250 L520,210 L560,310 L460,360 L380,330 Z" />
          <path d="M230,260 L420,250 L460,360 L380,420 L290,400 L180,360 Z" />
          <path d="M120,300 L230,260 L180,360 L80,400 Z" />
          <path d="M380,420 L460,360 L560,310 L620,400 L540,480 L450,470 Z" />
          <path d="M290,400 L380,420 L450,470 L390,540 L260,500 Z" />
          <path d="M80,400 L180,360 L290,400 L260,500 L150,520 L60,470 Z" />
          <path d="M540,480 L620,400 L700,440 L680,540 L580,560 Z" />
          <path d="M450,470 L540,480 L580,560 L480,610 L390,540 Z" />
          <path d="M260,500 L390,540 L480,610 L400,680 L290,650 L200,600 Z" />
          <path d="M150,520 L260,500 L200,600 L100,610 L40,560 Z" />
          <path d="M580,560 L680,540 L740,610 L660,680 L580,650 Z" />
          <path d="M480,610 L580,650 L580,650 L500,720 L400,680 Z" />
          <path d="M290,650 L400,680 L380,760 L260,740 Z" />
          <path d="M200,600 L290,650 L260,740 L150,720 L100,610 Z" />
          <path d="M500,720 L580,650 L660,680 L640,760 L540,790 Z" />
          <path d="M380,760 L500,720 L540,790 L440,830 L340,810 Z" />
          <path d="M260,740 L380,760 L340,810 L230,800 Z" />
          <path d="M520,210 L620,180 L660,260 L560,310 Z" />
          <path d="M620,180 L720,160 L760,240 L660,260 Z" />
          <path d="M560,310 L660,260 L700,350 L620,400 Z" />
          <path d="M660,260 L760,240 L800,320 L700,350 Z" />
        </g>

        {/* ── Parcel labels ── */}
        <g fill="#c8a951" fillOpacity="0.32" fontSize="10" fontFamily="DM Sans, sans-serif" textAnchor="middle">
          <text x="130" y="180">38/1</text>
          <text x="300" y="120">29/2</text>
          <text x="340" y="200">28/2</text>
          <text x="330" y="300">29/2</text>
          <text x="490" y="280">28/2</text>
          <text x="200" y="340">27/3</text>
          <text x="150" y="420">29/2</text>
          <text x="320" y="380">39/2</text>
          <text x="490" y="400">38/2</text>
          <text x="600" y="340">35/2</text>
          <text x="680" y="290">33/2</text>
          <text x="730" y="200">35/2</text>
          <text x="240" y="480">23/1</text>
          <text x="420" y="500">33/2</text>
          <text x="560" y="520">38/2</text>
          <text x="620" y="460">33/2</text>
          <text x="150" y="560">39/2</text>
          <text x="330" y="580">39/2</text>
          <text x="470" y="600">33/2</text>
          <text x="610" y="600">33/2</text>
          <text x="220" y="660">35/2</text>
          <text x="350" y="680">39/1</text>
          <text x="500" y="700">43/1</text>
          <text x="170" y="700">37/1</text>
          <text x="300" y="760">37/1</text>
          <text x="440" y="770">34/2</text>
        </g>

        {/* ── Main highway / development corridor ── */}
        <path
          d={highwayPathD}
          fill="none"
          stroke="url(#roadGradient)"
          strokeWidth="2.5"
          strokeDasharray="3,5"
          className="animate-dashMove"
        />

        {/* Secondary road */}
        <path
          d="M540,340 C600,300 650,280 700,250"
          fill="none"
          stroke="#c8a951"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeDasharray="2,4"
        />

        {/* ── Glowing intersection nodes ── */}
        {[
          { cx: 760, cy: 170, r: 14 },
          { cx: 540, cy: 340, r: 8 },
          { cx: 660, cy: 500, r: 8 },
          { cx: 280, cy: 570, r: 8 },
          { cx: 540, cy: 675, r: 8 },
        ].map((n, i) => (
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r={n.r * 2.2} fill="url(#nodeGlow)" opacity="0.6" />
            <circle cx={n.cx} cy={n.cy} r={n.r * 0.35} fill="#f3e6c0" />
          </g>
        ))}

        {/* ── Airport runway cluster ── */}
        <g transform="translate(505,280) rotate(-44)">
          <rect x="0" y="40" width="160" height="14" fill="#c8a951" fillOpacity="0.18" transform="rotate(8 80 47)" />
          <rect x="0" y="90" width="160" height="14" fill="#c8a951" fillOpacity="0.14" transform="rotate(8 90 95)" />
        </g>

        {/* ── ✅ ANIMATED HIGHWAY AIRPLANE NODE WITH SMOOTH LOOP FADE ── */}
        <g>
          <text
            fill="#f3e6c0"
            fontSize="50"
            fontFamily="DM Sans, sans-serif"
            textAnchor="middle"
            dominantBaseline="central"
            style={{ filter: "drop-shadow(0px 0px 4px #c8a951)" }}
          >
            ✈

            {/* 1. The animation path engine */}
            <animateMotion
              dur="15s"
              repeatCount="indefinite"
              path={highwayPathD}
              rotate="auto"
            />

            {/* 2. Synced Opacity Timeline: Fades out at the end, resets at 0%, fades in */}
            <animate
              attributeName="opacity"
              dur="15s"
              repeatCount="indefinite"
              values="0; 0.85; 0.85; 0"
              keyTimes="0; 0.05; 0.95; 1"
            />
          </text>
        </g>

        {/* ── Faint vertical grid lines ── */}
        <g stroke="#c8a951" strokeOpacity="0.04" strokeWidth="1">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1={i * 80} y1="0" x2={i * 80} y2="900" />
          ))}
        </g>
      </svg>

      {/* ── Text labels overlay ── */}
      <div className="absolute" style={{ top: "29%", left: "32%" }}>
        <p className="text-2xs tracking-[0.15em] uppercase text-cream/70 font-semibold leading-tight whitespace-nowrap">
          Navi Mumbai<br />International Airport
        </p>
      </div>
      <div className="absolute" style={{ top: "50%", left: "75%" }}>
        <p className="text-2xs tracking-[0.15em] uppercase text-cream/70 font-semibold leading-tight whitespace-nowrap">
          Property Law<br />Expertise
        </p>
      </div>
      <div className="absolute" style={{ top: "57%", left: "16%" }}>
        <p className="text-2xs tracking-[0.15em] uppercase text-cream/70 font-semibold leading-tight whitespace-nowrap">
          Infrastructure<br />Growth Corridor
        </p>
      </div>
      <div className="absolute" style={{ top: "77%", left: "63%" }}>
        <p className="text-2xs tracking-[0.15em] uppercase text-cream/70 font-semibold leading-tight whitespace-nowrap">
          Land Acquisition<br />& Development
        </p>
      </div>
    </div>
  );
};

export default CadastralMap;