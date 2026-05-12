# STEEZ SB Website — Product Requirements Document

**Owner:** Joe Prasen
**Client:** Hari (STEEZ SB, Hyderabad)
**Date:** 2026-05-03
**Status:** Draft v1 — ready for Claude Code build phase

---

## 1. Context & Goals

STEEZ SB is a skateboarding coaching academy in Hyderabad run by Hari (The Shri Ram Academy IB School). This is a marketing + lead-generation website. All conversions happen via WhatsApp — the site does not handle payment.

**Business goals**

- Convert visitors into paying coaching students (1-on-1 and group)
- Convert visitors into bowl-time bookings for independent practice
- Sell the STEEZ SB skate kit (₹15,000)
- Establish credibility as the place to learn skateboarding in Hyderabad
- Rank for local skateboarding queries (organic search + LLM answer engines)

**Compensation model — material to architecture**

Joe is paid a monthly retainer (covers maintenance + blog content) plus a flat per-student fee for every paying student attributed to the site. **Lead attribution is therefore a first-class technical requirement, not an afterthought.** See section 6 for the attribution flow.

**Target audience**

- Parents of school-age kids (primary)
- Young adults / college students wanting to learn (secondary)
- Existing skaters wanting bowl time (tertiary)

---

## 2. Non-Goals (v1)

- No online payments — all transactions via WhatsApp
- No user accounts / authentication
- No email automation or newsletter
- No multi-language support (English only)
- No e-commerce checkout for the kit
- No live calendar booking widget — inquiry → WhatsApp is the v1 flow
- No blog at launch (retainer covers blog work post-launch; structure should support it)

---

## 3. Stack & Infrastructure

| Layer | Choice | Notes |
|---|---|---|
| Frontend framework | **Next.js 14+** (App Router) | Joe's standard |
| CMS / backend | **Sanity v3** | Hosted Studio; Joe is sole editor |
| Styling | **Tailwind CSS** | Mobile-first |
| Components | **shadcn/ui** | For default-UI build phase |
| Hosting | **Vercel** | Default for Next.js |
| Domain | Hari's existing domain | URL TBC; configured at deploy |
| Analytics | **GA4** + first-party leads in Sanity | GA for traffic, Sanity for conversion |
| Image hosting | Sanity assets via `next/image` | |
| Forms | None — all CTAs route through `/api/lead` to WhatsApp | See section 6 |

