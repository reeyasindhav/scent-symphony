import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PublicShell } from "@/lib/scentlore";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Scentlore" },
      { name: "description", content: "Read Scentlore's privacy policy." },
      { property: "og:title", content: "Privacy Policy — Scentlore" },
      { property: "og:description", content: "Read Scentlore's privacy policy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
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
          <p className="eyebrow text-center">Privacy Policy</p>
          <h1 className="mt-6 font-display text-5xl leading-[.95] tracking-[-0.05em] text-ink sm:text-6xl text-center">
            Your data, <em className="text-plum">protected.</em>
          </h1>
          <p className="mt-6 text-[13px] leading-7 text-muted-foreground sm:text-[14px] text-center">
            We respect your privacy and are committed to protecting your personal data. This policy explains what we collect, why we collect it, and how we use it.
          </p>

          <div className="mt-12 grid gap-6 text-left">
            {[
              { title: "Information we collect", body: "We collect information you provide directly to us, such as your name, email address, and any preferences you set within your account." },
              { title: "How we use your information", body: "We use your data to provide and improve the Scentlore experience, including personalized recommendations and account management." },
              { title: "Data sharing", body: "We do not sell your personal data. We may share information with trusted service providers who help us operate our business." },
              { title: "Your rights", body: "You can access, update, or delete your account information at any time. You can also log out and clear your local data." },
              { title: "Contact us", body: "If you have any questions about this privacy policy, please contact us at hello@scentlore.com." },
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
