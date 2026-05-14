import Image from "next/image";
import Link from "next/link";

import { Marquee } from "@/components/effects/Marquee";
import { Reveal } from "@/components/effects/Reveal";
import { Arrow, StarBurst } from "@/components/icons/zine";
import { JsonLd } from "@/components/JsonLd";
import {
  getBlogCategories,
  getBlogPosts,
  getFeaturedBlogPost,
} from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { breadcrumbJsonLd, buildMetadata, SITE_NAME } from "@/lib/seo";
import type { BlogPost } from "@/types/sanity";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Blog · Skating in Hyderabad",
  description:
    "Notes from the bowl. Coaching ideas, gear thinking, and what's happening at the STEEZ park in Hyderabad.",
  path: "/blog",
});

function formatDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function readingTime(post: BlogPost): number {
  // Rough word count from PortableText blocks. Falls back to excerpt length.
  if (!post.body || !Array.isArray(post.body)) {
    return Math.max(1, Math.ceil((post.excerpt?.split(/\s+/).length ?? 60) / 200));
  }
  let words = 0;
  for (const block of post.body as Array<{ _type?: string; children?: Array<{ text?: string }> }>) {
    if (block?._type === "block" && Array.isArray(block.children)) {
      for (const child of block.children) {
        if (typeof child.text === "string") {
          words += child.text.split(/\s+/).filter(Boolean).length;
        }
      }
    }
  }
  return Math.max(1, Math.ceil(words / 200));
}

function PostCard({ post, large = false }: { post: BlogPost; large?: boolean }) {
  const coverUrl = post.coverImage
    ? urlFor(post.coverImage).width(large ? 1600 : 800).height(large ? 900 : 600).fit("crop").url()
    : null;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border-[1.5px] border-ink bg-paper transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard"
    >
      {coverUrl ? (
        <div
          className={`relative w-full overflow-hidden border-b-[1.5px] border-ink ${
            large ? "aspect-[16/9]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={coverUrl}
            alt={post.coverImage?.alt || post.title}
            fill
            sizes={large ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className={`p-6 ${large ? "md:p-10" : ""}`}>
        <div className="mb-3 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-steeze-red">
          {post.category?.title ? <span>[ {post.category.title} ]</span> : null}
          {post.featured ? <span className="text-ink/60">★ FEATURED</span> : null}
        </div>
        <h3
          className={`mb-3 font-display font-bold uppercase leading-[0.95] -tracking-[0.03em] ${
            large ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"
          }`}
        >
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className={`mb-4 text-ink-soft ${large ? "text-[15px] md:text-[16px]" : "text-[13px]"} leading-relaxed`}>
            {post.excerpt}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">
          {post.author?.name ? <span>By {post.author.name}</span> : null}
          {post.publishedAt ? <span>· {formatDate(post.publishedAt)}</span> : null}
          <span>· {readingTime(post)} min read</span>
        </div>
      </div>
    </Link>
  );
}

export default async function BlogIndexPage() {
  const [posts, featured, categories] = await Promise.all([
    getBlogPosts(),
    getFeaturedBlogPost(),
    getBlogCategories(),
  ]);

  // If a featured post exists, list it on top and exclude it from the grid.
  const gridPosts = featured ? posts.filter((p) => p._id !== featured._id) : posts;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      {/* Header */}
      <section className="container pt-12 md:pt-16">
        <Reveal>
          <div className="eyebrow-zine mb-6">[ blog ]</div>
          <h1 className="font-display break-words font-bold uppercase leading-[0.88] -tracking-[0.03em] text-[clamp(44px,10vw,160px)] md:leading-[0.85] md:-tracking-[0.05em]">
            <span className="block">NOTES</span>
            <span
              className="block text-steeze-red"
              style={{ textShadow: "6px 6px 0 #0E0D0B" }}
            >
              FROM THE
            </span>
            <span
              className="block text-transparent"
              style={{ WebkitTextStroke: "2px #0E0D0B" }}
            >
              BOWL.
            </span>
          </h1>
          <p className="mt-8 max-w-[560px] text-[15px] leading-relaxed text-ink-soft">
            Coaching thinking, gear notes, scene reports, and the occasional rant from the {SITE_NAME} concrete in Hyderabad.
          </p>
        </Reveal>
      </section>

      {/* Categories nav */}
      {categories.length > 0 ? (
        <section className="container pt-10">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2 border-y-[1.5px] border-ink py-4">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60">
                [ FILTER ]
              </span>
              <Link
                href="/blog"
                className="border-[1.5px] border-ink bg-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-paper"
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/blog/category/${cat.slug}`}
                  className="border-[1.5px] border-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-steeze-red hover:text-paper"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      ) : null}

      <Marquee variant="dark">
        <StarBurst className="text-steeze-red" /> WRITING <Arrow size={32} />{" "}
        SKATING <Arrow size={32} /> THINKING <Arrow size={32} /> WRITING{" "}
        <Arrow size={32} /> SKATING <Arrow size={32} />
      </Marquee>

      {/* Featured post — full width */}
      {featured ? (
        <section className="container py-16 md:py-20">
          <Reveal>
            <div className="s-num-zine mb-4">[ FEATURED ]</div>
            <PostCard post={featured} large />
          </Reveal>
        </section>
      ) : null}

      {/* Posts grid */}
      <section className="container pb-24">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b-[1.5px] border-ink pb-8">
            <div>
              <div className="s-num-zine mb-2">[ ALL POSTS ]</div>
              <h2 className="s-title-zine">latest.</h2>
            </div>
            {posts.length > 0 ? (
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </p>
            ) : null}
          </div>
        </Reveal>

        {gridPosts.length === 0 ? (
          <Reveal>
            <div className="border-[1.5px] border-dashed border-ink/40 bg-paper p-12 text-center">
              <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-steeze-red">
                [ DRAFTING ]
              </div>
              <div className="font-display text-3xl font-bold uppercase -tracking-[0.02em] md:text-4xl">
                First post coming soon.
              </div>
              <p className="mx-auto mt-4 max-w-prose text-[14px] text-ink-soft">
                The blog is wired up. Posts written in Studio publish here automatically.
              </p>
            </div>
          </Reveal>
        ) : (
          <Reveal stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </Reveal>
        )}
      </section>
    </>
  );
}
