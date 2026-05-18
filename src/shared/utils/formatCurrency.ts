import { getLocales } from "expo-localization";

const FALLBACK_CURRENCY = "USD";
const FALLBACK_LOCALE = "en-US";

const CURRENCY_LOCALE_MAP: Record<string, string> = {
  USD: "en-US",
  IDR: "id-ID",
  SGD: "en-SG",
  MYR: "ms-MY",
  JPY: "ja-JP",
  GBP: "en-GB",
  AUD: "en-AU",
  EUR: "de-DE",
  PLN: "pl-PL",
};

const getDeviceLocaleInfo = (): { locale: string; currency: string } => {
  const [primaryLocale] = getLocales();

  return {
    locale: primaryLocale?.languageTag ?? FALLBACK_LOCALE,
    currency: primaryLocale?.currencyCode ?? FALLBACK_CURRENCY,
  };
};

/**
 * Format currency with auto-detect device locale & currency.
 * @param amount - number to format
 * @param currency - override currency (from user account/profile). Falls back to device currency
 * @param locale - override locale. Falls back to currency's natural locale via CURRENCY_LOCALE_MAP
 * @param showDecimals - show decimal digits
 */
export const formatCurrency = ({
  amount,
  currency,
  locale,
  showDecimals,
}: {
  amount: number;
  currency?: string;
  locale?: string;
  showDecimals?: boolean;
}): string => {
  const deviceInfo = getDeviceLocaleInfo();
  const resolvedCurrency = currency ?? deviceInfo.currency;

  const resolvedLocale =
    locale ?? CURRENCY_LOCALE_MAP[resolvedCurrency] ?? deviceInfo.locale;

  return new Intl.NumberFormat(resolvedLocale, {
    style: "currency",
    currency: resolvedCurrency,
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);
};
