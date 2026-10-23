import { useState } from "react";
import { faqs, site } from "../data";
import { cn } from "../utils/cn";
import { Icon, Reveal, SectionHeading, WhatsAppIcon, buttonStyles } from "./ui";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-24 size-[24rem] rounded-full bg-ice-200/30 blur-[100px]" />
        <div className="absolute -right-28 bottom-10 size-[22rem] rounded-full bg-brand-100/50 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <div>
            <Reveal>
              <SectionHeading
                align="start"
                eyebrow="الأسئلة الشائعة"
                title={
                  <>
                    أسئلة غالباً
                    <br className="hidden sm:block" /> <span className="text-gradient">تجي في بالك.</span>
                  </>
                }
                description="جمعنا لك أكثر ما يسألنا عنه العملاء قبل الحجز. إذا ما لقيت جوابك، فريقنا جاهز يساعدك."
              />
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-7 rounded-[1.4rem] border border-ink-900/8 bg-paper/80 p-5 shadow-soft backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="relative grid size-11 place-items-center rounded-2xl bg-ink-900 text-brand-300">
                    <span className="absolute inset-0 animate-pulse-ring rounded-2xl border border-brand-400/25" />
                    <Icon name="phone" className="relative size-5" />
                  </span>
                  <div>
                    <p className="font-display text-[13px] font-semibold text-ink-950">تحب تسأل فني مباشرة؟</p>
                    <p className="mt-0.5 text-[11px] text-ink-700/60">رد خلال 15 دقيقة في أوقات العمل</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className={cn(buttonStyles("primary", "sm"), "flex-1")}>
                    <WhatsAppIcon className="size-4 text-brand-300" />
                    واتساب مباشر
                  </a>
                  <a href={site.phoneHref} className={cn(buttonStyles("outline", "sm"), "flex-1")}>
                    <Icon name="phone" className="size-4" />
                    <span dir="ltr">{site.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="space-y-2.5">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={faq.q}
                    className={cn(
                      "overflow-hidden rounded-2xl border transition-all duration-300",
                      isOpen
                        ? "border-brand-600/25 bg-white shadow-[0_20px_50px_-36px_rgba(6,18,15,.6)]"
                        : "border-ink-900/8 bg-paper/60 hover:border-ink-900/15 hover:bg-white/80"
                    )}
                  >
                    <h3>
                      <button
                        type="button"
                        id={`faq-trigger-${index}`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-start sm:px-5"
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={cn(
                              "hidden font-display text-[10px] font-semibold tracking-wider sm:inline",
                              isOpen ? "text-brand-600" : "text-ink-900/25"
                            )}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className={cn("font-display text-[13px] font-semibold transition-colors sm:text-[13.5px]", isOpen ? "text-brand-800" : "text-ink-950")}>
                            {faq.q}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-300",
                            isOpen
                              ? "rotate-180 border-brand-600/20 bg-brand-500/12 text-brand-700"
                              : "border-ink-900/10 bg-white text-ink-800/60"
                          )}
                          aria-hidden="true"
                        >
                          <Icon name={isOpen ? "minus" : "plus"} className="size-3.5" strokeWidth={2.2} />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      className={cn(
                        "grid transition-all duration-500 ease-out",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="px-4 pb-4 pe-11 text-[12.5px] leading-7 text-ink-700/70 sm:px-5 sm:pb-5 sm:pe-12">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
