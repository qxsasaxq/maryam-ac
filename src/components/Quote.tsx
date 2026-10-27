import { useState, type FormEvent } from "react";
import { areasByCity, serviceOptions, site } from "../data";
import { cn } from "../utils/cn";
import { Icon, Reveal, WhatsAppIcon, buttonStyles } from "./ui";
import { trackLead } from "../utils/analytics";

type Fields = { name: string; phone: string; city: string; service: string; area: string; notes: string };
type Errors = Partial<Record<keyof Fields, string>>;

const initialFields: Fields = { name: "", phone: "", city: "", service: "", area: "", notes: "" };
const cities = Object.keys(areasByCity);

const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

function normalizePhone(value: string) {
  return value
    .split("")
    .map((char) => {
      const arabicIndex = arabicDigits.indexOf(char);
      if (arabicIndex > -1) return String(arabicIndex);
      const persianIndex = persianDigits.indexOf(char);
      if (persianIndex > -1) return String(persianIndex);
      return char;
    })
    .join("")
    .replace(/[\s\-()]/g, "")
    .replace(/^\+/, "");
}

const benefits = ["رد خلال 15 دقيقة", "معاينة مجانية", "بدون رسوم خفية", "فاتورة ضريبية"];

const trustChips = ["بدون التزام", "بدون دفعة مقدمة", "ضمان مكتوب"];

