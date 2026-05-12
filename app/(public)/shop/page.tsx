import { Marquee } from "@/components/effects/Marquee";
import { Reveal } from "@/components/effects/Reveal";
import {
  Arrow,
  GlyphHelmet,
  GlyphTape,
  StarBurst,
  WhatsAppIcon,
} from "@/components/icons/zine";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "STEEZ Skate Kit",
  description:
    "A tight starter shop in Hyderabad. Decks, trucks, wheels, helmets, pads. Bundles and à la carte.",
  path: "/shop",
});

const BUNDLES = [
  {
    tag: "BEGINNER · COMPLETE",
    name: "THE FIRST BOARD",
    price: "₹4,200",
    list: [
      "7.75\" Canadian maple deck",
      "5.0 Independent trucks",
      "52mm 99a wheels",
      "Bones Reds bearings",
      "Black grip + tools",
    ],
    includes: ["DECK", "TRUCKS", "WHEELS", "BEARINGS", "GRIP"],
    featured: false,
  },
  {
    tag: "SKATE + PROTECT",
    name: "THE FIRST SESSION",
    price: "₹5,400",
    list: [
      'Everything in "First Board"',
      "Helmet (CPSC certified)",
      "Knee + elbow pads",
      "STEEZ T-shirt",
      "Wax + stickers",
    ],
    includes: ["DECK", "TRUCKS", "WHEELS", "HELMET", "PADS", "TEE", "STICKERS"],
    featured: true,
  },
];

type Product = {
  cat: string;
  name: string;
  price: string;
  bg: string;
  sticker?: { text: string; red?: boolean };
  art: React.ReactNode;
};

