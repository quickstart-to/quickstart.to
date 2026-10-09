// Run with Node.js 22+. No account, external request, payment or email is used.
import assert from 'node:assert/strict';
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { initialDeliveryState, deliveryEvent, applyDeliveryEvent, activeOrders, refundTotal, DELIVERY_NOW } from './payment-delivery-model.mjs';

const demoSecret = randomBytes(32);
const signatureFor = raw => createHmac('sha256', demoSecret).update(raw).digest('hex');
let state = initialDeliveryState();
const observations = [];

function receive(raw, signature) {
  // HMAC protects the exact raw bytes; the payload below is our own teaching format.
  if (typeof signature !== 'string' || !/^[a-f0-9]{64}$/i.test(signature)) return { result: 'invalid-signature' };
  if (!timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(signatureFor(raw), 'hex'))) {
    return { result: 'invalid-signature' };
  }
  let event;
  try { event = JSON.parse(raw); } catch { return { result: 'invalid-json' }; }
  const outcome = applyDeliveryEvent(state, event);
  state = outcome.state;
  return { result: outcome.result, reason: outcome.reason };
}

function send(event) {
  const raw = JSON.stringify(event);
  return receive(raw, signatureFor(raw));
}

function record(step, outcome, now = DELIVERY_NOW, orderId = 'demo-001') {
  const order = state.orders.find(order => order.id === orderId);
  observations.push({ step, ...outcome, order: orderId, checkedAt: new Date(now).toISOString(),
    grants: order.grants, refundedCents: refundTotal(order),
    activeA: activeOrders(state, 'A', now).map(order => order.id), activeB: activeOrders(state, 'B', now).length,
    expiresAt: order.expiresAt === null ? null : new Date(order.expiresAt).toISOString() });
}

const before = structuredClone(state);
record('success-page-only', { result: 'no-server-event' });
assert.deepEqual(state, before);
const paid = deliveryEvent('event-1', 'payment-confirmed', { claimedUser: 'B' });
const raw = JSON.stringify(paid);
const badSignature = receive(`${raw} `, signatureFor(raw));
assert.equal(badSignature.result, 'invalid-signature');
assert.deepEqual(state, before);
record('raw-body-changed', badSignature);
for (const [field, value] of [['product', 'other-product'], ['environment', 'production'], ['currency', 'EUR'], ['amount', 1999], ['amount', 0], ['order', 'unknown-order']]) {
  assert.equal(send({ ...paid, [field]: value }).result, 'rejected');
  assert.deepEqual(state, before);
}
record('wrong-binding-rejected', { result: 'rejected' });
assert.equal(send(paid).result, 'granted');
assert.equal(activeOrders(state, 'A').length, 1);
assert.equal(activeOrders(state, 'B').length, 0);
record('verified-payment', { result: 'granted-to-bound-user-A' });
const expiry = state.orders[0].expiresAt;
assert.equal(send(paid).result, 'duplicate-event');
assert.equal(send({ ...paid, id: 'event-2', at: DELIVERY_NOW }).result, 'duplicate-order');
assert.equal(state.orders[0].expiresAt, expiry);
assert.equal(state.orders[0].grants, 1);
record('duplicate-event-and-order', { result: 'no-extension' });

const directory = await mkdtemp(join(tmpdir(), 'quickstart-payment-'));
await writeFile(join(directory, 'state.json'), JSON.stringify(state, null, 2));
state = JSON.parse(await readFile(join(directory, 'state.json'), 'utf8'));
assert.equal(send(paid).result, 'duplicate-event');
record('reload-saved-state', { result: 'still-deduplicated' });

const partial = deliveryEvent('event-3', 'refund-confirmed', { refund: 'refund-1', amount: 500 });
assert.equal(send(partial).result, 'partially-refunded');
assert.equal(send({ ...partial, id: 'event-4' }).result, 'duplicate-refund');
assert.equal(refundTotal(state.orders[0]), 500);
assert.equal(activeOrders(state, 'A').length, 1);
record('partial-refund-and-redelivery', { result: 'access-retained-by-example-policy' });
const beforeInvalidRefund = structuredClone(state);
assert.equal(send({ ...partial, id: 'conflicting-refund', amount: 400 }).result, 'rejected');
assert.equal(send({ ...partial, id: 'excess-refund', refund: 'refund-excess', amount: 2000 }).result, 'rejected');
assert.deepEqual(state, beforeInvalidRefund);
record('conflicting-or-excess-refund', { result: 'rejected-with-state-preserved' });
const full = deliveryEvent('event-5', 'refund-confirmed', { refund: 'refund-2', amount: 1500 });
assert.equal(send(full).result, 'fully-refunded');
assert.equal(send({ ...paid, id: 'event-6' }).result, 'duplicate-order');
assert.equal(activeOrders(state, 'A').length, 0);
record('full-refund-then-old-payment', { result: 'no-restored-access' });

assert.equal(send(deliveryEvent('event-7', 'payment-confirmed', { order: 'demo-002', at: Date.parse('2026-10-12T00:00:00Z') })).result, 'granted');
assert.equal(send({ ...full, id: 'event-8' }).result, 'duplicate-refund');
assert.deepEqual(activeOrders(state, 'A').map(order => order.id), ['demo-002']);
record('old-order-refund-with-another-valid-pass', { result: 'other-pass-unaffected' });
const currentPass = state.orders[1];
assert.equal(activeOrders(state, 'A', currentPass.expiresAt).length, 0);
record('exact-expiry-boundary', { result: 'no-access-at-expiry' }, currentPass.expiresAt, currentPass.id);

state = initialDeliveryState();
assert.equal(send(deliveryEvent('early-refund', 'refund-confirmed', { refund: 'refund-early' })).result, 'fully-refunded');
assert.equal(send(paid).result, 'payment-recorded-refund-retained');
assert.equal(activeOrders(state, 'A').length, 0);
assert.equal(state.orders[0].grants, 0);
record('refund-delivered-before-payment', { result: 'no-transient-access' });
assert.equal(send(deliveryEvent('review-payment', 'payment-confirmed', { order: 'demo-review', amount: 0 })).result, 'granted');
assert.equal(activeOrders(state, 'reviewer').length, 1);
record('server-approved-zero-total', { result: 'review-access-with-zero-receipt', receiptCents: 0,
  reviewerActive: activeOrders(state, 'reviewer').length }, DELIVERY_NOW, 'demo-review');

state = initialDeliveryState();
assert.equal(send(deliveryEvent('expired-payment', 'payment-confirmed', { at: Date.parse('2026-09-01T00:00:00Z') })).result, 'payment-recorded-expired');
assert.equal(state.orders[0].grants, 0);
assert.equal(activeOrders(state, 'A').length, 0);
record('payment-delivered-after-expiry', { result: 'historical-payment-without-new-access' });

const report = { executedAt: new Date().toISOString(), runtime: process.version,
  scope: 'Local HMAC verification and a synthetic, sequential delivery model; not a provider integration, database concurrency or real payment test.',
  passed: true, observations };
await writeFile(join(directory, 'result.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ ...report, resultFile: join(directory, 'result.json') }, null, 2));
