import Image from "next/image";

// Full-bleed hero image with slow Ken Burns zoom and a bottom-aligned
// content overlay. Used on the home page and as the practice page hero
// in v4. The gradient mask ensures any color of overlay text reads
// clearly against the warm landscape photos.
export function PhotoHero({
  src,
  alt,
  priority = false,
  children,
  height = "h-[88vh] min-h-[640px] md:h-[92vh]",
  overlay = "from-ink/55 via-ink/15 to-transparent",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  children: React.ReactNode;
  height?: string;
  overlay?: string;
}) {
  return (
    <section
      className={`photo-grain relative w-full overflow-hidden ${height}`}
    >
      <div className="photo-kenburns absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${overlay}`}
      />
      <div className="container relative z-10 flex h-full flex-col justify-end pb-14 md:pb-20">
        {children}
      </div>
    </section>
  );
}
