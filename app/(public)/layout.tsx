import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { Preloader } from "@/components/effects/Preloader";
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
      <Preloader />
      <CustomCursor />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyMobileWhatsApp />
      <ScrollDepthTracker />
    </>
  );
}
