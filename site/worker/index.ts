import manifest from './content.generated.json';

interface Env {
  ASSETS: Fetcher; DB?: D1Database; FEEDBACK_ENABLED?: string; SITE_ORIGIN?: string;
  GITHUB_CLIENT_ID?: string; GITHUB_CLIENT_SECRET?: string;
  TURNSTILE_SITE_KEY?: string; TURNSTILE_SECRET_KEY?: string;
  ADMIN_TOKEN?: string; RATE_LIMIT_SALT?: string;
  RESEND_API_KEY?: string; EMAIL_FROM?: string;
}
type ReadyEnv = Env & { DB: D1Database; SITE_ORIGIN: string; RATE_LIMIT_SALT: string };
type Session = { user_id: string; csrf: string; display_name: string; email: string | null };
type Feedback = { id: string; user_id: string; path: string; status: string; visibility: string; request_hash: string };
const pages = manifest.pages as Record<string, { text: string }>;
const DAY = 86400000;
const encoder = new TextEncoder();
const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer' };
class HttpError extends Error {
  constructor(public status: number, public code: string) { super(code); }
}
function fail(status: number, code: string): never { throw new HttpError(status, code); }
const json = (value: unknown, status = 200) => Response.json(value, { status, headers });
const random = () => crypto.randomUUID() + crypto.randomUUID();
const digest = async (value: string) => [...new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value)))].map(b => b.toString(16).padStart(2, '0')).join('');
const normalize = (value: string) => value.replace(/\s+/gu, ' ').trim();
const text = (value: unknown, max: number, min = 0): string => {
  if (typeof value !== 'string' || value.length > max || value.trim().length < min) fail(400, 'invalid_input');
  return (value as string).trim();
};
function ready(env: Env): env is ReadyEnv {
  return env.FEEDBACK_ENABLED === 'true' && !!(env.DB && env.SITE_ORIGIN && env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET && env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY && env.ADMIN_TOKEN && env.ADMIN_TOKEN.length >= 32 && env.RATE_LIMIT_SALT && env.RATE_LIMIT_SALT.length >= 32);
}
const cookieName = (env: ReadyEnv, key: string) => `${env.SITE_ORIGIN.startsWith('https:') ? '__Host-' : ''}qs_${key}`;
function cookie(request: Request, env: ReadyEnv, key: string) {
  return (request.headers.get('Cookie') ?? '').split(';').map(s => s.trim()).find(s => s.startsWith(`${cookieName(env, key)}=`))?.split('=').slice(1).join('=') ?? '';
}
function setCookie(env: ReadyEnv, key: string, value: string, seconds: number) {
  return `${cookieName(env, key)}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${seconds}${env.SITE_ORIGIN.startsWith('https:') ? '; Secure' : ''}`;
}
function redirect(env: ReadyEnv, path: string, cookies: string[] = []) {
  const h = new Headers({ ...headers, Location: path });
  for (const value of cookies) h.append('Set-Cookie', value);
  return new Response(null, { status: 303, headers: h });
}
async function payload(request: Request): Promise<Record<string, unknown>> {
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) fail(415, 'json_required');
  if (Number(request.headers.get('Content-Length')) > 16384) fail(413, 'too_large');
  const reader = request.body?.getReader();
  if (!reader) fail(400, 'invalid_json');
  const chunks: Uint8Array[] = []; let size = 0;
  for (;;) {
    const { done, value } = await reader!.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16384) { await reader!.cancel(); fail(413, 'too_large'); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  try {
    const value = JSON.parse(new TextDecoder().decode(bytes));
    if (!value || typeof value !== 'object' || Array.isArray(value)) fail(400, 'invalid_json');
    return value;
  } catch { return fail(400, 'invalid_json'); }
}
async function upstream(url: string, init?: RequestInit) {
  const response = await fetch(url, { ...init, signal: AbortSignal.timeout(10000) });
  if (!response.ok) fail(502, 'provider_unavailable');
  return response;
}
async function rate(env: ReadyEnv, key: string, limit: number, window: number) {
  const now = Date.now(); const bucket = Math.floor(now / window);
  const privateKey = await digest(`${env.RATE_LIMIT_SALT}:${bucket}:${key}`);
  const result = await env.DB.prepare('INSERT INTO rate_limits(key,hits,expires_at) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET hits=hits+1 RETURNING hits').bind(privateKey, (bucket + 1) * window).first<{ hits: number }>();
  if ((result?.hits ?? limit + 1) > limit) fail(429, 'rate_limited');
}
async function session(request: Request, env: ReadyEnv): Promise<Session | null> {
  const token = cookie(request, env, 'session');
  if (!token || token.length > 100) return null;
  return env.DB.prepare('SELECT s.user_id,s.csrf,u.display_name,u.email FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?').bind(await digest(token), Date.now()).first<Session>();
}
function sameOrigin(request: Request, env: ReadyEnv) {
  if (request.headers.get('Origin') !== env.SITE_ORIGIN) fail(403, 'origin_mismatch');
}
async function authenticated(request: Request, env: ReadyEnv, mutation = false): Promise<Session> {
  const user = await session(request, env);
  if (!user) fail(401, 'login_required');
  if (mutation) {
    sameOrigin(request, env);
    if (request.headers.get('X-CSRF-Token') !== user!.csrf) fail(403, 'csrf_mismatch');
    await rate(env, `user:${user!.user_id}`, 20, 3600000);
  }
  return user!;
}
async function challenge(request: Request, env: ReadyEnv, data: Record<string, unknown>, action: string) {
  const token = text(data.turnstile, 2048, 1);
  const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY!, response: token });
  const result = await (await upstream('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body })).json() as { success: boolean; hostname: string; action: string };
  if (!result.success || result.hostname !== new URL(env.SITE_ORIGIN).hostname || result.action !== action) fail(403, 'challenge_failed');
}
function returnPath(value: unknown) {
  const path = typeof value === 'string' ? value : '';
  const base = path.split('#')[0];
  return path.length <= 1200 && pages[base] && !path.includes('?') ? path : '/go-global';
}
async function login(request: Request, env: ReadyEnv) {
  sameOrigin(request, env);
  const data = await payload(request);
  await challenge(request, env, data, 'login');
  const state = random(); const verifier = random();
  const hash = new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(verifier)));
  const codeChallenge = btoa(String.fromCharCode(...hash)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  await env.DB.prepare('INSERT INTO oauth_states VALUES(?,?,?,?)').bind(await digest(state), verifier, returnPath(data.return_path), Date.now() + 600000).run();
  const url = new URL('https://github.com/login/oauth/authorize');
  url.search = new URLSearchParams({ client_id: env.GITHUB_CLIENT_ID!, redirect_uri: `${env.SITE_ORIGIN}/api/auth/callback`, scope: 'user:email', state, code_challenge: codeChallenge, code_challenge_method: 'S256' }).toString();
  return Response.json({ url: url.href }, { headers: { ...headers, 'Set-Cookie': setCookie(env, 'oauth', state, 600) } });
}
async function callback(request: Request, env: ReadyEnv) {
  const url = new URL(request.url); const state = url.searchParams.get('state') ?? '';
  if (!state || state.length > 100 || cookie(request, env, 'oauth') !== state) fail(403, 'oauth_state_mismatch');
  const record = await env.DB.prepare('DELETE FROM oauth_states WHERE state_hash=? AND expires_at>? RETURNING verifier,return_path').bind(await digest(state), Date.now()).first<{ verifier: string; return_path: string }>();
  if (!record) fail(403, 'oauth_state_expired');
  const clear = setCookie(env, 'oauth', '', 0);
  if (url.searchParams.has('error')) return redirect(env, `${record!.return_path.split('#')[0]}#feedback`, [clear]);
  const code = text(url.searchParams.get('code'), 512, 1);
  const tokenResult = await (await upstream('https://github.com/login/oauth/access_token', {
    method: 'POST', headers: { Accept: 'application/json' },
    body: new URLSearchParams({ client_id: env.GITHUB_CLIENT_ID!, client_secret: env.GITHUB_CLIENT_SECRET!, code, code_verifier: record!.verifier, redirect_uri: `${env.SITE_ORIGIN}/api/auth/callback` }),
  })).json() as { access_token?: string };
  if (!tokenResult.access_token) fail(502, 'oauth_failed');
  const auth = { Authorization: `Bearer ${tokenResult.access_token}`, Accept: 'application/vnd.github+json', 'User-Agent': 'quickstart-to' };
  const profile = await (await upstream('https://api.github.com/user', { headers: auth })).json() as { id: number; login: string };
  if (!Number.isSafeInteger(profile.id) || typeof profile.login !== 'string') fail(502, 'oauth_failed');
  const emails = await (await upstream('https://api.github.com/user/emails', { headers: auth })).json() as { email: string; verified: boolean; primary: boolean }[];
  const email = emails.find(e => e.primary && e.verified)?.email ?? null;
  const user = await env.DB.prepare('INSERT INTO users(id,github_id,display_name,email,created_at) VALUES(?,?,?,?,?) ON CONFLICT(github_id) DO UPDATE SET display_name=excluded.display_name,email=excluded.email RETURNING id').bind(crypto.randomUUID(), String(profile.id), profile.login, email, Date.now()).first<{ id: string }>();
  const token = random(); const csrf = random();
  await env.DB.prepare('INSERT INTO sessions VALUES(?,?,?,?)').bind(await digest(token), user!.id, csrf, Date.now() + 30 * DAY).run();
  return redirect(env, `${record!.return_path.split('#')[0]}#feedback`, [clear, setCookie(env, 'session', token, 30 * 86400)]);
}
async function createFeedback(request: Request, env: ReadyEnv) {
  const user = await authenticated(request, env, true); const data = await payload(request);
  const path = text(data.path, 200, 1); const contentSha = text(data.content_sha, 64, 1);
  const exact = normalize(text(data.exact, 1000));
  text(data.prefix, 80); text(data.suffix, 80);
  const prefix = data.prefix as string; const suffix = data.suffix as string;
  const kind = text(data.kind, 20, 1); const body = text(data.body, 3000, 3); const requestId = text(data.request_id, 80, 1);
  if (!pages[path] || !['outdated','incorrect','supplement','confused'].includes(kind) || data.consent !== true) fail(400, 'invalid_input');
  if (contentSha !== manifest.revision) fail(409, 'content_changed');
  if (exact && !pages[path].text.includes(prefix + exact + suffix)) fail(409, 'quote_changed');
  if (!exact && (prefix || suffix)) fail(400, 'invalid_quote');
  const notify = data.notify_email === true && !!user.email && !!env.RESEND_API_KEY && !!env.EMAIL_FROM;
  const requestHash = await digest(JSON.stringify([path,contentSha,exact,prefix,suffix,kind,body,notify]));
  const existing = await env.DB.prepare('SELECT id,request_hash FROM feedback WHERE user_id=? AND request_id=?').bind(user.user_id, requestId).first<{ id: string; request_hash: string }>();
  if (existing) {
    if (existing.request_hash !== requestHash) fail(409, 'idempotency_conflict');
    return json({ id: existing.id, status: 'received' });
  }
  await challenge(request, env, data, 'feedback');
  await rate(env, `feedback:${user.user_id}`, 10, DAY);
  const id = crypto.randomUUID();
  await env.DB.prepare('INSERT INTO feedback(id,user_id,request_id,request_hash,path,content_sha,exact,prefix,suffix,kind,body,notify_email,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(user_id,request_id) DO NOTHING').bind(id,user.user_id,requestId,requestHash,path,contentSha,exact,prefix,suffix,kind,body,notify ? 1 : 0,Date.now()).run();
  const saved = await env.DB.prepare('SELECT id,request_hash FROM feedback WHERE user_id=? AND request_id=?').bind(user.user_id, requestId).first<{ id: string; request_hash: string }>();
  if (saved?.request_hash !== requestHash) fail(409, 'idempotency_conflict');
  return json({ id: saved!.id, status: 'received' }, 201);
}
const publicColumns = 'f.id,f.path,f.content_sha,f.exact,f.prefix,f.suffix,f.kind,f.body,f.status,f.visibility,f.created_at,u.display_name,r.outcome,r.summary,r.sources,r.pr_url,r.created_at AS resolved_at';
const joins = 'FROM feedback f JOIN users u ON u.id=f.user_id LEFT JOIN resolutions r ON r.feedback_id=f.id';
async function admin(request: Request, env: ReadyEnv, path: string) {
  const bearer = request.headers.get('Authorization') ?? '';
  if (await digest(bearer) !== await digest(`Bearer ${env.ADMIN_TOKEN}`)) fail(401, 'admin_required');
  // A browser cannot use this endpoint cross-origin, even if it has the token.
  if (request.headers.has('Origin')) sameOrigin(request, env);
  const url = new URL(request.url);
  if (path === '/api/admin/feedback' && request.method === 'GET') {
    const status = url.searchParams.get('status') ?? 'open';
    if (!['open','triaged','accepted','resolved','rejected','all'].includes(status)) fail(400, 'invalid_status');
    const cursor = url.searchParams.get('before') ?? `${Date.now()+1}:ffffffff-ffff-ffff-ffff-ffffffffffff`;
    const [time, cursorId] = cursor.split(':'); const before = Number(time);
    if (!Number.isSafeInteger(before) || !/^[a-f0-9-]{36}$/.test(cursorId ?? '')) fail(400, 'invalid_cursor');
    const result = await env.DB.prepare(`SELECT ${publicColumns} ${joins} WHERE (?='all' OR f.status=?) AND (f.created_at<? OR (f.created_at=? AND f.id<?)) ORDER BY f.created_at DESC,f.id DESC LIMIT 100`).bind(status,status,before,before,cursorId).all();
    const last = result.results.at(-1);
    return json({ untrusted_reader_data: result.results, next_before: result.results.length === 100 ? `${last?.created_at}:${last?.id}` : null });
  }
  if (path === '/api/admin/notifications' && request.method === 'GET') {
    const result = await env.DB.prepare('SELECT feedback_id,attempts,next_attempt,sent_at,created_at FROM email_outbox ORDER BY created_at DESC LIMIT 100').all();
    return json(result.results);
  }
  const match = path.match(/^\/api\/admin\/feedback\/([a-f0-9-]{36})\/(triage|resolve)$/);
  if (!match || request.method !== 'POST') fail(404, 'not_found');
  const [, id, action] = match!; const data = await payload(request);
  const item = await env.DB.prepare('SELECT id,user_id,path,status,visibility,request_hash FROM feedback WHERE id=?').bind(id).first<Feedback>();
  if (!item) fail(404, 'not_found');
  if (action === 'triage') {
    const status = text(data.status, 20); const visibility = text(data.visibility, 20);
    if (!['open','triaged','accepted'].includes(status) || !['pending','public','hidden'].includes(visibility)) fail(400, 'invalid_input');
    const finalStatus = ['resolved','rejected'].includes(item!.status) ? item!.status : status;
    await env.DB.prepare("UPDATE feedback SET status=CASE WHEN status IN ('resolved','rejected') THEN status ELSE ? END,visibility=? WHERE id=?").bind(finalStatus,visibility,id).run();
    return json({ id, status: finalStatus, visibility });
  }
  const outcome = text(data.outcome, 20); const summary = text(data.summary, 4000, 3);
  if (!['updated','confirmed','rejected'].includes(outcome)) fail(400, 'invalid_input');
  const sources = data.sources;
  if (!Array.isArray(sources) || sources.length > 10 || sources.some(s => typeof s !== 'string' || s.length > 2000 || !/^https:\/\/[^\s]+$/.test(s))) fail(400, 'invalid_sources');
  if (outcome !== 'rejected' && sources.length === 0) fail(400, 'sources_required');
  const pr = data.pr_url ? text(data.pr_url, 200) : null;
  if (outcome === 'updated' && !pr) fail(400, 'merged_pr_required');
  const requestHash = await digest(JSON.stringify([outcome,summary,sources,pr]));
  const existing = await env.DB.prepare('SELECT request_hash FROM resolutions WHERE feedback_id=?').bind(id).first<{ request_hash: string }>();
  if (existing) {
    if (existing.request_hash !== requestHash) fail(409, 'already_resolved');
    return json({ id, status: item!.status });
  }
  if (pr) {
    const number = pr.match(/^https:\/\/github\.com\/quickstart-to\/quickstart\.to\/pull\/([1-9]\d*)$/)?.[1];
    if (!number) fail(400, 'invalid_pr');
    const details = await (await upstream(`https://api.github.com/repos/quickstart-to/quickstart.to/pulls/${number}`, { headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'quickstart-to' } })).json() as { merged_at: string | null; base: { ref: string } };
    if (!details.merged_at || details.base?.ref !== 'main') fail(409, 'pr_not_merged');
  }
  const now = Date.now(); const status = outcome === 'rejected' ? 'rejected' : 'resolved';
  await env.DB.batch([
    env.DB.prepare('INSERT INTO resolutions VALUES(?,?,?,?,?,?,?) ON CONFLICT(feedback_id) DO NOTHING').bind(id,outcome,summary,JSON.stringify(sources),pr,requestHash,now),
    env.DB.prepare('UPDATE feedback SET status=? WHERE id=? AND EXISTS(SELECT 1 FROM resolutions WHERE feedback_id=? AND request_hash=?)').bind(status,id,id,requestHash),
    env.DB.prepare('INSERT INTO email_outbox(feedback_id,next_attempt,created_at) SELECT id,?,? FROM feedback WHERE id=? AND notify_email=1 ON CONFLICT(feedback_id) DO NOTHING').bind(now,now,id),
  ]);
  const saved = await env.DB.prepare('SELECT request_hash FROM resolutions WHERE feedback_id=?').bind(id).first<{ request_hash: string }>();
  if (saved?.request_hash !== requestHash) fail(409, 'already_resolved');
  return json({ id, status, notification: 'available_in_my_feedback' });
}
async function handle(request: Request, env: Env) {
  const url = new URL(request.url); const path = url.pathname;
  if (!path.startsWith('/api/')) return env.ASSETS.fetch(request);
  if (path === '/api/feedback/config' && request.method === 'GET') return json({ enabled: ready(env), revision: manifest.revision, site_key: ready(env) ? env.TURNSTILE_SITE_KEY : null, email_enabled: ready(env) && !!env.RESEND_API_KEY && !!env.EMAIL_FROM });
  if (!ready(env)) fail(503, 'feedback_unavailable');
  if (url.origin !== env.SITE_ORIGIN) fail(403, 'origin_mismatch');
  if (path.startsWith('/api/admin/')) return admin(request, env, path);
  if (request.method !== 'GET') await rate(env, `ip:${request.headers.get('CF-Connecting-IP') ?? 'local'}`, 40, 3600000);
  if (path === '/api/auth/start' && request.method === 'POST') return login(request, env);
  if (path === '/api/auth/callback' && request.method === 'GET') return callback(request, env);
  if (path === '/api/me' && request.method === 'GET') {
    const user = await session(request, env);
    return json(user ? { user: { name: user.display_name, can_email: !!user.email }, csrf: user.csrf } : { user: null });
  }
  if (path === '/api/auth/logout' && request.method === 'POST') {
    await authenticated(request, env, true);
    await env.DB.prepare('DELETE FROM sessions WHERE token_hash=?').bind(await digest(cookie(request, env, 'session'))).run();
    return Response.json({ ok: true }, { headers: { ...headers, 'Set-Cookie': setCookie(env, 'session', '', 0) } });
  }
  if (path === '/api/feedback' && request.method === 'POST') return createFeedback(request, env);
  if (path === '/api/feedback' && request.method === 'GET') {
    const page = url.searchParams.get('path') ?? ''; if (!pages[page]) fail(404, 'unknown_page');
    const result = await env.DB.prepare(`SELECT ${publicColumns} ${joins} WHERE f.path=? AND f.visibility='public' ORDER BY f.created_at DESC LIMIT 100`).bind(page).all();
    return json({ items: result.results });
  }
  if (path === '/api/me/feedback' && request.method === 'GET') {
    const user = await authenticated(request, env);
    const result = await env.DB.prepare(`SELECT ${publicColumns} ${joins} WHERE f.user_id=? ORDER BY f.created_at DESC LIMIT 100`).bind(user.user_id).all();
    return json({ items: result.results });
  }
  if (path === '/api/me/export' && request.method === 'GET') {
    const user = await authenticated(request, env);
    const result = await env.DB.prepare(`SELECT ${publicColumns} ${joins} WHERE f.user_id=? ORDER BY f.created_at`).bind(user.user_id).all();
    return Response.json({ account: { name: user.display_name, email: user.email }, feedback: result.results }, { headers: { ...headers, 'Content-Disposition': 'attachment; filename="quickstart-account.json"' } });
  }
  if (path === '/api/me' && request.method === 'DELETE') {
    const user = await authenticated(request, env, true); const data = await payload(request);
    if (data.confirm !== 'delete') fail(400, 'confirmation_required');
    await challenge(request, env, data, 'delete');
    await env.DB.prepare('DELETE FROM users WHERE id=?').bind(user.user_id).run();
    return Response.json({ ok: true }, { headers: { ...headers, 'Set-Cookie': setCookie(env, 'session', '', 0) } });
  }
  return fail(404, 'not_found');
}
async function maintenance(env: Env) {
  if (!ready(env)) return;
  const now = Date.now();
  await env.DB.batch([
    env.DB.prepare('DELETE FROM sessions WHERE expires_at<?').bind(now),
    env.DB.prepare('DELETE FROM oauth_states WHERE expires_at<?').bind(now),
    env.DB.prepare('DELETE FROM rate_limits WHERE expires_at<?').bind(now),
  ]);
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) return;
  const result = await env.DB.prepare('SELECT o.feedback_id,u.email,f.path FROM email_outbox o JOIN feedback f ON f.id=o.feedback_id JOIN users u ON u.id=f.user_id WHERE o.sent_at IS NULL AND o.attempts<5 AND o.next_attempt<=? AND o.created_at>? AND u.email IS NOT NULL LIMIT 20').bind(now,now-DAY).all<{ feedback_id: string; email: string; path: string }>();
  for (const item of result.results) {
    // Claim a short lease before contacting the provider. Stable key protects retries.
    const claimed = await env.DB.prepare('UPDATE email_outbox SET attempts=attempts+1,next_attempt=? WHERE feedback_id=? AND sent_at IS NULL AND next_attempt<=? RETURNING feedback_id').bind(now+3600000,item.feedback_id,now).first();
    if (!claimed) continue;
    try {
      await upstream('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `feedback/${item.feedback_id}` }, body: JSON.stringify({ from: env.EMAIL_FROM, to: [item.email], subject: 'quickstart.to：你的反馈有了处理结果', text: `你提交的内容反馈已有处理结果。请登录后在“我的反馈”查看：\n${env.SITE_ORIGIN}${item.path}#feedback\n\n本邮件仅针对你勾选接收通知的反馈。` }) });
      await env.DB.prepare('UPDATE email_outbox SET sent_at=? WHERE feedback_id=?').bind(Date.now(),item.feedback_id).run();
    } catch { /* Retain the outbox item for retry; never log addresses or provider bodies. */ }
  }
}
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try { return await handle(request, env); }
    catch (error) {
      if (error instanceof HttpError) return json({ error: error.code }, error.status);
      console.error('Feedback request failed');
      return json({ error: 'service_unavailable' }, 503);
    }
  },
  async scheduled(_event: ScheduledController, env: Env, ctx: ExecutionContext) { ctx.waitUntil(maintenance(env)); },
};
