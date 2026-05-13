import Image from "next/image";
import Link from "next/link";

import { Duotone } from "@/components/effects/Duotone";
import { HandMark } from "@/components/effects/HandMark";
import { LeafDivider } from "@/components/effects/LeafDivider";
import { Marquee } from "@/components/effects/Marquee";
import { PhotoCaption } from "@/components/effects/PhotoCaption";
import { PhotoHero } from "@/components/effects/PhotoHero";
import { PullQuote } from "@/components/effects/PullQuote";
import { Reveal } from "@/components/effects/Reveal";
import { SunMark } from "@/components/effects/SunMark";
import {
  Arrow,
  CoachPortraitSVG,
  StarBurst,
  WhatsAppIcon,
} from "@/components/icons/zine";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { buildMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/queries";

export const metadata = buildMetadata({
  title: "STEEZ — Skateboarding for Kids in Hyderabad",
  description:
    "Skateboarding classes for kids in Hyderabad. Helmets + pads provided, small group sizes, coached by Hari since 2019. From first push to first drop-in.",
  path: "/",
});

const COACH_BIO_FALLBACK = [
  "I started skating in **2009** on a borrowed board in Banjara Hills. I taught my first class in 2019 because someone asked me to. I never stopped.",
  "I keep the groups small so every kid gets time on the board. Helmets and pads are on the rack — no one skates without them. Parents are welcome to watch from the bench.",
  "If your kid has never stood on a board — they'll stand on one this week. That's the deal.",
];

const COACH_STATS = [
  { k: "EST.", v: "2019" },
  { k: "STUDENTS", v: "340+" },
  { k: "BOWL HRS / WK", v: "52" },
  { k: "AGES", v: "5–16" },
];

export default async function HomePage() {
  const settings = await getSiteSettings();
  const bioText = settings?.about?.bio
    ? settings.about.bio.split("\n\n")
    : COACH_BIO_FALLBACK;

  return (
    <>
      {/* ============================================================
          HERO — asymmetric headline, photo caption credit
          ============================================================ */}
      <div className="-mt-[100px] md:-mt-[108px]">
        <PhotoHero
          src="/photos/bowl-garden.jpg"
          alt="Kids skateboarding through STEEZ's garden setting in Hyderabad"
          priority
          overlay="from-ink/65 via-ink/15 to-transparent"
          height="h-[94vh] min-h-[640px]"
        >
          <Reveal>
            <div className="mb-8 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sand/30 bg-sand/15 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-sand backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-sage-light" />
                LIVE · HYD
              </span>
              <span className="inline-flex items-center rounded-full border border-sand/30 bg-sand/15 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-sand backdrop-blur">
                EST · 2019
              </span>
              <span className="inline-flex items-center rounded-full bg-sun/85 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink backdrop-blur">
                AGES 5 – 16
              </span>
            </div>
          </Reveal>

          {/* Asymmetric headline: "Where kids" left, "learn to skate." indented italic */}
          <Reveal>
            <h1 className="font-display font-medium leading-[0.92] -tracking-[0.02em] text-sand">
              <span className="block text-[clamp(56px,10.5vw,168px)]">
                Where kids
              </span>
              <span className="mt-1 block pl-[8%] text-[clamp(56px,10.5vw,168px)] italic text-sand/95 md:pl-[14%]">
                learn to{" "}
                <span className="relative inline-block text-terracotta-light">
                  skate.
                  <HandMark
                    variant="underline"
                    color="#E6A082"
                    strokeWidth={3.5}
                    className="absolute -bottom-2 left-0 h-3 w-full md:-bottom-3 md:h-4"
                    delay={400}
                  />
                </span>
              </span>
            </h1>
          </Reveal>

          <Reveal>
            <p className="mt-10 max-w-[520px] text-base leading-relaxed text-sand/90 md:text-lg">
              Skateboarding classes for kids in Hyderabad. Helmets + pads on,
              groups small, one coach who actually skates with them.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <WhatsAppCTA intent="class" className="btn-zine btn-zine--red">
                <WhatsAppIcon size={16} /> Book your kid&apos;s spot
              </WhatsAppCTA>
              <Link
                href="/classes"
                className="btn-zine bg-sand text-ink hover:bg-sand"
              >
                See classes <Arrow />
              </Link>
            </div>
          </Reveal>

          {/* Magazine-style photo credit in the bottom-right corner */}
          <div className="absolute bottom-6 right-6 hidden md:block">
            <PhotoCaption
              parts={["PHOTO · HARI", "GOLDEN HOUR", "BANJARA HILLS · HYD"]}
              className="text-sand/65"
            />
          </div>
        </PhotoHero>
      </div>

      {/* ============================================================
          TRUST STRIP — asymmetric, not 4-equal-cards
          One large left cell (the headline number) + two narrow right cells
          ============================================================ */}
      <section className="relative">
        <div className="container py-14 md:py-20">
          <Reveal className="grid items-stretch gap-4 md:grid-cols-[1.4fr_1fr] md:gap-6">
            {/* Big left: 340+ kids since 2019 */}
            <div className="card-soft relative flex flex-col justify-between overflow-hidden p-8 md:p-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
                Since · 2019
              </div>
              <div className="mt-6 flex items-end gap-3">
                <span className="nums font-display text-[clamp(96px,15vw,200px)] font-medium leading-[0.85] -tracking-[0.025em] text-ink md:leading-[0.8]">
                  340
                </span>
                <span className="nums mb-3 font-display text-[clamp(48px,7vw,96px)] font-medium italic leading-none text-terracotta">
                  +
                </span>
                <span className="mb-4 hidden font-display text-3xl italic text-ink/75 md:inline-block">
                  kids
                </span>
              </div>
              <div className="mt-4 inline-block font-display text-2xl italic text-ink/75 md:hidden">
                kids learned to skate here.
              </div>
              <div className="mt-6 max-w-[360px] text-[14px] leading-relaxed text-ink/65">
                Hyderabad&apos;s home for kids learning to skate. From first
                push to first drop-in &mdash; coached by Hari since 2019.
              </div>
              <div className="pointer-events-none absolute -right-6 -top-6 opacity-90">
                <SunMark size={140} />
              </div>
            </div>

            {/* Right: two small stacked cells */}
            <div className="grid gap-4 md:gap-6">
              <div className="card-soft p-7 md:p-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
                  Safety
                </div>
                <div className="mt-3 font-display text-[28px] font-medium leading-[1.05] -tracking-[0.01em] text-ink md:text-[34px]">
                  Helmets &amp;
                  <br />
                  pads, <span className="italic text-sage-deep">always.</span>
                </div>
                <div className="mt-3 text-[13px] leading-snug text-ink/65">
                  Provided. Worn on every session, no exceptions.
                </div>
              </div>
              <div className="card-soft p-7 md:p-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
                  Group size
                </div>
                <div className="mt-3 flex items-baseline gap-3 font-display text-ink">
                  <span className="nums text-[44px] font-medium leading-none md:text-[56px]">
                    4&ndash;6
                  </span>
                  <span className="text-lg italic text-ink/70">
                    kids per session
                  </span>
                </div>
                <div className="mt-3 text-[13px] leading-snug text-ink/65">
                  Small enough that every kid gets time on the board.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          THE BOWL — photo bleeds off left edge, hand mark + pull quote
          ============================================================ */}
      <section className="relative py-20 md:py-28">
        <div className="container">
          <Reveal className="grid items-center gap-12 md:grid-cols-12 md:gap-x-10">
            {/* Photo: cols 1-7 on md, bleeds 40px off the left container edge */}
            <div className="relative md:col-span-7 md:-ml-[40px] md:-mr-2">
              <Duotone
                src="/photos/bowl-cinematic.jpg"
                alt="A young skater alone in the bowl at golden hour"
                variant="sage"
                className="aspect-[4/5] w-full overflow-hidden rounded-3xl md:aspect-[5/6]"
                sizes="(min-width: 768px) 58vw, 100vw"
              />
              <div className="mt-4 px-1">
                <PhotoCaption
                  parts={[
                    "PHOTO · HARI",
                    "FIRST DROP-IN",
                    "GOLDEN HOUR",
                  ]}
                />
              </div>
            </div>

            {/* Text: cols 8-12 */}
            <div className="md:col-span-5">
              <div className="eyebrow-zine mb-5">The Bowl</div>
              <h2 className="font-display text-5xl font-medium leading-[1.0] -tracking-[0.02em] text-ink md:text-6xl">
                Built for first{" "}
                <span className="relative inline-block italic text-terracotta">
                  drop-ins.
                </span>
              </h2>
              <p className="mt-8 text-base leading-relaxed text-ink/75 md:text-lg">
                Hand-troweled concrete. Mellow transitions for first-timers,
                tight pockets for the season pros. Built for kids to fall, get
                up, and try again &mdash; with the coach watching every line.
              </p>

              {/* Stats with a hand-drawn margin note near depth */}
              <div className="relative mt-10 grid grid-cols-2 gap-x-6 border-t border-ink/15 pt-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
                    Depth
                  </div>
                  <div className="nums mt-1 font-display text-3xl font-medium text-ink md:text-4xl">
                    4 &ndash; 7 ft
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
                    Surface
                  </div>
                  <div className="mt-1 font-display text-3xl font-medium italic text-ink/85 md:text-4xl">
                    Hand-troweled
                  </div>
                </div>

                {/* Margin annotation pointing at depth */}
                <div className="pointer-events-none absolute -bottom-12 left-0 hidden w-[180px] md:block">
                  <div className="margin-note flex items-start gap-2">
                    <div className="mt-1 w-10 shrink-0 text-terracotta">
                      <HandMark
                        variant="arrow"
                        color="currentColor"
                        strokeWidth={2}
                        className="h-6 w-full -scale-y-100"
                        delay={300}
                      />
                    </div>
                    <span>this part scares them. then it doesn&apos;t.</span>
                  </div>
                </div>
              </div>

              <div className="mt-16 md:mt-20">
                <PullQuote by="Hari · coach">
                  The bowl was supposed to be small. Then more kids came.
                </PullQuote>
              </div>

              <div className="mt-10">
                <Link href="/practice" className="btn-zine btn-zine--ghost">
                  See practice hours <Arrow />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Soft drift marquee */}
      <Marquee variant="lime" slow>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="inline-flex items-center gap-8">
            <StarBurst className="text-terracotta" />
            HELMETS · PADS · CONFIDENCE
          </span>
        ))}
        <StarBurst className="text-terracotta" />
      </Marquee>

      {/* ============================================================
          CLASSES × PRACTICE — unequal cards
          Classes is the headline (60% / taller), Practice is the supporting (40%)
          ============================================================ */}
      <section className="container py-20 md:py-28">
        <Reveal>
          <div className="mb-14 grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="s-num-zine mb-3">[ 01 / WHAT WE OFFER ]</div>
              <h2 className="font-display text-5xl font-medium leading-[0.95] -tracking-[0.02em] md:text-7xl">
                Two ways{" "}
                <span className="italic text-sage-deep">in.</span>
              </h2>
            </div>
            <p className="text-base leading-relaxed text-ink/70 md:text-lg">
              Coached classes for kids learning their first push. Hourly bowl
              access for the ones who already know.
            </p>
          </div>
        </Reveal>

        <Reveal stagger className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <Link
            href="/classes"
            className="card-soft group relative flex min-h-[480px] flex-col overflow-hidden p-8 transition-transform duration-500 hover:-translate-y-1 md:min-h-[560px] md:p-12"
          >
            <div className="mb-8 flex items-baseline justify-between">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                01 · CLASSES
              </div>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sand transition-transform duration-300 group-hover:translate-x-1">
                <Arrow size={14} />
              </span>
            </div>
            <h3 className="font-display text-[44px] font-medium leading-[0.95] -tracking-[0.02em] text-ink md:text-[68px]">
              Coached.
              <br />
              <span className="italic text-terracotta">Not bossed.</span>
            </h3>
            <p className="mt-6 max-w-[420px] text-[15px] leading-relaxed text-ink/75 md:text-base">
              1-on-1 and small-group coaching for kids. Beginner to skilled.
              We start where they stand and build up &mdash; pushing, carving,
              dropping in, first ollie.
            </p>
            <ul className="mt-auto space-y-2.5 pt-10 font-mono text-[12px] uppercase tracking-[0.16em] text-ink/65">
              {[
                "Beginner foundations",
                "Intermediate · drop-ins",
                "Skilled · bowl flow",
                "1-on-1 coaching",
              ].map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="h-px w-5 bg-terracotta" />
                  {b}
                </li>
              ))}
            </ul>
          </Link>

          <Link
            href="/practice"
            className="card-soft group relative flex min-h-[420px] flex-col overflow-hidden p-8 transition-transform duration-500 hover:-translate-y-1 md:min-h-[560px]"
          >
            <div className="mb-8 flex items-baseline justify-between">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                02 · PRACTICE
              </div>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sand transition-transform duration-300 group-hover:translate-x-1">
                <Arrow size={14} />
              </span>
            </div>
            <h3 className="font-display text-[36px] font-medium leading-[0.98] -tracking-[0.02em] text-ink md:text-[48px]">
              Bowl time.
              <br />
              <span className="italic text-sage-deep">By the hour.</span>
            </h3>
            <p className="mt-5 text-[14px] leading-relaxed text-ink/75">
              Independent skaters welcome. The bowl is yours by the hour
              &mdash; quiet mornings, peak evenings.
            </p>
            <ul className="mt-auto space-y-2.5 pt-8 font-mono text-[12px] uppercase tracking-[0.16em] text-ink/65">
              {[
                "Hourly access",
                "Helmets at the bench",
                "Walk-ins always OK",
                "Open 06:00 – 21:00",
              ].map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="h-px w-5 bg-sage-deep" />
                  {b}
                </li>
              ))}
            </ul>
          </Link>
        </Reveal>
      </section>

      {/* ============================================================
          THE GARDEN — full bleed, no container, editorial caption strip
          ============================================================ */}
      <section className="relative pt-12 md:pt-20">
        <Reveal>
          <div className="container mb-8 md:mb-12">
            <div className="grid items-end gap-6 md:grid-cols-[1.2fr_1fr]">
              <h2 className="font-display text-5xl font-medium leading-[0.95] -tracking-[0.02em] md:text-7xl">
                A garden{" "}
                <span className="italic text-terracotta">
                  with a bowl in it.
                </span>
              </h2>
              <p className="text-base leading-relaxed text-ink/70 md:text-lg">
                We didn&apos;t build a skatepark. We built a place to spend
                the afternoon &mdash; that happens to have a bowl in the
                middle. Mosaic walkways, shade trees, water at the edge.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Full-bleed photo */}
        <div className="photo-light-shift relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
          <Duotone
            src="/photos/bowl-mosaic.jpg"
            alt="The bowl set in a warm mosaic-tiled garden with grass islands and a red sculpture"
            variant="warm"
            sizes="100vw"
            className="absolute inset-0"
          />
        </div>

        {/* Editorial caption strip */}
        <div className="container py-6 md:py-8">
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-ink/15 pt-6">
            <PhotoCaption
              parts={[
                "PHOTO · HARI",
                "MOSAIC · GRASS · SHADE",
                "STEEZ BOWL · HYD",
              ]}
            />
            <Link
              href="/about"
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-terracotta transition-colors hover:text-terracotta-deep"
            >
              More about the space <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          THE COACH — sepia-tinted card, pull quote from bio
          ============================================================ */}
      <section className="container py-20 md:py-28">
        <Reveal>
          <div className="mb-12 grid items-end gap-6 border-b border-ink/15 pb-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="s-num-zine mb-3">[ 02 / THE COACH ]</div>
              <h2 className="font-display text-5xl font-medium leading-[0.95] -tracking-[0.02em] md:text-7xl">
                Hari runs{" "}
                <span className="italic text-sage-deep">this place.</span>
              </h2>
            </div>
            <p className="text-base leading-relaxed text-ink/70 md:text-lg">
              One person. One bowl. Seven years of teaching kids their
              first push.
            </p>
          </div>
        </Reveal>

        <Reveal className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-start md:gap-14">
          <div
            className="card-soft relative aspect-[4/5] overflow-hidden bg-sand"
            style={{ filter: "sepia(0.35) saturate(0.95)" }}
          >
            <CoachPortraitSVG />
            <div className="pointer-events-none absolute inset-0 bg-terracotta/8 mix-blend-multiply" />
            <div className="absolute bottom-4 left-4 rounded-full bg-sun px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink shadow-soft">
              HARI · COACH · ⌖ HYD
            </div>
          </div>
          <div>
            {bioText.map((para, i) => (
              <p
                key={i}
                className="mb-4 text-base leading-relaxed text-ink/80 md:text-lg"
                dangerouslySetInnerHTML={{
                  __html: para.replace(
                    /\*\*(.+?)\*\*/g,
                    '<strong class="font-semibold text-terracotta">$1</strong>'
                  ),
                }}
              />
            ))}

            <div className="mt-12">
              <PullQuote>
                If your kid has never stood on a board &mdash; they&apos;ll
                stand on one this week. That&apos;s the deal.
              </PullQuote>
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/10 md:grid-cols-4">
              {COACH_STATS.map((stat) => (
                <li key={stat.k} className="bg-sand p-5">
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    {stat.k}
                  </div>
                  <div className="nums font-display text-3xl font-medium text-ink">
                    {stat.v}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ============================================================
          RESTRAINT MOMENT — just a phrase, surrounded by air.
          Patagonia-style: white space carries the message.
          ============================================================ */}
      <section className="container py-24 md:py-32">
        <Reveal>
          <figure className="mx-auto max-w-[820px] text-center">
            <p className="font-display text-[34px] font-medium leading-[1.15] -tracking-[0.01em] text-ink md:text-[56px] md:leading-[1.1]">
              340 kids. One bowl. Since 2019.{" "}
              <span className="italic text-sage-deep">
                The bowl hasn&apos;t changed.
              </span>{" "}
              The coach hasn&apos;t changed.{" "}
              <span className="italic text-terracotta">
                The kids keep showing up.
              </span>
            </p>
            <figcaption className="mt-8 inline-flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-ink/35" />
              <PhotoCaption
                parts={["STEEZ", "EST · 2019", "BANJARA HILLS · HYD"]}
              />
              <span aria-hidden className="h-px w-10 bg-ink/35" />
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* ============================================================
          CLOSING CTA — restraint move. Big phrase, tiny button, credit.
          ============================================================ */}
      <section className="relative">
        <div className="container pb-28 pt-12 md:pb-36">
          <Reveal>
            <div className="card-soft relative overflow-hidden p-10 md:p-16">
              <div className="pointer-events-none absolute -right-10 -top-10 opacity-60 md:-right-4 md:-top-4">
                <SunMark size={200} />
              </div>
              <div className="pointer-events-none absolute -bottom-2 left-6 opacity-50">
                <LeafDivider variant="banana" size={110} />
              </div>

              <div className="relative grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-end">
                <div>
                  <div className="eyebrow-zine mb-5">[ Show up ]</div>
                  <h2 className="font-display text-[44px] font-medium leading-[0.95] -tracking-[0.02em] text-ink md:text-[88px]">
                    Walk in.
                    <br />
                    Get a helmet.{" "}
                    <span className="italic text-terracotta">Try.</span>
                  </h2>
                  <p className="mt-6 max-w-[460px] text-base leading-relaxed text-ink/70 md:text-lg">
                    One WhatsApp message and Hari will hold a spot. No forms,
                    no deposit. You can drop by to watch a session first if
                    you want.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-3 md:items-end">
                  <WhatsAppCTA
                    intent="general"
                    className="btn-zine btn-zine--red"
                  >
                    <WhatsAppIcon size={18} /> WhatsApp Hari{" "}
                    <Arrow size={16} />
                  </WhatsAppCTA>
                  <Link href="/classes" className="btn-zine btn-zine--ghost">
                    See classes <Arrow size={16} />
                  </Link>
                  <div className="mt-6 w-full border-t border-ink/15 pt-5 font-mono md:max-w-[260px]">
                    <div className="mb-2 text-[10px] uppercase tracking-[0.22em] text-ink/55">
                      Bowl hours
                    </div>
                    <div className="py-0.5 text-[13px] font-semibold">
                      MON–SAT · 06:00–21:00
                    </div>
                    <div className="py-0.5 text-[13px] font-semibold">
                      SUN · 06:00–13:00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
