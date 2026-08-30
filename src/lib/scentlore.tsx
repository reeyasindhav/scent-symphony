import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Bell,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  CircleUserRound,
  Compass,
  Heart,
  Home,
  LogOut,
  Menu,
  Search,
  Settings,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBottle from "@/assets/gris-chanel-hero.jpg";

export const fragrances = [
  { name: "Santal 33", house: "Le Labo", rating: "4.7", note: "Woody · Spicy", tag: "WOODY", accent: "product-sand" },
  { name: "Gris Charnel", house: "BDK Parfums", rating: "4.8", note: "Woody · Amber", tag: "WOODY", accent: "product-plum" },
  { name: "Another 13", house: "Le Labo", rating: "4.6", note: "Musk · Fresh", tag: "MUSK", accent: "product-rose" },
  { name: "Mojave Ghost", house: "Byredo", rating: "4.5", note: "Floral · Woody", tag: "FLORAL", accent: "product-stone" },
  { name: "Philosykos", house: "Diptyque", rating: "4.4", note: "Green · Creamy", tag: "GREEN", accent: "product-sage" },
  { name: "Bal d'Afrique", house: "Byredo", rating: "4.6", note: "Citrus · Woody", tag: "CITRUS", accent: "product-amber" },
] as const;

const navItems = [
  { label: "Overview", to: "/", icon: Home },
  { label: "Discover", to: "/discover", icon: Compass },
  { label: "My collection", to: "/collection", icon: Bookmark, count: "12" },
  { label: "Saved scents", to: "/reviews", icon: Heart, count: "8" },
] as const;

