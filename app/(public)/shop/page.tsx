import Link from "next/link";

import { PageHero } from "@/components/public/PageHero";
import { Button } from "@/components/ui/button";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "WallRide Shop",
  description: "WallRide drops, partner brands and event tickets. Coming soon.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <PageHero
      eyebrow="The WallRide shop"
      title="Drops are coming."
      description="We’re building a small, useful shop with partner brands, WallRide drops and event tickets later."
      actions={
        <>
          <WhatsAppCTA intent="kit" size="lg" className="wr-button-primary">Ask about availability</WhatsAppCTA>
          <Button asChild size="lg" className="wr-button-outline"><Link href="/contact">Contact WallRide</Link></Button>
        </>
      }
    />
  );
}
