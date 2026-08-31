import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { PublicShell } from "@/lib/scentlore";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Scentlore" },
      { name: "description", content: "Get in touch with the Scentlore team." },
      { property: "og:title", content: "Contact — Scentlore" },
      { property: "og:description", content: "Get in touch with the Scentlore team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PublicShell>
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-11 lg:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[11px] font-semibold text-muted-foreground hover:text-ink"
        >
          <ArrowLeft className="size-3.5" /> Back to home
        </Link>

        <div className="mx-auto mt-10 max-w-3xl">
          <p className="eyebrow text-center">Contact</p>
          <h1 className="mt-6 font-display text-5xl leading-[.95] tracking-[-0.05em] text-ink sm:text-6xl text-center">
            We’d love to <em className="text-plum">hear from you.</em>
          </h1>
          <p className="mt-6 text-[13px] leading-7 text-muted-foreground sm:text-[14px] text-center">
            Questions, partnerships, or just a note about your current favorite scent — drop us a line.
          </p>

          <div className="mt-12 grid gap-6 text-left sm:grid-cols-3">
            <div className="rounded-md border border-border bg-card p-5">
              <Mail className="size-5 text-gold" strokeWidth={1.5} />
              <h3 className="mt-3 font-display text-[18px] text-ink">Email</h3>
              <p className="mt-2 text-[12px] leading-6 text-muted-foreground">hello@scentlore.com</p>
            </div>
            <div className="rounded-md border border-border bg-card p-5">
              <Phone className="size-5 text-gold" strokeWidth={1.5} />
              <h3 className="mt-3 font-display text-[18px] text-ink">Phone</h3>
              <p className="mt-2 text-[12px] leading-6 text-muted-foreground">+1 (555) 0123-456</p>
            </div>
            <div className="rounded-md border border-border bg-card p-5">
              <MapPin className="size-5 text-gold" strokeWidth={1.5} />
              <h3 className="mt-3 font-display text-[18px] text-ink">Studio</h3>
              <p className="mt-2 text-[12px] leading-6 text-muted-foreground">123 Scent Street, New York, NY</p>
            </div>
          </div>

          <div className="mt-12 rounded-md border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-[29px] text-ink">Send a message</h2>
            {submitted ? (
              <p className="mt-6 text-[12px] text-ink">Thanks for reaching out. We’ll get back to you soon.</p>
            ) : (
              <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
                <div className="sm:col-span-1">
                  <label className="text-[11px] font-semibold text-ink">First name</label>
                  <input className="mt-1 h-10 w-full rounded-md border border-border bg-transparent px-3 text-[12px] outline-none transition focus:border-gold" />
                </div>
                <div className="sm:col-span-1">
                  <label className="text-[11px] font-semibold text-ink">Last name</label>
                  <input className="mt-1 h-10 w-full rounded-md border border-border bg-transparent px-3 text-[12px] outline-none transition focus:border-gold" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-semibold text-ink">Email</label>
                  <input type="email" className="mt-1 h-10 w-full rounded-md border border-border bg-transparent px-3 text-[12px] outline-none transition focus:border-gold" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-semibold text-ink">Message</label>
                  <textarea rows={4} className="mt-1 w-full rounded-md border border-border bg-transparent px-3 py-2 text-[12px] outline-none transition focus:border-gold" />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="inline-flex h-11 items-center gap-2 rounded-md bg-ink px-5 text-[11px] font-semibold text-sidebar-primary-foreground transition hover:bg-plum">
                    Send message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
