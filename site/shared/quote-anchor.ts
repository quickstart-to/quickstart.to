/** Conservative TextQuoteSelector relocation. Ambiguity is an old-version item, never a guess. */
export type Quote = { exact: string; prefix: string; suffix: string };
export function indexedText(raw: string) {
  let normalized = ''; const offsets: number[] = [];
  for (let i = 0; i < raw.length; i++) {
    const char = /\s/u.test(raw[i]) ? ' ' : raw[i];
    if (char === ' ' && (!normalized || normalized.endsWith(' '))) continue;
    normalized += char; offsets.push(i);
  }
  if (normalized.endsWith(' ')) { normalized = normalized.slice(0, -1); offsets.pop(); }
  return { normalized, offsets };
}
function occurrences(text: string, needle: string) {
  if (!needle) return [];
  const positions: number[] = []; let at = text.indexOf(needle);
  while (at >= 0 && positions.length < 200) { positions.push(at); at = text.indexOf(needle, at + 1); }
  return positions;
}
function distance(a: string, b: string, cap: number) {
  if (Math.abs(a.length - b.length) > cap) return cap + 1;
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) current[j] = Math.min(current[j-1]+1, previous[j]+1, previous[j-1]+Number(a[i-1] !== b[j-1]));
    if (Math.min(...current) > cap) return cap + 1;
    previous = current;
  }
  return previous[b.length];
}
export function anchorQuote(text: string, quote: Quote): { start: number; end: number; relocated: boolean } | null {
  if (!quote.exact) return null;
  const complete = quote.prefix + quote.exact + quote.suffix;
  const full = occurrences(text, complete);
  if (full.length === 1) return { start: full[0]+quote.prefix.length, end: full[0]+quote.prefix.length+quote.exact.length, relocated: false };
  if (full.length > 1) return null;
  const exact = occurrences(text, quote.exact);
  if (exact.length === 1) return { start: exact[0], end: exact[0]+quote.exact.length, relocated: true };
  // Only accept an edited quote bounded by two unchanged, unique contexts. A bare
  // fuzzy substring can silently point at a different paragraph and is unsafe.
  if (quote.exact.length < 12 || quote.prefix.length < 8 || quote.suffix.length < 8) return null;
  const prefixes = occurrences(text, quote.prefix); const suffixes = occurrences(text, quote.suffix);
  if (prefixes.length !== 1 || suffixes.length !== 1) return null;
  const start = prefixes[0]+quote.prefix.length; const end = suffixes[0];
  const cap = Math.min(12, Math.max(2, Math.floor(quote.exact.length * .1)));
  if (end <= start || Math.abs(end-start-quote.exact.length) > cap || distance(quote.exact,text.slice(start,end),cap) > cap) return null;
  return { start, end, relocated: true };
}
