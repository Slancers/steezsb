import type { Metadata } from "next";

import type {
  CoachingProgram,
  Faq,
  Product,
  SiteSettings,
} from "@/types/sanity";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:3000";

export const SITE_NAME = "WallRide Park";

const DEFAULT_OG_IMAGE = `${SITE_URL}/wallride/logo.png`;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const image = ogImage ?? DEFAULT_OG_IMAGE;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

// ---- JSON-LD builders ----
// All builders return JSON-serializable plain objects. Strip undefined keys
// before serializing so the rendered script stays clean.

function cleanObject<T extends Record<string, unknown>>(obj: T): T {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    if (typeof v === "object" && !Array.isArray(v)) {
      const nested = cleanObject(v as Record<string, unknown>);
      if (Object.keys(nested).length > 0) out[k] = nested;
    } else {
      out[k] = v;
    }
  }
  return out as T;
}

export function organizationJsonLd(settings: SiteSettings | null) {
  return cleanObject({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: settings?.siteName || SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    sameAs: [settings?.social?.instagram, settings?.social?.youtube].filter(
      Boolean
    ),
  });
}

export function localBusinessJsonLd(settings: SiteSettings | null) {
  const phone = settings?.phoneNumber || settings?.whatsappNumber;
  return cleanObject({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}#localbusiness`,
    name: settings?.siteName || SITE_NAME,
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    telephone: phone,
    priceRange: "₹₹",
    address: settings?.address
      ? {
          "@type": "PostalAddress",
          streetAddress: [
            settings.address.line1,
            settings.address.line2,
          ]
            .filter(Boolean)
            .join(", "),
          addressLocality: settings.address.city || "Hyderabad",
          addressRegion: settings.address.state || "Telangana",
          postalCode: settings.address.pincode,
          addressCountry: "IN",
        }
      : {
          "@type": "PostalAddress",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          addressCountry: "IN",
        },
    geo:
      typeof settings?.geo?.lat === "number" &&
      typeof settings?.geo?.lng === "number"
        ? {
            "@type": "GeoCoordinates",
            latitude: settings.geo.lat,
            longitude: settings.geo.lng,
          }
        : undefined,
    openingHours: settings?.openingHours,
    sameAs: [settings?.social?.instagram, settings?.social?.youtube].filter(
      Boolean
    ),
  });
}

export function courseJsonLd(program: CoachingProgram) {
  return cleanObject({
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.title,
    description: program.description,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: String(program.priceINR),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  });
}

export function productJsonLd(product: Product) {
  return cleanObject({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images?.length
      ? product.images.map(() => DEFAULT_OG_IMAGE)
      : [DEFAULT_OG_IMAGE],
    offers: {
      "@type": "Offer",
      price: String(product.priceINR),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/shop"),
    },
  });
}

export function faqPageJsonLd(faqs: Faq[]) {
  return cleanObject({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });
}

export function personJsonLd(settings: SiteSettings | null) {
  return cleanObject({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "WallRide Park team",
    jobTitle: "Action-sports park team",
    description: settings?.about?.bio,
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
  });
}

export function breadcrumbJsonLd(
  trail: { name: string; path: string }[]
) {
  return cleanObject({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: absoluteUrl(step.path),
    })),
  });
}
