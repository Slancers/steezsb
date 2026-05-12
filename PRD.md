# PRODUCT REQUIREMENTS DOCUMENT

## STEEZE Skateboarding

### Marketing + Lead-Gen Website — V1

**Version 2.0 · May 2026 · Confidential**

**Owner:** Joe Prasen
**Client:** Hari (STEEZE Skateboarding, Hyderabad)
**Status:** v2 — supersedes v1 (2026-05-03). Ready for Claude Code build phase.

**Changes from v1:**
- WhatsApp integration approach explicitly resolved: `wa.me` deep links, no WhatsApp Business API in V1 (see Section 7).
- Analytics standardised to GA4 via GTM (matches Rajguru convention; was "GA4" only in v1).
- Features re-cast into P0 / P1 / P2 priority tables.
- "Non-Goals" → "Out of Scope V1".
- Success metrics restructured into Primary / Secondary table.
- Added "Why Next.js" rationale block.

---

## 1. Overview

### Problem

Hari teaches skateboarding at Sriram International Academy in Hyderabad and sometimes runs classes at outside skate parks. He has zero web presence today. Parents who hear about him have nowhere to land — no page that builds confidence, explains the program, shows the bowl, lists pricing, or makes it easy to inquire. Closest competitors in Hyderabad are virtually invisible on Google, so the bar to win the local search and AI-answer markets is low.

### Solution

A marketing + lead-generation website that converts traffic into WhatsApp inquiries, then into paying students or bowl-time bookings. The site does not handle payment. Every conversion happens via WhatsApp, with a lightweight attribution layer so Joe can prove which paying students came from the site (the basis for his per-student fee).

### Mission

Be the obvious place to learn skateboarding in Hyderabad — first for Sriram International Academy parents, then for the wider city via Google and AI-powered search.

### V1 Scope

V1 ships a content-driven marketing site with:
- Seven public pages: Home, Classes, Practice, Shop, About, Contact, FAQ.
- WhatsApp-based conversion on every page, with per-click lead attribution stored in Sanity.
- Sanity-managed content (programs, pricing, photos, testimonials, FAQs, site settings).
- Full SEO / AEO / GEO baseline (sitemap, robots, llms.txt, JSON-LD on every page).
- GA4 via GTM with conversion-event tracking.

V1 does not include payments, accounts, blog content, calendar widgets, or the WhatsApp Business API. See Section 5.

---

## 2. Target User

**Primary: Sriram International Academy parents.** They already trust the school. They may not yet know skateboarding is offered, or may be on the fence about safety, cost, or schedule. The site's job for them is to remove every objection in one visit and route to WhatsApp.

**Secondary: Hyderabad parents searching for skateboarding classes for their kids.** They arrive via Google, Instagram, or word of mouth at skate parks. The site must rank for local queries and surface in AI answer engines.

**Tertiary: Adult / older-teen learners + existing skaters wanting independent bowl time.** Small but real. One CTA each, no dedicated funnel.

### User Pain Points

- No reliable way to discover Hari today — name doesn't surface on Google.
- Parents who do hear about him have no page to validate "is this safe, structured, real?"
- Existing skaters in Hyderabad have no transparent listing of bowl-access pricing or timings.
- Skate-culture sites are aimed at teens, not parents — language and visuals create friction.

---

## 3. Platform

STEEZE V1 ships as a **mobile-first responsive website** at Hari's domain (TBC, likely `steezeskateboarding.com`). No native app. No PWA install flow.

- Mobile is the primary experience — most parents in Hyderabad search on phone.
- Desktop is supported and tested but secondary.
- Sticky bottom WhatsApp button on mobile is functional, not cosmetic — preserve through the design pass.
- All major browsers supported (Chrome, Safari, Firefox, Edge).

### Why Next.js (App Router)

Next.js is the only correct choice for this build. Each requirement points back to it:

| Goal | Why Next.js |
|---|---|
| SEO | Server-Side Rendering and Static Generation guarantee Google crawls all content. Pure React SPAs are often partially indexed. |
| AEO / GEO | Per-page metadata API allows JSON-LD on every route. AI engines parse structured data to surface answers. |
| Performance | Built-in image optimisation, code splitting, edge caching → Core Web Vitals 90+ out of the box. |
| GTM / GA4 | Server-rendered HTML makes tag firing reliable. No SPA hydration issues that cause missed events. |
| Developer flow | Joe's standard. Vercel is a one-click deploy. Sanity has first-class Next.js integration. |

