import { getCollection, type CollectionEntry } from 'astro:content';

export type Topic = CollectionEntry<'topics'>;
export type Page = CollectionEntry<'pages'>;

export interface Chapter {
  slug: string;
  entry: Page;
}

export async function getTopics(): Promise<Topic[]> {
  const order = { stable: 0, beta: 1, draft: 2 } as const;
  return (await getCollection('topics')).sort(
    (a, b) => order[a.data.status] - order[b.data.status] || a.id.localeCompare(b.id),
  );
}

export async function getQuickstart(topic: string): Promise<Page | undefined> {
  return (await getCollection('pages')).find((p) => p.id === `${topic}/quickstart`);
}

/** Chapter slug: explicit frontmatter `slug`, else filename without the `NN-` prefix. */
export function chapterSlug(entry: Page): string {
  return entry.data.slug ?? entry.id.split('/').pop()!.replace(/^\d+-/, '');
}

export async function getChapters(topic: string): Promise<Chapter[]> {
  return (await getCollection('pages'))
    .filter((p) => p.id.startsWith(`${topic}/chapters/`))
    .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999))
    .map((entry) => ({ slug: chapterSlug(entry), entry }));
}
