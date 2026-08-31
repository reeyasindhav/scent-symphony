import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PublicShell } from "@/lib/scentlore";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Scentlore" },
      { name: "description", content: "Read Scentlore's terms and conditions." },
      { property: "og:title", content: "Terms & Conditions — Scentlore" },
      { property: "og:description", content: "Read Scentlore's terms and conditions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
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
          <p className="eyebrow text-center">Terms & Conditions</p>
          <h1 className="mt-6 font-display text-5xl leading-[.95] tracking-[-0.05em] text-ink sm:text-6xl text-center">
            Rules of <em className="text-plum">engagement.</em>
          </h1>
          <p className="mt-6 text-[13px] leading-7 text-muted-foreground sm:text-[14px] text-center">
            These terms govern your use of Scentlore. By accessing or using our service, you agree to be bound by them.
          </p>

          <div className="mt-12 grid gap-6 text-left">
            {[
              { title: "Acceptance of terms", body: "By using Scentlore, you agree to these terms and any future revisions. If you do not agree, please discontinue use of the service." },
              { title: "User responsibilities", body: "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account." },
              { title: "Intellectual property", body: "All content, trademarks, and materials on Scentlore are owned by or licensed to us. You may not reproduce or distribute them without permission." },
              { title: "Limitation of liability", body: "Scentlore is provided as-is. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service." },
              { title: "Changes to terms", body: "We may update these terms occasionally. Continued use after changes means you accept the revised terms." },
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
