import Image from "next/image";

// Image wrapper with named duotone variants — applies CSS filter + a
// colored multiply/overlay layer to give each section a distinct photo
// point of view. The hero stays "none"; other sections pick a treatment.

type Variant = "sage" | "sepia" | "warm" | "cool" | "none";

const VARIANTS: Record<
  Variant,
  { filter: string; overlay?: string }
> = {
  sage: {
    // Vintage skate-mag feel — sage + cream
    filter: "grayscale(0.55) sepia(0.35) hue-rotate(40deg) saturate(0.85) contrast(1.02)",
    overlay: "bg-sage/15 mix-blend-multiply",
  },
  sepia: {
    // Warm sepia — feels like a portrait from a different decade
    filter: "grayscale(0.45) sepia(0.55) saturate(0.95) contrast(1.04)",
    overlay: "bg-terracotta/12 mix-blend-multiply",
  },
  warm: {
    // Golden-hour color grade — subtle, photo still feels real
    filter: "saturate(1.08) brightness(1.02) contrast(1.02)",
    overlay: "bg-sun/8 mix-blend-overlay",
  },
  cool: {
    filter: "saturate(0.88) brightness(0.98) hue-rotate(8deg)",
    overlay: "bg-sky/12 mix-blend-overlay",
  },
  none: { filter: "" },
};

export function Duotone({
  src,
  alt,
  variant = "none",
  sizes,
  className = "",
  imgClassName = "",
  priority = false,
}: {
  src: string;
  alt: string;
  variant?: Variant;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const v = VARIANTS[variant];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "(min-width: 768px) 50vw, 100vw"}
        className={`object-cover ${imgClassName}`}
        style={v.filter ? { filter: v.filter } : undefined}
      />
      {v.overlay ? (
        <div
          className={`pointer-events-none absolute inset-0 ${v.overlay}`}
          aria-hidden
        />
      ) : null}
    </div>
  );
}
