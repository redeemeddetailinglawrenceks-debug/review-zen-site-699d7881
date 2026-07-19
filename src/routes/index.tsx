import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Phone, MapPin, Mail, Star, Check, Sparkles, ChevronDown, Instagram, Youtube, Trash2 } from "lucide-react";

import logo from "@/assets/logo.png.asset.json";
import hero from "@/assets/hero.jpg";
import team from "@/assets/team-oliver-layton.png.asset.json";
import beforeHighlander1 from "@/assets/before-highlander-1.jpg.asset.json";
import afterHighlander1 from "@/assets/after-highlander-1.jpg.asset.json";
import beforeNavigator1 from "@/assets/before-navigator-1.jpg.asset.json";
import afterNavigator1 from "@/assets/after-navigator-1.jpg.asset.json";
import { fetchReviews, submitReview, deleteReview, reviewSchema } from "@/lib/reviews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Redeemed Detailing — Mobile Auto Detailing in Lawrence, KS" },
      {
        name: "description",
        content:
          "Two young detailers, one mission. Hand-washed, hand-detailed, brought to your driveway in Lawrence, Kansas.",
      },
    ],
  }),
  component: Home,
});

const NAV = [
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
  { id: "book", label: "Book" },
];

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
    price: "+$40",
    blurb: "Exterior & Full only",
    items: [
      "Removes embedded contaminants",
      "Leaves paint smoother to touch",
      "Enhances exterior finish",
      "Pairs with Exterior or Full",
    ],
  },
];

const FAQS = [
  {
    q: "Do you come to me?",
    a: "Yes — we're 100% mobile. We come to your home, workplace, or wherever your car is parked anywhere in the Lawrence area.",
  },
  {
    q: "How long does a detail take?",
    a: "Exterior typically 1–2 hours, interior 1.5–2.5 hours, full detail 2.5–4 hours depending on vehicle size and condition.",
  },
  {
    q: "What do I need to do before you arrive?",
    a: "Just make sure we have access to the vehicle and a nearby water source. Remove any valuables or items you'd prefer kept private.",
  },
  {
    q: "Why do prices vary?",
    a: "Vehicle size and condition. A large SUV or heavily soiled interior takes more time and product than a small sedan. We always give you a fair quote upfront.",
  },
  {
    q: "How do I book?",
    a: "Call or text Layton at (785) 764-4889 or Oliver at (785) 424-4815, or use the form below.",
  },
  {
    q: "What payment do you accept?",
    a: "Cash, Venmo, and CashApp. Payment is due upon completion.",
  },
  {
    q: 'What does "Redeemed" mean to you?',
    a: "It's our standard. Two faith-driven young men who believe every job is worth doing right — we show up with integrity and treat your vehicle like it matters. Because to us, it does.",
  },
];

function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden text-foreground">
      <Nav />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Reviews />
      <FAQ />
      <Booking />
      <Footer />
    </div>
  );
}

function Nav() {
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
        <a href="#top" className="flex items-center gap-3">
          <img src={logo.url} alt="Redeemed Detailing" width={40} height={40} className="h-10 w-10" />
          <span className="font-display text-lg tracking-wide text-gradient-gold">
            Redeemed Detailing
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-[color:var(--gold)]"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#book"
          className="hidden rounded-full border border-[color:var(--gold)]/40 px-5 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--gold)] transition-all hover:bg-[color:var(--gold)] hover:text-[color:var(--navy-deep)] md:inline-block"
        >
          Book Now
        </a>
      </div>
    </header>
  );
}

function Ornament({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-4 text-[color:var(--gold)]/80">
      <span className="hairline w-12" />
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.32em]">{label}</span>
      <span className="hairline w-12" />
    </div>
  );
}