export default function Quote() {
  const [fields, setFields] = useState<Fields>(initialFields);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [reference, setReference] = useState("");

  const update = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const chooseCity = (city: string) => {
    setFields((current) => ({ ...current, city, area: "" }));
    setErrors((current) => {
      const next = { ...current };
      delete next.city;
      delete next.area;
      return next;
    });
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (fields.name.trim().length < 2) next.name = "اكتب اسمك الكامل (حرفان على الأقل).";
    if (!/^(?:05\d{8}|5\d{8}|9665\d{8})$/.test(normalizePhone(fields.phone))) {
      next.phone = "أدخل رقم جوال سعودي صحيح، مثل 0567562010.";
    }
    if (!fields.city) next.city = "اختر مدينة الخدمة.";
    if (!fields.service) next.service = "اختر نوع الخدمة المطلوبة.";
    if (!fields.area) next.area = "اختر الحي لتحديد أقرب فريق لك.";
    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validate();
    setErrors(validation);
    const firstError = Object.keys(validation)[0];
    if (firstError) {
      document.getElementById(`field-${firstError}`)?.focus();
      return;
    }
    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 750));
    setReference(`MR-${String(10000 + (Date.now() % 89999))}`);
    setStatus("success");
    trackLead({ service: fields.service, city: fields.city });
  };

  const successWhatsApp =
    `https://wa.me/${site.whatsappNumber}?text=` +
    encodeURIComponent(
      `السلام عليكم، أرسلت طلب تركيب رقم ${reference}. الاسم: ${fields.name} — الخدمة: ${fields.service} — ${fields.city}، حي ${fields.area}.`
    );

  const inputBase =
    "h-12 w-full rounded-xl border bg-white px-3.5 text-[13px] text-ink-950 placeholder:text-ink-700/35 transition-all duration-200 focus:outline-none focus:ring-4";
  const okBorder = "border-ink-900/12 focus:border-brand-500 focus:ring-brand-500/12";
  const errBorder = "border-red-400/80 focus:border-red-500 focus:ring-red-500/10";

  return (
    <section id="quote" className="mesh-dark relative overflow-hidden py-20 text-paper sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines-dark absolute inset-0" />
        <div className="animate-drift absolute -right-20 top-10 size-[28rem] rounded-full bg-brand-500/20 blur-[110px]" />
        <div className="absolute -left-24 bottom-0 size-[24rem] rounded-full bg-ice-500/12 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          {/* Copy */}
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text-brand-200 backdrop-blur">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-brand-300" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-brand-300" />
                </span>
                اطلب تركيبك الآن
              </span>
              <h2 className="display-lg mt-5 text-balance text-paper">
                خلّنا نبرّد يومك،
                <br />
                <span className="text-gradient-light">بخطوة واحدة.</span>
              </h2>
              <p className="mt-4 max-w-lg text-[14px] leading-8 text-paper/65 sm:text-[15px]">
                املأ النموذج ويصلك عرض سعر واضح خلال دقائق. ما نطلب دفعة مقدمة، والمعاينة مجانية في الرياض والدمام — وقرار التركيب يبقى بيدك.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <ul className="mt-6 grid grid-cols-2 gap-2.5">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[11.5px] text-paper/75 backdrop-blur-sm">
                    <span className="grid size-4 shrink-0 place-items-center rounded-full bg-brand-400/15 text-brand-300">
                      <Icon name="check" className="size-2.5" strokeWidth={3} />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                <a
                  href={site.phoneHref}
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/40 hover:bg-white/[0.08]"
                >
                  <span className="grid size-9 place-items-center rounded-xl bg-brand-400/15 text-brand-300">
                    <Icon name="phone" className="size-4.5" />
                  </span>
                  <div>
                    <p className="text-[10px] text-paper/45">اتصل بنا مباشرة</p>
                    <p className="mt-0.5 font-display text-[13px] font-semibold text-paper" dir="ltr">
                      {site.phoneDisplay}
                    </p>
                  </div>
                </a>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/40 hover:bg-white/[0.08]"
                >
                  <span className="grid size-9 place-items-center rounded-xl bg-[#25d366]/15 text-[#4be08a]">
                    <WhatsAppIcon className="size-4.5" />
                  </span>
                  <div>
                    <p className="text-[10px] text-paper/45">واتساب سريع</p>
                    <p className="mt-0.5 font-display text-[13px] font-semibold text-paper">ابدأ محادثة</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5">
                  <span className="grid size-9 place-items-center rounded-xl bg-white/8 text-brand-300">
                    <Icon name="clock" className="size-4.5" />
                  </span>
                  <div>
                    <p className="text-[10px] text-paper/45">أوقات العمل</p>
                    <p className="mt-0.5 text-[11.5px] font-medium text-paper/80">{site.hours}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5">
                  <span className="grid size-9 place-items-center rounded-xl bg-white/8 text-brand-300">
                    <Icon name="mapPin" className="size-4.5" />
                  </span>
                  <div>
                    <p className="text-[10px] text-paper/45">نطاق الخدمة</p>
                    <p className="mt-0.5 text-[11.5px] font-medium text-paper/80">أحياء الرياض والدمام</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {trustChips.map((chip) => (
                  <span key={chip} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-paper/50">
                    {chip}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Form card */}
          <Reveal delay={120} variant="scale">
            <div className="relative overflow-hidden rounded-[1.7rem] border border-white/60 bg-paper p-5 text-ink-900 shadow-[0_50px_100px_-40px_rgba(0,0,0,.7)] sm:p-7">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-brand-500 via-brand-400 to-ice-400" />
              <div aria-hidden="true" className="absolute -left-16 -top-20 size-48 rounded-full bg-brand-300/25 blur-[60px]" />

              {status === "success" ? (
                <div className="relative flex min-h-[28rem] flex-col items-center justify-center text-center" aria-live="polite">
                  <span className="relative grid size-16 place-items-center rounded-full bg-brand-500/12 text-brand-700">
                    <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-brand-500/30" />
                    <Icon name="check" className="relative size-8" strokeWidth={2.4} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink-950 sm:text-2xl">وصلنا طلبك يا {fields.name.split(" ")[0]}!</h3>
                  <p className="mt-2 max-w-sm text-[12.5px] leading-7 text-ink-700/70">
                    فريق مؤسسة مريم بيتواصل معك خلال 15 دقيقة في أوقات العمل لتأكيد التفاصيل وإرسال عرض السعر.
                  </p>

                  <div className="mt-5 w-full max-w-sm rounded-2xl border border-ink-900/8 bg-white/80 p-4 text-start">
                    <dl className="space-y-2 text-[11.5px]">
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-ink-700/55">رقم الطلب</dt>
                        <dd className="font-display font-semibold text-ink-950" dir="ltr">{reference}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-ink-700/55">الخدمة</dt>
                        <dd className="font-medium text-ink-900">{fields.service}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-ink-700/55">المدينة</dt>
                        <dd className="font-medium text-ink-900">{fields.city}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-ink-700/55">الحي</dt>
                        <dd className="font-medium text-ink-900">{fields.area}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-ink-700/55">الجوال</dt>
                        <dd className="font-medium text-ink-900" dir="ltr">{fields.phone}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-5 flex w-full max-w-sm flex-col gap-2 sm:flex-row">
                    <a href={successWhatsApp} target="_blank" rel="noopener noreferrer" className={cn(buttonStyles("primary", "md"), "flex-1")}>
                      <WhatsAppIcon className="size-4 text-brand-300" />
                      تابع على واتساب
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setFields(initialFields);
                        setErrors({});
                        setStatus("idle");
                      }}
                      className={cn(buttonStyles("outline", "md"), "flex-1")}
                    >
                      طلب جديد
                    </button>
                  </div>
                  <p className="mt-3 text-[10px] text-ink-700/45">بياناتك تُستخدم للتواصل بخصوص طلبك فقط.</p>
                </div>
              ) : (
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink-950 sm:text-xl">اطلب عرض سعر مجاني</h3>
                      <p className="mt-1 text-[11.5px] text-ink-700/60">املأ البيانات ويصلك رد سريع — معظم الطلبات تُخدم في نفس اليوم.</p>
                    </div>
                    <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-brand-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-brand-800 sm:flex">
                      <Icon name="sparkles" className="size-3" />
                      خطوة واحدة
                    </span>
                  </div>

                  <form className="mt-5" onSubmit={onSubmit} noValidate>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="field-name" className="mb-1.5 block text-[11.5px] font-semibold text-ink-900">
                          الاسم الكامل <span className="text-brand-600">*</span>
                        </label>
                        <input
                          id="field-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="مثال: عبدالله العتيبي"
                          value={fields.name}
                          onChange={(event) => update("name", event.target.value)}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? "error-name" : undefined}
                          className={cn(inputBase, errors.name ? errBorder : okBorder)}
                        />
                        {errors.name ? (
                          <p id="error-name" role="alert" className="mt-1.5 text-[10.5px] font-medium text-red-600">{errors.name}</p>
                        ) : null}
                      </div>

                      <div>
                        <label htmlFor="field-phone" className="mb-1.5 block text-[11.5px] font-semibold text-ink-900">
                          رقم الجوال <span className="text-brand-600">*</span>
                        </label>
                        <input
                          id="field-phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          dir="ltr"
                          placeholder="05XXXXXXXX"
                          value={fields.phone}
                          onChange={(event) => update("phone", event.target.value)}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? "error-phone" : undefined}
                          className={cn(inputBase, "text-start", errors.phone ? errBorder : okBorder)}
                        />
                        {errors.phone ? (
                          <p id="error-phone" role="alert" className="mt-1.5 text-[10.5px] font-medium text-red-600">{errors.phone}</p>
                        ) : null}
                      </div>

                      <div>
                        <span className="mb-1.5 block text-[11.5px] font-semibold text-ink-900">
                          مدينة الخدمة <span className="text-brand-600">*</span>
                        </span>
                        <div
                          id="field-city"
                          role="radiogroup"
                          aria-label="مدينة الخدمة"
                          tabIndex={-1}
                          aria-invalid={Boolean(errors.city)}
                          aria-describedby={errors.city ? "error-city" : undefined}
                          className={cn(
                            "flex h-12 items-center gap-1 rounded-xl border bg-white p-1",
                            errors.city ? "border-red-400/80" : "border-ink-900/12"
                          )}
                        >
                          {cities.map((city) => {
                            const selected = fields.city === city;
                            return (
                              <button
                                key={city}
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                onClick={() => chooseCity(city)}
                                className={cn(
                                  "flex h-full flex-1 items-center justify-center gap-1.5 rounded-lg font-display text-[12.5px] font-semibold transition-all duration-300",
                                  selected
                                    ? "bg-ink-900 text-white shadow-[0_8px_18px_-12px_rgba(6,18,15,.9)]"
                                    : "text-ink-800/60 hover:bg-paper hover:text-ink-900"
                                )}
                              >
                                <Icon name="mapPin" className={cn("size-3.5", selected ? "text-brand-300" : "text-brand-600/70")} />
                                {city}
                              </button>
                            );
                          })}
                        </div>
                        {errors.city ? (
                          <p id="error-city" role="alert" className="mt-1.5 text-[10.5px] font-medium text-red-600">{errors.city}</p>
                        ) : null}
                      </div>

                      <div>
                        <label htmlFor="field-area" className="mb-1.5 block text-[11.5px] font-semibold text-ink-900">
                          الحي {fields.city ? `في ${fields.city}` : ""} <span className="text-brand-600">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="field-area"
                            name="area"
                            value={fields.area}
                            onChange={(event) => update("area", event.target.value)}
                            disabled={!fields.city}
                            aria-invalid={Boolean(errors.area)}
                            aria-describedby={errors.area ? "error-area" : undefined}
                            className={cn(
                              inputBase,
                              "appearance-none pe-9 disabled:cursor-not-allowed disabled:bg-paper disabled:text-ink-700/40",
                              fields.area ? "text-ink-950" : "text-ink-700/45",
                              errors.area ? errBorder : okBorder
                            )}
                          >
                            <option value="" disabled>{fields.city ? "اختر الحي" : "اختر المدينة أولاً"}</option>
                            {(areasByCity[fields.city] ?? []).map((area) => (
                              <option key={area} value={area}>{area}</option>
                            ))}
                            {fields.city ? <option value="حي آخر">حي آخر</option> : null}
                          </select>
                          <Icon name="chevronDown" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-700/40" />
                        </div>
                        {errors.area ? (
                          <p id="error-area" role="alert" className="mt-1.5 text-[10.5px] font-medium text-red-600">{errors.area}</p>
                        ) : null}
                      </div>

                      <div>
                        <label htmlFor="field-service" className="mb-1.5 block text-[11.5px] font-semibold text-ink-900">
                          الخدمة المطلوبة <span className="text-brand-600">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="field-service"
                            name="service"
                            value={fields.service}
                            onChange={(event) => update("service", event.target.value)}
                            aria-invalid={Boolean(errors.service)}
                            aria-describedby={errors.service ? "error-service" : undefined}
                            className={cn(inputBase, "appearance-none pe-9", fields.service ? "text-ink-950" : "text-ink-700/45", errors.service ? errBorder : okBorder)}
                          >
                            <option value="" disabled>اختر الخدمة</option>
                            {serviceOptions.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <Icon name="chevronDown" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-700/40" />
                        </div>
                        {errors.service ? (
                          <p id="error-service" role="alert" className="mt-1.5 text-[10.5px] font-medium text-red-600">{errors.service}</p>
                        ) : null}
                      </div>

                      <div className="hidden items-center gap-2.5 rounded-xl border border-dashed border-brand-600/25 bg-brand-50/60 px-3.5 sm:flex">
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-500/12 text-brand-700">
                          <Icon name="badgeCheck" className="size-4" />
                        </span>
                        <p className="text-[10.5px] leading-5 text-ink-700/70">
                          <span className="font-semibold text-ink-900">الرياض والدمام:</span> نفس الأسعار، ونفس الضمان، ودون رسوم تنقّل داخل المدينة.
                        </p>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="field-notes" className="mb-1.5 block text-[11.5px] font-semibold text-ink-900">
                          تفاصيل إضافية <span className="font-normal text-ink-700/45">(اختياري)</span>
                        </label>
                        <textarea
                          id="field-notes"
                          name="notes"
                          rows={3}
                          maxLength={300}
                          placeholder="مثال: مكيف سبليت 24 وحدة، شقة جديدة، الشقة في الدور الثاني…"
                          value={fields.notes}
                          onChange={(event) => update("notes", event.target.value)}
                          className="w-full resize-none rounded-xl border border-ink-900/12 bg-white px-3.5 py-3 text-[13px] text-ink-950 transition-all duration-200 placeholder:text-ink-700/35 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/12"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className={cn(buttonStyles("primary", "lg"), "shine mt-5 w-full")}
                    >
                      {status === "sending" ? (
                        <>
                          <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                          جارٍ إرسال طلبك…
                        </>
                      ) : (
                        <>
                          أرسل الطلب — الرد خلال 15 دقيقة
                          <span className="grid size-7 place-items-center rounded-full bg-brand-400/20 text-brand-200 transition-transform duration-300 group-hover/btn:-translate-x-1">
                            <Icon name="arrowLeft" className="size-4" />
                          </span>
                        </>
                      )}
                    </button>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] text-ink-700/50">
                      <p className="flex items-center gap-1.5">
                        <Icon name="shieldCheck" className="size-3.5 text-brand-600" />
                        بياناتك محفوظة ولن تُشارك مع أي طرف ثالث
                      </p>
                      <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-medium text-brand-700 hover:underline">
                        أو راسلنا واتساب
                        <Icon name="arrowLeft" className="size-3" />
                      </a>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
