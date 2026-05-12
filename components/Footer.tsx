import Link from "next/link";

import { getSiteSettings } from "@/sanity/queries";

function formatAddress(
  address?: NonNullable<
    Awaited<ReturnType<typeof getSiteSettings>>
  >["address"]
) {
  if (!address) return null;
  const parts = [
    address.line1,
    address.line2,
    [address.city, address.state, address.pincode].filter(Boolean).join(" "),
  ].filter(Boolean);
  return parts.length > 0 ? parts : null;
}

export async function Footer() {
  const settings = await getSiteSettings();
  const addressLines = formatAddress(settings?.address);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="container grid gap-12 py-16 md:grid-cols-4">
        <div className="space-y-3 md:col-span-1">
          <Link
            href="/"
            className="block font-display text-3xl uppercase leading-none tracking-widest"
          >
            Stee<span className="text-primary">z</span>e
          </Link>
          {settings?.tagline ? (
            <p className="text-sm text-muted-foreground">{settings.tagline}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Skateboarding in Hyderabad.
            </p>
          )}
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Contact
          </h3>
          <ul className="space-y-2 text-sm">
            {settings?.phoneNumber ? (
              <li>
                <a
                  href={`tel:${settings.phoneNumber}`}
                  className="text-foreground/80 transition-colors hover:text-primary"
                >
                  {settings.phoneNumber}
                </a>
              </li>
            ) : null}
            {settings?.email ? (
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-foreground/80 transition-colors hover:text-primary"
                >
                  {settings.email}
                </a>
              </li>
            ) : null}
            {settings?.whatsappNumber ? (
              <li>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  className="text-foreground/80 transition-colors hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Visit
          </h3>
          {addressLines ? (
            <address className="not-italic text-sm text-foreground/80">
              {addressLines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </address>
          ) : (
            <p className="text-sm text-foreground/80">Hyderabad, Telangana</p>
          )}
          {settings?.openingHours && settings.openingHours.length > 0 ? (
            <ul className="mt-3 space-y-1 text-sm text-foreground/80">
              {settings.openingHours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Follow
          </h3>
          <ul className="space-y-2 text-sm">
            {settings?.social?.instagram ? (
              <li>
                <a
                  href={settings.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 transition-colors hover:text-primary"
                >
                  Instagram
                </a>
              </li>
            ) : null}
            {settings?.social?.youtube ? (
              <li>
                <a
                  href={settings.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 transition-colors hover:text-primary"
                >
                  YouTube
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col items-start justify-between gap-2 py-6 text-xs uppercase tracking-widest text-muted-foreground md:flex-row md:items-center">
          <p>© {year} STEEZE Skateboarding</p>
          <p>
            Designed by{" "}
            <Link
              href="https://moretraffic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground transition-colors hover:text-primary"
            >
              Joe
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
