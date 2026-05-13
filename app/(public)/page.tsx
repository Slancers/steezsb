import Image from "next/image";
import Link from "next/link";

import { LeafDivider, LeafRow } from "@/components/effects/LeafDivider";
import { Marquee } from "@/components/effects/Marquee";
import { PhotoHero } from "@/components/effects/PhotoHero";
import { Reveal } from "@/components/effects/Reveal";
import { SunMark } from "@/components/effects/SunMark";
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
    icon: <GlyphHelmet size={120} />,
    href: "/classes",
    iconColor: "text-terracotta",
    accent: "terracotta",
  },
  {
    num: "02",
    tag: "PRACTICE",
    title: ["Bowl time.", "By the hour."],
    desc: "Independent skaters welcome. The bowl is yours by the hour — quiet mornings, peak evenings, helmets in the rack, water at the bench.",
    chips: ["Hourly", "Bowl access", "Helmets"],
    icon: <GlyphBowl size={120} />,
    href: "/practice",
    iconColor: "text-sage",
    accent: "sage",
  },
  {
    num: "03",
    tag: "KIT",
    title: ["Everything", "to start."],
    desc: "Starter decks, trucks, wheels, helmets, pads. Nothing fancy you don't need. Walk in, walk out skating.",
    chips: ["Decks", "Helmets", "Stickers"],
    icon: <GlyphDeck size={120} />,
    href: "/shop",
    iconColor: "text-sun-deep",
    accent: "sun",
  },
];

