import { useEffect, useState } from "react";
import { gallery, galleryFilters, type GalleryItem } from "../data";
import { cn } from "../utils/cn";
import { Icon, Reveal, SectionHeading, buttonStyles } from "./ui";

type Filter = (typeof galleryFilters)[number];

export default function Showcase() {
  const [filter, setFilter] = useState<Filter>("الكل");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const items = filter === "الكل" ? gallery : gallery.filter((item) => item.category === filter);

  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="work" className="mesh-dark relative overflow-hidden py-20 text-paper sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines-dark absolute inset-0" />
        <div className="animate-drift absolute -right-24 top-0 size-[26rem] rounded-full bg-brand-500/15 blur-[100px]" />
        <div className="absolute -left-20 bottom-0 size-[22rem] rounded-full bg-ice-500/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              tone="dark"
              align="start"
              eyebrow="أعمالنا"
              title={
                <>
                  تركيبات تتكلّم
                  <br className="hidden sm:block" /> <span className="text-gradient-light">عن نفسها.</span>
                </>
              }
              description="نماذج حقيقية من فلل وشقق ومكاتب في الرياض والدمام — مواقع نظيفة، تمديدات مخفية، وتفاصيل تُحسب قبل ما تبدأ."
              className="max-w-2xl"
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-400/15 text-brand-300">
                <Icon name="building" className="size-5" />
              </span>
              <div>
                <p className="font-display text-[13px] font-semibold">+2,400 مشروع في الرياض والدمام</p>
                <p className="mt-0.5 text-[11px] text-paper/50">فلل • شقق • مكاتب • مجمعات</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="mt-9 flex flex-wrap items-center gap-2" role="group" aria-label="تصفية الأعمال حسب نوع العقار">
            {galleryFilters.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
                className={cn(
                  "rounded-full border px-4 py-2 font-display text-[12.5px] font-medium transition-all duration-300",
                  filter === category
                    ? "border-brand-400/60 bg-brand-400 text-ink-950 shadow-[0_10px_24px_-14px_rgba(56,205,166,.8)]"
                    : "border-white/12 bg-white/5 text-paper/65 hover:border-white/25 hover:bg-white/10 hover:text-paper"
                )}
              >
                {category}
              </button>
            ))}
            <p className="ms-auto hidden text-[11.5px] text-paper/40 sm:block" aria-live="polite">
              {items.length} {items.length === 1 ? "مشروع" : "مشاريع"} معروضة
            </p>
          </div>
        </Reveal>

        <div key={filter} className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 80} variant="scale">
              <button
                type="button"
                onClick={() => setActive(item)}
                className="group relative block w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] text-start transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_40px_80px_-40px_rgba(0,0,0,.9)]"
                aria-label={`عرض تفاصيل مشروع ${item.title} — ${item.location}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    width={960}
                    height={600}
                    className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-ink-950/10" />
                  <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-ink-950/45 px-3 py-1 text-[10.5px] font-medium text-paper/85 backdrop-blur-md">
                    {item.category}
                  </span>
                  <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-950/45 px-3 py-1 text-[10.5px] text-paper/80 backdrop-blur-md">
                    <Icon name="calendar" className="size-3 text-brand-300" />
                    {item.meta}
                  </span>
                </div>
                <div className="px-5 pb-5 pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 text-[11px] font-medium text-brand-300">
                        <Icon name="mapPin" className="size-3" />
                        {item.location}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-semibold sm:text-xl">{item.title}</h3>
                      <p className="mt-1.5 text-[12.5px] leading-6 text-paper/55">{item.scope}</p>
                    </div>
                    <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/8 text-paper transition-all duration-300 group-hover:border-brand-400/60 group-hover:bg-brand-400 group-hover:text-ink-950">
                      <Icon name="arrowLeft" className="size-4" />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[1.3rem] border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur sm:flex-row">
            <p className="text-center text-[12.5px] text-paper/60 sm:text-start">
              تبغى نتيجة مثل هذي في بيتك؟ نبدأ بمعاينة مجانية وتصميم حل يناسب مساحتك.
            </p>
            <a href="#quote" className={cn(buttonStyles("mint", "sm"), "shrink-0 px-5")}>
              اطلب معاينة مجانية
              <Icon name="arrowLeft" className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>

      {/* Project modal */}
      {active ? (
        <div className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <button
            type="button"
            aria-label="إغلاق نافذة تفاصيل المشروع"
            onClick={() => setActive(null)}
            className="absolute inset-0 cursor-default bg-ink-950/75 backdrop-blur-md"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[1.8rem] border border-white/12 bg-paper text-ink-900 shadow-2xl sm:rounded-[1.8rem]"
          >
            <div className="relative">
              <img src={active.image} alt={active.alt} className="aspect-[16/9] w-full object-cover" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
              <button
                type="button"
                onClick={() => setActive(null)}
                autoFocus
                aria-label="إغلاق"
                className="absolute left-4 top-4 grid size-10 place-items-center rounded-full border border-white/20 bg-ink-950/50 text-white backdrop-blur transition-colors hover:bg-ink-950/80"
              >
                <Icon name="close" className="size-4.5" />
              </button>
              <div className="absolute bottom-4 right-5 left-5">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10.5px] text-white/85 backdrop-blur">
                  {active.category}
                </span>
                <h3 id="project-title" className="mt-2.5 font-display text-2xl font-bold text-white">
                  {active.title}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-[12px] text-white/70">
                  <Icon name="mapPin" className="size-3.5 text-brand-300" />
                  {active.location} • {active.meta}
                </p>
              </div>
            </div>
            <div className="p-5 sm:p-7">
              <p className="text-[13.5px] leading-7 text-ink-700/75">{active.description}</p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {active.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-2 rounded-xl border border-ink-900/8 bg-white/70 px-3 py-2.5 text-[12px] text-ink-800/80">
                    <span className="grid size-4.5 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-700">
                      <Icon name="check" className="size-2.5" strokeWidth={3} />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <a href="#quote" onClick={() => setActive(null)} className={cn(buttonStyles("primary", "md"), "flex-1")}>
                  اطلب مشروعاً مشابهاً
                  <Icon name="arrowLeft" className="size-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className={cn(buttonStyles("outline", "md"), "flex-1")}
                >
                  إغلاق المعرض
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
