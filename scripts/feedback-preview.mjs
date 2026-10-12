// Disposable local browser fixture; never imported by the production Worker.
import { createHash } from 'node:crypto';
import { fixture } from './lib/feedback-fixture.mjs';
const f = await fixture(true,true);
const token = 'synthetic-browser-session';
await f.db.prepare('INSERT INTO users VALUES(?,?,?,?,?)').bind('browser-test-user','999','Synthetic reader','synthetic@example.test',Date.now()).run();
await f.db.prepare('INSERT INTO sessions VALUES(?,?,?,?)').bind(createHash('sha256').update(token).digest('hex'),'browser-test-user','synthetic-csrf',Date.now()+3600000).run();
if (process.argv.includes('--annotations')) {
  for(const [id,github,name] of [['browser-other','998','Synthetic colleague'],['browser-third','997','Synthetic third reader']]) await f.db.prepare('INSERT INTO users VALUES(?,?,?,?,?)').bind(id,github,name,null,Date.now()).run();
  const sample=f.submission();
  for(const [id,user,kind,body,visibility] of [
    ['11111111-1111-4111-8111-111111111111','browser-test-user','discussion','Synthetic discussion: compare the existing workflow before building.','public'],
    ['22222222-2222-4222-8222-222222222222','browser-other','highlight','','public'],
    ['33333333-3333-4333-8333-333333333333','browser-third','discussion','Synthetic alternative: stop when the existing tool already solves it.','public'],
    ['44444444-4444-4444-8444-444444444444','browser-other','discussion','PRIVATE SYNTHETIC: must never appear to this reader.','pending']
  ]) await f.db.prepare('INSERT INTO annotations VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(id,user,id,'synthetic',sample.path,sample.content_sha,sample.exact,sample.prefix,sample.suffix,kind,body,visibility,Date.now()).run();
  await f.db.prepare('INSERT INTO annotation_replies VALUES(?,?,?,?,?,?,?,?,?,?)').bind('55555555-5555-4555-8555-555555555555','11111111-1111-4111-8111-111111111111',null,'browser-other',null,'Synthetic public reply with a concrete comparison.','public','reply','synthetic',Date.now()).run();
  await f.db.prepare('INSERT INTO annotations VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('66666666-6666-4666-8666-666666666666','browser-test-user','old','synthetic','/go-global','old-version','Removed old passage','unique old prefix','unique old suffix','discussion','Synthetic old-version discussion.','public',Date.now()-1).run();
}
console.log('Synthetic preview: http://localhost:8788/go-global#feedback');
console.log('Test-only cookie: qs_session=synthetic-browser-session');
console.log('Inject a test Turnstile widget in the local browser only; token equals its action. No external messages are sent.');
for (const signal of ['SIGINT','SIGTERM']) process.on(signal,async()=>{await f.mf.dispose();process.exit(0);});
