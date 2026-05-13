// Editorial pull quote — large Fraunces italic with hanging terracotta
// quote mark and optional attribution. Used 2-3 times per page for moments
// where copy needs to read as written-by-a-person, not positioned.
export function PullQuote({
  children,
  by,
  className = "",
}: {
  children: React.ReactNode;
  by?: string;
  className?: string;
}) {
  return (
    <figure className={`relative ${className}`}>
      <span
        aria-hidden
        className="pointer-events-none absolute -left-1 -top-4 font-display text-[72px] leading-none text-terracotta/65 md:-left-3 md:-top-8 md:text-[112px]"
      >
        &ldquo;
      </span>
      <blockquote className="font-display text-[26px] font-medium italic leading-[1.18] -tracking-[0.01em] text-ink md:text-[40px] md:leading-[1.1]">
        {children}
      </blockquote>
      {by ? (
        <figcaption className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
          <span aria-hidden className="mr-2 inline-block h-px w-6 translate-y-[-3px] bg-ink/35 align-middle" />
          {by}
        </figcaption>
      ) : null}
    </figure>
  );
}
