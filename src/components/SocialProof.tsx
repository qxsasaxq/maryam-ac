import type { CSSProperties } from "react";
import { brands, stats } from "../data";
import { Counter, Icon, Reveal } from "./ui";

export default function SocialProof() {
  return (
    <section aria-label="مؤشرات الثقة والماركات" className="relative border-y border-ink-900/8 bg-white/55 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-8 py-9 sm:py-11 lg:grid-cols-4 lg:divide-x lg:divide-x-reverse lg:divide-ink-900/8">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 80} className="lg:px-7 lg:first:pr-0 lg:last:pl-0">
              <div className="flex flex-col items-start gap-1">
                <div className="font-display text-[1.85rem] font-bold tracking-tight text-ink-950 sm:text-4xl">
                  <Counter to={stat.value} decimals={stat.decimals ?? 0} suffix={stat.suffix} />
                </div>
                <p className="font-display text-[12.5px] font-medium text-ink-800/80 sm:text-[13.5px]">{stat.label}</p>
                <p className="text-[11px] text-ink-700/50">{stat.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-ink-900/8 py-5 sm:flex-row sm:items-center sm:gap-8">
          <p className="flex shrink-0 items-center gap-2 font-display text-[11.5px] font-semibold tracking-wide text-ink-800/60">
            <Icon name="badgeCheck" className="size-4 text-brand-600" />
            نركّب ونصين جميع الماركات
          </p>
          <div className="marquee-wrap marquee-mask relative w-full overflow-hidden">
            <div className="marquee-track items-center gap-8 sm:gap-12" style={{ "--marquee-duration": "38s" } as CSSProperties} dir="ltr">
              {[...brands, ...brands].map((brand, index) => (
                <div key={`${brand}-${index}`} className="flex shrink-0 items-center gap-8 sm:gap-12">
                  <span className="font-display text-base font-semibold tracking-[0.18em] text-ink-900/35 transition-colors hover:text-ink-900/65 sm:text-lg">
                    {brand}
                  </span>
                  <span aria-hidden="true" className="size-1 rounded-full bg-ink-900/15" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