**Environment variables**

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=          # required — /api/lead writes to Sanity
NEXT_PUBLIC_WHATSAPP_NUMBER=     # E.164 format, no '+' (e.g. 9198XXXXXXXX)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SITE_URL=
```

---

## 4. Information Architecture

```
/                  Home
/classes           Coaching programs
/practice          Bowl access + hourly pricing
/shop              STEEZ SB Skate Kit
/about             Hari, mission, philosophy
/contact           Phone, WhatsApp, location, schedule note
/faq               FAQ (added for SEO/AEO; not in original brief)
```

**Global elements**

- Top nav: logo, page links, prominent WhatsApp CTA
- **Sticky bottom WhatsApp button on mobile** (always visible — this is functional, not cosmetic; preserve through design pass)
- Footer: contact, location, social, legal links

---

## 5. Page-by-Page Spec

### 5.1 Home (`/`)

**Purpose:** Pitch STEEZ SB in one screen, route to the three offers.

**Sections**

1. Hero: headline, subhead, primary CTA (WhatsApp inquiry), secondary CTA (Book a Practice Session)
2. "What we offer" — three cards (Classes, Practice, Skate Kit), each linking to its page
3. About snippet — 2-3 sentences + photo of Hari, link to `/about`
4. Student gallery — photos and short clips (sourced from Sanity `mediaItem`)
5. Testimonials carousel — pulled from Sanity `testimonial`
6. Final CTA strip — "Ready to start?" → WhatsApp

**SEO**

- Title: `STEEZ SB — Skateboarding Coaching in Hyderabad`
- Meta: location-keyword-rich, ~155 chars
- JSON-LD: `LocalBusiness` (every page), `Organization`

### 5.2 Classes (`/classes`)

**Purpose:** Explain coaching offers and convert.

**Content**

- Description block
- Two pricing cards:
  - **1-on-1 Coaching** — ₹12,000 / 8 sessions (1hr each)
  - **Group Class** — ₹6,000 / 8 sessions (max 10 per batch)
- "What students learn" — bullets (balance, turning, beginner tricks, skatepark riding)
- Locations note: bowl + select local skateparks (contact for current schedule)
- WhatsApp CTAs on each pricing card with intent `class`

**JSON-LD:** `Course` schema for each program

### 5.3 Practice / Bowl (`/practice`)

**Purpose:** Convert independent skaters into bowl-time bookings.

**Content**

- Description
- Timings: Morning 6–9 AM, Evening 5–8 PM
- Hourly pricing tiers (TBD by Hari — pulled from Sanity `practiceTier`)
- "What's included" (pads/helmet policy — TBD)
- Bowl photos
- WhatsApp CTA with intent `practice`

**JSON-LD:** `Place` / sub-`SportsActivityLocation`

### 5.4 Shop (`/shop`)

**Purpose:** Sell the kit (offline fulfillment via WhatsApp).

**Content**

- Product photos
- **STEEZ SB Skate Kit — ₹15,000**, includes:
  - Pro-complete skateboard
  - Skate tool
  - Skateboarding journal + stickers
- Note: Available directly via WhatsApp (no checkout)
- WhatsApp CTA with intent `kit`

**JSON-LD:** `Product` with `offers` and price

### 5.5 About (`/about`)

**Purpose:** Build trust. Hari is the brand.

**Content**

- Hari's bio (TBD)
- Photo
- Coaching philosophy
- Why STEEZ SB exists
- Soft CTA at bottom

**JSON-LD:** `Person` for Hari, plus `LocalBusiness`

### 5.6 Contact (`/contact`)

**Content**

- Phone number
- WhatsApp button (intent `general`)
- Location: bowl address + embedded Google Map
- Schedule note: "Class locations may vary between the bowl and local skateparks. Contact for daily schedule."

**JSON-LD:** `LocalBusiness` with full `address`, `telephone`, `openingHours`, `geo`

### 5.7 FAQ (`/faq`) — added for SEO/AEO

**Purpose:** Answer parent questions, capture long-tail search, feed answer engines.

**Content:** Pulled from Sanity `faq`. Seed questions:

- How old does my child need to be?
- Do you provide skateboards and protective gear?
- Where exactly are classes held?
- How are makeup classes handled if my child misses one?
- Is skateboarding safe for beginners?
- Do you offer trial classes?
- What should my child wear?
- How do payments work?

**JSON-LD:** `FAQPage`

---

## 6. WhatsApp Attribution Flow (Critical)

This is the most important technical section. **If this is broken, Joe's compensation model breaks.** Build and test this end-to-end before anything else.

### User journey

1. Visitor lands on a page (e.g., `/classes`)
2. Clicks any WhatsApp CTA
3. Frontend POSTs to `/api/lead` with `{ sourcePage, intent, timestamp, userAgent }`
4. API route creates a `lead` document in Sanity with status `new`, returns the doc `_id` and a 6-char `refCode`
5. Frontend constructs the `wa.me` URL with a prefilled message that includes the ref code:
   ```
   Hi! I'm interested in classes at STEEZ SB. [ref: a3f8k2]
   ```
6. Frontend opens the WhatsApp link in a new tab
7. Hari (or Joe, monitoring) sees the inbound WhatsApp with the ref code
8. In Sanity Studio, Joe finds the `lead` doc by `refCode`, marks status `contacted`, then `converted` if it becomes a paying student. Optionally links to a `student` doc for record-keeping.
9. Monthly comp: query Sanity for leads where `convertedAt` falls in the billing period → multiply by per-student fee → add retainer

### API endpoint

```
POST /api/lead
Body:    { sourcePage: string, intent: 'class' | 'practice' | 'kit' | 'general', timestamp: string (ISO), userAgent: string }
Response: { leadId: string, refCode: string, whatsappUrl: string }
```

The endpoint:

- Generates a refCode (last 6 alphanumeric chars of the new Sanity `_id`, lowercased)
- Writes the `lead` doc with `status: 'new'`
- Builds the `wa.me` URL using `NEXT_PUBLIC_WHATSAPP_NUMBER` and a prefilled message templated by `intent`
- Returns the URL so the client can `window.open` it
- Rate-limit: max 5 leads per IP per minute (prevent abuse)

### Edge cases

- **User never opens WhatsApp after click** → lead stays `new`. That's fine; reconcile later or auto-archive after 30 days.
- **User contacts directly without ref code** → Hari adds the lead manually in Sanity with `sourcePage: 'direct'`.
- **Same person clicks multiple times** → don't dedupe at write time (we don't have phone yet); reconcile in Sanity by linking duplicates to a single `student`.
- **API write fails** → still open WhatsApp link with no ref code; log to console + Sentry. Don't block the user.

### Why this design (not other options)

- **Not WhatsApp-only** because there's no audit trail for Joe's per-student fee.
- **Not Google Sheets** because adds an external dependency outside the stack.
- **Not Supabase/Postgres** because overkill for v1; Sanity is already the data plane.

---

## 7. Sanity Schemas

All schemas in `sanity/schemas/`. Use TypeScript schema definitions.

### 7.1 `siteSettings` (singleton)

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
    { name: 'openingHours', type: 'array', of: [{ type: 'string' }] }, // human-readable
  ]
}
```

