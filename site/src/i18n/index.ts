// UI-language strings. The UI language never appears in URLs: pages are prerendered in the
// topic's content language (when supported) and the client may swap [data-i18n] strings.
import zhCN from './zh-CN.json';
import en from './en.json';

export const UI_LANGS = { 'zh-CN': zhCN, en } as const;
export type UiLang = keyof typeof UI_LANGS;
export type UiKey = keyof typeof en;
export const UI_LANG_LABELS: Record<UiLang, string> = { 'zh-CN': '简体中文', en: 'English' };
export const DEFAULT_UI_LANG: UiLang = 'en';

/** Map any BCP 47 tag to a supported UI language (zh, zh-Hans, zh-CN → zh-CN; en-US → en). */
export function matchUiLang(tag: string | undefined | null): UiLang | null {
  if (!tag) return null;
  const t = tag.toLowerCase();
  if (t.startsWith('zh')) return 'zh-CN';
  if (t.startsWith('en')) return 'en';
  return null;
}

export function uiLangFor(contentLang: string): UiLang {
  return matchUiLang(contentLang) ?? DEFAULT_UI_LANG;
}

export function t(lang: UiLang, key: UiKey): string {
  return UI_LANGS[lang][key] ?? UI_LANGS[DEFAULT_UI_LANG][key] ?? key;
}
