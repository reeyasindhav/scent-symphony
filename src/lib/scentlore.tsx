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
  ShoppingBag,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import heroBottle from "@/assets/gris-chanel-hero.jpg";

const publicNavLinks = [
  { label: "Discover", to: "/discover" },
  { label: "Find my scent", to: "/quiz" },
  { label: "Collection", to: "/collection" },
  { label: "Reviews", to: "/reviews" },
] as const;

const publicFooterLinks = {
  company: [
    { label: "About", to: "/about" },
    { label: "Journal", to: "/journal" },
    { label: "Careers", to: "/careers" },
    { label: "Contact", to: "/contact" },
  ],
  account: [
    { label: "Sign in", to: "/auth/login" },
    { label: "Create account", to: "/auth/signup" },
    { label: "Settings", to: "/profile" },
  ],
  legal: [
    { label: "Privacy", to: "/privacy" },
    { label: "Terms", to: "/terms" },
    { label: "Cookies", to: "/cookies" },
  ],
} as const;

export const fragrances = [
  {
    name: "Santal 33",
    house: "Le Labo",
    price: 175,
    sizes: [
      { label: "50ml", price: 175 },
      { label: "100ml", price: 240 },
    ],
    rating: "4.7",
    note: "Woody · Spicy",
    tag: "WOODY",
    accent: "product-sand",
    image: "http://fragrancelord.com/cdn/shop/files/WEBSITEPHOTOS_12_70a84cef-7e0f-44e7-84bc-9e9163325115.png?v=1708255819",
    description: "A warm, smoky blend of sandalwood and leather that evokes the quiet vastness of the American West.",
    longDescription: "Santal 33 opens with spicy cardamom and bergamot before settling into a smoky, creamy sandalwood heart. The leather base gives it an enduring, lived-in warmth that feels both rugged and refined.",
    tags: ["Woody", "Smoky", "Unisex"],
    reviews: 284,
    quote: "Like sitting by a campfire under an indigo sky.",
    reviewer: "James K.",
    wornFor: "Cool evenings · Weekend getaways · Creative work",
    ingredients: [
      "Alcohol denat.",
      "Fragrance",
      "Aqua / Water",
      "Santalum album (sandalwood) extract",
      "Cardamom seed extract",
      "Bergamot peel oil",
      "Leather extract",
    ],
    notes: [
      { name: "Bergamot", type: "Top note", position: "right-[4%] top-[17%]", color: "bg-gold" },
      { name: "Cardamom", type: "Heart note", position: "bottom-[27%] right-[-2%]", color: "bg-plum-soft" },
      { name: "Sandalwood", type: "Base note", position: "bottom-[7%] left-[2%]", color: "bg-ink" },
    ],
  },
  {
    name: "Gris Charnel",
    house: "BDK Parfums",
    price: 165,
    sizes: [
      { label: "50ml", price: 165 },
      { label: "100ml", price: 220 },
    ],
    rating: "4.8",
    note: "Woody · Amber",
    tag: "WOODY",
    accent: "product-plum",
    image: "https://www.feelingsexy.com.au/images/products/allproducts/BDK_GRISCHARNEL.jpg",
    description: "A velvety study in contrast. Fig and black tea open with a soft, milky brightness before giving way to the slow warmth of sandalwood and cardamom.",
    longDescription: "Gris Charnel balances fig’s milky fruitiness with black tea and warm woods. It’s a quiet, magnetic scent that feels intimate without trying too hard.",
    tags: ["Woody", "Warm & magnetic", "Date night"],
    reviews: 328,
    quote: "Like wrapping yourself in a perfectly worn cashmere scarf.",
    reviewer: "Camille R.",
    wornFor: "Date night · Quiet mornings · Creative work",
    ingredients: [
      "Alcohol denat.",
      "Fragrance",
      "Aqua / Water",
      "Fig extract",
      "Black tea extract",
      "Sandalwood extract",
      "Cardamom seed oil",
    ],
    notes: [
      { name: "Fig", type: "Top note", position: "right-[4%] top-[17%]", color: "bg-gold" },
      { name: "Black Tea", type: "Heart note", position: "bottom-[27%] right-[-2%]", color: "bg-plum-soft" },
      { name: "Sandalwood", type: "Base note", position: "bottom-[7%] left-[2%]", color: "bg-ink" },
    ],
  },
  {
    name: "Another 13",
    house: "Le Labo",
    price: 189,
    sizes: [
      { label: "30ml", price: 189 },
      { label: "50ml", price: 245 },
      { label: "100ml", price: 310 },
    ],
    rating: "4.6",
    note: "Musk · Fresh",
    tag: "MUSK",
    accent: "product-rose",
    image: "http://fragrancelord.com/cdn/shop/files/WEBSITEPHOTOS_9_9ae83bdc-f044-4155-b6e3-60f97e1bfb38.png?v=1714553340",
    description: "An intimate musk composition built around ambroxan, with fruity top notes and a clean, skin-like drydown.",
    longDescription: "Another 13 is deceptively simple. A pear-like opening fades into a soft musk skin scent that stays close and personal.",
    tags: ["Musk", "Clean", "Everyday"],
    reviews: 215,
    quote: "It feels like a secret only your skin gets to know.",
    reviewer: "Mia T.",
    wornFor: "Office hours · First dates · Daily wear",
    ingredients: [
      "Alcohol denat.",
      "Fragrance",
      "Aqua / Water",
      "Ambroxan",
      "Pear extract",
      "Ambrette seed oil",
      "White musk",
    ],
    notes: [
      { name: "Pear", type: "Top note", position: "right-[4%] top-[17%]", color: "bg-gold" },
      { name: "Ambrette", type: "Heart note", position: "bottom-[27%] right-[-2%]", color: "bg-plum-soft" },
      { name: "Ambroxan", type: "Base note", position: "bottom-[7%] left-[2%]", color: "bg-ink" },
    ],
  },
  {
    name: "Mojave Ghost",
    house: "Byredo",
    price: 145,
    sizes: [
      { label: "50ml", price: 145 },
      { label: "100ml", price: 200 },
    ],
    rating: "4.5",
    note: "Floral · Woody",
    tag: "FLORAL",
    accent: "product-stone",
    image: "https://www.scentdecant.com/cdn/shop/files/Mohave_Ghost_w.jpg?v=1784169927",
    description: "A ghostly floral accord of violet and sandalwood, inspired by the resilient ghost flower of the Mojave desert.",
    longDescription: "Mojave Ghost captures desert resilience: violet petals, sandflower, and bleached woods in an airy, luminous composition.",
    tags: ["Floral", "Woody", "Daytime"],
    reviews: 192,
    quote: "Soft as desert wind and twice as memorable.",
    reviewer: "Elena R.",
    wornFor: "Daytime · Garden parties · Beach escapes",
    ingredients: [
      "Alcohol denat.",
      "Fragrance",
      "Aqua / Water",
      "Violet extract",
      "Sandflower absolute",
      "Sandalwood extract",
      "Cedarwood oil",
    ],
    notes: [
      { name: "Violet", type: "Top note", position: "right-[4%] top-[17%]", color: "bg-gold" },
      { name: "Sandflower", type: "Heart note", position: "bottom-[27%] right-[-2%]", color: "bg-plum-soft" },
      { name: "Sandalwood", type: "Base note", position: "bottom-[7%] left-[2%]", color: "bg-ink" },
    ],
  },
  {
    name: "Philosykos",
    house: "Diptyque",
    price: 155,
    sizes: [
      { label: "50ml", price: 155 },
      { label: "100ml", price: 215 },
    ],
    rating: "4.4",
    note: "Green · Creamy",
    tag: "GREEN",
    accent: "product-sage",
    image: "https://zgoperfumery.com/cdn/shop/files/diptyque-philosykos-eau-de-parfum-75ml__81233.1691108273.1280.1280.jpg?v=1757104758&width=5000",
    description: "The entire fig tree in scent: crushed leaves, green fruit, milky sap, and cedar bark in a sunlit Greek grove.",
    longDescription: "Philosykos reconstructs the whole fig tree—green leaves, sun-warmed wood, and creamy sap—without ever turning cloying.",
    tags: ["Green", "Creamy", "Summer"],
    reviews: 176,
    quote: "Like walking through a sun-drenched fig grove in Greece.",
    reviewer: "Nikos P.",
    wornFor: "Summer mornings · Countryside · Meditation",
    ingredients: [
      "Alcohol denat.",
      "Fragrance",
      "Aqua / Water",
      "Fig leaf absolute",
      "Green fig extract",
      "Cedarwood oil",
      "Sandalwood extract",
    ],
    notes: [
      { name: "Fig Leaf", type: "Top note", position: "right-[4%] top-[17%]", color: "bg-gold" },
      { name: "Green Fig", type: "Heart note", position: "bottom-[27%] right-[-2%]", color: "bg-plum-soft" },
      { name: "Cedar", type: "Base note", position: "bottom-[7%] left-[2%]", color: "bg-ink" },
    ],
  },
  {
    name: "Bal d'Afrique",
    house: "Byredo",
    price: 170,
    sizes: [
      { label: "50ml", price: 170 },
      { label: "100ml", price: 235 },
    ],
    rating: "4.6",
    note: "Citrus · Woody",
    tag: "CITRUS",
    accent: "product-amber",
    image: "https://www.scentdecant.com/cdn/shop/files/Bal_d_afrique_w_edeea744-0f69-46a5-9aa7-753073816b98.jpg?v=1784168647",
    description: "A radiant African summer captured in citrus, neroli, and cedarwood with a warm amber base.",
    longDescription: "Bal d'Afrique is a sunlit ode to 1920s Parisian nightlife and African warmth: neroli, vetiver, and amber radiance.",
    tags: ["Citrus", "Warm", "Joyful"],
    reviews: 241,
    quote: "A burst of sunshine bottled in amber.",
    reviewer: "Amina D.",
    wornFor: "Brunch · Travel · Celebration",
    ingredients: [
      "Alcohol denat.",
      "Fragrance",
      "Aqua / Water",
      "Neroli oil",
      "Vetiver root oil",
      "Cedarwood oil",
      "Amber absolute",
    ],
    notes: [
      { name: "Neroli", type: "Top note", position: "right-[4%] top-[17%]", color: "bg-gold" },
      { name: "Vetiver", type: "Heart note", position: "bottom-[27%] right-[-2%]", color: "bg-plum-soft" },
      { name: "Cedar", type: "Base note", position: "bottom-[7%] left-[2%]", color: "bg-ink" },
    ],
  },
] as const;

