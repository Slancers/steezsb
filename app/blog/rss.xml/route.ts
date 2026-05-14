import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";
import { getBlogPosts } from "@/sanity/queries";

export const revalidate = 300;

// Escape characters that have special meaning inside CDATA sections / XML.
function xmlEscape(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getBlogPosts();
  const lastBuildDate = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const link = absoluteUrl(`/blog/${post.slug}`);
      const pubDate = post.publishedAt
        ? new Date(post.publishedAt).toUTCString()
        : lastBuildDate;
      const description = xmlEscape(post.excerpt || post.tldr || "");
      const title = xmlEscape(post.title);
      const author = post.author?.email
        ? `${post.author.email} (${post.author.name})`
        : post.author?.name || "STEEZ";
      const category = post.category?.title
        ? `<category>${xmlEscape(post.category.title)}</category>`
        : "";
      return `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      <author>${xmlEscape(author)}</author>
      ${category}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(SITE_NAME)} · Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Notes from the bowl. Coaching, gear, scene reports from STEEZ in Hyderabad.</description>
    <language>en-IN</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
