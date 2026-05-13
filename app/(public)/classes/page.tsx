import { Marquee } from "@/components/effects/Marquee";
import { OllieSequence } from "@/components/effects/OllieSequence";
import { Reveal } from "@/components/effects/Reveal";
import { Arrow, StarBurst, WhatsAppIcon } from "@/components/icons/zine";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Skateboarding Classes in Hyderabad",
  description:
    "1-on-1, group, and cohort skateboarding coaching for kids and adults in Hyderabad. Transparent INR pricing.",
  path: "/classes",
});

const TIERS = [
  {
    level: "BEGINNER · GROUP",
    name: ["GROUP", "SESSION"],
    price: "₹600",
    per: "/ session",
    features: [
      "90-min session",
      "Up to 6 skaters",
      "Helmet + pads included",
      "Borrow a board first time",
      "Saturday + Sunday morning",
    ],
    cta: "WHATSAPP TO JOIN",
    featured: false,
  },
  {
    level: "BEST FOR FIRST-TIMERS",
    name: ["1-ON-1", "COACHING"],
    price: "₹1,400",
    per: "/ session",
    features: [
      "60-min private session",
      "Just you + Hari",
      "Pick your day & time",
      "Custom drill book",
      "Free re-book if rained out",
      "Progress photos / video",
    ],
    cta: "BOOK 1-ON-1",
    badge: "MOST BOOKED",
    featured: true,
  },
  {
    level: "SKILLED · INVITED",
    name: ["BOWL", "COHORT"],
    price: "₹4,800",
    per: "/ month",
    features: [
      "8 sessions / month",
      "Invite-only after intermediate",
      "Bowl tricks, transitions, lines",
      "Sunday skate sessions",
      "Filmed runs every Sunday",
    ],
    cta: "ASK ABOUT COHORT",
    featured: false,
  },
];

type SlotKind = "available" | "featured" | "booked";
type Slot = { kind: SlotKind; label: string; note: string } | null;

const SCHEDULE: { time: string; slots: Slot[] }[] = [
  {
    time: "06:00",
    slots: [
      { kind: "available", label: "Bowl Practice", note: "walk-in ok" },
      null,
      { kind: "available", label: "Bowl Practice", note: "walk-in ok" },
      null,
      { kind: "available", label: "Bowl Practice", note: "walk-in ok" },
      { kind: "featured", label: "1-on-1", note: "Aarav · 60min" },
      { kind: "available", label: "Free Skate", note: "all welcome" },
    ],
  },
  {
    time: "09:00",
    slots: [
      null,
      { kind: "booked", label: "Booked", note: "—" },
      null,
      { kind: "featured", label: "1-on-1", note: "Priya · 60min" },
      null,
      { kind: "available", label: "Beginners", note: "2 spots" },
      { kind: "available", label: "Beginners", note: "4 spots" },
    ],
  },
  {
    time: "16:00",
    slots: [
      { kind: "featured", label: "1-on-1", note: "Kabir" },
      { kind: "available", label: "Group", note: "3 spots" },
      { kind: "booked", label: "Booked", note: "—" },
      { kind: "available", label: "Group", note: "5 spots" },
      { kind: "available", label: "Group", note: "1 spot" },
      null,
      null,
    ],
  },
  {
    time: "18:00",
    slots: [
      { kind: "available", label: "Open Bowl", note: "—" },
      { kind: "featured", label: "1-on-1", note: "Ria" },
      { kind: "available", label: "Open Bowl", note: "—" },
      { kind: "booked", label: "Cohort", note: "skilled only" },
      { kind: "available", label: "Open Bowl", note: "—" },
      { kind: "booked", label: "Cohort", note: "skilled only" },
      null,
    ],
  },
  {
    time: "20:00",
    slots: [
      { kind: "available", label: "Free Skate", note: "—" },
      { kind: "available", label: "Free Skate", note: "—" },
      { kind: "available", label: "Free Skate", note: "—" },
      { kind: "available", label: "Free Skate", note: "—" },
      { kind: "featured", label: "Film Night", note: "every fri" },
      null,
      null,
    ],
  },
];

const SLOT_CLASSES: Record<SlotKind, string> = {
  available: "bg-steeze-lime text-ink font-semibold",
  featured: "bg-steeze-red text-paper font-semibold",
  booked: "bg-ink text-paper",
};

