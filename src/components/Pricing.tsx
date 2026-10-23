import { useState } from "react";
import { pricing, type Plan } from "../data";
import { cn } from "../utils/cn";
import { Icon, Reveal, SectionHeading, buttonStyles } from "./ui";

type Mode = "install" | "maintenance";

function PriceCard({ plan, index }: { plan: Plan; index: number }) {
  const popular = Boolean(plan.popular);

  return (
    <Reveal delay={index * 90} className="h-full">
      <article
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border p-6 transition-all duration-500 hover:-translate-y-1.5 sm:p-7",
          popular
            ? "mesh-dark border-white/10 text-paper shadow-[0_40px_80px_-44px_rgba(6,18,15,.9)]"
            : "border-ink-900/8 bg-white/80 text-ink-900 shadow-soft backdrop-blur hover:border-brand-600/25 hover:shadow-lift"
        )}
      >
        {popular ? (
          <>
            <div aria-hidden="true" className="absolute -right-16 -top-20 size-52 rounded-full bg-brand-400/20 blur-[60px]" />
            <span className="absolute left-5 top-0 rounded-b-lg bg-brand-400 px-3 py-1.5 font-display text-[10px] font-bold text-ink-950">
              الأكثر طلباً
            </span>
          </>
        ) : null}

        <div className="relative">
          <h3 className={cn("font-display text-lg font-semibold", popular ? "text-paper" : "text-ink-950")}>{plan.name}</h3>
          <p className={cn("mt-1 text-[12px]", popular ? "text-paper/55" : "text-ink-700/60")}>{plan.tagline}</p>

          <div className="mt-5 flex items-end gap-2">
            <span className={cn("font-display text-[2.7rem] font-bold leading-none tracking-tight", popular ? "text-white" : "text-ink-950")}>
              {plan.price}
            </span>
            <span className={cn("pb-1 text-[12px] font-medium", popular ? "text-brand-200/85" : "text-ink-700/55")}>{plan.unit}</span>
          </div>

          <div className={cn("mt-4 h-px w-full", popular ? "bg-white/10" : "bg-ink-900/8")} />

          <ul className="mt-5 space-y-2.5">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <span
                  className={cn(
                    "mt-0.5 grid size-[1.1rem] shrink-0 place-items-center rounded-full",
                    popular ? "bg-brand-400/15 text-brand-300" : "bg-brand-500/12 text-brand-700"
                  )}
                >
                  <Icon name="check" className="size-2.5" strokeWidth={3.2} />
                </span>
                <span className={cn("text-[12.5px] leading-5.5", popular ? "text-paper/75" : "text-ink-800/75")}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mt-6 flex flex-1 flex-col justify-end">
          {plan.note ? (
            <p className={cn("mb-3 text-[10.5px] leading-5", popular ? "text-brand-200/70" : "text-ink-700/50")}>{plan.note}</p>
          ) : null}
          <a href="#quote" className={cn(buttonStyles(popular ? "mint" : "outline", "md"), "w-full")}>
            {plan.cta}
            <Icon name="arrowLeft" className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export default function Pricing() {
  const [mode, setMode] = useState<Mode>("install");
  const plans = pricing[mode];

  return (
    <section id="pricing" className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 size-[26rem] rounded-full bg-brand-100/60 blur-[100px]" />
        <div className="absolute -right-24 bottom-0 size-[22rem] rounded-full bg-ice-200/40 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="الأسعار"
            title={
              <>
                سعر واضح، وشغل
                <br className="hidden sm:block" /> <span className="text-gradient">يستاهل كل ريال.</span>
              </>
            }
            description="اختر الباقة اللي تناسبك — كل الأسعار تشمل الزيارة والفحص والفاتورة الضريبية، وبدون رسوم مخفية."
            className="mx-auto items-center"
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 flex flex-col items-center gap-3">
            <div
              role="group"
              aria-label="اختر نوع الخدمة لعرض الأسعار"
              className="relative flex items-center rounded-full border border-ink-900/10 bg-paper p-1.5 shadow-[inset_0_1px_2px_rgba(6,18,15,.04)]"
            >
              <button
                type="button"
                onClick={() => setMode("install")}
                aria-pressed={mode === "install"}
                className={cn(
                  "relative rounded-full px-5 py-2 font-display text-[12.5px] font-semibold transition-all duration-300 sm:px-6",
                  mode === "install" ? "bg-ink-900 text-white shadow-md" : "text-ink-800/60 hover:text-ink-900"
                )}
              >
                تركيب مكيفات
              </button>
              <button
                type="button"
                onClick={() => setMode("maintenance")}
                aria-pressed={mode === "maintenance"}
                className={cn(
                  "relative rounded-full px-5 py-2 font-display text-[12.5px] font-semibold transition-all duration-300 sm:px-6",
                  mode === "maintenance" ? "bg-ink-900 text-white shadow-md" : "text-ink-800/60 hover:text-ink-900"
                )}
              >
                صيانة وعقود
                <span className="ms-1.5 rounded-full bg-brand-500/15 px-1.5 py-0.5 text-[9px] font-bold text-brand-700">وفّر 16%</span>
              </button>
            </div>
            <p className="flex items-center gap-1.5 text-[11px] text-ink-700/50">
              <Icon name="shieldCheck" className="size-3.5 text-brand-600" />
              الأسعار شاملة ضريبة القيمة المضافة — المعاينة مجانية في الرياض والدمام
            </p>
          </div>
        </Reveal>

        <div key={mode} className="mt-10 grid items-stretch gap-4 sm:gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <PriceCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[1.3rem] border border-ink-900/8 bg-paper/70 px-5 py-4 sm:flex-row">
            <p className="flex items-start gap-2.5 text-center text-[12px] leading-6 text-ink-700/65 sm:text-start">
              <Icon name="sparkles" className="mt-0.5 size-4 shrink-0 text-brand-600" />
              <span>
                <span className="font-semibold text-ink-900">تحتاج عرض سعر لمشروع أكبر؟</span> نجهّز لك عرضاً مفصلاً للفلل والمجمعات والمنشآت
                التجارية — بدون رسوم على العرض.
              </span>
            </p>
            <a href="#quote" className={cn(buttonStyles("outline", "sm"), "shrink-0")}>
              اطلب عرضاً مخصصاً
              <Icon name="arrowLeft" className="size-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
