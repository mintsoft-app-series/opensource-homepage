import { LOCALES, locales, defaultLocale, type Locale } from "../locales";
import type { Dict } from "./types";
import en from "./en";

export type { Dict } from "./types";
export { locales, defaultLocale, LOCALES };

// 언어 파일은 src/data/i18n/<code>.ts — 파일을 추가하면 자동으로 잡힌다.
const files = import.meta.glob<{ default: Dict }>(["./*.ts", "!./index.ts", "!./types.ts"], { eager: true });
const dicts = Object.fromEntries(
  Object.entries(files).map(([path, mod]) => [path.slice(2, -3), mod.default]),
) as Partial<Record<Locale, Dict>>;

/** 해당 언어 사전. 빠진 키·프로젝트 문구는 영어로 채운다. */
export const t = (lang: Locale): Dict => {
  const d = dicts[lang];
  if (!d) return en;
  return { ...en, ...d, cat: { ...en.cat, ...d.cat }, projects: { ...en.projects, ...d.projects } };
};
export const hasDict = (lang: Locale) => lang in dicts;
export const prefix = (lang: Locale) => (lang === defaultLocale ? "" : `/${lang}`);
export const dirOf = (lang: Locale) => LOCALES[lang].dir;
