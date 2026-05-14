import { defineField, defineType } from "sanity";

// Blog post — extended for SEO / AEO / GEO. Most fields are optional;
// authors fill what's relevant to each post. Required fields are kept
// minimal so drafts don't get blocked.
export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO / AEO" },
    { name: "structure", title: "Structure" },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    // ----- Content -----
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description: "1-2 sentence summary shown on listing pages and feeds.",
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
      group: "content",
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
      ],
      group: "content",
    }),

    // ----- Authorship (E-E-A-T) -----
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "reviewedBy",
      title: "Reviewed by",
      type: "reference",
      to: [{ type: "author" }],
      group: "content",
      description:
        "Optional. The expert who verified this post. Strong E-E-A-T signal (e.g. Hari reviewing a post Joe wrote about coaching).",
    }),

    // ----- AEO: extracts that AI engines preferentially cite -----
    defineField({
      name: "tldr",
      title: "TL;DR",
      type: "text",
      rows: 3,
      group: "seo",
      description:
        "2-3 sentence summary that AI answer engines cite. Make it self-contained — readable without the rest of the post.",
    }),
    defineField({
      name: "keyTakeaways",
      title: "Key takeaways",
      type: "array",
      of: [{ type: "string" }],
      group: "seo",
      description:
        "3-6 short bullet points. Renders at the top of the post and feeds the structured data — high-value for AI citation.",
    }),
    defineField({
      name: "faqSection",
      title: "FAQ section",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              type: "string",
              validation: (r) => r.required(),
            },
            {
              name: "answer",
              type: "text",
              rows: 3,
              validation: (r) => r.required(),
            },
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        },
      ],
      group: "seo",
      description:
        "Optional Q&A block. Renders as FAQPage JSON-LD — one of the highest-ROI moves for AEO citation.",
    }),

    // ----- Structure -----
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "blogCategory" }],
      group: "structure",
      description: "Single category. Drives /blog/category/<slug> URL.",
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "structure",
      description: "Free-form labels. Multiple per post.",
    }),
    defineField({
      name: "relatedPosts",
      title: "Related posts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blogPost" }] }],
      validation: (r) => r.max(3),
      group: "structure",
      description:
        "Up to 3 manually-picked related posts. Improves internal linking and dwell time.",
    }),
    defineField({
      name: "externalSources",
      title: "External sources",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              validation: (r) => r.required(),
            },
            {
              name: "url",
              type: "url",
              validation: (r) => r.required(),
            },
          ],
        },
      ],
      group: "structure",
      description:
        "Citations / further-reading links. Builds authority and helps with research-style queries.",
    }),

    // ----- Meta -----
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "meta",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      group: "meta",
      initialValue: false,
      description: "Show this post in the featured slot on the blog index.",
    }),
    defineField({
      name: "metaTitle",
      title: "Meta title (SEO)",
      type: "string",
      group: "seo",
      description:
        "Overrides <title>. Leave empty to use post title. ~50-60 chars.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description (SEO)",
      type: "text",
      rows: 3,
      group: "seo",
      description:
        "Overrides description meta + OG description. ~150-160 chars.",
    }),
    defineField({
      name: "socialImage",
      title: "Social image (OG override)",
      type: "image",
      options: { hotspot: true },
      group: "seo",
      description:
        "Optional. Used as the OG / Twitter card image instead of the cover image. 1200×630 ideal.",
    }),
  ],
  orderings: [
    {
      title: "Published date (newest first)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Featured first",
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "publishedAt", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "publishedAt",
      media: "coverImage",
      author: "author.name",
      featured: "featured",
    },
    prepare: ({ title, date, media, author, featured }) => ({
      title: featured ? `★ ${title}` : title,
      subtitle: [
        author,
        date ? new Date(date).toLocaleDateString("en-IN") : "Draft",
      ]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
});
