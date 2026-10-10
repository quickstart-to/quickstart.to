// Keep quote validation tied to the exact HTML shipped with this Worker.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { parse } from 'parse5';
import { loadAllTopics } from './lib/topics.mjs';

const pages = {};
function find(node, predicate) {
  if (predicate(node)) return node;
  for (const child of node.childNodes ?? []) { const found = find(child, predicate); if (found) return found; }
}
function text(node) {
  if (['script', 'style'].includes(node.tagName) || node.attrs?.some(a => a.name === 'class' && a.value.split(' ').includes('sources'))) return '';
  return node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('');
}
for (const topic of loadAllTopics()) {
  for (const page of topic.pages) {
    const path = `/${topic.dir}${page.kind === 'chapter' ? `/${page.slug}` : ''}`;
    const html = readFileSync(`site/dist${path}.html`, 'utf8');
    const article = find(parse(html), node => node.attrs?.some(a => a.name === 'data-article-body'));
    if (!article) throw new Error(`Missing annotation body: ${path}`);
    pages[path] = { text: text(article).replace(/\s+/gu, ' ').trim() };
  }
}
const revision = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
mkdirSync('site/worker', { recursive: true });
writeFileSync('site/worker/content.generated.json', JSON.stringify({ revision, pages }));
console.log(`Feedback manifest: ${Object.keys(pages).length} pages at ${revision.slice(0, 7)}`);
