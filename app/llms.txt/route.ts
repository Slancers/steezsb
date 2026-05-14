import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { getBlogPosts, getSiteSettings } from "@/sanity/queries";

// Plain-text summary served at /llms.txt per https://llmstxt.org spec.
// Lets AI answer engines (ChatGPT, Perplexity, Claude search) ingest a
// canonical factual summary of what STEEZE is and where to find more.
export const revalidate = 3600;

export async function GET() {
  const [settings, posts] = await Promise.all([
    getSiteSettings(),
    getBlogPosts(),
  ]);

  const name = settings?.siteName || SITE_NAME;
  const tagline =
    settings?.tagline ||
    "Skateboarding classes, hourly bowl practice, and gear in Hyderabad. Coached by Hari.";

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

  const recentPostsSection =
    posts.length > 0
      ? `

## Recent blog posts
${posts
  .slice(0, 10)
  .map((p) => {
    const summary = p.tldr || p.excerpt || "";
    const authorBit = p.author?.name ? ` — by ${p.author.name}` : "";
    return `- [${p.title}](${SITE_URL}/blog/${p.slug})${authorBit}${summary ? `\n  ${summary}` : ""}`;
  })
  .join("\n")}`
      : "";

  const body = `# ${name}

> ${tagline}

## About
${name} offers skateboarding coaching and bowl-time practice in Hyderabad, India. The program is run by Hari, who coaches students from beginner level upward.

## Services
- [Classes](${SITE_URL}/classes) — 1-on-1 and group coaching with structured programs and transparent pricing.
- [Practice](${SITE_URL}/practice) — Hourly bowl access for independent skaters.
- [Shop](${SITE_URL}/shop) — The STEEZE Skate Kit: skateboard, helmet, and pads bundled together.
- [Blog](${SITE_URL}/blog) — Coaching ideas, gear thinking, and scene reports.

## Location
${addressLine}

## Contact
${contactLines || `- Website: ${SITE_URL}`}

## Pages
- [Home](${SITE_URL}/)
- [Classes](${SITE_URL}/classes)
- [Practice](${SITE_URL}/practice)
- [Shop](${SITE_URL}/shop)
- [Blog](${SITE_URL}/blog)
- [About](${SITE_URL}/about)
- [Contact](${SITE_URL}/contact)
- [FAQ](${SITE_URL}/faq)

## Feeds
- [RSS](${SITE_URL}/blog/rss.xml) — Blog posts
- [Sitemap](${SITE_URL}/sitemap.xml)${recentPostsSection}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
