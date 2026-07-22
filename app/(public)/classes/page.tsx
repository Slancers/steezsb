import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Classes at WallRide Park",
  description: "BMX, skateboarding and pump track classes in Hyderabad for beginners and progressing riders.",
  path: "/classes",
});

const CLASSES = [
  { title: "BMX classes", label: "Find your flow", text: "Learn balance, bike control, pumping, cornering and the foundations needed to ride the track with flow.", details: "₹6,000 for 8 classes · Schedule to be confirmed", image: "/wallride/pump-track.jpeg" },
  { title: "Skateboarding classes", label: "Start with balance", text: "Start with stance, balance, pushing and stopping before progressing to lines, transitions and tricks.", details: "Price and schedule to be confirmed", image: "/wallride/classes.jpeg" },
];

export default function ClassesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Classes", path: "/classes" }])} />
      <section className="wr-page-hero wr-ink text-white">
        <div className="container grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="wr-eyebrow mb-5 text-fuchsia-200">Classes at WallRide</p>
            <h1 className="wr-display max-w-4xl text-6xl leading-[0.9] tracking-[-0.06em] md:text-8xl">Start from zero. Progress from there.</h1>
          </div>
          <p className="max-w-sm text-lg leading-8 text-white/65">You don’t need experience to begin. Tell us the rider’s age, discipline and level—we’ll help choose the right session.</p>
        </div>
      </section>

      <section className="wr-section wr-paper">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            {CLASSES.map((item, index) => (
              <article key={item.title} className="wr-feature group">
                <div className="flex items-baseline justify-between"><span className="wr-eyebrow text-purple-700">0{index + 1}</span><span className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-400">All levels</span></div>
                <div className="relative mt-6 aspect-square overflow-hidden bg-zinc-950"><Image src={item.image} alt={item.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="wr-photo-contain transition duration-700 group-hover:scale-[1.02]" /></div>
                <p className="mt-8 text-sm font-bold uppercase tracking-[0.12em] text-zinc-500">{item.label}</p>
                <h2 className="wr-display mt-2 text-4xl tracking-[-0.04em] text-zinc-950">{item.title}</h2>
                <p className="mt-4 text-base leading-7 text-zinc-600">{item.text}</p>
                <p className="mt-4 text-sm font-semibold leading-6 text-zinc-500">Suitable for beginners and progressing riders<br />{item.details}</p>
                <WhatsAppCTA intent="class" className="wr-button-dark mt-7">Ask about {item.title}</WhatsAppCTA>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wr-section wr-purple">
        <div className="container grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <div><p className="wr-eyebrow mb-5 text-black/60">Class details</p><h2 className="wr-display max-w-xl text-5xl leading-[0.95] tracking-[-0.05em] text-black md:text-7xl">A better first session starts with the right questions.</h2></div>
          <div className="space-y-6 text-lg leading-8 text-black/70"><p>Tell us the rider’s age, discipline and experience level. We will help you choose the right session and explain what equipment and safety gear to bring.</p><p>Equipment availability and current rental options should be confirmed before visiting.</p><div className="flex flex-wrap gap-3"><WhatsAppCTA intent="class" size="lg" className="wr-button-dark">Message WallRide on WhatsApp</WhatsAppCTA><Button asChild size="lg" variant="outline" className="border-black/30 text-black"><Link href="/contact">Visit the park</Link></Button></div></div>
        </div>
      </section>
    </>
  );
}
