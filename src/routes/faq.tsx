import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Ornament } from "@/components/site/Nav";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Redeemed Detailing" },
      { name: "description", content: "Answers to common questions about Redeemed Detailing's mobile auto detailing service in Lawrence, KS." },
      { property: "og:title", content: "Frequently Asked Questions — Redeemed Detailing" },
      { property: "og:description", content: "Everything you need to know before booking." },
    ],
  }),
  component: FAQPage,
});

const FAQS = [
  { q: "Do you come to me?", a: "Yes — we're 100% mobile. We come to your home, workplace, or wherever your car is parked anywhere in the Lawrence area." },
  { q: "How long does a detail take?", a: "Exterior typically 1–2 hours, interior 1.5–2.5 hours, full detail 2.5–4 hours depending on vehicle size and condition." },
  { q: "What do I need to do before you arrive?", a: "Just make sure we have access to the vehicle and a nearby water source. Remove any valuables or items you'd prefer kept private." },
  { q: "Why do prices vary?", a: "Vehicle size and condition. A large SUV or heavily soiled interior takes more time and product than a small sedan. We always give you a fair quote upfront." },
  { q: "How do I book?", a: "Call or text Layton at (785) 764-4889 or Oliver at (785) 424-4815, or use the form below." },
  { q: "What payment do you accept?", a: "Cash, Venmo, and CashApp. Payment is due upon completion." },
  { q: 'What does "Redeemed" mean to you?', a: "It's our standard. Two faith-driven young men who believe every job is worth doing right — we show up with integrity and treat your vehicle like it matters. Because to us, it does." },
];

function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative pt-36 pb-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <Ornament label="✝ Got Questions?" />
          <h1 className="mt-6 font-display text-5xl md:text-6xl">Frequently Asked</h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Everything you need to know before booking.
          </p>
        </div>

        <div className="mt-12 divide-y divide-border/60 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-card/60"
                >
                  <span className="font-display text-lg text-[color:var(--ivory)]">{f.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 flex-shrink-0 text-[color:var(--gold)] transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid overflow-hidden transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="min-h-0">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
