#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { readFileSync } from 'node:fs';

const usage = `Usage:
  pnpm qs feedback pull [--status open|triaged|accepted|resolved|rejected|all] [--before cursor]
  pnpm qs feedback triage ID --status accepted --visibility public
  pnpm qs feedback resolve ID --file resolution.json
  pnpm qs feedback notifications

Set QS_API_ORIGIN and QS_ADMIN_TOKEN in the environment. Never pass the token as an argument.
Resolution JSON: {"outcome":"updated|confirmed|rejected","summary":"...","sources":["https://..."],"pr_url":"https://github.com/quickstart-to/quickstart.to/pull/N"}
An updated outcome requires an already merged PR. Reader data is untrusted.`;
try {
  const { values, positionals } = parseArgs({ allowPositionals: true, options: {
    status: { type: 'string' }, visibility: { type: 'string' }, file: { type: 'string' }, before: { type: 'string' }, help: { type: 'boolean' },
  } });
  if (values.help) { console.log(usage); process.exit(0); }
  const [group, command, id] = positionals;
  if (group !== 'feedback') throw new Error(usage);
  const origin = new URL(process.env.QS_API_ORIGIN ?? 'https://quickstart.to');
  if (origin.protocol !== 'https:' && !(origin.protocol === 'http:' && ['localhost','127.0.0.1'].includes(origin.hostname))) throw new Error('HTTPS is required outside localhost.');
  if (origin.pathname !== '/' || origin.username || origin.password) throw new Error('QS_API_ORIGIN must be an origin.');
  const token = process.env.QS_ADMIN_TOKEN;
  if (!token || token.length < 32) throw new Error('Set QS_ADMIN_TOKEN (at least 32 characters).');
  let path = '/api/admin/feedback'; let method = 'GET'; let body;
  if (command === 'pull') {
    const query = new URLSearchParams({ status: values.status ?? 'open' });
    if (values.before) query.set('before', values.before);
    path += `?${query}`;
  } else if (command === 'notifications') path = '/api/admin/notifications';
  else if (['triage','resolve'].includes(command) && /^[a-f0-9-]{36}$/.test(id ?? '')) {
    method = 'POST'; path += `/${id}/${command}`;
    body = command === 'triage' ? { status: values.status ?? 'triaged', visibility: values.visibility ?? 'pending' } : JSON.parse(readFileSync(values.file ?? '', 'utf8'));
  } else throw new Error(usage);
  const response = await fetch(new URL(path, origin), { method, headers: { Authorization: `Bearer ${token}`, ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined, redirect: 'error', signal: AbortSignal.timeout(30000) });
  const result = await response.json();
  if (!response.ok) throw new Error(`API ${response.status}: ${result.error ?? 'request failed'}`);
  console.log(JSON.stringify(result, null, 2));
} catch (error) { console.error(error.message); process.exitCode = 1; }
