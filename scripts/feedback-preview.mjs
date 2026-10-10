// Disposable local browser fixture; never imported by the production Worker.
import { createHash } from 'node:crypto';
import { fixture } from './lib/feedback-fixture.mjs';
const f = await fixture(true,true);
const token = 'synthetic-browser-session';
await f.db.prepare('INSERT INTO users VALUES(?,?,?,?,?)').bind('browser-test-user','999','Synthetic reader','synthetic@example.test',Date.now()).run();
await f.db.prepare('INSERT INTO sessions VALUES(?,?,?,?)').bind(createHash('sha256').update(token).digest('hex'),'browser-test-user','synthetic-csrf',Date.now()+3600000).run();
console.log('Synthetic preview: http://localhost:8788/go-global#feedback');
console.log('Test-only cookie: qs_session=synthetic-browser-session');
console.log('Inject a test Turnstile widget in the local browser only; token equals its action. No external messages are sent.');
for (const signal of ['SIGINT','SIGTERM']) process.on(signal,async()=>{await f.mf.dispose();process.exit(0);});