### 7.2 `coachingProgram`

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

### 7.3 `practiceTier`

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

### 7.4 `product`

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

### 7.5 `location`

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

### 7.6 `testimonial`

```ts
{
  name: 'testimonial',
  type: 'document',
  fields: [
    { name: 'studentName', type: 'string' },
    { name: 'parentName', type: 'string' },        // optional
    { name: 'quote', type: 'text' },
    { name: 'photo', type: 'image' },
    { name: 'date', type: 'date' },
    { name: 'featured', type: 'boolean' },
  ]
}
```

### 7.7 `faq`

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

### 7.8 `mediaItem` (gallery)

```ts
{
  name: 'mediaItem',
  type: 'document',
  fields: [
    { name: 'caption', type: 'string' },
    { name: 'image', type: 'image' },
    { name: 'videoUrl', type: 'url' },             // optional, if it's a clip
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'order', type: 'number' },
  ]
}
```

### 7.9 `lead` (private — not exposed in public queries)

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

**Important:** all GROQ queries used by the public site MUST exclude `_type == "lead"` and `_type == "student"`. Add a doc-level guard.

### 7.10 `student` (private)

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

---

## 8. SEO, AEO, GEO Optimization

This is a primary requirement, not a polish item. Hyderabad audience search is mostly mobile + Google + increasingly LLM answer engines.

### SEO baseline (every page)

- Next.js Metadata API: `title`, `description`, `openGraph`, `twitter`, `alternates.canonical`
- `app/sitemap.ts` (dynamic, includes Sanity-driven slugs)
- `app/robots.ts`
- Semantic HTML — one `h1` per page, logical heading hierarchy
- All images via `next/image` with descriptive `alt` (auto-fill from Sanity image alt field)
- Internal linking: Classes ↔ FAQ ↔ About; Home links into all
- Core Web Vitals targets: **LCP < 2.5s, CLS < 0.1, INP < 200ms**
- HTTPS, no mixed content
- No render-blocking JS where avoidable

### AEO (LLM and answer engines)

- `/llms.txt` at site root — short, factual summary of what STEEZ SB is, services offered, location, contact, links to key pages. Generated from Sanity `siteSettings`.
- JSON-LD structured data:
  - `LocalBusiness` on every page (with `address`, `geo`, `telephone`, `openingHours`, `priceRange`)
  - `Course` on `/classes` (one per program)
  - `Product` with `offers` on `/shop`
  - `FAQPage` on `/faq`
  - `Person` for Hari on `/about`
  - `Organization` site-wide
- Copy style: **concrete, factual, jargon-light.** LLMs prefer "Group classes are ₹6,000 for 8 one-hour sessions" over "Affordable group coaching tailored to every learner."
- FAQ phrased as questions parents actually type/ask

### GEO (local SEO)

- City keywords in title tags and H1s (e.g., "Skateboarding Coaching in Hyderabad")
- `LocalBusiness` schema with accurate `geo.lat`/`geo.lng` of the bowl
- Locations listed as full postal addresses, not just neighborhood names
- Google Maps embed on `/contact`
- Google Business Profile claim + linkback (manual; in launch checklist)
- Naturally mention Hyderabad, Hitech City / Madhapur / wherever the bowl is — once or twice per page, not stuffed
- NAP consistency (Name / Address / Phone) — same exact format everywhere on the site, matches GBP

