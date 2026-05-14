import { groq } from "next-sanity";

import { client } from "./lib/client";
import type {
  BlogCategory,
  BlogPost,
  CoachingProgram,
  Faq,
  Location,
  MediaItem,
  PracticeTier,
  Product,
  SiteSettings,
  Testimonial,
} from "@/types/sanity";

// Caching policy: short ISR (60s) + tag-based revalidation. Schema-level
// edits via Studio will eventually flow through with no manual revalidate.
const cache = { next: { revalidate: 60 } } as const;

const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
  siteName, tagline, whatsappNumber, phoneNumber, email,
  address, geo, social, openingHours,
  hero { title, subtitle, image },
  about { bio, philosophy, photo }
}`;

const COACHING_PROGRAMS_QUERY = groq`*[_type == "coachingProgram"] | order(order asc, _createdAt asc){
  _id, title, slug, type, priceINR, sessionCount,
  sessionDurationMinutes, maxStudents, description, learnings, order
}`;

const PRACTICE_TIERS_QUERY = groq`*[_type == "practiceTier"] | order(durationHours asc){
  _id, durationHours, priceINR, description
}`;

const PRODUCTS_QUERY = groq`*[_type == "product"]{
  _id, title, slug, priceINR, description, includes, images
}`;

const PRIMARY_LOCATION_QUERY = groq`*[_type == "location" && isPrimary == true][0]{
  _id, name, type, address, geo, photos, isPrimary
}`;

const ALL_LOCATIONS_QUERY = groq`*[_type == "location"] | order(isPrimary desc, name asc){
  _id, name, type, address, geo, photos, isPrimary
}`;

const FEATURED_TESTIMONIALS_QUERY = groq`*[_type == "testimonial" && featured == true] | order(date desc)[0...6]{
  _id, studentName, parentName, quote, photo, date, featured
}`;

const FAQS_QUERY = groq`*[_type == "faq"] | order(category asc, order asc){
  _id, question, answer, category, order
}`;

const MEDIA_ITEMS_QUERY = groq`*[_type == "mediaItem"] | order(order asc, _createdAt desc)[0...12]{
  _id, caption, image, videoUrl, tags, order
}`;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY, {}, cache);
}

export async function getCoachingPrograms(): Promise<CoachingProgram[]> {
  return client.fetch<CoachingProgram[]>(COACHING_PROGRAMS_QUERY, {}, cache);
}

export async function getPracticeTiers(): Promise<PracticeTier[]> {
  return client.fetch<PracticeTier[]>(PRACTICE_TIERS_QUERY, {}, cache);
}

export async function getProducts(): Promise<Product[]> {
  return client.fetch<Product[]>(PRODUCTS_QUERY, {}, cache);
}

export async function getPrimaryLocation(): Promise<Location | null> {
  return client.fetch<Location | null>(PRIMARY_LOCATION_QUERY, {}, cache);
}

export async function getAllLocations(): Promise<Location[]> {
  return client.fetch<Location[]>(ALL_LOCATIONS_QUERY, {}, cache);
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return client.fetch<Testimonial[]>(FEATURED_TESTIMONIALS_QUERY, {}, cache);
}

export async function getFaqs(): Promise<Faq[]> {
  return client.fetch<Faq[]>(FAQS_QUERY, {}, cache);
}

export async function getMediaItems(): Promise<MediaItem[]> {
  return client.fetch<MediaItem[]>(MEDIA_ITEMS_QUERY, {}, cache);
}

// ---- Blog queries ----
// Posts are only returned when `publishedAt` is in the past — this lets
// authors schedule a post by setting a future `publishedAt`. The Sanity
// client's `perspective: "published"` already filters drafts.

const BLOG_POST_PROJECTION = groq`
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  socialImage,
  publishedAt,
  featured,
  tldr,
  keyTakeaways,
  tags,
  metaTitle,
  metaDescription,
  author->{
    _id, name, "slug": slug.current, role, bio, photo, credentials, social, email
  },
  category->{
    _id, title, "slug": slug.current, description
  }
`;

const BLOG_POSTS_QUERY = groq`
  *[_type == "blogPost" && defined(publishedAt) && publishedAt <= now()]
  | order(publishedAt desc) {
    ${BLOG_POST_PROJECTION}
  }
`;

const FEATURED_BLOG_POST_QUERY = groq`
  *[_type == "blogPost" && featured == true && defined(publishedAt) && publishedAt <= now()]
  | order(publishedAt desc)[0] {
    ${BLOG_POST_PROJECTION}
  }
`;

const BLOG_POST_BY_SLUG_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    ${BLOG_POST_PROJECTION},
    body,
    faqSection,
    externalSources,
    reviewedBy->{
      _id, name, "slug": slug.current, role, bio, photo, credentials, social
    },
    "relatedPosts": relatedPosts[]->{
      ${BLOG_POST_PROJECTION}
    }
  }
`;

const BLOG_CATEGORIES_QUERY = groq`
  *[_type == "blogCategory"] | order(order asc, title asc) {
    _id, title, "slug": slug.current, description, order
  }
`;

const BLOG_POSTS_BY_CATEGORY_QUERY = groq`
  *[_type == "blogPost"
    && category->slug.current == $categorySlug
    && defined(publishedAt)
    && publishedAt <= now()
  ] | order(publishedAt desc) {
    ${BLOG_POST_PROJECTION}
  }
`;

const BLOG_SLUGS_QUERY = groq`
  *[_type == "blogPost" && defined(publishedAt) && publishedAt <= now()].slug.current
`;

export async function getBlogPosts(): Promise<BlogPost[]> {
  return client.fetch<BlogPost[]>(BLOG_POSTS_QUERY, {}, cache);
}

export async function getFeaturedBlogPost(): Promise<BlogPost | null> {
  return client.fetch<BlogPost | null>(FEATURED_BLOG_POST_QUERY, {}, cache);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return client.fetch<BlogPost | null>(BLOG_POST_BY_SLUG_QUERY, { slug }, cache);
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  return client.fetch<BlogCategory[]>(BLOG_CATEGORIES_QUERY, {}, cache);
}

export async function getBlogPostsByCategory(
  categorySlug: string
): Promise<BlogPost[]> {
  return client.fetch<BlogPost[]>(
    BLOG_POSTS_BY_CATEGORY_QUERY,
    { categorySlug },
    cache
  );
}

export async function getAllBlogSlugs(): Promise<string[]> {
  return client.fetch<string[]>(BLOG_SLUGS_QUERY, {}, cache);
}