---

## 4. Features — V1

V1 features grouped by surface area. P0 = must ship for launch. P1 = ship if time permits, otherwise immediate post-launch. P2 = nice-to-have, defer to backlog.

### 4.1 Site Pages & Information Architecture

| Feature | Description | Priority |
|---|---|---|
| Home (`/`) | Hero + three-offer routing (Classes, Practice, Kit) + about snippet + gallery + testimonials + final CTA strip. | P0 |
| Classes (`/classes`) | 1-on-1 and Group pricing cards, "what students learn", locations note, WhatsApp CTAs with intent `class`. | P0 |
| Practice / Bowl (`/practice`) | Timings, hourly tiers (from Sanity), what's included, photos, WhatsApp CTAs with intent `practice`. | P0 |
| Shop (`/shop`) | STEEZE Skate Kit ₹15,000 with components list, photos, WhatsApp CTA with intent `kit`. | P0 |
| About (`/about`) | Hari's bio, photo, coaching philosophy, why STEEZE exists, soft CTA. | P0 |
| Contact (`/contact`) | Phone, WhatsApp button, bowl address + Google Maps embed, schedule note. | P0 |
| FAQ (`/faq`) | Sanity-driven Q&A grouped by category. Seeds parent questions for SEO/AEO. | P0 |
| Blog (`/blog`) | Routes and Sanity schema scaffolded but no content at launch — retainer covers post-launch publishing. | P1 |

### 4.2 Global UI

| Feature | Description | Priority |
|---|---|---|
| Top nav | Logo + page links + prominent WhatsApp CTA. | P0 |
| Sticky mobile WhatsApp button | Always visible on mobile. Functional, not cosmetic — preserved through design pass. | P0 |
| Footer | Contact, location, social, "Designed by Joe" credit, legal links. | P0 |
| Cookie / privacy banner | None in V1 (no third-party tracking beyond GA4 via GTM, no PII collected without consent). Add only if legal review demands. | P2 |

### 4.3 WhatsApp Lead Capture & Attribution

This is the most important technical surface. Detailed spec in Section 7.

| Feature | Description | Priority |
|---|---|---|
| `wa.me` deep link CTAs | Every WhatsApp button on the site routes through `/api/lead` then opens a `wa.me` URL with a prefilled, intent-aware message and a 6-character ref code. | P0 |
| Lead document creation | Each click writes a `lead` document to Sanity (`status: 'new'`) with sourcePage, intent, timestamp, userAgent. | P0 |
| Ref code | 6 alphanumeric chars derived from Sanity `_id`. Embedded in the WhatsApp prefilled message so Hari can match the inbound message to the lead. | P0 |
| Status workflow in Sanity | Joe / Hari move leads `new` → `contacted` → `converted` (or `lost`) inside Sanity Studio. | P0 |
| Manual lead entry | Sanity Studio supports adding a lead directly with `sourcePage: 'direct'` for word-of-mouth or off-site inbound. | P0 |
| Rate limit | `/api/lead` rejects >5 requests per IP per minute to prevent abuse. | P1 |
| Auto-archive stale leads | Leads in `new` for 30+ days auto-set to `lost`. | P2 |

### 4.4 Content Management (Sanity)

| Feature | Description | Priority |
|---|---|---|
| Sanity Studio | Hosted Studio. Joe is sole editor in V1; Hari can be added later. | P0 |
| Public schemas | `siteSettings`, `coachingProgram`, `practiceTier`, `product`, `location`, `testimonial`, `faq`, `mediaItem`, `blogPost`. | P0 |
| Private schemas | `lead`, `student`. Excluded from all public GROQ queries. | P0 |
| Image hosting | Sanity assets, served via `next/image`. Alt text auto-pulled from Sanity image alt field. | P0 |
| Blog post schema | Defined in V1 so post-launch publishing is unblocked. No posts at launch. | P1 |

### 4.5 SEO / AEO / GEO

Detailed spec in Section 9.

