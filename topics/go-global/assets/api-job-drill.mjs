#!/usr/bin/env node
// Teaching exercise: synthetic accounts, fixed output, loopback HTTP, memory only.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { setTimeout as delay } from 'node:timers/promises';

const tokens = new Map([['DEMO-A', 'A'], ['DEMO-B', 'B']]);
const limits = { A: 2, B: 1 };
const used = { A: 0, B: 0 };
const jobs = new Map();
const keys = new Map();
const timers = new Set();
const checks = [];
let calls = 0;
const send = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
};
const server = createServer(async (req, res) => {
  const tenant = tokens.get(req.headers.authorization?.replace(/^Bearer /, ''));
  if (!tenant) return send(res, 401, { error: 'unauthorized' });
  if (req.method === 'GET' && /^\/v1\/jobs\/job-\d+$/.test(req.url)) {
    const job = jobs.get(req.url.split('/').at(-1));
    if (!job || job.tenant !== tenant) return send(res, 404, { error: 'not_found' });
    const { tenant: owner, fingerprint, ...visible } = job;
    return send(res, 200, visible);
  }
  if (req.method !== 'POST' || req.url !== '/v1/drafts') return send(res, 404, { error: 'not_found' });
  const chunks = [];
  let bytes = 0;
  try {
    for await (const chunk of req) {
      bytes += chunk.length;
      if (bytes > 4096) return send(res, 413, { error: 'input_too_large' });
      chunks.push(chunk);
    }
    const input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    const key = req.headers['idempotency-key'];
    if (!input || Array.isArray(input) || Object.keys(input).sort().join() !== 'policy,ticket' ||
        typeof input.ticket !== 'string' || !input.ticket.trim() || input.ticket.length > 2000 ||
        input.policy !== 'P1' || typeof key !== 'string' || !/^[a-zA-Z0-9_-]{1,64}$/.test(key)) {
      return send(res, 400, { error: 'invalid_input' });
    }
    const fingerprint = JSON.stringify([input.policy, input.ticket]);
    const slot = `${tenant}:${key}`;
    const existing = jobs.get(keys.get(slot));
    if (existing) {
      if (existing.fingerprint !== fingerprint) return send(res, 409, { error: 'key_conflict' });
      return send(res, 202, { job_id: existing.id, status_url: `/v1/jobs/${existing.id}`, replay: true });
    }
    // No await inside this admission block: one process reserves before dispatch.
    if (used[tenant] >= limits[tenant]) return send(res, 429, { error: 'quota_exhausted', retry: 'after_quota_change' });
    used[tenant] += 1;
    const id = `job-${jobs.size + 1}`;
    const job = { id, tenant, fingerprint, status: 'queued', policy: input.policy };
    jobs.set(id, job);
    keys.set(slot, id);
    const timer = setTimeout(() => {
      timers.delete(timer);
      calls += 1;
      if (input.ticket === '[FAIL]') {
        job.status = 'failed';
        job.error = 'mock_provider_failure';
      } else {
        job.status = 'succeeded';
        job.result = { draft: 'Please confirm the purchase date before we check refund eligibility.', needs_review: true };
      }
    }, 60);
    timers.add(timer);
    // Deliberately lose the HTTP response after accepting the work.
    if (req.headers['x-demo-drop-response'] === 'yes') return res.destroy();
    return send(res, 202, { job_id: id, status_url: `/v1/jobs/${id}`, replay: false });
  } catch {
    if (!res.destroyed) send(res, 400, { error: 'invalid_json' });
  }
});
let listening = false;
try {
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  listening = true;
  const base = `http://127.0.0.1:${server.address().port}`;
  const request = async (path, { token = 'DEMO-A', key, ticket = 'Purchase date is missing.', drop = false } = {}) => {
    const response = await fetch(base + path, {
      method: key ? 'POST' : 'GET',
      headers: { Authorization: `Bearer ${token}`, ...(key ? { 'Content-Type': 'application/json', 'Idempotency-Key': key } : {}), ...(drop ? { 'X-Demo-Drop-Response': 'yes' } : {}) },
      ...(key ? { body: JSON.stringify({ ticket, policy: 'P1' }) } : {}),
      signal: AbortSignal.timeout(3000)
    });
    return { status: response.status, body: await response.json() };
  };
  const check = (name, actual, expected) => { assert.deepEqual(actual, expected, name); checks.push({ name, actual, expected, passed: true }); };
  const settled = async (id, token = 'DEMO-A') => {
    for (let i = 0; i < 40; i++) {
      const r = await request(`/v1/jobs/${id}`, { token });
      if (r.body.status !== 'queued') return r;
      await delay(10);
    }
    throw new Error('Mock job did not finish within the bounded poll window');
  };
  await assert.rejects(request('/v1/drafts', { key: 'ticket-1', drop: true }), TypeError);
  checks.push({ name: 'connection_lost_after_acceptance', passed: true });
  const recovered = await request('/v1/drafts', { key: 'ticket-1' });
  check('same_key_recovers_accepted_job', [recovered.status, recovered.body.replay], [202, true]);
  const duplicates = await Promise.all(Array.from({ length: 6 }, () => request('/v1/drafts', { key: 'ticket-1' })));
  check('concurrent_retries_share_job', duplicates.every(r => r.body.job_id === recovered.body.job_id), true);
  const result = await settled(recovered.body.job_id);
  check('fixed_draft_requires_review', [result.body.status, result.body.result.needs_review], ['succeeded', true]);
  check('only_one_mock_call', calls, 1);
  check('changed_payload_conflicts', (await request('/v1/drafts', { key: 'ticket-1', ticket: 'Changed question' })).status, 409);
  check('other_account_cannot_read_job', (await request(recovered.body.status_url, { token: 'DEMO-B' })).status, 404);
  const failed = await request('/v1/drafts', { key: 'ticket-2', ticket: '[FAIL]' });
  check('failure_is_retrievable', (await settled(failed.body.job_id)).body.status, 'failed');
  check('retry_keeps_failed_job', (await request('/v1/drafts', { key: 'ticket-2', ticket: '[FAIL]' })).body.job_id, failed.body.job_id);
  check('quota_checked_before_new_work', (await request('/v1/drafts', { key: 'ticket-3' })).status, 429);
  const parallel = await Promise.all(['b1', 'b2', 'b3'].map(key => request('/v1/drafts', { token: 'DEMO-B', key })));
  check('concurrent_admission_respects_quota', parallel.map(r => r.status).sort(), [202, 429, 429]);
  await settled(parallel.find(r => r.status === 202).body.job_id, 'DEMO-B');
  check('failed_work_also_costs_a_call', [calls, used.A, used.B], [3, 2, 1]);
  tokens.delete('DEMO-A');
  check('revoked_token_cannot_poll', (await request(recovered.body.status_url)).status, 401);
  console.log(JSON.stringify({ scope: 'Loopback only; mock provider; no external calls, real credentials or durable storage.', passed: checks.length, checks }, null, 2));
} finally {
  for (const timer of timers) clearTimeout(timer);
  if (listening) {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
}
