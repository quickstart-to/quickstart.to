import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, type Lang } from '@i18n/config';

export type Category = 'tech' | 'life';

export interface QuickstartEntry {
  id: string;
  lang: Lang;
  category: Category;
  entry: CollectionEntry<'tech'> | CollectionEntry<'life'>;
}

export async function getAllQuickstarts(): Promise<QuickstartEntry[]> {
  const techEntries = await getCollection('tech');
  const lifeEntries = await getCollection('life');

  const parseEntry = (entry: CollectionEntry<'tech'> | CollectionEntry<'life'>, category: Category): QuickstartEntry | null => {
    // entry.id is like "docker/en" or "docker/zh"
    const parts = entry.id.split('/');
    if (parts.length < 2) return null;

    const id = parts.slice(0, -1).join('/');
    const langFile = parts[parts.length - 1];
    const lang = langFile.replace(/\.md$/, '') as Lang;

    return { id, lang, category, entry };
  };

  const techQuickstarts = techEntries.map((e) => parseEntry(e, 'tech')).filter(Boolean) as QuickstartEntry[];
  const lifeQuickstarts = lifeEntries.map((e) => parseEntry(e, 'life')).filter(Boolean) as QuickstartEntry[];

  return [...techQuickstarts, ...lifeQuickstarts];
}

export async function getQuickstartById(id: string, lang: Lang): Promise<QuickstartEntry | undefined> {
  const all = await getAllQuickstarts();
  return all.find((q) => q.id === id && q.lang === lang);
}

export async function getQuickstartByIdWithFallback(id: string, lang: Lang): Promise<QuickstartEntry | undefined> {
  const all = await getAllQuickstarts();

  // Try exact match first
  const exact = all.find((q) => q.id === id && q.lang === lang);
  if (exact) return exact;

  // Fallback to default language
  return all.find((q) => q.id === id && q.lang === defaultLang);
}

export async function getAvailableLanguages(id: string): Promise<Lang[]> {
  const all = await getAllQuickstarts();
  return all.filter((q) => q.id === id).map((q) => q.lang);
}

export async function getUniqueQuickstartIds(): Promise<string[]> {
  const all = await getAllQuickstarts();
  return [...new Set(all.map((q) => q.id))];
}

export async function getQuickstartsByCategory(category: Category, lang?: Lang): Promise<QuickstartEntry[]> {
  const all = await getAllQuickstarts();
  return all.filter((q) => q.category === category && (!lang || q.lang === lang));
}
