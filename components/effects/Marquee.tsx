// Horizontal scrolling text strip. Pure CSS animation defined in
// tailwind.config.ts (keyframes: marquee, animation: marquee 30s linear infinite).
// Content is duplicated so the loop wraps seamlessly when the strip
// translates by -50%.
export function Marquee({
  items,
  separator = "·",
}: {
  items: string[];
  separator?: string;
}) {
  const repeated = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border py-5">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-2xl uppercase tracking-widest md:text-3xl"
          >
            <span>{item}</span>
            <span className="text-primary" aria-hidden>
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
