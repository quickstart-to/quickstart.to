// Node.js 22+. S-02 teaching contract only: no network, card, account or email.
// Inputs are already verified facts in our own format, NOT Creem webhook payloads.
// Fixed monthly invoices are pre-bound by the server. No trial, proration,
// subscription resumption, partial refund or concurrent database implementation.
import assert from 'node:assert/strict';

const time = value => Date.parse(value);
const OCT = time('2026-10-01T00:00:00Z');
const NOV = time('2026-11-01T00:00:00Z');
const GRACE_END = time('2026-11-04T00:00:00Z');
const DEC = time('2026-12-01T00:00:00Z');
const iso = value => value === null ? null : new Date(value).toISOString();
const initial = () => ({
  user: 'synthetic-user-A', subscription: 'S-02', environment: 'synthetic',
  canceledAt: null, seen: {},
  invoices: [
    { id: 'S02-OCT', start: OCT, end: NOV, amount: 2000, currency: 'USD', paid: false, failed: false, refunded: false },
    { id: 'S02-NOV', start: NOV, end: DEC, amount: 2000, currency: 'USD', paid: false, failed: false, refunded: false },
  ],
});
function event(id, kind, invoice = 'S02-NOV', extra = {}) {
  return { id, kind, invoice, subscription: 'S-02', environment: 'synthetic', ...extra };
}
function apply(state, fact) {
  const fingerprint = JSON.stringify(fact);
  if (!fact.id || fact.subscription !== state.subscription || fact.environment !== state.environment) return 'rejected-binding';
  if (Object.hasOwn(state.seen, fact.id)) return state.seen[fact.id] === fingerprint ? 'duplicate' : 'conflicting-event';
  if (fact.kind === 'cancel-at-period-end') {
    // This fact means cancellation was confirmed, not merely clicked/requested.
    // S-02 has no resume path; real integrations must reconcile later plan changes.
    if (fact.end !== DEC) return 'rejected-period';
    state.canceledAt = fact.end;
  } else {
    const invoice = state.invoices.find(item => item.id === fact.invoice);
    if (!invoice) return 'rejected-invoice';
    if (fact.kind === 'paid' || fact.kind === 'full-refund') {
      if (fact.amount !== invoice.amount || fact.currency !== invoice.currency || fact.start !== invoice.start || fact.end !== invoice.end) return 'rejected-period-or-amount';
      if (fact.kind === 'paid') invoice.paid = true;
      else invoice.refunded = true;
    } else if (fact.kind === 'failed') invoice.failed = true;
    else if (fact.kind !== 'expired') return 'rejected-kind';
    // Expiry is computed from periods and current time, not a global off switch.
  }
  state.seen[fact.id] = fingerprint;
  return 'recorded';
}
function payment(id, invoice = 'S02-NOV', kind = 'paid') {
  return event(id, kind, invoice, { amount: 2000, currency: 'USD', start: invoice === 'S02-OCT' ? OCT : NOV, end: invoice === 'S02-OCT' ? NOV : DEC });
}
function access(state, now) {
  if (state.canceledAt !== null && now >= state.canceledAt) return { mode: 'limited', until: null };
  const current = state.invoices.find(item => now >= item.start && now < item.end);
  if (!current || current.refunded) return { mode: 'limited', until: null };
  if (current.paid) return { mode: 'paid', until: current.end };
  const previous = state.invoices.find(item => item.end === current.start && item.paid && !item.refunded);
  if (current.failed && previous && now < current.start + 72 * 60 * 60 * 1000) {
    return { mode: 'grace', until: Math.min(current.end, current.start + 72 * 60 * 60 * 1000) };
  }
  return { mode: 'limited', until: null };
}
let state = initial();
const observations = [];
function record(step, now) {
  const view = access(state, now);
  observations.push({ step, checkedAt: iso(now), access: view.mode, until: iso(view.until),
    paidInvoices: state.invoices.filter(item => item.paid).map(item => item.id),
    refundedInvoices: state.invoices.filter(item => item.refunded).map(item => item.id),
    cancelAt: iso(state.canceledAt) });
}