| Feature | Description | Priority |
|---|---|---|
| Metadata API | Unique title + description + OG + Twitter + canonical on every page. | P0 |
| `app/sitemap.ts` | Dynamic, includes Sanity-driven slugs. | P0 |
| `app/robots.ts` | Allow all crawlers, sitemap reference. | P0 |
| `/llms.txt` | Short factual summary at site root for LLM ingestion. | P0 |
| JSON-LD | `LocalBusiness` site-wide; `Course` on `/classes`; `Product` on `/shop`; `FAQPage` on `/faq`; `Person` on `/about`; `Organization`; `BreadcrumbList`. | P0 |
| FAQ visible + structured | All FAQs rendered on-page (not collapsed-and-hidden) and wrapped in `FAQPage` JSON-LD. | P0 |
| Core Web Vitals | LCP < 2.5s, CLS < 0.1, INP < 200ms on mobile. | P0 |

### 4.6 Analytics (GA4 via GTM)

| Feature | Description | Priority |
|---|---|---|
| GTM container | Embedded in `<head>` and `<body>` of the Next.js root layout. GA4 connected as a tag inside GTM. **Not hardcoded.** | P0 |
| Pageview tracking | Default GA4 pageview firing on every route. Verified in GTM Preview. | P0 |
| Conversion events | See table below. Configured as GA4 events via GTM. | P0 |

**Conversion events:**

| Event | Trigger | Priority |
|---|---|---|
| `whatsapp_click` | User clicks any WhatsApp CTA (fires before `/api/lead`). | Critical |
| `lead_created` | `/api/lead` returns successfully (lead written to Sanity). | Critical |
| `phone_click` | Click on `tel:` link on `/contact`. | High |
| `kit_view` | User reaches `/shop`. | Medium |
| `faq_engagement` | User expands or scrolls past 50% of `/faq`. | Medium |
| `scroll_depth_50` | User scrolls 50% of any page. | Medium |

---

## 5. Out of Scope — V1

The following are confirmed for post-launch or V2. They must not be built in V1 under any circumstance.

- Online payments / checkout (all transactions via WhatsApp).
- WhatsApp Business API and any chatbot / templated-message automation. See Section 7 for rationale.
- User accounts, authentication, or login.
- Email automation or newsletter capture.
- Live calendar / booking widget. Inquiry → WhatsApp is the V1 flow.
- Blog content at launch. Schema and routes are scaffolded; post-launch retainer publishes.
- Multi-language support — English only.
- E-commerce checkout for the kit.
- Hari-side Sanity editing access (V1 has Joe as sole editor; revisit after launch).
- A11y audit beyond default semantic HTML and `next/image` alts. Full WCAG audit is V2.

---

## 6. Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | Joe's standard. SSR + SSG. |
| Styling | **Tailwind CSS** | Mobile-first utility classes. |
| Components | **shadcn/ui** | For default-UI build phase. |
| CMS | **Sanity v3** | Hosted Studio. Free tier sufficient for V1. |
| Hosting | **Vercel** | Native Next.js. Preview deploys per PR. |
| Domain | Hari-owned (TBC) | Likely `steezeskateboarding.com`. |
| Image hosting | Sanity assets via `next/image` | Auto-optimised, lazy-loaded. |
| Fonts | `next/font` | No layout shift on font load. |
| Analytics | **GA4 via GTM** | GTM container in layout; GA4 as tag. Not hardcoded. |
| Forms | None (V1) | All CTAs route through `/api/lead` to `wa.me`. |
| Error monitoring | Sentry (free tier) | `/api/lead` failures must be logged. |

