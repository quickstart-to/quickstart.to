import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fixture,authHeaders } from './lib/feedback-fixture.mjs';
const bundle=await build({entryPoints:['site/shared/quote-anchor.ts'],bundle:true,write:false,format:'esm'});
const {anchorQuote,indexedText}=await import('data:text/javascript;base64,'+Buffer.from(bundle.outputFiles[0].text).toString('base64'));
async function annotate(f,user,extra={}){f.challenge('annotation');return f.request('/api/annotations',{method:'POST',...user,body:f.submission({kind:'discussion',...extra})});}
async function moderate(f,id,entity='annotation',visibility='public'){const r=await f.request(`/api/admin/annotations/${id}/moderate`,{method:'POST',headers:authHeaders,body:{entity,visibility}});assert.equal(r.status,200);return r;}
const publicList=f=>f.request('/api/annotations?chapter=/go-global');
const summary=f=>f.request('/api/annotations/summary?topic=go-global');

test('quote relocation handles whitespace and local edits but rejects ambiguous or unrelated text',()=>{
 const quote={prefix:'prefix context ',exact:'a fairly long quoted sentence',suffix:' suffix context'};
 assert.deepEqual(anchorQuote(quote.prefix+quote.exact+quote.suffix,quote),{start:15,end:44,relocated:false});
 assert.equal(anchorQuote(quote.prefix+'a fairly long quoted sentences'+quote.suffix,quote).relocated,true);
 assert.equal(anchorQuote('other surrounding '+quote.exact+' changed context',quote).relocated,true);
 assert.equal(anchorQuote((quote.prefix+quote.exact+quote.suffix).repeat(2),quote),null);
 assert.equal(anchorQuote(quote.prefix+'an entirely different assertion'+quote.suffix,quote),null);
 assert.equal(anchorQuote('removed',quote),null);
 const indexed=indexedText('  a\n\t b  ');assert.equal(indexed.normalized,'a b');assert.deepEqual(indexed.offsets,[2,3,6]);
});

test('additive upgrade preserves legacy feedback, results and outbox with stable IDs',async()=>{
 const id=crypto.randomUUID();let original;
 const f=await fixture(true,false,async db=>{
  await db.prepare('INSERT INTO users VALUES(?,?,?,?,?)').bind('legacy-user','legacy-github','Legacy reader','legacy@example.test',1).run();
  await db.prepare("INSERT INTO feedback(id,user_id,request_id,request_hash,path,content_sha,exact,prefix,suffix,kind,body,status,visibility,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)").bind(id,'legacy-user','request','hash','/go-global','old','old quote','','','supplement','Legacy content','resolved','public',1).run();
  await db.prepare('INSERT INTO resolutions VALUES(?,?,?,?,?,?,?)').bind(id,'updated','Legacy result','["https://example.test/source"]','https://github.com/quickstart-to/quickstart.to/pull/12','hash',2).run();
  await db.prepare('INSERT INTO email_outbox VALUES(?,?,?,?,?)').bind(id,0,3,null,2).run();
  original=(await db.prepare('SELECT * FROM feedback').all()).results;
 });try{
  assert.deepEqual((await f.db.prepare('SELECT * FROM feedback').all()).results,original);
  const list=await publicList(f);assert.equal(list.data.items[0].id,id);assert.equal(list.data.items[0].summary,'Legacy result');assert.equal(list.data.items[0].source,'feedback');assert.ok(!JSON.stringify(list.data).includes('legacy@example'));
  assert.equal((await f.db.prepare('SELECT count(*) AS n FROM email_outbox').first()).n,1);
  assert.equal((await summary(f)).data.items[0].highlights,1);
 }finally{await f.mf.dispose();}
});

