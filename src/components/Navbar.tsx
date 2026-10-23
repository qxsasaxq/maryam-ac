import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { navLinks, site } from "../data";
import { Icon, Logo, WhatsAppIcon, buttonStyles } from "./ui";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.slice(1));
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(y / height, 1) : 0);

      let current = "";
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 160) current = id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        تجاوز إلى المحتوى
      </a>

      {/* Announcement bar */}
      <div className="relative z-40 bg-ink-950 text-paper/90">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 text-[11px] sm:h-10 sm:px-6 sm:text-xs lg:px-8">
          <p className="flex items-center gap-2 truncate">
            <Icon name="sparkles" className="size-3.5 shrink-0 text-brand-300" />
            <span className="truncate">معاينة مجانية في الرياض والدمام — وفريق تركيب يصلك في نفس اليوم</span>
          </p>
          <div className="flex shrink-0 items-center gap-4">
            <span className="hidden items-center gap-1.5 text-paper/60 md:flex">
              <Icon name="clock" className="size-3.5" />
              {site.hours}
            </span>
            <a
              href={site.phoneHref}
              className="flex items-center gap-1.5 font-display font-medium text-brand-200 transition-colors hover:text-brand-100"
            >
              <Icon name="phone" className="size-3.5" />
              <span dir="ltr">{site.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sticky header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-ink-900/8 bg-paper/95 shadow-[0_18px_40px_-34px_rgba(6,18,15,0.55)] backdrop-blur-xl"
            : "border-b border-transparent bg-paper/60 backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex h-[4.4rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
          <a href="#home" aria-label="مؤسسة مريم للمكيفات — الرئيسية" className="shrink-0">
            <Logo />
          </a>

          <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  data-active={isActive}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "link-underline font-display text-[13.5px] font-medium transition-colors hover:text-ink-900",
                    isActive ? "text-ink-950" : "text-ink-800/65"
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonStyles("outline", "sm"), "hidden xl:inline-flex")}
            >
              <WhatsAppIcon className="size-4 text-[#1fa855]" />
              واتساب
            </a>
            <a href="#quote" className={cn(buttonStyles("primary", "sm"), "shine whitespace-nowrap px-4 sm:h-11 sm:px-6")}>
              <span className="hidden sm:inline">اطلب تركيب الآن</span>
              <span className="sm:hidden">عرض سعر</span>
              <Icon name="arrowLeft" className="hidden size-4 transition-transform duration-300 group-hover/btn:-translate-x-1 sm:block" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="فتح قائمة التنقل"
              className="grid size-11 place-items-center rounded-full border border-ink-900/12 bg-white/70 text-ink-900 backdrop-blur transition-colors hover:bg-white lg:hidden"
            >
              <Icon name="menu" className="size-5" />
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-ink-900/5">
          <div
            className="h-full origin-right bg-gradient-to-l from-brand-500 via-brand-400 to-ice-400 transition-[transform] duration-150 ease-out"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </header>

      {/* Mobile menu */}
      {open ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="قائمة التنقل"
          className="fixed inset-0 z-[80] flex flex-col bg-ink-950 text-paper lg:hidden"
        >
          <div className="mesh-dark absolute inset-0 opacity-90" aria-hidden="true" />
          <div className="relative flex h-full flex-col overflow-y-auto px-5 pb-8 pt-5">
            <div className="flex items-center justify-between">
              <Logo tone="dark" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="إغلاق القائمة"
                autoFocus
                className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-paper transition-colors hover:bg-white/10"
              >
                <Icon name="close" className="size-5" />
              </button>
            </div>

            <nav aria-label="التنقل في الجوال" className="mt-10 flex flex-col">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between border-b border-white/10 py-4 font-display text-xl font-medium text-paper/90 transition-colors hover:text-brand-300"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-display text-[11px] tracking-widest text-brand-400/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </span>
                  <Icon name="arrowLeft" className="size-5 -translate-x-1 text-paper/30 transition-all group-hover:translate-x-0 group-hover:text-brand-300" />
                </a>
              ))}
            </nav>

            <div className="mt-auto space-y-3 pt-8">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={cn(buttonStyles("mint", "md"), "w-full")}
              >
                <WhatsAppIcon className="size-4.5" />
                راسلنا واتساب
              </a>
              <a href="#quote" onClick={() => setOpen(false)} className={cn(buttonStyles("ghostDark", "md"), "w-full")}>
                اطلب عرض سعر مجاني
                <Icon name="arrowLeft" className="size-4" />
              </a>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-paper/60">
                <span className="flex items-center gap-2">
                  <Icon name="clock" className="size-3.5" />
                  {site.hours}
                </span>
                <a href={site.phoneHref} className="font-display font-medium text-brand-200" dir="ltr">
                  {site.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
