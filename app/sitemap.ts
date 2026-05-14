import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";
import { getAllBlogSlugs, getBlogCategories } from "@/sanity/queries";

const STATIC_PATHS: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/classes", priority: 0.9 },
  { path: "/practice", priority: 0.8 },
  { path: "/shop", priority: 0.8 },
  { path: "/blog", priority: 0.8 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
  { path: "/faq", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [slugs, categories] = await Promise.all([
    getAllBlogSlugs(),
    getBlogCategories(),
  ]);

  const staticEntries = STATIC_PATHS.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority,
  }));

  const blogEntries = slugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const categoryEntries = categories
    .filter((c) => c.slug)
    .map((c) => ({
      url: `${SITE_URL}/blog/category/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));

  return [...staticEntries, ...blogEntries, ...categoryEntries];
}
