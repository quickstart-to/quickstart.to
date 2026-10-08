// remark plugin: turns `[^src-id]` citations into numbered superscripts and appends a
// "Sources" list, resolving each id against the topic's sources/sources.yaml.
//
// Note: GFM only parses `[^id]` as a footnote when a definition exists in the same file.
// Our definitions live in sources.yaml, so the reference survives as plain text (or as a
// footnoteReference if an author also wrote a definition) — we handle both.
import { readFileSync, existsSync } from 'node:fs';
import { join, sep, resolve } from 'node:path';
import YAML from 'yaml';

const CITE_RE = /\[\^([A-Za-z0-9][\w-]*)\]/g;
const cache = new Map();

function topicDirOf(filePath) {
  if (!filePath) return null;
  const abs = resolve(filePath);
  const marker = `${sep}topics${sep}`;
  const i = abs.lastIndexOf(marker);
  if (i < 0) return null;
  const rest = abs.slice(i + marker.length).split(sep);
  return join(abs.slice(0, i + marker.length), rest[0]);
}

function loadSources(topicDir) {
  if (cache.has(topicDir) && process.env.NODE_ENV === 'production') return cache.get(topicDir);
  const p = join(topicDir, 'sources', 'sources.yaml');
  const list = existsSync(p) ? YAML.parse(readFileSync(p, 'utf8')) ?? [] : [];
  const map = new Map(list.map((s) => [s.id, s]));
  cache.set(topicDir, map);
  return map;
}

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const dateStr = (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? ''));

export default function remarkCitations() {
  return (tree, file) => {
    const topicDir = topicDirOf(file.path ?? file.history?.[0]);
    if (!topicDir) return;
    const sources = loadSources(topicDir);
    const order = []; // cited ids in first-appearance order

    const cite = (id) => {
      if (!sources.has(id)) return null;
      if (!order.includes(id)) order.push(id);
      const n = order.indexOf(id) + 1;
      return { type: 'html', value: `<sup class="cite"><a href="#source-${esc(id)}" aria-label="source ${n}">[${n}]</a></sup>` };
    };

    const walk = (node) => {
      if (!node.children) return;
      const out = [];
      for (const child of node.children) {
        if (child.type === 'text' && CITE_RE.test(child.value)) {
          CITE_RE.lastIndex = 0;
          let last = 0;
          for (const m of child.value.matchAll(CITE_RE)) {
            const rep = cite(m[1]);
            if (!rep) continue;
            if (m.index > last) out.push({ type: 'text', value: child.value.slice(last, m.index) });
            out.push(rep);
            last = m.index + m[0].length;
          }
          if (last < child.value.length) out.push({ type: 'text', value: child.value.slice(last) });
        } else if (child.type === 'footnoteReference' && sources.has(child.identifier)) {
          out.push(cite(child.identifier));
        } else if (child.type === 'footnoteDefinition' && sources.has(child.identifier)) {
          // sources.yaml is the single source of truth; drop inline definitions.
        } else {
          walk(child);
          out.push(child);
        }
      }
      node.children = out;
    };
    walk(tree);

    if (order.length === 0) return;
    const items = order.map((id) => {
      const s = sources.get(id);
      const pub = s.publisher ? ` · ${esc(s.publisher)}` : '';
      const archive = s.archive ? ` · <a href="${esc(s.archive)}" rel="nofollow noopener">archive</a>` : '';
      return `<li id="source-${esc(id)}"><a href="${esc(s.url)}" rel="nofollow noopener">${esc(s.title || s.url)}</a>${pub} · <span data-i18n="sources.accessed">accessed</span> <time datetime="${esc(dateStr(s.accessed))}">${esc(dateStr(s.accessed))}</time>${archive}</li>`;
    });
    tree.children.push({
      type: 'html',
      value: `<section class="sources" aria-labelledby="sources-heading"><h2 id="sources-heading" data-i18n="sources.title">Sources</h2><ol>${items.join('')}</ol></section>`,
    });
  };
}
