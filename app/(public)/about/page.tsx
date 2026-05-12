import { AboutPortrait } from "@/components/effects/AboutPortrait";
import { Marquee } from "@/components/effects/Marquee";
import { Reveal } from "@/components/effects/Reveal";
import { Arrow, StarBurst } from "@/components/icons/zine";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { breadcrumbJsonLd, buildMetadata, personJsonLd } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/queries";

export const metadata = buildMetadata({
  title: "About Hari",
  description:
    "About Hari and the STEEZ bowl in Banjara Hills, Hyderabad. Timeline, coaching philosophy, things Hari tells new skaters.",
  path: "/about",
});

const TIMELINE = [
  {
    year: "2009",
    title: "First push",
    desc: "Borrowed a board off a friend in Banjara Hills. Took me a month to push without falling.",
  },
  {
    year: "2013",
    title: "First trick",
    desc: "Landed an ollie in front of a security guard. He clapped.",
  },
  {
    year: "2017",
    title: "Got serious",
    desc: "Started traveling — Bangalore, Mumbai, Goa. Skated with people who skated way better.",
  },
  {
    year: "2019",
    title: "First lesson",
    desc: "A friend asked me to teach his kid. The kid landed an ollie in a month. The kid told his friends.",
  },
  {
    year: "2021",
    title: "Found the bowl",
    desc: "Pooled money with three other skaters. Poured concrete on a vacant lot in Banjara Hills.",
  },
  {
    year: "2023",
    title: "Bought a kit",
    desc: "Started carrying decks and trucks for students who kept asking where to get them.",
  },
  {
    year: "2025",
    title: "Still here",
    desc: "Same coach, same bowl, slightly worn coping. 340+ students through the door.",
  },
];

const QUOTES = [
  { text: "“You can't skate scared. You can skate cautious. Different thing.”", rot: -1.5 },
  { text: "“Falling is a skill. We practice it on purpose. You'll be fine.”", rot: 1.2 },
  { text: "“There's no rush. The bowl will still be here next Saturday.”", rot: -0.6 },
  { text: "“Helmets always. I don't negotiate on this one.”", rot: 0.8 },
  { text: "“Watch one skater you like. Steal one thing. Build from there.”", rot: -1 },
  { text: "“Don't buy expensive trucks before you can push.”", rot: 1.4 },
];

function quoteBg(i: number) {
  if ((i + 1) % 3 === 0) return "bg-steeze-lime";
  if ((i + 1) % 2 === 0) return "bg-paper-deep";
  return "bg-paper";
}

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const bioParagraphs = settings?.about?.bio
    ? settings.about.bio.split(/\n\n+/)
    : [
        "I'm **Hari**. I've been skating for 17 years and coaching for 7. STEEZ is where I'd want to learn if I were 12 again — a small space, real concrete, no parents at the gate.",
        "We're not a chain. We're not a franchise. There's no app. There's WhatsApp, a bowl, and a kit shelf. The bowl is in **Banjara Hills, Hyderabad**, and you can stop by any time we're open.",
        "If you've never stepped on a board, this is the easiest place to start. If you have, this is the easiest place to get faster.",
      ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <JsonLd data={personJsonLd(settings)} />

      <PageHero
        eyebrow="[ about ]"
        lines={[
          { text: "ONE COACH." },
          { text: "ONE BOWL.", treatment: "red-shadow" },
          { text: "ONE PLACE.", treatment: "outlined" },
        ]}
      />

      {/* Portrait + bio */}
      <section className="container py-16 md:py-20">
        <Reveal className="grid items-stretch gap-12 md:grid-cols-2">
          <div className="aspect-[4/5] overflow-hidden border-[1.5px] border-ink bg-ink">
            <AboutPortrait />
          </div>
          <div>
            <div className="eyebrow-zine">[ HARI · COACH ]</div>
            <h2 className="my-6 font-display text-4xl font-bold uppercase leading-[0.9] -tracking-[0.04em] md:text-6xl lg:text-7xl">
              built in
              <br />
              banjara hills.
            </h2>
            {bioParagraphs.map((para, i) => (
              <p
                key={i}
                className="mb-4 text-[15px] leading-relaxed text-ink-soft md:text-base md:leading-[1.7]"
                dangerouslySetInnerHTML={{
                  __html: para.replace(
                    /\*\*(.+?)\*\*/g,
                    '<strong class="bg-steeze-lime px-1 font-semibold text-ink">$1</strong>'
                  ),
                }}
              />
            ))}
          </div>
        </Reveal>
      </section>

      <Marquee variant="red">
        <StarBurst /> EST · 2019 <Arrow size={32} /> HYDERABAD <Arrow size={32} />{" "}
        ONE COACH <Arrow size={32} /> 340+ STUDENTS <Arrow size={32} /> EST · 2019{" "}
        <Arrow size={32} /> HYDERABAD <Arrow size={32} />
      </Marquee>

      {/* Timeline */}
      <section className="container py-20 md:py-24">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b-[1.5px] border-ink pb-10">
            <div>
              <div className="s-num-zine mb-2">[ 01 / TIMELINE ]</div>
              <h2 className="s-title-zine">
                how we
                <br />
                got here.
              </h2>
            </div>
            <p className="max-w-[320px] text-[13px] leading-relaxed text-ink-soft">
              Not an origin story, just the order things happened.
            </p>
          </div>
        </Reveal>

        <Reveal stagger>
          {TIMELINE.map((t) => (
            <div
              key={t.year}
              className="grid grid-cols-1 items-baseline gap-4 border-b border-ink/20 py-7 md:grid-cols-[100px_1fr_2fr] md:gap-8"
            >
              <div className="font-display text-3xl font-bold -tracking-[0.02em] text-steeze-red">
                {t.year}
              </div>
              <div className="font-mono text-sm font-semibold uppercase tracking-[0.04em]">
                {t.title}
              </div>
              <div className="text-sm leading-relaxed text-ink-soft">
                {t.desc}
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Quotes */}
      <section className="container py-20 md:py-24">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b-[1.5px] border-ink pb-10">
            <div>
              <div className="s-num-zine mb-2">[ 02 / IN HARI&apos;S WORDS ]</div>
              <h2 className="s-title-zine">
                things I
                <br />
                tell new
                <br />
                skaters.
              </h2>
            </div>
            <p className="max-w-[320px] text-[13px] leading-relaxed text-ink-soft">
              Recorded on a Saturday morning, lightly edited.
            </p>
          </div>
        </Reveal>

        <Reveal stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {QUOTES.map((q, i) => {
            const isLime = (i + 1) % 3 === 0;
            return (
              <blockquote
                key={i}
                className={`relative border-[1.5px] border-ink p-7 transition-transform duration-300 hover:!rotate-0 ${quoteBg(i)}`}
                style={{ transform: `rotate(${q.rot}deg)` }}
              >
                <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-steeze-red">
                  [ {String(i + 1).padStart(2, "0")} ]
                </div>
                <p className="mb-4 font-display text-xl font-bold leading-tight -tracking-[0.02em]">
                  {q.text}
                </p>
                <footer
                  className={`font-sticker text-lg ${
                    isLime ? "text-ink" : "text-steeze-red"
                  }`}
                >
                  — Hari
                </footer>
              </blockquote>
            );
          })}
        </Reveal>
      </section>
    </>
  );
}
