#!/usr/bin/env node
// Download route inlines the model so readers need only one file.
import { fixture, report, cutoff, revisedCutoff, validateEvent, fingerprint, rawReport, roughSample } from './measurement-model.mjs';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
const accepted = [], receipts = [], seen = new Map(), checks = [];
const check = (name, actual, expected) => { assert.deepEqual(actual, expected, name); checks.push({ name, passed: true }); };
const reply = (res, status, body) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(body)); };
const server = createServer(async (req, res) => {
  const channel = req.url === '/browser' ? 'browser' : req.url === '/ledger' ? 'ledger' : null;
  if (req.method !== 'POST' || !channel) return reply(res, 404, { error: 'not_found' });
  if (req.headers.authorization !== `Bearer DEMO-${channel}`) return reply(res, 401, { error: 'unauthorized' });
  try {
    let bytes = 0; const chunks = [];
    for await (const chunk of req) {
      bytes += chunk.length;
      if (bytes > 4096) return reply(res, 413, { error: 'too_large' });
      chunks.push(chunk);
    }
    const e = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    const error = validateEvent(e, channel);
    if (error) { receipts.push({ status: 400, error }); return reply(res, 400, { error }); }
    const key = `${channel}:${e.env}:${e.event_id}`, value = fingerprint(e);
    if (seen.has(key)) {
      const status = seen.get(key) === value ? 200 : 409;
      receipts.push({ status, event_id: e.event_id });
      return reply(res, status, { duplicate: status === 200 });
    }
    seen.set(key, value);
    // The received time is controlled by this fixture runner, not the client body.
    const received_at = fixture.find(r => r.event.event_id === e.event_id)?.received_at || cutoff;
    accepted.push({ event: e, channel, received_at });
    receipts.push({ status: 201, event_id: e.event_id });
    reply(res, 201, { accepted: true });
  } catch { reply(res, 400, { error: 'invalid_json' }); }
});
try {
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  const base = `http://127.0.0.1:${server.address().port}`;
  const send = async (event, channel = 'browser', token = `DEMO-${channel}`) => {
    const r = await fetch(base + '/' + channel, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(event), signal: AbortSignal.timeout(3000) });
    return { status: r.status, body: await r.json() };
  };
  for (const row of fixture) await send(row.event, row.channel);
  check('raw_report_demonstrates_overcount', rawReport(fixture), { starts: 7, ready: 7, paid: 6000, refunded: 2000 });
  check('sample_planning_presets', [.02, .05, .1].map(roughSample), [6400, 1024, 256]);
  check('19_requests_reconcile', [receipts.length, receipts.filter(r => r.status === 201).length, receipts.filter(r => r.status === 200).length, receipts.filter(r => r.status === 400).length], [19, 16, 2, 1]);
  const brief = r => [r.included, r.starts, r.ready, r.blocked, r.unknown, r.paid, r.refunded, r.net];
  check('initial_report', brief(report(accepted)), [12, 6, 2, 1, 3, 4000, 2000, 2000]);
  check('late_event_revision', brief(report(accepted, revisedCutoff)), [13, 6, 3, 1, 2, 4000, 2000, 2000]);
  check('refund_before_payment', brief(report([...accepted].reverse())), brief(report(accepted)));
  check('conflicting_retry', (await send({ ...fixture[1].event, task_id: 'F' })).status, 409);
  check('browser_cannot_confirm_payment', (await send(fixture[15].event)).status, 400);
  check('unknown_schema_rejected', (await send({ ...fixture[0].event, event_id: 'future', schema: 3 })).status, 400);
  check('untrusted_ledger_rejected', (await send(fixture[15].event, 'ledger', 'DEMO-browser')).status, 401);
  check('no_file_field_persisted', JSON.stringify({ accepted, receipts }).includes('SYNTHETIC-DO-NOT-COLLECT'), false);
  check('no_bad_record_in_store', accepted.some(r => r.event.event_id === 'bad-field'), false);
  const duplicatePayment = { ...fixture[15], event: { ...fixture[15].event, event_id: 'another-delivery' } };
  check('business_record_dedup', report([...accepted, duplicatePayment]).paid, 4000);
  check('unmatched_refund_pending', report(accepted.filter(r => r.event.order_id !== 'O1' || r.event.kind === 'refund_confirmed')).pendingOrders, 1);
  check('oversized_body', (await send({ extra: 'x'.repeat(5000) })).status, 413);
  console.log(JSON.stringify({ scope: 'synthetic loopback HTTP; no real telemetry or payment provider', checks, initial: brief(report(accepted)), revised: brief(report(accepted, revisedCutoff)), accepted }, null, 2));
} finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
