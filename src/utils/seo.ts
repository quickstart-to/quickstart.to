import { defaultLang, type Lang } from '@i18n/config';

const SITE_URL = 'https://quickstart.to';

/**
 * 生成规范化的 canonical URL
 * 英文无前缀，其他语言有前缀
 */
export function getCanonicalUrl(id: string, lang: Lang): string {
  if (lang === defaultLang) {
    return `${SITE_URL}/${id}`;
  }
  return `${SITE_URL}/${lang}/${id}`;
}

/**
 * 生成首页的 canonical URL
 */
export function getHomeCanonicalUrl(lang: Lang): string {
  if (lang === defaultLang) {
    return SITE_URL;
  }
  return `${SITE_URL}/${lang}`;
}

/**
 * 获取 Open Graph locale 格式
 * 将语言代码转换为 og:locale 格式 (如 en -> en_US)
 */
export function getOgLocale(lang: Lang): string {
  const localeMap: Record<Lang, string> = {
    en: 'en_US',
    zh: 'zh_CN',
    de: 'de_DE',
    fr: 'fr_FR',
    es: 'es_ES',
  };
  return localeMap[lang];
}

/**
 * 生成 OG 图片 URL
 * 英文: /og/{id}.png
 * 其他语言: /og/{lang}/{id}.png
 */
export function getOgImageUrl(id: string, lang: Lang): string {
  if (lang === defaultLang) {
    return `${SITE_URL}/og/${id}.png`;
  }
  return `${SITE_URL}/og/${lang}/${id}.png`;
}

/**
 * 生成默认 OG 图片 URL (用于首页等)
 */
export function getDefaultOgImageUrl(): string {
  return `${SITE_URL}/og/default.png`;
}

/**
 * 生成 alternate URLs 数组，用于 hreflang 标签
 * 包含 x-default 指向英文版本
 */
export function getAlternateUrls(
  id: string,
  availableLanguages: Lang[]
): { lang: Lang | 'x-default'; url: string }[] {
  const urls = availableLanguages.map((l) => ({
    lang: l as Lang | 'x-default',
    url: getCanonicalUrl(id, l),
  }));

  // 添加 x-default 指向英文版本
  if (availableLanguages.includes(defaultLang)) {
    urls.push({
      lang: 'x-default',
      url: getCanonicalUrl(id, defaultLang),
    });
  }

  return urls;
}

export { SITE_URL };
