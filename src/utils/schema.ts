import { SITE_URL } from './seo';

/**
 * Generate WebSite structured data (for home page)
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'quickstart.to',
    description: 'The TL;DR of everything',
    url: SITE_URL,
    inLanguage: 'en',
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
  category: string;
  ogImage: string;
}

/**
 * Generate TechArticle structured data (for content pages)
 */
export function generateArticleSchema(data: ArticleData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: data.title,
    description: data.description,
    url: data.url,
    inLanguage: 'en',
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
 * Generate BreadcrumbList structured data
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
 * Generate complete structured data array for content pages
 */
export function generateQuickstartSchemas(data: ArticleData): object[] {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Home', url: SITE_URL },
    { name: data.category, url: `${SITE_URL}/#${data.category.toLowerCase()}` },
    { name: data.title },
  ];

  return [generateArticleSchema(data), generateBreadcrumbSchema(breadcrumbItems)];
}

interface PeopleData {
  displayName: string;
  tagline?: string;
  url: string;
  ogImage: string;
}

/**
 * Generate Person structured data for people profiles
 */
export function generatePersonSchema(data: PeopleData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.displayName,
    description: data.tagline || `${data.displayName}'s personal guide`,
    url: data.url,
    image: data.ogImage,
  };
}

/**
 * Generate complete structured data array for people profile pages
 */
export function generatePeopleSchemas(data: PeopleData): object[] {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Home', url: SITE_URL },
    { name: 'People' },
    { name: data.displayName },
  ];

  return [generatePersonSchema(data), generateBreadcrumbSchema(breadcrumbItems)];
}
