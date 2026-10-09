#!/usr/bin/env node
// Check public Chinese copy, not code, research records, or original source excerpts.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { loadAllTopics, ROOT } from './lib/topics.mjs';
import { htmlSpacingIssues, spacingBoundaries } from './lib/typography.mjs';

const renderer = await createMarkdownProcessor({ syntaxHighlight: false, smartypants: false });
let count = 0;
const report = (where, issues) => {
  count += issues.length;
  for (const issue of issues.slice(0, 8)) console.error(`✗ ${where}: missing mixed-script space near ${issue.text}`);
  if (issues.length > 8) console.error(`  … ${issues.length - 8} more in ${where}`);
};
const checkString = (where, value) => {
  if (typeof value !== 'string') return;
  report(where, spacingBoundaries(value).map(offset => ({ text: value.slice(Math.max(0, offset - 18), offset) + '｜' + value.slice(offset, offset + 18) })));
};

for (const { dir, base, topic, pages, hasChangelog } of loadAllTopics()) {
  if (!topic?.lang?.startsWith('zh')) continue;
  for (const key of ['title', 'summary', 'audience', 'disclaimer']) checkString(`topics/${dir}/topic.yaml (${key})`, topic[key]);
  for (const page of pages) {
    const where = `topics/${dir}/${page.file}`;
    for (const key of ['title', 'description']) checkString(`${where} (${key})`, page.data[key]);
    report(where, htmlSpacingIssues((await renderer.render(page.body)).code));
  }
  if (hasChangelog) report(`topics/${dir}/CHANGELOG.md`, htmlSpacingIssues((await renderer.render(readFileSync(join(base, 'CHANGELOG.md'), 'utf8'))).code));
  for (const file of existsSync(join(base, 'assets')) ? readdirSync(join(base, 'assets')) : []) {
    if (file.endsWith('.svg')) report(`topics/${dir}/assets/${file}`, htmlSpacingIssues(readFileSync(join(base, 'assets', file), 'utf8')));
  }
}
const ui = JSON.parse(readFileSync(join(ROOT, 'site/src/i18n/zh-CN.json'), 'utf8'));
for (const [key, value] of Object.entries(ui)) checkString(`site/src/i18n/zh-CN.json (${key})`, value);
console.log(`Typography: ${count} missing mixed-script space(s).`);
process.exitCode = count ? 1 : 0;