---

## 9. Default UI Guidelines (Build Phase Only)

Goal for this phase: **a clean, functional, mobile-first site that works.** Don't optimize visuals — that's the next phase.

- Tailwind + shadcn/ui defaults
- One placeholder brand color (use slate or stone); design pass picks the real palette
- System font or Inter; don't pick custom typography yet
- Generous whitespace, simple grid layouts
- Real content where Hari has provided it; clearly-marked placeholders elsewhere (not lorem ipsum — say "TBD: Hari's bio goes here" so we can grep for them later)
- Placeholder images: solid Tailwind gradient blocks with descriptive labels — don't waste time hunting stock
- **Sticky bottom WhatsApp button on mobile is functional, not cosmetic. Preserve through the design pass.**
- Mobile-first; verify desktop works but don't optimize

---

## 10. Design-to-Code Handoff Rules (Phase 3)

When the design pass is done in artifacts and handed back to Claude Code:

- Designs arrive as self-contained React (single file, Tailwind, hardcoded data)
- **Claude Code's job:** extract components, wire them to existing Sanity queries, preserve routing and the data layer. Only swap presentation.
- **Do NOT** change Sanity schemas, API contracts, or the WhatsApp attribution flow during the design pass.
- **Do NOT** introduce new dependencies during the design pass.
- If a design demands structural change (new page, new field, new flow) → kick back to a PRD update first.

---

## 11. Hosting & Deploy

- **Vercel** project linked to the GitHub repo
- **Sanity** hosted (free tier sufficient for v1)
- Preview deployments on every PR
- Production: connect Hari's domain after launch
- Set all env vars in Vercel project settings

---

## 12. Open Items (Need from Hari Before Launch)

These don't block the build — Claude Code can ship with placeholders — but block launch.

- [ ] Practice/bowl hourly pricing (1hr / 2hr / 3hr — currently blank)
- [ ] Phone number for contact page
- [ ] WhatsApp number for CTAs
- [ ] Bowl physical address (full postal)
- [ ] Bowl latitude/longitude (for map embed + LocalBusiness schema)
- [ ] Photos: Hari, the bowl, 3-5 student action shots
- [ ] Student testimonials (3-5)
- [ ] Class schedule: which days, which times, batch sizes confirmed
- [ ] Age range for students (e.g., "ages 6-16")
- [ ] Gear policy — does Hari provide helmet/pads or are students expected to bring?
- [ ] Trial class offering — yes/no, and price if yes
- [ ] Domain URL Hari owns
- [ ] Hari's bio for `/about`
- [ ] Instagram / YouTube handles (for footer + social schema)

---

## 13. Launch Checklist

- [ ] All open items above filled
- [ ] Sanity Studio deployed; Joe has admin access; lead/student docs not exposed in public queries
- [ ] All pages render with real content, no "TBD" placeholders left
- [ ] **WhatsApp attribution tested end-to-end:** click CTA → lead doc created in Sanity → WhatsApp opens with correct ref code → mark as `contacted` then `converted` in Studio
- [ ] `sitemap.xml`, `robots.txt`, `llms.txt` all live and correct
- [ ] All structured data validated via Google's Rich Results Test
- [ ] Core Web Vitals green on PageSpeed Insights (mobile + desktop)
- [ ] Mobile audit: sticky CTA visible on every page, all text legible, images optimized
- [ ] Google Business Profile claimed; NAP matches the site
- [ ] GA4 installed; pageview events firing; lead events tracked too
- [ ] Domain pointed to Vercel; HTTPS green
- [ ] One full conversion test from a real phone

---

## 14. Phase Plan

1. **Phase 1 — Backend + functional frontend (this PRD).** Claude Code builds the whole thing with default styling. Goal: working site with the attribution flow live.
2. **Phase 2 — Design pass.** Joe uses Claude's design feature (artifacts) to design the visual layer.
3. **Phase 3 — Apply design.** Hand designs back to Claude Code, which applies them to the working codebase per the rules in section 10.
4. **Phase 4 — Launch.** Run through section 13 checklist with Hari.
