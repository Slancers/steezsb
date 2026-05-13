// SVG palm/banana leaf used as a section divider or floating accent.
// Two variants: "palm" (long fronds) and "banana" (broad leaves).
// Subtle CSS rotation sway loop honors prefers-reduced-motion.
export function LeafDivider({
  variant = "palm",
  size = 80,
  className = "",
  sway = true,
}: {
  variant?: "palm" | "banana";
  size?: number;
  className?: string;
  sway?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={`${sway ? "animate-leaf-sway" : ""} ${className}`}
      style={{ transformOrigin: "50% 95%" }}
    >
      {variant === "palm" ? (
        <g stroke="#7FA46B" strokeWidth="2.5" strokeLinecap="round" fill="none">
          {/* Main stem */}
          <path d="M50 95 Q50 60 50 20" />
          {/* Fronds left */}
          <path d="M50 75 Q30 70 15 55" />
          <path d="M50 60 Q28 50 14 38" />
          <path d="M50 45 Q30 35 22 22" />
          <path d="M50 30 Q35 22 30 10" />
          {/* Fronds right */}
          <path d="M50 75 Q70 70 85 55" />
          <path d="M50 60 Q72 50 86 38" />
          <path d="M50 45 Q70 35 78 22" />
          <path d="M50 30 Q65 22 70 10" />
        </g>
      ) : (
        <g fill="#7FA46B" fillOpacity="0.85">
          {/* Banana leaf */}
          <path d="M50 95 Q15 80 18 38 Q25 12 50 8 Q75 12 82 38 Q85 80 50 95 Z" />
          {/* Mid vein */}
          <path
            d="M50 95 L50 12"
            stroke="#5E8550"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
      )}
    </svg>
  );
}

// A horizontal row of leaves — used between sections as a soft divider.
export function LeafRow({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-end justify-center gap-2 py-8 opacity-70 ${className}`}
    >
      <LeafDivider variant="palm" size={36} />
      <LeafDivider variant="banana" size={28} />
      <LeafDivider variant="palm" size={44} />
      <LeafDivider variant="banana" size={32} />
      <LeafDivider variant="palm" size={36} />
    </div>
  );
}
