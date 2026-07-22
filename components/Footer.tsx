import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="wr-footer">
      <div className="container grid gap-12 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:py-20">
        <div>
          <Image src="/wallride/logo.png" alt="WallRide Park" width={720} height={480} className="h-24 w-36 object-contain object-center invert" />
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">A safe and engaging environment supporting alternative culture in Hyderabad.</p>
        </div>
        <div>
          <p className="wr-eyebrow mb-4 text-white/40">Explore</p>
          <div className="flex flex-col gap-3 text-sm text-white/75">
            <Link href="/about" className="hover:text-white">About WallRide</Link>
            <Link href="/classes" className="hover:text-white">Classes</Link>
            <Link href="/practice" className="hover:text-white">Plan your visit</Link>
          </div>
        </div>
        <div>
          <p className="wr-eyebrow mb-4 text-white/40">Find us</p>
          <p className="text-sm leading-6 text-white/75">Peeran Cheruvu<br />Hyderabad, Telangana<br />Off Chevella Road</p>
          <p className="mt-3 text-sm text-white/50">Open 3:00 pm—9:00 pm<br />Closed Wednesdays</p>
        </div>
        <div>
          <p className="wr-eyebrow mb-4 text-white/40">Follow</p>
          <div className="flex flex-col gap-3 text-sm text-white/75">
            <a href="https://instagram.com/wallrideparkhyd" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram ↗</a>
            <Link href="/contact" className="hover:text-white">Contact WallRide</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-2 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WallRide Park</p>
          <p>Designed by Joe</p>
        </div>
      </div>
    </footer>
  );
}
