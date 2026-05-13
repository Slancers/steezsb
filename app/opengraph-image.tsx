import { ImageResponse } from "next/og";

// Dynamically generated Open Graph image. Renders at /opengraph-image
// and is auto-attached as og:image on every route that doesn't override.
// 1200×630 is the canonical OG size. Uses system fonts (Impact /
// Helvetica Bold) for the display heading — close enough to Anton at
// thumbnail sizes and avoids the cost of fetching Google Fonts.

export const runtime = "nodejs";
export const alt = "STEEZ Skateboarding — Skateboarding Coaching · Hyderabad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#6E95D1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "Impact, 'Helvetica Neue', Helvetica, Arial, sans-serif",
          color: "#0E0D0B",
        }}
      >
        {/* Top row — brand + city */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontWeight: 700,
            }}
          >
            <span>STEEZ</span>
            <div
              style={{
                width: 14,
                height: 14,
                background: "#FF2D2D",
                display: "flex",
              }}
            />
            <span style={{ fontSize: 18, opacity: 0.65 }}>SB · HYD</span>
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              fontSize: 18,
            }}
          >
            <span
              style={{
                background: "#D3F046",
                border: "1.5px solid #0E0D0B",
                padding: "6px 12px",
              }}
            >
              ● LIVE · HYD
            </span>
            <span
              style={{
                background: "#2547F0",
                color: "#F1EAD7",
                padding: "6px 12px",
              }}
            >
              EST · 2019
            </span>
          </div>
        </div>

        {/* Center hero */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: 0.85,
            letterSpacing: "-0.05em",
            textTransform: "uppercase",
            fontWeight: 900,
          }}
        >
          <div
            style={{
              fontSize: 200,
              color: "#0E0D0B",
              textShadow: "8px 8px 0 #FF2D2D",
            }}
          >
            SKATE
          </div>
          <div style={{ fontSize: 200, display: "flex" }}>
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "4px #0E0D0B",
              }}
            >
              OR&nbsp;
            </span>
            <span style={{ color: "#0E0D0B" }}>DON&apos;T</span>
          </div>
        </div>

        {/* Bottom row — tagline */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            letterSpacing: "0.04em",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span
              style={{
                fontSize: 18,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "#FF2D2D",
              }}
            >
              Skateboarding coaching
            </span>
            <span
              style={{
                background: "#0E0D0B",
                color: "#F1EAD7",
                padding: "8px 16px",
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                fontWeight: 700,
              }}
            >
              Hyderabad · India
            </span>
          </div>
          <span
            style={{
              fontSize: 18,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            steezsb.com
          </span>
        </div>
      </div>
    ),
    size
  );
}
