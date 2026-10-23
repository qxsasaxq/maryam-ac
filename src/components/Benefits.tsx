import type { CSSProperties } from "react";
import { areasByCity, benefits, comparison } from "../data";
import { cn } from "../utils/cn";
import { Icon, Reveal, SectionHeading, buttonStyles } from "./ui";

export default function Benefits() {
  return (
    <section id="why" className="relative overflow-hidden bg-paper py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-24 size-[28rem] rounded-full bg-brand-200/30 blur-[110px]" />
        <div className="absolute -left-32 bottom-10 size-[24rem] rounded-full bg-sand-200/40 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Visual */}
          <Reveal variant="scale" className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-[32rem]">
              <div aria-hidden="true" className="absolute -inset-3 rounded-[2.4rem] border border-brand-600/15" />
              <figure className="relative overflow-hidden rounded-[1.8rem] border border-white/70 bg-white/40 p-1.5 shadow-[0_40px_80px_-44px_rgba(6,18,15,.5)]">
                <img
                  src="/images/technician.jpg"
                  alt="فني تكييف من مؤسسة مريم يركّب مكيفاً سبليت بدقة في أحد منازل الرياض"
                  loading="lazy"
                  width={920}
                  height={1000}
                  className="aspect-[4/4.6] w-full rounded-[1.4rem] object-cover"
                />
                <div aria-hidden="true" className="absolute inset-1.5 rounded-[1.4rem] bg-gradient-to-t from-ink-950/65 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/20 bg-ink-950/45 px-4 py-3 backdrop-blur-xl">
                  <div>
                    <p className="font-display text-[12.5px] font-semibold text-white">فريق مريم للتركيب</p>
                    <p className="mt-0.5 text-[10.5px] text-white/60">فنيون معتمدون • أدوات معايرة • زي موحّد</p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-brand-400 px-2.5 py-1 text-[10px] font-semibold text-ink-950">
                    <Icon name="badgeCheck" className="size-3" />
                    معتمد
                  </span>
                </figcaption>
              </figure>

              <div className="glass absolute -left-3 top-6 flex items-center gap-3 rounded-2xl px-4 py-3 sm:-left-6">
                <span className="grid size-10 place-items-center rounded-xl bg-ink-900 text-brand-300">
                  <Icon name="users" className="size-5" />
                </span>
                <div>
                  <p className="font-display text-lg font-bold leading-none text-ink-950">12+</p>
                  <p className="mt-1 text-[10.5px] text-ink-700/65">سنة خبرة في السعودية</p>
                </div>
              </div>

              <div className="glass animate-floaty absolute -left-4 bottom-24 hidden items-center gap-2.5 rounded-2xl px-3.5 py-3 lg:flex xl:-left-6">
                <span className="grid size-9 place-items-center rounded-full bg-brand-500/15 text-brand-700">
                  <Icon name="thermometer" className="size-4.5" />
                </span>
                <div>
                  <p className="font-display text-[12px] font-semibold text-ink-950">كفاءة تبريد أعلى</p>
                  <p className="mt-0.5 text-[10px] text-ink-700/65">حتى 30% توفير بالطاقة</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <SectionHeading
                align="start"
                eyebrow="ليش مؤسسة مريم؟"
                title={
                  <>
                    شغل نظيف، وسعر
                    <br className="hidden sm:block" /> <span className="text-gradient">تعرفه قبل ما يبدأ.</span>
                  </>
                }
                description="الفرق مب بس في البرودة — الفرق في التفاصيل اللي تحمي بيتك وفلوسك على المدى الطويل."
              />
            </Reveal>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <Reveal key={benefit.title} delay={80 + index * 80} className="h-full">
                  <li className="group flex h-full gap-3.5 rounded-2xl border border-transparent p-2 transition-colors duration-300 hover:border-ink-900/8 hover:bg-white/60">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-brand-600/15 bg-white/80 text-brand-700 shadow-[0_8px_20px_-16px_rgba(6,18,15,.6)] transition-all duration-300 group-hover:bg-ink-900 group-hover:text-brand-300">
                      <Icon name={benefit.icon} className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-[13.5px] font-semibold text-ink-950">{benefit.title}</h3>
                      <p className="mt-1.5 text-[12px] leading-6 text-ink-700/65">{benefit.description}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200}>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a href="#quote" className={cn(buttonStyles("primary", "md"))}>
                  احجز معاينة مجانية
                  <Icon name="arrowLeft" className="size-4 transition-transform duration-300 group-hover/btn:-translate-x-1" />
                </a>
                <p className="text-[11.5px] leading-5 text-ink-700/55">
                  بدون التزام
                  <br />
                  وتقرير فحص مكتوب
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Comparison */}
        <Reveal delay={100}>
          <div className="mt-16 overflow-hidden rounded-[1.6rem] border border-ink-900/8 bg-white/75 shadow-soft backdrop-blur sm:mt-20">
            <div className="flex flex-col gap-4 border-b border-ink-900/8 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div>
                <h3 className="font-display text-base font-semibold text-ink-950 sm:text-lg">وش الفرق فعلياً؟</h3>
                <p className="mt-1 text-[12px] text-ink-700/60">نفس المكيف… تجربة مختلفة تماماً.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-3 py-1.5 text-[10.5px] font-semibold text-brand-200">
                  <Icon name="shieldCheck" className="size-3" />
                  مؤسسة مريم
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-paper px-3 py-1.5 text-[10.5px] font-medium text-ink-700/55">
                  عمالة عشوائية
                </span>
              </div>
            </div>
            <table className="w-full text-start">
              <caption className="sr-only">مقارنة بين خدمات مؤسسة مريم والعمالة العشوائية</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">البند</th>
                  <th scope="col">مؤسسة مريم</th>
                  <th scope="col">عمالة عشوائية</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, index) => (
                  <tr key={row.label} className={cn("border-t border-ink-900/6", index === 0 && "border-t-0")}>
                    <th scope="row" className="px-5 py-3 text-start text-[12px] font-medium text-ink-800/80 sm:px-7 sm:text-[12.5px]">
                      {row.label}
                    </th>
                    <td className="w-24 px-2 py-3 text-center sm:w-36">
                      <span className="inline-grid size-6 place-items-center rounded-full bg-brand-500/12 text-brand-700">
                        <Icon name="check" className="size-3.5" strokeWidth={3} />
                      </span>
                      <span className="sr-only">متوفر</span>
                    </td>
                    <td className="w-24 px-2 py-3 text-center sm:w-36">
                      <span className="inline-grid size-6 place-items-center rounded-full bg-ink-900/5 text-ink-900/25">
                        <Icon name="close" className="size-3" strokeWidth={2.5} />
                      </span>
                      <span className="sr-only">غير مضمون</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Coverage */}
        <Reveal delay={120}>
          <div className="mt-6 overflow-hidden rounded-[1.4rem] border border-ink-900/8 bg-white/50 px-5 py-5 backdrop-blur sm:px-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <p className="flex shrink-0 items-center gap-2 font-display text-[12px] font-semibold text-ink-950">
                <span className="grid size-8 place-items-center rounded-full bg-brand-500/12 text-brand-700">
                  <Icon name="mapPin" className="size-4" />
                </span>
                نغطي أحياء الرياض والدمام
              </p>
              <div className="marquee-wrap marquee-mask relative w-full overflow-hidden">
                <div className="marquee-track gap-2.5" style={{ "--marquee-duration": "52s" } as CSSProperties} dir="ltr">
                  {Object.entries(areasByCity).flatMap(([city, areas]) =>
                    areas.map((area, index) => (
                      <span
                        key={`${city}-${area}-${index}`}
                        className={cn(
                          "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px]",
                          index === 0
                            ? "border-brand-600/25 bg-brand-500/10 font-semibold text-brand-800"
                            : "border-ink-900/8 bg-white/80 text-ink-800/65"
                        )}
                      >
                        {index === 0 ? <Icon name="mapPin" className="size-3 text-brand-700" /> : null}
                        {index === 0 ? `${city} — ${area}` : area}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
