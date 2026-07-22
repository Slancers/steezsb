import Image from "next/image";
import Link from "next/link";

import { buildMetadata } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { getMediaBuzz } from "@/sanity/queries";

export const metadata = buildMetadata({ title: "WallRide in the news", description: "Press, news and media mentions featuring WallRide Park and Hyderabad’s action-sports community.", path: "/media-buzz" });

export default async function MediaBuzzPage() {
  const mentions = await getMediaBuzz();
  return <><section className="wr-page-hero wr-ink text-white"><div className="container grid gap-10 md:grid-cols-[1fr_0.7fr] md:items-end"><div><p className="wr-eyebrow mb-5 text-fuchsia-200">Media buzz</p><h1 className="wr-display max-w-4xl text-7xl leading-[0.88] tracking-[-0.07em] md:text-[9rem]">Good noise travels.</h1></div><p className="max-w-sm pb-2 text-lg leading-8 text-white/65">Stories, features and mentions from people paying attention to what’s happening at WallRide.</p></div></section><section className="wr-section wr-paper pt-0"><div className="container">{mentions.length === 0 ? <div className="border-t border-zinc-900/15 pt-6 text-zinc-600">Media mentions will appear here as they’re added in Sanity.</div> : <div className="grid gap-6 md:grid-cols-2">{mentions.map((mention) => <article key={mention._id} className="group border-t border-zinc-900/15 pt-5">{mention.coverImage ? <div className="relative mb-5 aspect-[16/9] overflow-hidden bg-zinc-200"><Image src={urlFor(mention.coverImage).width(1000).height(563).url()} alt={mention.coverImage.alt ?? mention.headline} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" /></div> : null}<p className="wr-eyebrow text-purple-700">{mention.publication} · {mention.publishedAt ? new Date(mention.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : ""}</p><h2 className="wr-display mt-4 text-4xl leading-[0.95] tracking-[-0.04em] text-zinc-950">{mention.headline}</h2>{mention.excerpt ? <p className="mt-4 text-base leading-7 text-zinc-600">{mention.excerpt}</p> : null}<Link href={mention.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm font-bold uppercase tracking-[0.12em] text-purple-700 hover:text-black">Read the original ↗</Link></article>)}</div>}</div></section></>;
}
