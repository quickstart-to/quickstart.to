// Read-only: listing a due page never advances verification metadata.
import { loadAllTopics } from './lib/topics.mjs';
const today = process.env.REVIEW_DATE ?? new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const now = Date.parse(`${today}T00:00:00Z`);
if (!/^\d{4}-\d{2}-\d{2}$/.test(today) || !Number.isFinite(now)) throw new Error('REVIEW_DATE must be YYYY-MM-DD');
const due = [];
for (const topic of loadAllTopics()) for (const page of topic.pages) {
  const level = page.data.volatility;
  const configured = topic.topic.review?.[level] ?? { high: '30d', medium: '90d', low: '365d' }[level];
  if (!configured) { if (topic.topic.status !== 'draft') due.push({ page: `${topic.dir}/${page.file}`, reason: 'missing volatility' }); continue; }
  if (!/^\d+d$/.test(configured)) throw new Error(`Invalid review interval: ${configured}`);
  const verified = String(page.data.last_verified ?? '');
  const last = Date.parse(`${verified}T00:00:00Z`);
  if (!Number.isFinite(last) || now-last > Number.parseInt(configured)*86400000) due.push({ page: `${topic.dir}/${page.file}`, volatility: level, last_verified: verified || null, reason: verified ? 'review interval exceeded' : 'missing verification date' });
}
due.sort((a,b)=>({high:0,medium:1,low:2}[a.volatility]??3)-({high:0,medium:1,low:2}[b.volatility]??3));
console.log(JSON.stringify({ as_of: today, due_pages: due, note: 'This lists metadata only; it does not verify sources or detect broken links.' }, null, 2));
