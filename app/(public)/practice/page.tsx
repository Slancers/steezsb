import { BowlArt } from "@/components/effects/BowlArt";
import { DropInSequence } from "@/components/effects/DropInSequence";
import { Marquee } from "@/components/effects/Marquee";
import { Reveal } from "@/components/effects/Reveal";
import { Arrow, StarBurst } from "@/components/icons/zine";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Bowl Practice in Hyderabad",
  description:
    "Hourly bowl access for independent skaters in Hyderabad. Transparent pricing per hour. No coach, no class — just skate.",
  path: "/practice",
});

const SPECS = [
  { k: "DEPTH", v: "5.5 ft → 8 ft" },
  { k: "SHAPE", v: "Kidney" },
  { k: "FLAT GROUND", v: "12m × 8m polished slab" },
  { k: "CAPACITY", v: "8 skaters at once" },
  { k: "SURFACE", v: "Steel-troweled concrete" },
  { k: "SHOTGUN COPING", v: "Yes (north quarter)" },
  { k: "RAMPS", v: "3 quarter, 1 launch, 1 box" },
  { k: "RAIN POLICY", v: "Closed when wet, re-bookable" },
];

const PRICE_BLOCKS = [
  {
    label: "[ 1 HOUR ]",
    value: "₹200",
    unit: "walk-in · drop-in",
    accent: "default" as const,
  },
  {
    label: "[ 4 HOURS ]",
    value: "₹600",
    unit: "save ₹200 · most popular",
    accent: "lime" as const,
  },
  {
    label: "[ DAY PASS ]",
    value: "₹900",
    unit: "6:00–21:00 · all-in",
    accent: "default" as const,
  },
  {
    label: "[ MONTHLY ]",
    value: "₹3,200",
    unit: "unlimited · cheapest if you skate weekly",
    accent: "ink" as const,
  },
];

const HEATMAP = [
  { time: "06:00", cells: [1, 1, 1, 1, 1, 3, 2] },
  { time: "09:00", cells: [0, 1, 0, 1, 0, 4, 4] },
  { time: "12:00", cells: [0, 0, 0, 0, 0, 2, 1] },
  { time: "16:00", cells: [3, 3, 3, 3, 4, 5, 5] },
  { time: "18:00", cells: [4, 4, 4, 5, 5, 5, 4] },
  { time: "20:00", cells: [2, 2, 2, 3, 4, 3, 0] },
];

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const RULES = [
  {
    title: "Helmet always.",
    desc: "Even for the gnarly ones. Especially the gnarly ones. Loaners by the door.",
  },
  {
    title: "Don't snake.",
    desc: "Wait your run. Drop in clean. If you bail, clear out fast.",
  },
  {
    title: "No phones in the bowl.",
    desc: "Film from the deck or from outside. Anywhere in the bowl is a trip hazard.",
  },
  {
    title: "Music's loud.",
    desc: "If you want it quieter, tell us. If you want it louder, also tell us.",
  },
  {
    title: "No wax on the ledges.",
    desc: "House wax only. Ask Hari. We share.",
  },
  {
    title: "Be kind to first-timers.",
    desc: "You were one. They're here because you didn't scare them off.",
  },
];

// Maps heatmap intensity (0–5) to a mixed background — quiet stays paper-cream,
// packed approaches red. Same color math as the design's color-mix expression.
function heatColor(intensity: number) {
  const pct = Math.max(0, Math.min(5, intensity)) * 18;
  return `color-mix(in oklab, #F1EAD7 ${100 - pct}%, #FF2D2D)`;
}

