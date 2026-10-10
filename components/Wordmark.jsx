export function Gear({ className = "" }) {
  return (
    <svg viewBox="-24 -24 48 48" className={`gear ${className}`} aria-hidden="true">
      <path
        fill="currentColor"
        d="M-4-22h8l1.5 6 5 2 5.3-3.2 5.6 5.6-3.2 5.3 2 5 6 1.5v8l-6 1.5-2 5 3.2 5.3-5.6 5.6-5.3-3.2-5 2L4 22h-8l-1.5-6-5-2-5.3 3.2-5.6-5.6 3.2-5.3-2-5L-22 4v-8l6-1.5 2-5-3.2-5.3 5.6-5.6 5.3 3.2 5-2z"
      />
      <circle r="8" fill="var(--bg)" />
      <circle r="3" fill="currentColor" />
    </svg>
  );
}

/** TECHN⚙VIA with the gear standing in for the O. */
export default function Wordmark({ className = "", as: Tag = "span" }) {
  return (
    <Tag className={`wordmark ${className}`} aria-label="Technovia">
      <span aria-hidden="true">TECHN</span>
      <Gear className="wordmark-gear" />
      <span aria-hidden="true">VIA</span>
    </Tag>
  );
}
