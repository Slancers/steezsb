import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/public/PageHero";
import { buildMetadata } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { getMediaBuzz } from "@/sanity/queries";

export const metadata = buildMetadata({
  title: "WallRide in the news",
  description: "Press, news and media mentions featuring WallRide Park and Hyderabad’s action-sports community.",
  path: "/media-buzz",
});

export default async function MediaBuzzPage() {
  const mentions = await getMediaBuzz();

  return (
    <>
      <PageHero
        eyebrow="Media buzz"
        title="Good noise travels."
        description="Stories, features and mentions from people paying attention to what’s happening at WallRide."
      />
      <section className="wr-section wr-section-muted">
        <div className="container">
          {mentions.length === 0 ? (
            <div className="wr-empty-state">Media mentions will appear here as they’re added in Sanity.</div>
          ) : (
            <div className="wr-collection-grid">
              {mentions.map((mention) => (
                <article key={mention._id} className="wr-collection-card group">
                  {mention.coverImage ? (
                    <div className="wr-collection-image">
                      <Image
                        src={urlFor(mention.coverImage).width(1100).height(688).url()}
                        alt={mention.coverImage.alt ?? mention.headline}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                  ) : null}
                  <p className="wr-collection-meta">
                    {mention.publication}
                    {mention.publishedAt
                      ? ` | ${new Date(mention.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`
                      : ""}
                  </p>
                  <h2 className="wr-collection-title">{mention.headline}</h2>
                  {mention.excerpt ? <p className="wr-collection-copy">{mention.excerpt}</p> : null}
                  <Link href={mention.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm font-bold text-[#7138d3] hover:text-[#17171b]">Read the original ↗</Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