function Hero() {
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
          <a
            href="#book"
            style={{ backgroundImage: "var(--gradient-gold)" }}
            className="group inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-[color:var(--navy-deep)] shadow-[var(--shadow-gold)] transition-transform hover:-translate-y-0.5"
          >
            <Sparkles className="h-4 w-4" />
            Book Your Detail
          </a>
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

function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <Ornament label="What We Offer" />
          <h2 className="mt-6 font-display text-5xl md:text-6xl">Our Packages</h2>
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

function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <Ornament label="✝ Our Story" />
          <h2 className="mt-6 font-display text-5xl md:text-6xl">
            Two Young Detailers,<br />
            <span className="text-gradient-gold italic">One Mission</span>
          </h2>
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

function Gallery() {
  return (
    <section id="gallery" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <Ornament label="Our Work" />
          <h2 className="mt-6 font-display text-5xl md:text-6xl">Before &amp; After</h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Real results from real customers right here in Lawrence.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {[
            { before: beforeHighlander1.url, after: afterHighlander1.url, label: "Toyota Highlander — Interior Detail" },
            { before: beforeNavigator1.url, after: afterNavigator1.url, label: "Lincoln Navigator — Interior Detail" },
            { before: null, after: null, label: "Coming soon" },
          ].map((pair, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/60 bg-card/40 p-3"
            >
              <div className="grid grid-cols-2 gap-2">
                {(["Before", "After"] as const).map((label) => {
                  const src = label === "Before" ? pair.before : pair.after;
                  return (
                    <div
                      key={label}
                      className="relative aspect-square overflow-hidden rounded-xl bg-[color:var(--navy-deep)]"
                    >
                      {src ? (
                        <img
                          src={src}
                          alt={`${label} — ${pair.label}`}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.3em] text-muted-foreground/60">
                          Photo coming soon
                        </div>
                      )}
                      <span className="absolute left-3 top-3 rounded-full bg-[color:var(--navy-deep)]/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--gold)] backdrop-blur">
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 px-1 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {pair.label}
              </p>
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

function StarRating({
  value,
  onChange,
  size = "sm",
}: {
  value: number;
  onChange?: (n: number) => void;
  size?: "sm" | "md" | "lg";
}) {
  const [hover, setHover] = useState(0);
  const interactive = !!onChange;
  const sizes = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-7 w-7" };
  return (
    <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => {
        const active = (hover || value) >= n;
        return (
          <button
            key={n}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(n)}
            onMouseEnter={() => interactive && setHover(n)}
            className={cn(
              "transition-transform",
              interactive && "cursor-pointer hover:scale-110",
              !interactive && "cursor-default",
            )}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
          >
            <Star
              className={cn(
                sizes[size],
                active
                  ? "fill-[color:var(--gold)] text-[color:var(--gold)]"
                  : "text-muted-foreground/40",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

function Reviews() {
  const qc = useQueryClient();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: submitReview,
    onSuccess: () => {
      toast.success("Thank you! Your review is live.");
      setName("");
      setRating(5);
      setBody("");
      setErrors({});
      qc.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (e: Error) => toast.error(e.message || "Something went wrong"),
  });

  // Hidden owner delete: tap the small star next to a reviewer's name 5 times
  // within 3 seconds to arm delete mode. Auto-disarms after 60s.
  const [armed, setArmed] = useState(false);
  const [taps, setTaps] = useState<number[]>([]);
  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 60_000);
    return () => clearTimeout(t);
  }, [armed]);
  function registerTap() {
    if (armed) return;
    const now = Date.now();
    const recent = [...taps, now].filter((t) => now - t < 3000);
    setTaps(recent);
    if (recent.length >= 5) {
      setArmed(true);
      setTaps([]);
      toast("Delete mode on", { description: "Tap the trash icon to remove a review." });
    }
  }

  const deleteMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      toast.success("Review removed");
      qc.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (e: Error) => toast.error(e.message || "Could not delete"),
  });

  const avg = useMemo(() => {
    if (!reviews.length) return 0;
    return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  }, [reviews]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = reviewSchema.safeParse({ name, rating, body });
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    mutation.mutate(result.data);
  }

  return (
    <section id="reviews" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Ornament label="What People Say" />
          <h2 className="mt-6 font-display text-5xl md:text-6xl">Customer Reviews</h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Honest feedback from real customers right here in Lawrence.
          </p>

          {reviews.length > 0 && (
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[color:var(--gold)]/30 bg-card/60 px-5 py-2.5 backdrop-blur">
              <StarRating value={Math.round(avg)} size="sm" />
              <span className="font-display text-lg text-gradient-gold">{avg.toFixed(1)}</span>
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {reviews.length} review{reviews.length === 1 ? "" : "s"}
              </span>
            </div>
          )}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Submit form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border/60 bg-card/60 p-8 backdrop-blur-sm"
          >
            <h3 className="font-display text-2xl">Leave a Review</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your review will appear immediately.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <Label htmlFor="r-name" className="text-xs uppercase tracking-[0.18em]">
                  Your Name
                </Label>
                <Input
                  id="r-name"
                  value={name}
                  maxLength={80}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 border-border/60 bg-[color:var(--navy-deep)]/40"
                  placeholder="First & last name"
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              <div>
                <Label className="text-xs uppercase tracking-[0.18em]">Rating</Label>
                <div className="mt-2.5">
                  <StarRating value={rating} onChange={setRating} size="lg" />
                </div>
              </div>

              <div>
                <Label htmlFor="r-body" className="text-xs uppercase tracking-[0.18em]">
                  Your Review
                </Label>
                <Textarea
                  id="r-body"
                  value={body}
                  maxLength={1000}
                  rows={5}
                  onChange={(e) => setBody(e.target.value)}
                  className="mt-2 resize-none border-border/60 bg-[color:var(--navy-deep)]/40"
                  placeholder="How was your detail?"
                />
                {errors.body && (
                  <p className="mt-1.5 text-xs text-destructive">{errors.body}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={mutation.isPending}
                style={{ backgroundImage: "var(--gradient-gold)" }}
                className="w-full rounded-full py-6 text-sm font-medium uppercase tracking-[0.2em] text-[color:var(--navy-deep)] shadow-[var(--shadow-gold)] hover:opacity-95"
              >
                {mutation.isPending ? "Posting…" : "Submit Review"}
              </Button>
            </div>
          </form>

          {/* Reviews list */}
          <div className="space-y-4">
            {isLoading && (
              <p className="text-center text-sm text-muted-foreground">Loading reviews…</p>
            )}
            {!isLoading && reviews.length === 0 && (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 p-10 text-center">
                <Sparkles className="h-8 w-8 text-[color:var(--gold)]/60" />
                <p className="mt-4 font-display text-xl text-[color:var(--ivory)]/80">
                  No reviews yet
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Be the first to share your experience.
                </p>
              </div>
            )}
            {reviews.map((r) => (
              <article
                key={r.id}
                className="rounded-2xl border border-border/60 bg-card/50 p-6 transition-colors hover:border-[color:var(--gold)]/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-display text-lg">{r.name}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString(undefined, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <StarRating value={r.rating} size="sm" />
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[color:var(--ivory)]/85">
                  {r.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <Ornament label="✝ Got Questions?" />
          <h2 className="mt-6 font-display text-5xl md:text-6xl">Frequently Asked</h2>
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

function Booking() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    pkg: "Full Detail – $140+",
    clayBar: false,
    vehicle: "",
    notes: "",
  });

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function send() {
    const lines = [
      `Hi! I'd like to book a detail with Redeemed Detailing.`,
      ``,
      `Name: ${form.firstName} ${form.lastName}`.trim(),
      `Phone: ${form.phone}`,
      `Package: ${form.pkg}${form.clayBar ? " + Clay Bar (+$40)" : ""}`,
      `Vehicle: ${form.vehicle}`,
      form.notes ? `Notes: ${form.notes}` : "",
    ].filter(Boolean);
    const sms = `sms:+17854244815?&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = sms;
  }

  return (
    <section id="book" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Ornament label="✝ Get In Touch" />
          <h2 className="mt-6 font-display text-5xl md:text-6xl">
            Book Your <span className="text-gradient-gold italic">Detail</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            We're mobile — we come to you anywhere in the Lawrence area. Reach out for a quote or
            to schedule.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {[
              {
                icon: MapPin,
                title: "Location",
                lines: ["Lawrence, Kansas", "Mobile — We Come to You"],
              },
              {
                icon: Mail,
                title: "Email",
                lines: ["Redeemeddetailinglawrenceks@gmail.com"],
                href: "mailto:Redeemeddetailinglawrenceks@gmail.com",
              },
              {
                icon: Phone,
                title: "Call or Text",
                lines: ["Layton: (785) 764-4889", "Oliver: (785) 424-4815"],
              },
            ].map((c) => {
              const Inner = (
                <>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--gold)]/30 text-[color:var(--gold)]">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                      {c.title}
                    </div>
                    {c.lines.map((l) => (
                      <div key={l} className="text-sm text-[color:var(--ivory)]/85">
                        {l}
                      </div>
                    ))}
                  </div>
                </>
              );
              return c.href ? (
                <a
                  key={c.title}
                  href={c.href}
                  className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card/50 p-5 transition-all hover:border-[color:var(--gold)]/40"
                >
                  {Inner}
                </a>
              ) : (
                <div
                  key={c.title}
                  className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card/50 p-5"
                >
                  {Inner}
                </div>
              );
            })}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="rounded-2xl border border-border/60 bg-card/60 p-8 backdrop-blur-sm"
          >
            <h3 className="font-display text-2xl">Request a Booking</h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="First Name">
                <Input
                  required
                  maxLength={50}
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  className="border-border/60 bg-[color:var(--navy-deep)]/40"
                />
              </Field>
              <Field label="Last Name">
                <Input
                  required
                  maxLength={50}
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  className="border-border/60 bg-[color:var(--navy-deep)]/40"
                />
              </Field>
              <Field label="Phone" className="sm:col-span-2">
                <Input
                  required
                  type="tel"
                  maxLength={20}
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="border-border/60 bg-[color:var(--navy-deep)]/40"
                />
              </Field>
              <Field label="Package" className="sm:col-span-2">
                <select
                  value={form.pkg}
                  onChange={(e) => update("pkg", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-border/60 bg-[color:var(--navy-deep)]/40 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]/40"
                >
                  <option>Exterior Detail – $60+</option>
                  <option>Interior Detail – $95+</option>
                  <option>Full Detail – $140+</option>
                </select>
              </Field>
              <label className="flex items-center gap-3 text-sm text-[color:var(--ivory)]/85 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={form.clayBar}
                  onChange={(e) => update("clayBar", e.target.checked)}
                  className="h-4 w-4 accent-[color:var(--gold)]"
                />
                Add Clay Bar Treatment (+$40, Exterior or Full Detail only)
              </label>
              <Field label="Vehicle (Year, Make, Model)" className="sm:col-span-2">
                <Input
                  required
                  maxLength={100}
                  value={form.vehicle}
                  onChange={(e) => update("vehicle", e.target.value)}
                  className="border-border/60 bg-[color:var(--navy-deep)]/40"
                />
              </Field>
              <Field label="Additional Notes" className="sm:col-span-2">
                <Textarea
                  maxLength={500}
                  rows={3}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  className="resize-none border-border/60 bg-[color:var(--navy-deep)]/40"
                />
              </Field>
            </div>
            <Button
              type="submit"
              style={{ backgroundImage: "var(--gradient-gold)" }}
              className="mt-7 w-full rounded-full py-6 text-sm font-medium uppercase tracking-[0.2em] text-[color:var(--navy-deep)] shadow-[var(--shadow-gold)] hover:opacity-95"
            >
              Send Booking Request via Text
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Tapping above will open a pre-filled text to Oliver — just hit send.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Footer() {
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
