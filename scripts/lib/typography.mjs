import { parseFragment } from 'parse5';

const BLOCKS = new Set('address article aside blockquote br caption dd details div dl dt figcaption figure footer form h1 h2 h3 h4 h5 h6 header hr li main nav ol p section summary table tbody td th thead tr ul text title desc'.split(' '));
const SKIP_BLOCKS = new Set('pre script style textarea blockquote'.split(' '));
const VERBATIM = new Set('code kbd samp q'.split(' '));
const LABELS = new Set(['alt', 'title', 'aria-label', 'placeholder']);
const BOUNDARY = /(?<=\p{Script=Han})(?=[\p{Script=Latin}0-9])|(?<=[\p{Script=Latin}0-9])(?=\p{Script=Han})/gu;

/** Offsets of missing spaces; quoted wording and literal URLs stay untouched. */
export function spacingBoundaries(text) {
  const prose = text.replace(/“[^”]*”|‘[^’]*’|https?:\/\/[^\s<>]+/gu, match => ' '.repeat(match.length));
  return [...prose.matchAll(BOUNDARY)].map(match => match.index);
}

function runBoundaries(run) {
  let start = 0;
  const protectedRanges = run.flatMap(part => {
    const end = start + part.text.length;
    const ranges = part.verbatim ? [[start, end]] : [];
    start = end;
    return ranges;
  });
  return spacingBoundaries(run.map(part => part.text).join('')).filter(i => !protectedRanges.some(([a, b]) => i > a && i < b));
}

/** Read text across inline elements, but never concatenate separate blocks. */
export function htmlTextRuns(html) {
  const root = parseFragment(html);
  const runs = [];
  let current = [];
  const flush = () => { if (current.length) runs.push(current); current = []; };
  const plain = node => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(plain).join('');
  const walk = node => {
    const tag = node.tagName;
    const attrs = Object.fromEntries((node.attrs ?? []).map(a => [a.name, a.value]));
    if (SKIP_BLOCKS.has(tag) || attrs.class?.split(/\s+/).includes('sources')) { flush(); return; }
    if (BLOCKS.has(tag)) flush();
    if (VERBATIM.has(tag) || attrs['data-typography'] === 'verbatim') {
      current.push({ text: plain(node), verbatim: true });
      if (BLOCKS.has(tag)) flush();
      return;
    }
    if (tag === 'a' && /^https?:/.test(attrs.href ?? '') && plain(node).trim() === attrs.href) { flush(); return; }
    for (const attr of node.attrs ?? []) {
      if (!LABELS.has(attr.name)) continue;
      runs.push([{ text: attr.value, attribute: attr.name }]);
    }
    if (node.nodeName === '#text') current.push({ text: node.value });
    for (const child of node.childNodes ?? []) walk(child);
    if (BLOCKS.has(tag)) flush();
  };
  walk(root);
  flush();
  return runs;
}

export function htmlSpacingIssues(html) {
  return htmlTextRuns(html).flatMap(run => {
    const text = run.map(part => part.text).join('');
    return runBoundaries(run).map(offset => ({
      text: text.slice(Math.max(0, offset - 18), offset) + '｜' + text.slice(offset, offset + 18),
      attribute: run[0]?.attribute,
    }));
  });
}
