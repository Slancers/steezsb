import type { ReactNode } from "react";

import { CampaignImage } from "@/components/public/CampaignImage";
import { ParkMotionGraphic } from "@/components/public/ParkMotionGraphic";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
  actions?: ReactNode;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  actions,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("wr-page-hero", !image && "wr-page-hero-text", className)}>
      <div className="container wr-page-hero-grid">
        <div className="wr-page-hero-copy">
          {eyebrow ? <p className="wr-eyebrow">{eyebrow}</p> : null}
          <h1 className="wr-page-title">{title}</h1>
          {description ? <p className="wr-page-lead">{description}</p> : null}
          {actions ? <div className="wr-cta-group">{actions}</div> : null}
        </div>
        {image ? (
          <CampaignImage
            src={image.src}
            alt={image.alt}
            priority
            className="wr-page-hero-media"
          />
        ) : (
          <ParkMotionGraphic className="wr-page-hero-graphic" />
        )}
      </div>
    </section>
  );
}
