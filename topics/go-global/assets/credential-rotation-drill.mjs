#!/usr/bin/env node
// Synthetic credentials and a loopback-only issuer; never reads real environment secrets.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdtemp, writeFile, readFile, unlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const directory = await mkdtemp(join(tmpdir(), 'quickstart-rotation-'));
const oldKey = 'DEMO-ONLY-old-credential';
const newKey = 'DEMO-ONLY-new-credential';
const accepted = new Set([oldKey]);
const webPath = join(directory, 'web-demo-key.txt');
const jobPath = join(directory, 'job-demo-key.txt');
const exposedPath = join(directory, 'exposed-demo-copy.txt');
const checks = [];
const server = createServer((request, response) => {
  response.setHeader('Content-Type', 'application/json');
  if (request.url !== '/demo-proof' || request.method !== 'GET') {
    response.statusCode = 404;
    response.end(JSON.stringify({ code: 'DEMO_NOT_FOUND' }));
    return;
  }
  const key = request.headers.authorization?.replace(/^Bearer /, '');
  response.statusCode = accepted.has(key) ? 200 : 401;
  response.end(JSON.stringify({ code: response.statusCode === 200 ? 'DEMO_ACCESS_ACCEPTED' : 'DEMO_ACCESS_REJECTED' }));
});
let listening = false;
try {
  await Promise.all([writeFile(webPath, oldKey), writeFile(jobPath, oldKey), writeFile(exposedPath, oldKey)]);
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  listening = true;
  const base = `http://127.0.0.1:${server.address().port}`;
  const check = async (step, client, key, expectedStatus) => {
    const response = await fetch(`${base}/demo-proof`, { headers: { Authorization: `Bearer ${key}` }, signal: AbortSignal.timeout(3000) });
    const body = await response.json();
    assert.equal(response.status, expectedStatus, `${step}: ${client}`);
    assert.equal(body.code, expectedStatus === 200 ? 'DEMO_ACCESS_ACCEPTED' : 'DEMO_ACCESS_REJECTED');
    checks.push({ step, client, status: response.status, expectedStatus, code: body.code, passed: true });
  };
  await check('baseline', 'web', await readFile(webPath, 'utf8'), 200);
  await check('baseline', 'background_job', await readFile(jobPath, 'utf8'), 200);

  // Deleting the local exposed copy does not change the issuer's accepted credentials.
  await unlink(exposedPath);
  await check('delete_exposed_copy_only', 'copied_old_credential', oldKey, 200);

  // A deliberately incomplete change: issue a new credential and update only the web client.
  accepted.add(newKey);
  await writeFile(webPath, newKey);
  await check('new_web_key_without_revocation', 'web', await readFile(webPath, 'utf8'), 200);
  await check('new_web_key_without_revocation', 'copied_old_credential', oldKey, 200);

  // The issuer revokes the old credential. The forgotten job now fails, while web works.
  accepted.delete(oldKey);
  await check('revoke_old_credential', 'copied_old_credential', oldKey, 401);
  await check('revoke_old_credential', 'web', await readFile(webPath, 'utf8'), 200);
  await check('revoke_old_credential', 'background_job', await readFile(jobPath, 'utf8'), 401);

  await writeFile(jobPath, newKey);
  await check('repair_background_job', 'background_job', await readFile(jobPath, 'utf8'), 200);
  await check('final_revocation_check', 'copied_old_credential', oldKey, 401);

  console.log(JSON.stringify({
    executedAt: new Date().toISOString(), node: process.version, platform: process.platform,
    scope: 'Loopback HTTP, synthetic credentials and disposable local files only; no provider API or real account was accessed.',
    checks,
    conclusion: 'Old access is rejected and both known clients work. This does not prove that a real attacker has no other credentials or sessions.',
  }, null, 2));
} finally {
  if (listening) {
    server.closeAllConnections();
    await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
  await rm(directory, { recursive: true, force: true });
}
