## Hidden delete gesture for reviews

Add a subtle, non-obvious way for you (the owner) to delete a review directly from the site — no login screen, no visible admin UI.

### How it works for a visitor
Nothing changes. They see reviews and the submit form exactly as today.

### How it works for you
1. Each review card gets a tiny decorative icon (a small gold cross/star already fits the brand) placed next to the reviewer's name. It looks like pure decoration.
2. To arm delete mode, **tap that icon 5 times in a row** on any review (within 3 seconds). A subtle toast confirms "Delete mode on".
3. Once armed, every review card shows a small trash icon in the corner. Tap it → confirm dialog → review is removed and disappears for everyone immediately.
4. Delete mode auto-disarms after 60 seconds of inactivity, or when you refresh the page.

This keeps the gesture discoverable only to someone who knows it, with no visible admin surface.

### Technical details
- Backend: add a `DELETE` policy on `public.reviews` and a `GRANT DELETE ... TO anon` so the delete call works without auth. Security tradeoff: anyone who reverse-engineers the site could delete reviews. If you'd rather keep it safe, we'd need a lightweight secret (e.g. a passphrase prompt after the 5 taps, checked in a server function using a stored secret) — say the word and I'll add that instead.
- Frontend: add `deleteReview(id)` in `src/lib/reviews.ts`; add tap-counter state and trash button in the Reviews section of `src/routes/index.tsx`.
- No new dependencies.

### Open question
Do you want the pure gesture (simple, but anyone technical could delete), or the gesture **plus** a passphrase prompt (safer)? I'll default to gesture-only unless you say otherwise.