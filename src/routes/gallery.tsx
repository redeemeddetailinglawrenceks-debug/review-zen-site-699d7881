import { createFileRoute } from "@tanstack/react-router";
import { Ornament } from "@/components/site/Nav";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Redeemed Detailing" },
      { name: "description", content: "Before and after photos from real Lawrence, KS detail jobs." },
      { property: "og:title", content: "Gallery — Redeemed Detailing" },
      { property: "og:description", content: "Before & after detail work in Lawrence, KS." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <section className="relative pt-36 pb-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <Ornament label="Our Work" />
          <h1 className="mt-6 font-display text-5xl md:text-6xl">Before &amp; After</h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Real results from real customers right here in Lawrence.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="grid grid-cols-2 gap-2 rounded-2xl border border-border/60 bg-card/40 p-3"
            >
              {(["Before", "After"] as const).map((label) => (
                <div
                  key={label}
                  className="relative aspect-square overflow-hidden rounded-xl bg-[color:var(--navy-deep)]"
                >
                  <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.3em] text-muted-foreground/60">
                    Photo coming soon
                  </div>
                  <span className="absolute left-3 top-3 rounded-full bg-[color:var(--navy-deep)]/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--gold)] backdrop-blur">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Share photos with us and we'll feature them here.
        </p>
      </div>
    </section>
  );
}
