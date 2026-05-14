import type { PortableTextComponents } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/effects/Reveal";
import { Arrow, WhatsAppIcon } from "@/components/icons/zine";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import {
  blogFaqSectionJsonLd,
  blogPostingJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
  speakableJsonLd,
} from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
} from "@/sanity/queries";
import type { BlogPost, SanityImage } from "@/types/sanity";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  const title = post.metaTitle || post.title;
  const description =
    post.metaDescription || post.excerpt || post.tldr || undefined;
  const imageSource = post.socialImage || post.coverImage;
  const ogImage = imageSource
    ? urlFor(imageSource).width(1200).height(630).fit("crop").url()
    : undefined;
  return buildMetadata({
    title,
    description: description || "",
    path: `/blog/${slug}`,
    ogImage,
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

function readingTime(post: BlogPost): number {
  if (!post.body || !Array.isArray(post.body)) return 3;
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

// PortableText component overrides — keeps body styling on-brand with v8.
const ptComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 font-display text-3xl font-bold uppercase leading-tight -tracking-[0.02em] md:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 font-display text-2xl font-bold uppercase leading-tight -tracking-[0.02em] md:text-3xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 font-display text-xl font-bold uppercase -tracking-[0.02em]">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="my-5 text-[16px] leading-[1.75] text-ink md:text-[17px]">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-steeze-red bg-paper-deep px-6 py-4 font-display text-2xl italic leading-snug md:text-3xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 space-y-2 pl-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 list-decimal space-y-2 pl-6">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2.5 text-[16px] leading-[1.75] text-ink md:text-[17px]">
        <span className="mt-1 shrink-0 font-display font-bold text-steeze-red">
          →
        </span>
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-ink">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="underline decoration-steeze-red decoration-2 underline-offset-4 transition-colors hover:text-steeze-red"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!value?.asset) return null;
      const url = urlFor(value).width(1600).fit("max").url();
      return (
        <figure className="my-10">
          <div className="relative aspect-[16/9] w-full overflow-hidden border-[1.5px] border-ink">
            <Image
              src={url}
              alt={value.alt || ""}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
          {value.alt ? (
            <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">
              {value.alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const coverUrl = post.coverImage
    ? urlFor(post.coverImage).width(1600).height(900).fit("crop").url()
    : null;
  const authorPhotoUrl = post.author?.photo
    ? urlFor(post.author.photo).width(120).height(120).fit("crop").url()
    : null;
  const reviewerPhotoUrl = post.reviewedBy?.photo
    ? urlFor(post.reviewedBy.photo).width(80).height(80).fit("crop").url()
    : null;
  const ogImageUrl =
    post.socialImage
      ? urlFor(post.socialImage).width(1200).height(630).fit("crop").url()
      : coverUrl || undefined;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          ...(post.category?.slug
            ? [{ name: post.category.title, path: `/blog/category/${post.category.slug}` }]
            : []),
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <JsonLd
        data={blogPostingJsonLd(post, {
          coverImageUrl: ogImageUrl,
          authorImageUrl: authorPhotoUrl || undefined,
          reviewerImageUrl: reviewerPhotoUrl || undefined,
        })}
      />
      {post.faqSection && post.faqSection.length > 0 ? (
        <JsonLd data={blogFaqSectionJsonLd(post.faqSection)} />
      ) : null}
      <JsonLd
        data={speakableJsonLd([
          ".post-tldr",
          ".post-key-takeaways",
        ])}
      />

      {/* Header */}
      <article className="container pt-12 md:pt-16">
        <Reveal>
          <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">
            <Link href="/blog" className="text-ink/60 hover:text-steeze-red">
              ← Blog
            </Link>
            {post.category?.slug ? (
              <Link
                href={`/blog/category/${post.category.slug}`}
                className="text-steeze-red hover:underline"
              >
                / {post.category.title}
              </Link>
            ) : null}
          </div>

          <h1 className="font-display break-words font-bold uppercase leading-[0.92] -tracking-[0.03em] text-[clamp(36px,7vw,96px)] md:leading-[0.9]">
            {post.title}
          </h1>

          {/* Byline */}
          <div className="mt-8 flex flex-wrap items-center gap-4 border-y-[1.5px] border-ink py-4">
            {post.author ? (
              <div className="flex items-center gap-3">
                {authorPhotoUrl ? (
                  <div className="relative h-10 w-10 overflow-hidden border-[1.5px] border-ink">
                    <Image
                      src={authorPhotoUrl}
                      alt={post.author.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60">
                    [ AUTHOR ]
                  </div>
                  <div className="font-display text-base font-bold uppercase -tracking-[0.02em]">
                    {post.author.name}
                  </div>
                  {post.author.role ? (
                    <div className="text-[11px] text-ink/60">{post.author.role}</div>
                  ) : null}
                </div>
              </div>
            ) : null}
            <div className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">
              {post.publishedAt ? <span>{formatDate(post.publishedAt)}</span> : null}
              <span>· {readingTime(post)} min read</span>
            </div>
          </div>
        </Reveal>

        {/* Cover */}
        {coverUrl ? (
          <Reveal>
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden border-[1.5px] border-ink">
              <Image
                src={coverUrl}
                alt={post.coverImage?.alt || post.title}
                fill
                priority
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        ) : null}

        {/* TL;DR */}
        {post.tldr ? (
          <Reveal>
            <div className="post-tldr mt-10 border-[1.5px] border-ink bg-paper-deep p-6 md:p-8">
              <div className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-steeze-red">
                [ TL;DR ]
              </div>
              <p className="font-display text-xl leading-snug md:text-2xl">
                {post.tldr}
              </p>
            </div>
          </Reveal>
        ) : null}

        {/* Key takeaways */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 ? (
          <Reveal>
            <div className="post-key-takeaways mt-8 border-[1.5px] border-ink bg-paper p-6 md:p-8">
              <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-steeze-red">
                [ KEY TAKEAWAYS ]
              </div>
              <ul className="space-y-2.5">
                {post.keyTakeaways.map((line, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[15px] leading-relaxed text-ink md:text-[16px]"
                  >
                    <span className="mt-1 shrink-0 font-display font-bold text-steeze-red">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ) : null}

        {/* Body */}
        <Reveal>
          <div className="post-body mt-12 max-w-prose">
            {post.body ? (
              <PortableText
                value={post.body as Parameters<typeof PortableText>[0]["value"]}
                components={ptComponents}
              />
            ) : null}
          </div>
        </Reveal>

        {/* FAQ section */}
        {post.faqSection && post.faqSection.length > 0 ? (
          <Reveal>
            <section className="mt-16 border-t-[1.5px] border-ink pt-12">
              <div className="mb-8">
                <div className="s-num-zine mb-2">[ FAQ ]</div>
                <h2 className="s-title-zine">questions.</h2>
              </div>
              <div className="space-y-4">
                {post.faqSection.map((faq, i) => (
                  <details
                    key={i}
                    className="group border-[1.5px] border-ink bg-paper p-5 transition-colors hover:bg-paper-deep"
                  >
                    <summary className="flex cursor-pointer items-start justify-between gap-4 font-display text-lg font-bold uppercase -tracking-[0.02em] md:text-xl">
                      <span>{faq.question}</span>
                      <span className="shrink-0 font-mono text-steeze-red transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft md:text-[16px]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </Reveal>
        ) : null}

        {/* External sources */}
        {post.externalSources && post.externalSources.length > 0 ? (
          <Reveal>
            <section className="mt-16 border-t-[1.5px] border-ink pt-12">
              <div className="mb-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-steeze-red">
                [ SOURCES / FURTHER READING ]
              </div>
              <ul className="space-y-2">
                {post.externalSources.map((src, i) => (
                  <li key={i} className="text-[14px]">
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-steeze-red decoration-2 underline-offset-4 hover:text-steeze-red"
                    >
                      {src.title} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ) : null}

        {/* Reviewer credit */}
        {post.reviewedBy ? (
          <Reveal>
            <section className="mt-16 border-[1.5px] border-dashed border-ink/40 bg-paper p-6 md:p-8">
              <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-steeze-red">
                [ REVIEWED BY ]
              </div>
              <div className="flex items-center gap-4">
                {reviewerPhotoUrl ? (
                  <div className="relative h-14 w-14 overflow-hidden border-[1.5px] border-ink">
                    <Image
                      src={reviewerPhotoUrl}
                      alt={post.reviewedBy.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div>
                  <div className="font-display text-lg font-bold uppercase -tracking-[0.02em]">
                    {post.reviewedBy.name}
                  </div>
                  {post.reviewedBy.role ? (
                    <div className="text-[12px] text-ink/60">{post.reviewedBy.role}</div>
                  ) : null}
                  {post.reviewedBy.bio ? (
                    <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                      {post.reviewedBy.bio}
                    </p>
                  ) : null}
                </div>
              </div>
            </section>
          </Reveal>
        ) : null}

        {/* Author footer */}
        {post.author ? (
          <Reveal>
            <section className="mt-12 border-t-[1.5px] border-ink pt-10">
              <div className="flex items-start gap-5">
                {authorPhotoUrl ? (
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden border-[1.5px] border-ink">
                    <Image
                      src={authorPhotoUrl}
                      alt={post.author.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60">
                    [ ABOUT THE AUTHOR ]
                  </div>
                  <div className="font-display text-2xl font-bold uppercase -tracking-[0.02em]">
                    {post.author.name}
                  </div>
                  {post.author.role ? (
                    <div className="text-[12px] text-ink/60">{post.author.role}</div>
                  ) : null}
                  {post.author.bio ? (
                    <p className="mt-3 max-w-prose text-[14px] leading-relaxed text-ink-soft">
                      {post.author.bio}
                    </p>
                  ) : null}
                  {post.author.credentials && post.author.credentials.length > 0 ? (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {post.author.credentials.map((c) => (
                        <li
                          key={c}
                          className="border border-ink/40 px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </section>
          </Reveal>
        ) : null}

        {/* Tags */}
        {post.tags && post.tags.length > 0 ? (
          <Reveal>
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="border-[1.5px] border-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </Reveal>
        ) : null}

        {/* Related posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 ? (
          <section className="mt-20 border-t-[1.5px] border-ink pt-12">
            <div className="mb-8">
              <div className="s-num-zine mb-2">[ KEEP READING ]</div>
              <h2 className="s-title-zine">related.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {post.relatedPosts.slice(0, 3).map((rp) => {
                const rpCover = rp.coverImage
                  ? urlFor(rp.coverImage).width(600).height(450).fit("crop").url()
                  : null;
                return (
                  <Link
                    key={rp._id}
                    href={`/blog/${rp.slug}`}
                    className="group block border-[1.5px] border-ink bg-paper transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard"
                  >
                    {rpCover ? (
                      <div className="relative aspect-[4/3] w-full overflow-hidden border-b-[1.5px] border-ink">
                        <Image
                          src={rpCover}
                          alt={rp.coverImage?.alt || rp.title}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : null}
                    <div className="p-5">
                      {rp.category?.title ? (
                        <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-steeze-red">
                          [ {rp.category.title} ]
                        </div>
                      ) : null}
                      <h3 className="font-display text-lg font-bold uppercase -tracking-[0.02em]">
                        {rp.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}

        {/* Closing CTA */}
        <section className="my-20 border-[1.5px] border-ink bg-paper p-10 text-center md:p-14">
          <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-steeze-red">
            [ READ THIS? COME SKATE. ]
          </div>
          <h2 className="font-display text-3xl font-bold uppercase leading-[0.9] -tracking-[0.04em] md:text-5xl">
            Show up. <span className="text-steeze-red">Try it.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-[15px] text-ink-soft">
            Easiest way to skate at the bowl is to WhatsApp Hari and book a slot.
          </p>
          <div className="mt-8">
            <WhatsAppCTA intent="general" className="btn-zine btn-zine--red">
              <WhatsAppIcon size={16} /> WHATSAPP US <Arrow size={16} />
            </WhatsAppCTA>
          </div>
        </section>
      </article>
    </>
  );
}