const navItems = [
  { label: "Overview", to: "/overview", icon: Home },
  { label: "Discover", to: "/discover", icon: Compass },
  { label: "My collection", to: "/collection", icon: Bookmark, count: "12" },
  { label: "Saved scents", to: "/reviews", icon: Heart, count: "8" },
] as const;

export function ProductImage({
  alt,
  src,
  className = "",
  objectPosition = "center",
}: {
  alt: string;
  src?: string;
  className?: string;
  objectPosition?: string;
}) {
  return (
    <img
      src={src ?? heroBottle}
      alt={alt}
      className={`h-full w-full object-cover ${className}`}
      style={{ objectPosition }}
      width={1200}
      height={800}
      loading="lazy"
    />
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (router) => router.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  const displayName = user?.name ?? "Scent explorer";
  const initials = user?.initials ?? displayName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
    setTimeout(() => {
      window.location.href = "/";
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[240px] flex-col border-r border-border bg-sidebar px-5 py-7 transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-start justify-between px-1">
          <Link to="/" className="group" onClick={() => setMobileOpen(false)}>
            <span className="font-display text-[26px] leading-none tracking-[-0.04em] text-ink">
              scentlore.
            </span>
            <span className="mt-2 block text-[9px] font-semibold uppercase tracking-[0.31em] text-muted-foreground">
              The fragrance journal
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X />
          </Button>
        </div>

        <nav className="mt-14 space-y-1" aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`flex h-11 items-center gap-3 rounded-md px-3 text-[13px] font-medium transition-all ${isActive(item.to) ? "bg-ink text-sidebar-primary-foreground shadow-[0_8px_20px_-12px_var(--color-ink)]" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
              >
                <Icon className="size-[17px]" strokeWidth={1.7} />
                <span>{item.label}</span>
                {"count" in item && item.count && (
                  <span
                    className={`ml-auto text-[11px] ${isActive(item.to) ? "text-sidebar-primary-foreground/70" : "text-muted-foreground/80"}`}
                  >
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-12 rounded-md bg-ink px-4 py-5 text-sidebar-primary-foreground">
          <Sparkles className="size-5 text-gold" strokeWidth={1.5} />
          <p className="mt-5 font-display text-[18px] leading-[1.12]">Find your signature scent.</p>
          <p className="mt-2 text-[11px] leading-5 text-sidebar-primary-foreground/65">
            A little ritual, a world of fragrance.
          </p>
          <Link
            to="/discover"
            className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold text-gold transition-transform hover:translate-x-1"
          >
            Explore guide <ChevronRight className="size-3" />
          </Link>
        </div>

        <div className="mt-auto border-t border-border pt-4">
          <Link
            to="/profile"
            className="flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-secondary"
          >
            <span className="grid size-9 place-items-center rounded-full bg-soft-gold text-ink">
              <span className="font-display text-[13px]">{initials}</span>
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[12px] font-semibold">{displayName}</span>
              <span className="block text-[10px] text-muted-foreground">Scent explorer</span>
            </span>
            <Settings className="ml-auto size-4 text-muted-foreground" strokeWidth={1.5} />
          </Link>
        </div>
      </aside>

      {mobileOpen && (
        <Button
          variant="ghost"
          className="fixed inset-0 z-30 h-full w-full cursor-default bg-ink/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation overlay"
        />
      )}
      <div className="lg:pl-[240px]">
        <header className="sticky top-0 z-20 flex h-[74px] items-center justify-between border-b border-border bg-background/95 px-5 backdrop-blur-md sm:px-8 lg:px-11">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </Button>
          <div className="relative hidden w-full max-w-[270px] sm:block">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              strokeWidth={1.5}
            />
            <input
              aria-label="Search fragrances"
              placeholder="Search a fragrance, house or note..."
              className="h-10 w-full rounded-md border border-border bg-secondary/40 pl-10 pr-3 text-[12px] outline-none transition focus:border-gold"
            />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Link
              to="/cart"
              className="relative text-muted-foreground hover:text-ink"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="size-[18px]" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-ink text-[9px] font-bold text-sidebar-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground"
              aria-label="Notifications"
            >
              <Bell className="size-[18px]" strokeWidth={1.5} />
              <span className="absolute right-[7px] top-[7px] size-1.5 rounded-full bg-gold" />
            </Button>
            <span className="hidden h-6 w-px bg-border sm:block" />
            {isAuthenticated && user ? (
              <div className="hidden items-center gap-3 sm:flex">
                <span className="hidden text-[12px] text-muted-foreground sm:block">
                  Good morning, <strong className="font-semibold text-foreground">{user.name}</strong>
                </span>
                <span className="grid size-8 place-items-center rounded-full bg-soft-gold font-display text-[13px] text-ink">
                  {user.initials}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowLogoutConfirm(true)}
                  className="text-muted-foreground hover:text-ink"
                  aria-label="Log out"
                  type="button"
                >
                  <LogOut className="size-[18px]" strokeWidth={1.5} />
                </Button>
              </div>
            ) : (
              <span className="hidden text-[12px] text-muted-foreground sm:block">
                Good morning, <strong className="font-semibold text-foreground">Maya</strong>
              </span>
            )}
            {isAuthenticated && user && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowLogoutConfirm(true)}
                className="relative text-muted-foreground sm:hidden hover:text-ink"
                aria-label="Log out"
                type="button"
              >
                <span className="grid size-6 place-items-center rounded-full bg-soft-gold font-display text-[10px] text-ink">
                  {user.initials}
                </span>
              </Button>
            )}
            {!isAuthenticated && (
              <span className="grid size-8 place-items-center rounded-full bg-soft-gold font-display text-[13px] text-ink">
                MW
              </span>
            )}
          </div>
        </header>
        <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-11 lg:py-10">
          {children}
        </main>
      </div>
      <LogoutConfirmModal
        open={showLogoutConfirm}
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 font-display text-[27px] leading-none tracking-[-0.035em] text-ink sm:text-[31px]">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

export function ProductCard({
  product,
  index = 0,
  onAddToCart,
}: {
  product: (typeof fragrances)[number];
  index?: number;
  onAddToCart?: (product: (typeof fragrances)[number]) => void;
}) {
  const [saved, setSaved] = useState(index === 0);
  return (
    <article className="group overflow-hidden rounded-md border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-24px_var(--color-ink)]">
      <Link
        to="/fragrance/$slug"
        params={{ slug: product.name.toLowerCase().replaceAll(" ", "-") }}
        className={`relative block aspect-[1.55] overflow-hidden ${product.accent}`}
      >
        <ProductImage
          alt={`${product.name} by ${product.house}`}
          src={product.image}
          className="mix-blend-multiply opacity-85 transition duration-500 group-hover:scale-105"
          objectPosition={`${42 + index * 7}% center`}
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-card/90 px-2.5 py-1 text-[8px] font-bold tracking-[0.12em] text-ink">
          {product.tag}
        </span>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              to="/fragrance/$slug"
              params={{ slug: product.name.toLowerCase().replaceAll(" ", "-") }}
              className="font-display text-[19px] leading-none text-ink hover:text-plum"
            >
              {product.name}
            </Link>
            <p className="mt-1.5 text-[11px] text-muted-foreground">{product.house}</p>
          </div>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-ink">
            <Star className="size-3 fill-gold text-gold" />
            {product.rating}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <span className="font-display text-[16px] text-ink">${product.price}</span>
          <span className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
            {product.note}
          </span>
          <div className="flex items-center gap-2">
            {onAddToCart && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onAddToCart(product)}
                className="h-7 px-0 text-ink hover:bg-transparent"
              >
                <ShoppingBag className="size-3.5" />
                <span className="ml-1 text-[10px]">Add</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSaved(!saved)}
              className={
                saved
                  ? "h-7 px-0 text-gold hover:bg-transparent"
                  : "h-7 px-0 text-ink hover:bg-transparent"
              }
            >
              {saved ? <BookmarkCheck className="size-3.5" /> : <Bookmark className="size-3.5" />}
              <span className="ml-1 text-[10px]">{saved ? "In collection" : "+ Add"}</span>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function NoteVisualizer({ compact = false, notes, name }: { compact?: boolean; notes?: Array<{ name: string; type: string; position: string; color: string }>; name?: string }) {
  const displayNotes = notes ?? [
    { name: "Bergamot", type: "Top note", position: "right-[4%] top-[17%]", color: "bg-gold" },
    { name: "Iris", type: "Heart note", position: "bottom-[27%] right-[-2%]", color: "bg-plum-soft" },
    { name: "Sandalwood", type: "Base note", position: "bottom-[7%] left-[2%]", color: "bg-ink" },
  ];
  const displayName = name ?? "GRIS CHANEL";

  return (
    <div
      className={`note-visualizer relative ${compact ? "h-[190px] w-[190px]" : "h-[260px] w-[260px]"}`}
    >
      <div className="absolute inset-[7%] rounded-full border border-gold/30" />
      <div className="absolute inset-[19%] rounded-full border border-gold/45" />
      <div className="absolute inset-[32%] rounded-full border border-gold/60" />
      <div className="absolute inset-[43%] grid place-items-center rounded-full bg-soft-gold font-display text-[13px] leading-[1.05] text-ink shadow-[0_0_0_10px_var(--color-background)]">
        {displayName}
      </div>
      {displayNotes.map((note) => (
        <span
          key={note.name}
          className={`absolute ${note.position} flex items-center gap-2 text-[11px] font-semibold text-ink`}
        >
          <i className={`size-2 rounded-full ${note.color}`} /> {note.name}{" "}
          <small className="hidden text-[8px] font-normal uppercase tracking-wider text-muted-foreground sm:inline">
            {note.type}
          </small>
        </span>
      ))}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-9 flex flex-col justify-between gap-5 border-b border-border pb-7 sm:flex-row sm:items-end">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2 max-w-2xl font-display text-4xl leading-[.95] tracking-[-0.045em] text-ink sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-xl text-[13px] leading-6 text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function EmptyLink({
  children,
  to = "/discover",
}: {
  children: ReactNode;
  to?: "/discover" | "/collection";
}) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-[11px] font-semibold text-ink underline decoration-gold decoration-2 underline-offset-8 transition hover:text-plum"
    >
      {children}
      <ChevronRight className="size-3" />
    </Link>
  );
}

export function AuthMark() {
  return (
    <div className="text-center">
      <Link to="/" className="font-display text-[34px] tracking-[-0.05em] text-ink">
        scentlore.
      </Link>
      <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.31em] text-muted-foreground">
        The fragrance journal
      </p>
    </div>
  );
}

export function AuthFooter() {
  return (
    <p className="mt-8 text-center text-[11px] text-muted-foreground">
      © 2024 Scentlore · A considered way to discover scent.
    </p>
  );
}

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
    setTimeout(() => {
      window.location.href = "/";
    }, 0);
  };

   return (
     <>
       <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-11">
        <Link to="/" className="font-display text-[26px] leading-none tracking-[-0.04em] text-ink">
          scentlore.
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {publicNavLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-[13px] text-muted-foreground transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <Button
              variant="ghost"
              onClick={() => setShowLogoutConfirm(true)}
              className="h-9 px-4 text-[11px] font-semibold text-ink"
              type="button"
            >
              <LogOut className="size-3.5 mr-1" strokeWidth={1.5} /> Log out
            </Button>
          ) : (
            <>
              <Link to="/auth/login">
                <Button variant="ghost" className="h-9 px-4 text-[11px] font-semibold text-ink">
                  Sign in
                </Button>
              </Link>
              <Link to="/auth/signup">
                <Button className="h-9 bg-ink px-5 text-[11px] font-semibold text-sidebar-primary-foreground hover:bg-plum">
                  Get started
                </Button>
              </Link>
            </>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-muted-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>
      {mobileOpen && (
        <div className="border-t border-border bg-background px-5 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {publicNavLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-[13px] text-muted-foreground hover:text-ink"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <hr className="border-border" />
            {isAuthenticated ? (
              <Button
                variant="ghost"
                onClick={() => { setShowLogoutConfirm(true); setMobileOpen(false); }}
                className="text-[13px] font-semibold text-ink justify-start px-0"
                type="button"
              >
                <LogOut className="size-4 mr-2" strokeWidth={1.5} /> Log out
              </Button>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="text-[13px] font-semibold text-ink"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/auth/signup"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-ink text-[11px] font-semibold text-sidebar-primary-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      <LogoutConfirmModal
        open={showLogoutConfirm}
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </header>
    </>
  );
}

export function PublicFooter() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
    setTimeout(() => {
      window.location.href = "/";
    }, 0);
  };

   return (
     <>
       <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-11">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="font-display text-[26px] leading-none tracking-[-0.04em] text-ink"
            >
              scentlore.
            </Link>
            <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
              The fragrance journal. A more considered way to discover scent.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-ink">Company</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {publicFooterLinks.company.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-[12px] text-muted-foreground hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-ink">Account</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="text-[12px] text-muted-foreground hover:text-ink">
                    Settings
                  </Link>
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="text-left text-[12px] text-muted-foreground hover:text-ink"
                    type="button"
                  >
                    Log out
                  </button>
                </>
              ) : (
                publicFooterLinks.account.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="text-[12px] text-muted-foreground hover:text-ink"
                  >
                    {item.label}
                  </Link>
                ))
              )}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-ink">Legal</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {publicFooterLinks.legal.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-[12px] text-muted-foreground hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-[11px] text-muted-foreground">
            © 2024 Scentlore. All rights reserved.
          </p>
        </div>
      </div>
      <LogoutConfirmModal
        open={showLogoutConfirm}
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </footer>
    </>
  );
}

export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}

export function AuthInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold text-ink">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-11 w-full rounded-md border border-border bg-card px-3 text-[12px] text-foreground outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
      />
    </label>
  );
}

export function SignOutButton() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { logout } = useAuth();

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
    setTimeout(() => {
      window.location.href = "/";
    }, 0);
  };

  return (
    <>
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => setShowLogoutConfirm(true)}
        type="button"
      >
        <LogOut className="size-4" /> Log out
      </Button>
      <LogoutConfirmModal
        open={showLogoutConfirm}
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </>
  );
}

export function LoginPromptModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-5">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-7 shadow-xl">
        <h3 className="font-display text-[26px] text-ink">Sign in to continue</h3>
        <p className="mt-3 text-[12px] leading-6 text-muted-foreground">
          Create a free account or sign in to add fragrances to your bag, write reviews, and
          build your collection.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            to="/auth/login"
            onClick={onClose}
            className="flex h-11 items-center justify-center rounded-md bg-ink text-[11px] font-semibold text-sidebar-primary-foreground transition hover:bg-plum"
          >
            Sign in
          </Link>
          <Link
            to="/auth/signup"
            onClick={onClose}
            className="flex h-11 items-center justify-center rounded-md border border-border text-[11px] font-semibold text-ink transition hover:border-gold"
          >
            Create account
          </Link>
          <button
            onClick={onClose}
            className="text-[11px] text-muted-foreground underline-offset-4 hover:text-ink hover:underline"
          >
            Continue browsing
          </button>
        </div>
      </div>
    </div>
  );
}

export function LogoutConfirmModal({
  open,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-5">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-7 shadow-xl">
        <h3 className="font-display text-[26px] text-ink">Log out?</h3>
        <p className="mt-3 text-[12px] leading-6 text-muted-foreground">
          You’ll be signed out of your account and returned to the home page.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="flex h-11 items-center justify-center rounded-md bg-ink text-[11px] font-semibold text-sidebar-primary-foreground transition hover:bg-plum"
            type="button"
          >
            Log out
          </button>
          <button
            onClick={onCancel}
            className="flex h-11 items-center justify-center rounded-md border border-border text-[11px] font-semibold text-ink transition hover:border-gold"
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
