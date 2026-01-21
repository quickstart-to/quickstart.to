import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_VARIANT } from './variant';

export type Category = 'tech' | 'life';

export interface QuickstartEntry {
  id: string;
  variant: string;
  category: Category;
  entry: CollectionEntry<'tech'> | CollectionEntry<'life'>;
}

export async function getAllQuickstarts(): Promise<QuickstartEntry[]> {
  const techEntries = await getCollection('tech');
  const lifeEntries = await getCollection('life');

  const parseEntry = (entry: CollectionEntry<'tech'> | CollectionEntry<'life'>, category: Category): QuickstartEntry | null => {
    // entry.id is like "docker/default" or "docker/zh"
    const parts = entry.id.split('/');
    if (parts.length < 2) return null;

    const id = parts.slice(0, -1).join('/');
    const variantFile = parts[parts.length - 1];
    const variant = variantFile.replace(/\.md$/, '');

    return { id, variant, category, entry };
  };

  const techQuickstarts = techEntries.map((e) => parseEntry(e, 'tech')).filter(Boolean) as QuickstartEntry[];
  const lifeQuickstarts = lifeEntries.map((e) => parseEntry(e, 'life')).filter(Boolean) as QuickstartEntry[];

  return [...techQuickstarts, ...lifeQuickstarts];
}

export async function getQuickstartById(id: string, variant: string): Promise<QuickstartEntry | undefined> {
  const all = await getAllQuickstarts();
  return all.find((q) => q.id === id && q.variant === variant);
}

export async function getQuickstartByIdWithFallback(id: string, variant: string): Promise<QuickstartEntry | undefined> {
  const all = await getAllQuickstarts();

  // Try exact match first
  const exact = all.find((q) => q.id === id && q.variant === variant);
  if (exact) return exact;

  // Fallback to default variant
  return all.find((q) => q.id === id && q.variant === DEFAULT_VARIANT);
}

export async function getAvailableVariants(id: string): Promise<string[]> {
  const all = await getAllQuickstarts();
  return all.filter((q) => q.id === id).map((q) => q.variant);
}

export async function getUniqueQuickstartIds(): Promise<string[]> {
  const all = await getAllQuickstarts();
  return [...new Set(all.map((q) => q.id))];
}

export async function getQuickstartsByCategory(category: Category, variant?: string): Promise<QuickstartEntry[]> {
  const all = await getAllQuickstarts();
  return all.filter((q) => q.category === category && (!variant || q.variant === variant));
}
