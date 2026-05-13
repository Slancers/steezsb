import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { RouteTransition } from "@/components/effects/RouteTransition";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { StickyMobileWhatsApp } from "@/components/StickyMobileWhatsApp";
import { localBusinessJsonLd, organizationJsonLd } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/queries";

// v8 layout — Stitch nav is 80px tall (h-20). Ticker is no longer fixed
// in the layout; the home page renders its own inline ticker right below
// the nav (per the Stitch design). Other pages just sit beneath the nav.
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
      <ScrollProgress />
      <Nav />
      <main>
        <RouteTransition>{children}</RouteTransition>
      </main>
      <Footer />
      <StickyMobileWhatsApp />
      <ScrollDepthTracker />
    </>
  );
}
