import Image from "next/image";
import Link from "next/link";

import { Marquee } from "@/components/effects/Marquee";
import { PhotoHero } from "@/components/effects/PhotoHero";
import { Reveal } from "@/components/effects/Reveal";
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
  title: "STEEZ — Skateboarding for Kids · Hyderabad",
  description:
    "Skateboarding classes for kids in Hyderabad. Helmets + pads provided, small groups, coached by Hari since 2019.",
  path: "/",
});

const COACH_BIO_FALLBACK = [
  "I started skating in **2009** on a borrowed board in Banjara Hills. I taught my first class in 2019 because someone asked me to. I never stopped.",
  "Groups stay small so every kid gets time on the board. Helmets and pads are on the rack — no one skates without them. Parents are welcome to watch from the bench.",
  "If your kid has never stood on a board — they'll stand on one this week. That's the deal.",
];

const COACH_STATS = [
  { k: "EST.", v: "2019" },
  { k: "STUDENTS", v: "340+" },
  { k: "BOWL HRS / WK", v: "52" },
  { k: "AGES", v: "5–16" },
];

const TRACKS = [
  {
    name: "Classes",
    tag: "GROUP & 1-ON-1",
    desc: "Coached sessions for beginners through skilled. Small groups, helmets + pads provided, structured progression — pushing, carving, dropping in, ollies.",
    bullets: [
      "Beginner foundations",
      "Intermediate flow + drop-ins",
      "Skilled bowl session",
      "1-on-1 coaching",
    ],
    cta: "Book a class",
    href: "/classes",
  },
  {
    name: "Practice",
    tag: "BOWL ACCESS",
    desc: "Independent skaters welcome by the hour. Quiet mornings, peak evenings, helmets at the bench. Bowl built for first drop-ins and tight pockets alike.",
    bullets: [
      "Hourly bowl access",
      "Helmets on the rack",
      "Open 06:00 – 21:00",
      "Walk-ins always OK",
    ],
    cta: "See practice hours",
    href: "/practice",
  },
];

const AMENITIES = [
  {
    title: "The Bowl",
    desc: "Hand-troweled concrete, mellow transitions for new skaters, tight pockets for the season pros.",
    img: "/photos/bowl-side.jpg",
    href: "/practice",
  },
  {
    title: "The Kit Shop",
    desc: "Starter decks, helmets, pads, wheels, stickers. Walk in, walk out skating — nothing fancy you don't need.",
    img: "/photos/bowl-mosaic.jpg",
    href: "/shop",
  },
  {
    title: "The Garden",
    desc: "Shade trees, benches for parents, water at the bowl edge. Skating, the way you remember it should be.",
    img: "/photos/bowl-palms.jpg",
    href: "/about",
  },
];

