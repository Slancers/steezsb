// Magazine-style photo credit line. Sits under or beside photos.
// Example: <PhotoCaption parts={["PHOTO", "HARI", "GOLDEN HOUR", "BANJARA HILLS"]} />
// Space Mono uppercase, wide tracking, dot separators — reads like a real
// editorial credit.
export function PhotoCaption({
  parts,
  className = "",
}: {
  parts: string[];
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 ${className}`}
    >
      {parts.map((p, i) => (
        <span key={`${p}-${i}`} className="inline-flex items-center gap-2">
          {p}
          {i < parts.length - 1 ? (
            <span aria-hidden className="text-ink/30">
              ·
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}
