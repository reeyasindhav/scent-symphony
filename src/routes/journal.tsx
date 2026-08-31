import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PublicShell } from "@/lib/scentlore";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Scentlore" },
      { name: "description", content: "Read stories, guides, and notes from the world of fragrance." },
      { property: "og:title", content: "Journal — Scentlore" },
      { property: "og:description", content: "Read stories, guides, and notes from the world of fragrance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
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
          <p className="eyebrow text-center">The journal</p>
          <h1 className="mt-6 font-display text-5xl leading-[.95] tracking-[-0.05em] text-ink sm:text-6xl text-center">
            Stories about <em className="text-plum">scent.</em>
          </h1>
          <p className="mt-6 text-[13px] leading-7 text-muted-foreground sm:text-[14px] text-center">
            Guides, essays, and conversations about fragrance culture, note families, and the rituals
            that make scent memorable.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 text-left">
            {[
              {
                title: "How to build a fragrance wardrobe",
                tag: "Guides",
                desc: "Start with the seasons, then layer in occasion and mood. Here’s a simple framework.",
              },
              {
                title: "The rise of the ‘skin scent’",
                tag: "Culture",
                desc: "Why minimalist fragrances are becoming the new quiet luxury.",
              },
              {
                title: "Reading a note pyramid",
                tag: "Education",
                desc: "Top, heart, and base notes explained in plain language.",
              },
              {
                title: "Storing fragrance properly",
                tag: "Care",
                desc: "Keep your collection stable, fresh, and long-lasting.",
              },
            ].map((post) => (
              <div key={post.title} className="rounded-md border border-border bg-card p-5 transition hover:border-gold">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{post.tag}</span>
                <h3 className="mt-2 font-display text-[18px] text-ink">{post.title}</h3>
                <p className="mt-2 text-[12px] leading-6 text-muted-foreground">{post.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
