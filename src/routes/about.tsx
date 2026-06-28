import { createFileRoute } from "@tanstack/react-router";
import team from "@/assets/team-oliver-layton.png.asset.json";
import { Ornament } from "@/components/site/Nav";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Redeemed Detailing" },
      { name: "description", content: "Meet Layton and Oliver — two faith-driven young detailers from Lawrence, Kansas." },
      { property: "og:title", content: "Our Story — Redeemed Detailing" },
      { property: "og:description", content: "Two young detailers, one mission. Lawrence, KS." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <section className="relative pt-36 pb-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <Ornament label="✝ Our Story" />
          <h1 className="mt-6 font-display text-5xl md:text-6xl">
            Two Young Detailers,<br />
            <span className="text-gradient-gold italic">One Mission</span>
          </h1>
        </div>

        <div className="mt-14 space-y-6 text-lg leading-relaxed text-[color:var(--ivory)]/85">
          <p>
            Redeemed Detailing was born out of something bigger than just a business idea.{" "}
            <span className="text-[color:var(--gold)]">Layton and Oliver</span> are two young
            detailers from Lawrence, Kansas who believe that hard work is an act of worship — and
            that showing up with integrity, every single time, is a reflection of the faith that
            drives them.
          </p>
          <p>
            The name <em className="text-[color:var(--gold)]">“Redeemed”</em> isn't just a brand —
            it's a daily reminder. Redeemed from laziness. From cutting corners. From doing things
            halfway. Every car they touch gets their full effort, because to them, that's what it
            means to do work that honors God.
          </p>
          <p>
            As a <span className="text-[color:var(--gold)]">mobile detailing service</span>, they
            come straight to your driveway, workplace, or wherever your car is parked. No hassle,
            no driving across town — just two hardworking young men who take real pride in every
            detail.
          </p>
        </div>

        <figure className="mx-auto mt-16 max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl border border-[color:var(--gold)]/30 shadow-2xl shadow-black/40">
            <img
              src={team.url}
              alt="Oliver (left) and Layton (right), co-founders of Redeemed Detailing"
              width={1200}
              height={1600}
              className="h-auto w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)]/60 via-transparent to-transparent" />
          </div>
          <figcaption className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Oliver (left) and Layton (right) — Lawrence, Kansas
          </figcaption>
        </figure>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {[
            { letter: "O", name: "Oliver Jenkins", phone: "(785) 424-4815", tel: "+17854244815" },
            { letter: "L", name: "Layton Kaul", phone: "(785) 764-4889", tel: "+17857644889" },
          ].map((p) => (
            <a
              key={p.name}
              href={`tel:${p.tel}`}
              className="group flex items-center gap-5 rounded-2xl border border-border/60 bg-card/50 p-6 transition-all hover:border-[color:var(--gold)]/50 hover:bg-card"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[color:var(--gold)]/40 font-display text-2xl text-[color:var(--gold)]">
                {p.letter}
              </div>
              <div>
                <div className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Co-Founder
                </div>
                <div className="font-display text-xl">{p.name}</div>
                <div className="text-sm text-[color:var(--gold)] transition-transform group-hover:translate-x-0.5">
                  {p.phone} →
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-14 text-center font-display text-xl italic text-[color:var(--gold)]/80">
          “Commit to the Lord whatever you do, and He will establish your plans.”
          <br />
          <span className="text-sm not-italic tracking-wider text-muted-foreground">
            — Proverbs 16:3
          </span>
        </p>
      </div>
    </section>
  );
}
