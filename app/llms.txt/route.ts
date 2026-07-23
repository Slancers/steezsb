import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/queries";

// Plain-text summary served at /llms.txt per https://llmstxt.org spec.
// Lets AI answer engines (ChatGPT, Perplexity, Claude search) ingest a
// canonical factual summary of what WallRide Park is and where to find more.
export const revalidate = 3600;

export async function GET() {
  const settings = await getSiteSettings();

  const name = settings?.siteName || SITE_NAME;
  const tagline =
    settings?.tagline ||
    "BMX, skateboarding and a rider-built park for first tries, bigger lines and the community in between.";

  const addressLine = settings?.address
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
      ]
        .filter(Boolean)
        .join(", ")
    : "Hyderabad, Telangana, India";

  const contactLines = [
    settings?.phoneNumber ? `- Phone: ${settings.phoneNumber}` : null,
    settings?.email ? `- Email: ${settings.email}` : null,
    settings?.whatsappNumber
      ? `- WhatsApp: https://wa.me/${settings.whatsappNumber}`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  const body = `# ${name}

> ${tagline}

## About
${name} is a rider-built action-sports park in Hyderabad, India, with BMX, skateboarding, pump track sessions, classes, events and a growing community.

## Services
- [Classes](${SITE_URL}/classes) - BMX, skateboarding and pump track classes for beginners and progressing riders.
- [Practice](${SITE_URL}/practice) - Park hours, entry, rentals and visit information.
- [Events](${SITE_URL}/events) - Jams, contests, workshops and community sessions.
- [Shop](${SITE_URL}/shop) - WallRide drops and partner brands, coming soon.

## Location
${addressLine}

## Contact
${contactLines || `- Website: ${SITE_URL}`}

## Pages
- [Home](${SITE_URL}/)
- [Classes](${SITE_URL}/classes)
- [Practice](${SITE_URL}/practice)
- [Events](${SITE_URL}/events)
- [Shop](${SITE_URL}/shop)
- [About](${SITE_URL}/about)
- [Contact](${SITE_URL}/contact)
- [FAQ](${SITE_URL}/faq)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
