import { cn } from "@/lib/utils";

export function AboutMotionGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 680 220"
      aria-hidden="true"
      focusable="false"
      className={cn("wr-about-motion", className)}
    >
      <path
        className="wr-about-motion-path"
        d="M18 164h98c34 0 44-76 84-76s52 76 94 76h74c42 0 48-104 92-104s54 104 108 104h94"
      />
      <path
        className="wr-about-motion-flight"
        d="M140 94c112-78 218-78 344 0"
      />
      <circle className="wr-about-motion-node" cx="116" cy="164" r="7" />
      <circle className="wr-about-motion-node" cx="294" cy="164" r="7" />
      <circle className="wr-about-motion-node" cx="462" cy="164" r="7" />
      <circle className="wr-about-motion-node" cx="558" cy="164" r="7" />
    </svg>
  );
}
