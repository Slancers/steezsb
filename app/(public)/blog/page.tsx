import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/public/PageHero";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { getBlogPosts } from "@/sanity/queries";

export const metadata = buildMetadata({
  title: "WallRide Journal",
  description: "Beginner guides, progression notes, rider stories and park culture from WallRide Park.",
  path: "/blog",
});

const PILLARS = [
  ["Beginner Guides", "Clear answers for people getting on a BMX bike or skateboard for the first time."],
  ["Skills and Progression", "Practical lessons about technique, confidence, practice and moving to the next level."],
  ["Riders and Community", "Stories about the riders, coaches, parents and crews building the local scene."],
  ["Events and Culture", "Announcements, preparation guides, results, photo stories and event recaps."],
  ["Park Stories", "WallRide’s history, track features, behind-the-scenes updates and the future of action sports in Hyderabad."],
];

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageHero
        eyebrow="The WallRide journal"
        title="Stories from the park and the people who ride it."
        description="Learn the basics, meet Hyderabad’s riders, revisit the events that shaped the scene and follow what is happening at WallRide."
      />

      <section className="wr-section wr-section-muted">
        <div className="container">
          {posts.length === 0 ? (
            <div className="wr-empty-state">The first WallRide stories are being prepared. Check back soon.</div>
          ) : (
            <div className="wr-collection-grid">
              {posts.map((post) => (
                <article key={post._id} className="wr-collection-card group">
                  <Link href={`/blog/${post.slug.current}`} className="block">
                    <div className="wr-collection-image">
                      {post.coverImage ? (
                        <Image
                          src={urlFor(post.coverImage).width(1100).height(688).url()}
                          alt={post.coverImage.alt ?? post.title}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                        />
                      ) : null}
                    </div>
                    <p className="wr-collection-meta">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                        : "WallRide"}
                      {post.tags?.[0] ? ` | ${post.tags[0]}` : ""}
                    </p>
                    <h2 className="wr-collection-title">{post.title}</h2>
                    {post.excerpt ? <p className="wr-collection-copy">{post.excerpt}</p> : null}
                  </Link>
                </article>
              ))}
            </div>
          )}

          <div className="wr-info-grid mt-20">
            {PILLARS.map(([title, text]) => (
              <article key={title} className="wr-info-card">
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wr-section wr-section-accent">
        <div className="container">
          <h2 className="wr-section-heading">Have a question or story WallRide should cover?</h2>
          <div className="wr-cta-group">
            <Button asChild size="lg" className="wr-button-light"><Link href="/contact">Suggest a story</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
