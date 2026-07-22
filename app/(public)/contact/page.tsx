import Link from "next/link";

import { Button } from "@/components/ui/button";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Visit WallRide Park",
  description: "Find WallRide Park in Peeran Cheruvu, Hyderabad. Message us for current timings, rentals and directions.",
  path: "/contact",
});

export default function ContactPage() {
  const questions = [
    ["Can complete beginners visit?", "Yes. Ask WallRide about the right class or session before coming."],
    ["Are classes available for children and adults?", "WallRide has historically coached different ages and experience levels. Confirm the current schedule directly."],
    ["Can I rent equipment?", "Rental availability changes. Message WallRide before visiting."],
  ];

  return <><section className="wr-page-hero wr-ink text-white"><div className="container grid gap-10 md:grid-cols-[1fr_0.7fr] md:items-end"><div><p className="wr-eyebrow mb-5 text-fuchsia-200">Visit / contact</p><h1 className="wr-display max-w-4xl text-7xl leading-[0.88] tracking-[-0.07em] md:text-[9rem]">Plan your session.</h1></div><p className="max-w-sm pb-2 text-lg leading-8 text-white/65">WallRide Park is located in Peeran Cheruvu, Hyderabad, off Chevella Road.</p></div></section><section className="wr-section wr-paper"><div className="container grid gap-12 md:grid-cols-[0.8fr_1.2fr]"><div><p className="wr-eyebrow mb-5 text-purple-700">Before you come</p><h2 className="wr-display text-5xl leading-[0.95] tracking-[-0.05em] text-zinc-950 md:text-7xl">Ask before you ride.</h2><p className="mt-6 max-w-lg text-lg leading-8 text-zinc-600">Wear comfortable clothes and closed shoes. Bring your own BMX bike or skateboard unless WallRide has confirmed rental availability. Check the current safety-gear requirements before your session.</p><div className="mt-8 flex flex-wrap gap-3"><WhatsAppCTA intent="general" size="lg" className="wr-button-dark">WhatsApp WallRide</WhatsAppCTA><Button asChild size="lg" variant="outline" className="wr-button-outline"><Link href="/practice">Plan your visit</Link></Button></div></div><div className="grid gap-8 sm:grid-cols-2"><div className="border-t border-zinc-900/15 pt-5"><p className="wr-eyebrow text-zinc-500">Hours / entry</p><p className="wr-display mt-4 text-3xl text-zinc-950">3:00 pm—9:00 pm</p><p className="mt-3 text-zinc-600">Closed Wednesdays · ₹250 / hour</p></div><div className="border-t border-zinc-900/15 pt-5"><p className="wr-eyebrow text-zinc-500">Rental equipment</p><p className="wr-display mt-4 text-3xl text-zinc-950">Skateboard ₹150 / hour</p><p className="mt-3 text-zinc-600">Availability changes. Message before visiting.</p></div><div className="border-t border-zinc-900/15 pt-5"><p className="wr-eyebrow text-zinc-500">Contact</p><p className="mt-4 text-lg leading-8 text-zinc-600">WhatsApp and phone details are being confirmed. Instagram is <a className="font-bold text-purple-700" href="https://instagram.com/wallrideparkhyd" target="_blank" rel="noopener noreferrer">@wallrideparkhyd ↗</a></p></div><div className="border-t border-zinc-900/15 pt-5"><p className="wr-eyebrow text-zinc-500">Google Maps</p><p className="mt-4 text-lg leading-8 text-zinc-600">The map link is being confirmed. Message WallRide for directions before your session.</p></div></div></div></section><section className="wr-section wr-purple"><div className="container"><p className="wr-eyebrow mb-5 text-black/60">Quick questions</p><div className="grid gap-6 md:grid-cols-3">{questions.map(([question, answer]) => <article key={question} className="border-t border-black/20 pt-5"><h2 className="wr-display text-3xl leading-[0.95] text-black">{question}</h2><p className="mt-4 text-base leading-7 text-black/70">{answer}</p></article>)}</div></div></section></>;
}