export default function PracticePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Practice", path: "/practice" },
        ])}
      />

      {/* Page hero */}
      <section className="container pt-12 md:pt-16">
        <Reveal>
          <div className="grid items-stretch gap-8 md:grid-cols-[1fr_380px] md:gap-10 lg:grid-cols-[1fr_560px] lg:gap-16">
            <div>
              <div className="eyebrow-zine mb-6">[ practice ]</div>
              <h1 className="font-display break-words font-bold uppercase leading-[0.88] -tracking-[0.03em] text-[clamp(44px,10vw,160px)] md:leading-[0.85] md:-tracking-[0.05em]">
                <span
                  className="block text-transparent"
                  style={{ WebkitTextStroke: "2px #0E0D0B" }}
                >
                  THE BOWL.
                </span>
                <span className="block">BY THE</span>
                <span
                  className="block text-steeze-blue"
                  style={{ textShadow: "6px 6px 0 #0E0D0B" }}
                >
                  HOUR.
                </span>
              </h1>
              <p className="mt-8 max-w-[560px] text-[15px] leading-relaxed text-ink-soft">
                For independent skaters. Book a slot, show up, skate. No coach, no
                class. Helmets are free. Music is loud.
              </p>
            </div>
            <div
              className="w-full self-center justify-self-end"
              aria-hidden
            >
              <div className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                [ How a drop-in works ]
              </div>
              <DropInSequence />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Bowl + specs */}
      <section className="container py-16 md:py-20">
        <Reveal className="grid items-center gap-12 md:grid-cols-2">
          <BowlArt />
          <div>
            <div className="eyebrow-zine">[ 01 / SPECS ]</div>
            <h2 className="mt-3 mb-6 font-display text-3xl font-bold uppercase leading-[0.95] -tracking-[0.03em] md:text-5xl">
              concrete bowl
              <br />+ flat ground.
            </h2>
            <ul className="grid border-t-[1.5px] border-ink">
              {SPECS.map((spec) => (
                <li
                  key={spec.k}
                  className="grid grid-cols-[160px_1fr] gap-4 border-b border-ink/20 py-3.5 text-[13px]"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">
                    {spec.k}
                  </span>
                  <span className="font-medium">{spec.v}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Marquee — blue, reverse */}
      <Marquee variant="blue" reverse>
        <StarBurst /> BOWL · HOURLY <Arrow size={32} /> NO COACH{" "}
        <Arrow size={32} /> JUST SKATE <Arrow size={32} /> BOWL · HOURLY{" "}
        <Arrow size={32} /> NO COACH <Arrow size={32} /> JUST SKATE{" "}
        <Arrow size={32} />
      </Marquee>

      {/* Pricing */}
      <section className="container py-20 md:py-24">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b-[1.5px] border-ink pb-10">
            <div>
              <div className="s-num-zine mb-2">[ 02 / PRICING ]</div>
              <h2 className="s-title-zine">
                pay per
                <br />
                hour.
              </h2>
            </div>
            <p className="max-w-[320px] text-[13px] leading-relaxed text-ink-soft">
              All prices INR. Pay at the door. UPI, cash, or bank — your call.
            </p>
          </div>
        </Reveal>

        <Reveal
          stagger
          className="grid grid-cols-1 border-[1.5px] border-ink sm:grid-cols-2 lg:grid-cols-4"
        >
          {PRICE_BLOCKS.map((block, i) => {
            const isLast = i === PRICE_BLOCKS.length - 1;
            const isLime = block.accent === "lime";
            const isInk = block.accent === "ink";
            const bg = isLime
              ? "bg-steeze-lime"
              : isInk
                ? "bg-ink text-paper"
                : "bg-paper";
            const borderRight = !isLast
              ? "lg:border-r-[1.5px] lg:border-ink"
              : "";
            return (
              <div
                key={block.label}
                className={`relative p-7 ${bg} ${borderRight} transition-colors duration-300`}
              >
                <div
                  className={`mb-3 font-mono text-[11px] uppercase tracking-[0.16em] ${
                    isInk ? "text-steeze-red" : "text-ink/60"
                  }`}
                >
                  {block.label}
                </div>
                <div
                  className={`font-display text-4xl font-bold leading-none -tracking-[0.03em] md:text-5xl ${
                    isInk ? "text-steeze-lime" : ""
                  }`}
                >
                  {block.value}
                </div>
                <div
                  className={`mt-1.5 text-[12px] ${
                    isInk ? "text-paper/70" : "text-ink/60"
                  }`}
                >
                  {block.unit}
                </div>
              </div>
            );
          })}
        </Reveal>
      </section>

      {/* Heatmap */}
      <section className="container py-12 md:py-20">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b-[1.5px] border-ink pb-10">
            <div>
              <div className="s-num-zine mb-2">[ 03 / SESSIONS ]</div>
              <h2 className="s-title-zine">
                when the
                <br />
                bowl&apos;s <span className="text-steeze-red">busy.</span>
              </h2>
            </div>
            <p className="max-w-[320px] text-[13px] leading-relaxed text-ink-soft">
              Heat map of the typical week — when to come, when to skip.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
            <div className="min-w-[680px] border-x-[1.5px] border-ink">
            {/* Day-of-week header */}
            <div className="grid grid-cols-[100px_repeat(7,1fr)] bg-ink font-mono text-[11px] uppercase tracking-[0.14em] text-paper">
              <div className="border-r border-paper/15 p-2.5" />
              {DAYS.map((d, i) => (
                <div
                  key={d}
                  className={
                    i < DAYS.length - 1
                      ? "border-r border-paper/15 p-2.5"
                      : "p-2.5"
                  }
                >
                  {d}
                </div>
              ))}
            </div>
            {/* Rows */}
            {HEATMAP.map((row, rowIdx) => {
              const isLastRow = rowIdx === HEATMAP.length - 1;
              return (
                <div
                  key={row.time}
                  className={`grid grid-cols-[100px_repeat(7,1fr)] border-t border-ink/20 ${
                    isLastRow ? "border-b-[1.5px] border-ink" : ""
                  }`}
                >
                  <div className="flex items-center border-r border-ink/20 bg-paper-deep px-3 font-mono text-[11px] font-semibold">
                    {row.time}
                  </div>
                  {row.cells.map((v, colIdx) => {
                    const isLastCol = colIdx === row.cells.length - 1;
                    return (
                      <div
                        key={colIdx}
                        className={`flex aspect-square items-center justify-center font-mono text-[11px] font-semibold transition-transform duration-150 hover:scale-105 ${
                          isLastCol ? "" : "border-r border-ink/10"
                        }`}
                        style={{ backgroundColor: heatColor(v) }}
                      >
                        <span
                          className="text-paper"
                          style={{ mixBlendMode: "difference" }}
                        >
                          {v === 0 ? "—" : v}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            </div>
          </div>
          {/* Legend */}
          <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">
            <span>QUIET</span>
            <div className="flex gap-0.5">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-6 w-9 border border-ink"
                  style={{ backgroundColor: heatColor(i) }}
                />
              ))}
            </div>
            <span>PACKED</span>
          </div>
        </Reveal>
      </section>

      {/* Marquee — lime */}
      <Marquee variant="lime">
        <StarBurst /> HELMETS FREE <Arrow size={32} /> PADS FREE{" "}
        <Arrow size={32} /> WATER FREE <Arrow size={32} /> ATTITUDE FREE{" "}
        <Arrow size={32} /> HELMETS FREE <Arrow size={32} /> PADS FREE{" "}
        <Arrow size={32} />
      </Marquee>

      {/* House rules */}
      <section className="container py-20 md:py-24">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b-[1.5px] border-ink pb-10">
            <div>
              <div className="s-num-zine mb-2">[ 04 / RULES ]</div>
              <h2 className="s-title-zine">
                house
                <br />
                rules.
              </h2>
            </div>
            <p className="max-w-[320px] text-[13px] leading-relaxed text-ink-soft">
              Short list. We trust you.
            </p>
          </div>
        </Reveal>

        <Reveal stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {RULES.map((rule, i) => (
            <div
              key={rule.title}
              className="border-[1.5px] border-ink bg-paper p-6 transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-b"
            >
              <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-steeze-red">
                [ {String(i + 1).padStart(2, "0")} ]
              </div>
              <div className="mb-2 font-display text-xl font-bold uppercase leading-tight -tracking-[0.02em] md:text-2xl">
                {rule.title}
              </div>
              <div className="text-[13px] leading-relaxed text-ink-soft">
                {rule.desc}
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Closing CTA */}
      <section className="container pb-24">
        <Reveal>
          <div className="border-[1.5px] border-ink bg-paper p-10 text-center md:p-16">
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.9] -tracking-[0.04em] md:text-6xl">
              Book your <span className="text-steeze-blue">slot.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-prose text-[15px] text-ink-soft">
              Tell us the day and how long. We&apos;ll confirm in minutes.
            </p>
            <div className="mt-8">
              <WhatsAppCTA intent="practice" className="btn-zine btn-zine--red">
                WhatsApp to book practice <Arrow size={16} />
              </WhatsAppCTA>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
