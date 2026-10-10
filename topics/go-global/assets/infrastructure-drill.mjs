#!/usr/bin/env node
// An isolated HTTP/file exercise, not a production deployment or database backup tool.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdtemp, mkdir, writeFile, readFile, copyFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = await mkdtemp(join(tmpdir(), 'quickstart-infra-'));
await mkdir(join(root, 'releases'));
await mkdir(join(root, 'restore'));
const dataPath = join(root, 'records.json');
const backupPath = join(root, 'backup.json');
const restoredPath = join(root, 'restore', 'records.json');
const initialRows = [{ id: 'r1', task: 'Research', hours: 3 }, { id: 'r2', task: 'Draft report', hours: 2 }];
const laterRow = { id: 'r3', task: 'Review', hours: 1 };
await writeFile(dataPath, JSON.stringify(initialRows));
await writeFile(join(root, 'releases', 'v1.mjs'), 'export const total = rows => rows.reduce((sum, row) => sum + row.hours, 0);\n');
// Deliberate release defect: the request succeeds but omits all except the first row.
await writeFile(join(root, 'releases', 'v2.mjs'), 'export const total = rows => rows[0]?.hours ?? 0;\n');
let running;
const checks = [];
const stop = async () => { if (running) { const server = running; running = undefined; await new Promise((resolve, reject) => server.close(e => e ? reject(e) : resolve())); } };
const start = async (release, file) => {
  await stop();
  const { total } = await import(pathToFileURL(join(root, 'releases', `${release}.mjs`)).href);
  running = createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.url === '/health') return res.end(JSON.stringify({ release, status: 'up' }));
    if (req.url !== '/report') { res.statusCode = 404; return res.end('{}'); }
    try {
      const rows = JSON.parse(await readFile(file, 'utf8'));
      assert.ok(Array.isArray(rows) && rows.every(r => typeof r.id === 'string' && Number.isFinite(r.hours)));
      res.end(JSON.stringify({ release, report: 'North', hours: total(rows), rowIds: rows.map(r => r.id) }));
    } catch {
      res.statusCode = 500;
      res.end(JSON.stringify({ release, error: 'DEMO_STORE_UNREADABLE' }));
    }
  });
  await new Promise((resolve, reject) => { running.once('error', reject); running.listen(0, '127.0.0.1', resolve); });
  return `http://127.0.0.1:${running.address().port}`;
};
const read = async (base, path) => { const res = await fetch(base + path); return { httpStatus: res.status, ...await res.json() }; };
try {
  let base = await start('v1', dataPath);
  const baseline = await read(base, '/report');
  assert.equal(baseline.hours, 5);
  checks.push({ step: 'baseline', ...baseline, expectedHours: 5, businessCheck: true });

  base = await start('v2', dataPath);
  const health = await read(base, '/health');
  const faulty = await read(base, '/report');
  assert.equal(health.status, 'up');
  assert.equal(faulty.httpStatus, 200);
  assert.equal(faulty.hours, 3);
  checks.push({ step: 'faulty_release', ...faulty, expectedHours: 5, businessCheck: false, health: 'up' });

  base = await start('v1', dataPath);
  const rollback = await read(base, '/report');
  assert.equal(rollback.hours, 5);
  checks.push({ step: 'code_rollback', ...rollback, expectedHours: 5, businessCheck: true });

  // Stop writes while taking the fixture copy. Real databases need a supported snapshot/export.
  await stop();
  await copyFile(dataPath, backupPath);
  await writeFile(dataPath, JSON.stringify([...initialRows, laterRow]));
  base = await start('v1', dataPath);
  const latest = await read(base, '/report');
  assert.equal(latest.hours, 6);
  checks.push({ step: 'new_record_after_backup', ...latest, expectedHours: 6, businessCheck: true });

  await stop();
  await writeFile(dataPath, '{deliberately invalid fixture');
  base = await start('v1', dataPath);
  const damaged = await read(base, '/report');
  assert.equal(damaged.httpStatus, 500);
  checks.push({ step: 'damaged_data_same_code', ...damaged, businessCheck: false });

  await stop();
  await copyFile(backupPath, restoredPath);
  base = await start('v1', restoredPath);
  const restored = await read(base, '/report');
  const missingIds = latest.rowIds.filter(id => !restored.rowIds.includes(id));
  assert.equal(restored.hours, 5);
  assert.deepEqual(missingIds, ['r3']);
  checks.push({ step: 'restore_old_backup_in_isolation', ...restored, expectedLatestHours: 6, missingIds, backupReadable: true, businessCheck: false });

  const result = { executedAt: new Date().toISOString(), node: process.version, platform: process.platform, scope: 'loopback HTTP and synthetic JSON fixtures only', checks, conclusion: 'Code rollback repairs the release defect. The old backup is readable but lacks r3; latest work is not recovered.' };
  await writeFile(join(root, 'result.json'), JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify({ directory: root, ...result }, null, 2));
} finally {
  await stop();
}
