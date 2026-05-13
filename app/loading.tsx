import { StarBurst } from "@/components/icons/zine";

// Global loading state for the App Router. Shows during route transitions
// while server components fetch data. On-brand brutalist shell so the
// site never feels like it stalled into a default spinner.
export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <StarBurst size={48} className="text-steeze-red" />
      <div className="font-display text-3xl font-bold uppercase tracking-[0.3em] md:text-5xl">
        Loading <span className="text-steeze-red">Steez</span>
      </div>
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
        Drop in…
      </div>
    </main>
  );
}
