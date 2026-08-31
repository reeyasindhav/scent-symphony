import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PublicShell } from "@/lib/scentlore";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookies Policy — Scentlore" },
      { name: "description", content: "Read Scentlore's cookies policy." },
      { property: "og:title", content: "Cookies Policy — Scentlore" },
      { property: "og:description", content: "Read Scentlore's cookies policy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
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
          <p className="eyebrow text-center">Cookies Policy</p>
          <h1 className="mt-6 font-display text-5xl leading-[.95] tracking-[-0.05em] text-ink sm:text-6xl text-center">
            How we use <em className="text-plum">cookies.</em>
          </h1>
          <p className="mt-6 text-[13px] leading-7 text-muted-foreground sm:text-[14px] text-center">
            This policy explains what cookies are, how we use them, and how you can manage them.
          </p>

          <div className="mt-12 grid gap-6 text-left">
            {[
              { title: "What are cookies?", body: "Cookies are small text files placed on your device when you visit a website. They help us remember your preferences and improve your experience." },
              { title: "How we use cookies", body: "We use cookies to keep you signed in, remember your preferences, and understand how visitors interact with our site." },
              { title: "Types of cookies we use", body: "We use essential cookies for site functionality, analytics cookies to understand usage, and preference cookies to remember your settings." },
              { title: "Managing cookies", body: "You can control or disable cookies through your browser settings. Note that disabling cookies may affect your experience on our site." },
              { title: "Updates to this policy", body: "We may update this cookies policy from time to time. Any changes will be posted on this page." },
            ].map((section) => (
              <div key={section.title} className="rounded-md border border-border bg-card p-6">
                <h2 className="font-display text-[18px] text-ink">{section.title}</h2>
                <p className="mt-2 text-[12px] leading-6 text-muted-foreground">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
