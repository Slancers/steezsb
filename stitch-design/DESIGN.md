---
name: Skate Editorial
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#56433a'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#897268'
  outline-variant: '#dcc1b5'
  surface-tint: '#9c440f'
  primary: '#99420d'
  on-primary: '#ffffff'
  primary-container: '#b95925'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb693'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#5b5c5c'
  on-tertiary: '#ffffff'
  tertiary-container: '#737575'
  on-tertiary-container: '#fcfcfc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcc'
  primary-fixed-dim: '#ffb693'
  on-primary-fixed: '#351000'
  on-primary-fixed-variant: '#7a3000'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Bebas Neue
    fontSize: 80px
    fontWeight: '400'
    lineHeight: 80px
    letterSpacing: 0.02em
  display-sm:
    fontFamily: Bebas Neue
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Bebas Neue
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Bebas Neue
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.05em
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  section-gap: 120px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is built on a foundation of **Athletic Minimalism** and **Premium Editorial** aesthetics. It captures the raw energy of skate culture and refines it through a high-end lens suitable for a professional school. The interface should feel like a contemporary sports magazine: confident, spacious, and impactful.

The visual direction prioritizes high-contrast layouts and aggressive typography to evoke a sense of movement and expertise. It avoids unnecessary decorative elements, relying instead on structural grid lines, large-scale photography, and bold color blocking to guide the user's eye.

## Colors

The palette is anchored by a high-contrast relationship between **White (#FFFFFF)** and **Dark Grey (#1A1A1A)**. This stark contrast mirrors the black-and-white photography often found in skate media. 

**Terracotta Orange (#C4622D)** serves as the sole functional accent. It is used sparingly but deliberately for calls to action, progress indicators, and semantic "success" states like checkmarks. **Off-white (#F9F9F9)** is used for subtle background layering to define content sections without breaking the minimalist flow.

## Typography

The typographic hierarchy is the primary driver of the design system's personality. 

**Headlines** utilize a condensed, uppercase display face to create a rhythmic, "stacked" look reminiscent of poster design. On desktop, display sizes should be used aggressively to command attention.

**Body Text** is set in a modern, high-legibility sans-serif. It provides a neutral, professional counterpoint to the expressive headlines. All labels and buttons should use a bold, uppercase weight of the body font to maintain the athletic, "Barry's-inspired" tone.

## Layout & Spacing

This design system employs a **Fixed Editorial Grid** (12 columns on desktop, 4 on mobile). The spacing philosophy favors "generous emptiness," allowing high-quality photography and bold typography to breathe.

Key layout rules:
- **Photography:** Use full-bleed backgrounds for hero sections, but inset photography within container margins for editorial "story" sections.
- **Section Gaps:** Use a significant vertical rhythm (120px+) between major sections to emphasize the premium nature of the content.
- **Alignment:** Elements should strictly adhere to grid lines; avoid center-alignment unless for specific "Display" hero headlines.

## Elevation & Depth

To maintain the clean, editorial feel, the design system rejects traditional shadows and blurs. Depth is conveyed through **Tonal Layering** and **High-Contrast Borders**.

- **Surface Tiers:** Use #FFFFFF for the primary canvas and #F9F9F9 for secondary containers or "card" backgrounds.
- **Outlines:** Instead of shadows, use thin (1px) borders in #1A1A1A or a very light grey (#E0E0E0) to define boundaries.
- **Stacked Interaction:** On hover, elements do not lift; instead, they shift color (e.g., a white button filling with black) to maintain a flat, grounded feel.

## Shapes

The design system utilizes **Sharp (0px)** corners for all UI elements. This choice reinforces the "technical" and "athletic" precision of the school. Buttons, input fields, image containers, and labels should all maintain crisp 90-degree angles. Rounded corners are only permitted for iconography where necessary for clarity.

## Components

### Buttons
Primary buttons are solid #1A1A1A with white uppercase text. Secondary buttons utilize a 2px #1A1A1A border with no fill. For high-priority CTAs (e.g., "Join a Class"), use the Terracotta Orange (#C4622D) fill.

### Checklist Items
List items should be paired with a custom square icon box. The checkmark itself must be Terracotta Orange (#C4622D), emphasizing completion and progress.

### Cards
Cards are flat, defined by a 1px #E0E0E0 border. Images within cards should have no padding, touching the top and side borders of the container to mimic a magazine layout.

### Input Fields
Inputs should be minimalist: a 1px bottom border in #1A1A1A with label text floating above in a small, bold, uppercase font. No background fill is required for the default state.

### Imagery
Photography is a core component. Use high-shutter-speed black and white photos or high-saturation color shots with deep shadows. Images should feel candid and "local," not staged or corporate.