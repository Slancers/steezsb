// Decorative sun graphic — corner accent with slow glow pulse.
// Pure SVG, no JS. Honors prefers-reduced-motion via tailwind animation rules.
export function SunMark({
  size = 120,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={`animate-sun-glow ${className}`}
    >
      {/* Outer halo */}
      <circle cx="60" cy="60" r="56" fill="#F5C25B" fillOpacity="0.12" />
      <circle cx="60" cy="60" r="44" fill="#F5C25B" fillOpacity="0.22" />
      {/* Rays */}
      <g stroke="#F5C25B" strokeWidth="3" strokeLinecap="round">
        <line x1="60" y1="4" x2="60" y2="18" />
        <line x1="60" y1="102" x2="60" y2="116" />
        <line x1="4" y1="60" x2="18" y2="60" />
        <line x1="102" y1="60" x2="116" y2="60" />
        <line x1="20" y1="20" x2="30" y2="30" />
        <line x1="90" y1="90" x2="100" y2="100" />
        <line x1="100" y1="20" x2="90" y2="30" />
        <line x1="30" y1="90" x2="20" y2="100" />
      </g>
      {/* Sun body */}
      <circle cx="60" cy="60" r="22" fill="#F5C25B" />
      <circle cx="60" cy="60" r="22" fill="#E0A737" fillOpacity="0.3" />
    </svg>
  );
}
