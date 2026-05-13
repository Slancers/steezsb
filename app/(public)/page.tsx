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
  { k: "FIRST OLLIES", v: "∞" },
];

const TRUST_POINTS = [
  {
    label: "Coached since",
    value: "2019",
    sub: "By Hari · 340+ students",
  },
  {
    label: "Safety first",
    value: "Helmets + pads",
    sub: "Provided. Always.",
  },
  {
    label: "Group size",
    value: "Small",
    sub: "4–6 kids max per session",
  },
  {
    label: "Ages",
    value: "5 – 16",
    sub: "Beginners to skilled",
  },
];

const OFFERS = [
  {
    num: "01",
    tag: "CLASSES",
    title: ["Coached.", "Not bossed."],
    desc: "1-on-1 and small-group coaching for kids. Beginner to skilled. We start where they stand and build up — pushing, carving, dropping in, first ollie.",
    chips: ["Beginner", "Intermediate", "Skilled"],
    icon: <GlyphHelmet size={120} />,
    href: "/classes",
    iconColor: "text-terracotta",
  },
  {
    num: "02",
    tag: "PRACTICE",
    title: ["Bowl time.", "By the hour."],
    desc: "Independent skaters welcome. The bowl is yours by the hour — quiet mornings, peak evenings, helmets on the rack, water at the bench.",
    chips: ["Hourly", "Bowl access", "Helmets"],
    icon: <GlyphBowl size={120} />,
    href: "/practice",
    iconColor: "text-sage",
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
  },
];

