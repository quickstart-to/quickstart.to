// Shared helpers for reading the topics/ tree. Used by validate + redirect generation.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const TOPICS_DIR = join(ROOT, 'topics');

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// Top-level paths the site/API owns. Topic slugs and aliases must not collide with these.
export const RESERVED_PATHS = new Set([
  'api', 'admin', 'auth', 'login', 'logout', 'account', 'settings', 'about', 'privacy',
  'terms', 'search', 'topics', 'feed', 'rss', 'sitemap', 'assets', 'static', '_astro',
  'favicon', 'robots', 'en', 'zh', 'zh-cn', 't',
]);
// Chapter slugs reserved inside a topic.
export const RESERVED_CHAPTER_SLUGS = new Set(['changelog', 'sources', 'outline', 'quickstart']);

/** Split `---\nyaml\n---\nbody` into { data, body }. */
export function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: text };
  return { data: YAML.parse(m[1]) ?? {}, body: m[2] };
}

/** Chapter slug: explicit frontmatter `slug`, else filename without `NN-` prefix. */
export function chapterSlug(file, data) {
  if (data?.slug) return String(data.slug);
  return file.replace(/\.md$/, '').replace(/^\d+-/, '');
}

/** Citation references in Markdown body: [^src-id] */
export function citationIds(body) {
  return [...body.matchAll(/\[\^([A-Za-z0-9][\w-]*)\]/g)].map((m) => m[1]);
}

export function listTopicDirs() {
  if (!existsSync(TOPICS_DIR)) return [];
  return readdirSync(TOPICS_DIR)
    .filter((d) => !d.startsWith('.') && !d.startsWith('_'))
    .filter((d) => statSync(join(TOPICS_DIR, d)).isDirectory())
    .sort();
}

export function loadTopic(dir) {
  const base = join(TOPICS_DIR, dir);
  const read = (p) => readFileSync(join(base, p), 'utf8');
  const has = (p) => existsSync(join(base, p));

  const topic = has('topic.yaml') ? YAML.parse(read('topic.yaml')) ?? {} : null;
  const sources = has('sources/sources.yaml') ? YAML.parse(read('sources/sources.yaml')) ?? [] : [];

  const pages = [];
  if (has('quickstart.md')) {
    pages.push({ kind: 'quickstart', file: 'quickstart.md', ...parseFrontmatter(read('quickstart.md')) });
  }
  if (has('chapters')) {
    for (const f of readdirSync(join(base, 'chapters')).filter((f) => f.endsWith('.md')).sort()) {
      const parsed = parseFrontmatter(read(join('chapters', f)));
      pages.push({ kind: 'chapter', file: `chapters/${f}`, slug: chapterSlug(f, parsed.data), ...parsed });
    }
  }
  return { dir, base, topic, sources, pages, hasChangelog: has('CHANGELOG.md') };
}

export function loadAllTopics() {
  return listTopicDirs().map(loadTopic);
}
