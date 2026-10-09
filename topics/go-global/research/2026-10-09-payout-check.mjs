import assert from 'node:assert/strict';
import fs from 'node:fs';
import { reconcile, settlement as s } from '../assets/payout-model.mjs';
const results = [];
for (const evidence of ['unknown', 'rate', 'complete']) {
  const before = reconcile('before', evidence);
  const sent = reconcile('sent', evidence);
  for (const result of [before, sent]) {
    assert.equal(result.sent, 33300);
    assert.equal(result.exchangeAmount, 33000);
    assert.equal(s.opening + s.payments, s.tax + s.transactionFees + s.refunds + s.held + s.payoutFee + result.sent);
    assert.equal(result.startAmount - result.remainingPlatformFee, result.sent);
  }
  assert.equal(before.remainingPlatformFee, 700);
  assert.equal(sent.remainingPlatformFee, 0);
  assert.equal(before.explainedCredit, sent.explainedCredit);
  if (evidence === 'unknown') {
    assert.equal(before.converted, null);
    assert.equal(before.difference, null);
    assert.equal(before.complete, false);
  } else {
    assert.equal(before.converted, 237600);
    assert.equal(before.difference, evidence === 'complete' ? 0 : 1500);
    assert.equal(before.explainedCredit, evidence === 'complete' ? 236100 : 237600);
    assert.equal(before.complete, evidence === 'complete');
  }
  results.push({ evidence, before, sent });
}
for (const [start, evidence] of [['balance','rate'], ['sent','invented'], ['', 'unknown'], [null, 'complete']]) {
  assert.throws(() => reconcile(start, evidence), RangeError);
}
const result = { executedAt: new Date().toISOString(), runtime: process.version, teachingOnly: true, scenarios: 6, invalidRejections: 4, checks: ['cash conservation including held funds', 'same result from before-fee and sent documents', 'unknown exchange rate remains null, never zero', 'known FX without local charge leaves 15 CNY unexplained', 'confirmed local charge reconciles to 2361 CNY'], results };
fs.writeFileSync(new URL('./2026-10-09-payout-result.json', import.meta.url), JSON.stringify(result, null, 2) + '\n');
console.log({ scenarios: result.scenarios, invalidRejections: result.invalidRejections, checks: result.checks });
