import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { RouteTransition } from "@/components/effects/RouteTransition";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { StatusTicker } from "@/components/effects/StatusTicker";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { StickyMobileWhatsApp } from "@/components/StickyMobileWhatsApp";
import { localBusinessJsonLd, organizationJsonLd } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/queries";

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
      <div className="fixed inset-x-0 top-[60px] z-40 md:top-[68px]">
        <StatusTicker />
      </div>
      <main className="pt-[100px] md:pt-[108px]">
        <RouteTransition>{children}</RouteTransition>
      </main>
      <Footer />
      <StickyMobileWhatsApp />
      <ScrollDepthTracker />
    </>
  );
}
