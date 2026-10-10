import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { build } from 'esbuild';
import { Miniflare, convertV4MiniflareOptions } from 'miniflare';
const bundle = await build({ stdin: { contents: `import handler from './site/worker/index.ts'; export default { async fetch(request,env,ctx) { if(new URL(request.url).pathname==='/__test/scheduled') { const jobs=[]; await handler.scheduled({cron:'0 * * * *'},env,{waitUntil(p){jobs.push(p)}}); await Promise.all(jobs); return Response.json({ok:true}); } return handler.fetch(request,env,ctx); } };`, resolveDir: process.cwd() }, bundle: true, write: false, format: 'esm', platform: 'browser', target: 'es2022' });
const manifest = JSON.parse(readFileSync('site/worker/content.generated.json','utf8'));
const migration = readFileSync('site/migrations/0001_feedback.sql','utf8');
const ORIGIN = 'https://quickstart.test';
const ADMIN = 'test-admin-secret-never-for-production';
const authHeaders = { Authorization: `Bearer ${ADMIN}` };
export async function fixture(enabled = true, preview = false) {
  const origin = preview ? 'http://localhost:8788' : ORIGIN;
  const interceptors = [];
  const mock = { get: origin => ({ intercept: ({ path, method = 'GET' }) => ({ reply: (status, body) => interceptors.push({ origin, path, method, status, body }) }) }) };
  const mf = new Miniflare(convertV4MiniflareOptions({ host: '127.0.0.1', ...(preview ? {port:8788} : {}), modules: true, script: bundle.outputFiles[0].text, compatibilityDate: '2026-10-01', d1Databases: { DB: 'feedback' }, serviceBindings: { ASSETS: async request => {
    const path = new URL(request.url).pathname;
    const file = resolve('site/dist', `.${path === '/' ? '/index.html' : extname(path) ? path : `${path}.html`}`);
    if (!file.startsWith(resolve('site/dist')+'/')) return new Response('Not found',{status:404});
    try { return new Response(readFileSync(file),{headers:{'Content-Type':{'.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp'}[extname(file)]??'application/octet-stream'}}); } catch { return new Response('Not found',{status:404}); }
  } }, bindings: {
    FEEDBACK_ENABLED: String(enabled), SITE_ORIGIN: origin, GITHUB_CLIENT_ID: 'test-client', GITHUB_CLIENT_SECRET: 'test-secret',
    TURNSTILE_SITE_KEY: 'test-site', TURNSTILE_SECRET_KEY: 'test-secret', ADMIN_TOKEN: ADMIN, RATE_LIMIT_SALT: 'test-only-salt-at-least-thirty-two-characters',
    RESEND_API_KEY: 'test-resend', EMAIL_FROM: 'test@example.test',
  }, outboundService: async request => {
    const url = new URL(request.url);
    if (preview && url.hostname === 'challenges.cloudflare.com') {
      const data = new URLSearchParams(await request.text());
      return Response.json({success:true,hostname:'localhost',action:data.get('response')});
    }
    const index = interceptors.findIndex(item => item.origin === url.origin && item.path === url.pathname && item.method === request.method);
    if (index < 0) throw new Error(`Unexpected test provider request: ${request.method} ${url.origin}${url.pathname}`);
    const item = interceptors.splice(index,1)[0]; return Response.json(item.body,{status:item.status});
  } }));
  const db = await mf.getD1Database('DB');
  await db.exec(migration.replace(/\n/g,' '));
  const request = async (path, { method = 'GET', body, cookie, csrf, headers = {}, origin = ORIGIN } = {}) => {
    const response = await mf.dispatchFetch(ORIGIN+path, { method, headers: { ...headers, ...(cookie ? { Cookie: cookie } : {}), ...(csrf ? { 'X-CSRF-Token': csrf } : {}), ...(body ? { 'Content-Type': 'application/json', Origin: origin } : {}) }, body: body ? JSON.stringify(body) : undefined, redirect: 'manual' });
    const data = response.headers.get('Content-Type')?.includes('application/json') ? await response.json() : null;
    return { status: response.status, data, headers: response.headers };
  };
  const challenge = (action, success = true, hostname = 'quickstart.test') => mock.get('https://challenges.cloudflare.com').intercept({ path: '/turnstile/v0/siteverify', method: 'POST' }).reply(200, { success, action, hostname });
  async function login(githubId = 123) {
    challenge('login');
    const start = await request('/api/auth/start',{method:'POST',body:{turnstile:'test',return_path:'/go-global'}});
    assert.equal(start.status,200);
    const url=new URL(start.data.url);assert.equal(url.searchParams.get('code_challenge_method'),'S256');assert.equal(url.searchParams.get('scope'),'user:email');
    const state=url.searchParams.get('state');const oauthCookie=start.headers.get('set-cookie').split(';')[0];
    mock.get('https://github.com').intercept({path:'/login/oauth/access_token',method:'POST'}).reply(200,{access_token:'fixture-token'});
    mock.get('https://api.github.com').intercept({path:'/user',method:'GET'}).reply(200,{id:githubId,login:`reader-${githubId}`});
    mock.get('https://api.github.com').intercept({path:'/user/emails',method:'GET'}).reply(200,[{email:`reader-${githubId}@example.test`,verified:true,primary:true}]);
    const callbackPath=`/api/auth/callback?state=${state}&code=fixture-code`;
    const callback=await request(callbackPath,{cookie:oauthCookie});assert.equal(callback.status,303);
    const sessionCookie=callback.headers.getSetCookie().find(v=>v.startsWith('__Host-qs_session=')).split(';')[0];
    const me=await request('/api/me',{cookie:sessionCookie});assert.equal(me.data.user.name,`reader-${githubId}`);
    return {cookie:sessionCookie,csrf:me.data.csrf,callbackPath,oauthCookie};
  }
  function submission(extra={}) {
    const content=manifest.pages['/go-global'].text;const start=50;const exact=content.slice(start,start+40).trim();const index=content.indexOf(exact,start);
    return {path:'/go-global',content_sha:manifest.revision,exact,prefix:content.slice(Math.max(0,index-30),index),suffix:content.slice(index+exact.length,index+exact.length+30),kind:'confused',body:'This is a synthetic feedback test, not a real reader report.',consent:true,notify_email:true,request_id:crypto.randomUUID(),turnstile:'test',...extra};
  }
  return {mf,db,mock,request,challenge,login,submission};
}

export { ORIGIN, ADMIN, authHeaders };
