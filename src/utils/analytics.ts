/* ------------------------------------------------------------------ */
/* تتبع Google Ads                                                     */
/* ------------------------------------------------------------------ */

export const ADS_ID = "AW-18538959705";

/**
 * رمز التحويل (Conversion Label) من Google Ads.
 * افتح Google Ads ← الأدوات ← التحويلات ← إنشاء إجراء تحويل «إرسال نموذج»
 * ثم انسخ الرمز الذي يظهر بعد AW-18538959705/ والصقه هنا بين علامتي التنصيص.
 * مثال: "AbC-D_efGhIjKlMn"
 * إذا تُرك فارغاً، سيتم إرسال حدث generate_lead فقط بدون تسجيل تحويل.
 */
export const ADS_CONVERSION_LABEL = "";

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

function getGtag() {
  if (typeof window === "undefined") return null;
  const win = window as GtagWindow;
  return typeof win.gtag === "function" ? win.gtag : null;
}

export function trackEvent(action: string, params: Record<string, string | number> = {}) {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", action, params);
}

/** يُستدعى عند نجاح إرسال نموذج طلب العرض */
export function trackLead(params: Record<string, string | number> = {}) {
  trackEvent("generate_lead", { form_name: "quote_request", ...params });

  if (!ADS_CONVERSION_LABEL) return;
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", "conversion", {
    send_to: `${ADS_ID}/${ADS_CONVERSION_LABEL}`,
    ...params,
  });
}

/** تتبع ضغطات الاتصال والواتساب في كل الصفحة */
export function initOutboundTracking() {
  if (typeof document === "undefined") return () => {};

  const handler = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    const link = target?.closest?.("a") as HTMLAnchorElement | null;
    if (!link) return;
    const href = link.getAttribute("href") ?? "";

    if (href.startsWith("tel:")) {
      trackEvent("call_click", { link_url: href });
    } else if (href.includes("wa.me")) {
      trackEvent("whatsapp_click", { link_url: href.split("?")[0] });
    }
  };

  document.addEventListener("click", handler);
  return () => document.removeEventListener("click", handler);
}
