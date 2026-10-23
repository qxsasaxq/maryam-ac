import { areasByCity, navLinks, services, site } from "../data";
import { Icon, InstagramIcon, Logo, SnapchatIcon, StarRating, WhatsAppIcon, XIcon } from "./ui";

const socials = [
  { label: "واتساب", href: site.whatsapp, Icon: WhatsAppIcon },
  { label: "إنستغرام", href: "https://www.instagram.com/", Icon: InstagramIcon },
  { label: "إكس", href: "https://x.com/", Icon: XIcon },
  { label: "سناب شات", href: "https://www.snapchat.com/", Icon: SnapchatIcon },
];

const bottomLinks = ["سياسة الخصوصية", "الشروط والأحكام"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-ink-950 text-paper">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 top-0 size-[24rem] rounded-full bg-brand-500/10 blur-[100px]" />
        <div className="absolute -left-20 bottom-0 size-[20rem] rounded-full bg-ice-500/8 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-14 sm:px-6 sm:pb-28 sm:pt-16 lg:px-8 lg:pb-16">
        <div className="grid gap-10 border-b border-white/8 pb-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.7fr_0.85fr_1.1fr] lg:gap-8">
          <div>
            <Logo tone="dark" />
            <p className="mt-4 max-w-xs text-[12px] leading-7 text-paper/55">
              مؤسسة سعودية متخصصة في تركيب وصيانة المكيفات في الرياض والدمام. نعمل بمعايير المصنّعين، وبضمان مكتوب، وبسعر تعرفه قبل
              بدء العمل.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {site.cities.map((city) => (
                <span
                  key={city.name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-paper/65"
                >
                  <Icon name="mapPin" className="size-3 text-brand-300" />
                  {city.name}
                  <span className="text-paper/35">— {city.note}</span>
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <StarRating rating={5} />
              <span className="font-display text-[11.5px] font-semibold text-paper/80">4.9 من 382 تقييماً</span>
            </div>
            <div className="mt-5 flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`مؤسسة مريم على ${social.label}`}
                  className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-paper/65 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/40 hover:bg-brand-400 hover:text-ink-950"
                >
                  <social.Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="روابط سريعة">
            <h3 className="font-display text-[12px] font-semibold text-paper">روابط سريعة</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link-underline inline-block text-[11.5px] text-paper/55 transition-colors hover:text-brand-200">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#quote" className="inline-block text-[11.5px] font-semibold text-brand-300 transition-colors hover:text-brand-200">
                  اطلب عرض سعر
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="خدماتنا">
            <h3 className="font-display text-[12px] font-semibold text-paper">خدماتنا</h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.title}>
                  <a href="#services" className="inline-block text-[11.5px] text-paper/55 transition-colors hover:text-brand-200">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-[12px] font-semibold text-paper">تواصل معنا</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={site.phoneHref} className="flex items-start gap-2.5 text-[11.5px] text-paper/60 transition-colors hover:text-brand-200">
                  <Icon name="phone" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                  <span>
                    <span className="block font-display font-semibold text-paper/90" dir="ltr">{site.phoneDisplay}</span>
                    <span className="mt-0.5 block text-[10px] text-paper/55">اتصال ومكالمات واتساب</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[11.5px] text-paper/60">
                <Icon name="mapPin" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                <span>
                  {site.address}
                  <span className="mt-1 block text-[10px] text-paper/55">{site.branchAddress}</span>
                  <span className="mt-1.5 block text-[10px] font-medium text-brand-300/80">نخدم جميع أحياء الرياض والدمام</span>
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-[11.5px] text-paper/60">
                <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                <span>
                  {site.hours}
                  <span className="mt-0.5 block text-[10px] text-paper/55">{site.hoursNote}</span>
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-[11.5px] text-paper/60">
                <Icon name="mail" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-brand-200" dir="ltr">{site.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/8 py-4 text-[10px] text-paper/55">
          <span className="flex items-center gap-1.5">
            <Icon name="shieldCheck" className="size-3.5 text-brand-400" />
            السجل التجاري: <span dir="ltr">{site.cr}</span>
          </span>
          <span className="h-3 w-px bg-white/10" aria-hidden="true" />
          <span className="flex items-center gap-1.5">
            <Icon name="check" className="size-3.5 text-brand-400" />
            فاتورة ضريبية إلكترونية
          </span>
          <span className="h-3 w-px bg-white/10" aria-hidden="true" />
          <span className="flex items-center gap-1.5">
            <Icon name="badgeCheck" className="size-3.5 text-brand-400" />
            فنيون معتمدون وضمان مكتوب
          </span>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-4 pt-5 sm:flex-row">
          <p className="text-center text-[10.5px] leading-5 text-paper/55 sm:text-start">
            © {new Date().getFullYear()} مؤسسة مريم للمكيفات — جميع الحقوق محفوظة. الأسعار المعروضة تقديرية وتشمل ضريبة القيمة المضافة.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {bottomLinks.map((link) => (
              <span key={link} className="text-[10.5px] text-paper/55">{link}</span>
            ))}
            <span className="hidden h-3 w-px bg-white/10 sm:block" aria-hidden="true" />
            <p className="text-[10.5px] text-paper/55">صُنع بعناية في السعودية</p>
            <a
              href="#home"
              aria-label="العودة إلى أعلى الصفحة"
              className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/5 text-paper/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/40 hover:text-brand-200"
            >
              <Icon name="arrowUp" className="size-3.5" />
            </a>
          </div>
        </div>

        <p className="mt-4 text-center text-[9.5px] leading-5 text-paper/45 sm:text-start">
          نخدم: {areasByCity["الرياض"].slice(0, 5).join(" • ")} — الرياض، و{areasByCity["الدمام"].slice(0, 5).join(" • ")} — الدمام.
        </p>
      </div>
    </footer>
  );
}
