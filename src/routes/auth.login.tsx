import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AuthFooter, AuthInput, AuthMark, ProductImage } from "@/lib/scentlore";
import { Button } from "@/components/ui/button";
import { useAuth, getInitials } from "@/lib/auth";
import { useState } from "react";

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Scentlore" },
      { name: "description", content: "Sign in to continue your Scentlore journey." },
      { property: "og:title", content: "Sign in — Scentlore" },
      {
        property: "og:description",
        content: "Sign in to continue your Scentlore journey.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    const displayName = name.trim() || email.split("@")[0] || "Scent lover";
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
                Welcome back.
              </h1>
              <p className="mt-2 text-[12px] text-muted-foreground">
                Your scent story is waiting.
              </p>
              <div className="mt-8 space-y-5">
                <AuthInput label="Email address" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <AuthInput label="Your name" placeholder="Maya Wilson" value={name} onChange={(e) => setName(e.target.value)} />
                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="text-[11px] font-semibold text-ink">Password</span>
                    <Link
                      to="/auth/forgot-password"
                      className="text-[10px] font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="h-11 w-full rounded-md border border-border bg-card px-3 text-[12px] outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  className="h-11 w-full rounded-md bg-ink text-[11px] font-semibold text-sidebar-primary-foreground hover:bg-plum"
                >
                  Sign in <ArrowRight className="size-3.5" />
                </Button>
              </div>
              <div className="my-7 flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or{" "}
                <span className="h-px flex-1 bg-border" />
              </div>
              <Button variant="outline" className="h-11 w-full text-[11px]">
                Continue with Google
              </Button>
              <p className="mt-7 text-center text-[11px] text-muted-foreground">
                New to Scentlore?{" "}
                <Link
                  to="/auth/signup"
                  className="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4"
                >
                  Create an account
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
