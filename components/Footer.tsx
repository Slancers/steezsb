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
  const cityLine =
    [settings?.address?.city, settings?.address?.state]
      .filter(Boolean)
      .join(", ") || "Hyderabad, Telangana";

  return (
    <footer className="relative z-[2] bg-ink text-paper">
      <div className="container pb-10 pt-20 md:pb-14 md:pt-28">
        <div className="grid gap-12 border-b border-paper/12 pb-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
          <div className="max-w-[360px]">
            <div className="font-display text-6xl font-medium leading-[0.9] -tracking-[0.02em] md:text-7xl">
              STEEZ<span className="italic text-terracotta">.</span>
            </div>
            <p className="mt-5 text-[14px] leading-relaxed text-paper/65">
              Skateboarding for kids in Hyderabad. A bowl, a kit shop, and a
              coach who skates with them. Since 2019.
            </p>
            <div className="mt-7">
              <WhatsAppCTA
                intent="general"
                className="btn-zine btn-zine--red"
              >
                <WhatsAppIcon size={14} /> WhatsApp Hari
              </WhatsAppCTA>
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-terracotta">
              Site
            </h4>
            <ul className="space-y-2.5 text-[14px] text-paper/75">
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-terracotta">
              Visit
            </h4>
            <ul className="space-y-2.5 text-[14px] text-paper/75">
              <li>{addressLine}</li>
              <li>{cityLine}</li>
              <li>India</li>
              <li className="pt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/55">
                Mon–Sat · 06–21
              </li>
              <li className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/55">
                Sun · 06–13
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-terracotta">
              Reach
            </h4>
            <ul className="space-y-2.5 text-[14px] text-paper/75">
              <li>
                <a
                  href={`tel:${phone}`}
                  className="transition-colors hover:text-paper"
                >
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="transition-colors hover:text-paper"
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
                    className="transition-colors hover:text-paper"
                  >
                    @steezsb
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        {/* Colophon — Patagonia-style restraint, like a print book endpage */}
        <Colophon />
      </div>
    </footer>
  );
}

function Colophon() {
  return (
    <div className="grid gap-6 pt-8 md:grid-cols-[2fr_1fr] md:items-end md:pt-10">
      <p className="max-w-[640px] font-display text-[15px] italic leading-[1.55] text-paper/55 md:text-[16px]">
        STEEZ is a skateboarding school for kids, set in a garden in Banjara
        Hills, Hyderabad. Photographs by Hari, 2024–2025. The bowl was
        hand-troweled. The kids did the rest.
      </p>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/45 md:justify-end md:text-right">
        <span>© {new Date().getFullYear()} · STEEZ · EST 2019</span>
        <span className="hidden md:inline-block" aria-hidden>
          ·
        </span>
        <span>
          Site by{" "}
          <Link
            href="https://moretraffic.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper/75 transition-colors hover:text-paper"
          >
            More Traffic
          </Link>
        </span>
      </div>
    </div>
  );
}
