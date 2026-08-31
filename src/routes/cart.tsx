import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { AppShell, PageHeader } from "@/lib/scentlore";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Bag — Scentlore" },
      { name: "description", content: "Review your selected fragrances before checkout." },
      { property: "og:title", content: "Shopping Bag — Scentlore" },
      { property: "og:description", content: "Review your selected fragrances before checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <AppShell>
        <PageHeader eyebrow="Your bag" title="Nothing here yet." description="Explore the discovery room and add a scent that speaks to you." />
        <div className="mx-auto max-w-[1440px] px-5 py-20 text-center sm:px-8 lg:px-11">
          <ShoppingBag className="mx-auto size-12 text-muted-foreground" strokeWidth={1.2} />
          <p className="mt-6 text-[13px] text-muted-foreground">Your bag is empty.</p>
          <Link
            to="/discover"
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-md bg-ink px-5 text-[11px] font-semibold text-sidebar-primary-foreground transition hover:bg-plum"
          >
            Continue browsing
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader eyebrow="Your bag" title={`${items.length} item${items.length > 1 ? "s" : ""} in your bag`} description="Review your selection and proceed to checkout when you're ready." />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-md border border-border bg-card p-4">
              <div className="h-[100px] w-[80px] flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link to={`/fragrance/${item.id}`} className="font-display text-[18px] leading-none text-ink hover:text-plum">
                      {item.name}
                    </Link>
                    <p className="mt-1 text-[11px] text-muted-foreground">{item.house}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-ink" aria-label="Remove item">
                    <Trash2 className="size-4" strokeWidth={1.5} />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 rounded-md border border-border">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="grid size-8 place-items-center text-muted-foreground transition hover:text-ink"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="size-3.5" strokeWidth={1.5} />
                    </button>
                    <span className="text-[12px] font-semibold text-ink">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="grid size-8 place-items-center text-muted-foreground transition hover:text-ink"
                      aria-label="Increase quantity"
                    >
                      <Plus className="size-3.5" strokeWidth={1.5} />
                    </button>
                  </div>
                  <span className="font-display text-[18px] text-ink">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="text-[11px] text-muted-foreground underline-offset-4 hover:text-ink hover:underline">
            Clear bag
          </button>
        </div>
        <div className="rounded-md border border-border bg-card p-6 sm:p-8">
          <h3 className="font-display text-[23px] text-ink">Order summary</h3>
          <div className="mt-5 space-y-3 text-[12px]">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="text-ink">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="text-ink">Calculated at checkout</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between text-[13px] font-semibold text-ink">
              <span>Estimated total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <Link to="/checkout" className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-ink text-[11px] font-semibold text-sidebar-primary-foreground transition hover:bg-plum">
            Proceed to checkout
          </Link>
          <Link to="/discover" className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-md border border-border text-[11px] font-semibold text-ink transition hover:border-gold">
            Continue shopping
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
