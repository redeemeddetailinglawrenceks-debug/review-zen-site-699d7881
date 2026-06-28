import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MapPin, Mail } from "lucide-react";
import { Ornament } from "@/components/site/Nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Detail — Redeemed Detailing" },
      { name: "description", content: "Request a mobile detail in Lawrence, KS. We come to your driveway, workplace, or wherever your car is parked." },
      { property: "og:title", content: "Book a Detail — Redeemed Detailing" },
      { property: "og:description", content: "Schedule mobile auto detailing in Lawrence, KS." },
    ],
  }),
  component: BookPage,
});

function BookPage() {
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
      `Package: ${form.pkg}${form.clayBar ? " + Clay Bar (+$20)" : ""}`,
      `Vehicle: ${form.vehicle}`,
      form.notes ? `Notes: ${form.notes}` : "",
    ].filter(Boolean);
    const sms = `sms:+17854244815?&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = sms;
  }

  return (
    <section className="relative pt-36 pb-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Ornament label="✝ Get In Touch" />
          <h1 className="mt-6 font-display text-5xl md:text-6xl">
            Book Your <span className="text-gradient-gold italic">Detail</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            We're mobile — we come to you anywhere in the Lawrence area. Reach out for a quote or
            to schedule.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {[
              { icon: MapPin, title: "Location", lines: ["Lawrence, Kansas", "Mobile — We Come to You"] },
              { icon: Mail, title: "Email", lines: ["Redeemeddetailinglawrenceks@gmail.com"], href: "mailto:Redeemeddetailinglawrenceks@gmail.com" },
              { icon: Phone, title: "Call or Text", lines: ["Layton: (785) 764-4889", "Oliver: (785) 424-4815"] },
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
                <a key={c.title} href={c.href} className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card/50 p-5 transition-all hover:border-[color:var(--gold)]/40">
                  {Inner}
                </a>
              ) : (
                <div key={c.title} className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card/50 p-5">
                  {Inner}
                </div>
              );
            })}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="rounded-2xl border border-border/60 bg-card/60 p-8 backdrop-blur-sm"
          >
            <h2 className="font-display text-2xl">Request a Booking</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="First Name">
                <Input required maxLength={50} value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="border-border/60 bg-[color:var(--navy-deep)]/40" />
              </Field>
              <Field label="Last Name">
                <Input required maxLength={50} value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="border-border/60 bg-[color:var(--navy-deep)]/40" />
              </Field>
              <Field label="Phone" className="sm:col-span-2">
                <Input required type="tel" maxLength={20} value={form.phone} onChange={(e) => update("phone", e.target.value)} className="border-border/60 bg-[color:var(--navy-deep)]/40" />
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
                <input type="checkbox" checked={form.clayBar} onChange={(e) => update("clayBar", e.target.checked)} className="h-4 w-4 accent-[color:var(--gold)]" />
                Add Clay Bar Treatment (+$20, Exterior or Full Detail only)
              </label>
              <Field label="Vehicle (Year, Make, Model)" className="sm:col-span-2">
                <Input required maxLength={100} value={form.vehicle} onChange={(e) => update("vehicle", e.target.value)} className="border-border/60 bg-[color:var(--navy-deep)]/40" />
              </Field>
              <Field label="Additional Notes" className="sm:col-span-2">
                <Textarea maxLength={500} rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} className="resize-none border-border/60 bg-[color:var(--navy-deep)]/40" />
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

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
