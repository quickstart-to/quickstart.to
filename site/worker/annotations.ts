import type { ReadyEnv } from './index';
type Helpers = Pick<typeof import('./index'), 'json' | 'fail' | 'text' | 'payload' | 'authenticated' | 'challenge' | 'digest' | 'rate' | 'sameOrigin'> & { pages: Record<string,{text:string}>; revision: string };
type Row = Record<string, unknown>;
type Target = { table: string; column: string; row: Row; root: Row };
export const bumpInteractions = (env: ReadyEnv) => env.DB.prepare('UPDATE interaction_version SET version=version+1 WHERE id=1');
const roots = `SELECT a.id,a.user_id,a.path,a.content_sha,a.exact,a.prefix,a.suffix,a.kind,a.body,a.visibility,a.created_at,'annotation' AS source,'open' AS status,NULL AS summary,NULL AS sources,NULL AS pr_url,NULL AS resolved_at,NULL AS handled_sha,NULL AS changelog_path FROM annotations a
UNION ALL SELECT f.id,f.user_id,f.path,f.content_sha,f.exact,f.prefix,f.suffix,f.kind,f.body,f.visibility,f.created_at,'feedback' AS source,f.status,r.summary,r.sources,r.pr_url,r.created_at AS resolved_at,v.merged_sha AS handled_sha,v.changelog_path FROM feedback f LEFT JOIN resolutions r ON r.feedback_id=f.id LEFT JOIN resolution_versions v ON v.feedback_id=f.id`;
export async function interactionExport(env: ReadyEnv, userId: string) {
  const result = await env.DB.batch([
    env.DB.prepare('SELECT * FROM annotations WHERE user_id=? ORDER BY created_at,id').bind(userId),
    env.DB.prepare('SELECT * FROM annotation_replies WHERE user_id=? ORDER BY created_at,id').bind(userId),
    env.DB.prepare('SELECT * FROM annotation_reactions WHERE user_id=? ORDER BY created_at,id').bind(userId),
    env.DB.prepare('SELECT * FROM annotation_reports WHERE user_id=? ORDER BY created_at,id').bind(userId),
  ]);
  return Object.fromEntries(['annotations','replies','likes','reports'].map((key,i)=>[key,(result[i].results as Row[]).map(row=>{const {request_hash,...safe}=row;return safe;})]));
}
export async function annotationRequest(request: Request, env: ReadyEnv, h: Helpers): Promise<Response | null> {
  const url = new URL(request.url); const path = url.pathname;
  if (!/^\/api\/(annotations(?:\/|$)|me\/annotations$|admin\/annotations(?:\/|$))/.test(path)) return null;
  const {json,fail,text,payload,authenticated,challenge,digest,rate,sameOrigin}=h;
  const uuid=(v:unknown)=>{const s=text(v,36,36);if(!/^[a-f0-9-]{36}$/.test(s))fail(400,'invalid_input');return s;};
  async function root(id:string) { return env.DB.prepare(`SELECT * FROM (${roots}) WHERE id=?`).bind(id).first<Row>(); }
  async function target(id:string,kind:unknown):Promise<Target> {
    if(kind==='reply') {
      const row=await env.DB.prepare('SELECT * FROM annotation_replies WHERE id=?').bind(id).first<Row>();if(!row)fail(404,'not_found');
      const parent=await root(String(row!.annotation_id??row!.feedback_id));if(!parent)fail(404,'not_found');
      return {table:'annotation_replies',column:'reply_id',row:row!,root:parent!};
    }
    if(!['annotation','feedback'].includes(String(kind)))fail(400,'invalid_input');
    const row=await root(id);if(!row||row.source!==kind)fail(404,'not_found');
    return {table:kind==='annotation'?'annotations':'feedback',column:kind==='annotation'?'annotation_id':'feedback_id',row:row!,root:row!};
  }
  function cursor() {
    const value=url.searchParams.get('before');if(!value)return [Date.now()+1,'ffffffff-ffff-ffff-ffff-ffffffffffff'] as const;
    const [t,id]=value.split(':');if(!Number.isSafeInteger(Number(t)))fail(400,'invalid_cursor');return [Number(t),uuid(id)] as const;
  }
  const next=(rows:Row[])=>rows.length===50?`${rows.at(-1)!.created_at}:${rows.at(-1)!.id}`:null;
  async function safeRows(rows:Row[]) {
    return Promise.all(rows.map(async row=>{const {user_id,request_hash,request_id,...safe}=row;return {...safe,author_key:await digest(`public:${user_id}`)};}));
  }
  async function publicCache(build:()=>Promise<unknown>) {
    // Versioned cache keys invalidate the whole public representation after every
    // visibility or account mutation. No personal response ever enters this cache.
    const version=await env.DB.prepare('SELECT version FROM interaction_version WHERE id=1').first<{version:number}>();
    const key=new URL(url);key.searchParams.set('__interaction_version',String(version!.version));
    const cache=await caches.open('public-annotations'); const cached=await cache.match(key.href);
    if(cached)return json(await cached.json());
    const value=await build();await cache.put(key.href,Response.json(value,{headers:{'Cache-Control':'public,max-age=30'}}));return json(value);
  }
  async function visibility(userId:string,body:string) {
    const adopted=await env.DB.prepare("SELECT count(*) AS n FROM feedback f JOIN resolutions r ON r.feedback_id=f.id WHERE f.user_id=? AND r.outcome='updated'").bind(userId).first<{n:number}>();
    return adopted!.n>=3&&!/(?:https?:\/\/|www\.)/iu.test(body)?'public':'pending';
  }
  async function saved(table:string,userId:string,requestId:string,hash:string) {
    const row=await env.DB.prepare(`SELECT id,request_hash,visibility FROM ${table} WHERE user_id=? AND request_id=?`).bind(userId,requestId).first<Row>();
    if(row&&row.request_hash!==hash)fail(409,'idempotency_conflict');return row;
  }
  if(path.startsWith('/api/admin/annotations')) {
    if(await digest(request.headers.get('Authorization')??'')!==await digest(`Bearer ${env.ADMIN_TOKEN}`))fail(401,'admin_required');
    if(request.headers.has('Origin'))sameOrigin(request,env);
    if(request.method==='GET'&&path==='/api/admin/annotations') {
      const [before,id]=cursor();
      const items=await env.DB.prepare(`SELECT * FROM (
        SELECT a.id,a.body,a.visibility,a.created_at,'annotation' AS entity,a.path,a.exact,a.kind,NULL AS parent_id,u.display_name FROM annotations a JOIN users u ON u.id=a.user_id
        UNION ALL SELECT p.id,p.body,p.visibility,p.created_at,'reply' AS entity,r.path,r.exact,'reply' AS kind,r.id AS parent_id,u.display_name FROM annotation_replies p JOIN (${roots}) r ON r.id=COALESCE(p.annotation_id,p.feedback_id) JOIN users u ON u.id=p.user_id
        UNION ALL SELECT f.id,f.reason AS body,f.status AS visibility,f.created_at,'report' AS entity,r.path,r.exact,'report' AS kind,COALESCE(f.annotation_id,f.feedback_id,f.reply_id) AS parent_id,u.display_name FROM annotation_reports f LEFT JOIN annotation_replies p ON p.id=f.reply_id JOIN (${roots}) r ON r.id=COALESCE(f.annotation_id,f.feedback_id,p.annotation_id,p.feedback_id) JOIN users u ON u.id=f.user_id
      ) WHERE (created_at<? OR (created_at=? AND id<?)) ORDER BY created_at DESC,id DESC LIMIT 50`).bind(before,before,id).all<Row>();
      return json({untrusted_reader_data:items.results,next_before:next(items.results)});
    }
    const match=path.match(/^\/api\/admin\/annotations\/([a-f0-9-]{36})\/moderate$/);
    if(!match||request.method!=='POST')fail(404,'not_found');
    const data=await payload(request);const id=uuid(match![1]);const show=text(data.visibility,10);
    if(!['pending','public','hidden'].includes(show))fail(400,'invalid_input');
    let item:Target;
    if(data.entity==='report') {
      const report=await env.DB.prepare('SELECT * FROM annotation_reports WHERE id=?').bind(id).first<Row>();if(!report)fail(404,'not_found');
      const column=report!.reply_id?'reply_id':report!.annotation_id?'annotation_id':'feedback_id';
      item=await target(String(report![column]),column==='reply_id'?'reply':column==='annotation_id'?'annotation':'feedback');
      await env.DB.batch([env.DB.prepare(`UPDATE ${item.table} SET visibility=? WHERE id=?`).bind(show,item.row.id),env.DB.prepare("UPDATE annotation_reports SET status='reviewed' WHERE id=?").bind(id),bumpInteractions(env)]);
    }else{
      item=await target(id,data.entity);
      await env.DB.batch([env.DB.prepare(`UPDATE ${item.table} SET visibility=? WHERE id=?`).bind(show,id),bumpInteractions(env)]);
    }
    return json({id,visibility:show});
  }
  if(request.method==='GET'&&path==='/api/annotations/summary') {
    const topic=text(url.searchParams.get('topic'),100,1);
    if(!Object.keys(h.pages).some(p=>p===`/${topic}`||p.startsWith(`/${topic}/`)))fail(404,'unknown_page');
    return publicCache(async()=>{
      const rows=await env.DB.prepare(`SELECT a.path,count(DISTINCT CASE WHEN a.exact<>'' AND a.kind IN ('highlight','discussion','supplement') THEN a.user_id END) AS highlights,sum(CASE WHEN a.kind<>'highlight' THEN 1 ELSE 0 END)+(SELECT count(*) FROM annotation_replies p JOIN (${roots}) r ON r.id=COALESCE(p.annotation_id,p.feedback_id) WHERE r.path=a.path AND r.visibility='public' AND p.visibility='public') AS comments FROM (${roots}) a WHERE a.visibility='public' AND (a.path=? OR a.path LIKE ?) GROUP BY a.path`).bind(`/${topic}`,`/${topic}/%`).all();return {items:rows.results};
    });
  }
  if(request.method==='GET'&&(path==='/api/annotations'||path==='/api/me/annotations')) {
    const mine=path==='/api/me/annotations';const user=mine?await authenticated(request,env):null;
    const page=mine?null:url.searchParams.get('chapter');if(!mine&&!h.pages[page??''])fail(404,'unknown_page');
    const [before,id]=cursor();
    const read=async()=>{
      const where=mine?`(a.user_id=? OR (a.visibility='public' AND a.id IN (SELECT COALESCE(annotation_id,feedback_id) FROM annotation_replies WHERE user_id=?)))`:`a.path=? AND a.visibility='public'`;
      const query=env.DB.prepare(`SELECT a.*,u.display_name,(SELECT count(*) FROM annotation_reactions l WHERE l.annotation_id=a.id OR l.feedback_id=a.id) AS likes,(SELECT count(*) FROM annotation_replies p WHERE (p.annotation_id=a.id OR p.feedback_id=a.id) AND p.visibility='public') AS reply_count FROM (${roots}) a JOIN users u ON u.id=a.user_id WHERE ${where} AND (a.created_at<? OR (a.created_at=? AND a.id<?)) ORDER BY a.created_at DESC,a.id DESC LIMIT 50`);
      const rows=await query.bind(...(mine?[user!.user_id,user!.user_id]:[page]),before,before,id).all<Row>();
      const items=await safeRows(rows.results);
      if(mine)items.forEach((item,i)=>Object.assign(item,{owned:rows.results[i].user_id===user!.user_id}));
      return {items,next_before:next(rows.results)};
    };
    return mine?json(await read()):publicCache(read);
  }
  if(request.method==='GET'&&path==='/api/annotations/mine-state') {
    const user=await authenticated(request,env);
    const a=await env.DB.prepare('SELECT id FROM annotations WHERE user_id=?').bind(user.user_id).all();
    const f=await env.DB.prepare('SELECT id FROM feedback WHERE user_id=?').bind(user.user_id).all();
    const l=await env.DB.prepare('SELECT COALESCE(annotation_id,feedback_id,reply_id) AS id FROM annotation_reactions WHERE user_id=?').bind(user.user_id).all();
    return json({owned:[...a.results,...f.results].map(i=>i.id),liked:l.results.map(i=>i.id)});
  }
  const replyMatch=path.match(/^\/api\/annotations\/([a-f0-9-]{36})\/replies$/);
  if(replyMatch&&request.method==='GET') {
    const parent=await root(replyMatch[1]);if(!parent)fail(404,'not_found');
    // Personal pending replies need authentication and never enter the public cache.
    const own=url.searchParams.get('mine')==='1'; const user=own?await authenticated(request,env):null;
    if(parent!.visibility!=='public'&&parent!.user_id!==user?.user_id)fail(404,'not_found');
    const [before,id]=cursor();
    const read=async()=>{
      const result=await env.DB.prepare(`SELECT p.*,u.display_name,(SELECT count(*) FROM annotation_reactions l WHERE l.reply_id=p.id) AS likes FROM annotation_replies p JOIN users u ON u.id=p.user_id WHERE COALESCE(p.annotation_id,p.feedback_id)=? AND (p.visibility='public' ${own?'OR p.user_id=?':''}) AND (p.created_at<? OR (p.created_at=? AND p.id<?)) ORDER BY p.created_at DESC,p.id DESC LIMIT 50`).bind(parent!.id,...(own?[user!.user_id]:[]),before,before,id).all<Row>();
      return {items:await safeRows(result.results),next_before:next(result.results)};
    };return own?json(await read()):publicCache(read);
  }
  if(request.method==='POST'&&path==='/api/annotations') {
    const user=await authenticated(request,env,true);const data=await payload(request);
    const page=text(data.path,200,1);const revision=text(data.content_sha,64,1);const kind=text(data.kind,20,1);
    const exact=text(data.exact,1000,1).replace(/\s+/gu,' ');const prefix=text(data.prefix,80);const suffix=text(data.suffix,80);
    // Context spaces are meaningful and must not be trimmed by validation.
    const before=data.prefix as string;const after=data.suffix as string;
    const body=kind==='highlight'?'':text(data.body,3000,3);const requestId=text(data.request_id,80,1);
    if(!h.pages[page]||!['highlight','discussion'].includes(kind)||data.consent!==true)fail(400,'invalid_input');
    if(revision!==h.revision)fail(409,'content_changed');
    if(!h.pages[page].text.includes(before+exact+after))fail(409,'quote_changed');
    const hash=await digest(JSON.stringify([page,revision,kind,exact,before,after,body]));const existing=await saved('annotations',user.user_id,requestId,hash);if(existing)return json({id:existing.id,visibility:existing.visibility});
    await challenge(request,env,data,'annotation');await rate(env,`annotations:${user.user_id}`,30,86400000);
    const show=await visibility(user.user_id,body);const id=crypto.randomUUID();
    await env.DB.batch([env.DB.prepare('INSERT INTO annotations VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(user_id,request_id) DO NOTHING').bind(id,user.user_id,requestId,hash,page,revision,exact,before,after,kind,body,show,Date.now()),bumpInteractions(env)]);
    const row=await saved('annotations',user.user_id,requestId,hash);return json({id:row!.id,visibility:row!.visibility},201);
  }
  if(replyMatch&&request.method==='POST') {
    const user=await authenticated(request,env,true);const data=await payload(request);const parent=await root(replyMatch[1]);
    if(!parent||parent.visibility!=='public')fail(404,'not_found');
    const body=text(data.body,3000,3);const requestId=text(data.request_id,80,1);if(data.consent!==true)fail(400,'invalid_input');
    const replyTo=data.reply_to?uuid(data.reply_to):null;
    if(replyTo){const to=await env.DB.prepare("SELECT id FROM annotation_replies WHERE id=? AND COALESCE(annotation_id,feedback_id)=? AND visibility='public'").bind(replyTo,parent!.id).first();if(!to)fail(404,'not_found');}
    const hash=await digest(JSON.stringify([parent!.id,replyTo,body]));const existing=await saved('annotation_replies',user.user_id,requestId,hash);if(existing)return json({id:existing.id,visibility:existing.visibility});
    await challenge(request,env,data,'reply');const show=await visibility(user.user_id,body);const id=crypto.randomUUID();
    await env.DB.batch([env.DB.prepare('INSERT INTO annotation_replies VALUES(?,?,?,?,?,?,?,?,?,?) ON CONFLICT(user_id,request_id) DO NOTHING').bind(id,parent!.source==='annotation'?parent!.id:null,parent!.source==='feedback'?parent!.id:null,user.user_id,replyTo,body,show,requestId,hash,Date.now()),bumpInteractions(env)]);
    const row=await saved('annotation_replies',user.user_id,requestId,hash);return json({id:row!.id,visibility:row!.visibility},201);
  }
  const action=path.match(/^\/api\/annotations\/([a-f0-9-]{36})\/(like|report|remove)$/);
  if(action&&request.method==='POST') {
    const user=await authenticated(request,env,true);const data=await payload(request);const item=await target(action[1],data.entity);
    if(action[2]==='remove') {
      if(item.row.user_id!==user.user_id||item.table!=='annotations'||item.row.kind!=='highlight')fail(403,'not_owned_highlight');
      await challenge(request,env,data,'annotation');await env.DB.batch([env.DB.prepare('DELETE FROM annotations WHERE id=?').bind(item.row.id),bumpInteractions(env)]);return json({ok:true});
    }
    if(action[2]==='report') {
      const reason=text(data.reason,1000,3);
      const previous=await env.DB.prepare(`SELECT id FROM annotation_reports WHERE user_id=? AND ${item.column}=?`).bind(user.user_id,item.row.id).first();if(previous)return json({received:true});
      if(item.root.visibility!=='public'||item.row.visibility!=='public')fail(404,'not_found');
      await challenge(request,env,data,'report');await rate(env,`reports:${user.user_id}`,3,86400000);
      await env.DB.batch([env.DB.prepare(`INSERT INTO annotation_reports(id,${item.column},user_id,reason,created_at) VALUES(?,?,?,?,?) ON CONFLICT DO NOTHING`).bind(crypto.randomUUID(),item.row.id,user.user_id,reason,Date.now()),env.DB.prepare(`UPDATE ${item.table} SET visibility='hidden' WHERE id=?`).bind(item.row.id),bumpInteractions(env)]);return json({received:true},201);
    }
    if(item.root.visibility!=='public'||item.row.visibility!=='public')fail(404,'not_found');
    if(typeof data.liked!=='boolean')fail(400,'invalid_input');await challenge(request,env,data,'reaction');
    const statement=data.liked?env.DB.prepare(`INSERT INTO annotation_reactions(id,${item.column},user_id,created_at) VALUES(?,?,?,?) ON CONFLICT DO NOTHING`).bind(crypto.randomUUID(),item.row.id,user.user_id,Date.now()):env.DB.prepare(`DELETE FROM annotation_reactions WHERE ${item.column}=? AND user_id=?`).bind(item.row.id,user.user_id);
    await env.DB.batch([statement,bumpInteractions(env)]);return json({liked:data.liked});
  }
  return fail(404,'not_found');
}
