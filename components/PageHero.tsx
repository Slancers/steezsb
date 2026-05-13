import { Reveal } from "@/components/effects/Reveal";

type Line = {
  text: string;
  treatment?:
    | "default"
    | "outlined"
    | "red-shadow"
    | "blue-shadow"
    | "lime-shadow";
};

const TREATMENTS: Record<
  NonNullable<Line["treatment"]>,
  React.CSSProperties
> = {
  default: {},
  outlined: { color: "transparent", WebkitTextStroke: "2px #0E0D0B" },
  "red-shadow": { color: "#FF2D2D", textShadow: "6px 6px 0 #0E0D0B" },
  "blue-shadow": { color: "#2547F0", textShadow: "6px 6px 0 #0E0D0B" },
  "lime-shadow": { color: "#D3F046", textShadow: "6px 6px 0 #0E0D0B" },
};

// Standard page hero block — eyebrow + multi-line all-caps display title +
// optional subtitle. Optional `illustration` renders in the top-right slot
// (hidden on mobile to keep stacked layouts tight).
export function PageHero({
  eyebrow,
  lines,
  subtitle,
  illustration,
}: {
  eyebrow: string;
  lines: Line[];
  subtitle?: string;
  illustration?: React.ReactNode;
}) {
  return (
    <section className="container pt-10 md:pt-14">
      <Reveal>
        <div className="grid items-start gap-8 md:grid-cols-[1fr_240px] md:gap-12 lg:grid-cols-[1fr_280px]">
          <div>
            <div className="eyebrow-zine mb-5">{eyebrow}</div>
            <h1 className="font-display break-words font-bold uppercase leading-[0.88] -tracking-[0.03em] text-[clamp(44px,10vw,160px)] md:leading-[0.85] md:-tracking-[0.05em]">
              {lines.map((line, i) => (
                <span
                  key={i}
                  className="block"
                  style={TREATMENTS[line.treatment ?? "default"]}
                >
                  {line.text}
                </span>
              ))}
            </h1>
            {subtitle ? (
              <p className="mt-8 max-w-[560px] text-[15px] leading-relaxed text-ink-soft md:text-[16px] md:leading-[1.7]">
                {subtitle}
              </p>
            ) : null}
          </div>
          {illustration ? (
            <div
              className="hidden self-start justify-self-end md:block"
              aria-hidden
            >
              {illustration}
            </div>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
