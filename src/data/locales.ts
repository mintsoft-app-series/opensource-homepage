/** 지원 언어 — app.mint-soft.com(landing-web)과 같은 25개. ko 는 루트(/), 나머지는 /<code>/. */
export const LOCALES = {
  ko: { name: "한국어", bcp47: "ko-KR", dir: "ltr" },
  en: { name: "English", bcp47: "en-US", dir: "ltr" },
  ja: { name: "日本語", bcp47: "ja-JP", dir: "ltr" },
  "zh-CN": { name: "简体中文", bcp47: "zh-CN", dir: "ltr" },
  "zh-TW": { name: "繁體中文", bcp47: "zh-TW", dir: "ltr" },
  es: { name: "Español", bcp47: "es-ES", dir: "ltr" },
  fr: { name: "Français", bcp47: "fr-FR", dir: "ltr" },
  de: { name: "Deutsch", bcp47: "de-DE", dir: "ltr" },
  it: { name: "Italiano", bcp47: "it-IT", dir: "ltr" },
  pt: { name: "Português", bcp47: "pt-PT", dir: "ltr" },
  ru: { name: "Русский", bcp47: "ru-RU", dir: "ltr" },
  ar: { name: "العربية", bcp47: "ar", dir: "rtl" },
  hi: { name: "हिन्दी", bcp47: "hi-IN", dir: "ltr" },
  th: { name: "ไทย", bcp47: "th-TH", dir: "ltr" },
  vi: { name: "Tiếng Việt", bcp47: "vi-VN", dir: "ltr" },
  id: { name: "Bahasa Indonesia", bcp47: "id-ID", dir: "ltr" },
  tr: { name: "Türkçe", bcp47: "tr-TR", dir: "ltr" },
  nl: { name: "Nederlands", bcp47: "nl-NL", dir: "ltr" },
  pl: { name: "Polski", bcp47: "pl-PL", dir: "ltr" },
  sv: { name: "Svenska", bcp47: "sv-SE", dir: "ltr" },
  da: { name: "Dansk", bcp47: "da-DK", dir: "ltr" },
  fi: { name: "Suomi", bcp47: "fi-FI", dir: "ltr" },
  no: { name: "Norsk", bcp47: "nb-NO", dir: "ltr" },
  cs: { name: "Čeština", bcp47: "cs-CZ", dir: "ltr" },
  uk: { name: "Українська", bcp47: "uk-UA", dir: "ltr" },
} as const;

export type Locale = keyof typeof LOCALES;
export const locales = Object.keys(LOCALES) as Locale[];
export const defaultLocale: Locale = "ko";
export const isLocale = (v: string | undefined): v is Locale => !!v && v in LOCALES;