export default async function HomePage() {
  const settings = await getSiteSettings();
  const bioText = settings?.about?.bio
    ? settings.about.bio.split("\n\n")
    : COACH_BIO_FALLBACK;

  return (
    <>
      {/* HERO — full-bleed kids photo, condensed display, dark gradient */}
      <div className="-mt-[100px] md:-mt-[108px]">
        <PhotoHero
          src="/photos/kids-class.jpg"
          alt="Kids in colorful helmets and pads skating in the STEEZ bowl during a class"
          priority
          overlay="from-night via-night/55 to-night/35"
          height="h-screen min-h-[680px]"
        >
          <Reveal>
            <div className="mb-8 flex flex-wrap items-center gap-2">
              <span className="chip-zine chip-zine--live">LIVE · HYD</span>
              <span className="chip-zine">EST · 2019</span>
              <span className="chip-zine chip-zine--red">AGES 5 – 16</span>
            </div>
          </Reveal>

          <Reveal>
            <h1 className="display-xl text-cream">
              Raise
              <br />
              <span className="text-steeze-red">a skater.</span>
            </h1>
          </Reveal>

          <Reveal>
            <p className="mt-8 max-w-[560px] text-lg leading-relaxed text-cream/85 md:text-xl">
              Skateboarding for kids in Hyderabad. Helmets on. Pads on. One
              coach who skates with them, in a bowl built for first drop-ins.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-10 flex flex-wrap gap-3">
              <WhatsAppCTA intent="class" className="btn-zine btn-zine--red">
                <WhatsAppIcon size={16} /> Book your first class
              </WhatsAppCTA>
              <Link href="/classes" className="btn-zine btn-zine--ghost">
                See classes <Arrow />
              </Link>
            </div>
          </Reveal>
        </PhotoHero>
      </div>

      {/* TRUST STRIP — bold numbers on dark */}
      <section className="border-t border-night-line">
        <div className="container grid grid-cols-2 divide-x divide-night-line border-x border-night-line md:grid-cols-4">
          {[
            { k: "Coached since", v: "2019" },
            { k: "Students", v: "340+" },
            { k: "Group size", v: "4 – 6" },
            { k: "Ages", v: "5 – 16" },
          ].map((it, i) => (
            <div
              key={it.k}
              className={`p-6 md:p-8 ${i >= 2 ? "border-t border-night-line md:border-t-0" : ""}`}
            >
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55">
                {it.k}
              </div>
              <div className="font-display text-5xl font-normal leading-none text-cream md:text-6xl">
                {it.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE BOWL intro — Barry's "Red Room" analog */}
      <section className="container py-24 md:py-32">
        <Reveal className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <div>
            <div className="eyebrow-zine mb-6">THE BOWL</div>
            <h2 className="display-lg text-cream">
              The best bowl
              <br />
              <span className="text-steeze-red">in Hyderabad.</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-cream/75">
              Hand-troweled concrete. Mellow transitions for first-timers, tight
              pockets for the season pros. Built for kids to fall, get up, and
              try again — in a space where the coach catches them before it
              hurts.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-night-line pt-8">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55">
                  Depth
                </div>
                <div className="font-display text-3xl font-normal text-cream">
                  4 – 7 ft
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55">
                  Surface
                </div>
                <div className="font-display text-3xl font-normal text-cream">
                  Hand-troweled
                </div>
              </div>
            </div>
          </div>
          <div className="photo-grain relative aspect-[4/5] overflow-hidden border border-night-line">
            <Image
              src="/photos/bowl-cinematic.jpg"
              alt="A young skater alone in the bowl at golden hour"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/30 to-transparent" />
          </div>
        </Reveal>
      </section>

      {/* Marquee — "JUST SEND IT" */}
      <div className="border-y border-night-line bg-night-deep">
        <Marquee variant="dark" slow>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-8">
              <StarBurst className="text-steeze-red" />
              JUST SEND IT
            </span>
          ))}
          <StarBurst className="text-steeze-red" />
        </Marquee>
      </div>

      {/* CLASSES × PRACTICE — Barry's RUN × LIFT analog */}
      <section className="container py-24 md:py-32">
        <Reveal>
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="s-num-zine mb-2">[ 01 / WHAT WE OFFER ]</div>
              <h2 className="s-title-zine">
                Classes
                <br />
                <span className="text-steeze-red">×</span> Practice
              </h2>
            </div>
            <p className="max-w-[400px] text-base leading-relaxed text-cream/70">
              Two ways in. Coached classes for kids learning their first push.
              Hourly bowl access for the ones who already know.
            </p>
          </div>
        </Reveal>

        <Reveal stagger className="grid gap-6 md:grid-cols-2">
          {TRACKS.map((track) => (
            <Link
              key={track.href}
              href={track.href}
              className="card-soft group relative flex min-h-[480px] flex-col overflow-hidden p-10 transition-colors hover:bg-night-line"
            >
              <div className="mb-8 flex items-baseline justify-between">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream/55">
                  {track.tag}
                </div>
                <span className="inline-flex h-9 w-9 items-center justify-center bg-cream text-night transition-transform duration-200 group-hover:translate-x-1">
                  <Arrow size={14} />
                </span>
              </div>
              <h3 className="display-lg text-cream">
                {track.name}
              </h3>
              <p className="mt-6 text-base leading-relaxed text-cream/75">
                {track.desc}
              </p>
              <ul className="mt-auto space-y-2 pt-8 font-mono text-[12px] uppercase tracking-[0.14em] text-cream/70">
                {track.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <span className="h-px w-4 bg-steeze-red" /> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-steeze-red">
                {track.cta} <Arrow size={12} />
              </div>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* THE COACH — instructor spotlight */}
      <section className="border-y border-night-line bg-night-soft">
        <div className="container py-24 md:py-32">
          <Reveal className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-end md:gap-20">
            <div>
              <div className="eyebrow-zine mb-6">THE COACH</div>
              <h2 className="display-lg text-cream">
                Hari runs
                <br />
                <span className="text-steeze-red">this place.</span>
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-cream/75">
                One person. One bowl. Seven years of teaching people their
                first push.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-[280px_1fr]">
              <div className="relative aspect-[4/5] overflow-hidden border border-night-line bg-night">
                <CoachPortraitSVG />
                <div className="absolute bottom-0 left-0 bg-steeze-red px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cream">
                  HARI · COACH · ⌖ HYD
                </div>
              </div>
              <div>
                {bioText.map((para, i) => (
                  <p
                    key={i}
                    className="mb-4 text-base leading-relaxed text-cream/80 md:text-lg"
                    dangerouslySetInnerHTML={{
                      __html: para.replace(
                        /\*\*(.+?)\*\*/g,
                        '<strong class="font-semibold text-steeze-red">$1</strong>'
                      ),
                    }}
                  />
                ))}
                <ul className="mt-8 grid grid-cols-2 divide-x divide-night-line border border-night-line md:grid-cols-4">
                  {COACH_STATS.map((stat, i) => (
                    <li
                      key={stat.k}
                      className={`p-5 ${i >= 2 ? "border-t border-night-line md:border-t-0" : ""}`}
                    >
                      <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/55">
                        {stat.k}
                      </div>
                      <div className="font-display text-4xl font-normal text-cream">
                        {stat.v}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* AMENITIES GRID — Barry's "Fuel Bar / Locker / Shop" analog */}
      <section className="container py-24 md:py-32">
        <Reveal>
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="s-num-zine mb-2">[ 02 / WHAT&apos;S HERE ]</div>
              <h2 className="s-title-zine">
                The whole
                <br />
                <span className="text-steeze-red">setup.</span>
              </h2>
            </div>
            <p className="max-w-[400px] text-base leading-relaxed text-cream/70">
              Bowl, kit shop, garden, shade. Everything a kid needs to start.
              Everything a parent needs to feel good about it.
            </p>
          </div>
        </Reveal>

        <Reveal stagger className="grid gap-4 md:grid-cols-3">
          {AMENITIES.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group relative aspect-[3/4] overflow-hidden border border-night-line"
            >
              <Image
                src={a.img}
                alt={a.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/10" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="display-lg text-cream" style={{ fontSize: "clamp(32px,4vw,52px)" }}>
                  {a.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-cream/80">
                  {a.desc}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-steeze-red">
                  Learn more <Arrow size={12} />
                </div>
              </div>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* SOCIAL PROOF — Barry's "8M+ Strong" analog */}
      <section className="border-t border-night-line bg-night-deep">
        <div className="container py-24 md:py-32 text-center">
          <Reveal>
            <div className="eyebrow-zine mx-auto mb-6 justify-center">SINCE 2019</div>
            <div className="font-display text-[clamp(96px,22vw,360px)] font-normal leading-[0.85] -tracking-[0.01em] text-cream">
              340<span className="text-steeze-red">+</span>
            </div>
            <div className="font-display text-3xl font-normal uppercase tracking-tight text-cream md:text-5xl">
              Kids learned to skate here.
            </div>
            <p className="mx-auto mt-6 max-w-[480px] text-base leading-relaxed text-cream/70">
              From scared-of-the-bowl to dropping in by week three. The bowl
              hasn&apos;t changed. The coach hasn&apos;t changed. The kids keep
              showing up.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CLOSING CTA — Barry's "Book your first class" */}
      <section className="relative">
        <div className="container py-24 md:py-32">
          <Reveal className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:items-end">
            <div>
              <div className="eyebrow-zine mb-6">[ 03 / SHOW UP ]</div>
              <h2 className="display-xl text-cream" style={{ fontSize: "clamp(56px,10vw,160px)" }}>
                Book the
                <br />
                <span className="text-steeze-red">first class.</span>
              </h2>
              <p className="mt-8 max-w-[500px] text-lg leading-relaxed text-cream/75">
                One WhatsApp message and Hari will hold a spot. No forms, no
                deposit. Drop by to watch a session first if you want.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <WhatsAppCTA intent="general" className="btn-zine btn-zine--red w-full justify-center">
                <WhatsAppIcon size={18} /> WhatsApp Hari <Arrow size={16} />
              </WhatsAppCTA>
              <Link href="/classes" className="btn-zine btn-zine--ghost w-full justify-center">
                See classes <Arrow size={16} />
              </Link>
              <div className="mt-6 w-full border-t border-night-line pt-6 font-mono">
                <div className="mb-2 text-[11px] uppercase tracking-[0.22em] text-cream/55">
                  Bowl Hours
                </div>
                <div className="py-1 text-sm font-semibold">
                  MON–SAT · 06:00–21:00
                </div>
                <div className="py-1 text-sm font-semibold">
                  SUN · 06:00–13:00
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
