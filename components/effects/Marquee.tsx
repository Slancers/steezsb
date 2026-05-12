type Variant = "dark" | "paper" | "red" | "blue" | "lime";

const VARIANT_CLASSES: Record<Variant, string> = {
  dark: "bg-ink text-paper border-ink",
  paper: "bg-paper text-ink border-ink",
  red: "bg-steeze-red text-paper border-steeze-red",
  blue: "bg-steeze-blue text-paper border-steeze-blue",
  lime: "bg-steeze-lime text-ink border-ink",
};

// Pure-CSS marquee — duplicates content so a -50% translate loops cleanly.
// Animation keyframe `ticker` lives in tailwind.config.ts.
export function Marquee({
  children,
  variant = "dark",
  reverse = false,
  slow = false,
  className = "",
}: {
  children: React.ReactNode;
  variant?: Variant;
  reverse?: boolean;
  slow?: boolean;
  className?: string;
}) {
  const bg = VARIANT_CLASSES[variant];
  const speed = slow ? "animate-ticker-slow" : "animate-ticker-fast";
  return (
    <div
      className={`overflow-hidden border-y-[1.5px] py-[18px] ${bg} ${className}`}
    >
      <div
        className={`flex w-max items-center gap-12 whitespace-nowrap font-display text-3xl font-bold uppercase tracking-tight md:text-5xl ${speed}`}
        style={{
          animationDirection: reverse ? "reverse" : "normal",
          letterSpacing: "-0.03em",
        }}
      >
        <div className="flex items-center gap-8">{children}</div>
        <div className="flex items-center gap-8" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