test('moderated discussions, replies, concurrent likes and versioned caches preserve private boundaries',async()=>{
 const f=await fixture();try{
  const a=await f.login(1),b=await f.login(2);const body=f.submission({kind:'discussion'});
  assert.equal((await publicList(f)).data.items.length,0);assert.equal((await summary(f)).data.items.length,0);
  f.challenge('annotation');const created=await f.request('/api/annotations',{method:'POST',...a,body});assert.equal(created.status,201);const id=created.data.id;
  assert.equal((await f.request('/api/annotations',{method:'POST',...a,body})).data.id,id);
  assert.equal((await f.request('/api/annotations',{method:'POST',...a,body:{...body,body:'changed'}})).status,409);
  assert.equal((await publicList(f)).data.items.length,0);
  assert.equal((await f.request('/api/me/annotations',a)).data.items.length,1);assert.equal((await f.request('/api/me/annotations',b)).data.items.length,0);
  await moderate(f,id);assert.equal((await publicList(f)).data.items.length,1);
  assert.equal((await summary(f)).data.items[0].highlights,1);
  const rbody={body:'A synthetic reply <img onerror=alert(1)>',consent:true,request_id:crypto.randomUUID(),turnstile:'test'};
  f.challenge('reply');const reply=await f.request(`/api/annotations/${id}/replies`,{method:'POST',...b,body:rbody});assert.equal(reply.status,201);
  assert.equal((await f.request(`/api/annotations/${id}/replies`)).data.items.length,0);
  assert.equal((await f.request(`/api/annotations/${id}/replies?mine=1`,a)).data.items.length,0);
  assert.equal((await f.request(`/api/annotations/${id}/replies?mine=1`,b)).data.items[0].body,rbody.body);
  assert.equal((await f.request(`/api/annotations/${id}/replies`,{method:'POST',...b,body:rbody})).data.id,reply.data.id);
  await moderate(f,reply.data.id,'reply');assert.equal((await summary(f)).data.items[0].comments,2);
  const like={entity:'annotation',liked:true,turnstile:'test'};
  for(let i=0;i<3;i++)f.challenge('reaction');
  const attempts=await Promise.all(Array.from({length:3},()=>f.request(`/api/annotations/${id}/like`,{method:'POST',...b,body:like})));assert.ok(attempts.every(r=>r.status===200));
  assert.equal((await publicList(f)).data.items[0].likes,1);
  f.challenge('reaction');await f.request(`/api/annotations/${id}/like`,{method:'POST',...b,body:{...like,liked:false}});assert.equal((await publicList(f)).data.items[0].likes,0);
  const second=await annotate(f,a,{kind:'highlight'});await moderate(f,second.data.id);assert.equal((await summary(f)).data.items[0].highlights,1);
  const third=await annotate(f,b,{kind:'highlight'});await moderate(f,third.data.id);assert.equal((await summary(f)).data.items[0].highlights,2);
  await moderate(f,id,'annotation','hidden');assert.equal((await f.request(`/api/annotations/${id}/replies`)).status,404);
  assert.equal((await summary(f)).data.items[0].comments,0);
 }finally{await f.mf.dispose();}
});

