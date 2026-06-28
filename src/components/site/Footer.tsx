import { Instagram, Youtube } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-[color:var(--navy-deep)]/80 py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center">
        <img src={logo.url} alt="" width={56} height={56} className="h-14 w-14 opacity-90" />
        <p className="font-display text-xl text-gradient-gold">Redeemed Detailing</p>
        <p className="max-w-md text-sm italic text-muted-foreground">
          “Commit to the Lord whatever you do, and He will establish your plans.” — Proverbs 16:3
        </p>
        <div className="flex gap-5 text-muted-foreground">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-colors hover:text-[color:var(--gold)]"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="transition-colors hover:text-[color:var(--gold)]"
          >
            <Youtube className="h-5 w-5" />
          </a>
        </div>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          God bless — Layton &amp; Oliver · Lawrence, KS
        </p>
      </div>
    </footer>
  );
}
