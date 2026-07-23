import Image from "next/image";

import { cn } from "@/lib/utils";

type CampaignImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function CampaignImage({
  src,
  alt,
  className,
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
}: CampaignImageProps) {
  return (
    <div className={cn("wr-campaign-image", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="wr-campaign-image-main"
      />
    </div>
  );
}
