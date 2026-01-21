export const DEFAULT_VARIANT = 'default';

export function isDefaultVariant(variant: string): boolean {
  return variant === DEFAULT_VARIANT;
}

export function getVariantFromPath(pathname: string): { contentId: string; variant: string } | null {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  if (segments.length === 1) {
    // /docker -> { contentId: 'docker', variant: 'default' }
    return { contentId: segments[0], variant: DEFAULT_VARIANT };
  }

  // /docker/zh -> { contentId: 'docker', variant: 'zh' }
  // /some/nested/id/zh -> { contentId: 'some/nested/id', variant: 'zh' }
  const variant = segments[segments.length - 1];
  const contentId = segments.slice(0, -1).join('/');

  return { contentId, variant };
}

export function getVariantUrl(contentId: string, variant: string): string {
  if (variant === DEFAULT_VARIANT) {
    return `/${contentId}`;
  }
  return `/${contentId}/${variant}`;
}
