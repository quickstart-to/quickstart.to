// Execute the same bounded teaching model used by the article; no network or customer data.
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { BASE_RECORDS, scenarioRecords, summarizeRecords, percent } from '../assets/retention-model.mjs';

const observations = [];
for (const [evidence, eligible, noTask, unknown, usedIds, independentIds] of [
  ['unknown', 5, 2, 1, ['A', 'B', 'C'], ['A', 'B']],
  ['no-task', 5, 3, 0, ['A', 'B', 'C'], ['A', 'B']],
  ['alternative', 6, 2, 0, ['A', 'B', 'C'], ['A', 'B']],
  ['assisted', 6, 2, 0, ['A', 'B', 'C', 'H'], ['A', 'B']],
  ['independent', 6, 2, 0, ['A', 'B', 'C', 'H'], ['A', 'B', 'H']],
]) {
  for (const [criterion, ids] of [['used', usedIds], ['independent', independentIds]]) {
    const result = summarizeRecords(scenarioRecords(evidence), criterion);
    assert.equal(result.total, 8);
    assert.equal(result.eligible, eligible);
    assert.equal(result.noTask, noTask);
    assert.equal(result.unknown, unknown);
    assert.equal(result.total, result.eligible + result.noTask + result.unknown);
    assert.deepEqual(result.qualifyingIds, ids);
    assert.equal(result.qualified, ids.length);
    observations.push({ evidence, criterion, ...result,
      fixedDisplay: percent(result.fixedRate), conditionalDisplay: percent(result.conditionalRate) });
  }
}
assert.equal(observations[0].fixedDisplay, '37.5%');
assert.equal(observations[0].conditionalDisplay, '60%');
assert.equal(observations[1].fixedDisplay, '25%');
assert.equal(observations[1].conditionalDisplay, '40%');
assert.equal(observations[4].conditionalDisplay, '50%');
assert.equal(observations[6].conditionalDisplay, '66.7%');
assert.equal(observations[7].conditionalDisplay, '33.3%');
assert.deepEqual(BASE_RECORDS.at(-1), { id: 'H', state: 'unknown' });
assert.deepEqual(scenarioRecords(), BASE_RECORDS);

const boundaryResults = [];
for (const [label, records] of [
  ['empty cohort', []],
  ['all unknown', [{ id: 'A', state: 'unknown' }]],
  ['no opportunity yet', [{ id: 'A', state: 'no-task' }]],
  ['opportunity but no qualifying result', [{ id: 'A', state: 'alternative' }]],
]) {
  const result = summarizeRecords(records);
  assert.equal(result.qualified, 0);
  assert.equal(result.conditionalRate, label === 'opportunity but no qualifying result' ? 0 : null);
  assert.equal(result.fixedRate, label === 'empty cohort' ? null : 0);
  boundaryResults.push({ label, ...result });
}
assert.equal(percent(null), '—');
assert.equal(percent(0), '0%');
assert.throws(() => scenarioRecords('unconfirmed-success'), RangeError);
assert.throws(() => summarizeRecords(BASE_RECORDS, 'login'), RangeError);
assert.throws(() => summarizeRecords([{ id: 'A', state: 'unknown' }, { id: 'A', state: 'independent' }]), TypeError);
assert.throws(() => summarizeRecords([{ id: 'A', state: 'invalid' }]), TypeError);
const report = { executedAt: new Date().toISOString(), runtime: process.version, passed: true,
  scope: 'Synthetic next-task records only. No customer observation, standard platform retention curve, or causal test.',
  observations, boundaryResults, rejectedInvalidInputs: 4, resetAndOriginalPreservation: true };
await writeFile(new URL('./2026-10-09-retention-result.json', import.meta.url), JSON.stringify(report, null, 2) + '\n');
console.log({ passed: true, scenarios: observations.length, boundaryCases: boundaryResults.length, rejectedInputs: 4 });
