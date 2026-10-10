const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const paths = {
  track: (
    <>
      <path d="M6 20c-2.5 0-3-3-1-4l12-6c2.5-1.2 2-5-1-5H9" />
      <path d="M9 2.5 6.5 5 9 7.5" />
      <circle cx="19" cy="19" r="2" />
    </>
  ),
  car: (
    <>
      <path d="M3 16v-3l2.2-4.4A2 2 0 0 1 7 7.5h8.6a2 2 0 0 1 1.6.8L20 12h.5A1.5 1.5 0 0 1 22 13.5V16" />
      <path d="M2 16h20" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </>
  ),
  drone: (
    <>
      <rect x="9" y="10" width="6" height="4" rx="1" />
      <path d="M9 11 5.5 7.5M15 11l3.5-3.5M9 13l-3.5 3.5M15 13l3.5 3.5" />
      <path d="M2.5 6.5h6M15.5 6.5h6M2.5 17.5h6M15.5 17.5h6" />
    </>
  ),
  tug: (
    <>
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <path d="M5 8v5l-2 7M5 13l3 7M19 8v5l2 7M19 13l-3 7" />
      <path d="M5 10h14" strokeDasharray="2 2" />
    </>
  ),
  war: (
    <>
      <path d="M4 15h11l3-4h2v6H4z" />
      <path d="M15 11V8h-5l-3 3" />
      <circle cx="7" cy="18.5" r="1.5" />
      <circle cx="13" cy="18.5" r="1.5" />
      <path d="M21 9.5 23 8M21 13h2M21 16.5l2 1.5" />
    </>
  ),
  soccer: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m12 7.5 4 2.9-1.5 4.7h-5L8 10.4z" />
      <path d="M12 3v4.5M16 10.4l4.3-1.4M14.5 15.1l2.6 3.7M9.5 15.1l-2.6 3.7M8 10.4 3.7 9" />
    </>
  ),
  idea: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" />
    </>
  ),
  exhibit: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
      <path d="m8 12 3-3 2 2 3-3" />
    </>
  ),
  code: (
    <>
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
    </>
  ),
  speed: (
    <>
      <path d="M4.5 18a9 9 0 1 1 15 0" />
      <path d="m12 13 4-5" />
      <circle cx="12" cy="13" r="1.4" />
      <path d="M7 9.5 6 8.6M12 6.5V5M17 9.5l1-.9" />
    </>
  ),
  combat: (
    <>
      <path d="m3 3 8 8M3 7V3h4" />
      <path d="m21 3-8 8M21 7V3h-4" />
      <path d="m7.5 13.5-3 3 3 3 3-3M16.5 13.5l3 3-3 3-3-3" />
    </>
  ),
  innovation: (
    <>
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  hurdle: (
    <>
      <path d="M5 20V6M19 20V6M5 8h14M5 12h14" />
      <path d="M3 20h4M17 20h4" />
    </>
  ),
  bus: (
    <>
      <rect x="4" y="3" width="16" height="15" rx="2" />
      <path d="M4 11h16M8 18v2M16 18v2" />
      <circle cx="8" cy="14.5" r="1" />
      <circle cx="16" cy="14.5" r="1" />
    </>
  ),
  mentor: (
    <>
      <circle cx="7" cy="6" r="2.5" />
      <path d="M3 21v-6a4 4 0 0 1 8 0v6" />
      <rect x="12" y="4" width="9" height="7" rx="1" />
      <path d="m11 12 3-3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M16 14.2a5 5 0 0 1 5.5 5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  check: <path d="m5 12 5 5 9-10" />,
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="m21 16-5-5-9 9" />
    </>
  ),
  arrow: <path d="M7 17 17 7M8 7h9v9" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  trophy: (
    <>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z" />
      <path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3" />
    </>
  ),
  ticket: (
    <>
      <path d="M3 8a2 2 0 0 0 0 4v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a2 2 0 0 1 0-4V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1z" transform="translate(0 1.5)" />
      <path d="M14 5.5v13" strokeDasharray="2 2.2" />
    </>
  ),
  certificate: (
    <>
      <rect x="3" y="3" width="18" height="13" rx="1.5" />
      <path d="M7 8h10M7 11h6" />
      <circle cx="16" cy="17" r="2.5" />
      <path d="m14.5 19-1 3 2.5-1 2.5 1-1-3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  download: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="m10 9 5 3-5 3z" />
    </>
  ),
};

export default function Icon({ name, size = 24, className = "", ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`icon ${className}`}
      aria-hidden="true"
      {...base}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
