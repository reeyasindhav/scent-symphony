import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Star } from "lucide-react";
import { AppShell, PageHeader, ProductImage } from "@/lib/scentlore";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Saved Scents & Reviews — Scentlore" },
      {
        name: "description",
        content: "Return to the scents and notes that caught your attention.",
      },
      { property: "og:title", content: "Saved Scents & Reviews — Scentlore" },
      {
        property: "og:description",
        content: "Return to the scents and notes that caught your attention.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reviews,
});

function Reviews() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Your scent journal"
        title="Notes worth returning to."
        description="Your saved scents, personal reviews, and the little details that make a fragrance yours."
        action={
          <Link
            to="/discover"
            className="inline-flex h-10 items-center rounded-md bg-ink px-4 text-[11px] font-semibold text-sidebar-primary-foreground"
          >
            Discover more
          </Link>
        }
      />
      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <section>
          <h2 className="mb-4 font-display text-[25px] text-ink">
            Saved scents <span className="font-sans text-[11px] text-muted-foreground">8</span>
          </h2>
          <div className="space-y-3">
            {["Gris Charnel", "Another 13", "Philosykos"].map((name, i) => (
              <article
                key={name}
                className="flex items-center gap-4 rounded-md border border-border bg-card p-3 transition hover:border-gold"
              >
                <div
                  className={`h-20 w-24 overflow-hidden rounded-md ${["product-plum", "product-rose", "product-sage"][i]}`}
                >
                  <ProductImage
                    alt={name}
                    className="mix-blend-multiply opacity-80"
                    objectPosition={`${45 + i * 12}%`}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-display text-[20px] leading-none text-ink">{name}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {["BDK Parfums", "Le Labo", "Diptyque"][i]}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-[10px] text-gold">
                    <Star className="size-3 fill-gold" />{" "}
                    {i === 0 ? "4.8" : i === 1 ? "4.6" : "4.4"}
                  </div>
                </div>
                <Link
                  to="/fragrance/$slug"
                  params={{ slug: name.toLowerCase().replaceAll(" ", "-") }}
                  className="text-[11px] font-semibold text-muted-foreground hover:text-ink"
                >
                  View <span className="hidden sm:inline">scent</span> →
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section>
          <h2 className="mb-4 font-display text-[25px] text-ink">
            Your reviews <span className="font-sans text-[11px] text-muted-foreground">3</span>
          </h2>
          <div className="space-y-3">
            {[
              { name: "Santal 33", quote: "A familiar place, but still a little wild." },
              { name: "Mojave Ghost", quote: "Soft light on warm skin. An easy reach." },
            ].map((review) => (
              <article key={review.name} className="rounded-md border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <p className="font-display text-[20px] text-ink">{review.name}</p>
                  <div className="flex gap-0.5 text-gold">
                    <Star className="size-3 fill-gold" />
                    <Star className="size-3 fill-gold" />
                    <Star className="size-3 fill-gold" />
                    <Star className="size-3 fill-gold" />
                    <Star className="size-3 fill-gold" />
                  </div>
                </div>
                <p className="mt-4 font-display text-[18px] italic leading-snug text-muted-foreground">
                  “{review.quote}”
                </p>
                <div className="mt-5 flex items-center gap-2 text-[10px] text-muted-foreground">
                  <MessageCircle className="size-3.5" /> Reviewed October 18, 2024
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
