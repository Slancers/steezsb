// Top-of-page scrolling status bar — sits under the nav, ink/paper colors.
// Pure CSS animation with the `ticker` keyframe from tailwind.config.
const ITEMS = [
  { dot: "lime" as const, text: "BOWL · OPEN NOW" },
  { dot: null, text: "17:00–20:00 · GROUP SESSION" },
  { dot: "red" as const, text: "2 SPOTS LEFT · SAT BEGINNER" },
  { dot: null, text: "HYDERABAD · TELANGANA · IND" },
  { dot: "blue" as const, text: "COACHED BY HARI" },
  { dot: null, text: "EST 2019" },
  { dot: "lime" as const, text: "WALK-INS OK" },
];

const DOT_COLORS = {
  lime: "bg-steeze-lime",
  red: "bg-steeze-red",
  blue: "bg-steeze-blue",
} as const;

function TickerRun() {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-2">
          {item.dot ? (
            <span
              className={`h-1.5 w-1.5 rounded-full ${DOT_COLORS[item.dot]}`}
            />
          ) : null}
          {item.text}
        </span>
      ))}
    </>
  );
}

export function StatusTicker() {
  return (
    <div className="overflow-hidden border-b-[1.5px] border-ink bg-ink py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-paper">
      <div className="flex w-max animate-ticker-status gap-12 whitespace-nowrap">
        <div className="flex items-center gap-12">
          <TickerRun />
        </div>
        <div className="flex items-center gap-12" aria-hidden>
          <TickerRun />
        </div>
      </div>
    </div>
  );
}