const PRODUCTS: Product[] = [
  {
    cat: "DECK · 7.75\"",
    name: "STEEZ HOUSE DECK",
    price: "₹2,400",
    bg: "bg-paper-deep",
    sticker: { text: "NEW" },
    art: (
      <svg viewBox="0 0 300 300" width="80%" height="80%">
        <g transform="translate(30 100) rotate(-12)">
          <rect x="0" y="40" width="240" height="40" rx="20" fill="#0E0D0B" />
          <circle cx="60" cy="60" r="14" fill="#FF2D2D" />
          <text
            x="60"
            y="66"
            textAnchor="middle"
            fill="#F1EAD7"
            fontFamily="var(--font-space-mono, monospace)"
            fontSize="14"
            fontWeight="700"
          >
            S
          </text>
          <rect x="100" y="55" width="120" height="3" fill="#F1EAD7" />
          <rect x="100" y="62" width="80" height="3" fill="#FF2D2D" />
        </g>
      </svg>
    ),
  },
  {
    cat: "TRUCKS · 5.0",
    name: "INDEPENDENT 129",
    price: "₹2,800",
    bg: "bg-paper",
    art: (
      <svg viewBox="0 0 300 300" width="60%" height="60%">
        <g transform="translate(50 100)">
          <rect x="10" y="40" width="180" height="40" fill="#B8AE9A" stroke="#0E0D0B" strokeWidth="3" />
          <rect x="60" y="20" width="80" height="30" fill="#FF2D2D" stroke="#0E0D0B" strokeWidth="3" />
          <text x="100" y="42" textAnchor="middle" fill="#F1EAD7" fontFamily="var(--font-space-mono, monospace)" fontWeight="700" fontSize="13">INDY</text>
          <circle cx="30" cy="100" r="14" fill="#F1EAD7" stroke="#0E0D0B" strokeWidth="3" />
          <circle cx="170" cy="100" r="14" fill="#F1EAD7" stroke="#0E0D0B" strokeWidth="3" />
          <line x1="0" y1="60" x2="200" y2="60" stroke="#0E0D0B" strokeWidth="1.5" strokeDasharray="2 3" />
        </g>
      </svg>
    ),
  },
  {
    cat: "WHEELS · 52MM",
    name: "BONES STF V1",
    price: "₹2,400",
    bg: "bg-paper-deep",
    sticker: { text: "POP!", red: true },
    art: (
      <svg viewBox="0 0 300 300" width="70%" height="70%">
        <circle cx="100" cy="150" r="60" fill="#F1EAD7" stroke="#0E0D0B" strokeWidth="3" />
        <circle cx="100" cy="150" r="20" fill="none" stroke="#0E0D0B" strokeWidth="3" />
        <circle cx="200" cy="150" r="60" fill="#F1EAD7" stroke="#0E0D0B" strokeWidth="3" />
        <circle cx="200" cy="150" r="20" fill="none" stroke="#0E0D0B" strokeWidth="3" />
        <text x="100" y="100" textAnchor="middle" fontFamily="var(--font-space-mono, monospace)" fontWeight="700" fontSize="12">52</text>
        <text x="200" y="100" textAnchor="middle" fontFamily="var(--font-space-mono, monospace)" fontWeight="700" fontSize="12">52</text>
      </svg>
    ),
  },
  {
    cat: "BEARINGS",
    name: "BONES REDS",
    price: "₹1,200",
    bg: "bg-paper",
    art: (
      <svg viewBox="0 0 300 300" width="60%" height="60%">
        <rect x="40" y="120" width="220" height="60" fill="#FF2D2D" stroke="#0E0D0B" strokeWidth="2" />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle
            key={i}
            cx={60 + i * 36}
            cy="150"
            r="16"
            fill="#F1EAD7"
            stroke="#0E0D0B"
            strokeWidth="2"
          />
        ))}
        <text x="150" y="200" textAnchor="middle" fontFamily="var(--font-jetbrains-mono, monospace)" fontSize="11" fontWeight="700" letterSpacing="2">
          REDS · 8 PK
        </text>
      </svg>
    ),
  },
  {
    cat: "HELMET · S/M/L",
    name: "TRIPLE 8 LID",
    price: "₹2,800",
    bg: "bg-paper-deep",
    art: (
      <div className="text-ink">
        <GlyphHelmet size={140} />
      </div>
    ),
  },
  {
    cat: "GRIP TAPE",
    name: "MOB BLACK",
    price: "₹400",
    bg: "bg-paper",
    sticker: { text: "STOCK" },
    art: (
      <div className="text-ink">
        <GlyphTape size={140} />
      </div>
    ),
  },
  {
    cat: "PADS · PAIR",
    name: "KNEE + ELBOW",
    price: "₹1,800",
    bg: "bg-paper-deep",
    art: (
      <svg viewBox="0 0 300 300" width="70%" height="70%">
        <ellipse cx="100" cy="120" rx="50" ry="40" fill="#0E0D0B" />
        <ellipse cx="100" cy="120" rx="36" ry="28" fill="#F1EAD7" />
        <ellipse cx="200" cy="180" rx="45" ry="36" fill="#0E0D0B" />
        <ellipse cx="200" cy="180" rx="32" ry="24" fill="#F1EAD7" />
        <text x="100" y="125" textAnchor="middle" fontFamily="var(--font-jetbrains-mono, monospace)" fontSize="9" fontWeight="700">KNEE</text>
        <text x="200" y="185" textAnchor="middle" fontFamily="var(--font-jetbrains-mono, monospace)" fontSize="9" fontWeight="700">ELBW</text>
      </svg>
    ),
  },
  {
    cat: "WAX · TIN",
    name: "STEEZ HOUSE WAX",
    price: "₹150",
    bg: "bg-paper",
    art: (
      <svg viewBox="0 0 300 300" width="55%" height="55%">
        <rect x="80" y="80" width="140" height="140" fill="#D3F046" stroke="#0E0D0B" strokeWidth="3" />
        <rect x="80" y="80" width="140" height="40" fill="#0E0D0B" />
        <text x="150" y="105" textAnchor="middle" fill="#F1EAD7" fontFamily="var(--font-space-mono, monospace)" fontSize="14" fontWeight="700" letterSpacing="2">STEEZ</text>
        <text x="150" y="175" textAnchor="middle" fontFamily="var(--font-jetbrains-mono, monospace)" fontSize="14" fontWeight="700" letterSpacing="2">WAX</text>
        <text x="150" y="200" textAnchor="middle" fontFamily="var(--font-jetbrains-mono, monospace)" fontSize="9" letterSpacing="2">0.7 OZ</text>
      </svg>
    ),
  },
  {
    cat: "STICKER · PACK",
    name: "5x STEEZ STICKERS",
    price: "₹200",
    bg: "bg-paper-deep",
    sticker: { text: "FREE w/ buy", red: true },
    art: (
      <svg viewBox="0 0 300 300" width="80%" height="80%">
        <g transform="translate(60 80) rotate(-12)">
          <rect width="80" height="80" fill="#FF2D2D" stroke="#0E0D0B" strokeWidth="2" />
          <text x="40" y="48" textAnchor="middle" fill="#F1EAD7" fontFamily="var(--font-space-mono, monospace)" fontWeight="700" fontSize="14">STEEZ</text>
        </g>
        <g transform="translate(160 60) rotate(8)">
          <circle cx="40" cy="40" r="40" fill="#0E0D0B" />
          <circle cx="40" cy="40" r="34" fill="none" stroke="#D3F046" strokeWidth="2" strokeDasharray="3 3" />
          <text x="40" y="46" textAnchor="middle" fill="#D3F046" fontFamily="Permanent Marker, cursive" fontSize="16">HYD</text>
        </g>
        <g transform="translate(50 170) rotate(6)">
          <rect width="100" height="40" fill="#D3F046" stroke="#0E0D0B" strokeWidth="2" />
          <text x="50" y="26" textAnchor="middle" fontFamily="Permanent Marker, cursive" fontSize="16" fill="#0E0D0B">SKATE</text>
        </g>
        <g transform="translate(170 170) rotate(-10)">
          <rect width="80" height="40" fill="#2547F0" stroke="#0E0D0B" strokeWidth="2" />
          <text x="40" y="26" textAnchor="middle" fill="#F1EAD7" fontFamily="var(--font-jetbrains-mono, monospace)" fontSize="11" fontWeight="700">EST · 2019</text>
        </g>
      </svg>
    ),
  },
];

