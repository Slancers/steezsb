import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Plan your visit to WallRide Park",
  description: "Opening hours, entry, rentals and what to know before your WallRide Park session in Hyderabad.",
  path: "/practice",
});

export default function PracticePage() {
  return (
    <>
      <section className="wr-page-hero wr-paper">
        <div className="container grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div><p className="wr-eyebrow mb-5 text-purple-700">Plan your visit</p><h1 className="wr-display text-6xl leading-[0.9] tracking-[-0.06em] text-zinc-950 md:text-8xl">Make a day of it.</h1></div>
          <div className="wr-photo-frame relative aspect-square"><Image src="/wallride/pump-track.jpeg" alt="WallRide Park pump track" fill sizes="(min-width: 768px) 48vw, 100vw" className="wr-photo-contain" /></div>
        </div>
      </section>

      <section className="wr-section wr-ink text-white">
        <div className="container grid gap-12 md:grid-cols-[1fr_1fr]">
          <div><p className="wr-eyebrow mb-5 text-fuchsia-200">The essentials</p><h2 className="wr-display text-5xl leading-[0.95] tracking-[-0.05em] md:text-7xl">Everything you need before you roll in.</h2></div>
          <div className="grid gap-8 sm:grid-cols-2">
            {[ ["Hours", "3:00 pm—9:00 pm", "Closed Wednesdays"], ["Entry", "₹250 / hour", "Confirm current rates before visiting"], ["Rental skateboard", "₹150 / hour", "Availability can change"], ["Good to bring", "Comfortable clothes", "Closed shoes and your own gear where possible"] ].map(([label, value, note]) => <div key={label} className="border-t border-white/20 pt-4"><p className="wr-eyebrow text-white/45">{label}</p><p className="wr-display mt-4 text-2xl">{value}</p><p className="mt-2 text-sm leading-6 text-white/55">{note}</p></div>)}
          </div>
        </div>
      </section>

      <section className="wr-section wr-paper">
        <div className="container grid gap-10 md:grid-cols-2 md:items-center"><div><p className="wr-eyebrow mb-5 text-purple-700">A little more than a session</p><h2 className="wr-display text-5xl leading-[0.95] tracking-[-0.05em] text-zinc-950 md:text-7xl">Park, water, toilets, greenery—and room to breathe.</h2></div><div className="text-lg leading-8 text-zinc-600"><p>WallRide is set in a nature-filled setting in Peeran Cheruvu, off Chevella Road. It’s pet friendly and built for spending time at the park, not just passing through.</p><div className="mt-8 flex flex-wrap gap-3"><WhatsAppCTA intent="practice" size="lg" className="wr-button-dark">Check today’s details</WhatsAppCTA><Button asChild size="lg" variant="outline" className="wr-button-outline"><Link href="/contact">Get directions</Link></Button></div></div></div>
      </section>
    </>
  );
}
