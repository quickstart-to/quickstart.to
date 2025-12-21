export interface ContributorFile {
  path: string;
  commits: number;
  additions: number;
  deletions: number;
}

export interface Contributor {
  login: string;
  name: string;
  avatar: string;
  htmlUrl: string;
  files: ContributorFile[];
  totalCommits: number;
  totalAdditions: number;
  totalDeletions: number;
  lastActive: string;
}

export interface ContributorCache {
  generatedAt: string;
  lastCommitSha?: string;
  contributors: Contributor[];
  fileContributors: Record<string, string[]>; // filePath -> contributor logins
}
