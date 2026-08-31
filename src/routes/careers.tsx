import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PublicShell } from "@/lib/scentlore";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Scentlore" },
      { name: "description", content: "Join the Scentlore team and help build the future of fragrance discovery." },
      { property: "og:title", content: "Careers — Scentlore" },
      { property: "og:description", content: "Join the Scentlore team and help build the future of fragrance discovery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
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
          <p className="eyebrow text-center">Careers</p>
          <h1 className="mt-6 font-display text-5xl leading-[.95] tracking-[-0.05em] text-ink sm:text-6xl text-center">
            Build with <em className="text-plum">us.</em>
          </h1>
          <p className="mt-6 text-[13px] leading-7 text-muted-foreground sm:text-[14px] text-center">
            We’re a small team obsessed with making fragrance discovery feel personal, intuitive,
            and beautiful. If that sounds like your kind of problem, we’d love to hear from you.
          </p>

          <div className="mt-12 grid gap-6 text-left">
            {[
              {
                title: "Frontend Engineer",
                location: "Remote",
                type: "Full-time",
              },
              {
                title: "Product Designer",
                location: "Hybrid",
                type: "Full-time",
              },
              {
                title: "Content Writer",
                location: "Remote",
                type: "Contract",
              },
            ].map((role) => (
              <div key={role.title} className="rounded-md border border-border bg-card p-5 transition hover:border-gold">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-[18px] text-ink">{role.title}</h3>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {role.location} · {role.type}
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4">
                    View role
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-md border border-border bg-card p-6 sm:p-8 text-center">
            <p className="eyebrow">Don’t see a fit?</p>
            <h2 className="mt-3 font-display text-[29px] text-ink">Send us a note anyway.</h2>
            <p className="mt-3 text-[12px] leading-6 text-muted-foreground">
              We’re always open to meeting curious people who love scent and thoughtful design.
            </p>
            <a
              href="mailto:careers@scentlore.com"
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-ink px-5 text-[11px] font-semibold text-sidebar-primary-foreground transition hover:bg-plum"
            >
              careers@scentlore.com
            </a>
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
