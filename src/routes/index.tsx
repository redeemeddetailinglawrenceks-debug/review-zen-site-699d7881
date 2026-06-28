import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Sparkles } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import hero from "@/assets/hero.jpg";
import { Ornament } from "@/components/site/Nav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Redeemed Detailing — Mobile Auto Detailing in Lawrence, KS" },
      {
        name: "description",
        content:
          "Two young detailers, one mission. Hand-washed, hand-detailed, brought to your driveway in Lawrence, Kansas.",
      },
      { property: "og:title", content: "Redeemed Detailing — Mobile Auto Detailing in Lawrence, KS" },
      { property: "og:description", content: "We come to you. Hand-washed, hand-detailed, done right — Lawrence, KS." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden">
      <img
        src={hero}
        alt=""
        width={1920}
        height={1280}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[color:var(--navy-deep)]/70 via-[color:var(--navy-deep)]/85 to-[color:var(--navy-deep)]" />

      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
        <img
          src={logo.url}
          alt="Redeemed Detailing emblem"
          width={180}
          height={180}
          className="mb-10 h-44 w-44 drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
        />

        <Ornament label="Mobile Detailing · Lawrence, Kansas" />

        <h1 className="mt-8 font-display text-6xl leading-[0.95] tracking-tight md:text-8xl">
          <span className="text-gradient-gold">Redeemed</span>
          <br />
          <span className="text-ivory">Detailing</span>
        </h1>

        <p className="mt-6 font-display text-2xl italic text-[color:var(--ivory)]/70 md:text-3xl">
          We come to you.
        </p>

        <p className="mt-10 max-w-xl text-sm italic text-[color:var(--gold)]/80 md:text-base">
          “Whatever you do, do it heartily, as to the Lord.”
          <span className="ml-2 not-italic text-muted-foreground">— Colossians 3:23</span>
        </p>

        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            to="/book"
            style={{ backgroundImage: "var(--gradient-gold)" }}
            className="group inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-[color:var(--navy-deep)] shadow-[var(--shadow-gold)] transition-transform hover:-translate-y-0.5"
          >
            <Sparkles className="h-4 w-4" />
            Book Your Detail
          </Link>
          <a
            href="tel:+17857644889"
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 px-8 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-[color:var(--ivory)] transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
          >
            <Phone className="h-4 w-4" />
            Text or Call
          </a>
        </div>
      </div>
    </section>
  );
}
