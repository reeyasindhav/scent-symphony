import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PublicShell } from "@/lib/scentlore";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Scentlore" },
      { name: "description", content: "Learn about Scentlore's mission to make fragrance discovery personal and intuitive." },
      { property: "og:title", content: "About — Scentlore" },
      { property: "og:description", content: "Learn about Scentlore's mission to make fragrance discovery personal and intuitive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PublicShell>
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-11 lg:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[11px] font-semibold text-muted-foreground hover:text-ink"
        >
          <ArrowLeft className="size-3.5" /> Back to home
        </Link>

        <div className="mt-10 max-w-3xl">
          <p className="eyebrow text-center">Our story</p>
          <h1 className="mt-6 font-display text-5xl leading-[.95] tracking-[-0.05em] text-ink sm:text-6xl text-center">
            We believe scent should be <em className="text-plum">visible.</em>
          </h1>
          <p className="mt-6 text-[13px] leading-7 text-muted-foreground sm:text-[14px] text-center">
            Scentlore was founded with a simple idea: fragrance is one of the most personal forms of
            expression, yet it’s also one of the hardest to shop for. Notes, accords, and house
            reputations can feel like a secret language. We built Scentlore to translate that
            language into something intuitive — visual maps, mood-based discovery, and honest
            community reviews.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-3 text-center">
            <div>
              <p className="font-display text-[22px] text-ink">01</p>
              <h3 className="mt-3 font-display text-[18px] text-ink">Visual discovery</h3>
              <p className="mt-2 text-[12px] leading-6 text-muted-foreground">
                Turn abstract notes into interactive scent maps so you can see how a fragrance evolves.
              </p>
            </div>
            <div>
              <p className="font-display text-[22px] text-ink">02</p>
              <h3 className="mt-3 font-display text-[18px] text-ink">Honest reviews</h3>
              <p className="mt-2 text-[12px] leading-6 text-muted-foreground">
                Real wearers sharing real experiences — no sponsored noise, just genuine scent stories.
              </p>
            </div>
            <div>
              <p className="font-display text-[22px] text-ink">03</p>
              <h3 className="mt-3 font-display text-[18px] text-ink">Your collection</h3>
              <p className="mt-2 text-[12px] leading-6 text-muted-foreground">
                Track what you own, what you love, and what you want next — all in one place.
              </p>
            </div>
          </div>

          <div className="mt-16 rounded-md border border-border bg-card p-6 sm:p-8 text-center">
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-3 font-display text-[29px] text-ink">We’d love to hear from you.</h2>
            <p className="mt-3 text-[12px] leading-6 text-muted-foreground">
              Questions, partnerships, or just a note about your current favorite scent — drop us a line.
            </p>
            <a
              href="mailto:hello@scentlore.com"
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-ink px-5 text-[11px] font-semibold text-sidebar-primary-foreground transition hover:bg-plum"
            >
              hello@scentlore.com
            </a>
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
