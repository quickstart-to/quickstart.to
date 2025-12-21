import type { Contributor, ContributorCache } from '../../scripts/contributors/types.js';

let cache: ContributorCache | null = null;

async function loadCache(): Promise<ContributorCache> {
  if (cache) return cache;

  try {
    // In production, this will be bundled
    const data = await import('../../scripts/contributors/cache.json');
    cache = data.default as ContributorCache;
    return cache;
  } catch {
    // Return empty cache if file doesn't exist
    return {
      generatedAt: new Date().toISOString(),
      contributors: [],
      fileContributors: {},
    };
  }
}

export async function getAllContributors(): Promise<Contributor[]> {
  const data = await loadCache();
  return data.contributors;
}

export async function getContributorsForFile(filePath: string): Promise<Contributor[]> {
  const data = await loadCache();

  // Normalize path
  const normalizedPath = filePath.replace(/^\//, '');
  const emails = data.fileContributors[normalizedPath] ?? [];

  return emails
    .map((email) => data.contributors.find((c) => c.email === email))
    .filter(Boolean) as Contributor[];
}

export async function getTopContributors(limit: number = 10): Promise<Contributor[]> {
  const contributors = await getAllContributors();
  return contributors.slice(0, limit);
}

export function getContributorQuickstartCount(contributor: Contributor): number {
  // Count unique quickstart IDs (ignoring language suffix)
  const quickstartIds = new Set<string>();

  for (const file of contributor.files) {
    // path: src/content/tech/docker/en.md -> docker
    const match = file.path.match(/src\/content\/\w+\/([^/]+)\//);
    if (match) {
      quickstartIds.add(match[1]);
    }
  }

  return quickstartIds.size;
}
