import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/public/PageHero";
import { PortableArticle } from "@/components/public/PortableArticle";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { buildMetadata } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { getBlogPost } from "@/sanity/queries";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) notFound();

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "WallRide Journal";

  return (
    <article>
      <PageHero
        eyebrow={date}
        title={post.title}
        description={post.excerpt}
        actions={<Link href="/blog" className="inline-flex text-sm font-bold text-[#7138d3] hover:text-[#17171b]">← Back to the journal</Link>}
      />

      {post.coverImage ? (
        <div className="container wr-article-shell -mt-10 relative z-10">
          <div className="wr-article-cover">
            <Image
              src={urlFor(post.coverImage).width(1600).height(800).url()}
              alt={post.coverImage.alt ?? post.title}
              fill
              priority
              sizes="(min-width: 1280px) 1184px, 100vw"
            />
          </div>
        </div>
      ) : null}

      <section className="wr-section wr-section-muted">
        <div className="container wr-article-shell wr-article-layout">
          <aside className="wr-article-aside">
            <p className="font-bold uppercase tracking-[0.12em] text-[#7138d3]">WallRide Journal</p>
            {post.tags?.length ? (
              <div className="mt-5">
                {post.tags.map((tag) => <span key={tag} className="wr-article-tag">{tag}</span>)}
              </div>
            ) : null}
          </aside>
          <div className="wr-article-body">
            {post.body?.length ? <PortableArticle body={post.body} /> : <p>{post.excerpt ?? "This story is being edited for publication."}</p>}
            <div className="mt-12 border-t border-black/15 pt-8">
              <WhatsAppCTA intent="general" className="wr-button-primary">Message WallRide</WhatsAppCTA>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) {
    return {
      ...buildMetadata({ title: "Story not found", description: "This WallRide story is not available.", path: "/blog" }),
      robots: { index: false, follow: false },
    };
  }
  return buildMetadata({
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt ?? "Stories from WallRide Park.",
    path: `/blog/${params.slug}`,
    ogImage: post.coverImage ? urlFor(post.coverImage).width(1200).height(630).url() : undefined,
  });
}
