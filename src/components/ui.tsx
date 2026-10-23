import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const iconPaths: Record<string, ReactNode> = {
  snowflake: (
    <>
      <path d="M12 2v20M4.2 6.6l15.6 10.8M19.8 6.6 4.2 17.4" />
      <path d="M12 6.5 9.3 4.4M12 6.5l2.7-2.1M12 17.5l-2.7 2.1M12 17.5l2.7 2.1M6.4 10.2l-3.4.3M17.6 13.8l3.4-.3M17.6 10.2l3.4.3M6.4 13.8l-3.4-.3" />
    </>
  ),
  wind: (
    <>
      <path d="M3 8h10.5a3 3 0 1 0-3-3" />
      <path d="M3 12h14a3 3 0 1 1-3 3" />
      <path d="M3 16h7a2.5 2.5 0 1 1-2.5 2.5" />
    </>
  ),
  droplets: (
    <>
      <path d="M12 21.5a6.5 6.5 0 0 0 6.5-6.5c0-2-.9-3.7-2.7-5.3C14.1 8.1 12.5 5.7 12 3c-.5 2.7-2.1 5.1-3.8 6.7C6.4 11.3 5.5 13 5.5 15A6.5 6.5 0 0 0 12 21.5Z" />
      <path d="M9.6 15.4a2.6 2.6 0 0 0 2.4 2.2" />
    </>
  ),
  gauge: (
    <>
      <path d="M3.3 18.6a9.6 9.6 0 1 1 17.4 0" />
      <path d="m12 14.7 4.2-4.9" />
      <circle cx="12" cy="15.2" r="1.3" />
    </>
  ),
  layers: (
    <>
      <path d="m12.8 2.7 7.9 3.9a1.2 1.2 0 0 1 0 2.1l-7.9 3.9a1.8 1.8 0 0 1-1.6 0L3.3 8.7a1.2 1.2 0 0 1 0-2.1l7.9-3.9a1.8 1.8 0 0 1 1.6 0Z" />
      <path d="m3 13 8.2 4.1a1.8 1.8 0 0 0 1.6 0L21 13" />
      <path d="m3 17.4 8.2 4.1a1.8 1.8 0 0 0 1.6 0L21 17.4" />
    </>
  ),
  shieldCheck: (
    <>
      <path d="M12 22s8-3.6 8-10V5.5l-8-3-8 3V12c0 6.4 8 10 8 10Z" />
      <path d="m8.8 11.6 2.2 2.2 4.4-4.4" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.9Z" />
  ),
  mapPin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.4 2" />
    </>
  ),
  check: <path d="m4.5 12.5 4.5 4.5L19.5 6.5" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  arrowLeft: (
    <>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </>
  ),
  arrowUp: (
    <>
      <path d="M12 19V5" />
      <path d="m6 11 6-6 6 6" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  quote: (
    <path
      d="M9.6 5.8C6.4 7.1 4.8 9.7 4.8 13.3v4.9h6.1v-6.4H7.8c0-2 .6-3.3 2.6-4.4l-.8-1.6Zm9.2 0c-3.2 1.3-4.8 3.9-4.8 7.5v4.9h6.1v-6.4H17c0-2 .6-3.3 2.6-4.4l-.8-1.6Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  home: (
    <>
      <path d="m3 10.5 9-7 9 7V20a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20v-9.5Z" />
      <path d="M9.5 21.5v-8h5v8" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="2.5" width="16" height="19" rx="2" />
      <path d="M9 7h1.5M13.5 7H15M9 11h1.5M13.5 11H15M9 15h1.5M13.5 15H15M11 21.5v-3h2v3" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 9 6.5L21 7" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </>
  ),
  thermometer: (
    <>
      <path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4.5 4.5 0 1 0 4 0Z" />
      <path d="M12 17.5v-4" />
    </>
  ),
  zap: <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l1-8Z" />,
  badgeCheck: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.3 2.7 2.7L16.4 9" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.9" />
      <path d="M16 3.1a4 4 0 0 1 0 7.8" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />
      <path d="M19 15.5 20 18l2.5 1-2.5 1-1 2.5-1-2.5L15.5 19l2.5-1 1-2.5Z" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h9M17 18h3" />
      <circle cx="15" cy="6" r="2" />
      <circle cx="9" cy="12" r="2" />
      <circle cx="15" cy="18" r="2" />
    </>
  ),
};

