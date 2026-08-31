import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import { AppShell, PageHeader } from "@/lib/scentlore";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Scentlore" },
      { name: "description", content: "Complete your order with shipping and payment details." },
      { property: "og:title", content: "Checkout — Scentlore" },
      { property: "og:description", content: "Complete your order with shipping and payment details." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  if (items.length === 0 && !submitted) {
    return (
      <AppShell>
        <PageHeader eyebrow="Checkout" title="Your bag is empty." description="Add a fragrance before checking out." />
        <div className="mx-auto max-w-[1440px] px-5 py-20 text-center sm:px-8 lg:px-11">
          <Link to="/discover" className="inline-flex h-10 items-center gap-2 rounded-md bg-ink px-5 text-[11px] font-semibold text-sidebar-primary-foreground transition hover:bg-plum">
            Browse fragrances
          </Link>
        </div>
      </AppShell>
    );
  }

  if (submitted) {
    return (
      <AppShell>
        <PageHeader eyebrow="Checkout" title="Order confirmed." description="Thank you for your purchase. We'll send a confirmation to your email." />
        <div className="mx-auto max-w-[1440px] px-5 py-20 text-center sm:px-8 lg:px-11">
          <p className="text-[13px] text-muted-foreground">A confirmation has been sent to {form.email}.</p>
          <Link to="/discover" className="mt-6 inline-flex h-10 items-center gap-2 rounded-md bg-ink px-5 text-[11px] font-semibold text-sidebar-primary-foreground transition hover:bg-plum">
            Continue shopping
          </Link>
        </div>
      </AppShell>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setSubmitted(true);
  };

  const shipping = 12;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  return (
    <AppShell>
      <PageHeader eyebrow="Checkout" title="Complete your order." description="Enter your shipping and payment details below." />
      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <div className="space-y-6">
          <section className="rounded-md border border-border bg-card p-6 sm:p-8">
            <h3 className="font-display text-[23px] text-ink">Shipping address</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-[11px] font-semibold text-ink">First name</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} required className="mt-1 h-10 w-full rounded-md border border-border bg-transparent px-3 text-[12px] outline-none transition focus:border-gold" />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-ink">Last name</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} required className="mt-1 h-10 w-full rounded-md border border-border bg-transparent px-3 text-[12px] outline-none transition focus:border-gold" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-ink">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-1 h-10 w-full rounded-md border border-border bg-transparent px-3 text-[12px] outline-none transition focus:border-gold" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-ink">Address</label>
                <input name="address" value={form.address} onChange={handleChange} required className="mt-1 h-10 w-full rounded-md border border-border bg-transparent px-3 text-[12px] outline-none transition focus:border-gold" />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-ink">City</label>
                <input name="city" value={form.city} onChange={handleChange} required className="mt-1 h-10 w-full rounded-md border border-border bg-transparent px-3 text-[12px] outline-none transition focus:border-gold" />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-ink">ZIP code</label>
                <input name="zip" value={form.zip} onChange={handleChange} required className="mt-1 h-10 w-full rounded-md border border-border bg-transparent px-3 text-[12px] outline-none transition focus:border-gold" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-ink">Country</label>
                <input name="country" value={form.country} onChange={handleChange} required className="mt-1 h-10 w-full rounded-md border border-border bg-transparent px-3 text-[12px] outline-none transition focus:border-gold" />
              </div>
            </div>
          </section>

          <section className="rounded-md border border-border bg-card p-6 sm:p-8">
            <h3 className="font-display text-[23px] text-ink">Payment</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-ink">Name on card</label>
                <input name="cardName" value={form.cardName} onChange={handleChange} required className="mt-1 h-10 w-full rounded-md border border-border bg-transparent px-3 text-[12px] outline-none transition focus:border-gold" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-ink">Card number</label>
                <input name="cardNumber" value={form.cardNumber} onChange={handleChange} required placeholder="0000 0000 0000 0000" className="mt-1 h-10 w-full rounded-md border border-border bg-transparent px-3 text-[12px] outline-none transition focus:border-gold" />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-ink">Expiry</label>
                <input name="expiry" value={form.expiry} onChange={handleChange} required placeholder="MM/YY" className="mt-1 h-10 w-full rounded-md border border-border bg-transparent px-3 text-[12px] outline-none transition focus:border-gold" />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-ink">CVC</label>
                <input name="cvc" value={form.cvc} onChange={handleChange} required placeholder="123" className="mt-1 h-10 w-full rounded-md border border-border bg-transparent px-3 text-[12px] outline-none transition focus:border-gold" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
              <Lock className="size-3.5" strokeWidth={1.5} /> Payments are secure and encrypted.
            </div>
          </section>
        </div>

        <div className="rounded-md border border-border bg-card p-6 sm:p-8">
          <h3 className="font-display text-[23px] text-ink">Order summary</h3>
          <div className="mt-5 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="h-[60px] w-[50px] flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-[12px] font-semibold text-ink">{item.name}</p>
                  <p className="text-[10px] text-muted-foreground">Qty {item.quantity}</p>
                </div>
                <span className="text-[12px] text-ink">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2 text-[12px]">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="text-ink">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="text-ink">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span className="text-ink">${tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between text-[13px] font-semibold text-ink">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <Button type="submit" className="mt-6 h-11 w-full gap-2">
            <CreditCard className="size-4" strokeWidth={1.5} /> Place order
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
