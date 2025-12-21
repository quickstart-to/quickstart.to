export const languages = {
  en: 'English',
  zh: '中文',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const supportedLangs = Object.keys(languages) as Lang[];

export function isValidLang(lang: string): lang is Lang {
  return lang in languages;
}

export function getLangFromPath(path: string): Lang {
  const segments = path.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLang(firstSegment)) {
    return firstSegment;
  }

  return defaultLang;
}
