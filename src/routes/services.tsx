import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Ornament } from "@/components/site/Nav";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Packages — Redeemed Detailing" },
      { name: "description", content: "Exterior, interior, and full detail packages. Hand-washed, mobile detailing in Lawrence, Kansas." },
      { property: "og:title", content: "Services & Packages — Redeemed Detailing" },
      { property: "og:description", content: "Exterior, interior, and full detail packages in Lawrence, KS." },
    ],
  }),
  component: ServicesPage,
});

const PACKAGES = [
  {
    icon: "✦",
    name: "Exterior Detail",
    price: "$60",
    blurb: "Starting price",
    items: [
      "Hand wash & rinse",
      "Wheel & tire cleaning",
      "Exterior window cleaning",
      "Dry & hand buff",
      "Tire shine applied",
    ],
  },
  {
    icon: "✚",
    name: "Full Detail",
    price: "$140",
    blurb: "Best value",
    featured: true,
    items: [
      "Complete interior detail",
      "Complete exterior detail",
      "Full vacuum & wipe-down",
      "Streak-free window cleaning",
      "Tire shine & dressing",
    ],
  },
  {
    icon: "✧",
    name: "Interior Detail",
    price: "$95",
    blurb: "Starting price",
    items: [
      "Full vacuum (seats, floors, trunk)",
      "Dashboard & console wipe-down",
      "Cup holders & door pockets",
      "Interior window cleaning",
      "Air vent detailing",
    ],
  },
  {
    icon: "✦",
    name: "Clay Bar Add-On",
    price: "+$20",
    blurb: "Exterior & Full only",
    items: [
      "Removes embedded contaminants",
      "Leaves paint smoother to touch",
      "Enhances exterior finish",
      "Pairs with Exterior or Full",
    ],
  },
];

function ServicesPage() {
  return (
    <section className="relative pt-36 pb-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <Ornament label="What We Offer" />
          <h1 className="mt-6 font-display text-5xl md:text-6xl">Our Packages</h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Every detail is done with care, pride, and purpose — we treat your vehicle like it
            matters, because to us, it does.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PACKAGES.map((p) => (
            <article
              key={p.name}
              className={cn(
                "group relative flex flex-col rounded-2xl border border-border/60 bg-card/60 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--gold)]/50",
                p.featured && "border-[color:var(--gold)]/50 shadow-[var(--shadow-gold)]",
              )}
            >
              {p.featured && (
                <span style={{ backgroundImage: "var(--gradient-gold)" }} className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--navy-deep)]">
                  Most Popular
                </span>
              )}
              <div className="mb-6 text-3xl text-[color:var(--gold)]">{p.icon}</div>
              <h3 className="font-display text-2xl">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-4xl text-gradient-gold">{p.price}</span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {p.blurb}
                </span>
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-[color:var(--ivory)]/80">
                {p.items.map((i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--gold)]" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-12 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          ★ Prices may vary by vehicle size and condition. Contact us for a free quote. ★
        </p>
      </div>
    </section>
  );
}
