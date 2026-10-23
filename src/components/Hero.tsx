import { cn } from "../utils/cn";
import { site } from "../data";
import { Icon, Reveal, StarRating, WhatsAppIcon, buttonStyles } from "./ui";

const trustPoints = ["معاينة مجانية", "بدون رسوم خفية", "ضمان مكتوب"];

export default function Hero() {
  return (
    <section id="home" className="mesh-hero grain relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines absolute inset-0" />
        <div className="animate-drift absolute -right-24 top-10 size-[26rem] rounded-full bg-brand-300/25 blur-[90px]" />
        <div
          className="animate-drift absolute -left-24 top-40 size-[22rem] rounded-full bg-ice-300/30 blur-[90px]"
          style={{ animationDelay: "-8s" }}
        />
        <div className="absolute -bottom-24 right-1/3 size-[20rem] rounded-full bg-sand-200/50 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 xl:gap-16">
          {/* Copy */}
          <div className="relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-ink-900/10 bg-white/70 py-1.5 pe-4 ps-1.5 shadow-[0_10px_30px_-24px_rgba(6,18,15,.6)] backdrop-blur-md">
                <span className="grid size-7 place-items-center rounded-full bg-ink-900 text-brand-300">
                  <Icon name="snowflake" className="size-3.5" />
                </span>
                <span className="eyebrow text-ink-800/80">خدمات مكيفات موثوقة في الرياض والدمام</span>
                <span className="h-3 w-px bg-ink-900/15" aria-hidden="true" />
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-brand-700">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-brand-400" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-brand-500" />
                  </span>
                  متاحون اليوم
                </span>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="display-xl mt-6 text-ink-950">
                <span className="block">تركيب مكيّفات بدقّة،</span>
                <span className="text-gradient block">وراحة تدوم.</span>
              </h1>
            </Reveal>

            <Reveal delay={170}>
              <p className="mt-6 max-w-xl text-[15.5px] leading-8 text-ink-800/72 sm:text-[17px] sm:leading-9">
                من المعاينة والتمديد إلى التشغيل والتسليم — فريق <span className="font-semibold text-ink-900">مؤسسة مريم</span> يركّب
                مكيّفاتك بمعايير المصنع، بقطع أصلية وضمان مكتوب حتى 5 سنوات. تصلك الخدمة في نفس اليوم داخل الرياض والدمام.
              </p>
            </Reveal>

            <Reveal delay={250}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="#quote" className={cn(buttonStyles("primary", "lg"), "shine w-full sm:w-auto")}>
                  اطلب عرض سعر مجاني
                  <span className="grid size-7 place-items-center rounded-full bg-brand-400/20 text-brand-200 transition-transform duration-300 group-hover/btn:-translate-x-1">
                    <Icon name="arrowLeft" className="size-4" />
                  </span>
                </a>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonStyles("outline", "lg"), "w-full sm:w-auto")}
                >
                  <WhatsAppIcon className="size-5 text-[#1fa855]" />
                  راسلنا واتساب
                  <span className="text-[11px] font-normal text-ink-700/50">رد سريع</span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5">
                {trustPoints.map((point) => (
                  <li key={point} className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink-800/70">
                    <span className="grid size-4 place-items-center rounded-full bg-brand-500/12 text-brand-700">
                      <Icon name="check" className="size-2.5" strokeWidth={2.6} />
                    </span>
                    {point}
                  </li>
                ))}
                <li className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink-800/70">
                  <span className="grid size-4 place-items-center rounded-full bg-brand-500/12 text-brand-700">
                    <Icon name="check" className="size-2.5" strokeWidth={2.6} />
                  </span>
                  فاتورة ضريبية
                </li>
              </ul>
            </Reveal>

            <Reveal delay={390}>
              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-ink-900/8 pt-6">
                <div className="flex -space-x-2.5 space-x-reverse">
                  {[
                    { initials: "أ م", className: "from-brand-500 to-brand-700" },
                    { initials: "ن ح", className: "from-ice-400 to-brand-600" },
                    { initials: "س ع", className: "from-sand-300 to-sand-200 text-ink-800!" },
                    { initials: "م ر", className: "from-ink-600 to-ink-900" },
                  ].map((avatar) => (
                    <span
                      key={avatar.initials}
                      className={cn(
                        "grid size-9 place-items-center rounded-full bg-gradient-to-br text-[10px] font-semibold text-white ring-2 ring-paper",
                        avatar.className
                      )}
                    >
                      {avatar.initials}
                    </span>
                  ))}
                  <span className="grid size-9 place-items-center rounded-full bg-white text-[10px] font-semibold text-ink-800 ring-2 ring-paper">
                    +2k
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <StarRating rating={5} />
                    <span className="font-display text-[13px] font-semibold text-ink-950">4.9</span>
                  </div>
                  <p className="mt-1 text-[11.5px] text-ink-700/65">من 382 عميلاً وثّقوا تجربتهم في الرياض والدمام</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Visual */}
          <Reveal variant="scale" delay={160} className="relative">
            <div className="relative mx-auto max-w-[34rem] lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2.6rem] bg-gradient-to-tr from-brand-400/20 via-ice-300/20 to-transparent blur-2xl"
              />
              <svg
                aria-hidden="true"
                viewBox="0 0 400 400"
                className="animate-spin-slow absolute -right-10 -top-10 size-56 text-brand-600/20 sm:size-72"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              >
                <circle cx="200" cy="200" r="196" strokeDasharray="2 10" />
                <circle cx="200" cy="200" r="150" strokeDasharray="1 14" />
                <circle cx="200" cy="200" r="104" strokeDasharray="2 8" />
              </svg>

              <figure className="relative overflow-hidden rounded-[1.8rem] border border-white/70 bg-white/40 p-1.5 shadow-[0_40px_90px_-40px_rgba(6,18,15,.45)] backdrop-blur-sm sm:rounded-[2.2rem]">
                <div className="relative overflow-hidden rounded-[1.45rem] sm:rounded-[1.8rem]">
                  <img
                    src="/images/hero-living.jpg"
                    alt="مجلس حديث في الرياض بعد تركيب مكيف سبليت أنيق على الجدار"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.03] sm:aspect-[5/5.4]"
                    width={880}
                    height={980}
                    fetchPriority="high"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />

                  <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2 sm:inset-x-4 sm:top-4">
                    <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5">
                      <span className="grid size-5 place-items-center rounded-full bg-brand-500 text-white">
                        <Icon name="check" className="size-3" strokeWidth={3} />
                      </span>
                      <span className="text-[10.5px] font-semibold text-ink-900 sm:text-[11.5px]">تم التركيب بنجاح</span>
                    </div>
                    <div className="glass animate-floaty-soft flex items-center gap-2 rounded-2xl px-3 py-2">
                      <Icon name="thermometer" className="size-4 text-brand-700" />
                      <span className="font-display text-sm font-semibold text-ink-950" dir="ltr">
                        22°
                      </span>
                      <span className="hidden text-[10px] text-ink-700/60 sm:inline">تبريد مثالي</span>
                    </div>
                  </div>

                  <figcaption className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                    <div className="flex items-end justify-between gap-3 rounded-[1.1rem] border border-white/15 bg-ink-950/55 px-3.5 py-3 backdrop-blur-xl sm:px-4">
                      <div>
                        <p className="text-[10px] font-medium tracking-wide text-brand-200/90 sm:text-[11px]">أحدث أعمالنا</p>
                        <p className="mt-0.5 font-display text-[13px] font-semibold text-white sm:text-[15px]">
                          مجلس فيلا — حي الياسمين
                        </p>
                      </div>
                      <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-white/80">
                        <Icon name="mapPin" className="size-3 text-brand-300" />
                        الرياض
                      </span>
                    </div>
                  </figcaption>
                </div>
              </figure>

              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:gap-3">
                <div className="glass flex items-center gap-2.5 rounded-2xl px-3.5 py-3 sm:gap-3 sm:px-4">
                  <span className="relative grid size-8 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-700 sm:size-9">
                    <span className="absolute inset-0 animate-pulse-ring rounded-full border border-brand-500/30" />
                    <Icon name="shieldCheck" className="relative size-4 sm:size-4.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[11.5px] font-semibold text-ink-950 sm:text-[12px]">ضمان مكتوب</p>
                    <p className="mt-0.5 truncate text-[9.5px] text-ink-700/65 sm:text-[10px]">حتى 5 سنوات على التركيب</p>
                  </div>
                </div>

                <div className="glass flex items-center gap-2.5 rounded-2xl px-3.5 py-3 sm:gap-3 sm:px-4">
                  <div className="flex h-9 shrink-0 items-end gap-0.5" aria-hidden="true">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className="w-1 rounded-full bg-gradient-to-t from-brand-500 to-ice-400"
                        style={{
                          height: `${10 + i * 4}px`,
                          animation: `bar-breathe ${1.8 + i * 0.3}s ease-in-out ${i * 0.15}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-[11.5px] font-semibold text-ink-950 sm:text-[12px]">هواء أنقى</p>
                    <p className="mt-0.5 truncate text-[9.5px] text-ink-700/65 sm:text-[10px]">كفاءة تبريد 100%</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
