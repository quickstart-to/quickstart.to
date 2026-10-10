// M-01: synthetic task attempts, not people; all amounts in USD cents.
export const cutoff = '2026-10-08T00:00:00Z';
export const revisedCutoff = '2026-10-09T00:00:00Z';
const at = '2026-10-07T10:00:00Z';
const make = (id, kind, task, extra = {}) => ({ event_id: id, kind, task_id: task, schema: 2, env: 'production', occurred_at: at, ...extra });
const rows = [];
const add = (event, channel = 'browser', received_at = '2026-10-07T10:01:00Z') => rows.push({ event, channel, received_at });
add(make('a-start', 'task_started', 'A'));
add(make('a-ready', 'export_ready', 'A'));
add(make('a-ready', 'export_ready', 'A'));
add(make('b-start', 'task_started', 'B'));
add(make('b-old', 'export_ready', 'B', { schema: 1 }));
add(make('c-start', 'task_started', 'C'));
add(make('c-late', 'export_ready', 'C'), 'browser', '2026-10-08T09:00:00Z');
add(make('d-start', 'task_started', 'D'));
add(make('d-block', 'validation_blocked', 'D'));
add(make('e-start', 'task_started', 'E'));
add(make('e-ready', 'export_ready', 'E'));
add(make('f-start', 'task_started', 'F'));
add(make('t-start', 'task_started', 'T', { env: 'test' }));
add(make('t-ready', 'export_ready', 'T', { env: 'test' }));
add(make('o1-refund', 'refund_confirmed', 'A', { record_id: 'R1', order_id: 'O1', amount: 2000 }), 'ledger');
add(make('o1-paid', 'payment_confirmed', 'A', { record_id: 'P1', order_id: 'O1', amount: 2000 }), 'ledger');
add(make('o1-paid', 'payment_confirmed', 'A', { record_id: 'P1', order_id: 'O1', amount: 2000 }), 'ledger');
add(make('o2-paid', 'payment_confirmed', 'E', { record_id: 'P2', order_id: 'O2', amount: 2000 }), 'ledger');
// Synthetic canary: this field must be rejected, never silently stripped.
add(make('bad-field', 'export_ready', 'F', { file_name: 'SYNTHETIC-DO-NOT-COLLECT.csv' }));
export const fixture = rows;
const common = ['event_id', 'kind', 'task_id', 'schema', 'env', 'occurred_at'];
const browserKinds = ['task_started', 'export_ready', 'validation_blocked'];
const moneyKinds = ['payment_confirmed', 'refund_confirmed'];
export const isMoney = e => moneyKinds.includes(e.kind);
export const fingerprint = e => JSON.stringify(Object.keys(e).sort().map(k => [k, e[k]]));
export function validateEvent(e, channel) {
  if (!e || typeof e !== 'object' || Array.isArray(e)) return 'invalid_object';
  const monetary = isMoney(e);
  const fields = monetary ? [...common, 'record_id', 'order_id', 'amount'] : common;
  if (Object.keys(e).sort().join() !== [...fields].sort().join()) return 'unexpected_or_missing_field';
  if (!['browser', 'ledger'].includes(channel) || !(channel === 'browser' ? browserKinds : moneyKinds).includes(e.kind)) return 'wrong_producer';
  if (![e.event_id, e.task_id, ...(monetary ? [e.record_id, e.order_id] : [])].every(v => typeof v === 'string' && /^[A-Za-z0-9-]{1,32}$/.test(v))) return 'invalid_id';
  if (![1, 2].includes(e.schema) || !['production', 'test'].includes(e.env)) return 'unsupported_contract';
  if (typeof e.occurred_at !== 'string' || !/^2026-10-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(e.occurred_at) || !Number.isFinite(Date.parse(e.occurred_at))) return 'invalid_time';
  if (monetary && (e.schema !== 2 || !Number.isSafeInteger(e.amount) || e.amount <= 0)) return 'invalid_money';
  return null;
}
export function classify(input, deadline = cutoff) {
  const seen = new Map();
  return input.map(row => {
    const e = row.event;
    const invalid = validateEvent(e, row.channel);
    if (invalid) return { ...row, status: 'rejected' };
    const key = `${row.channel}:${e.env}:${e.event_id}`;
    const prior = seen.get(key);
    if (prior) return { ...row, status: prior === fingerprint(e) ? 'duplicate' : 'conflict' };
    seen.set(key, fingerprint(e));
    let status = 'included';
    if (e.env === 'test') status = 'test';
    else if (e.kind === 'export_ready' && e.schema === 1) status = 'old';
    else if (e.occurred_at < '2026-10-07T00:00:00Z' || e.occurred_at >= cutoff) status = 'outside';
    else if (row.received_at >= deadline) status = 'late';
    return { ...row, status };
  });
}
export function report(input, deadline = cutoff) {
  const classified = classify(input, deadline);
  const events = classified.filter(r => r.status === 'included').map(r => r.event);
  const starts = new Set(events.filter(e => e.kind === 'task_started').map(e => e.task_id));
  const ready = new Set(events.filter(e => e.kind === 'export_ready' && starts.has(e.task_id)).map(e => e.task_id));
  const blocked = new Set(events.filter(e => e.kind === 'validation_blocked' && starts.has(e.task_id) && !ready.has(e.task_id)).map(e => e.task_id));
  const ledger = new Map();
  for (const e of events.filter(isMoney)) {
    const key = `${e.kind}:${e.record_id}`;
    const prior = ledger.get(key);
    if (prior && fingerprint({ order: prior.order_id, amount: prior.amount }) !== fingerprint({ order: e.order_id, amount: e.amount })) throw new Error('Conflicting business record');
    ledger.set(key, e);
  }
  const orders = new Map();
  for (const e of ledger.values()) {
    const o = orders.get(e.order_id) || { paid: 0, refund: 0 };
    o[e.kind === 'payment_confirmed' ? 'paid' : 'refund'] += e.amount;
    orders.set(e.order_id, o);
  }
  let paid = 0, refunded = 0, pendingOrders = 0;
  for (const o of orders.values()) {
    if (!o.paid || o.refund > o.paid) { pendingOrders += 1; continue; }
    paid += o.paid; refunded += o.refund;
  }
  return { received: input.length, included: events.length, starts: starts.size, ready: ready.size, blocked: blocked.size, unknown: starts.size - ready.size - blocked.size, paid, refunded, net: paid - refunded, pendingOrders, classified };
}
// Evan Miller's rough fixed-horizon planning rule: alpha .05, power about .80.
export function roughSample(delta) { return Math.ceil(16 * 20 * 80 / ((delta * 100) ** 2)); }

export function rawReport(input) {
  const events = input.map(row => row.event);
  const sum = kind => events.filter(e => e.kind === kind).reduce((total, e) => total + e.amount, 0);
  return { starts: events.filter(e => e.kind === 'task_started').length, ready: events.filter(e => e.kind === 'export_ready').length, paid: sum('payment_confirmed'), refunded: sum('refund_confirmed') };
}
