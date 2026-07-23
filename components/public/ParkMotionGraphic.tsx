import { cn } from "@/lib/utils";

export function ParkMotionGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 240"
      aria-hidden="true"
      focusable="false"
      className={cn("wr-park-sketch", className)}
    >
      <path
        className="wr-sketch-line wr-sketch-track"
        d="M18 190h72c28 0 34-62 72-62s38 62 77 62h54c34 0 39-92 81-92s45 92 86 92h82"
      />
      <g className="wr-sketch-rider">
        <path className="wr-sketch-line" d="M0 0h62" />
        <circle className="wr-sketch-line" cx="12" cy="9" r="9" />
        <circle className="wr-sketch-line" cx="50" cy="9" r="9" />
        <path className="wr-sketch-line" d="M30-8 18-38m12 30 18-27M18-38l18-19m-18 19-15 19m33-38 10-15" />
        <circle className="wr-sketch-line" cx="49" cy="-83" r="10" />
      </g>
      <path className="wr-sketch-flight" d="M132 122c88-92 184-90 286-18" />
    </svg>
  );
}
