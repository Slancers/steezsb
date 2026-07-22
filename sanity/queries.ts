import { groq } from "next-sanity";

import { client } from "./lib/client";
import type {
  CoachingProgram,
  Faq,
  Location,
  BlogPost,
  MediaBuzz,
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

const BLOG_POSTS_QUERY = groq`*[_type == "blogPost" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc){
  _id, title, slug, excerpt, coverImage, publishedAt, tags, metaTitle, metaDescription
}`;

const BLOG_POST_QUERY = groq`*[_type == "blogPost" && slug.current == $slug && defined(publishedAt) && publishedAt <= now()][0]{
  _id, title, slug, excerpt, coverImage, body, publishedAt, tags, metaTitle, metaDescription
}`;

const MEDIA_BUZZ_QUERY = groq`*[_type == "mediaBuzz" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc){
  _id, headline, slug, publication, publishedAt, excerpt, coverImage, sourceUrl, featured
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

export async function getBlogPosts(): Promise<BlogPost[]> {
  return client.fetch<BlogPost[]>(BLOG_POSTS_QUERY, {}, cache);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return client.fetch<BlogPost | null>(BLOG_POST_QUERY, { slug }, cache);
}

export async function getMediaBuzz(): Promise<MediaBuzz[]> {
  return client.fetch<MediaBuzz[]>(MEDIA_BUZZ_QUERY, {}, cache);
}
