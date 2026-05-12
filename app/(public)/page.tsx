import Link from "next/link";

import { Deck3D } from "@/components/effects/Deck3D";
import { Marquee } from "@/components/effects/Marquee";
import { Reveal } from "@/components/effects/Reveal";
import {
  Arrow,
  CoachPortraitSVG,
  GlyphBowl,
  GlyphDeck,
  GlyphHelmet,
  StarBurst,
  WhatsAppIcon,
} from "@/components/icons/zine";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { buildMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/queries";

export const metadata = buildMetadata({
  title: "STEEZ — Skateboarding Coaching · Hyderabad",
  description:
    "Skateboarding classes, hourly bowl practice, and gear for kids and adults in Hyderabad. Coached by Hari.",
  path: "/",
});

const COACH_BIO_FALLBACK = [
  "I started skating in **2009** on a borrowed board in Banjara Hills. I taught my first class in 2019 because someone asked me to. I never stopped.",
  "STEEZ is small on purpose. It's me, the bowl, and a tight kit shop. I want you skating, not enrolled.",
  "If you've never stood on a board — you'll stand on one this week. That's the deal.",
];

const COACH_STATS = [
  { k: "EST.", v: "2019" },
  { k: "STUDENTS", v: "340+" },
  { k: "BOWL HRS / WK", v: "52" },
  { k: "FIRST OLLIES", v: "∞" },
];

const OFFERS = [
  {
    num: "01",
    tag: "CLASSES",
    title: ["Coached.", "Not bossed."],
    desc: "1-on-1 and group coaching. Beginner to skilled. We start where you stand and build up — pushing, carving, dropping in, your first ollie.",
    chips: ["Beginner", "Intermediate", "Skilled"],
    color: "red" as const,
    icon: <GlyphHelmet size={140} />,
    href: "/classes",
    iconColor: "text-steeze-red",
    hoverShadow: "hover:shadow-hard-r",
  },
  {
    num: "02",
    tag: "PRACTICE",
    title: ["Bowl time.", "By the hour."],
    desc: "Independent skaters welcome. The bowl is yours by the hour — quiet mornings, peak evenings, helmets in the rack, water at the bench.",
    chips: ["Hourly", "Bowl access", "Helmets"],
    color: "blue" as const,
    icon: <GlyphBowl size={140} />,
    href: "/practice",
    iconColor: "text-steeze-blue",
    hoverShadow: "hover:shadow-hard-b",
  },
  {
    num: "03",
    tag: "KIT",
    title: ["Everything", "to start."],
    desc: "Starter decks, trucks, wheels, helmets, pads. Nothing fancy you don't need. Walk in, walk out skating.",
    chips: ["Decks", "Helmets", "Stickers"],
    color: "lime" as const,
    icon: <GlyphDeck size={140} />,
    href: "/shop",
    iconColor: "text-ink",
    hoverShadow: "hover:shadow-hard-l",
  },
];

export default async function HomePage() {
  const settings = await getSiteSettings();
  const bioText =
    settings?.about?.bio
      ? settings.about.bio.split("\n\n")
      : COACH_BIO_FALLBACK;

  return (
    <>
      {/* HERO */}
      <section className="container relative pb-24 pt-12 md:pt-20">
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-12">
          <div className="relative z-10">
            <Reveal>
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="chip-zine chip-zine--live">LIVE · HYD</span>
                <span className="chip-zine">EST · 2019</span>
                <span className="chip-zine chip-zine--blue">
                  COACHED · BY HARI
                </span>
              </div>
            </Reveal>

            <Reveal>
              <h1 className="font-display font-bold uppercase leading-[0.82] -tracking-[0.05em]">
                <span
                  className="block text-[clamp(64px,11vw,180px)]"
                  style={{ textShadow: "5px 5px 0 #FF2D2D" }}
                >
                  SKATE
                </span>
                <span className="block text-[clamp(64px,11vw,180px)]">
                  <span
                    className="text-transparent"
                    style={{ WebkitTextStroke: "2px #0E0D0B" }}
                  >
                    OR&nbsp;
                  </span>
                  <span>
                    DON&apos;T
                    <span className="ml-2 inline-block h-[0.85em] w-[0.6em] -translate-y-0.5 animate-blink bg-steeze-red align-baseline" />
                  </span>
                </span>
              </h1>
            </Reveal>

            <Reveal>
              <p className="mt-8 max-w-[480px] text-[15px] leading-relaxed text-ink-soft">
                Skateboarding coaching in{" "}
                <strong className="bg-steeze-lime px-1 font-semibold text-ink">
                  Hyderabad
                </strong>
                . Classes, hourly bowl access, and a starter kit — all in one
                room. Beginner-friendly. Skilled-welcome.{" "}
                <strong className="bg-steeze-lime px-1 font-semibold text-ink">
                  Coached by Hari.
                </strong>
              </p>
            </Reveal>

            <Reveal>
              <div className="mt-9 flex flex-wrap gap-3.5">
                <WhatsAppCTA intent="class" className="btn-zine">
                  <WhatsAppIcon size={16} /> WhatsApp Hari
                </WhatsAppCTA>
                <Link href="/classes" className="btn-zine btn-zine--ghost">
                  Book a class <Arrow />
                </Link>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-12 grid grid-cols-3 border-y-[1.5px] border-ink">
                <div className="border-r-[1.5px] border-ink py-4 pr-4">
                  <div className="mb-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink/60">
                    [ Location ]
                  </div>
                  <div className="font-display text-lg font-bold -tracking-[0.02em]">
                    Hyderabad, IN
                  </div>
                </div>
                <div className="border-r-[1.5px] border-ink px-4 py-4">
                  <div className="mb-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink/60">
                    [ Booking ]
                  </div>
                  <div className="font-display text-lg font-bold -tracking-[0.02em]">
                    WhatsApp
                  </div>
                </div>
                <div className="py-4 pl-4">
                  <div className="mb-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink/60">
                    [ Bowl ]
                  </div>
                  <div className="font-display text-lg font-bold -tracking-[0.02em]">
                    Open · 06–21
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="order-first md:order-none">
            <Deck3D />
          </div>
        </div>
      </section>

      {/* MARQUEE — dark */}
      <Marquee variant="dark">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="inline-flex items-center gap-8">
            <StarBurst
              className={
                ["text-steeze-red", "text-steeze-lime", "text-steeze-blue", "text-paper"][i]
              }
            />
            CLASSES — PRACTICE — KIT
          </span>
        ))}
        <StarBurst className="text-steeze-red" />
      </Marquee>

      {/* OFFERS */}
      <section className="container py-20 md:py-24">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b-[1.5px] border-ink pb-10">
            <div>
              <div className="s-num-zine mb-2">[ 01 / WHAT WE OFFER ]</div>
              <h2 className="s-title-zine">
                three things.
                <br />
                <span className="text-steeze-red">that&apos;s it.</span>
              </h2>
            </div>
            <p className="max-w-[320px] text-[13px] leading-relaxed text-ink-soft">
              no gimmicks. no upsells. show up — board or no board — and
              we&apos;ll meet you where you are.
            </p>
          </div>
        </Reveal>

        <Reveal stagger className="grid gap-6 md:grid-cols-3">
          {OFFERS.map((offer) => (
            <Link
              key={offer.href}
              href={offer.href}
              className={`group relative flex min-h-[460px] flex-col overflow-hidden border-[1.5px] border-ink bg-paper p-7 transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 ${offer.hoverShadow}`}
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
                [ {offer.num} · {offer.tag} ]
              </div>
              <div
                className={`my-5 flex h-[140px] items-center ${offer.iconColor}`}
              >
                {offer.icon}
              </div>
              <h3 className="font-display text-4xl font-bold uppercase leading-[0.9] -tracking-[0.04em] md:text-[44px]">
                {offer.title.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h3>
              <p className="mt-3.5 flex-1 text-[13px] leading-relaxed text-ink-soft">
                {offer.desc}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-dashed border-ink/40 pt-4 font-mono text-[11px] uppercase tracking-widest">
                <div className="flex flex-wrap gap-1.5">
                  {offer.chips.map((c) => (
                    <span
                      key={c}
                      className="border border-ink/40 px-1.5 py-0.5 text-[10px] tracking-[0.1em]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <span className="inline-flex h-8 w-8 items-center justify-center bg-ink text-paper transition-transform duration-150 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <Arrow size={14} />
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* MARQUEE — red, reverse */}
      <Marquee variant="red" reverse>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="inline-flex items-center gap-8">
            {i === 0 ? <StarBurst /> : null}
            WHATSAPP HARI <Arrow size={32} />
          </span>
        ))}
      </Marquee>

      {/* COACH */}
      <section className="container py-20 md:py-24">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b-[1.5px] border-ink pb-10">
            <div>
              <div className="s-num-zine mb-2">[ 02 / THE COACH ]</div>
              <h2 className="s-title-zine">
                hari runs
                <br />
                this place.
              </h2>
            </div>
            <p className="max-w-[320px] text-[13px] leading-relaxed text-ink-soft">
              one person. one bowl. seven years of teaching people their
              first push.
            </p>
          </div>
        </Reveal>

        <Reveal className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-start">
          <div className="relative aspect-[4/5] overflow-hidden border-[1.5px] border-ink bg-ink">
            <CoachPortraitSVG />
            <div className="absolute bottom-4 left-4 border-[1.5px] border-ink bg-steeze-lime px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
              HARI · COACH · ⌖ HYD
            </div>
          </div>
          <div>
            {bioText.map((para, i) => (
              <p
                key={i}
                className="mb-4 text-[16px] leading-relaxed text-ink-soft"
                dangerouslySetInnerHTML={{
                  __html: para.replace(
                    /\*\*(.+?)\*\*/g,
                    '<strong class="bg-steeze-lime px-1 font-semibold text-ink">$1</strong>'
                  ),
                }}
              />
            ))}
            <ul className="mt-6 grid grid-cols-2 border-y-[1.5px] border-ink md:grid-cols-4">
              {COACH_STATS.map((stat, i) => (
                <li
                  key={stat.k}
                  className={`py-4 ${
                    i === 0 ? "pr-4" : "px-3"
                  } ${i < COACH_STATS.length - 1 ? "border-r border-ink/20" : ""}`}
                >
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">
                    {stat.k}
                  </div>
                  <div className="font-display text-3xl font-bold -tracking-[0.02em]">
                    {stat.v}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* MARQUEE — lime, slow */}
      <Marquee variant="lime" slow>
        <span>↓</span>
        <StarBurst /> KICKFLIP <StarBurst /> POP-SHOVE <StarBurst /> DROP-IN{" "}
        <StarBurst /> CARVE <StarBurst /> ROCK-TO-FAKIE <StarBurst /> 50-50{" "}
        <StarBurst /> NO-COMPLY <StarBurst /> MANUAL
        <span>↓</span>
      </Marquee>

      {/* CLOSING CTA */}
      <section className="container py-20 md:py-28">
        <Reveal className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:items-center">
          <div>
            <div className="eyebrow-zine mb-4">[ 03 / SHOW UP ]</div>
            <h2 className="font-display text-5xl font-bold uppercase leading-[0.9] -tracking-[0.04em] md:text-7xl lg:text-[7.5rem]">
              <span>Book </span>
              <span
                style={{
                  color: "#FF2D2D",
                  textShadow: "5px 5px 0 #0E0D0B",
                }}
              >
                a class.
              </span>
              <br />
              <span>Or just</span>
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "2px #0E0D0B" }}
              >
                drop by.
              </span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4">
            <WhatsAppCTA intent="general" className="btn-zine btn-zine--red">
              <WhatsAppIcon size={18} /> WhatsApp Hari <Arrow size={16} />
            </WhatsAppCTA>
            <Link href="/classes" className="btn-zine btn-zine--ghost">
              See classes <Arrow size={16} />
            </Link>
            <div className="mt-4 w-full border-t border-ink/20 pt-4 font-mono">
              <div className="mb-2 text-[11px] uppercase tracking-[0.16em] text-ink/60">
                Bowl Hours
              </div>
              <div className="py-1 text-sm font-semibold">
                MON–SAT · 06:00–21:00
              </div>
              <div className="py-1 text-sm font-semibold">SUN · 06:00–13:00</div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
