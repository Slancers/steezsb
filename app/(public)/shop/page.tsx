import Link from "next/link";

import { Button } from "@/components/ui/button";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "WallRide Shop",
  description: "WallRide drops, partner brands and event tickets—coming soon.",
  path: "/shop",
});

export default function ShopPage() {
  return <section className="wr-page-hero wr-purple"><div className="container grid min-h-[620px] items-end gap-10 md:grid-cols-[1fr_0.7fr]"><div className="pb-10"><p className="wr-eyebrow mb-5 text-black/60">The WallRide shop</p><h1 className="wr-display max-w-4xl text-7xl leading-[0.85] tracking-[-0.07em] text-black md:text-[9rem]">Drops are coming.</h1></div><div className="max-w-sm pb-10 text-lg leading-8 text-black/70"><p>We’re building a small, useful shop with partner brands, WallRide drops and—later—event tickets.</p><div className="mt-8 flex flex-wrap gap-3"><WhatsAppCTA intent="kit" size="lg" className="wr-button-dark">Ask about availability</WhatsAppCTA><Button asChild size="lg" variant="outline" className="border-black/30 text-black"><Link href="/contact">Contact WallRide</Link></Button></div></div></div></section>;
}
