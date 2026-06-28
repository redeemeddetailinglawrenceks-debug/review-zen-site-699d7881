import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Sparkles, Star } from "lucide-react";
import { Ornament } from "@/components/site/Nav";
import { fetchReviews, submitReview, reviewSchema } from "@/lib/reviews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Redeemed Detailing" },
      { name: "description", content: "Read customer reviews and share your own experience with Redeemed Detailing in Lawrence, KS." },
      { property: "og:title", content: "Customer Reviews — Redeemed Detailing" },
      { property: "og:description", content: "Honest feedback from real Lawrence customers." },
    ],
  }),
  component: ReviewsPage,
});

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

function ReviewsPage() {
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
    <section className="relative pt-36 pb-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Ornament label="What People Say" />
          <h1 className="mt-6 font-display text-5xl md:text-6xl">Customer Reviews</h1>
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
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border/60 bg-card/60 p-8 backdrop-blur-sm"
          >
            <h2 className="font-display text-2xl">Leave a Review</h2>
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
