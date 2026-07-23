export default function BlogLoading() {
  return (
    <div className="wr-section wr-section-muted" aria-busy="true" aria-label="Loading WallRide stories">
      <div className="container wr-collection-grid">
        {[0, 1].map((item) => (
          <div key={item} className="animate-pulse">
            <div className="aspect-[16/10] rounded-[0.2rem] bg-black/10" />
            <div className="mt-5 h-3 w-28 rounded-[0.2rem] bg-black/10" />
            <div className="mt-4 h-10 w-4/5 rounded-[0.2rem] bg-black/10" />
            <div className="mt-3 h-4 w-full rounded-[0.2rem] bg-black/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
