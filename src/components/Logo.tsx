export default function Logo({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle with dots */}
      <circle cx="100" cy="100" r="85" stroke="#DC2626" strokeWidth="3" fill="none" />
      <circle cx="100" cy="100" r="92" stroke="#DC2626" strokeWidth="1" strokeDasharray="3 6" fill="none" />

      {/* Inner swirl circle */}
      <circle cx="100" cy="100" r="70" stroke="#DC2626" strokeWidth="2.5" fill="none" />

      {/* Globe fill */}
      <circle cx="100" cy="100" r="60" fill="#DC2626" />

      {/* Globe meridian lines (white) */}
      <ellipse cx="100" cy="100" rx="25" ry="60" stroke="white" strokeWidth="1.5" fill="none" />
      <ellipse cx="100" cy="100" rx="45" ry="60" stroke="white" strokeWidth="1" fill="none" />

      {/* Globe latitude lines */}
      <line x1="40" y1="80" x2="160" y2="80" stroke="white" strokeWidth="1" />
      <line x1="40" y1="100" x2="160" y2="100" stroke="white" strokeWidth="1.5" />
      <line x1="40" y1="120" x2="160" y2="120" stroke="white" strokeWidth="1" />

      {/* Continent shapes (simplified white landmasses) */}
      {/* Africa */}
      <path
        d="M105 70 L115 75 L118 90 L115 110 L108 120 L100 118 L95 105 L98 85 Z"
        fill="white"
        opacity="0.3"
      />
      {/* Europe */}
      <path
        d="M95 60 L108 58 L112 68 L105 72 L95 70 Z"
        fill="white"
        opacity="0.3"
      />
      {/* Americas */}
      <path
        d="M75 65 L82 60 L85 70 L80 85 L75 95 L70 90 Z"
        fill="white"
        opacity="0.3"
      />

      {/* Airplane */}
      <g transform="translate(130, 25) rotate(30)">
        <path
          d="M0 15 L8 10 L25 0 L28 3 L15 12 L30 18 L30 22 L13 17 L8 28 L5 28 L7 16 L0 18 Z"
          fill="#DC2626"
        />
      </g>

      {/* Flight trail arc */}
      <path
        d="M155 45 Q170 30 160 15"
        stroke="#DC2626"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M148 52 Q175 25 155 5"
        stroke="#DC2626"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />

      {/* Canadian flag (bottom left) */}
      <g transform="translate(15, 160)">
        <rect width="30" height="20" fill="white" stroke="#ccc" strokeWidth="0.5" rx="1" />
        <rect x="0" y="0" width="8" height="20" fill="#DC2626" rx="1" />
        <rect x="22" y="0" width="8" height="20" fill="#DC2626" rx="1" />
        {/* Maple leaf simplified */}
        <path
          d="M15 4 L16 8 L19 7 L17 10 L20 12 L16 12 L15 16 L14 12 L10 12 L13 10 L11 7 L14 8 Z"
          fill="#DC2626"
        />
      </g>

      {/* EU flag (bottom right) */}
      <g transform="translate(155, 160)">
        <rect width="30" height="20" fill="#003399" stroke="#ccc" strokeWidth="0.5" rx="1" />
        {/* Stars in circle */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
          const cx = 15 + 6 * Math.cos((angle * Math.PI) / 180);
          const cy = 10 + 6 * Math.sin((angle * Math.PI) / 180);
          return (
            <circle key={angle} cx={cx} cy={cy} r="1.2" fill="#FFCC00" />
          );
        })}
      </g>
    </svg>
  );
}
