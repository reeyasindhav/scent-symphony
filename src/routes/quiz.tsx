import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { PublicShell } from "@/lib/scentlore";
import { fragrances } from "@/lib/scentlore";
import { useState } from "react";

type Answer = {
  mood?: string;
  season?: string;
  occasion?: string;
};

const moodOptions = [
  { value: "calm", label: "Calm & grounded" },
  { value: "adventurous", label: "Adventurous & bright" },
  { value: "sensual", label: "Sensual & warm" },
  { value: "fresh", label: "Fresh & clean" },
];

const seasonOptions = [
  { value: "spring", label: "Spring" },
  { value: "summer", label: "Summer" },
  { value: "autumn", label: "Autumn" },
  { value: "winter", label: "Winter" },
];

const occasionOptions = [
  { value: "daily", label: "Daily wear" },
  { value: "date", label: "Date night" },
  { value: "work", label: "Work / focus" },
  { value: "escape", label: "Weekend escape" },
];

function scoreFragrance(fragrance: (typeof fragrances)[number], answer: Answer) {
  let score = 0;
  const text = `${fragrance.name} ${fragrance.house} ${fragrance.note} ${fragrance.tags.join(" ")} ${fragrance.description}`.toLowerCase();

  if (answer.mood === "calm" && /green|fig|cedar|sandalwood|wood/.test(text)) score += 2;
  if (answer.mood === "adventurous" && /citrus|neroli|bright|violet|floral/.test(text)) score += 2;
  if (answer.mood === "sensual" && /musk|amber|warm|woody|leather/.test(text)) score += 2;
  if (answer.mood === "fresh" && /musk|clean|fresh|pear|ambroxan/.test(text)) score += 2;

  if (answer.season === "spring" && /floral|green|fig|fresh/.test(text)) score += 1;
  if (answer.season === "summer" && /citrus|neroli|violet|sandflower|fresh/.test(text)) score += 1;
  if (answer.season === "autumn" && /woody|amber|sandalwood|warm/.test(text)) score += 1;
  if (answer.season === "winter" && /woody|leather|amber|warm/.test(text)) score += 1;

  if (answer.occasion === "daily" && /clean|musk|fresh|everyday/.test(text)) score += 1;
  if (answer.occasion === "date" && /warm|magnetic|sensual|date/.test(text)) score += 1;
  if (answer.occasion === "work" && /clean|fresh|office/.test(text)) score += 1;
  if (answer.occasion === "escape" && /sand|desert|travel|beach|garden/.test(text)) score += 1;

  return score;
}

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Find my scent — Scentlore" },
      { name: "description", content: "Take a short quiz and we'll recommend the perfect fragrance for you." },
      { property: "og:title", content: "Find my scent — Scentlore" },
      { property: "og:description", content: "Take a short quiz and we'll recommend the perfect fragrance for you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState<Answer>({});

  const select = (key: keyof Answer, value: string) => {
    setAnswer((prev) => ({ ...prev, [key]: value }));
    setStep((prev) => prev + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswer({});
  };

  const recommendations = step === 3
    ? [...fragrances]
        .map((fragrance) => ({ fragrance, score: scoreFragrance(fragrance, answer) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
    : [];

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
          <p className="eyebrow text-center">Find my scent</p>
          <h1 className="mt-6 font-display text-5xl leading-[.95] tracking-[-0.05em] text-ink sm:text-6xl text-center">
            What are you <em className="text-plum">looking for?</em>
          </h1>

          {step === 0 && (
            <div className="mt-10">
              <p className="text-center text-[12px] text-muted-foreground">Question 1 of 3</p>
              <h2 className="mt-2 text-center font-display text-[29px] text-ink">What mood fits you today?</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {moodOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => select("mood", option.value)}
                    className="rounded-md border border-border bg-card p-5 text-left transition hover:border-gold"
                  >
                    <span className="text-[12px] font-semibold text-ink">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="mt-10">
              <p className="text-center text-[12px] text-muted-foreground">Question 2 of 3</p>
              <h2 className="mt-2 text-center font-display text-[29px] text-ink">Which season feels most like you?</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {seasonOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => select("season", option.value)}
                    className="rounded-md border border-border bg-card p-5 text-left transition hover:border-gold"
                  >
                    <span className="text-[12px] font-semibold text-ink">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mt-10">
              <p className="text-center text-[12px] text-muted-foreground">Question 3 of 3</p>
              <h2 className="mt-2 text-center font-display text-[29px] text-ink">What’s the occasion?</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {occasionOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => select("occasion", option.value)}
                    className="rounded-md border border-border bg-card p-5 text-left transition hover:border-gold"
                  >
                    <span className="text-[12px] font-semibold text-ink">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="mt-10">
              <div className="mx-auto max-w-md rounded-full border border-border bg-card px-4 py-2 text-center">
                <span className="text-[11px] font-semibold text-ink">Your matches</span>
              </div>
              <div className="mt-6 grid gap-4">
                {recommendations.map(({ fragrance }) => (
                  <Link
                    key={fragrance.name}
                    to={`/fragrance/${fragrance.name.toLowerCase().replaceAll(" ", "-")}`}
                    className="rounded-md border border-border bg-card p-5 transition hover:border-gold"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="font-display text-[18px] text-ink">{fragrance.name}</h3>
                        <p className="mt-1 text-[11px] text-muted-foreground">{fragrance.house}</p>
                      </div>
                      <span className="font-display text-[15px] text-ink">${fragrance.price}</span>
                    </div>
                    <p className="mt-3 text-[12px] leading-6 text-muted-foreground">{fragrance.description}</p>
                  </Link>
                ))}
              </div>
              <button
                onClick={reset}
                className="mt-6 inline-flex h-10 items-center gap-2 rounded-md border border-border bg-card px-5 text-[11px] font-semibold text-ink transition hover:border-gold"
              >
                Retake quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </PublicShell>
  );
}