type Drill = {
  num: string;
  name: string;
  level: "BEGINNER" | "INTERMEDIATE" | "SKILLED";
};

const DRILLS: Drill[] = [
  { num: "01", name: "Foot stance", level: "BEGINNER" },
  { num: "02", name: "Push & glide", level: "BEGINNER" },
  { num: "03", name: "Turning", level: "BEGINNER" },
  { num: "04", name: "Tic-tac", level: "BEGINNER" },
  { num: "05", name: "Drop-in", level: "INTERMEDIATE" },
  { num: "06", name: "Ollie", level: "INTERMEDIATE" },
  { num: "07", name: "Manual", level: "INTERMEDIATE" },
  { num: "08", name: "Carving lines", level: "INTERMEDIATE" },
  { num: "09", name: "Kickflip", level: "SKILLED" },
  { num: "10", name: "Rock-to-fakie", level: "SKILLED" },
  { num: "11", name: "50-50 grind", level: "SKILLED" },
  { num: "12", name: "Full run", level: "SKILLED" },
];

const LEVEL_WIDTHS = { BEGINNER: 25, INTERMEDIATE: 60, SKILLED: 95 };

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function ClassesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Classes", path: "/classes" },
        ])}
      />

      <PageHero
        eyebrow="[ classes ]"
        lines={[
          { text: "STAND UP." },
          { text: "PUSH OFF.", treatment: "red-shadow" },
          { text: "GO.", treatment: "outlined" },
        ]}
        subtitle="We coach skateboarding from your first push to your first kickflip. 1-on-1, small group, or seasonal cohort. No board? We'll lend you one for the first session."
        illustration={
          <div className="w-full">
            <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
              [ How an ollie works ]
            </div>
            <OllieSequence />
          </div>
        }
      />

      <div className="pt-12 md:pt-16">
        <Marquee variant="dark">
          <StarBurst className="text-steeze-red" /> 1-ON-1{" "}
          <StarBurst className="text-steeze-lime" /> GROUP{" "}
          <StarBurst className="text-steeze-blue" /> COHORT{" "}
          <StarBurst className="text-steeze-red" /> 1-ON-1{" "}
          <StarBurst className="text-steeze-lime" /> GROUP{" "}
          <StarBurst className="text-steeze-blue" /> COHORT
        </Marquee>
      </div>

      {/* TIERS */}
      <section className="container py-20 md:py-24">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b-[1.5px] border-ink pb-10">
            <div>
              <div className="s-num-zine mb-2">[ 01 / TIERS ]</div>
              <h2 className="s-title-zine">
                three
                <br />
                ways in.
              </h2>
            </div>
            <p className="max-w-[320px] text-[13px] leading-relaxed text-ink-soft">
              Pricing in INR. Pay per session, per month, or buy a 4-pack and
              skip the awkward bank transfer dance.
            </p>
          </div>
        </Reveal>

        <Reveal stagger className="grid gap-6 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name.join(" ")}
              className={`relative flex flex-col border-[1.5px] border-ink p-7 transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard ${
                tier.featured ? "bg-ink text-paper" : "bg-paper text-ink"
              }`}
            >
              {tier.badge ? (
                <div className="absolute -top-2.5 right-6 bg-steeze-red px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-paper">
                  {tier.badge}
                </div>
              ) : null}
              <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-steeze-red">
                {tier.level}
              </div>
              <h3 className="mb-4 font-display text-3xl font-bold uppercase leading-[0.95] -tracking-[0.03em] md:text-4xl">
                {tier.name.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h3>
              <div className="flex items-baseline gap-1 border-y border-dashed py-4">
                <span
                  className={`font-display text-5xl font-bold -tracking-[0.03em] ${
                    tier.featured ? "text-steeze-lime" : "text-steeze-red"
                  }`}
                >
                  {tier.price}
                </span>
                <span className="text-xs opacity-60">{tier.per}</span>
              </div>
              <ul className="my-5 flex-1">
                {tier.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-2.5 border-b py-2 text-[13px] ${
                      tier.featured
                        ? "border-paper/15"
                        : "border-ink/10"
                    }`}
                  >
                    <span
                      className={`shrink-0 font-display font-bold ${
                        tier.featured ? "text-steeze-lime" : "text-steeze-red"
                      }`}
                    >
                      →
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <WhatsAppCTA
                intent="class"
                className={
                  tier.featured
                    ? "btn-zine btn-zine--red w-full justify-center"
                    : "btn-zine btn-zine--ghost w-full justify-center"
                }
              >
                <WhatsAppIcon size={14} /> {tier.cta}
              </WhatsAppCTA>
            </div>
          ))}
        </Reveal>
      </section>

      {/* SCHEDULE */}
      <section className="container pb-16 md:pb-20">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b-[1.5px] border-ink pb-10">
            <div>
              <div className="s-num-zine mb-2">[ 02 / SCHEDULE ]</div>
              <h2 className="s-title-zine">
                this
                <br />
                <span className="text-steeze-red">week.</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="chip-zine chip-zine--lime">open</span>
              <span className="chip-zine chip-zine--red">1-on-1</span>
              <span className="chip-zine bg-ink text-paper" style={{ borderColor: "#0E0D0B" }}>
                booked
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
            <div className="min-w-[720px] border-[1.5px] border-ink bg-paper md:min-w-0">
            <div className="grid grid-cols-[80px_repeat(7,1fr)] bg-ink font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-paper md:grid-cols-[100px_repeat(7,1fr)] md:text-[11px]">
              <div className="border-r border-paper/15 p-3">TIME</div>
              {DAYS.map((d, i) => (
                <div
                  key={d}
                  className={
                    i < DAYS.length - 1
                      ? "border-r border-paper/15 p-3"
                      : "p-3"
                  }
                >
                  {d}
                </div>
              ))}
            </div>
            {SCHEDULE.map((row) => (
              <div
                key={row.time}
                className="grid grid-cols-[80px_repeat(7,1fr)] border-t border-ink/10 md:grid-cols-[100px_repeat(7,1fr)]"
              >
                <div className="border-r border-ink/10 bg-paper-deep p-2.5 font-mono text-[10px] font-semibold md:text-[11px]">
                  {row.time}
                </div>
                {row.slots.map((slot, j) => {
                  const isLast = j === row.slots.length - 1;
                  const base = `border-${isLast ? "0" : "r"} border-ink/10 p-2.5 text-[10px] md:text-[11px] min-h-[60px] transition-colors hover:bg-paper-deep`;
                  return (
                    <div
                      key={j}
                      className={`${base} ${slot ? SLOT_CLASSES[slot.kind] : ""}`}
                    >
                      {slot ? (
                        <>
                          <div className="mb-0.5">{slot.label}</div>
                          <div className="text-[9px] opacity-70">
                            {slot.note}
                          </div>
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ))}
            </div>
          </div>
        </Reveal>
      </section>

      <Marquee variant="blue">
        <StarBurst /> BOOK · WHATSAPP <Arrow size={32} /> BOOK · WHATSAPP{" "}
        <Arrow size={32} /> BOOK · WHATSAPP <Arrow size={32} />
      </Marquee>

      {/* DRILL BOOK */}
      <section className="container py-20 md:py-24">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b-[1.5px] border-ink pb-10">
            <div>
              <div className="s-num-zine mb-2">[ 03 / WHAT YOU&apos;LL LEARN ]</div>
              <h2 className="s-title-zine">
                the
                <br />
                drill book.
              </h2>
            </div>
            <p className="max-w-[320px] text-[13px] leading-relaxed text-ink-soft">
              Every coach has one. Ours is short, written in pencil, and
              updated every month.
            </p>
          </div>
        </Reveal>

        <Reveal
          stagger
          className="grid grid-cols-1 border-[1.5px] border-ink bg-paper sm:grid-cols-2 lg:grid-cols-4"
        >
          {DRILLS.map((drill) => (
            <div
              key={drill.num}
              className="border-b border-r border-ink/20 p-6 transition-colors hover:bg-paper-deep"
            >
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
                {drill.num}
              </div>
              <div className="mb-2 font-display text-2xl font-bold uppercase leading-none -tracking-[0.02em]">
                {drill.name}
              </div>
              <div className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-steeze-red">
                {drill.level}
              </div>
              <div className="h-1.5 overflow-hidden border border-ink bg-paper-deep">
                <div
                  className="h-full bg-steeze-red transition-[width] duration-700"
                  style={{ width: `${LEVEL_WIDTHS[drill.level]}%` }}
                />
              </div>
            </div>
          ))}
        </Reveal>
      </section>
    </>
  );
}
