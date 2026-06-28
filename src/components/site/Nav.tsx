import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png.asset.json";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
  { to: "/book", label: "Book" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/60 bg-[color:var(--navy-deep)]/80 backdrop-blur-xl py-3"
          : "py-6",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo.url} alt="Redeemed Detailing" width={40} height={40} className="h-10 w-10" />
          <span className="font-display text-lg tracking-wide text-gradient-gold">
            Redeemed Detailing
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-[color:var(--gold)]" }}
              className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-[color:var(--gold)]"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/book"
          className="hidden rounded-full border border-[color:var(--gold)]/40 px-5 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--gold)] transition-all hover:bg-[color:var(--gold)] hover:text-[color:var(--navy-deep)] md:inline-block"
        >
          Book Now
        </Link>
      </div>
    </header>
  );
}

export function Ornament({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-4 text-[color:var(--gold)]/80">
      <span className="hairline w-12" />
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.32em]">{label}</span>
      <span className="hairline w-12" />
    </div>
  );
}
