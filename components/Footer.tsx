import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="wr-footer">
      <div className="container grid gap-12 py-16 md:grid-cols-[1.4fr_0.8fr_1fr_0.8fr] md:py-20">
        <div>
          <Image
            src="/wallride/logo-mark.png"
            alt="WallRide Park"
            width={1200}
            height={802}
            className="h-24 w-36 object-contain"
          />
          <p className="mt-5 max-w-xs text-sm leading-6 text-black/60">
            A safe and engaging environment supporting alternative culture in Hyderabad.
          </p>
        </div>
        <div>
          <p className="wr-footer-label">Explore</p>
          <div className="wr-footer-links">
            <Link href="/about">About WallRide</Link>
            <Link href="/classes">Classes</Link>
            <Link href="/practice">Plan your visit</Link>
          </div>
        </div>
        <div>
          <p className="wr-footer-label">Find us</p>
          <p className="text-sm leading-7 text-black/70">
            Peeran Cheruvu<br />
            Hyderabad, Telangana<br />
            Off Chevella Road
          </p>
          <p className="mt-4 text-sm leading-6 text-black/55">
            Open 3:00 pm-9:00 pm<br />
            Closed Wednesdays
          </p>
        </div>
        <div>
          <p className="wr-footer-label">Follow</p>
          <div className="wr-footer-links">
            <a href="https://instagram.com/wallrideparkhyd" target="_blank" rel="noopener noreferrer">
              Instagram ↗
            </a>
            <Link href="/contact">Contact WallRide</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-black/10">
        <div className="container flex flex-col gap-2 py-5 text-xs text-black/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WallRide Park</p>
          <p>Designed by Joe</p>
        </div>
      </div>
    </footer>
  );
}
