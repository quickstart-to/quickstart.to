const GITHUB_API_BASE = 'https://api.github.com';
const OWNER = 'quickstart-to';
const REPO = 'quickstart.to';

export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface GitHubCommitAuthor {
  name: string;
  email: string;
  date: string;
}

export interface GitHubFile {
  filename: string;
  status: 'added' | 'modified' | 'removed' | 'renamed';
  additions: number;
  deletions: number;
  changes: number;
}

export interface GitHubCommit {
  sha: string;
  commit: {
    author: GitHubCommitAuthor;
    message: string;
  };
  author: GitHubUser | null;
  stats?: {
    additions: number;
    deletions: number;
    total: number;
  };
  files?: GitHubFile[];
}

interface RateLimitInfo {
  remaining: number;
  reset: number;
}

export class GitHubAPIClient {
  private token?: string;
  private rateLimit: RateLimitInfo = { remaining: 60, reset: 0 };

  constructor() {
    this.token = process.env.GITHUB_TOKEN;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private updateRateLimit(headers: Headers): void {
    const remaining = headers.get('x-ratelimit-remaining');
    const reset = headers.get('x-ratelimit-reset');

    if (remaining) {
      this.rateLimit.remaining = parseInt(remaining, 10);
    }
    if (reset) {
      this.rateLimit.reset = parseInt(reset, 10) * 1000;
    }
  }

  private async waitForRateLimit(): Promise<void> {
    if (this.rateLimit.remaining <= 1) {
      const waitTime = this.rateLimit.reset - Date.now();
      if (waitTime > 0) {
        console.log(`Rate limit reached. Waiting ${Math.ceil(waitTime / 1000)}s...`);
        await this.sleep(waitTime + 1000);
      }
    }
  }

  async request<T>(endpoint: string, retries = 3): Promise<T> {
    await this.waitForRateLimit();

    for (let attempt = 1; attempt <= retries; attempt++) {
      const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
        headers: this.getHeaders(),
      });

      this.updateRateLimit(response.headers);

      if (response.ok) {
        return response.json() as Promise<T>;
      }

      if (response.status === 409) {
        // 409 Conflict - Empty repository
        console.warn('Repository is empty or not yet pushed to GitHub');
        return [] as T;
      }

      if (response.status === 404) {
        // Repository not found
        console.warn('Repository not found on GitHub');
        return [] as T;
      }

      if (response.status === 403 || response.status === 429) {
        // Rate limited
        await this.waitForRateLimit();
        continue;
      }

      if (response.status >= 500 && attempt < retries) {
        // Server error, retry with exponential backoff
        await this.sleep(Math.pow(2, attempt) * 1000);
        continue;
      }

      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    throw new Error('Max retries exceeded');
  }

  async getCommits(page = 1, perPage = 100): Promise<GitHubCommit[]> {
    return this.request<GitHubCommit[]>(
      `/repos/${OWNER}/${REPO}/commits?per_page=${perPage}&page=${page}`
    );
  }

  async getCommitDetail(sha: string): Promise<GitHubCommit> {
    return this.request<GitHubCommit>(`/repos/${OWNER}/${REPO}/commits/${sha}`);
  }

  async getAllCommits(): Promise<GitHubCommit[]> {
    const allCommits: GitHubCommit[] = [];
    let page = 1;

    while (true) {
      console.log(`Fetching commits page ${page}...`);
      const commits = await this.getCommits(page);

      if (commits.length === 0) break;

      allCommits.push(...commits);

      if (commits.length < 100) break;
      page++;
    }

    return allCommits;
  }

  async getCommitsSince(lastSha: string): Promise<GitHubCommit[]> {
    const newCommits: GitHubCommit[] = [];
    let page = 1;

    fetchLoop: while (true) {
      console.log(`Fetching commits page ${page}...`);
      const commits = await this.getCommits(page);

      if (commits.length === 0) break;

      for (const commit of commits) {
        if (commit.sha === lastSha) {
          break fetchLoop;
        }
        newCommits.push(commit);
      }

      if (commits.length < 100) break;
      page++;
    }

    return newCommits;
  }

  getRateLimitInfo(): RateLimitInfo {
    return { ...this.rateLimit };
  }
}
