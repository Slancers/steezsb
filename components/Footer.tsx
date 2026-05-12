import Link from "next/link";

import { WhatsAppIcon } from "@/components/icons/zine";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { getSiteSettings } from "@/sanity/queries";

const SITE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/classes", label: "Classes" },
  { href: "/practice", label: "Practice" },
  { href: "/shop", label: "Kit" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export async function Footer() {
  const settings = await getSiteSettings();
  const phone = settings?.phoneNumber || "+91 99999 99999";
  const email = settings?.email || "hari@steezsb.com";
  const insta = settings?.social?.instagram;
  const addressLine =
    settings?.address?.line1 ||
    settings?.address?.city ||
    "Banjara Hills";
  const cityLine = [
    settings?.address?.city,
    settings?.address?.state,
  ]
    .filter(Boolean)
    .join(", ") || "Hyderabad, Telangana";

  return (
    <footer className="relative z-[2] bg-ink text-paper">
      <div className="container pb-8 pt-20">
        <div className="grid gap-12 border-b border-paper/15 pb-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="font-display text-6xl font-bold uppercase leading-[0.85] -tracking-[0.04em] md:text-7xl">
              STEEZ<span className="text-steeze-red">.</span>
            </div>
            <p className="mt-4 max-w-[280px] text-[13px] leading-relaxed text-paper/70">
              Skateboarding coaching in Hyderabad. Classes, hourly bowl, kit
              shop. Coached by Hari since 2019.
            </p>
            <div className="mt-6">
              <WhatsAppCTA
                intent="general"
                className="btn-zine btn-zine--red text-[11px]"
              >
                <WhatsAppIcon size={14} /> WhatsApp Hari
              </WhatsAppCTA>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-steeze-red">
              Site
            </h4>
            <ul className="space-y-2 text-[13px] text-paper/80">
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-steeze-lime"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-steeze-red">
              Visit
            </h4>
            <ul className="space-y-2 text-[13px] text-paper/80">
              <li>{addressLine}</li>
              <li>{cityLine}</li>
              <li>India</li>
              <li className="pt-3">Mon–Sat · 06–21</li>
              <li>Sun · 06–13</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-steeze-red">
              Reach
            </h4>
            <ul className="space-y-2 text-[13px] text-paper/80">
              <li>
                <a
                  href={`tel:${phone}`}
                  className="transition-colors hover:text-steeze-lime"
                >
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="transition-colors hover:text-steeze-lime"
                >
                  {email}
                </a>
              </li>
              {insta ? (
                <li>
                  <a
                    href={insta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-steeze-lime"
                  >
                    @steezsb
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/50">
          <span>© {new Date().getFullYear()} STEEZ Skateboarding</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-steeze-lime" />
            Bowl · Open
          </span>
          <span>
            Designed by{" "}
            <Link
              href="https://moretraffic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper transition-colors hover:text-steeze-lime"
            >
              Joe
            </Link>
          </span>
        </div>
      </div>

      <BigFooterWord />
    </footer>
  );
}

function BigFooterWord() {
  return (
    <div className="overflow-hidden border-t border-paper/15 py-6">
      <div
        className="animate-ticker-slow whitespace-nowrap font-display text-[clamp(60px,14vw,220px)] font-bold uppercase leading-none -tracking-[0.04em]"
        style={{
          color: "transparent",
          WebkitTextStroke: "2px #F1EAD7",
        }}
      >
        SKATE&nbsp;·&nbsp;OR&nbsp;·&nbsp;DON&apos;T&nbsp;·&nbsp;SKATE&nbsp;·&nbsp;OR&nbsp;·&nbsp;DON&apos;T&nbsp;·&nbsp;
      </div>
    </div>
  );
}
