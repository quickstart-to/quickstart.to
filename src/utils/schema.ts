import { type Lang } from '@i18n/config';
import { SITE_URL } from './seo';

/**
 * 生成 WebSite 结构化数据 (用于首页)
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'quickstart.to',
    description: 'The TL;DR of everything',
    url: SITE_URL,
    inLanguage: ['en', 'zh', 'de', 'fr', 'es'],
    publisher: {
      '@type': 'Organization',
      name: 'quickstart.to',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`,
      },
    },
  };
}

interface ArticleData {
  title: string;
  description: string;
  url: string;
  lang: Lang;
  category: string;
  ogImage: string;
}

/**
 * 生成 TechArticle 结构化数据 (用于内容页)
 */
export function generateArticleSchema(data: ArticleData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: data.title,
    description: data.description,
    url: data.url,
    inLanguage: data.lang,
    image: data.ogImage,
    author: {
      '@type': 'Organization',
      name: 'quickstart.to',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'quickstart.to',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
  };
}

interface BreadcrumbItem {
  name: string;
  url?: string;
}

/**
 * 生成 BreadcrumbList 结构化数据
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

/**
 * 为内容页生成完整的结构化数据数组
 */
export function generateQuickstartSchemas(data: ArticleData): object[] {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Home', url: SITE_URL },
    { name: data.category, url: `${SITE_URL}/#${data.category.toLowerCase()}` },
    { name: data.title },
  ];

  return [generateArticleSchema(data), generateBreadcrumbSchema(breadcrumbItems)];
}
