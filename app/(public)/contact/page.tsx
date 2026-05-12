import { Mail, MapPin, Phone } from "lucide-react";

import { PhoneLink } from "@/components/analytics/PhoneLink";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getPrimaryLocation, getSiteSettings } from "@/sanity/queries";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with STEEZE Skateboarding in Hyderabad. WhatsApp, phone, address, and directions.",
  path: "/contact",
});

function buildMapsEmbedUrl(lat?: number, lng?: number) {
  if (typeof lat !== "number" || typeof lng !== "number") return null;
  // Public Google Maps embed, no API key required.
  return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

export default async function ContactPage() {
  const [settings, location] = await Promise.all([
    getSiteSettings(),
    getPrimaryLocation(),
  ]);

  const lat = settings?.geo?.lat ?? location?.geo?.lat;
  const lng = settings?.geo?.lng ?? location?.geo?.lng;
  const mapsEmbed = buildMapsEmbedUrl(lat, lng);

  const addressLines = settings?.address
    ? [
        settings.address.line1,
        settings.address.line2,
        [
          settings.address.city,
          settings.address.state,
          settings.address.pincode,
        ]
          .filter(Boolean)
          .join(" "),
      ].filter(Boolean)
    : [];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="container py-12 md:py-16">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Contact
        </h1>
        <p className="mt-4 max-w-prose text-lg text-muted-foreground">
          Fastest way to reach Hari is WhatsApp. Drop a message anytime.
        </p>
      </section>

      <section className="container pb-12">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 text-xl font-semibold">Get in touch</h2>
              <ul className="space-y-3 text-muted-foreground">
                {settings?.phoneNumber ? (
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0" />
                    <PhoneLink
                      phoneNumber={settings.phoneNumber}
                      className="hover:text-foreground"
                    >
                      {settings.phoneNumber}
                    </PhoneLink>
                  </li>
                ) : null}
                {settings?.email ? (
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0" />
                    <a
                      href={`mailto:${settings.email}`}
                      className="hover:text-foreground"
                    >
                      {settings.email}
                    </a>
                  </li>
                ) : null}
                {addressLines.length > 0 ? (
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                    <address className="not-italic">
                      {addressLines.map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </address>
                  </li>
                ) : null}
              </ul>
              <div className="mt-6">
                <WhatsAppCTA intent="general" size="lg">
                  WhatsApp Hari
                </WhatsAppCTA>
              </div>
            </div>

            {settings?.openingHours && settings.openingHours.length > 0 ? (
              <div>
                <h2 className="mb-4 text-xl font-semibold">Hours</h2>
                <ul className="space-y-1 text-muted-foreground">
                  {settings.openingHours.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">Where to find us</h2>
            {mapsEmbed ? (
              <iframe
                title="Map to STEEZE Skateboarding"
                src={mapsEmbed}
                className="aspect-[4/3] w-full rounded-lg border"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                Map will appear once the bowl location is added in Sanity.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
