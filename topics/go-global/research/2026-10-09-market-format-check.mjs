// Checks the article's synthetic dates and report fields; no external requests.
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { confirmReportDate, reportPreview, REPORT_LOCALES, REPORT_ZONES } from '../assets/market-format-model.mjs';

const observations = [];
for (const [input, order, expected] of [
  ['11/10/2026', '', 'choose-format'],
  ['11/10/2026', 'mdy', '2026-11-10'],
  ['11/10/2026', 'dmy', '2026-10-11'],
  ['2026-11-10', 'iso', '2026-11-10'],
  ['31/02/2026', 'dmy', 'invalid-date'],
  ['29/02/2024', 'dmy', '2024-02-29'],
  ['29/02/2026', 'dmy', 'invalid-date'],
  ['11/10/2026', 'iso', 'wrong-shape'],
  ['2026-00-10', 'iso', 'invalid-date'],
  ['2026-11-00', 'iso', 'invalid-date'],
  ['11/10/26', 'mdy', 'wrong-shape'],
  ['1899-11-10', 'iso', 'year-outside-example'],
  ['2101-11-10', 'iso', 'year-outside-example'],
]) {
  const result = confirmReportDate(input, order);
  assert.equal(result.ok ? result.iso : result.reason, expected);
  observations.push({ input, order, result });
}
const outputs = [];
for (const locale of REPORT_LOCALES) {
  for (const zone of REPORT_ZONES) {
    const result = reportPreview('11/10/2026', 'mdy', locale, zone);
    assert.equal(result.parsed.iso, '2026-11-10');
    assert.match(result.budget, /USD/);
    assert.equal(result.deadline, reportPreview('11/10/2026', 'mdy', locale, 'Europe/London').deadline);
    outputs.push({ locale, zone, ...result });
  }
}
assert.equal(outputs[0].deadline, '10 November 2026');
assert.match(outputs.find(x => x.locale === 'en-GB' && x.zone === 'America/Los_Angeles').updated, /8 Oct 2026.*17:30/);
assert.match(outputs.find(x => x.locale === 'en-GB' && x.zone === 'Asia/Tokyo').updated, /9 Oct 2026.*09:30/);
assert.equal(outputs.find(x => x.locale === 'de-DE').budget.replace(/\s/g, ' '), '1.234,50 USD');
assert.throws(() => reportPreview('11/10/2026', 'mdy', 'xx', 'Europe/London'), RangeError);
const report = { executedAt: new Date().toISOString(), runtime: process.version,
  scope: 'Synthetic date interpretation and locale/time-zone formatting only; no real client or CSV import test.',
  passed: true, observations, outputs };
await writeFile(new URL('./2026-10-09-market-format-result.json', import.meta.url), JSON.stringify(report, null, 2) + '\n');
console.log({ passed: report.passed, dateCases: observations.length, localeZoneCombinations: outputs.length });
