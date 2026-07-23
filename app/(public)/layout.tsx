import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { MotionRoot } from "@/components/public/MotionRoot";
import { StickyMobileWhatsApp } from "@/components/StickyMobileWhatsApp";
import { localBusinessJsonLd, organizationJsonLd } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/queries";

// Layout for the public marketing site. Wraps every public page with the
// shared chrome: top nav, footer, sticky mobile WhatsApp button, and
// emits the site-wide LocalBusiness + Organization JSON-LD blocks.
export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <JsonLd data={organizationJsonLd(settings)} />
      <JsonLd data={localBusinessJsonLd(settings)} />
      <a href="#main-content" className="wr-skip-link">Skip to content</a>
      <Nav />
      <main id="main-content" className="flex-1"><MotionRoot>{children}</MotionRoot></main>
      <Footer />
      <StickyMobileWhatsApp />
      <ScrollDepthTracker />
    </>
  );
}
