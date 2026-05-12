import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { StickyMobileWhatsApp } from "@/components/StickyMobileWhatsApp";
import { localBusinessJsonLd, organizationJsonLd } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/queries";

// Layout for the public marketing site. Wraps every public page with the
// shared chrome — top nav, footer, sticky mobile WhatsApp button — and
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
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyMobileWhatsApp />
      <ScrollDepthTracker />
    </>
  );
}
