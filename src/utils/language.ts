import { defaultLang, isValidLang, type Lang } from '@i18n/config';
import en from '@i18n/ui/en.json';
import zh from '@i18n/ui/zh.json';
import de from '@i18n/ui/de.json';
import fr from '@i18n/ui/fr.json';
import es from '@i18n/ui/es.json';

const uiStrings: Record<Lang, typeof en> = { en, zh, de, fr, es };

export function t(lang: Lang, key: keyof typeof en): string {
  return uiStrings[lang][key] ?? uiStrings[defaultLang][key] ?? key;
}

export function detectLanguage(request: Request): Lang {
  // 1. Check cookie
  const cookies = request.headers.get('cookie') ?? '';
  const langCookie = cookies.match(/lang=(\w+)/)?.[1];
  if (langCookie && isValidLang(langCookie)) {
    return langCookie;
  }

  // 2. Check Accept-Language header
  const acceptLang = request.headers.get('accept-language') ?? '';
  const preferredLangs = acceptLang.split(',').map((l) => l.split(';')[0].trim().split('-')[0]);

  for (const lang of preferredLangs) {
    if (isValidLang(lang)) {
      return lang;
    }
  }

  // 3. Default to English
  return defaultLang;
}

export function getLanguageFromPath(pathname: string): Lang {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLang(firstSegment)) {
    return firstSegment;
  }

  return defaultLang;
}

export function removeLanguagePrefix(pathname: string): string {
  const lang = getLanguageFromPath(pathname);
  if (lang !== defaultLang && pathname.startsWith(`/${lang}`)) {
    return pathname.slice(lang.length + 1) || '/';
  }
  return pathname;
}

export function addLanguagePrefix(pathname: string, lang: Lang): string {
  const cleanPath = removeLanguagePrefix(pathname);
  if (lang === defaultLang) {
    return cleanPath;
  }
  return `/${lang}${cleanPath}`;
}
