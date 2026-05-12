import { MapArt } from "@/components/effects/MapArt";
import { Marquee } from "@/components/effects/Marquee";
import { Reveal } from "@/components/effects/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { Arrow, StarBurst, WhatsAppIcon } from "@/components/icons/zine";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/queries";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Reach STEEZ Skateboarding in Hyderabad. WhatsApp is fastest; phone and form work too. Bowl in Banjara Hills.",
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const phone = settings?.phoneNumber || "+91 99999 99999";
  const email = settings?.email || "hari@steezsb.com";
  const whatsappNumber =
    settings?.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHero
        eyebrow="[ contact ]"
        lines={[
          { text: "SAY HI." },
          { text: "OR DROP IN.", treatment: "red-shadow" },
        ]}
      />

      <div className="pt-12 md:pt-16">
        <Marquee variant="red">
          <StarBurst /> WHATSAPP HARI <Arrow size={32} /> WHATSAPP HARI{" "}
          <Arrow size={32} /> WHATSAPP HARI <Arrow size={32} /> WHATSAPP HARI{" "}
          <Arrow size={32} />
        </Marquee>
      </div>

      <section className="container py-16 md:py-20">
        <Reveal className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          {/* WhatsApp card — dark */}
          <div className="bg-ink p-10 text-paper">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-steeze-lime">
              [ fastest way ]
            </div>
            <h2 className="my-4 font-display text-4xl font-bold uppercase leading-none -tracking-[0.03em] md:text-5xl lg:text-6xl">
              just
              <br />
              whatsapp.
            </h2>
            <p className="mb-6 text-[15px] leading-relaxed text-paper/80">
              Class info, bowl bookings, kit stock, anything — Hari replies
              usually within an hour. We don&apos;t have a 24/7 chat bot. We
              have Hari.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 block font-display text-4xl font-bold -tracking-[0.03em] text-steeze-lime md:text-5xl"
            >
              {phone}
            </a>
            <div className="flex flex-wrap gap-3">
              <WhatsAppCTA intent="general" className="btn-zine btn-zine--red">
                <WhatsAppIcon size={16} /> WhatsApp now
              </WhatsAppCTA>
              <a
                href={`tel:${phone}`}
                className="btn-zine btn-zine--ghost"
                style={{ color: "#F1EAD7", borderColor: "#F1EAD7" }}
              >
                Call Hari <Arrow size={14} />
              </a>
            </div>
          </div>

          {/* In-person card — paper */}
          <div className="border-[1.5px] border-ink bg-paper p-10">
            <div className="eyebrow-zine">[ in person ]</div>
            <h2 className="my-4 font-display text-3xl font-bold uppercase leading-tight -tracking-[0.03em] md:text-4xl lg:text-5xl">
              banjara hills,
              <br />
              hyderabad.
            </h2>
            <div className="mt-4">
              {[
                { k: "[ AREA ]", v: "Banjara Hills" },
                { k: "[ CITY ]", v: "Hyderabad, IN" },
                { k: "[ ADDRESS ]", v: "Shared on WhatsApp" },
                { k: "[ HOURS ]", v: "Mon–Sat · 06–21\nSun · 06–13" },
                { k: "[ EMAIL ]", v: email },
              ].map((row) => (
                <div
                  key={row.k}
                  className="grid grid-cols-[110px_1fr] gap-4 border-b border-ink/20 py-3 text-[13px]"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60">
                    {row.k}
                  </span>
                  <span className="whitespace-pre-line">{row.v}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Illustrated map */}
      <section className="container pb-16">
        <Reveal>
          <div
            className="relative overflow-hidden border-[1.5px] border-ink bg-paper-deep"
            style={{ aspectRatio: "16 / 7" }}
          >
            <MapArt />
            <div
              className="absolute bottom-6 left-6 max-w-sm border-[1.5px] border-ink bg-paper p-4"
              style={{ boxShadow: "4px 4px 0 #0E0D0B" }}
            >
              <span className="chip-zine chip-zine--live">LIVE LOCATION</span>
              <h3 className="mt-2 font-display text-2xl font-bold uppercase -tracking-[0.02em] md:text-3xl">
                BANJARA HILLS · HYD
              </h3>
              <p className="mt-1 text-[13px] text-ink-soft">
                WhatsApp Hari for the exact pin.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Form */}
      <section className="container pb-24">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b-[1.5px] border-ink pb-10">
            <div>
              <div className="s-num-zine mb-2">[ 01 / OR USE THIS FORM ]</div>
              <h2 className="s-title-zine">
                if you
                <br />
                must.
              </h2>
            </div>
            <p className="max-w-[320px] text-[13px] leading-relaxed text-ink-soft">
              We&apos;ll text you back on the number you provide. WhatsApp is
              still faster.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
