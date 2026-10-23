import { site } from "../data";
import { cn } from "../utils/cn";
import { Icon, WhatsAppIcon, buttonStyles } from "./ui";

export default function FloatingActions() {
  return (
    <>
      {/* Desktop WhatsApp bubble */}
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل مع مؤسسة مريم عبر واتساب"
        className="group fixed bottom-6 left-6 z-40 hidden items-center gap-3 rounded-full border border-white/60 bg-white/85 py-2 pe-2 ps-4 shadow-[0_24px_50px_-24px_rgba(6,18,15,.6)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-24px_rgba(6,18,15,.6)] lg:flex"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-display text-[12px] font-semibold text-ink-900 opacity-0 transition-all duration-500 group-hover:max-w-[9rem] group-hover:opacity-100">
          استفسر الآن
        </span>
        <span className="relative grid size-11 place-items-center rounded-full bg-[#25d366] text-white">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25d366]/40" aria-hidden="true" />
          <WhatsAppIcon className="relative size-5.5" />
        </span>
      </a>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-900/10 bg-paper/90 px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-ink-900/12 bg-white text-ink-900"
            aria-label="اتصل بمؤسسة مريم"
          >
            <Icon name="phone" className="size-4.5 text-brand-700" />
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-ink-900/12 bg-white text-[#1fa855]"
            aria-label="تواصل عبر واتساب"
          >
            <WhatsAppIcon className="size-5" />
          </a>
          <a href="#quote" className={cn(buttonStyles("primary", "md"), "h-11 flex-1 text-[12.5px]")}>
            اطلب عرض سعر مجاني
            <Icon name="arrowLeft" className="size-4" />
          </a>
        </div>
      </div>
    </>
  );
}
