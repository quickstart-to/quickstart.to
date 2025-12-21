import { execSync } from 'child_process';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { Contributor, ContributorCache, ContributorFile } from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_PATH = join(__dirname, 'cache.json');
const CONTENT_GLOB = 'src/content/**/*.md';

function exec(cmd: string): string {
  try {
    return execSync(cmd, { encoding: 'utf-8', cwd: process.cwd() }).trim();
  } catch {
    return '';
  }
}

function parseMailmap(): Map<string, string> {
  const mailmapPath = join(process.cwd(), '.mailmap');
  const map = new Map<string, string>();

  if (!existsSync(mailmapPath)) {
    return map;
  }

  const content = readFileSync(mailmapPath, 'utf-8');
  const lines = content.split('\n').filter((l) => l.trim() && !l.startsWith('#'));

  for (const line of lines) {
    // Format: Proper Name <proper@email> <commit@email>
    const match = line.match(/<([^>]+)>\s+<([^>]+)>/);
    if (match) {
      map.set(match[2], match[1]);
    }
  }

  return map;
}

function getGitHubFromEmail(email: string): string | undefined {
  // GitHub noreply format: username@users.noreply.github.com
  const match = email.match(/^([^@]+)@users\.noreply\.github\.com$/);
  if (match) {
    return match[1];
  }

  // Also check for number+username format
  const match2 = email.match(/^\d+\+([^@]+)@users\.noreply\.github\.com$/);
  if (match2) {
    return match2[1];
  }

  return undefined;
}

function getContributors(): Contributor[] {
  const mailmap = parseMailmap();
  const contributorMap = new Map<string, Contributor>();

  // Get all commits with file stats for content files
  const logOutput = exec(
    `git log --format='COMMIT:%an|%ae|%aI' --numstat -- '${CONTENT_GLOB}'`
  );

  if (!logOutput) {
    console.log('No git history found for content files');
    return [];
  }

  let currentAuthor: { name: string; email: string; date: string } | null = null;

  for (const line of logOutput.split('\n')) {
    if (line.startsWith('COMMIT:')) {
      const parts = line.slice(7).split('|');
      if (parts.length >= 3) {
        currentAuthor = {
          name: parts[0],
          email: mailmap.get(parts[1]) ?? parts[1],
          date: parts[2],
        };
      }
    } else if (currentAuthor && line.trim()) {
      const [additions, deletions, filePath] = line.split('\t');
      if (!filePath || !filePath.startsWith('src/content/')) continue;

      const email = currentAuthor.email;
      let contributor = contributorMap.get(email);

      if (!contributor) {
        contributor = {
          name: currentAuthor.name,
          email,
          github: getGitHubFromEmail(email),
          files: [],
          totalCommits: 0,
          totalAdditions: 0,
          totalDeletions: 0,
          lastActive: currentAuthor.date,
        };
        contributorMap.set(email, contributor);
      }

      // Update last active
      if (currentAuthor.date > contributor.lastActive) {
        contributor.lastActive = currentAuthor.date;
      }

      // Find or create file entry
      let fileEntry = contributor.files.find((f) => f.path === filePath);
      if (!fileEntry) {
        fileEntry = { path: filePath, commits: 0, additions: 0, deletions: 0 };
        contributor.files.push(fileEntry);
      }

      const add = parseInt(additions) || 0;
      const del = parseInt(deletions) || 0;

      fileEntry.commits++;
      fileEntry.additions += add;
      fileEntry.deletions += del;

      contributor.totalCommits++;
      contributor.totalAdditions += add;
      contributor.totalDeletions += del;
    }
  }

  // Set avatar URLs for GitHub users
  for (const contributor of contributorMap.values()) {
    if (contributor.github) {
      contributor.avatar = `https://github.com/${contributor.github}.png?size=80`;
    }
  }

  // Sort by total commits (descending)
  return Array.from(contributorMap.values()).sort(
    (a, b) => b.totalCommits - a.totalCommits
  );
}

function buildFileContributorMap(contributors: Contributor[]): Record<string, string[]> {
  const fileMap: Record<string, Set<string>> = {};

  for (const contributor of contributors) {
    for (const file of contributor.files) {
      if (!fileMap[file.path]) {
        fileMap[file.path] = new Set();
      }
      fileMap[file.path].add(contributor.email);
    }
  }

  // Convert Sets to Arrays and sort by contribution
  const result: Record<string, string[]> = {};
  for (const [path, emails] of Object.entries(fileMap)) {
    result[path] = Array.from(emails);
  }

  return result;
}

function main() {
  console.log('Extracting contributors from git history...');

  const contributors = getContributors();
  const fileContributors = buildFileContributorMap(contributors);

  const cache: ContributorCache = {
    generatedAt: new Date().toISOString(),
    contributors,
    fileContributors,
  };

  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));

  console.log(`Found ${contributors.length} contributors`);
  console.log(`Mapped ${Object.keys(fileContributors).length} content files`);
  console.log(`Cache written to ${CACHE_PATH}`);
}

main();
