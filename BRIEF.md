# STEEZE Skateboarding — Project Brief

A working brief for the website of **Hari**, skateboarding instructor at **Sriram International Academy**, Hyderabad. To be reviewed by Joe + Hari before build kickoff.

---

## 1. The bet

Hari already has a paid base — parents whose kids attend Sriram International Academy and enroll into his skateboarding classes there. He sometimes runs classes at skate parks for outside students too. The website's #1 job is to convert *more Sriram parents* into enrolled students. Outside parents (skate park, private one-on-ones) are the secondary channel.

The win condition for the first 90 days post-launch isn't "rank #1 on Google" — it's: *every Sriram parent who hears about Hari and Googles him lands on a page that closes them, and the school can comfortably link to or share the site in parent communications.*

## 2. Audience, in priority order

1. **Sriram International Academy parents** — already trust the school, may not yet know skateboarding is offered, or may be on the fence about safety, cost, schedule
2. **Hyderabad parents looking for skateboarding classes for their kids** — discoverability via Google, Instagram, word of mouth at skate parks
3. **Adults / older teens who want lessons** — small but real segment; one CTA, not a focus

## 3. Voice + aesthetic

- **Modern + parent-trustworthy.** Clean type, calm palette, lots of real photos of Hari teaching kids in helmets/pads. Skate energy in accents (a sticker, a halftone texture, a yellow highlight) not in the overall tone.
- The buyer is a parent, not a teen. Copy never says "gnarly" — it says *"Build confidence, balance, and a love of movement, in a structured, supervised environment."*
- Sriram International Academy is named visibly as a credibility anchor (subject to school approval).

## 4. Site structure (MVP)

| Page | Purpose | Primary CTA |
|---|---|---|
| Home | Hook + credibility + two-track CTA | Free trial WhatsApp |
| About Hari | Story, qualifications, languages, certifications | WhatsApp |
| Classes at Sriram | Schedule, age groups, what's included, how to enroll | "Enroll your child" form |
| Outside classes | Skate park / private / group bookings | "Book a session" form |
| Pricing | Honest, transparent, no hidden costs | WhatsApp / Form |
| Blog | Parent-focused FAQs, safety, gear, progress stories | Newsletter (later) |
| Contact / FAQ | Common parent questions answered | WhatsApp |

## 5. Lead capture

- **Dedicated WhatsApp number** — appears ONLY on the website. This is how Joe and Hari attribute who came from STEEZE vs. word-of-mouth. Cleanest tracking we have.
- **Two distinct forms** — "Enroll at Sriram" (auto-tagged source = `sriram`) and "Book outside class" (source = `external`). Both email Joe + Hari.
- All outbound links Hari shares (Instagram bio, WhatsApp signature, parent group messages) get UTM tags so we can see what actually drives traffic.

## 6. Blog strategy (first 8 posts)

Parent FAQs first; SEO is a side effect of being genuinely useful.

1. *Is skateboarding safe for kids? What every parent should know.*
2. *What does my child need to start? A no-pressure gear guide.*
3. *Skateboarding for confidence: what we see in the first 4 weeks.*
4. *How the skateboarding program at Sriram International Academy works.*
5. *Skate parks in Hyderabad: where to take your kid, what to expect.*
6. *Group classes vs private lessons: which fits your child?*
7. *5 things I tell every nervous first-time parent.*
8. *From wobbling to ollies: a 12-week beginner's path.*

Cadence: 1 post/week for the first 8 weeks, then 2/month maintenance.

## 7. Tech

- **Framework:** Next.js (App Router) + Tailwind + TypeScript
- **CMS:** Sanity (free tier covers this) — Joe edits posts in browser, no redeploy needed
- **Hosting:** Vercel (free hobby tier)
- **Analytics:** Vercel Analytics + a simple click tracker for the WhatsApp button
- **Forms:** Resend or Formspree → email Joe + Hari
- **Domain:** Hari-owned (TBD — to confirm: `steezeskateboarding.com`?)

## 8. Commercial arrangement (to be agreed in writing)

- **Retainer:** ₹X/month from Hari to Joe — covers hosting (Vercel/Sanity may stay free tier), DNS, security updates, ~2-4 blog posts/month, and minor copy/section updates.
- **Per converted student:** ₹Y flat fee to Joe for every NEW paying student attributed to STEEZE (via the dedicated WhatsApp number or one of the site forms), counted once they pay for their second month (excludes free trials).
- **Portfolio rights:** Joe may use the project, screenshots, and (anonymised) traffic/conversion analytics in his portfolio and freelance case studies in perpetuity, including after this engagement ends.
- **Footer credit:** "Designed by Joe — [link]" appears in the site footer.
- **Term + exit:** Either party can end with 30 days' notice. On exit, code repo and Sanity content transfer to Hari. Joe's portfolio rights survive.

(Final ₹ amounts and exact lead definitions to be filled in by Joe + Hari and signed.)

## 9. What we have / what we still need

- ✅ Hari's bio, qualifications, languages he teaches in (verbal — Joe to draft and confirm)
- ⬜ Photos of Hari teaching (action shots + portrait)
- ⬜ 3-5 short video clips for hero / social
- ⬜ Pricing per format (school program, private, group, skate park, monthly packages)
- ⬜ Class schedule at Sriram
- ⬜ Skate park location(s) Hari uses
- ⬜ 2-3 parent testimonials (text + name + child's age)
- ⬜ Logo / brand mark for STEEZE (Joe to propose)
- ⬜ School's go-ahead to mention Sriram International Academy by name on the site
- ⬜ Hari's dedicated WhatsApp number for site
- ⬜ Domain confirmation

## 10. Build phases

**Phase 0 — Alignment (this week)**
Joe + Hari review this brief, sign off on scope and commercial terms, kick off asset collection.

**Phase 1 — MVP build (1-2 weeks)**
Scaffold Next.js + Tailwind + Sanity. Build all MVP pages with placeholder content where needed. Wire up forms + WhatsApp + analytics. Deploy to Vercel preview URL.

**Phase 2 — Content + assets (1-2 weeks, parallel)**
Joe drafts copy + first 4 blog posts. Hari shoots/sends photos + videos. Logo finalized. Pricing locked.

**Phase 3 — Launch (1 week)**
Real domain pointed at Vercel. Final copy review with Hari. School informed before launch. Soft launch via Hari's existing parent WhatsApp groups.

**Phase 4 — Maintenance + growth**
Weekly blog post for 8 weeks. Monthly review of leads + conversions. Iterate on what's working.
