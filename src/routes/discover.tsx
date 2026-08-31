import { createFileRoute, Link } from "@tanstack/react-router";
import { Filter, Search } from "lucide-react";
import { AppShell, ProductCard, PageHeader, fragrances, LoginPromptModal } from "@/lib/scentlore";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { useState } from "react";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover Fragrances — Scentlore" },
      { name: "description", content: "Browse fragrances by mood, notes, house, and occasion." },
      { property: "og:title", content: "Discover Fragrances — Scentlore" },
      {
        property: "og:description",
        content: "Browse fragrances by mood, notes, house, and occasion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Discover,
});

function Discover() {
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleAddToCart = (product: (typeof fragrances)[number]) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    addItem({
      id: product.name.toLowerCase().replaceAll(" ", "-"),
      name: product.name,
      house: product.house,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="The discovery room"
        title="Find the one that feels like you."
        description="Start with a feeling, a note, or a moment. We'll meet you there."
        action={
          <button className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-card px-4 text-[11px] font-semibold text-ink transition hover:border-gold">
            <Filter className="size-3.5" /> Filters
          </button>
        }
      />
      <div className="mb-8 flex flex-col gap-3 rounded-md border border-border bg-card p-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search by fragrance, house, or note"
            className="h-10 w-full bg-transparent pl-10 text-[12px] outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-auto">
          {["All", "Woody", "Floral", "Amber", "Fresh"].map((filter, i) => (
            <Link
              to="/discover"
              key={filter}
              className={`whitespace-nowrap rounded-md px-4 py-2 text-[11px] ${i === 0 ? "bg-ink text-sidebar-primary-foreground" : "bg-secondary text-muted-foreground hover:text-ink"}`}
            >
              {filter}
            </Link>
          ))}
        </div>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-[12px] text-muted-foreground">
          <strong className="font-semibold text-ink">48 fragrances</strong> · curated for your
          wardrobe
        </p>
        <select className="bg-transparent text-[11px] text-muted-foreground outline-none">
          <option>Sort: Trending</option>
          <option>Highest rated</option>
          <option>Newest first</option>
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {fragrances.map((product, index) => (
          <ProductCard key={product.name} product={product} index={index} onAddToCart={handleAddToCart} />
        ))}
      </div>
      <LoginPromptModal open={showLoginPrompt} onClose={() => setShowLoginPrompt(false)} />
    </AppShell>
  );
}
