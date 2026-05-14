import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/effects/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import {
  getBlogCategories,
  getBlogPostsByCategory,
} from "@/sanity/queries";
import type { BlogPost } from "@/types/sanity";

export const revalidate = 60;

export async function generateStaticParams() {
  const cats = await getBlogCategories();
  return cats.filter((c) => c.slug).map((c) => ({ slug: c.slug! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cats = await getBlogCategories();
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) return {};
  return buildMetadata({
    title: `${cat.title} · Blog`,
    description:
      cat.description || `Posts in the ${cat.title} category from STEEZ.`,
    path: `/blog/category/${slug}`,
  });
}

function formatDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function PostCard({ post }: { post: BlogPost }) {
  const coverUrl = post.coverImage
    ? urlFor(post.coverImage).width(800).height(600).fit("crop").url()
    : null;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border-[1.5px] border-ink bg-paper transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard"
    >
      {coverUrl ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden border-b-[1.5px] border-ink">
          <Image
            src={coverUrl}
            alt={post.coverImage?.alt || post.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="p-6">
        <h3 className="mb-3 font-display text-xl font-bold uppercase leading-[0.95] -tracking-[0.03em] md:text-2xl">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="mb-4 text-[13px] leading-relaxed text-ink-soft">
            {post.excerpt}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">
          {post.author?.name ? <span>By {post.author.name}</span> : null}
          {post.publishedAt ? <span>· {formatDate(post.publishedAt)}</span> : null}
        </div>
      </div>
    </Link>
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [cats, posts] = await Promise.all([
    getBlogCategories(),
    getBlogPostsByCategory(slug),
  ]);
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: cat.title, path: `/blog/category/${slug}` },
        ])}
      />

      <section className="container pt-12 md:pt-16">
        <Reveal>
          <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">
            <Link href="/blog" className="text-ink/60 hover:text-steeze-red">
              ← Blog
            </Link>
            <span className="text-steeze-red">/ {cat.title}</span>
          </div>
          <h1 className="font-display break-words font-bold uppercase leading-[0.9] -tracking-[0.03em] text-[clamp(40px,8vw,120px)]">
            {cat.title}
          </h1>
          {cat.description ? (
            <p className="mt-6 max-w-[560px] text-[15px] leading-relaxed text-ink-soft">
              {cat.description}
            </p>
          ) : null}
        </Reveal>
      </section>

      <section className="container py-16">
        {posts.length === 0 ? (
          <div className="border-[1.5px] border-dashed border-ink/40 bg-paper p-12 text-center">
            <div className="font-display text-2xl font-bold uppercase -tracking-[0.02em]">
              No posts yet in this category.
            </div>
            <p className="mx-auto mt-3 max-w-prose text-[14px] text-ink-soft">
              Check back soon — or browse{" "}
              <Link href="/blog" className="underline">
                all posts
              </Link>
              .
            </p>
          </div>
        ) : (
          <Reveal stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </Reveal>
        )}
      </section>
    </>
  );
}