test('new writes enforce quote, ownership, CSRF, Turnstile, report privacy and export/delete cascades',async()=>{
 const f=await fixture();try{
  const a=await f.login(11),b=await f.login(22);
  assert.equal((await f.request('/api/annotations',{method:'POST',body:f.submission({kind:'highlight'})})).status,401);
  assert.equal((await f.request('/api/annotations',{method:'POST',cookie:a.cookie,body:f.submission({kind:'highlight'})})).status,403);
  assert.equal((await f.request('/api/annotations',{method:'POST',...a,origin:'https://evil.test',body:f.submission({kind:'highlight'})})).status,403);
  assert.equal((await f.request('/api/annotations',{method:'POST',...a,body:f.submission({kind:'highlight',exact:'invented'})})).status,409);
  f.challenge('feedback');assert.equal((await f.request('/api/annotations',{method:'POST',...a,body:f.submission({kind:'highlight'})})).status,403);
  const created=await annotate(f,a,{kind:'highlight'});assert.equal(created.status,201);const id=created.data.id;await moderate(f,id);
  assert.equal((await f.request(`/api/annotations/${id}/remove`,{method:'POST',...b,body:{entity:'annotation',turnstile:'test'}})).status,403);
  f.challenge('report');const report=await f.request(`/api/annotations/${id}/report`,{method:'POST',...b,body:{entity:'annotation',reason:'Synthetic private reason',turnstile:'test'}});assert.equal(report.status,201);
  assert.equal((await publicList(f)).data.items.length,0);
  assert.equal((await f.request(`/api/annotations/${id}/report`,{method:'POST',...b,body:{entity:'annotation',reason:'Synthetic private reason',turnstile:'test'}})).status,200);
  const queue=await f.request('/api/admin/annotations',{headers:authHeaders});assert.ok(queue.data.untrusted_reader_data.some(i=>i.entity==='report'));assert.ok(!JSON.stringify(queue.data).includes('@example.test'));
  const flag=queue.data.untrusted_reader_data.find(i=>i.entity==='report');await moderate(f,flag.id,'report');assert.equal((await publicList(f)).data.items.length,1);
  const exported=await f.request('/api/me/export',a);assert.equal(exported.data.annotations[0].id,id);assert.equal(exported.data.reports.length,0);
  f.challenge('delete');assert.equal((await f.request('/api/me',{method:'DELETE',...a,body:{confirm:'delete',turnstile:'test'}})).status,200);
  assert.equal((await publicList(f)).data.items.length,0);assert.equal((await summary(f)).data.items.length,0);assert.equal((await f.db.prepare('SELECT count(*) AS n FROM annotation_reports').first()).n,0);
 }finally{await f.mf.dispose();}
});

test('trust requires adopted corrections, linked text stays pending, and tied cursor pages omit nothing',async()=>{
 const f=await fixture();try{
  const a=await f.login(31);const user=await f.db.prepare('SELECT id FROM users WHERE github_id=?').bind('31').first();
  for(let i=0;i<3;i++){
   const id=crypto.randomUUID();
   await f.db.prepare("INSERT INTO feedback(id,user_id,request_id,request_hash,path,content_sha,exact,prefix,suffix,kind,body,status,visibility,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)").bind(id,user.id,id,'synthetic','/go-global','old','','','','incorrect','Synthetic adopted correction','resolved','hidden',1).run();
   await f.db.prepare('INSERT INTO resolutions VALUES(?,?,?,?,?,?,?)').bind(id,'updated','Synthetic verified correction','[]','https://github.com/quickstart-to/quickstart.to/pull/12','synthetic',1).run();
  }
  const trusted=await annotate(f,a);assert.equal(trusted.data.visibility,'public');
  const linked=await annotate(f,a,{body:'Consider https://example.test/source'});assert.equal(linked.data.visibility,'pending');
  const sample=f.submission();const now=Date.now()-10;
  await f.db.batch(Array.from({length:105},()=>{
   const id=crypto.randomUUID();return f.db.prepare('INSERT INTO annotations VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(id,user.id,id,'synthetic',sample.path,sample.content_sha,sample.exact,sample.prefix,sample.suffix,'highlight','','public',now);
  }));
  await f.db.prepare('UPDATE interaction_version SET version=version+1').run();
  const ids=[];let before=null;let pages=0;
  do{const response=await f.request('/api/annotations?chapter=/go-global'+(before?'&before='+encodeURIComponent(before):''));assert.equal(response.status,200);ids.push(...response.data.items.map(i=>i.id));before=response.data.next_before;pages++;}while(before);
  assert.equal(pages,3);assert.equal(ids.length,106);assert.equal(new Set(ids).size,106);assert.ok(!ids.includes(linked.data.id));
 }finally{await f.mf.dispose();}
});
