import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_VARIANT } from './variant';

export interface PeopleEntry {
  username: string;
  variant: string;
  entry: CollectionEntry<'people'>;
}

export async function getAllPeople(): Promise<PeopleEntry[]> {
  const entries = await getCollection('people');

  return entries.map((entry) => {
    // entry.id format depends on Astro version, may include .md suffix
    const parts = entry.id.split('/');
    if (parts.length < 2) return null;

    const username = parts[0]; // @octocat
    const variantFile = parts[parts.length - 1];
    // Remove .md suffix if present (for compatibility)
    const variant = variantFile.replace(/\.md$/, '');

    return { username, variant, entry };
  }).filter(Boolean) as PeopleEntry[];
}

export async function getPersonByUsername(
  username: string,
  variant: string
): Promise<PeopleEntry | undefined> {
  const all = await getAllPeople();
  return all.find((p) => p.username === username && p.variant === variant);
}

export async function getPersonByUsernameWithFallback(
  username: string,
  variant: string
): Promise<PeopleEntry | undefined> {
  const all = await getAllPeople();

  // Try exact match first
  const exact = all.find((p) => p.username === username && p.variant === variant);
  if (exact) return exact;

  // Fallback to default variant
  return all.find((p) => p.username === username && p.variant === DEFAULT_VARIANT);
}

export async function getAvailableVariantsForPerson(username: string): Promise<string[]> {
  const all = await getAllPeople();
  return all.filter((p) => p.username === username).map((p) => p.variant);
}

export async function getUniquePeopleUsernames(): Promise<string[]> {
  const all = await getAllPeople();
  return [...new Set(all.map((p) => p.username))];
}