export default async function HomePage() {
  const settings = await getSiteSettings();
  const bioText = settings?.about?.bio
    ? settings.about.bio.split("\n\n")
    : COACH_BIO_FALLBACK;

  return (
    <>
      {/* HERO — kids in the garden, parent-attracting */}
      <div className="-mt-[100px] md:-mt-[108px]">
        <PhotoHero
          src="/photos/bowl-garden.jpg"
          alt="Kids skateboarding through STEEZ's garden setting in Hyderabad — helmets, pads, multiple ages"
          priority
          overlay="from-ink/70 via-ink/25 to-ink/10"
          height="h-[92vh] min-h-[640px]"
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
                AGES 5 – 16
              </span>
            </div>
          </Reveal>

          <Reveal>
            <h1 className="font-display text-[clamp(56px,10vw,160px)] font-medium leading-[0.95] -tracking-[0.025em] text-sand">
              Where kids
              <br />
              learn to skate.
            </h1>
          </Reveal>

          <Reveal>
            <p className="mt-6 max-w-[560px] text-base leading-relaxed text-sand/95 md:text-lg">
              Skateboarding classes for kids in Hyderabad. Helmets + pads on,
              groups small, one coach who actually skates with them.
              Coached by Hari since 2019.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-9 flex flex-wrap gap-3">
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
        </PhotoHero>
      </div>

      {/* TRUST STRIP — what parents need to know in 4 cells */}
      <section className="relative">
        <div className="container py-10 md:py-14">
          <Reveal stagger className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {TRUST_POINTS.map((point) => (
              <div
                key={point.label}
                className="card-soft p-5 md:p-6"
              >
                <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">
                  {point.label}
                </div>
                <div className="font-display text-2xl font-medium -tracking-[0.01em] md:text-3xl">
                  {point.value}
                </div>
                <div className="mt-1 text-[12px] leading-snug text-ink/65">
                  {point.sub}
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="pointer-events-none absolute right-4 top-2 opacity-90 md:right-12 md:top-4">
          <SunMark size={90} />
        </div>
      </section>

      {/* STORY POSTER — cinematic kid + the courage line */}
      <section className="container py-20 md:py-28">
        <Reveal className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <div>
            <div className="eyebrow-zine mb-4">[ THE FEELING ]</div>
            <h2 className="font-display text-5xl font-medium leading-[1.0] -tracking-[0.02em] md:text-6xl">
              The first drop-in
              <br />
              <span className="text-terracotta">is unforgettable.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink/75 md:text-lg">
              The bowl looks bigger when you&apos;re standing at the edge of it
              for the first time. Then you go. And the rest of life feels a
              little less scary after that.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/75 md:text-lg">
              Skateboarding teaches kids to fall and try again — in a setting
              where the coach catches them before it hurts, and the bowl is
              built for the way they learn.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/classes" className="btn-zine btn-zine--blue">
                Find the right class <Arrow />
              </Link>
            </div>
          </div>
          {/* Cinematic poster — slight rotation, framed like a real flyer */}
          <div className="relative mx-auto w-full max-w-[480px]">
            <div
              className="photo-grain relative aspect-[3/4] overflow-hidden rounded-2xl border-[6px] border-sand bg-ink shadow-soft-lg"
              style={{ transform: "rotate(-1.5deg)" }}
            >
              <Image
                src="/photos/bowl-cinematic.jpg"
                alt="STEEZ SB poster — a young skater alone in the bowl at golden hour, with the words JUST SEND IT"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 40vw, 90vw"
              />
            </div>
            {/* Tape strips for poster realism */}
            <div
              className="absolute -left-4 -top-4 h-10 w-20 rotate-[-12deg] bg-sun/80 shadow-soft"
              style={{ clipPath: "polygon(0 0, 100% 6%, 96% 100%, 4% 94%)" }}
            />
            <div
              className="absolute -bottom-3 -right-3 h-10 w-20 rotate-[18deg] bg-sage-light/80 shadow-soft"
              style={{ clipPath: "polygon(4% 6%, 96% 0, 100% 94%, 0 100%)" }}
            />
          </div>
        </Reveal>
      </section>

      {/* Soft marquee */}
      <Marquee variant="lime" slow>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="inline-flex items-center gap-8">
            <StarBurst className="text-terracotta" />
            HELMETS · PADS · CONFIDENCE
          </span>
        ))}
        <StarBurst className="text-terracotta" />
      </Marquee>

      {/* THE BOWL — kids photo, parent-trust copy */}
      <section className="container py-20 md:py-28">
        <Reveal className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <div className="photo-grain relative aspect-[4/5] overflow-hidden rounded-3xl border border-ink/10 shadow-soft-lg">
            <Image
              src="/photos/kids-class.jpg"
              alt="Kids in colorful helmets and pads skating in the bowl during a STEEZ class"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div>
            <div className="eyebrow-zine mb-4">[ THE BOWL ]</div>
            <h2 className="font-display text-5xl font-medium leading-[1.0] -tracking-[0.02em] md:text-6xl">
              Built for first
              <br />
              <span className="text-sage-deep">drop-ins.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink/75 md:text-lg">
              Mellow transitions for new skaters, tight pockets for the
              experienced. Hand-troweled concrete, helmets on the rack, water
              at the bench. Parents welcome to watch from the shade.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-ink/15 pt-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                  Depth
                </div>
                <div className="font-display text-2xl font-medium">
                  4 – 7 ft
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                  Group size
                </div>
                <div className="font-display text-2xl font-medium">
                  4 – 6 kids
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/practice" className="btn-zine btn-zine--ghost">
                See practice hours <Arrow />
              </Link>
            </div>
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
              No gimmicks. No upsells. Bring your kid — board or no board — and
              we&apos;ll meet them where they are.
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
              One coach. One bowl. Seven years of teaching kids their
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
              <div className="eyebrow-zine mb-4">[ 03 / BOOK A SPOT ]</div>
              <h2 className="font-display text-5xl font-medium leading-[1.0] -tracking-[0.02em] md:text-7xl">
                Book your kid&apos;s
                <br />
                <span className="text-terracotta">first class.</span>
              </h2>
              <p className="mt-6 max-w-[460px] text-base leading-relaxed text-ink/70">
                One WhatsApp message and Hari will hold a spot. No forms, no
                deposit. You can drop by and watch first if you want.
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
