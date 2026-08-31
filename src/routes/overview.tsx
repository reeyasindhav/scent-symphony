import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Star } from "lucide-react";
import {
  AppShell,
  EmptyLink,
  NoteVisualizer,
  ProductCard,
  SectionHeading,
  fragrances,
  ProductImage,
} from "@/lib/scentlore";

export const Route = createFileRoute("/overview")({
  head: () => ({
    meta: [
      { title: "Your Scent Story — Scentlore" },
      {
        name: "description",
        content: "Discover fragrances that feel like you with Scentlore's visual scent journal.",
      },
      { property: "og:title", content: "Your Scent Story — Scentlore" },
      {
        property: "og:description",
        content: "A more intuitive way to discover, review, and collect fragrance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Overview,
});

function Overview() {
  return (
    <AppShell>
      <div className="animate-fade-in">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Thursday · October 24</p>
            <h1 className="mt-3 font-display text-[42px] leading-[.9] tracking-[-0.05em] text-ink sm:text-[54px]">
              Your scent story
            </h1>
            <p className="mt-4 max-w-[450px] text-[13px] leading-6 text-muted-foreground">
              Discover fragrances that feel like you. Curated notes, honest reviews, and a wardrobe
              of scents to call your own.
            </p>
          </div>
          <EmptyLink>View all discoveries</EmptyLink>
        </div>
        <section
          className="grid overflow-hidden rounded-lg bg-ink text-sidebar-primary-foreground md:grid-cols-2"
          aria-label="Scent of the week"
        >
          <div className="flex flex-col justify-between p-7 sm:p-10">
            <div>
              <p className="eyebrow text-gold">Scent of the week</p>
              <h2 className="mt-6 max-w-[330px] font-display text-[42px] leading-[.9] tracking-[-0.04em] sm:text-[50px]">
                A quiet kind
                <br />
                of <em className="text-gold">luxury.</em>
              </h2>
              <p className="mt-6 max-w-[390px] text-[13px] leading-6 text-sidebar-primary-foreground/65">
                Woody, warm, and quietly magnetic. Gris Charnel is the olfactive equivalent of your
                favorite cashmere sweater.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                to="/fragrance/$slug"
                params={{ slug: "gris-charnel" }}
                className="inline-flex h-10 items-center gap-2 rounded-md bg-gold px-5 text-[11px] font-bold text-ink transition hover:bg-gold/85"
              >
                Explore fragrance <ChevronRight className="size-3" />
              </Link>
              <span className="flex items-center gap-1.5 text-[11px] text-sidebar-primary-foreground/70">
                <Star className="size-3.5 fill-gold text-gold" /> 4.8 <span>(328 reviews)</span>
              </span>
            </div>
          </div>
          <div className="relative min-h-[300px] overflow-hidden bg-plum">
            <ProductImage alt="Gris Charnel perfume bottle" className="opacity-90" />
            <span className="absolute bottom-5 left-6 text-[9px] uppercase tracking-[0.22em] text-sidebar-primary-foreground/55">
              Eau de parfum · 100ml
            </span>
          </div>
        </section>

        <section className="mt-12">
          <SectionHeading
            eyebrow="Find your feeling"
            title="Explore by mood"
            action={<EmptyLink>See all moods</EmptyLink>}
          />
          <div className="flex flex-wrap gap-2">
            {["All moods", "Sensual", "Confident", "Serene", "Playful"].map((mood, i) => (
              <Link
                key={mood}
                to="/discover"
                search={{ mood: mood.toLowerCase().replace(" ", "-") }}
                className={`rounded-full border px-4 py-2 text-[11px] transition ${i === 0 ? "border-ink bg-ink text-sidebar-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-gold hover:text-ink"}`}
              >
                {mood}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionHeading
            eyebrow="The edit"
            title="Trending fragrances"
            action={<EmptyLink to="/discover">Browse catalogue</EmptyLink>}
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {fragrances.slice(0, 3).map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-md border border-border bg-card p-6 sm:p-8">
            <SectionHeading
              eyebrow="Olfactive map"
              title="The anatomy of a scent"
              action={<EmptyLink>Read notes guide</EmptyLink>}
            />
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
              <NoteVisualizer />
              <p className="sr-only">A note visualizer showing Bergamot, Iris, and Sandalwood.</p>
            </div>
          </div>
          <div className="rounded-md bg-soft-stone p-6 sm:p-8">
            <div className="flex justify-between">
              <div>
                <p className="eyebrow text-muted-foreground">Your wardrobe</p>
                <h2 className="mt-4 max-w-[220px] font-display text-[30px] leading-[.95] tracking-[-0.04em] text-ink">
                  A collection
                  <br />
                  in the making.
                </h2>
              </div>
              <span className="text-gold">♧</span>
            </div>
            <div className="mt-12">
              <div className="flex items-center justify-between font-display text-xl text-ink">
                <span>
                  I <small className="text-muted-foreground">/ 12</small>
                </span>
                <small className="font-sans text-[10px] text-muted-foreground">8% curated</small>
              </div>
              <div className="mt-3 h-1 rounded-full bg-ink/10">
                <div className="h-full w-[8%] rounded-full bg-gold" />
              </div>
              <Link
                to="/collection"
                className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold text-ink"
              >
                Open my collection <ChevronRight className="size-3" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
