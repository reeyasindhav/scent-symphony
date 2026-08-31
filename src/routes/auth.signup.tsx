import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { AuthFooter, AuthInput, AuthMark, ProductImage } from "@/lib/scentlore";
import { Button } from "@/components/ui/button";
import { useAuth, getInitials } from "@/lib/auth";
import { useState } from "react";

export const Route = createFileRoute("/auth/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — Scentlore" },
      {
        name: "description",
        content: "Create your Scentlore account and begin building your scent wardrobe.",
      },
      { property: "og:title", content: "Create your account — Scentlore" },
      {
        property: "og:description",
        content: "Begin building your scent wardrobe with Scentlore.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    const displayName = name.trim() || "Scent lover";
    login({
      name: displayName,
      email: email.trim() || "user@example.com",
      initials: getInitials(displayName),
    });
    navigate({ to: "/overview" });
  };

  return (
    <div className="auth-screen min-h-screen bg-background">
      <div className="mx-auto grid min-h-[calc(100vh-74px)] max-w-[1440px] lg:grid-cols-[1fr_420px]">
        <div className="relative hidden mt-10 h-[480px] overflow-hidden rounded-xl bg-ink lg:block">
          <ProductImage alt="Gris Charnel perfume bottle" className="h-full w-full opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-10 text-sidebar-primary-foreground">
            <p className="eyebrow text-gold">The fragrance journal</p>
            <h2 className="mt-4 font-display text-4xl leading-[.95] tracking-[-0.04em]">
              Discover the scent <br />
              that tells your <em className="text-gold">story.</em>
            </h2>
            <p className="mt-4 max-w-md text-[13px] leading-6 text-sidebar-primary-foreground/70">
              Visual scent notes, mood-based discovery, and a personal collection tracker —
              everything you need to find your next signature fragrance.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="grid size-8 place-items-center rounded-full border-2 border-ink bg-soft-gold font-display text-[11px] text-ink"
                  >
                    M{i}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-sidebar-primary-foreground/70">
                Loved by{" "}
                <strong className="font-semibold text-sidebar-primary-foreground">12,000+</strong>{" "}
                scent explorers
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-5 py-12">
          <div className="w-full max-w-[420px]">
            <div className="lg:hidden">
              <AuthMark />
              <div className="mt-6 h-[140px] overflow-hidden rounded-lg bg-plum">
                <ProductImage alt="Hero fragrance bottle" className="opacity-80" />
              </div>
            </div>
            <div className="mt-8 rounded-lg border border-border bg-card p-7 shadow-[0_18px_40px_-32px_var(--color-ink)] sm:p-9 lg:mt-0 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="hidden lg:block">
                <AuthMark />
              </div>
              <h1 className="mt-6 font-display text-[32px] tracking-[-0.04em] text-ink">
                Make room for scent.
              </h1>
              <p className="mt-2 text-[12px] text-muted-foreground">
                A more considered way to discover fragrance.
              </p>
              <div className="mt-7 space-y-4">
                <AuthInput label="Your name" placeholder="Maya Wilson" value={name} onChange={(e) => setName(e.target.value)} />
                <AuthInput label="Email address" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <AuthInput
                  label="Create a password"
                  type="password"
                  placeholder="At least 8 characters"
                />
                <Button
                  onClick={handleSubmit}
                  className="mt-2 h-11 w-full rounded-md bg-ink text-[11px] font-semibold text-sidebar-primary-foreground hover:bg-plum"
                >
                  Create account <ArrowRight className="size-3.5" />
                </Button>
              </div>
              <div className="mt-6 space-y-2 text-[10px] text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Check className="size-3 text-gold" /> Personalised discovery, at your pace.
                </p>
                <p className="flex items-center gap-2">
                  <Check className="size-3 text-gold" /> A private wardrobe for your favourites.
                </p>
              </div>
              <p className="mt-7 text-center text-[11px] text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4"
                >
                  Sign in
                </Link>
              </p>
            </div>
            <AuthFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