export default async function HomePage() {
  const settings = await getSiteSettings();
  const bioText = settings?.about?.bio
    ? settings.about.bio.split("\n\n")
    : COACH_BIO_FALLBACK;

  return (
    <>
      {/* HERO — photo-led, "Room to roll." */}
      <div className="-mt-[100px] md:-mt-[108px]">
        <PhotoHero
          src="/photos/bowl-palms.jpg"
          alt="STEEZ skate bowl framed by palm trees and tropical greenery"
          priority
          overlay="from-ink/65 via-ink/20 to-ink/10"
        >
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center gap-2 md:mb-8">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sand/30 bg-sand/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sand backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-sage-light" />
                LIVE · HYD
              </span>
              <span className="inline-flex items-center rounded-full border border-sand/30 bg-sand/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sand backdrop-blur">
                EST · 2019
              </span>
              <span className="inline-flex items-center rounded-full bg-sun/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur">
                COACHED · BY HARI
              </span>
            </div>
          </Reveal>

          <Reveal>
            <h1 className="font-display text-[clamp(60px,12vw,200px)] font-medium leading-[0.95] -tracking-[0.025em] text-sand">
              Room to roll.
            </h1>
          </Reveal>

          <Reveal>
            <p className="mt-6 max-w-[560px] text-base leading-relaxed text-sand/90 md:text-lg">
              Skateboarding in Hyderabad, under open skies. A bowl framed by
              trees, a kit shop you walk in and out of, and one coach who
              actually skates with you.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-9 flex flex-wrap gap-3">
              <WhatsAppCTA intent="class" className="btn-zine btn-zine--red">
                <WhatsAppIcon size={16} /> WhatsApp Hari
              </WhatsAppCTA>
              <Link
                href="/classes"
                className="btn-zine bg-sand text-ink hover:bg-sand"
              >
                Book a class <Arrow />
              </Link>
            </div>
          </Reveal>
        </PhotoHero>
      </div>

      {/* INTRO STRIP — calm transition out of the photo */}
      <section className="relative">
        <div className="container py-16 md:py-20">
          <Reveal className="grid items-end gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="eyebrow-zine mb-4">SKATE · STAY · BREATHE</div>
              <h2 className="s-title-zine">
                Skating, the slow way.
              </h2>
            </div>
            <p className="text-base leading-relaxed text-ink/70 md:text-lg">
              No hype. No pressure. Just concrete, sky, and the rhythm of
              learning something with your whole body. Whether it's your first
              push or your tenth year, the bowl is open.
            </p>
          </Reveal>
        </div>

        {/* Decorative sun in top right of this section */}
        <div className="pointer-events-none absolute right-4 top-6 opacity-90 md:right-12">
          <SunMark size={110} />
        </div>
      </section>

      {/* Soft marquee, slow */}
      <Marquee variant="lime" slow>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="inline-flex items-center gap-8">
            <StarBurst className="text-terracotta" />
            CLASSES — PRACTICE — KIT
          </span>
        ))}
        <StarBurst className="text-terracotta" />
      </Marquee>

      {/* PHOTO BLOCK 1 — The Bowl */}
      <section className="container py-20 md:py-28">
        <Reveal className="grid items-center gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <div>
            <div className="eyebrow-zine mb-4">[ THE BOWL ]</div>
            <h2 className="font-display text-5xl font-medium leading-[1.0] -tracking-[0.02em] md:text-6xl">
              Smooth concrete.
              <br />
              <span className="text-sage-deep">Open sky.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink/75 md:text-lg">
              A purpose-built bowl with mellow transitions for first-timers and
              tight pockets for the season pros. Banana plants on one edge,
              jacarandas on the other, and a bench in the shade for when you
              need it.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-ink/15 pt-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                  Depth
                </div>
                <div className="font-display text-2xl font-medium">4 – 7 ft</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                  Surface
                </div>
                <div className="font-display text-2xl font-medium">
                  Hand-troweled
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/practice" className="btn-zine btn-zine--ghost">
                See practice hours <Arrow />
              </Link>
            </div>
          </div>
          <div className="photo-grain relative aspect-[4/5] overflow-hidden rounded-3xl border border-ink/10 shadow-soft-lg md:aspect-[5/6]">
            <Image
              src="/photos/bowl-side.jpg"
              alt="STEEZ bowl from the side, concrete curves and green sculpture in the background"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </Reveal>
      </section>

      {/* OFFERS — soft cards */}
      <section className="container py-16 md:py-20">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-ink/15 pb-10">
            <div>
              <div className="s-num-zine mb-2">[ 01 / WHAT WE OFFER ]</div>
              <h2 className="s-title-zine">
                Three things.
                <br />
                <span className="text-terracotta">That&apos;s it.</span>
              </h2>
            </div>
            <p className="max-w-[340px] text-[14px] leading-relaxed text-ink/70">
              No gimmicks. No upsells. Show up — board or no board — and
              we&apos;ll meet you where you are.
            </p>
          </div>
        </Reveal>

        <Reveal stagger className="grid gap-6 md:grid-cols-3">
          {OFFERS.map((offer) => (
            <Link
              key={offer.href}
              href={offer.href}
              className="card-soft group relative flex min-h-[440px] flex-col overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                [ {offer.num} · {offer.tag} ]
              </div>
              <div
                className={`my-5 flex h-[120px] items-center ${offer.iconColor}`}
              >
                {offer.icon}
              </div>
              <h3 className="font-display text-[34px] font-medium leading-[1.0] -tracking-[0.02em] md:text-4xl">
                {offer.title.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h3>
              <p className="mt-4 flex-1 text-[14px] leading-relaxed text-ink/70">
                {offer.desc}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4 font-mono text-[11px] uppercase tracking-widest">
                <div className="flex flex-wrap gap-1.5">
                  {offer.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-ink/15 px-2 py-0.5 text-[10px] tracking-[0.1em] text-ink/70"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sand transition-transform duration-200 group-hover:translate-x-0.5">
                  <Arrow size={14} />
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
      </section>

      <LeafRow />

      {/* PHOTO BLOCK 2 — Our space (mosaic photo) */}
      <section className="container py-20 md:py-24">
        <Reveal className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <div className="photo-grain relative aspect-[5/6] overflow-hidden rounded-3xl border border-ink/10 shadow-soft-lg md:aspect-[4/5]">
            <Image
              src="/photos/bowl-mosaic.jpg"
              alt="The bowl with warm mosaic tile flooring, grass islands and a red sculpture"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div>
            <div className="eyebrow-zine mb-4">[ OUR SPACE ]</div>
            <h2 className="font-display text-5xl font-medium leading-[1.0] -tracking-[0.02em] md:text-6xl">
              A garden.
              <br />
              <span className="text-terracotta">With a bowl in it.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink/75 md:text-lg">
              We didn&apos;t build a skatepark. We built a place to spend the
              afternoon — that happens to have a world-class bowl in the
              middle. Mosaic walkways, grass to flop on, shade trees,
              cold water.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn-zine btn-zine--ghost">
                More about us <Arrow />
              </Link>
              <Link href="/contact" className="btn-zine btn-zine--lime">
                Visit the bowl <Arrow />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* COACH */}
      <section className="container py-20 md:py-24">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-ink/15 pb-10">
            <div>
              <div className="s-num-zine mb-2">[ 02 / THE COACH ]</div>
              <h2 className="s-title-zine">
                Hari runs
                <br />
                <span className="text-sage-deep">this place.</span>
              </h2>
            </div>
            <p className="max-w-[340px] text-[14px] leading-relaxed text-ink/70">
              One person. One bowl. Seven years of teaching people their
              first push.
            </p>
          </div>
        </Reveal>

        <Reveal className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-start">
          <div className="card-soft relative aspect-[4/5] overflow-hidden bg-sand">
            <CoachPortraitSVG />
            <div className="absolute bottom-4 left-4 rounded-full bg-sun px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink shadow-soft">
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
            <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/10 md:grid-cols-4">
              {COACH_STATS.map((stat) => (
                <li key={stat.k} className="bg-sand p-5">
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">
                    {stat.k}
                  </div>
                  <div className="font-display text-3xl font-medium -tracking-[0.01em]">
                    {stat.v}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* CLOSING CTA */}
      <section className="container relative py-20 md:py-28">
        <Reveal className="card-soft relative overflow-hidden p-10 md:p-16">
          <div className="pointer-events-none absolute -right-8 -top-8 opacity-80">
            <SunMark size={180} />
          </div>
          <div className="pointer-events-none absolute -bottom-4 left-8 opacity-60">
            <LeafDivider variant="banana" size={120} />
          </div>

          <div className="relative grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div>
              <div className="eyebrow-zine mb-4">[ 03 / SHOW UP ]</div>
              <h2 className="font-display text-5xl font-medium leading-[1.0] -tracking-[0.02em] md:text-7xl">
                Book a class.
                <br />
                <span className="text-terracotta">Or just drop by.</span>
              </h2>
              <p className="mt-6 max-w-[440px] text-base leading-relaxed text-ink/70">
                Walk-ins welcome any open hour. Or send Hari a WhatsApp — he
                replies fast and won&apos;t bug you for a booking form.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3">
              <WhatsAppCTA intent="general" className="btn-zine btn-zine--red">
                <WhatsAppIcon size={18} /> WhatsApp Hari <Arrow size={16} />
              </WhatsAppCTA>
              <Link href="/classes" className="btn-zine btn-zine--ghost">
                See classes <Arrow size={16} />
              </Link>
              <div className="mt-4 w-full border-t border-ink/15 pt-4 font-mono">
                <div className="mb-2 text-[11px] uppercase tracking-[0.16em] text-ink/55">
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
          </div>
        </Reveal>
      </section>
    </>
  );
}
