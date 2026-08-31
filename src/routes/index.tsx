import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bookmark, ChevronRight, Search, Star } from "lucide-react";
import { useState } from "react";
import {
  PublicShell,
  ProductCard,
  NoteVisualizer,
  ProductImage,
  fragrances,
  LogoutConfirmModal,
} from "@/lib/scentlore";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Scentlore — The Fragrance Journal" },
      {
        name: "description",
        content:
          "Discover fragrances that feel like you with visual scent notes, mood filters, and a personal collection tracker.",
      },
      { property: "og:title", content: "Scentlore — The Fragrance Journal" },
      {
        property: "og:description",
        content: "A more intuitive way to discover, review, and collect fragrance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const { isAuthenticated, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
    setTimeout(() => {
      window.location.href = "/";
    }, 0);
  };

  return (
    <PublicShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-11 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="flex flex-col justify-center">
              <p className="eyebrow">The fragrance journal</p>
              <h1 className="mt-6 font-display text-5xl leading-[.95] tracking-[-0.05em] text-ink sm:text-6xl lg:text-7xl">
                Discover the scent <br />
                that tells your <em className="text-plum">story.</em>
              </h1>
              <p className="mt-6 max-w-lg text-[13px] leading-7 text-muted-foreground sm:text-[14px]">
                Scentlore turns invisible scent profiles into intuitive visuals. Filter by mood and
                occasion, read honest reviews, and build a wardrobe of fragrances that feel
                unmistakably like you.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/discover">
                  <Button className="h-11 bg-ink px-6 text-[11px] font-semibold text-sidebar-primary-foreground hover:bg-plum">
                    Start discovering <ArrowRight className="size-3.5" />
                  </Button>
                </Link>
                {!isAuthenticated && (
                  <Link to="/auth/signup">
                    <Button variant="outline" className="h-11 px-6 text-[11px] font-semibold">
                      Create free account
                    </Button>
                  </Link>
                )}
                {isAuthenticated && (
                  <Button variant="outline" onClick={() => setShowLogoutConfirm(true)} className="h-11 px-6 text-[11px] font-semibold" type="button">
                    Log out
                  </Button>
                )}
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="grid size-8 place-items-center rounded-full border-2 border-background bg-soft-gold font-display text-[11px] text-ink"
                    >
                      M{i}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Loved by <strong className="font-semibold text-ink">12,000+</strong> scent
                  explorers
                </p>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-plum sm:h-[500px] lg:h-[600px]">
                <ProductImage alt="Hero fragrance bottle" className="opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/40 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-card p-4 shadow-lg border border-border sm:left-8">
                <div className="flex items-center gap-2">
                  <div className="grid size-8 place-items-center rounded-full bg-soft-gold text-ink">
                    <Star className="size-4 fill-gold text-gold" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-ink">4.8 · 328 reviews</p>
                    <p className="text-[10px] text-muted-foreground">Gris Charnel · BDK Parfums</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-soft-stone/50">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-11">
          <div className="text-center">
            <p className="eyebrow">Why Scentlore</p>
            <h2 className="mt-3 font-display text-3xl tracking-[-0.04em] text-ink sm:text-4xl">
              Fragrance, finally visible.
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-[13px] leading-7 text-muted-foreground">
              We built the tools we wish existed: visual note maps, mood-based discovery, and a
              collection tracker that makes your wardrobe feel like a gallery.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="grid size-12 place-items-center rounded-lg bg-soft-gold text-ink">
                <Search className="size-5" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 font-display text-xl text-ink">Visual scent notes</h3>
              <p className="mt-3 text-[13px] leading-6 text-muted-foreground">
                See how top, heart, and base notes evolve with our interactive note visualizer. No
                more guessing what a fragrance actually smells like.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="grid size-12 place-items-center rounded-lg bg-soft-gold text-ink">
                <Star className="size-5" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 font-display text-xl text-ink">Mood &amp; occasion filter</h3>
              <p className="mt-3 text-[13px] leading-6 text-muted-foreground">
                Filter by feeling — confident, serene, sensual — or by the moment. Find the perfect
                scent for boardrooms, date nights, or lazy Sundays.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="grid size-12 place-items-center rounded-lg bg-soft-gold text-ink">
                <Bookmark className="size-5" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 font-display text-xl text-ink">Collection tracker</h3>
              <p className="mt-3 text-[13px] leading-6 text-muted-foreground">
                Organise your wardrobe, track wear frequency, and share your curated shelf. Your
                personal fragrance journal, beautifully kept.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Note Visualizer Preview */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-11">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <p className="eyebrow">Olfactive map</p>
              <h2 className="mt-3 font-display text-3xl tracking-[-0.04em] text-ink sm:text-4xl">
                The anatomy of a scent.
              </h2>
              <p className="mt-4 text-[13px] leading-7 text-muted-foreground">
                Every great fragrance tells a story in three acts. Our note visualizer maps the
                journey from bright opening to lingering base, so you can see the full picture at a
                glance.
              </p>
              <Link to="/auth/signup" className="inline-flex mt-8">
                <Button className="h-11 bg-ink px-6 text-[11px] font-semibold text-sidebar-primary-foreground hover:bg-plum">
                  Start exploring <ArrowRight className="size-3.5" />
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <NoteVisualizer />
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="border-t border-border bg-soft-stone/50">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-11">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">The edit</p>
              <h2 className="mt-3 font-display text-3xl tracking-[-0.04em] text-ink sm:text-4xl">
                Trending this season.
              </h2>
            </div>
            <Link
              to="/discover"
              className="hidden sm:inline-flex items-center gap-2 text-[11px] font-semibold text-ink underline decoration-gold decoration-2 underline-offset-8 hover:text-plum"
            >
              Browse all <ChevronRight className="size-3" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fragrances.slice(0, 3).map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/discover"
              className="inline-flex items-center gap-2 text-[11px] font-semibold text-ink underline decoration-gold decoration-2 underline-offset-8"
            >
              Browse all <ChevronRight className="size-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-11">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center gap-1 text-gold">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="size-5 fill-gold" />
              ))}
            </div>
            <blockquote className="mt-8 font-display text-2xl leading-[1.2] tracking-[-0.02em] text-ink sm:text-3xl">
              "Scentlore changed how I shop for fragrance. I used to buy blind and regret it. Now I
              understand exactly what I'm getting into."
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="grid size-10 place-items-center rounded-full bg-soft-gold font-display text-sm text-ink">
                EW
              </div>
              <div className="text-left">
                <p className="text-[12px] font-semibold text-ink">Elena Whitfield</p>
                <p className="text-[11px] text-muted-foreground">Perfume collector · London</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-ink text-sidebar-primary-foreground">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-11">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold">Get started</p>
            <h2 className="mt-4 font-display text-4xl tracking-[-0.04em] sm:text-5xl">
              Your scent story starts here.
            </h2>
            <p className="mt-4 text-[13px] leading-7 text-sidebar-primary-foreground/70">
              Create your free account today and begin building a fragrance wardrobe that's truly
              yours. No credit card required.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {!isAuthenticated && (
                <Link to="/auth/signup">
                  <Button className="h-11 bg-gold px-8 text-[11px] font-bold text-ink hover:bg-gold/85">
                    Create free account
                  </Button>
                </Link>
              )}
              {isAuthenticated && (
                <Button onClick={() => setShowLogoutConfirm(true)} className="h-11 bg-gold px-8 text-[11px] font-bold text-ink hover:bg-gold/85" type="button">
                  Log out
                </Button>
              )}
              <Link to="/discover">
                <Button
                  variant="outline"
                  className="h-11 bg-transparent border-sidebar-primary-foreground/30 px-8 text-[11px] font-semibold text-sidebar-primary-foreground hover:bg-sidebar-primary-foreground/10"
                >
                  Explore fragrances
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <LogoutConfirmModal
        open={showLogoutConfirm}
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </PublicShell>
  );
}
