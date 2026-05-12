import Image from "next/image";

import { JsonLd } from "@/components/JsonLd";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { breadcrumbJsonLd, buildMetadata, personJsonLd } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { getSiteSettings } from "@/sanity/queries";

export const metadata = buildMetadata({
  title: "About Hari",
  description:
    "About Hari, the coach behind STEEZE Skateboarding. Coaching philosophy and why STEEZE exists.",
  path: "/about",
});

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const bio = settings?.about?.bio;
  const philosophy = settings?.about?.philosophy;
  const photo = settings?.about?.photo;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <JsonLd data={personJsonLd(settings)} />

      <section className="container py-12 md:py-16">
        <div className="grid items-start gap-12 md:grid-cols-3">
          <div className="md:col-span-1">
            {photo ? (
              <Image
                src={urlFor(photo).width(500).height(600).url()}
                alt="Hari, coach at STEEZE Skateboarding"
                width={500}
                height={600}
                className="aspect-[5/6] w-full rounded-lg object-cover"
                priority
              />
            ) : (
              <div className="aspect-[5/6] w-full rounded-lg border bg-muted" />
            )}
          </div>

          <div className="space-y-8 md:col-span-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                About Hari
              </h1>
            </div>

            <div>
              <h2 className="mb-3 text-xl font-semibold">Bio</h2>
              {bio ? (
                <p className="whitespace-pre-line text-muted-foreground">{bio}</p>
              ) : (
                <p className="text-muted-foreground">
                  Hari&apos;s bio will appear here once added in Sanity Studio.
                </p>
              )}
            </div>

            {philosophy ? (
              <div>
                <h2 className="mb-3 text-xl font-semibold">
                  Coaching philosophy
                </h2>
                <p className="whitespace-pre-line text-muted-foreground">
                  {philosophy}
                </p>
              </div>
            ) : null}

            <div>
              <h2 className="mb-3 text-xl font-semibold">Why STEEZE</h2>
              <p className="text-muted-foreground">
                Skateboarding in Hyderabad is still small. STEEZE exists to
                give parents a trustworthy place to start their kids — clear
                pricing, real coaching, and a safe bowl to practice in.
              </p>
            </div>

            <div className="pt-4">
              <WhatsAppCTA intent="general" size="lg">
                WhatsApp Hari
              </WhatsAppCTA>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
