import { DEFAULT_VARIANT } from './variant';

const SITE_URL = 'https://quickstart.to';

/**
 * Generate canonical URL for quickstart content
 * Default variant: /docker
 * Other variants: /docker/zh
 */
export function getCanonicalUrl(id: string, variant: string): string {
  if (variant === DEFAULT_VARIANT) {
    return `${SITE_URL}/${id}`;
  }
  return `${SITE_URL}/${id}/${variant}`;
}

/**
 * Generate home page canonical URL
 */
export function getHomeCanonicalUrl(): string {
  return SITE_URL;
}

/**
 * Generate OG image URL
 * Default variant: /og/{id}.png
 * Other variants: /og/{id}/{variant}.png
 */
export function getOgImageUrl(id: string, variant: string): string {
  if (variant === DEFAULT_VARIANT) {
    return `${SITE_URL}/og/${id}.png`;
  }
  return `${SITE_URL}/og/${id}/${variant}.png`;
}

/**
 * Generate default OG image URL (for home page etc.)
 */
export function getDefaultOgImageUrl(): string {
  return `${SITE_URL}/og/default.png`;
}

export { SITE_URL };
