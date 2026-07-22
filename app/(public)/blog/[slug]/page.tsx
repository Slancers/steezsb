import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { buildMetadata } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { getBlogPost } from "@/sanity/queries";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) notFound();
  return <><article><header className="wr-page-hero wr-paper"><div className="container max-w-5xl"><Link href="/blog" className="wr-eyebrow text-purple-700 hover:text-black">← Back to the journal</Link><p className="wr-eyebrow mt-16 text-zinc-500">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "WallRide Journal"}</p><h1 className="wr-display mt-5 max-w-4xl text-6xl leading-[0.9] tracking-[-0.06em] text-zinc-950 md:text-8xl">{post.title}</h1>{post.excerpt ? <p className="mt-7 max-w-2xl text-xl leading-8 text-zinc-600">{post.excerpt}</p> : null}</div></header>{post.coverImage ? <div className="container"><div className="relative aspect-[16/7] overflow-hidden"><Image src={urlFor(post.coverImage).width(1600).height(700).url()} alt={post.coverImage.alt ?? post.title} fill priority sizes="100vw" className="object-cover" /></div></div> : null}<div className="wr-section wr-paper"><div className="container grid gap-12 md:grid-cols-[0.65fr_1.35fr]"><aside className="text-sm text-zinc-500"><p className="wr-eyebrow text-purple-700">WallRide Journal</p>{post.tags?.length ? <div className="mt-5 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-full border border-zinc-900/15 px-3 py-1">{tag}</span>)}</div> : null}</aside><div className="prose prose-zinc max-w-2xl text-lg leading-8">{post.body?.length ? <PortableText value={post.body} /> : <p>{post.excerpt ?? "This story is being edited for publication."}</p>}<div className="not-prose mt-12 border-t border-zinc-900/15 pt-8"><WhatsAppCTA intent="general" className="wr-button-dark">Message WallRide</WhatsAppCTA></div></div></div></div></article></>;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  return buildMetadata({ title: post?.metaTitle ?? post?.title ?? "WallRide Journal", description: post?.metaDescription ?? post?.excerpt ?? "Stories from WallRide Park.", path: `/blog/${params.slug}`, ogImage: post?.coverImage ? urlFor(post.coverImage).width(1200).height(630).url() : undefined });
}
