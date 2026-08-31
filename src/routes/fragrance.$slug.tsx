import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, Heart, Share2, ShoppingBag, Star } from "lucide-react";
import { AppShell, NoteVisualizer, ProductImage, fragrances, LoginPromptModal } from "@/lib/scentlore";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { useState } from "react";

export const Route = createFileRoute("/fragrance/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replaceAll("-", " ")} — Scentlore` },
      { name: "description", content: "Explore the notes, mood, and reviews behind a fragrance." },
      { property: "og:title", content: "A closer look at fragrance — Scentlore" },
      {
        property: "og:description",
        content: "Explore notes, mood, and reviews behind a fragrance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FragranceDetail,
});

function FragranceDetail() {
  const { slug } = useParams({ from: "/fragrance/$slug" });
  const fragrance = fragrances.find(
    (f) => f.name.toLowerCase().replaceAll(" ", "-") === slug
  );
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedSize, setSelectedSize] = useState(fragrance?.sizes?.[0]?.label ?? "100ml");

  if (!fragrance) {
    return (
      <AppShell>
        <div className="mx-auto max-w-[1440px] px-5 py-20 text-center sm:px-8 lg:px-11">
          <h1 className="font-display text-4xl text-ink">Fragrance not found</h1>
          <p className="mt-4 text-muted-foreground">
            The scent you are looking for does not exist.
          </p>
          <Link
            to="/discover"
            className="mt-8 inline-flex h-10 items-center gap-2 rounded-md bg-ink px-5 text-[11px] font-semibold text-sidebar-primary-foreground"
          >
            Back to discovery
          </Link>
        </div>
      </AppShell>
    );
  }

  const selectedSizeObj = fragrance.sizes?.find((s) => s.label === selectedSize) ?? fragrance.sizes?.[0];
  const currentPrice = selectedSizeObj?.price ?? fragrance.price;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    addItem({
      id: `${fragrance.name.toLowerCase().replaceAll(" ", "-")}-${selectedSize}`,
      name: fragrance.name,
      house: fragrance.house,
      price: currentPrice,
      image: fragrance.image,
      quantity: 1,
    });
  };

  return (
    <AppShell>
      <Link
        to="/discover"
        className="mb-8 inline-flex items-center gap-2 text-[11px] font-semibold text-muted-foreground hover:text-ink"
      >
        <ArrowLeft className="size-3.5" /> Back to discovery
      </Link>
      <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
        <div className="relative flex min-h-[480px] items-center justify-center overflow-hidden rounded-lg bg-plum">
          <ProductImage
            alt={`${fragrance.name} by ${fragrance.house}`}
            src={fragrance.image}
            className="absolute inset-0 opacity-80"
          />
          <div className="absolute bottom-5 left-6 text-[9px] uppercase tracking-[0.22em] text-sidebar-primary-foreground/60">
            Eau de parfum · {selectedSize}
          </div>
          <button
            aria-label="Save fragrance"
            className="absolute right-5 top-5 grid size-10 place-items-center rounded-full bg-card/90 text-ink"
          >
            <Bookmark className="size-4" />
          </button>
        </div>
        <div className="flex flex-col justify-center">
          <p className="eyebrow">{fragrance.house}</p>
          <h1 className="mt-3 font-display text-5xl leading-[.9] tracking-[-0.05em] text-ink sm:text-6xl">
            {fragrance.name}
          </h1>
          <p className="mt-3 font-display text-[18px] italic text-muted-foreground">
            {fragrance.description}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-ink">
              <Star className="size-4 fill-gold text-gold" /> {fragrance.rating}
            </span>
             <span className="text-[11px] text-muted-foreground">{fragrance.reviews} reviews</span>
            <span className="h-4 w-px bg-border" />
            <span className="text-[11px] text-muted-foreground">{fragrance.note}</span>
            <span className="h-4 w-px bg-border" />
            <span className="font-display text-[15px] text-ink">${currentPrice}</span>
          </div>
          <div className="mt-4">
            <p className="text-[11px] font-semibold text-ink">Size</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {fragrance.sizes?.map((size) => (
                <button
                  key={size.label}
                  onClick={() => setSelectedSize(size.label)}
                  className={`rounded-md border px-3 py-2 text-[11px] font-semibold transition ${
                    selectedSize === size.label
                      ? "border-ink bg-ink text-sidebar-primary-foreground"
                      : "border-border text-ink hover:border-gold"
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {fragrance.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-soft-gold px-3 py-2 text-[10px] font-semibold text-ink"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <button
              onClick={handleAddToCart}
              className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-card px-5 text-[11px] font-semibold text-ink transition hover:border-gold"
            >
              <ShoppingBag className="size-3.5" /> Add to bag
            </button>
            <Link
              to="/collection"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-ink px-5 text-[11px] font-semibold text-sidebar-primary-foreground transition hover:bg-plum"
            >
              <Heart className="size-4" /> Add to collection
            </Link>
            <button className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-card px-5 text-[11px] font-semibold text-ink transition hover:border-gold">
              <Share2 className="size-3.5" /> Share scent
            </button>
          </div>
        </div>
      </div>
      <div className="mt-14 grid gap-5 border-t border-border pt-10 lg:grid-cols-[1.1fr_.9fr]">
        <section className="rounded-md border border-border bg-card p-6 sm:p-8">
          <p className="eyebrow">Olfactive map</p>
          <h2 className="mt-2 font-display text-[29px] text-ink">The notes in motion</h2>
          <div className="mt-5 flex items-center justify-center">
            <NoteVisualizer compact notes={fragrance.notes} name={fragrance.name} />
          </div>
        </section>
        <section className="rounded-md bg-soft-stone p-6 sm:p-8">
          <p className="eyebrow">The community says</p>
          <blockquote className="mt-6 font-display text-[27px] leading-[1.03] tracking-[-0.03em] text-ink">
            “{fragrance.quote}”
          </blockquote>
          <p className="mt-6 text-[11px] text-muted-foreground">— {fragrance.reviewer} · verified wearer</p>
          <div className="mt-9 border-t border-ink/10 pt-5 text-[11px] text-muted-foreground">
            <span className="font-semibold text-ink">Most worn for</span>
            <span className="ml-4">{fragrance.wornFor}</span>
          </div>
        </section>
      </div>
      <div className="mt-14 grid gap-5 border-t border-border pt-10 lg:grid-cols-[1.1fr_.9fr]">
        <section className="rounded-md border border-border bg-card p-6 sm:p-8">
          <p className="eyebrow">About this edition</p>
          <h2 className="mt-2 font-display text-[29px] text-ink">The full story</h2>
          <p className="mt-4 text-[12px] leading-6 text-muted-foreground">{fragrance.longDescription}</p>
          <div className="mt-6">
            <p className="text-[11px] font-semibold text-ink">Key ingredients</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {fragrance.ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="rounded-full border border-border px-3 py-2 text-[10px] text-muted-foreground"
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <LoginPromptModal open={showLoginPrompt} onClose={() => setShowLoginPrompt(false)} />
    </AppShell>
  );
}
