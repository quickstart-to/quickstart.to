import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { GitHubAPIClient, type GitHubCommit } from './github-api.js';
import type { Contributor, ContributorCache, ContributorFile } from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_PATH = join(__dirname, 'cache.json');
const CONTENT_PREFIX = 'src/content/';

function loadCache(): ContributorCache | null {
  if (!existsSync(CACHE_PATH)) {
    return null;
  }

  try {
    const content = readFileSync(CACHE_PATH, 'utf-8');
    return JSON.parse(content) as ContributorCache;
  } catch {
    return null;
  }
}

function saveCache(cache: ContributorCache): void {
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}

async function fetchCommitDetails(
  client: GitHubAPIClient,
  commits: GitHubCommit[]
): Promise<GitHubCommit[]> {
  const detailed: GitHubCommit[] = [];

  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    console.log(`Fetching commit details ${i + 1}/${commits.length}: ${commit.sha.slice(0, 7)}`);

    try {
      const detail = await client.getCommitDetail(commit.sha);
      detailed.push(detail);
    } catch (error) {
      console.warn(`Failed to fetch details for ${commit.sha}: ${error}`);
    }
  }

  return detailed;
}

function processCommits(commits: GitHubCommit[]): {
  contributors: Contributor[];
  fileContributors: Record<string, string[]>;
} {
  const contributorMap = new Map<string, Contributor>();

  for (const commit of commits) {
    // Skip commits without GitHub author association
    if (!commit.author) {
      continue;
    }

    // Filter content files
    const contentFiles = commit.files?.filter(
      (f) => f.filename.startsWith(CONTENT_PREFIX) && f.filename.endsWith('.md')
    );

    if (!contentFiles || contentFiles.length === 0) {
      continue;
    }

    const login = commit.author.login;
    let contributor = contributorMap.get(login);

    if (!contributor) {
      contributor = {
        login,
        name: commit.commit.author.name,
        avatar: commit.author.avatar_url,
        htmlUrl: commit.author.html_url,
        files: [],
        totalCommits: 0,
        totalAdditions: 0,
        totalDeletions: 0,
        lastActive: commit.commit.author.date,
      };
      contributorMap.set(login, contributor);
    }

    // Update last active
    if (commit.commit.author.date > contributor.lastActive) {
      contributor.lastActive = commit.commit.author.date;
    }

    // Process each content file
    for (const file of contentFiles) {
      let fileEntry = contributor.files.find((f) => f.path === file.filename);

      if (!fileEntry) {
        fileEntry = { path: file.filename, commits: 0, additions: 0, deletions: 0 };
        contributor.files.push(fileEntry);
      }

      fileEntry.commits++;
      fileEntry.additions += file.additions;
      fileEntry.deletions += file.deletions;

      contributor.totalCommits++;
      contributor.totalAdditions += file.additions;
      contributor.totalDeletions += file.deletions;
    }
  }

  // Build file contributors map
  const fileContributors: Record<string, Set<string>> = {};

  for (const contributor of contributorMap.values()) {
    for (const file of contributor.files) {
      if (!fileContributors[file.path]) {
        fileContributors[file.path] = new Set();
      }
      fileContributors[file.path].add(contributor.login);
    }
  }

  // Convert Sets to Arrays
  const fileContributorsArray: Record<string, string[]> = {};
  for (const [path, logins] of Object.entries(fileContributors)) {
    fileContributorsArray[path] = Array.from(logins);
  }

  // Sort contributors by total commits
  const contributors = Array.from(contributorMap.values()).sort(
    (a, b) => b.totalCommits - a.totalCommits
  );

  return { contributors, fileContributors: fileContributorsArray };
}

async function main() {
  const forceFullFetch = process.env.FORCE_FULL_FETCH === '1';
  const client = new GitHubAPIClient();
  const existingCache = loadCache();

  console.log('Extracting contributors from GitHub API...');
  console.log(`Token: ${process.env.GITHUB_TOKEN ? 'provided' : 'not provided'}`);

  let commits: GitHubCommit[];

  if (forceFullFetch || !existingCache?.lastCommitSha) {
    console.log('Performing full fetch...');
    const allCommits = await client.getAllCommits();
    commits = await fetchCommitDetails(client, allCommits);
  } else {
    console.log(`Incremental fetch since ${existingCache.lastCommitSha.slice(0, 7)}...`);
    const newCommits = await client.getCommitsSince(existingCache.lastCommitSha);

    if (newCommits.length === 0) {
      console.log('No new commits found.');
      return;
    }

    commits = await fetchCommitDetails(client, newCommits);
  }

  const { contributors, fileContributors } = processCommits(commits);

  const cache: ContributorCache = {
    generatedAt: new Date().toISOString(),
    lastCommitSha: commits[0]?.sha,
    contributors,
    fileContributors,
  };

  saveCache(cache);

  const rateLimit = client.getRateLimitInfo();
  console.log(`\nDone!`);
  console.log(`Found ${contributors.length} contributors`);
  console.log(`Mapped ${Object.keys(fileContributors).length} content files`);
  console.log(`API rate limit remaining: ${rateLimit.remaining}`);
  console.log(`Cache written to ${CACHE_PATH}`);
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
