import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/effects/Reveal";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "STEEZ — Skateboarding for Kids · Hyderabad",
  description:
    "Skateboarding classes for kids in Hyderabad. Helmets + pads on, small groups, coached by Hari since 2019. First session on a board — guaranteed.",
  path: "/",
});

const METHOD_POINTS = [
  {
    title: "Small groups",
    desc: "4–6 kids per session so every child gets time on the board.",
  },
  {
    title: "Safety first",
    desc: "Helmets and pads provided and worn every session, no exceptions.",
  },
  {
    title: "Beginner friendly",
    desc: "No experience needed. Walk-ins welcome.",
  },
  {
    title: "Consistent structure",
    desc: "Same schedule, fresh sessions every week.",
  },
];

const STATS = [
  { v: "EST. 2019" },
  { v: "340+ STUDENTS" },
  { v: "52 BOWL HRS/WK" },
  { v: "AGES 5–16" },
];

const TICKER_ITEMS = [
  "OPEN NOW",
  "17:00–20:00 · GROUP SESSION",
  "SAT BEGINNER",
  "HYDERABAD · TELANGANA · IND",
  "EST 2019",
  "WALK-INS OK",
  "BOWL · OPEN NOW",
];

function CheckBox() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="mt-1 shrink-0"
    >
      <rect width="24" height="24" fill="#C4622D" />
      <path
        d="M6 12.5L10 16.5L18 8.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

function ArrowOutward({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
      aria-hidden
    >
      <path d="M7 17L17 7" />
      <path d="M9 7H17V15" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      {/* TICKER BAR — sits just below the 80px nav, dark, scrolling */}
      <div className="mt-20 w-full overflow-hidden whitespace-nowrap bg-[#1A1A1A] py-2 font-body text-[14px] font-bold uppercase tracking-[0.05em] text-white">
        <div className="inline-block animate-ticker-status">
          <span className="inline-block pr-12">
            {TICKER_ITEMS.join(" · ")} · {TICKER_ITEMS.join(" · ")} ·{" "}
          </span>
          <span className="inline-block pr-12" aria-hidden>
            {TICKER_ITEMS.join(" · ")} · {TICKER_ITEMS.join(" · ")} ·{" "}
          </span>
        </div>
      </div>

      {/* HERO — dark with kids photo, centered headline, two CTAs */}
      <section className="relative flex h-[80vh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-[#1A1A1A]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos/kids-class.jpg"
            alt="Kids in helmets and pads skating in the STEEZ bowl"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-container-max flex-col items-center gap-stack-lg px-margin-mobile text-center md:px-margin-desktop">
          <Reveal>
            <h1 className="max-w-4xl font-display text-display-sm uppercase leading-tight text-white md:text-display-lg">
              Where kids learn to skate.
            </h1>
          </Reveal>

          <Reveal>
            <p className="max-w-2xl font-body text-body-lg font-medium text-white/90">
              Skateboarding classes for kids in Hyderabad. Helmets + pads on,
              groups small, one coach who actually skates with them.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-stack-sm flex w-full flex-col justify-center gap-stack-md sm:w-auto sm:flex-row">
              <WhatsAppCTA
                intent="class"
                className="inline-flex w-full items-center justify-center bg-[#C4622D] px-8 py-4 font-body text-[14px] font-bold uppercase tracking-[0.05em] text-white transition-opacity hover:opacity-90 sm:w-auto"
              >
                Book your kid&apos;s spot
              </WhatsAppCTA>
              <Link
                href="/classes"
                className="inline-flex w-full items-center justify-center border-2 border-white px-8 py-4 font-body text-[14px] font-bold uppercase tracking-[0.05em] text-white transition-colors hover:bg-white hover:text-[#1A1A1A] sm:w-auto"
              >
                See classes <ArrowOutward size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* METHOD — text left, photo right, 4 checkboxed points */}
      <section className="w-full bg-surface px-margin-mobile py-section-gap md:px-margin-desktop">
        <div className="mx-auto grid max-w-container-max grid-cols-1 items-center gap-stack-lg lg:grid-cols-2 lg:gap-16">
          <div className="order-2 flex flex-col items-start gap-stack-lg text-left lg:order-1">
            <Reveal>
              <div className="flex flex-col items-start gap-stack-sm">
                <span className="font-body text-[14px] font-bold uppercase tracking-[0.05em] text-[#C4622D]">
                  The Method
                </span>
                <h2 className="max-w-2xl font-display text-display-sm uppercase leading-tight text-[#1A1A1A]">
                  First session on a board. Guaranteed.
                </h2>
              </div>
            </Reveal>

            <Reveal>
              <div className="space-y-stack-md text-on-surface-variant">
                <p className="font-body text-body-lg">
                  We believe in getting kids moving immediately. Our approach
                  strips away the intimidation factor, focusing on core
                  balance and muscle memory from minute one. We don&apos;t
                  overcomplicate; we demonstrate, support, and let them feel
                  the board.
                </p>
                <p className="font-body text-body-lg">
                  Every session is structured to build confidence through
                  repetition in a controlled, highly supervised environment.
                  We celebrate small wins to build lasting resilience.
                </p>
              </div>
            </Reveal>

            <Reveal stagger className="mt-stack-md grid w-full grid-cols-1 gap-stack-md text-left md:grid-cols-2">
              {METHOD_POINTS.map((p) => (
                <div
                  key={p.title}
                  className="flex items-start gap-stack-md border border-outline-variant bg-surface-bright p-stack-md"
                >
                  <CheckBox />
                  <div>
                    <h3 className="mb-1 font-body text-[14px] font-bold uppercase tracking-[0.05em] text-[#1A1A1A]">
                      {p.title}
                    </h3>
                    <p className="font-body text-body-md text-on-surface-variant">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="order-1 h-full min-h-[400px] w-full lg:order-2 lg:min-h-full">
            <div className="relative aspect-[4/5] h-full w-full overflow-hidden border border-outline-variant">
              <Image
                src="/photos/bowl-garden.jpg"
                alt="Kids practicing skateboarding at STEEZ in Hyderabad"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS ROW — 4 cells, divided */}
      <section className="w-full border-y border-outline-variant bg-[#F5F5F5] py-stack-lg">
        <div className="mx-auto grid max-w-container-max grid-cols-2 gap-stack-md divide-x-0 px-margin-mobile text-center md:grid-cols-4 md:divide-x md:divide-outline-variant md:px-margin-desktop">
          {STATS.map((s) => (
            <div
              key={s.v}
              className="flex flex-col items-center justify-center p-stack-md"
            >
              <span className="font-display text-headline-lg uppercase text-[#1A1A1A]">
                {s.v}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CENTERED PHOTO — cinematic kid in the bowl */}
      <section className="flex w-full justify-center bg-surface px-margin-mobile py-section-gap md:px-margin-desktop">
        <div className="w-full max-w-container-max">
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-outline-variant">
            <Image
              src="/photos/bowl-cinematic.jpg"
              alt="A young STEEZ student in the bowl at golden hour, balancing on a skateboard in full safety gear"
              fill
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