### Environment variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=          # required — /api/lead writes to Sanity
NEXT_PUBLIC_WHATSAPP_NUMBER=     # E.164 format, no '+' (e.g. 919876543210)
NEXT_PUBLIC_GTM_ID=              # GTM container ID (e.g. GTM-XXXXXXX)
NEXT_PUBLIC_SITE_URL=
SENTRY_DSN=                      # optional but recommended
```

---

## 7. WhatsApp Attribution Flow (Core Technical IP)

This is the core technical surface of STEEZE V1. **If this is broken, Joe's compensation model breaks.** Build and test end-to-end before anything else.

### Approach: `wa.me` deep links, no Business API

V1 uses plain WhatsApp `wa.me` click-to-chat URLs that open Hari's existing personal or WhatsApp Business app. No Meta Business verification, no per-conversation costs, no chatbot stack.

### Why this approach (not the alternatives)

| Option | Verdict | Why |
|---|---|---|
| **`wa.me` deep links (V1 choice)** | ✅ Ship | Zero setup. Works with Hari's existing number. Free. Pre-filled messages carry context. Sufficient for a small-business booking funnel. |
| WhatsApp Business app (free) | ✅ Recommend Hari install | Free upgrade. Adds business profile, auto-replies, quick replies, labels. Site code unchanged — still uses `wa.me`. |
| WhatsApp Business API / Cloud API | ❌ Skip in V1 | Paid per conversation. Requires Meta Business verification, a fresh phone number, and Business Manager setup. Designed for templated messaging, chatbots, CRM sync — overkill for a single coach taking inquiries. |

### Number setup requirements (for Hari)

- Provide a single WhatsApp number for the site, in international format **without `+`** or spaces (e.g. `919876543210`).
- Number must be active on WhatsApp before launch — `wa.me` URLs to non-WhatsApp numbers fail silently.
- Strong recommendation: install the free WhatsApp Business app on that number for business-grade UX (away messages, quick replies, labels). Site behaviour is unchanged.

### User journey

1. Visitor lands on a page (e.g. `/classes`).
2. Clicks any WhatsApp CTA.
3. Frontend POSTs to `/api/lead` with `{ sourcePage, intent, timestamp, userAgent }`.
4. API route creates a `lead` document in Sanity with `status: 'new'`, returns the doc `_id` and a 6-character `refCode`.
5. Frontend constructs the `wa.me` URL with a prefilled, intent-templated message including the ref code:
   ```
   Hi! I'm interested in classes at STEEZE. [ref: a3f8k2]
   ```
6. Frontend opens the URL in a new tab.
7. Hari (or Joe, monitoring) sees the inbound WhatsApp message with the ref code.
8. In Sanity Studio, the lead is found by `refCode`, marked `contacted`, then `converted` if the visitor becomes a paying student. Optionally linked to a `student` document for record-keeping.
9. Monthly comp: GROQ query for leads where `convertedAt` falls in the billing period × per-student fee, plus retainer.

### API endpoint

```
POST /api/lead
Body:    { sourcePage: string, intent: 'class' | 'practice' | 'kit' | 'general', timestamp: string (ISO), userAgent: string }
Response: { leadId: string, refCode: string, whatsappUrl: string }
```

The endpoint:
- Generates a `refCode` (last 6 alphanumeric chars of the new Sanity `_id`, lowercased).
- Writes the `lead` document with `status: 'new'`.
- Builds the `wa.me` URL using `NEXT_PUBLIC_WHATSAPP_NUMBER` and an `intent`-templated prefilled message.
- Returns the URL so the client can `window.open` it.
- Rate-limits 5 requests per IP per minute.

### Edge cases

- **User never opens WhatsApp after click.** Lead stays `new`. Reconcile manually or auto-archive after 30 days.
- **User contacts Hari directly without the ref code.** Hari adds the lead manually in Sanity with `sourcePage: 'direct'`.
- **Same person clicks multiple times.** No write-time dedupe (no phone available yet). Reconcile in Sanity by linking duplicates to a single `student`.
- **`/api/lead` write fails.** Still open the WhatsApp link with no ref code. Log to Sentry. Never block the user.

---

## 8. Sanity Schemas

All schemas live in `sanity/schemas/` as TypeScript definitions. Public schemas can be queried by the public site via GROQ. Private schemas (`lead`, `student`) must be excluded from every public query — add a doc-level guard.

### 8.1 `siteSettings` (singleton)

```ts
{
  name: 'siteSettings',
  type: 'document',
  fields: [
    { name: 'siteName', type: 'string' },
    { name: 'tagline', type: 'string' },
    { name: 'whatsappNumber', type: 'string' },     // E.164, no '+'
    { name: 'phoneNumber', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'address', type: 'object', fields: [
        { name: 'line1', type: 'string' },
        { name: 'line2', type: 'string' },
        { name: 'city', type: 'string' },
        { name: 'state', type: 'string' },
        { name: 'pincode', type: 'string' },
    ]},
    { name: 'geo', type: 'object', fields: [
        { name: 'lat', type: 'number' },
        { name: 'lng', type: 'number' },
    ]},
    { name: 'social', type: 'object', fields: [
        { name: 'instagram', type: 'url' },
        { name: 'youtube', type: 'url' },
    ]},
    { name: 'openingHours', type: 'array', of: [{ type: 'string' }] },
  ]
}
```

### 8.2 `coachingProgram`

```ts
{
  name: 'coachingProgram',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },                         // "1-on-1 Coaching"
    { name: 'slug', type: 'slug' },
    { name: 'type', type: 'string', options: { list: ['1on1', 'group'] }},
    { name: 'priceINR', type: 'number' },                      // 12000
    { name: 'sessionCount', type: 'number' },                  // 8
    { name: 'sessionDurationMinutes', type: 'number' },        // 60
    { name: 'maxStudents', type: 'number' },                   // 1 or 10
    { name: 'description', type: 'text' },
    { name: 'learnings', type: 'array', of: [{ type: 'string' }] },
    { name: 'order', type: 'number' },
  ]
}
```

### 8.3 `practiceTier`

```ts
{
  name: 'practiceTier',
  type: 'document',
  fields: [
    { name: 'durationHours', type: 'number' },     // 1, 2, 3
    { name: 'priceINR', type: 'number' },
    { name: 'description', type: 'text' },
  ]
}
```

### 8.4 `product`

```ts
{
  name: 'product',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug' },
    { name: 'priceINR', type: 'number' },
    { name: 'description', type: 'text' },
    { name: 'includes', type: 'array', of: [{ type: 'string' }] },
    { name: 'images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
  ]
}
```

### 8.5 `location`

```ts
{
  name: 'location',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'type', type: 'string', options: { list: ['bowl', 'skatepark'] }},
    { name: 'address', type: 'string' },
    { name: 'geo', type: 'object', fields: [
        { name: 'lat', type: 'number' },
        { name: 'lng', type: 'number' },
    ]},
    { name: 'photos', type: 'array', of: [{ type: 'image' }] },
    { name: 'isPrimary', type: 'boolean' },
  ]
}
```

### 8.6 `testimonial`

```ts
{
  name: 'testimonial',
  type: 'document',
  fields: [
    { name: 'studentName', type: 'string' },
    { name: 'parentName', type: 'string' },
    { name: 'quote', type: 'text' },
    { name: 'photo', type: 'image' },
    { name: 'date', type: 'date' },
    { name: 'featured', type: 'boolean' },
  ]
}
```

### 8.7 `faq`

```ts
{
  name: 'faq',
  type: 'document',
  fields: [
    { name: 'question', type: 'string' },
    { name: 'answer', type: 'text' },
    { name: 'category', type: 'string' },          // 'classes' | 'practice' | 'gear' | 'general'
    { name: 'order', type: 'number' },
  ]
}
```

### 8.8 `mediaItem`

```ts
{
  name: 'mediaItem',
  type: 'document',
  fields: [
    { name: 'caption', type: 'string' },
    { name: 'image', type: 'image' },
    { name: 'videoUrl', type: 'url' },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'order', type: 'number' },
  ]
}
```

### 8.9 `blogPost` (scaffolded, no posts at launch)

```ts
{
  name: 'blogPost',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug' },
    { name: 'excerpt', type: 'text' },
    { name: 'coverImage', type: 'image' },
    { name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'metaTitle', type: 'string' },
    { name: 'metaDescription', type: 'text' },
  ]
}
```

### 8.10 `lead` (private)

```ts
{
  name: 'lead',
  type: 'document',
  fields: [
    { name: 'refCode', type: 'string' },           // last 6 chars of _id
    { name: 'sourcePage', type: 'string' },        // '/classes', '/practice', etc.
    { name: 'intent', type: 'string', options: { list: ['class', 'practice', 'kit', 'general', 'direct'] }},
    { name: 'createdAt', type: 'datetime' },
    { name: 'userAgent', type: 'string' },
    { name: 'status', type: 'string', options: { list: ['new', 'contacted', 'converted', 'lost'], initialValue: 'new' }},
    { name: 'contactedAt', type: 'datetime' },
    { name: 'convertedAt', type: 'datetime' },
    { name: 'notes', type: 'text' },
    { name: 'student', type: 'reference', to: [{ type: 'student' }] },
  ]
}
```

### 8.11 `student` (private)

```ts
{
  name: 'student',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'parentName', type: 'string' },
    { name: 'enrolledProgram', type: 'reference', to: [{ type: 'coachingProgram' }] },
    { name: 'enrolledAt', type: 'date' },
    { name: 'attributedLead', type: 'reference', to: [{ type: 'lead' }] },
    { name: 'paid', type: 'boolean' },
    { name: 'feeBilledToHari', type: 'boolean' },     // Joe marks once invoiced
  ]
}
```

> All public GROQ queries MUST exclude `_type == "lead"` and `_type == "student"`.

---

## 9. SEO, AEO, GEO Optimization

A primary requirement, not polish. Hyderabad audience search is mostly mobile + Google + increasingly LLM answer engines.

### SEO baseline (every page)

- Next.js Metadata API: `title`, `description`, `openGraph`, `twitter`, `alternates.canonical`.
- Dynamic `app/sitemap.ts` includes Sanity-driven slugs.
- `app/robots.ts` allows all crawlers, references sitemap.
- Semantic HTML — exactly one `h1` per page, logical heading hierarchy.
- Every image via `next/image` with descriptive `alt` from Sanity.
- Internal linking: Classes ↔ FAQ ↔ About; Home links into all.
- Core Web Vitals targets: **LCP < 2.5s, CLS < 0.1, INP < 200ms** (mobile).
- HTTPS-only, no mixed content.

### AEO (LLM and answer engines)

- `/llms.txt` at site root — short, factual summary of what STEEZE is, services offered, location, contact, links to key pages. Generated from Sanity `siteSettings`.
- JSON-LD on every page:
  - `LocalBusiness` site-wide (with `address`, `geo`, `telephone`, `openingHours`, `priceRange`).
  - `Course` on `/classes` (one per program).
  - `Product` with `offers` on `/shop`.
  - `FAQPage` on `/faq`.
  - `Person` for Hari on `/about`.
  - `Organization` site-wide.
  - `BreadcrumbList` on inner pages.
- Copy style: **concrete, factual, jargon-light.** "Group classes are ₹6,000 for 8 one-hour sessions" beats "Affordable group coaching tailored to every learner."
- FAQs phrased as questions parents actually type: "Is skateboarding safe for my child?", "What gear do I need to buy?", "Where exactly are the classes held?"

### GEO (local SEO)

- City keywords in title tags and H1s (e.g. "Skateboarding Coaching in Hyderabad").
- `LocalBusiness` schema with accurate `geo.lat`/`geo.lng` of the bowl.
- Locations listed as full postal addresses, not neighbourhood names alone.
- Google Maps embed on `/contact`.
- Google Business Profile claim + linkback (manual; in launch checklist).
- Mention Hyderabad / Madhapur / Hitech City naturally — once or twice per page, not stuffed.
- NAP consistency (Name / Address / Phone) — identical exact format everywhere on the site, matches GBP.

---

## 10. Non-Functional Requirements

| Feature | Description | Priority |
|---|---|---|
| Mobile UX | All tap targets ≥ 44px. No horizontal scroll. Body font ≥ 16px. | P0 |
| Performance | LCP < 2.5s, CLS < 0.1, INP < 200ms on mobile. PageSpeed 90+ mobile and desktop. | P0 |
| Error handling | Graceful states for `/api/lead` failure, network offline, Sanity unavailable. WhatsApp link still opens on lead-write failure. | P0 |
| Privacy | No PII collected without explicit user action (lead docs only contain page + intent + UA + timestamp). No third-party tracking beyond GTM/GA4. | P0 |
| Accessibility | Semantic HTML, alt text, keyboard-navigable nav, focus-visible states. Full WCAG audit deferred to V2. | P1 |
| Browser support | Latest two versions of Chrome, Safari, Firefox, Edge. iOS Safari 15+. | P0 |
| Uptime | Vercel default. No SLA needed in V1. | P1 |

---

## 11. Success Metrics — V1

V1 is a validation exercise. These metrics determine whether to proceed to V2 work (paid ads, blog scaling, optional native app, calendar widget).

| Metric | Description | Target | Tier |
|---|---|---|---|
| Lead volume | `whatsapp_click` events per month after launch. | 30+ in month 1 | Primary |
| Contacted-rate | % of new leads moved to `contacted` in Sanity within 48h. | ≥ 80% | Primary |
| Conversion-rate | % of new leads that become paying students (`status: 'converted'`). | ≥ 15% in first 90 days | Primary |
| Attribution coverage | % of new students with `attributedLead` populated (vs. direct/manual). | ≥ 60% | Primary |
| Local SEO | Site appears on page 1 of Google for "skateboarding classes Hyderabad" + 2 related queries. | Within 90 days | Secondary |
| AEO surfacing | Site cited in ChatGPT / Perplexity for "where can my kid learn skateboarding in Hyderabad". | Within 90 days | Secondary |
| Core Web Vitals | All green on real-user data (CrUX). | Continuous | Secondary |
| GBP | Google Business Profile claimed, NAP matches site, ≥ 5 photos, ≥ 1 review. | Within 30 days | Secondary |

---

## 12. Open Items (Need from Hari Before Launch)

Build can proceed with placeholders. These block launch only.

- [ ] WhatsApp number for CTAs (E.164, no `+`).
- [ ] Phone number for contact page.
- [ ] Bowl physical address (full postal).
- [ ] Bowl latitude/longitude (for map embed + `LocalBusiness` schema).
- [ ] Practice / bowl hourly pricing (1hr / 2hr / 3hr).
- [ ] Photos: Hari portrait, bowl, 3-5 student action shots.
- [ ] Student / parent testimonials (3-5).
- [ ] Class schedule at Sriram (days, times, batch sizes).
- [ ] Age range for students.
- [ ] Gear policy — does Hari provide helmet/pads or are students expected to bring?
- [ ] Trial-class offering — yes/no, and price if yes.
- [ ] Domain confirmation (likely `steezeskateboarding.com`).
- [ ] Hari's bio for `/about`.
- [ ] Instagram / YouTube handles for footer + social schema.
- [ ] Sriram International Academy's go-ahead to mention by name on the site.
- [ ] Confirmation Hari has installed WhatsApp Business app on the site number (recommended).

---

## 13. Launch Checklist

| Item | Status | Notes |
|---|---|---|
| All Section 12 open items resolved | ⬜ | Blocks launch. |
| Sanity Studio deployed; Joe has admin access | ⬜ | |
| `lead` and `student` doc types excluded from public GROQ queries | ⬜ | Verify with a public query. |
| **WhatsApp attribution tested end-to-end** | ⬜ | Click CTA → lead doc in Sanity → WhatsApp opens with correct ref code → mark `contacted` then `converted` in Studio. |
| Real content on every page (no `TBD:` placeholders) | ⬜ | Grep the codebase. |
| `sitemap.xml`, `robots.txt`, `/llms.txt` live and correct | ⬜ | |
| All JSON-LD validated via Google Rich Results Test | ⬜ | |
| Core Web Vitals green on PageSpeed Insights, mobile and desktop | ⬜ | |
| Mobile audit — sticky CTA visible on every page, all text legible | ⬜ | |
| Google Business Profile claimed; NAP matches the site | ⬜ | |
| GTM container live; GA4 tag firing in Preview mode | ⬜ | |
| Conversion events firing (`whatsapp_click`, `lead_created`, etc.) | ⬜ | Verify in GA4 DebugView. |
| Domain pointed to Vercel; HTTPS green | ⬜ | |
| One full conversion test from a real phone | ⬜ | End-to-end smoke. |
| Sentry connected; `/api/lead` errors visible | ⬜ | |
| Footer credit "Designed by Joe" present | ⬜ | |

---

## 14. Launch Plan

**Phase 1 — Backend + functional frontend (this PRD).** Claude Code builds the whole thing using Next.js + Tailwind + shadcn/ui defaults. Goal: working site with the WhatsApp attribution flow tested end-to-end, all schemas live, all pages rendering, GTM + GA4 firing.

**Phase 2 — Design pass.** Joe uses Claude's design feature (artifacts) to design the visual layer. Self-contained React per page or component. Hardcoded data; no Sanity coupling.

**Phase 3 — Apply design.** Hand designs back to Claude Code, which applies them to the working codebase. **Rules during this phase:**
- Claude Code extracts components, wires them to existing Sanity queries, preserves routing and the data layer.
- Do **not** change Sanity schemas, the `/api/lead` contract, or the WhatsApp attribution flow.
- Do **not** introduce new dependencies.
- If a design demands structural change (new page, new field, new flow) → kick back to a PRD update first.

**Phase 4 — Soft launch.** Hari shares the URL inside Sriram International Academy parent groups first. Joe monitors leads, attribution, and Core Web Vitals daily for 2 weeks. Iterate on copy and conversion friction.

**Phase 5 — Public launch.** Google Business Profile claimed and verified. Instagram bio link updated. Outreach to local skate parks and parent groups. Begin retainer-funded blog publishing (2-4 posts/month).

**Phase 6 — Maintenance + growth (ongoing).** Monthly review of leads + conversions in Sanity. Iterate on CTAs and FAQ based on what's actually being asked on WhatsApp. Decide on V2 scope at month 6 based on Section 11 metrics.

---

*STEEZE Skateboarding — PRD V2.0 — May 2026 — Confidential*
