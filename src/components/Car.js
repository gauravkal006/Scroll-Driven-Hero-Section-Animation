// top view car, facing right

const BODY =
  "M18 100C18 62 22 44 34 36C52 24 80 18 112 17C150 16 190 28 232 30C270 32 300 20 336 21C372 22 400 30 414 46C426 60 432 80 432 100" +
  "C432 120 426 140 414 154C400 170 372 178 336 179C300 180 270 168 232 170C190 172 150 184 112 183C80 182 52 176 34 164C22 156 18 138 18 100Z";

const GLASS =
  "M150 60C190 50 282 48 320 58C338 64 346 82 346 100C346 118 338 136 320 142C282 152 190 150 150 140C137 130 132 115 132 100C132 85 137 70 150 60Z";

const ROOF =
  "M204 64C236 59 268 60 292 66C301 80 301 120 292 134C268 140 236 141 204 136C197 121 197 79 204 64Z";

export default function Car({ className = "" }) {
  return (
    <svg
      viewBox="0 0 440 200"
      className={className}
      role="img"
      aria-label="Sports car, top view"
    >
      <defs>
        <linearGradient id="car-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c43a0e" />
          <stop offset="0.22" stopColor="#ff5b23" />
          <stop offset="0.5" stopColor="#ff7a45" />
          <stop offset="0.78" stopColor="#ff5b23" />
          <stop offset="1" stopColor="#b8340b" />
        </linearGradient>
        <linearGradient id="car-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0d0f12" />
          <stop offset="0.7" stopColor="#1d232b" />
          <stop offset="1" stopColor="#323b46" />
        </linearGradient>
        <radialGradient id="car-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.6" stopColor="#000" stopOpacity="0.55" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="226" cy="104" rx="226" ry="98" fill="url(#car-shadow)" />

      {/* tyres peeking out from the arches */}
      <g fill="#0b0b0b">
        <rect x="76" y="9" width="66" height="18" rx="6" />
        <rect x="76" y="173" width="66" height="18" rx="6" />
        <rect x="318" y="13" width="58" height="16" rx="6" />
        <rect x="318" y="171" width="58" height="16" rx="6" />
      </g>

      {/* mirrors */}
      <g fill="#e2501c">
        <path d="M300 34c4-10 18-12 24-6l-6 10z" />
        <path d="M300 166c4 10 18 12 24 6l-6-10z" />
      </g>

      <path d={BODY} fill="url(#car-body)" />

      {/* shoulder highlight */}
      <path
        d="M60 30C110 20 180 30 232 36C280 40 320 28 380 32"
        stroke="#fff"
        strokeOpacity="0.28"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      <path d={GLASS} fill="url(#car-glass)" />
      <path d={ROOF} fill="url(#car-body)" />
      <path
        d="M212 70C238 66 264 67 284 72"
        stroke="#fff"
        strokeOpacity="0.35"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* windscreen reflection */}
      <path d="M312 66c14 6 22 18 24 30l-8-2c-2-10-8-20-16-28z" fill="#fff" opacity="0.14" />

      {/* engine cover louvres */}
      <g stroke="#7a1f05" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round">
        <path d="M66 72v56" />
        <path d="M80 68v64" />
        <path d="M94 66v68" />
        <path d="M108 66v68" />
      </g>

      {/* bonnet vents & centre crease */}
      <g fill="#7a1f05" fillOpacity="0.6">
        <rect x="368" y="70" width="30" height="7" rx="3.5" />
        <rect x="368" y="123" width="30" height="7" rx="3.5" />
      </g>
      <path d="M350 100h66" stroke="#fff" strokeOpacity="0.18" strokeWidth="2" />

      {/* headlights */}
      <g fill="#fff6dc">
        <path d="M404 44c10 6 18 16 22 28l-9-1c-4-10-8-18-13-27z" />
        <path d="M404 156c10-6 18-16 22-28l-9 1c-4 10-8 18-13 27z" />
      </g>

      {/* tail lights */}
      <g fill="#ff2d1a">
        <path d="M26 46c-3 8-5 18-5 26l7-1c0-8 2-16 4-22z" />
        <path d="M26 154c-3-8-5-18-5-26l7 1c0 8 2 16 4 22z" />
      </g>
    </svg>
  );
}