assert.equal(apply(state, payment('oct-paid', 'S02-OCT')), 'recorded');
assert.equal(access(state, NOV - 1).mode, 'paid');
record('October paid period', OCT);
assert.equal(apply(state, event('nov-failed', 'failed')), 'recorded');
assert.equal(access(state, NOV).mode, 'grace');
assert.equal(access(state, GRACE_END - 1).mode, 'grace');
record('Renewal failed; 72-hour application grace', NOV);
assert.equal(access(state, GRACE_END).mode, 'limited');
record('Grace ends exactly at boundary', GRACE_END);
// Updating a card or returning from the portal does not itself create a fact.
assert.equal(access(state, time('2026-11-04T08:00:00Z')).mode, 'limited');
record('Card updated; payment still unconfirmed', time('2026-11-04T08:00:00Z'));
const novPaid = payment('nov-paid');
assert.equal(apply(state, novPaid), 'recorded');
assert.deepEqual(access(state, time('2026-11-04T08:05:00Z')), { mode: 'paid', until: DEC });
record('Payment confirmed for November, not a new 30 days', time('2026-11-04T08:05:00Z'));
assert.equal(apply(state, novPaid), 'duplicate');
assert.equal(apply(state, payment('nov-paid-again')), 'recorded');
apply(state, event('late-oct-expired', 'expired', 'S02-OCT'));
apply(state, event('late-nov-failure', 'failed'));
apply(state, payment('oct-full-refund', 'S02-OCT', 'full-refund'));
assert.deepEqual(access(state, time('2026-11-05T00:00:00Z')), { mode: 'paid', until: DEC });
assert.equal(state.invoices.filter(item => item.id === 'S02-NOV' && item.paid).length, 1);
record('Duplicates, stale failure/expiry and October refund', time('2026-11-05T00:00:00Z'));
// A restart retaining the ledger must retain refund and duplicate facts too.
state = JSON.parse(JSON.stringify(state));
assert.equal(apply(state, novPaid), 'duplicate');
assert.equal(apply(state, { ...novPaid, invoice: 'S02-OCT' }), 'conflicting-event');
const before = structuredClone(state);
for (const invalid of [payment('bad-total'), payment('bad-period'), payment('bad-currency'), payment('bad-invoice'), payment('bad-environment')]) {
  if (invalid.id === 'bad-total') invalid.amount = 0;
  if (invalid.id === 'bad-period') invalid.end = DEC + 86400000;
  if (invalid.id === 'bad-currency') invalid.currency = 'EUR';
  if (invalid.id === 'bad-invoice') invalid.invoice = 'unknown';
  if (invalid.id === 'bad-environment') invalid.environment = 'production';
  assert.match(apply(state, invalid), /^rejected/);
  assert.deepEqual(state, before);
}

const refundBranch = structuredClone(state);
apply(refundBranch, payment('nov-refund', 'S02-NOV', 'full-refund'));
apply(refundBranch, payment('late-nov-paid'));
assert.equal(access(refundBranch, NOV + 1000).mode, 'limited'); // No accidental grace after full refund.
assert.equal(access(refundBranch, time('2026-11-05T00:00:00Z')).mode, 'limited');
const refundFirst = initial();
apply(refundFirst, payment('refund-first', 'S02-NOV', 'full-refund'));
apply(refundFirst, payment('paid-after-refund'));
assert.equal(access(refundFirst, time('2026-11-05T00:00:00Z')).mode, 'limited');

apply(state, event('cancel-confirmed', 'cancel-at-period-end', undefined, { end: DEC }));
assert.equal(access(state, DEC - 1).mode, 'paid');
record('Period-end cancellation confirmed', time('2026-11-20T00:00:00Z'));
assert.equal(access(state, DEC).mode, 'limited');
record('December: no paid period and cancellation reached', DEC);
console.log(JSON.stringify({ example: 'S-02 synthetic monthly subscription', passed: true,
  observations, branches: { currentFullRefund: 'limited; old paid fact cannot reopen', refundBeforePayment: 'limited', invalidBinding: 'rejected without mutation' },
  limits: 'Local sequential ledger only; no provider calls, scheduler, production adapter, concurrent storage or real delivery.' }, null, 2));
