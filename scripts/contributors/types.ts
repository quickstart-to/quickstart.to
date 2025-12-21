export interface ContributorFile {
  path: string;
  commits: number;
  additions: number;
  deletions: number;
}

export interface Contributor {
  name: string;
  email: string;
  github?: string;
  avatar?: string;
  files: ContributorFile[];
  totalCommits: number;
  totalAdditions: number;
  totalDeletions: number;
  lastActive: string;
}

export interface ContributorCache {
  generatedAt: string;
  contributors: Contributor[];
  fileContributors: Record<string, string[]>; // filePath -> contributor emails
}
