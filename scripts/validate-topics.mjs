#!/usr/bin/env node
// Validates every topic directory against the content spec (docs/content-guide.md).
// Exit code 1 on any error; warnings are printed but do not fail the build.
import {
  loadAllTopics, SLUG_RE, RESERVED_PATHS, RESERVED_CHAPTER_SLUGS, citationIds,
} from './lib/topics.mjs';

const STATUSES = new Set(['draft', 'beta', 'stable']);
const VOLATILITY = new Set(['high', 'medium', 'low']);
const LANG_RE = /^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/; // pragmatic BCP 47 check
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`✗ ${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`! ${where}: ${msg}`);

const asDate = (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? ''));

const topics = loadAllTopics();
const slugOwners = new Map(); // top-level path -> owner description

for (const { dir, topic, sources, pages, hasChangelog } of topics) {
  const at = `topics/${dir}`;
  if (!topic) { err(at, 'missing topic.yaml'); continue; }

  // --- topic.yaml ---
  for (const k of ['slug', 'lang', 'title', 'audience', 'status']) {
    if (!topic[k]) err(`${at}/topic.yaml`, `missing required field "${k}"`);
  }
  if (topic.slug !== dir) err(`${at}/topic.yaml`, `slug "${topic.slug}" must equal directory name "${dir}"`);
  if (topic.slug && !SLUG_RE.test(topic.slug)) err(`${at}/topic.yaml`, `slug must be lowercase ASCII kebab-case`);
  if (topic.lang && !LANG_RE.test(topic.lang)) err(`${at}/topic.yaml`, `lang "${topic.lang}" is not a BCP 47 tag`);
  if (topic.status && !STATUSES.has(topic.status)) err(`${at}/topic.yaml`, `status must be one of ${[...STATUSES]}`);
  if (RESERVED_PATHS.has(topic.slug)) err(`${at}/topic.yaml`, `slug "${topic.slug}" is reserved`);

  const claim = (path, owner) => {
    const key = path.normalize('NFC').toLowerCase();
    if (RESERVED_PATHS.has(key)) return err(`${at}/topic.yaml`, `"${path}" is a reserved path`);
    if (slugOwners.has(key)) return err(`${at}/topic.yaml`, `"${path}" already used by ${slugOwners.get(key)}`);
    slugOwners.set(key, owner);
  };
  if (topic.slug) claim(topic.slug, `topic ${dir}`);
  for (const a of topic.aliases ?? []) {
    if (typeof a !== 'string' || !a.trim() || a.includes('/')) { err(`${at}/topic.yaml`, `invalid alias ${JSON.stringify(a)}`); continue; }
    claim(a, `alias of ${dir}`);
  }

  // --- sources.yaml ---
  if (!Array.isArray(sources)) { err(`${at}/sources/sources.yaml`, 'must be a YAML list'); continue; }
  const sourceIds = new Set();
  for (const [i, s] of sources.entries()) {
    const w = `${at}/sources/sources.yaml[${i}]`;
    if (!s?.id) { err(w, 'missing id'); continue; }
    if (sourceIds.has(s.id)) err(w, `duplicate id "${s.id}"`);
    sourceIds.add(s.id);
    if (!s.url || !/^https?:\/\//.test(s.url)) err(w, `"${s.id}" needs an http(s) url`);
    if (!DATE_RE.test(asDate(s.accessed))) err(w, `"${s.id}" needs accessed: YYYY-MM-DD`);
    if (!s.title) warn(w, `"${s.id}" has no title`);
  }

  // --- pages ---
  if (!pages.some((p) => p.kind === 'quickstart')) err(at, 'missing quickstart.md');
  if (!hasChangelog) err(at, 'missing CHANGELOG.md');
  const usedSources = new Set();
  const chapterSlugs = new Set();
  const orders = new Set();

  for (const p of pages) {
    const w = `${at}/${p.file}`;
    const d = p.data ?? {};
    if (!d.title) err(w, 'frontmatter missing title');

    const refs = citationIds(p.body);
    refs.forEach((id) => usedSources.add(id));
    for (const id of new Set(refs)) if (!sourceIds.has(id)) err(w, `citation [^${id}] not found in sources.yaml`);

    // Draft topics may contain placeholder pages; everything else must carry verification metadata.
    const strict = topic.status !== 'draft';
    if (d.volatility !== undefined && !VOLATILITY.has(d.volatility)) err(w, `volatility must be one of ${[...VOLATILITY]}`);
    if (d.last_verified !== undefined && !DATE_RE.test(asDate(d.last_verified))) err(w, 'last_verified must be YYYY-MM-DD');
    if (strict) {
      if (!d.volatility) err(w, 'frontmatter missing volatility');
      if (!d.last_verified) err(w, 'frontmatter missing last_verified');
      if (d.volatility === 'high' && refs.length === 0) err(w, 'volatility: high pages must cite at least one source');
    }

    if (p.kind === 'chapter') {
      if (!SLUG_RE.test(p.slug)) err(w, `chapter slug "${p.slug}" must be lowercase ASCII kebab-case`);
      if (RESERVED_CHAPTER_SLUGS.has(p.slug)) err(w, `chapter slug "${p.slug}" is reserved`);
      if (chapterSlugs.has(p.slug)) err(w, `duplicate chapter slug "${p.slug}"`);
      chapterSlugs.add(p.slug);
      if (typeof d.order !== 'number') err(w, 'frontmatter missing numeric order');
      else if (orders.has(d.order)) err(w, `duplicate order ${d.order}`);
      else orders.add(d.order);
    }
  }
  for (const id of sourceIds) if (!usedSources.has(id)) warn(`${at}/sources/sources.yaml`, `source "${id}" is never cited`);
}

for (const w of warnings) console.warn(w);
for (const e of errors) console.error(e);
console.log(`\nvalidated ${topics.length} topic(s): ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
