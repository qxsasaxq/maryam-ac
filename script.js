
const ADS_ID = 'AW-18538959705';
const CALL_LABEL = 'CALL_LABEL';
const WHATSAPP_LABEL = 'WHATSAPP_LABEL';

function trackCallConversion(googleConversionId, conversionLabel) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      'send_to': googleConversionId + '/' + conversionLabel,
      'value': 1.0,
      'currency': 'SAR'
    });
  }
}

function trackWhatsappConversion(googleConversionId, conversionLabel) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      'send_to': googleConversionId + '/' + conversionLabel,
      'value': 1.0,
      'currency': 'SAR'
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('[data-track="call"]').forEach(el =>
    el.addEventListener('click', () => trackCallConversion(ADS_ID, CALL_LABEL)));
  document.querySelectorAll('[data-track="whatsapp"]').forEach(el =>
    el.addEventListener('click', () => trackWhatsappConversion(ADS_ID, WHATSAPP_LABEL)));
});
