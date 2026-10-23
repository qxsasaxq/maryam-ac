import { useRef } from "react";
import { testimonials } from "../data";
import { cn } from "../utils/cn";
import { Icon, Reveal, SectionHeading, StarRating } from "./ui";

const avatarStyles = [
  "from-brand-500 to-brand-700",
  "from-ice-400 to-brand-600",
  "from-ink-600 to-ink-900",
  "from-sand-300 to-sand-200",
  "from-brand-300 to-ice-500",
];

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "next" | "prev") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.86;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction === "next" ? -amount : amount, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section id="testimonials" className="relative overflow-hidden bg-paper py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-0 size-[26rem] rounded-full bg-brand-200/30 blur-[110px]" />
        <div className="absolute -left-24 bottom-0 size-[22rem] rounded-full bg-sand-200/45 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              align="start"
              eyebrow="آراء العملاء"
              title={
                <>
                  ناس جرّبونا…
                  <br className="hidden sm:block" /> <span className="text-gradient">ورجّعونا لأهلهم.</span>
                </>
              }
              description="382 تقييماً من عملاء في الرياض والدمام — أغلبهم وصلونا بتوصية من جار أو صاحب."
              className="max-w-2xl"
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="flex items-center gap-4">
              <div className="rounded-2xl border border-ink-900/8 bg-white/75 px-4 py-3 shadow-soft backdrop-blur">
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl font-bold text-ink-950">4.9</span>
                  <div>
                    <StarRating rating={5} />
                    <p className="mt-1 text-[10px] text-ink-700/55">من 5 نجوم</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scroll("prev")}
                  aria-label="عرض الآراء السابقة"
                  className="grid size-11 place-items-center rounded-full border border-ink-900/12 bg-white/75 text-ink-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-600/40 hover:bg-white"
                >
                  <Icon name="arrowLeft" className="size-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll("next")}
                  aria-label="عرض المزيد من الآراء"
                  className="grid size-11 place-items-center rounded-full bg-ink-900 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-800"
                >
                  <Icon name="arrowLeft" className="size-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160} variant="scale">
          <div
            ref={trackRef}
            tabIndex={0}
            role="region"
            aria-label="آراء عملاء مؤسسة مريم — استخدم الأسهم أو اسحب للتنقل"
            className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 focus-visible:outline-offset-8"
          >
            {testimonials.map((testimonial, index) => (
              <figure
                key={testimonial.name}
                className="group flex w-[86%] shrink-0 snap-start flex-col rounded-[1.4rem] border border-ink-900/8 bg-white/80 p-5 shadow-soft backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-brand-600/25 hover:shadow-lift sm:w-[47.5%] sm:p-6 lg:w-[32%]"
              >
                <div className="flex items-start justify-between gap-3">
                  <Icon name="quote" className="size-7 text-brand-500/25 transition-colors duration-300 group-hover:text-brand-500/45" />
                  <StarRating rating={testimonial.rating} />
                </div>
                <blockquote className="mt-3 flex-1 text-[13px] leading-7 text-ink-800/80">"{testimonial.quote}"</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-900/8 pt-4">
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br text-[10.5px] font-semibold ring-2 ring-white",
                      avatarStyles[index % avatarStyles.length],
                      testimonial.initials === "س د" ? "text-ink-800" : "text-white"
                    )}
                  >
                    {testimonial.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 font-display text-[12.5px] font-semibold text-ink-950">
                      {testimonial.name}
                      <Icon name="badgeCheck" className="size-3.5 text-brand-600" />
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-[10.5px] text-ink-700/55">
                      <Icon name="mapPin" className="size-3" />
                      {testimonial.area}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-brand-500/8 px-2 py-1 text-[9.5px] font-medium text-brand-800">
                    {testimonial.service}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-5 flex items-center justify-center gap-2 text-center text-[11px] text-ink-700/50">
            <Icon name="shieldCheck" className="size-3.5 text-brand-600" />
            جميع التقييمات من عملاء أكملوا خدمة فعلية مع المؤسسة وتم التحقق منها
          </p>
        </Reveal>
      </div>
    </section>
  );
}
