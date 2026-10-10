import test from 'node:test';
import assert from 'node:assert/strict';
import { fixture, authHeaders } from './lib/feedback-fixture.mjs';

test('feedback is unavailable until explicitly configured',async()=>{
  const f=await fixture(false);try{assert.equal((await f.request('/api/feedback/config')).data.enabled,false);assert.equal((await f.request('/api/me')).status,503);}finally{await f.mf.dispose();}
});
test('OAuth state, browser binding, PKCE and logout protect sessions',async()=>{
  const f=await fixture();try{
    assert.equal((await f.request('/api/auth/start',{method:'POST',origin:'https://attacker.test',body:{}})).status,403);
    assert.equal((await f.request('/api/auth/callback?state=wrong&code=x')).status,403);
    const user=await f.login();
    assert.equal((await f.request(user.callbackPath,{cookie:user.oauthCookie})).status,403);
    assert.equal((await f.request('/api/auth/logout',{method:'POST',cookie:user.cookie,body:{}})).status,403);
    assert.equal((await f.request('/api/auth/logout',{method:'POST',...user,body:{}})).status,200);
    assert.equal((await f.request('/api/me',{cookie:user.cookie})).data.user,null);
  }finally{await f.mf.dispose();}
});
test('submit → private queue → moderation → merged revision → public reply and personal result',async()=>{
  const f=await fixture();try{
    const user=await f.login();const body=f.submission();f.challenge('feedback');
    const submitted=await f.request('/api/feedback',{method:'POST',...user,body});assert.equal(submitted.status,201);const id=submitted.data.id;
    assert.equal((await f.request('/api/feedback?path=/go-global')).data.items.length,0);
    assert.equal((await f.request('/api/me/feedback',user)).data.items.length,1);
    // A retry does not consume another challenge or create another item.
    assert.equal((await f.request('/api/feedback',{method:'POST',...user,body})).data.id,id);
    assert.equal((await f.request('/api/feedback',{method:'POST',...user,body:{...body,body:'Different payload'}})).status,409);
    assert.equal((await f.request('/api/admin/feedback')).status,401);
    const queue=await f.request('/api/admin/feedback',{headers:authHeaders});assert.equal(queue.data.untrusted_reader_data[0].id,id);assert.ok(!JSON.stringify(queue.data).includes('@example.test'));
    assert.equal((await f.request(`/api/admin/feedback/${id}/triage`,{method:'POST',headers:authHeaders,body:{status:'accepted',visibility:'public'}})).status,200);
    const resolution={outcome:'updated',summary:'Synthetic verification result.',sources:['https://example.test/source'],pr_url:'https://github.com/quickstart-to/quickstart.to/pull/999'};
    f.mock.get('https://api.github.com').intercept({path:'/repos/quickstart-to/quickstart.to/pulls/999'}).reply(200,{merged_at:null,base:{ref:'main'}});
    assert.equal((await f.request(`/api/admin/feedback/${id}/resolve`,{method:'POST',headers:authHeaders,body:resolution})).status,409);
    f.mock.get('https://api.github.com').intercept({path:'/repos/quickstart-to/quickstart.to/pulls/999'}).reply(200,{merged_at:'2026-10-10T00:00:00Z',base:{ref:'main'}});
    assert.equal((await f.request(`/api/admin/feedback/${id}/resolve`,{method:'POST',headers:authHeaders,body:resolution})).status,200);
    assert.equal((await f.request(`/api/admin/feedback/${id}/resolve`,{method:'POST',headers:authHeaders,body:resolution})).status,200);
    const publicItems=(await f.request('/api/feedback?path=/go-global')).data.items;assert.equal(publicItems[0].summary,resolution.summary);assert.equal(publicItems[0].status,'resolved');assert.ok(!JSON.stringify(publicItems).includes('@example.test'));
    assert.equal((await f.db.prepare('SELECT count(*) AS n FROM email_outbox').first()).n,1);
    // A transient provider failure leaves a retryable outbox item, without changing the resolution.
    f.mock.get('https://api.resend.com').intercept({path:'/emails',method:'POST'}).reply(503,{error:'temporary'});
    await f.request('/__test/scheduled');
    const failed=await f.db.prepare('SELECT attempts,sent_at FROM email_outbox').first();assert.equal(failed.attempts,1);assert.equal(failed.sent_at,null);
    await f.db.prepare('UPDATE email_outbox SET next_attempt=0').run();
    f.mock.get('https://api.resend.com').intercept({path:'/emails',method:'POST'}).reply(200,{id:'synthetic-mail-id'});
    await f.request('/__test/scheduled');assert.ok((await f.db.prepare('SELECT sent_at FROM email_outbox').first()).sent_at);
    await f.request('/__test/scheduled');assert.equal((await f.db.prepare('SELECT attempts FROM email_outbox').first()).attempts,2);
    const exported=await f.request('/api/me/export',user);assert.equal(exported.data.feedback.length,1);
    // Moderation can hide an already resolved record without reopening it.
    await f.request(`/api/admin/feedback/${id}/triage`,{method:'POST',headers:authHeaders,body:{status:'triaged',visibility:'hidden'}});
    assert.equal((await f.request('/api/feedback?path=/go-global')).data.items.length,0);
    assert.equal((await f.request('/api/me/feedback',user)).data.items[0].status,'resolved');
    f.challenge('delete');assert.equal((await f.request('/api/me',{method:'DELETE',...user,body:{confirm:'delete',turnstile:'test'}})).status,200);
    assert.equal((await f.db.prepare('SELECT count(*) AS n FROM feedback').first()).n,0);assert.equal((await f.db.prepare('SELECT count(*) AS n FROM email_outbox').first()).n,0);
  }finally{await f.mf.dispose();}
});
test('untrusted input cannot bypass origin, ownership, quote, consent or challenge checks',async()=>{
  const f=await fixture();try{
    const user=await f.login();
    assert.equal((await f.request('/api/feedback',{method:'POST',body:f.submission()})).status,401);
    assert.equal((await f.request('/api/feedback',{method:'POST',...user,origin:'https://evil.test',body:f.submission()})).status,403);
    assert.equal((await f.request('/api/feedback',{method:'POST',...user,body:f.submission({content_sha:'old'})})).status,409);
    assert.equal((await f.request('/api/feedback',{method:'POST',...user,body:f.submission({exact:'invented quotation not in the guide'})})).status,409);
    assert.equal((await f.request('/api/feedback',{method:'POST',...user,body:f.submission({consent:false})})).status,400);
    f.challenge('feedback',true,'evil.test');assert.equal((await f.request('/api/feedback',{method:'POST',...user,body:f.submission()})).status,403);
    f.challenge('login');assert.equal((await f.request('/api/feedback',{method:'POST',...user,body:f.submission()})).status,403);
    f.challenge('feedback');const saved=await f.request('/api/feedback',{method:'POST',...user,body:f.submission({body:'<img src=x onerror=alert(1)> is stored as text.'})});assert.equal(saved.status,201);
    const other=await f.login(456);assert.equal((await f.request('/api/me/feedback',other)).data.items.length,0);
    assert.equal((await f.request('/api/feedback?path=/unknown')).status,404);
    assert.equal((await f.request('/api/me',{method:'DELETE',...user,body:{confirm:'wrong'}})).status,400);
  }finally{await f.mf.dispose();}
});
test('daily account limit applies before additional submissions',async()=>{
  const f=await fixture();try{
    const user=await f.login();
    for(let i=0;i<10;i++){f.challenge('feedback');assert.equal((await f.request('/api/feedback',{method:'POST',...user,body:f.submission()})).status,201);}
    f.challenge('feedback');assert.equal((await f.request('/api/feedback',{method:'POST',...user,body:f.submission()})).status,429);
  }finally{await f.mf.dispose();}
});
