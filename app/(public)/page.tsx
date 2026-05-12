import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { buildMetadata } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import {
  getFeaturedTestimonials,
  getMediaItems,
  getSiteSettings,
} from "@/sanity/queries";

export const metadata = buildMetadata({
  title: "STEEZE Skateboarding — Skateboarding Classes in Hyderabad",
  description:
    "Skateboarding classes, hourly bowl practice, and gear for kids and adults in Hyderabad. Coached by Hari.",
  path: "/",
});

const OFFERS = [
  {
    title: "Classes",
    desc: "1-on-1 and group coaching, beginner to skilled.",
    href: "/classes",
  },
  {
    title: "Practice",
    desc: "Hourly bowl access for independent skaters.",
    href: "/practice",
  },
  {
    title: "Kit",
    desc: "Everything a new skater needs to start.",
    href: "/shop",
  },
];

export default async function HomePage() {
  const [settings, testimonials, mediaItems] = await Promise.all([
    getSiteSettings(),
    getFeaturedTestimonials(),
    getMediaItems(),
  ]);

  const heroTitle =
    settings?.hero?.title ?? "Skateboarding coaching in Hyderabad";
  const heroSubtitle =
    settings?.hero?.subtitle ??
    "Classes, practice time, and gear — all in one place. Coached by Hari.";

  return (
    <>
      <section className="container py-16 md:py-24 lg:py-28">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {heroTitle}
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              {heroSubtitle}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <WhatsAppCTA intent="class" size="lg">
                WhatsApp for class info
              </WhatsAppCTA>
              <Button asChild variant="outline" size="lg">
                <Link href="/classes">See classes</Link>
              </Button>
            </div>
          </div>
          {settings?.hero?.image ? (
            <Image
              src={urlFor(settings.hero.image).width(800).height(600).url()}
              alt={settings.hero.image.alt ?? "Skateboarding at STEEZE"}
              width={800}
              height={600}
              priority
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
          ) : (
            <div className="aspect-[4/3] w-full rounded-lg border bg-muted" />
          )}
        </div>
      </section>

      <section className="container py-12">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
          What we offer
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {OFFERS.map((offer) => (
            <Card key={offer.href}>
              <CardHeader>
                <CardTitle>{offer.title}</CardTitle>
                <CardDescription>{offer.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href={offer.href}>Learn more</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {settings?.about?.bio ? (
        <section className="container py-12">
          <div className="grid items-center gap-10 md:grid-cols-3">
            {settings.about.photo ? (
              <Image
                src={urlFor(settings.about.photo).width(400).height(400).url()}
                alt="Hari, coach at STEEZE"
                width={400}
                height={400}
                className="aspect-square rounded-full object-cover md:col-span-1"
              />
            ) : null}
            <div className="space-y-4 md:col-span-2">
              <h2 className="text-3xl font-bold tracking-tight">About Hari</h2>
              <p className="whitespace-pre-line text-muted-foreground">
                {settings.about.bio}
              </p>
              <Button asChild variant="link" className="px-0">
                <Link href="/about">Read more →</Link>
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      {mediaItems.length > 0 ? (
        <section className="container py-12">
          <h2 className="mb-8 text-3xl font-bold tracking-tight">Gallery</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {mediaItems.slice(0, 8).map((item) =>
              item.image ? (
                <Image
                  key={item._id}
                  src={urlFor(item.image).width(400).height(400).url()}
                  alt={item.caption || item.image.alt || "STEEZE Skateboarding"}
                  width={400}
                  height={400}
                  className="aspect-square rounded-lg object-cover"
                />
              ) : null
            )}
          </div>
        </section>
      ) : null}

      {testimonials.length > 0 ? (
        <section className="container py-12">
          <h2 className="mb-8 text-3xl font-bold tracking-tight">
            What parents say
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t._id}>
                <CardContent className="pt-6">
                  <p className="italic">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {t.parentName ?? t.studentName ?? "Parent"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      <section className="container py-12 md:py-20">
        <div className="rounded-xl bg-muted p-8 text-center md:p-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to start?
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-muted-foreground">
            WhatsApp Hari directly to book a class, ask about pricing, or arrange
            a visit.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppCTA intent="general" size="lg">
              WhatsApp Hari
            </WhatsAppCTA>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact details</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