export function ProductImage({ alt, className = "", objectPosition = "center" }: { alt: string; className?: string; objectPosition?: string }) {
  return <img src={heroBottle} alt={alt} className={`h-full w-full object-cover ${className}`} style={{ objectPosition }} width={1200} height={800} loading="lazy" />;
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (router) => router.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = (to: string) => to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[240px] flex-col border-r border-border bg-sidebar px-5 py-7 transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-start justify-between px-1">
          <Link to="/" className="group" onClick={() => setMobileOpen(false)}>
            <span className="font-display text-[26px] leading-none tracking-[-0.04em] text-ink">scentlore.</span>
            <span className="mt-2 block text-[9px] font-semibold uppercase tracking-[0.31em] text-muted-foreground">The fragrance journal</span>
          </Link>
          <Button variant="ghost" size="icon" className="text-muted-foreground lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></Button>
        </div>

        <nav className="mt-14 space-y-1" aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return <Link key={item.label} to={item.to} onClick={() => setMobileOpen(false)} className={`flex h-11 items-center gap-3 rounded-md px-3 text-[13px] font-medium transition-all ${isActive(item.to) ? "bg-ink text-sidebar-primary-foreground shadow-[0_8px_20px_-12px_var(--color-ink)]" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
              <Icon className="size-[17px]" strokeWidth={1.7} />
              <span>{item.label}</span>
              {"count" in item && item.count && <span className={`ml-auto text-[11px] ${isActive(item.to) ? "text-sidebar-primary-foreground/70" : "text-muted-foreground/80"}`}>{item.count}</span>}
            </Link>;
          })}
        </nav>

        <div className="mt-12 rounded-md bg-ink px-4 py-5 text-sidebar-primary-foreground">
          <Sparkles className="size-5 text-gold" strokeWidth={1.5} />
          <p className="mt-5 font-display text-[18px] leading-[1.12]">Find your signature scent.</p>
          <p className="mt-2 text-[11px] leading-5 text-sidebar-primary-foreground/65">A little ritual, a world of fragrance.</p>
          <Link to="/discover" className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold text-gold transition-transform hover:translate-x-1">Explore guide <ChevronRight className="size-3" /></Link>
        </div>

        <div className="mt-auto border-t border-border pt-4">
          <Link to="/profile" className="flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-secondary">
            <span className="grid size-9 place-items-center rounded-full bg-soft-gold text-ink"><CircleUserRound className="size-[18px]" strokeWidth={1.5} /></span>
            <span className="min-w-0"><span className="block truncate text-[12px] font-semibold">Maya Wilson</span><span className="block text-[10px] text-muted-foreground">Scent explorer</span></span>
            <Settings className="ml-auto size-4 text-muted-foreground" strokeWidth={1.5} />
          </Link>
        </div>
      </aside>

      {mobileOpen && <Button variant="ghost" className="fixed inset-0 z-30 h-full w-full cursor-default bg-ink/20 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation overlay" />}
      <div className="lg:pl-[240px]">
        <header className="sticky top-0 z-20 flex h-[74px] items-center justify-between border-b border-border bg-background/95 px-5 backdrop-blur-md sm:px-8 lg:px-11">
          <Button variant="ghost" size="icon" className="text-muted-foreground lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu /></Button>
          <div className="relative hidden w-full max-w-[270px] sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
            <input aria-label="Search fragrances" placeholder="Search a fragrance, house or note..." className="h-10 w-full rounded-md border border-border bg-secondary/40 pl-10 pr-3 text-[12px] outline-none transition focus:border-gold" />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground" aria-label="Notifications"><Bell className="size-[18px]" strokeWidth={1.5} /><span className="absolute right-[7px] top-[7px] size-1.5 rounded-full bg-gold" /></Button>
            <span className="hidden h-6 w-px bg-border sm:block" />
            <span className="hidden text-[12px] text-muted-foreground sm:block">Good morning, <strong className="font-semibold text-foreground">Maya</strong></span>
            <span className="grid size-8 place-items-center rounded-full bg-soft-gold font-display text-[13px] text-ink">MW</span>
          </div>
        </header>
        <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-11 lg:py-10">{children}</main>
      </div>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return <div className="mb-5 flex items-end justify-between gap-4"><div><p className="eyebrow">{eyebrow}</p><h2 className="mt-2 font-display text-[27px] leading-none tracking-[-0.035em] text-ink sm:text-[31px]">{title}</h2></div>{action}</div>;
}

export function ProductCard({ product, index = 0 }: { product: typeof fragrances[number]; index?: number }) {
  const [saved, setSaved] = useState(index === 0);
  return <article className="group overflow-hidden rounded-md border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-24px_var(--color-ink)]">
    <Link to="/fragrance/$slug" params={{ slug: product.name.toLowerCase().replaceAll(" ", "-") }} className={`relative block aspect-[1.55] overflow-hidden ${product.accent}`}>
      <ProductImage alt={`${product.name} by ${product.house}`} className="mix-blend-multiply opacity-85 transition duration-500 group-hover:scale-105" objectPosition={`${42 + index * 7}% center`} />
      <span className="absolute bottom-3 left-3 rounded-full bg-card/90 px-2.5 py-1 text-[8px] font-bold tracking-[0.12em] text-ink">{product.tag}</span>
    </Link>
    <div className="p-4">
      <div className="flex items-start justify-between gap-2"><div><Link to="/fragrance/$slug" params={{ slug: product.name.toLowerCase().replaceAll(" ", "-") }} className="font-display text-[19px] leading-none text-ink hover:text-plum">{product.name}</Link><p className="mt-1.5 text-[11px] text-muted-foreground">{product.house}</p></div><span className="flex items-center gap-1 text-[11px] font-semibold text-ink"><Star className="size-3 fill-gold text-gold" />{product.rating}</span></div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3"><span className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground">{product.note}</span><Button variant="ghost" size="sm" onClick={() => setSaved(!saved)} className={saved ? "h-7 px-0 text-gold hover:bg-transparent" : "h-7 px-0 text-ink hover:bg-transparent"}>{saved ? <BookmarkCheck className="size-3.5" /> : <Bookmark className="size-3.5" />}<span className="ml-1 text-[10px]">{saved ? "In collection" : "+ Add"}</span></Button></div>
    </div>
  </article>;
}

export function NoteVisualizer({ compact = false }: { compact?: boolean }) {
  return <div className={`note-visualizer relative ${compact ? "h-[190px] w-[190px]" : "h-[260px] w-[260px]"}`}>
    <div className="absolute inset-[7%] rounded-full border border-gold/30" /><div className="absolute inset-[19%] rounded-full border border-gold/45" /><div className="absolute inset-[32%] rounded-full border border-gold/60" /><div className="absolute inset-[43%] grid place-items-center rounded-full bg-soft-gold font-display text-[13px] leading-[1.05] text-ink shadow-[0_0_0_10px_var(--color-background)]">GRIS<br />CHANEL</div>
    <span className="absolute right-[4%] top-[17%] flex items-center gap-2 text-[11px] font-semibold text-ink"><i className="size-2 rounded-full bg-gold" /> Bergamot <small className="hidden text-[8px] font-normal uppercase tracking-wider text-muted-foreground sm:inline">Top note</small></span>
    <span className="absolute bottom-[27%] right-[-2%] flex items-center gap-2 text-[11px] font-semibold text-ink"><i className="size-2 rounded-full bg-plum-soft" /> Iris <small className="hidden text-[8px] font-normal uppercase tracking-wider text-muted-foreground sm:inline">Heart note</small></span>
    <span className="absolute bottom-[7%] left-[2%] flex items-center gap-2 text-[11px] font-semibold text-ink"><i className="size-2 rounded-full bg-ink" /> Sandalwood <small className="hidden text-[8px] font-normal uppercase tracking-wider text-muted-foreground sm:inline">Base note</small></span>
  </div>;
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="mb-9 flex flex-col justify-between gap-5 border-b border-border pb-7 sm:flex-row sm:items-end"><div><p className="eyebrow">{eyebrow}</p><h1 className="mt-2 max-w-2xl font-display text-4xl leading-[.95] tracking-[-0.045em] text-ink sm:text-5xl">{title}</h1>{description && <p className="mt-3 max-w-xl text-[13px] leading-6 text-muted-foreground">{description}</p>}</div>{action}</div>;
}

export function EmptyLink({ children, to = "/discover" }: { children: ReactNode; to?: "/discover" | "/collection" }) { return <Link to={to} className="inline-flex items-center gap-2 text-[11px] font-semibold text-ink underline decoration-gold decoration-2 underline-offset-8 transition hover:text-plum">{children}<ChevronRight className="size-3" /></Link>; }

export function AuthMark() { return <div className="text-center"><Link to="/" className="font-display text-[34px] tracking-[-0.05em] text-ink">scentlore.</Link><p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.31em] text-muted-foreground">The fragrance journal</p></div>; }

export function AuthFooter() { return <p className="mt-8 text-center text-[11px] text-muted-foreground">© 2024 Scentlore · A considered way to discover scent.</p>; }

export function AuthInput({ label, type = "text", placeholder }: { label: string; type?: string; placeholder: string }) { return <label className="block"><span className="mb-2 block text-[11px] font-semibold text-ink">{label}</span><input type={type} placeholder={placeholder} className="h-11 w-full rounded-md border border-border bg-card px-3 text-[12px] text-foreground outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20" /></label>; }

export function SignOutButton() { return <Button variant="outline" className="gap-2" onClick={() => window.location.assign("/auth/login")}><LogOut className="size-4" /> Sign out</Button>; }