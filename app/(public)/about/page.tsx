import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { breadcrumbJsonLd, buildMetadata, organizationJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About WallRide Park",
  description: "The story behind WallRide Park: Hyderabad’s home for BMX, skateboarding and alternative culture.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <JsonLd data={organizationJsonLd(null)} />
      <section className="wr-page-hero wr-purple">
        <div className="container grid gap-10 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <p className="wr-eyebrow mb-5 text-black/60">The WallRide story</p>
            <h1 className="wr-display max-w-4xl text-6xl leading-[0.9] tracking-[-0.06em] text-black md:text-8xl">Built because Hyderabad needed a place to ride.</h1>
          </div>
          <p className="max-w-sm text-lg leading-8 text-black/70">A safe and engaging environment supporting alternative culture—built for beginners, progressing riders and the community around them.</p>
        </div>
      </section>

      <section className="wr-section wr-paper">
        <div className="container grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-20">
          <div className="wr-photo-frame relative aspect-square">
            <Image src="/wallride/community.jpeg" alt="WallRide riders and community" fill sizes="(min-width: 768px) 40vw, 100vw" className="wr-photo-contain" />
          </div>
          <div className="max-w-2xl">
            <p className="wr-eyebrow mb-5 text-purple-700">From passion project to park</p>
            <div className="space-y-6 text-lg leading-8 text-zinc-600">
              <p>Before WallRide, riders in Hyderabad had the passion but not the infrastructure. Hamza, founder, was on his way out of another job when he saw skate culture growing across India while Hyderabad had no park.</p>
              <p>He started WallRide as a personal passion project, then took it fully professional. The track builders came from Switzerland through Velosolutions, with the ramp and skate build from Bangalore.</p>
              <p>In 2017, that idea became WallRide Park: a safe and engaging environment supporting alternative culture.</p>
            </div>
            <p className="wr-display mt-10 text-4xl tracking-[-0.03em] text-zinc-950">Ride. Learn. Progress. Together.</p>
          </div>
        </div>
      </section>

      <section className="wr-section wr-purple">
        <div className="container grid gap-10 md:grid-cols-2 md:items-center">
          <div><p className="wr-eyebrow mb-5 text-black/60">International track. Local scene.</p><h2 className="wr-display text-5xl leading-[0.95] tracking-[-0.05em] text-black md:text-7xl">Built for Hyderabad, made to a world-class standard.</h2></div>
          <p className="text-lg leading-8 text-black/70">WallRide brought together India’s first asphalt pump track built by Swiss pump-track specialists Velosolutions with skate terrain designed for progression. Since then, the park has welcomed first-time riders, regular crews, coaches, families and athletes from across India—and hosted competitions, workshops and community events.</p>
        </div>
      </section>

      <section className="wr-section wr-ink">
        <div className="container grid gap-8 md:grid-cols-3">
          {["First tries", "Bigger lines", "A real community"].map((item, index) => (
            <div key={item} className="border-t border-white/20 pt-5 text-white">
              <span className="wr-eyebrow text-fuchsia-200">0{index + 1}</span>
              <h2 className="wr-display mt-5 text-3xl tracking-[-0.03em]">{item}</h2>
              <p className="mt-3 text-sm leading-6 text-white/60">WallRide is designed to meet riders where they are and give them a reason to keep coming back.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wr-section wr-paper text-center">
        <div className="container">
          <h2 className="wr-display mx-auto max-w-3xl text-5xl leading-[0.95] tracking-[-0.05em] text-zinc-950 md:text-7xl">Come see what Hyderabad has been building.</h2>
          <div className="mt-8 flex justify-center gap-3">
            <WhatsAppCTA intent="general" size="lg" className="wr-button-dark">Message WallRide</WhatsAppCTA>
            <Button asChild size="lg" variant="outline" className="wr-button-outline"><Link href="/contact">Plan your visit</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
