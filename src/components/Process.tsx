import { processSteps } from "../data";
import { Icon, Reveal, SectionHeading } from "./ui";

const promises = ["تأكيد الموعد قبل 24 ساعة", "فني معرّف بهوية المؤسسة", "تنظيف الموقع قبل المغادرة"];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-ink-900/10 to-transparent" />
        <div className="absolute -left-32 top-32 size-[24rem] rounded-full bg-ice-200/35 blur-[100px]" />
        <div className="absolute -right-24 bottom-10 size-[22rem] rounded-full bg-brand-100/50 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="طريقة العمل"
            title={
              <>
                من أول اتصال…
                <br className="hidden sm:block" /> <span className="text-gradient">إلى جوّ بارد.</span>
              </>
            }
            description="أربع خطوات واضحة، تعرف فيها وش يصير ومتى — بدون مفاجآت في السعر أو الموعد."
            className="mx-auto items-center"
          />
        </Reveal>

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute inset-x-[12%] top-[3.35rem] hidden h-px bg-[repeating-linear-gradient(to_left,rgba(11,145,116,.35)_0_10px,transparent_10px_20px)] lg:block"
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 110} className="h-full">
                <li className="group relative flex h-full flex-col rounded-[1.4rem] border border-ink-900/8 bg-paper/80 p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/25 hover:bg-white hover:shadow-lift sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl border border-brand-600/15 bg-brand-500/10 text-brand-700 transition-all duration-500 group-hover:border-transparent group-hover:bg-ink-900 group-hover:text-brand-300">
                      <Icon name={step.icon} className="size-5.5" />
                    </span>
                    <span className="font-display text-[2.4rem] font-bold leading-none text-ink-900/8 transition-colors duration-500 group-hover:text-brand-500/25">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[15.5px] font-semibold text-ink-950 sm:text-base">{step.title}</h3>
                  <p className="mt-2 flex-1 text-[12.5px] leading-6.5 text-ink-700/65">{step.description}</p>
                  <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-500/8 px-2.5 py-1 text-[10.5px] font-medium text-brand-800">
                    <Icon name="clock" className="size-3" />
                    {step.meta}
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-ink-900/8 bg-paper/60 px-5 py-4 sm:flex-row sm:gap-8">
            <p className="flex items-center gap-2 font-display text-[12px] font-semibold text-ink-900">
              <Icon name="shieldCheck" className="size-4 text-brand-600" />
              التزامنا في كل زيارة
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {promises.map((promise) => (
                <li key={promise} className="flex items-center gap-1.5 text-[11.5px] text-ink-700/70">
                  <Icon name="check" className="size-3 text-brand-600" strokeWidth={3} />
                  {promise}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