export default function ShopPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
        ])}
      />

      <PageHero
        eyebrow="[ kit ]"
        lines={[
          { text: "WALK IN." },
          { text: "WALK OUT.", treatment: "lime-shadow" },
          { text: "SKATING.", treatment: "outlined" },
        ]}
        subtitle="A tight starter shop. Decks, trucks, wheels, bearings, helmets, stickers. Nothing you don't need. We'll set up your board on the bench, in front of you."
      />

      <div className="pt-12 md:pt-16">
        <Marquee variant="lime">
          <StarBurst /> KIT · SETUP · GRIP <Arrow size={32} /> KIT · SETUP ·
          GRIP <Arrow size={32} /> KIT · SETUP · GRIP <Arrow size={32} /> KIT ·
          SETUP · GRIP <Arrow size={32} />
        </Marquee>
      </div>

      {/* BUNDLES */}
      <section className="container py-20 md:py-24">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b-[1.5px] border-ink pb-10">
            <div>
              <div className="s-num-zine mb-2">[ 01 / STARTER PACK ]</div>
              <h2 className="s-title-zine">
                one box.
                <br />
                everything.
              </h2>
            </div>
            <p className="max-w-[320px] text-[13px] leading-relaxed text-ink-soft">
              Bundle deal — better price than buying each piece. Available in
              two builds.
            </p>
          </div>
        </Reveal>

        <Reveal stagger className="grid gap-6 md:grid-cols-2">
          {BUNDLES.map((bundle) => (
            <div
              key={bundle.name}
              className={`flex flex-col border-[1.5px] border-ink p-8 transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                bundle.featured
                  ? "bg-ink text-paper hover:shadow-hard-l"
                  : "bg-paper text-ink hover:shadow-hard-r"
              }`}
            >
              <div className="mb-6 flex items-baseline justify-between">
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-steeze-red">
                  [ {bundle.tag} ]
                </div>
                {bundle.featured ? (
                  <span className="chip-zine chip-zine--lime">BEST DEAL</span>
                ) : null}
              </div>
              <h3 className="mb-6 font-display text-4xl font-bold uppercase leading-[0.95] -tracking-[0.04em] md:text-5xl">
                {bundle.name}
              </h3>
              <div className="flex items-baseline justify-between border-y border-dashed py-4">
                <span
                  className={`font-display text-5xl font-bold -tracking-[0.04em] md:text-6xl ${
                    bundle.featured ? "text-steeze-lime" : "text-steeze-red"
                  }`}
                >
                  {bundle.price}
                </span>
                <span className="text-xs opacity-60">complete · ready to roll</span>
              </div>
              <ul className="my-5 flex-1">
                {bundle.list.map((line, i) => (
                  <li key={i} className="flex items-start gap-2.5 py-2 text-sm">
                    <span
                      className={`font-display font-bold ${
                        bundle.featured ? "text-steeze-lime" : "text-steeze-red"
                      }`}
                    >
                      →
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {bundle.includes.map((c) => (
                  <span
                    key={c}
                    className={`border px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] ${
                      bundle.featured
                        ? "border-paper/30 text-paper"
                        : "border-ink/40 text-ink"
                    }`}
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <WhatsAppCTA
                  intent="kit"
                  className={
                    bundle.featured
                      ? "btn-zine btn-zine--lime w-full justify-center"
                      : "btn-zine btn-zine--ghost w-full justify-center"
                  }
                >
                  <WhatsAppIcon size={14} /> ORDER ON WHATSAPP
                </WhatsAppCTA>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* PRODUCTS */}
      <section className="container py-12 md:py-16">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b-[1.5px] border-ink pb-10">
            <div>
              <div className="s-num-zine mb-2">[ 02 / À LA CARTE ]</div>
              <h2 className="s-title-zine">
                pick your
                <br />
                <span className="text-steeze-red">pieces.</span>
              </h2>
            </div>
            <p className="max-w-[320px] text-[13px] leading-relaxed text-ink-soft">
              We don&apos;t carry hype brands. We carry stuff that works. If we
              don&apos;t have it, we&apos;ll order it.
            </p>
          </div>
        </Reveal>

        <Reveal stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <div
              key={p.name}
              className="group overflow-hidden border-[1.5px] border-ink transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard"
            >
              <div
                className={`relative flex aspect-square items-center justify-center overflow-hidden border-b-[1.5px] border-ink ${p.bg}`}
              >
                {p.art}
                {p.sticker ? (
                  <div
                    className={`absolute right-4 top-4 rotate-6 border-[1.5px] border-ink px-2 py-1 font-sticker text-sm ${
                      p.sticker.red
                        ? "bg-steeze-red text-paper"
                        : "bg-steeze-lime text-ink"
                    }`}
                  >
                    {p.sticker.text}
                  </div>
                ) : null}
              </div>
              <div className="flex items-start justify-between gap-3 bg-paper p-5">
                <div>
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/60">
                    [ {p.cat} ]
                  </div>
                  <div className="font-display text-lg font-bold uppercase -tracking-[0.02em]">
                    {p.name}
                  </div>
                </div>
                <div className="font-display text-xl font-bold text-steeze-red">
                  {p.price}
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      <Marquee variant="dark" reverse>
        <StarBurst className="text-steeze-red" /> STICKERS · FREE{" "}
        <Arrow size={32} /> SETUP · FREE <Arrow size={32} /> ADVICE · FREE{" "}
        <Arrow size={32} /> STICKERS · FREE <Arrow size={32} /> SETUP · FREE{" "}
        <Arrow size={32} />
      </Marquee>

      {/* SETUP CTA */}
      <section className="container py-20 md:py-24">
        <Reveal>
          <div className="grid items-end gap-8 border-y-[1.5px] border-ink py-14 md:grid-cols-[1fr_auto]">
            <div>
              <div className="eyebrow-zine">[ 03 / SETUP ]</div>
              <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.9] -tracking-[0.04em] md:text-6xl lg:text-7xl">
                we set it up.
                <br />
                at the bench.
              </h2>
              <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-ink-soft">
                Buy a complete and we&apos;ll grip, mount, tighten and roll it
                on the floor before you leave. Comes with a sticker pack and
                the free advice you didn&apos;t ask for.
              </p>
            </div>
            <WhatsAppCTA intent="kit" className="btn-zine btn-zine--red">
              <WhatsAppIcon size={16} /> ASK ABOUT STOCK
            </WhatsAppCTA>
          </div>
        </Reveal>
      </section>
    </>
  );
}
