import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { getBlogPosts } from "@/sanity/queries";

export const metadata = buildMetadata({ title: "WallRide Journal", description: "Beginner guides, progression notes, rider stories and park culture from WallRide Park.", path: "/blog" });

const PILLARS = [
  ["Beginner Guides", "Clear answers for people getting on a BMX bike or skateboard for the first time."],
  ["Skills & Progression", "Practical lessons about technique, confidence, practice and moving to the next level."],
  ["Riders & Community", "Stories about the riders, coaches, parents and crews building the local scene."],
  ["Events & Culture", "Announcements, preparation guides, results, photo stories and event recaps."],
  ["Park Stories", "WallRide’s history, track features, behind-the-scenes updates and the future of action sports in Hyderabad."],
];

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <><section className="wr-page-hero wr-paper"><div className="container grid gap-10 md:grid-cols-[1fr_0.7fr] md:items-end"><div><p className="wr-eyebrow mb-5 text-purple-700">The WallRide journal</p><h1 className="wr-display max-w-4xl text-7xl leading-[0.88] tracking-[-0.07em] text-zinc-950 md:text-[9rem]">Stories from the park and the people who ride it.</h1></div><p className="max-w-sm text-lg leading-8 text-zinc-600">Learn the basics, meet Hyderabad’s riders, revisit the events that shaped the scene and follow what is happening at WallRide.</p></div></section><section className="wr-section wr-paper pt-0"><div className="container">{posts.length === 0 ? <div className="border-t border-zinc-900/15 pt-6 text-zinc-600">The first WallRide stories are being prepared. Check back soon.</div> : <div className="grid gap-x-6 gap-y-14 md:grid-cols-2">{posts.map((post) => <article key={post._id} className="group"><Link href={`/blog/${post.slug.current}`} className="block"><div className="relative aspect-[16/10] overflow-hidden bg-zinc-200">{post.coverImage ? <Image src={urlFor(post.coverImage).width(1000).height(625).url()} alt={post.coverImage.alt ?? post.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" /> : <div className="absolute inset-0 bg-purple-500" />}</div><div className="mt-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-purple-700"><span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "WallRide"}</span>{post.tags?.[0] ? <><span className="text-zinc-300">✦</span><span className="text-zinc-500">{post.tags[0]}</span></> : null}</div><h2 className="wr-display mt-3 text-4xl leading-[0.95] tracking-[-0.04em] text-zinc-950">{post.title}</h2>{post.excerpt ? <p className="mt-3 max-w-xl text-base leading-7 text-zinc-600">{post.excerpt}</p> : null}</Link></article>)}</div>}<div className="mt-20 grid gap-6 border-t border-zinc-900/15 pt-8 sm:grid-cols-2 lg:grid-cols-5">{PILLARS.map(([title, text]) => <article key={title}><p className="wr-eyebrow text-purple-700">{title}</p><p className="mt-3 text-sm leading-6 text-zinc-600">{text}</p></article>)}</div></div></section><section className="wr-section wr-purple text-center"><div className="container"><h2 className="wr-display mx-auto max-w-3xl text-5xl leading-[0.95] tracking-[-0.05em] text-black md:text-7xl">Have a question or story WallRide should cover?</h2><Button asChild size="lg" className="wr-button-dark mt-8"><Link href="/contact">Suggest a story</Link></Button></div></section></>;
}
