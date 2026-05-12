import Image from "next/image";
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
    <footer className="mt-16 border-t bg-muted/30">
      <div className="container grid gap-8 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <Image
            src="/brand/logo.png"
            alt="STEEZE Skateboarding"
            width={1089}
            height={490}
            className="h-10 w-auto"
          />
          {settings?.tagline ? (
            <p className="text-sm text-muted-foreground">{settings.tagline}</p>
          ) : null}
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {settings?.phoneNumber ? (
              <li>
                <a
                  href={`tel:${settings.phoneNumber}`}
                  className="hover:text-foreground"
                >
                  {settings.phoneNumber}
                </a>
              </li>
            ) : null}
            {settings?.email ? (
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-foreground"
                >
                  {settings.email}
                </a>
              </li>
            ) : null}
            {settings?.whatsappNumber ? (
              <li>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  className="hover:text-foreground"
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
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Visit
          </h3>
          {addressLines ? (
            <address className="not-italic text-sm text-muted-foreground">
              {addressLines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </address>
          ) : (
            <p className="text-sm text-muted-foreground">Hyderabad, Telangana</p>
          )}
          {settings?.openingHours && settings.openingHours.length > 0 ? (
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              {settings.openingHours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Follow
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {settings?.social?.instagram ? (
              <li>
                <a
                  href={settings.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
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
                  className="hover:text-foreground"
                >
                  YouTube
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="container flex flex-col items-start justify-between gap-2 py-6 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>© {year} STEEZE Skateboarding</p>
          <p>
            Designed by{" "}
            <Link
              href="https://moretraffic.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              Joe
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
