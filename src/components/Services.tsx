import { services } from "../data";
import { Icon, Reveal, SectionHeading, WhatsAppIcon, buttonStyles } from "./ui";
import { site } from "../data";
import { cn } from "../utils/cn";

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-paper py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 size-[26rem] rounded-full bg-brand-200/25 blur-[100px]" />
        <div className="absolute -right-32 bottom-0 size-[22rem] rounded-full bg-ice-200/40 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionHeading
              align="start"
              eyebrow="خدماتنا"
              title={
                <>
                  كل ما يحتاجه مكيّفك،
                  <br className="hidden sm:block" /> <span className="text-gradient">تحت سقف واحد.</span>
                </>
              }
              description="من أول قياس لمسار النحاس إلى آخر اختبار تبريد — فريق واحد، مسؤولية واحدة، وسعر واضح تعرفه قبل بدء العمل."
              className="max-w-2xl"
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="flex items-center gap-3 rounded-2xl border border-ink-900/8 bg-white/70 p-3.5 pe-5 shadow-soft backdrop-blur">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-500/12 text-brand-700">
                <Icon name="sliders" className="size-5" />
              </span>
              <div>
                <p className="font-display text-[13px] font-semibold text-ink-950">مو متأكد أي خدمة تحتاج؟</p>
                <a href="#quote" className="mt-0.5 inline-flex items-center gap-1 text-[11.5px] font-medium text-brand-700 transition-colors hover:text-brand-800">
                  خلّنا نساعدك في الاختيار
                  <Icon name="arrowLeft" className="size-3" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 70} className="h-full">
              <article
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border p-6 transition-all duration-500 hover:-translate-y-1.5 sm:p-7",
                  service.featured
                    ? "border-brand-600/25 bg-gradient-to-br from-white via-brand-50/60 to-brand-100/40 shadow-[0_24px_60px_-40px_rgba(11,145,116,.55)]"
                    : "border-ink-900/8 bg-white/70 shadow-soft hover:border-brand-600/25 hover:shadow-lift"
                )}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-16 -top-16 size-40 rounded-full bg-brand-300/0 blur-2xl transition-all duration-700 group-hover:bg-brand-300/30"
                />
                <div className="relative flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-2xl transition-all duration-500 group-hover:scale-105",
                      service.featured
                        ? "bg-ink-900 text-brand-300 shadow-[0_14px_30px_-16px_rgba(6,18,15,.8)]"
                        : "bg-brand-500/10 text-brand-700 group-hover:bg-brand-500 group-hover:text-white"
                    )}
                  >
                    <Icon name={service.icon} className="size-6" />
                  </span>
                  {service.featured ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-brand-600/20 bg-white/80 px-2.5 py-1 text-[10px] font-semibold text-brand-800">
                      <Icon name="sparkles" className="size-3" />
                      الأكثر طلباً
                    </span>
                  ) : null}
                </div>

                <h3 className="relative mt-5 font-display text-[17px] font-semibold text-ink-950 sm:text-lg">{service.title}</h3>
                <p className="relative mt-2.5 flex-1 text-[13.5px] leading-7 text-ink-700/70">{service.description}</p>

                <div className="relative mt-5 flex items-center justify-between gap-3 border-t border-ink-900/8 pt-4">
                  <span className="font-display text-[12.5px] font-semibold text-ink-900">{service.price}</span>
                  <a
                    href="#quote"
                    aria-label={`اطلب ${service.title}`}
                    className="inline-flex items-center gap-1 text-[12px] font-medium text-brand-700 transition-colors hover:text-brand-900"
                  >
                    احجز الخدمة
                    <Icon name="arrowLeft" className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="relative mt-5 overflow-hidden rounded-[1.4rem] border border-white/10 bg-ink-950 p-6 text-paper sm:p-8">
            <div aria-hidden="true" className="mesh-dark absolute inset-0 opacity-90" />
            <div aria-hidden="true" className="absolute -left-10 -top-16 size-56 rounded-full bg-brand-400/20 blur-[70px]" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/8 text-brand-300">
                  <span className="absolute inset-0 animate-pulse-ring rounded-2xl border border-brand-400/25" />
                  <Icon name="zap" className="relative size-5.5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold sm:text-lg">عندك مكيف طفى أو يقطّر؟ خدمة عاجلة خلال 90 دقيقة.</h3>
                  <p className="mt-1 text-[12.5px] leading-6 text-paper/60">
                    فريق طوارئ في الرياض والدمام — السبت إلى الخميس حتى 10 مساءً. اتصل أو أرسل موقعك على واتساب.
                  </p>
                </div>
              </div>
              <div className="flex w-full shrink-0 items-center gap-2.5 sm:w-auto">
                <a href={site.phoneHref} className={cn(buttonStyles("mint", "md"), "flex-1 sm:flex-none")}>
                  <Icon name="phone" className="size-4" />
                  اتصل الآن
                </a>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="تواصل معنا عبر واتساب"
                  className="grid size-12 shrink-0 place-items-center rounded-full border border-white/20 bg-white/8 text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                >
                  <WhatsAppIcon className="size-5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
