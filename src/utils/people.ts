import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_VARIANT } from './variant';

/**
 * Represents a people profile entry with username and variant information
 */
export interface PeopleEntry {
  username: string;
  variant: string;
  entry: CollectionEntry<'people'>;
}

/**
 * Get all people profiles from the content collection
 * @returns Array of people entries with username, variant, and entry data
 */
export async function getAllPeople(): Promise<PeopleEntry[]> {
  const entries = await getCollection('people');

  return entries.map((entry) => {
    // Astro content collection entry.id format: "@username/variant.md" or "@username/variant"
    // The format may include .md suffix depending on Astro version
    const parts = entry.id.split('/');
    if (parts.length < 2) {
      console.warn(`[people] Invalid entry ID format (expected @username/variant): ${entry.id}`);
      return null;
    }

    const username = parts[0]; // @octocat
    const variantFile = parts[parts.length - 1];
    // Remove .md suffix if present (Astro may or may not include it)
    const variant = variantFile.replace(/\.md$/, '');

    return { username, variant, entry };
  }).filter(Boolean) as PeopleEntry[];
}

/**
 * Get a specific person's profile by username and variant
 * @param username - The username including @ prefix (e.g., "@octocat")
 * @param variant - The variant name (e.g., "default", "zh")
 * @returns The matching people entry or undefined if not found
 */
export async function getPersonByUsername(
  username: string,
  variant: string
): Promise<PeopleEntry | undefined> {
  const all = await getAllPeople();
  return all.find((p) => p.username === username && p.variant === variant);
}

/**
 * Get a person's profile with fallback to default variant
 * @param username - The username including @ prefix (e.g., "@octocat")
 * @param variant - The preferred variant name
 * @returns The matching entry, or default variant if preferred not found
 */
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

/**
 * Get all available variants for a specific person's profile
 * @param username - The username including @ prefix (e.g., "@octocat")
 * @returns Array of variant names (e.g., ["default", "zh", "advanced"])
 */
export async function getAvailableVariantsForPerson(username: string): Promise<string[]> {
  const all = await getAllPeople();
  return all.filter((p) => p.username === username).map((p) => p.variant);
}

/**
 * Get all unique usernames from people profiles
 * @returns Array of unique usernames (e.g., ["@octocat", "@johndoe"])
 */
export async function getUniquePeopleUsernames(): Promise<string[]> {
  const all = await getAllPeople();
  return [...new Set(all.map((p) => p.username))];
}