export type IconName = keyof typeof iconPaths;

export function Icon({
  name,
  className,
  strokeWidth = 1.7,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {iconPaths[name]}
    </svg>
  );
}

export function StarRating({ rating = 5, className = "" }: { rating?: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} role="img" aria-label={`تقييم ${rating} من 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={cn("size-3.5", i < rating ? "text-amber-400" : "text-ink-900/15")} fill="currentColor" aria-hidden="true">
          <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4-5.8-3-5.8 3 1.1-6.4L2.6 9.4l6.5-.9L12 2.6Z" />
        </svg>
      ))}
    </div>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.05-.52-.099-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.21.96.47 1.38.89.42.42.68.82.89 1.38.17.42.36 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.06 1.17-.25 1.8-.42 2.23-.21.56-.47.96-.89 1.38-.42.42-.82.68-1.38.89-.42.17-1.06.36-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.06-1.8-.25-2.23-.42a3.7 3.7 0 01-1.38-.89 3.7 3.7 0 01-.89-1.38c-.17-.42-.36-1.06-.42-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.06-1.17.25-1.8.42-2.23.21-.56.47-.96.89-1.38.42-.42.82-.68 1.38-.89.42-.17 1.06-.36 2.23-.42C8.42 2.21 8.8 2.2 12 2.2Zm0 1.98c-3.15 0-3.52.01-4.76.07-.99.04-1.53.21-1.89.35-.47.19-.81.4-1.17.76-.36.36-.58.7-.76 1.17-.14.36-.31.9-.35 1.89-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.99.21 1.53.35 1.89.19.47.4.81.76 1.17.36.36.7.58 1.17.76.36.14.9.31 1.89.35 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.99-.04 1.53-.21 1.89-.35.47-.19.81-.4 1.17-.76.36-.36.58-.7.76-1.17.14-.36.31-.9.35-1.89.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.99-.21-1.53-.35-1.89a3.1 3.1 0 00-.76-1.17 3.1 3.1 0 00-1.17-.76c-.36-.14-.9-.31-1.89-.35-1.24-.06-1.61-.07-4.76-.07Zm0 3.37a5 5 0 110 10 5 5 0 010-10Zm0 1.98a3.02 3.02 0 100 6.04 3.02 3.02 0 000-6.04Zm5.2-3.53a1.17 1.17 0 110 2.34 1.17 1.17 0 010-2.34Z" />
    </svg>
  );
}

export function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.9 2h3.4l-7.4 8.5L23.6 22h-6.8l-5.3-6.9L5.4 22H2l7.9-9.1L1.8 2h7l4.8 6.3L18.9 2Zm-1.2 17.9h1.9L7 4H5l12.7 15.9Z" />
    </svg>
  );
}

export function SnapchatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.1 2.5c2.6 0 4.2 1.9 4.3 4.4.04 1-.1 2 .03 2.5.15.35.6.45.95.25.4-.23.9-.1 1.1.3.2.42-.06.9-.55 1.2-.4.24-.8.4-.72.75.14.55 1.55 2.6 3.35 3.2.35.12.35.6 0 .78-.65.32-1.9.4-2.05.95-.08.3-.1.65-.35.75-.55.24-1.6-.35-2.55-.35-.9 0-1.1.9-2.35 1.3-.5.15-1.1.2-1.6.1-1.2-.25-1.5-1.4-3-1.4-.95 0-2 .6-2.55.35-.25-.1-.27-.45-.35-.75-.15-.55-1.4-.63-2.05-.95-.35-.18-.35-.66 0-.78 1.8-.6 3.2-2.65 3.35-3.2.08-.35-.32-.51-.72-.75-.49-.3-.75-.78-.55-1.2.2-.4.7-.53 1.1-.3.35.2.8.1.95-.25.13-.5-.01-1.5.03-2.5C7.8 4.4 9.5 2.5 12.1 2.5Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal + counters                                                   */
/* ------------------------------------------------------------------ */

export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px", ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "scale";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const style: CSSProperties = { transitionDelay: `${delay}ms` };

  return (
    <div
      ref={ref}
      style={style}
      className={cn(variant === "scale" ? "reveal-scale" : "reveal", inView && "is-visible", className)}
    >
      {children}
    </div>
  );
}

export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1700,
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(to);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(to * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration]);

  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons + headings                                                  */
/* ------------------------------------------------------------------ */

type ButtonVariant = "primary" | "mint" | "outline" | "ghostDark" | "whatsapp";
type ButtonSize = "sm" | "md" | "lg";

export function buttonStyles(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  const base =
    "group/btn relative inline-flex select-none items-center justify-center gap-2.5 rounded-full font-display font-semibold transition-all duration-300 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-ink-900 text-white shadow-[0_16px_36px_-18px_rgba(6,18,15,0.9)] hover:bg-ink-800 hover:shadow-[0_22px_44px_-18px_rgba(6,18,15,0.65)] hover:-translate-y-0.5",
    mint: "bg-brand-400 text-ink-950 shadow-glow hover:bg-brand-300 hover:-translate-y-0.5",
    outline:
      "border border-ink-900/15 bg-white/70 text-ink-900 backdrop-blur-md hover:border-ink-900/30 hover:bg-white hover:-translate-y-0.5 hover:shadow-soft",
    ghostDark:
      "border border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white/12 hover:border-white/35 hover:-translate-y-0.5",
    whatsapp:
      "border border-ink-900/10 bg-white text-ink-900 shadow-soft hover:border-brand-500/40 hover:bg-brand-50 hover:-translate-y-0.5",
  };
  const sizes: Record<ButtonSize, string> = {
    sm: "h-10 px-4 text-[13px]",
    md: "h-12 px-6 text-sm",
    lg: "h-[3.4rem] px-7 text-[15px]",
  };
  return cn(base, variants[variant], sizes[size], className);
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "start";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className
      )}
    >
      <span
        className={cn(
          "eyebrow inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5",
          tone === "light"
            ? "border-brand-700/15 bg-white/70 text-brand-800 shadow-[0_2px_10px_-6px_rgba(6,18,15,.3)] backdrop-blur"
            : "border-white/15 bg-white/8 text-brand-200 backdrop-blur"
        )}
      >
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-brand-400" />
          <span className="relative inline-flex size-1.5 rounded-full bg-brand-500" />
        </span>
        {eyebrow}
      </span>
      <h2 className={cn("display-lg mt-5 max-w-3xl text-balance", tone === "light" ? "text-ink-950" : "text-paper")}>
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-[15px] leading-8 text-pretty sm:text-base",
            tone === "light" ? "text-ink-700/75" : "text-paper/65"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Brand mark                                                          */
/* ------------------------------------------------------------------ */

export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-[14px] bg-ink-900 shadow-[0_10px_24px_-12px_rgba(6,18,15,.8)] ring-1 ring-white/10 sm:size-12">
        <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/12 to-transparent" />
        <span className="absolute -bottom-4 -left-3 size-9 rounded-full bg-brand-400/30 blur-md" />
        <svg viewBox="0 0 40 40" className="relative size-7" fill="none" aria-hidden="true">
          <path d="M8 30V18.5C8 14.4 11.4 11 15.5 11S23 14.4 23 18.5V30" stroke="#71e3c0" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M23 30V18.5C23 14.4 26.4 11 30.5 11" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeOpacity="0.9" />
          <path d="M12 33h16" stroke="#38cda6" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[17px] font-bold tracking-tight sm:text-lg", tone === "light" ? "text-ink-950" : "text-paper")}>
          مؤسسة مريم
        </span>
        <span className={cn("mt-1.5 font-display text-[10px] font-medium tracking-[0.16em]", tone === "light" ? "text-ink-700/55" : "text-paper/45")}>
          للمكيفات
        </span>
      </span>
    </span>
  );
}
