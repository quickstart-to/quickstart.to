import { indexedText, anchorQuote, type Quote } from '../../shared/quote-anchor';
import { copy, tr, language, type CopyKey } from '../lib/annotation-copy';
type Config = { enabled: boolean; revision: string; site_key: string; email_enabled: boolean };
type Identity = { user: { name: string; can_email: boolean } | null; csrf?: string };
type Item = Quote & { source: 'annotation' | 'feedback'; author_key: string; content_sha: string; kind: string; likes: number; reply_count: number; owned?: boolean; created_at: number; resolved_at?: number; handled_sha?: string; changelog_path?: string } & { id: string; path: string; body: string; display_name: string; status: string; visibility: string; summary?: string; sources?: string; pr_url?: string };
type Turnstile = { render(element: HTMLElement, options: Record<string, unknown>): string; remove(id: string): void };
declare global { interface Window { turnstile?: Turnstile } }
const root = document.querySelector<HTMLElement>('[data-feedback]');
if (root) initialize(root);

async function initialize(root: HTMLElement) {
  const el = <T extends HTMLElement = HTMLElement>(name: string) => root.querySelector<T>(`[data-feedback-${name}]`)!;
  const path = root.dataset.path!;
  const dialog = el<HTMLDialogElement>('dialog'); const form = el<HTMLFormElement>('form');
  const field = <T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(name: string) => form.elements.namedItem(name) as T;
  const draftKey = `qs:feedback-draft:${path}`;
  const emptyQuote = (): Quote => ({ exact: '', prefix: '', suffix: '' });
  let replyTarget: { id: string; reply_to?: string; name: string } | null = null;
  let quote = emptyQuote(); let selection = emptyQuote(); let requestId = crypto.randomUUID();
  let config: Config; let identity: Identity = { user: null }; let token = ''; let widget: string | undefined;
  let turnstileLoading: Promise<Turnstile> | undefined; let challengeGeneration=0;
  const errorKey: Record<string,CopyKey> = { login_required:'needLogin', challenge_failed:'verify', content_changed:'oldHint', quote_changed:'oldHint', rate_limited:'failed', csrf_mismatch:'needLogin', feedback_unavailable:'unavailable', service_unavailable:'failed', provider_unavailable:'failed', idempotency_conflict:'failed', not_found:'missingTarget' };
  async function api(url: string, method = 'GET', data?: unknown) {
    const response = await fetch(url, { method, credentials: 'same-origin', headers: { ...(data ? { 'Content-Type': 'application/json' } : {}), ...(identity.csrf ? { 'X-CSRF-Token': identity.csrf } : {}) }, body: data ? JSON.stringify(data) : undefined });
    const value = await response.json();
    if (!response.ok) {
      if (response.status === 401) forgetIdentity();
      throw new Error(tr(errorKey[value.error] ?? 'failed'));
    }
    return value;
  }
  function saveDraft() {
    try { localStorage.setItem(draftKey, JSON.stringify({ saved: Date.now(), quote, body: field<HTMLTextAreaElement>('body').value, kind: field<HTMLSelectElement>('kind').value, requestId, replyTarget })); }
    catch { el('form-status').textContent = tr('storage'); }
  }
  function clearDraft() { try { localStorage.removeItem(draftKey); } catch {} }
  function restoreDraft() {
    try {
      // Remove only this feature's expired drafts; leave unrelated storage alone.
      for (const key of Object.keys(localStorage).filter(key => key.startsWith('qs:feedback-draft:'))) {
        try { if (Date.now() - JSON.parse(localStorage.getItem(key)!).saved > 7 * 86400000) localStorage.removeItem(key); } catch { localStorage.removeItem(key); }
      }
      const value = JSON.parse(localStorage.getItem(draftKey) ?? 'null');
      if (!value) return;
      if (typeof value.body === 'string') field<HTMLTextAreaElement>('body').value = value.body.slice(0,3000);
      if (['highlight','discussion','confused','outdated','incorrect','supplement'].includes(value.kind)) field<HTMLSelectElement>('kind').value = value.kind;
      if (typeof value.quote?.exact === 'string' && typeof value.quote?.prefix === 'string' && typeof value.quote?.suffix === 'string') quote = value.quote;
      if (value.replyTarget && typeof value.replyTarget.id === 'string' && typeof value.replyTarget.name === 'string') replyTarget = value.replyTarget;
      if (typeof value.requestId === 'string') requestId = value.requestId;
    } catch { clearDraft(); }
  }
  function renderQuote() {
    el('quote').textContent = quote.exact; el('quote').hidden = !quote.exact; el('whole').hidden = !!quote.exact;
  }
  function renderIdentity() {
    el('account').textContent = identity.user ? tr('signedIn')+identity.user.name : '';
    el('settings').hidden = !identity.user;
    el('submit').textContent = tr(identity.user ? 'submit' : 'login');
    el('login-note').hidden = !!identity.user;
    el('email').hidden = !identity.user?.can_email || !config?.email_enabled;
    el('mine').textContent = tr('mine');
  }
  async function turnstile(): Promise<Turnstile> {
    if (window.turnstile) return window.turnstile;
    if (!turnstileLoading) turnstileLoading = new Promise<Turnstile>((resolve, reject) => {
      const script = document.createElement('script'); script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; script.async = true;
      const timer = setTimeout(() => { script.remove(); turnstileLoading = undefined; reject(new Error(tr('challengeFailed'))); }, 15000);
      script.onload = () => { clearTimeout(timer); window.turnstile ? resolve(window.turnstile) : reject(new Error(tr('challengeFailed'))); };
      script.onerror = () => { clearTimeout(timer); script.remove(); turnstileLoading = undefined; reject(new Error(tr('challengeFailed'))); };
      document.head.append(script);
    });
    return turnstileLoading;
  }
  async function mountChallenge(target: HTMLElement, action: string) {
    const generation=++challengeGeneration; token = ''; if (widget && window.turnstile) window.turnstile.remove(widget);
    const service = await turnstile();
    if (generation!==challengeGeneration || (!dialog.open && !el<HTMLDialogElement>('delete-dialog').open && !el<HTMLDialogElement>('action-dialog').open)) return;
    widget = service.render(target, { sitekey: config.site_key, action, callback: (value: string) => { if(generation===challengeGeneration)token = value; }, 'expired-callback': () => { if(generation===challengeGeneration)token = ''; }, 'error-callback': () => { if(generation!==challengeGeneration)return;token = ''; el('form-status').textContent = tr('challengeFailed'); } });
  }
  async function open(useSelection = false, loginOnly = false) {
    el('selection').hidden = true;
    form.noValidate = loginOnly && !identity.user;
    if (useSelection && selection.exact) { quote = selection; replyTarget=null; requestId = crypto.randomUUID(); }
    renderQuote(); renderIdentity(); renderKind(); el('form-status').textContent = '';
    if (!dialog.open) dialog.showModal();
    (field<HTMLSelectElement>('kind').value==='highlight'?field<HTMLSelectElement>('kind'):field<HTMLTextAreaElement>('body')).focus();
    try { await mountChallenge(el('challenge'), identity.user ? submissionAction() : 'login'); }
    catch (error) { el('form-status').textContent = String((error as Error).message); }
  }
  const panel=el<HTMLDialogElement>('panel');const bubble=el<HTMLDialogElement>('bubble');
  const actionDialog=el<HTMLDialogElement>('action-dialog');const actionForm=el<HTMLFormElement>('action-form');
  let publicItems:Item[]=[];let personalItems:Item[]=[];let owned=new Set<string>();let liked=new Set<string>();
  let tab='discussions';let opener:HTMLElement|null=null;let activeThread:string|null=null;
  function forgetIdentity(){identity={user:null};personalItems=[];owned.clear();liked.clear();if(tab==='personal')tab='discussions';renderIdentity();paint();if(panel.open)void renderList();}
  let highlightOn=true;let segments:{range:Range;items:Item[]}[]=[];
  type Action={item:Item|Reply;entity:string;action:'like'|'report'|'remove';liked?:boolean};
  type Reply={id:string;body:string;display_name:string;likes:number;visibility:string;reply_to?:string};
  let pendingAction:Action|null=null;let renderGeneration=0;let bubbleGeneration=0;
  try{highlightOn=localStorage.getItem('qs:highlights')!=='off';}catch{}
  el<HTMLInputElement>('highlights').checked=highlightOn;
  function applyCopy(){
    // Status messages remain readable when the reader changes UI language.
    root.querySelectorAll<HTMLElement>('[role="status"], [data-feedback-action-hint], #annotation-action-title').forEach(node=>{const key=(Object.keys(copy.en) as CopyKey[]).find(key=>copy.en[key]===node.textContent||copy['zh-CN'][key]===node.textContent);if(key)node.textContent=tr(key);});
    root.querySelectorAll<HTMLElement>('[data-a-i18n]').forEach(node=>node.textContent=tr(node.dataset.aI18n as CopyKey));
    root.lang=language();root.querySelector('.annotation-tabs')?.setAttribute('aria-label',tr('title'));field<HTMLTextAreaElement>('body').placeholder=tr('placeholder');renderIdentity();renderKind();
  }
  function submissionAction(){return replyTarget?'reply':['highlight','discussion'].includes(field<HTMLSelectElement>('kind').value)?'annotation':'feedback';}
  function renderKind(){
    const kind=field<HTMLSelectElement>('kind');const highlight=kind.value==='highlight'&&!replyTarget;
    kind.disabled=!!replyTarget;field<HTMLTextAreaElement>('body').required=!highlight;field<HTMLTextAreaElement>('body').disabled=highlight;
    field<HTMLTextAreaElement>('body').hidden=highlight;root.querySelector<HTMLLabelElement>('label[for="feedback-body"]')!.hidden=highlight;
    el('whole').textContent=replyTarget?tr('replying')+replyTarget.name:tr('whole');el('whole').hidden=!!quote.exact&&!replyTarget;
    root.querySelector('#feedback-dialog-title')!.textContent=tr(replyTarget?'replyTitle':'compose');
    el('email').hidden=!!replyTarget||['highlight','discussion'].includes(kind.value)||!identity.user?.can_email||!config?.email_enabled;
  }
  function articleText(){
    const article=document.querySelector<HTMLElement>('[data-article-body]');if(!article)return null;
    const walker=document.createTreeWalker(article,NodeFilter.SHOW_TEXT,{acceptNode:node=>node.parentElement?.closest('script,style,.sources')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
    const nodes:Text[]=[];let node:Node|null;while((node=walker.nextNode()))nodes.push(node as Text);
    return {article,nodes,raw:nodes.map(n=>n.data).join('')};
  }
  function rangeAt(body:NonNullable<ReturnType<typeof articleText>>,start:number,end:number){
    const range=document.createRange();let cursor=0;let found=false;
    for(const node of body.nodes){
      if(!found&&start<cursor+node.length){range.setStart(node,start-cursor);found=true;}
      if(found&&end<=cursor+node.length){range.setEnd(node,end-cursor);return range;}
      cursor+=node.length;
    }return null;
  }
  function located(item:Item){const body=articleText();if(!body)return null;const indexed=indexedText(body.raw);const anchor=anchorQuote(indexed.normalized,item);if(!anchor)return null;const range=rangeAt(body,indexed.offsets[anchor.start],indexed.offsets[anchor.end-1]+1);return range?{range,relocated:anchor.relocated}:null;}
  function locate(item:Item){
    const result=located(item);if(!result){el('panel-status').textContent=tr('oldHint');return;}
    const parent=result.range.startContainer.parentElement!;let ancestor=parent.closest('details');while(ancestor){ancestor.open=true;ancestor=ancestor.parentElement?.closest('details')??null;}
    panel.close();window.getSelection()?.removeAllRanges();window.getSelection()?.addRange(result.range);parent.tabIndex=-1;parent.focus({preventScroll:true});parent.scrollIntoView({block:'center'});
  }
  function paint(){
    const css=CSS as unknown as {highlights?:Map<string,unknown>};
    const Ctor=(window as unknown as {Highlight?:new(...ranges:Range[])=>unknown}).Highlight;
    for(const key of ['qs-one','qs-few','qs-many','qs-own'])css.highlights?.delete(key);segments=[];
    if(!Ctor||!css.highlights){el('highlight-status').textContent=tr('unsupported');return;}
    el('highlight-status').textContent='';if(!highlightOn)return;
    const body=articleText();if(!body)return;const indexed=indexedText(body.raw);
    const items=[...publicItems,...personalItems.filter(i=>owned.has(i.id)&&!publicItems.some(p=>p.id===i.id))].filter(i=>i.path===path&&i.exact&&['highlight','discussion','supplement'].includes(i.kind));
    const anchors=items.flatMap(item=>{const at=anchorQuote(indexed.normalized,item);return at?[{item,...at}]:[];});
    const points=[...new Set(anchors.flatMap(a=>[a.start,a.end]))].sort((a,b)=>a-b);
    const groups:Record<string,Range[]>={'qs-one':[],'qs-few':[],'qs-many':[],'qs-own':[]};
    for(let i=0;i<points.length-1;i++){
      const covered=anchors.filter(a=>a.start<=points[i]&&a.end>=points[i+1]);if(!covered.length)continue;
      const range=rangeAt(body,indexed.offsets[points[i]],indexed.offsets[points[i+1]-1]+1);if(!range)continue;
      const people=new Set(covered.filter(a=>a.item.visibility==='public').map(a=>a.item.author_key)).size;
      const key=covered.some(a=>owned.has(a.item.id))?'qs-own':people>3?'qs-many':people>1?'qs-few':'qs-one';
      groups[key].push(range);segments.push({range,items:covered.map(a=>a.item)});
    }
    for(const [key,ranges]of Object.entries(groups))if(ranges.length)css.highlights.set(key,new Ctor(...ranges));
  }
  document.addEventListener('selectionchange',()=>{
    if(dialog.open||panel.open||actionDialog.open)return;
    const selected=window.getSelection();const body=articleText();selection=emptyQuote();
    if(!selected?.rangeCount||selected.isCollapsed||!body){el('selection').hidden=true;return;}
    const range=selected.getRangeAt(0);if(!body.article.contains(range.startContainer)||!body.article.contains(range.endContainer)){el('selection').hidden=true;return;}
    const offsetAt=(container:Node,offset:number)=>{const before=document.createRange();before.selectNodeContents(body.article);before.setEnd(container,offset);const fragment=before.cloneContents();fragment.querySelectorAll('script,style,.sources').forEach(n=>n.remove());return fragment.textContent?.length??0;};
    const start=offsetAt(range.startContainer,range.startOffset);const end=offsetAt(range.endContainer,range.endOffset);const indexed=indexedText(body.raw);
    const first=indexed.offsets.findIndex(offset=>offset>=start&&offset<end&&!/\s/u.test(body.raw[offset]));let last=first;
    while(last+1<indexed.offsets.length&&indexed.offsets[last+1]<end)last++;
    while(last>first&&indexed.normalized[last]===' ')last--;
    const exact=first<0?'':indexed.normalized.slice(first,last+1);if(!exact||exact.length>1000){el('selection').hidden=true;return;}
    selection={exact,prefix:indexed.normalized.slice(Math.max(0,first-40),first),suffix:indexed.normalized.slice(last+1,last+41)};
    el('selection').hidden=!config?.enabled;
  });
  function textNode(tag:string,text:string){const node=document.createElement(tag);node.textContent=text;return node;}
  function button(key:CopyKey,fn:()=>void|Promise<void>){const b=document.createElement('button');b.type='button';b.textContent=tr(key);b.addEventListener('click',()=>Promise.resolve(fn()).catch(()=>el('panel-status').textContent=tr('failed')));return b;}
  async function all(url:string){const items:Item[]=[];let before:string|null=null;do{const u=new URL(url,location.origin);if(before)u.searchParams.set('before',before);const result=await api(u.pathname+u.search);items.push(...result.items);before=result.next_before;}while(before);return items;}
  async function refresh(){
    publicItems=await all(`/api/annotations?chapter=${encodeURIComponent(path)}`);
    owned.clear();liked.clear();personalItems=[];
    if(identity.user){const state=await api('/api/annotations/mine-state');owned=new Set(state.owned);liked=new Set(state.liked);personalItems=await all('/api/me/annotations');}
    paint();await directoryCounts();if(panel.open)await renderList();
  }
  async function directoryCounts(){
    const result=await api(`/api/annotations/summary?topic=${encodeURIComponent(path.split('/')[1])}`);
    document.querySelectorAll<HTMLElement>('[data-interaction-path]').forEach(node=>{const row=result.items.find((i:{path:string})=>i.path===node.dataset.interactionPath);node.textContent=row?`${row.highlights} ${tr('people')} · ${row.comments} ${tr('comments')}`:'';});
  }
  async function showPanel(nextTab='discussions',id:string|null=null){
    if(nextTab==='personal'&&!identity.user){await open(false,true);return;}
    if(!panel.open){opener=document.activeElement as HTMLElement;bubble.close();document.body.classList.add('annotations-open');panel.showModal();}
    tab=nextTab;activeThread=id;await renderList();
    if(id){const card=panel.querySelector<HTMLElement>(`[data-thread-id="${CSS.escape(id)}"]`);if(card?.closest('[data-feedback-old]'))el<HTMLDetailsElement>('old').open=true;card?.focus();card?.scrollIntoView({block:'nearest'});}
  }
  panel.addEventListener('close',()=>{document.body.classList.remove('annotations-open');if(opener?.isConnected)opener.focus();});
  function card(item:Item){
    const article=document.createElement('article');article.className='annotation-card';article.dataset.threadId=item.id;article.tabIndex=-1;
    article.append(textNode('p',`${item.display_name} · ${tr(item.kind as CopyKey)} · ${item.visibility==='public'?tr('public'):tr(item.visibility==='pending'?'pending':'hidden')}`));
    if(item.exact){article.append(textNode('blockquote',item.exact));if(item.path===path&&located(item))article.append(button('locate',()=>locate(item)));else if(item.path!==path){const link=textNode('a',tr('locate')) as HTMLAnchorElement;link.href=item.path+'#feedback';article.append(link);}else article.append(textNode('p',tr('oldHint')));}
    if(item.body)article.append(textNode('p',item.body));
    if(item.path===path&&located(item)?.relocated)article.append(textNode('p',tr('relocated')));
    if(item.summary){const result=document.createElement('section');result.append(textNode('strong',tr('agent')),textNode('p',item.summary));
      let sources:string[]=[];try{sources=JSON.parse(item.sources??'[]');}catch{}
      for(const [i,href]of [...sources,...(item.pr_url?[item.pr_url]:[])].entries()){if(!/^https:\/\//.test(href))continue;const link=textNode('a',href===item.pr_url?tr('pr'):`${tr('source')} ${i+1}`) as HTMLAnchorElement;link.href=href;link.rel='nofollow noopener';const paragraph=textNode('p','');paragraph.append(link);result.append(paragraph);}
      if(item.handled_sha) { const link=textNode('a',tr('handledVersion')+item.handled_sha.slice(0,7)) as HTMLAnchorElement;link.href=`https://github.com/quickstart-to/quickstart.to/commit/${item.handled_sha}`;result.append(link); }
      if(item.changelog_path?.startsWith('/')) { const link=textNode('a',tr('pr')) as HTMLAnchorElement;link.href=item.changelog_path;const p=textNode('p','');p.append(link);result.append(p); }
      if(item.exact&&!located(item))result.append(textNode('p',tr('originalVersion')+item.content_sha.slice(0,7)));article.append(result);
    }
    if(item.source==='feedback')article.append(textNode('p',tr((item.status in {open:1,triaged:1,accepted:1,resolved:1,rejected:1}?item.status:'open') as CopyKey)));
    if(item.visibility==='public'){
      const like=button(liked.has(item.id)?'unlike':'like',()=>openAction(item,item.source,'like'));like.textContent+=` (${item.likes})`;like.setAttribute('aria-pressed',String(liked.has(item.id)));article.append(like,button('reply',()=>startReply(item)),button('report',()=>openAction(item,item.source,'report')));
    }
    if(item.kind==='highlight'&&owned.has(item.id))article.append(button('remove',()=>openAction(item,item.source,'remove')));
    if(item.visibility==='public'||owned.has(item.id)){
      const disclosure=document.createElement('details');const summary=textNode('summary',`${tr('replies')} (${item.reply_count})`);disclosure.append(summary);const replies=document.createElement('div');disclosure.append(replies);
      let loaded=false;disclosure.addEventListener('toggle',async()=>{if(!disclosure.open||loaded)return;try{const count=await renderReplies(item,replies);summary.textContent=`${tr('replies')} (${count})`;loaded=true;}catch{replies.replaceChildren(textNode('p',tr('partial')),button('refresh',async()=>{const count=await renderReplies(item,replies);summary.textContent=`${tr('replies')} (${count})`;loaded=true;}));}});
      if(activeThread===item.id)disclosure.open=true;article.append(disclosure);
    }return article;
  }
  async function renderList(){
    const generation=++renderGeneration;root.querySelectorAll<HTMLElement>('[data-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tab===tab)));
    const list=el('thread-list');const old=el('old-list');list.replaceChildren();old.replaceChildren();
    const items=(tab==='personal'?personalItems:publicItems.filter(i=>tab==='discussions'?['highlight','discussion','supplement'].includes(i.kind):!['highlight','discussion','supplement'].includes(i.kind)));
    for(const item of items){if(generation!==renderGeneration)return;const outdated=item.path===path&&item.exact&&!located(item);(outdated?old:list).append(card(item));}
    if(!list.children.length)list.append(textNode('p',tr('empty')));el('old').hidden=!old.children.length;
  }
  async function renderReplies(item:Item,container:HTMLElement){
    const replies=await all(`/api/annotations/${item.id}/replies${identity.user?'?mine=1':''}`) as unknown as Reply[];
    container.replaceChildren();for(const reply of [...replies].reverse()){
      const node=document.createElement('article');node.className='annotation-reply';node.append(textNode('strong',reply.display_name));
      if(reply.reply_to){const parent=replies.find(r=>r.id===reply.reply_to);node.append(textNode('p',tr('replyTo')+': '+(parent?.display_name??tr('hidden'))));}
      if(reply.visibility!=='public')node.append(textNode('p',tr(reply.visibility==='pending'?'pending':'hidden')));node.append(textNode('p',reply.body));
      if(reply.visibility==='public'){
        const like=button(liked.has(reply.id)?'unlike':'like',()=>openAction(reply,'reply','like'));like.textContent+=` (${reply.likes})`;like.setAttribute('aria-pressed',String(liked.has(reply.id)));
        node.append(like,button('reply',()=>startReply(item,reply)),button('report',()=>openAction(reply,'reply','report')));
      }container.append(node);
    }if(!replies.length)container.append(textNode('p',tr('empty')));return replies.length;
  }
  async function startReply(item:Item,reply?:Reply){replyTarget={id:item.id,reply_to:reply?.id,name:reply?.display_name??item.display_name};quote={exact:item.exact,prefix:item.prefix,suffix:item.suffix};requestId=crypto.randomUUID();field<HTMLSelectElement>('kind').value='discussion';await open();saveDraft();}
  document.addEventListener('pointerup',async event=>{
    if(dialog.open||panel.open||actionDialog.open||!highlightOn||!window.getSelection()?.isCollapsed)return;
    const hit=segments.find(segment=>[...segment.range.getClientRects()].some(rect=>event.clientX>=rect.left&&event.clientX<=rect.right&&event.clientY>=rect.top&&event.clientY<=rect.bottom));if(!hit)return;
    const people=new Set(hit.items.filter(i=>i.visibility==='public').map(i=>i.author_key)).size;
    el('bubble-comments').replaceChildren();el('bubble').querySelector('h2')!.textContent=`${people} ${tr('people')}`;
    for(const item of [...hit.items].filter(i=>i.body).sort((a,b)=>b.likes-a.likes).slice(0,3))el('bubble-comments').append(textNode('p',`${item.display_name}: ${item.body}`));
    const first=hit.items.find(i=>i.visibility==='public')??hit.items[0];el<HTMLButtonElement>('bubble-open').onclick=()=>void showPanel(owned.has(first.id)&&first.visibility!=='public'?'personal':'discussions',first.id);
    const bubbleId=++bubbleGeneration;
    if(!bubble.open)bubble.show();bubble.style.left=Math.max(8,Math.min(event.clientX,innerWidth-bubble.offsetWidth-8))+'px';bubble.style.top=Math.max(8,Math.min(event.clientY+12,innerHeight-bubble.offsetHeight-8))+'px';
    try{const replies=await Promise.all(hit.items.filter(i=>i.visibility==='public').map(item=>all(`/api/annotations/${item.id}/replies`)));if(bubble.open&&bubbleGeneration===bubbleId){const comments=[...hit.items.filter(i=>i.body),...replies.flat()].filter(i=>i.visibility==='public').sort((a,b)=>b.likes-a.likes).slice(0,3);el('bubble-comments').replaceChildren(...comments.map(i=>textNode('p',`${i.display_name}: ${i.body}`)));}}catch{}
  });
  el('bubble-close').addEventListener('click',()=>bubble.close());
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&bubble.open)bubble.close();});
  async function openAction(item:Item|Reply,entity:string,action:Action['action']){
    if(!identity.user){await open(false,true);return;}
    pendingAction={item,entity,action,liked:!liked.has(item.id)};actionForm.reset();el('action-status').textContent='';
    el('action-hint').textContent=action==='report'?tr('reportHint'):action==='remove'?tr('removeHint'):tr(liked.has(item.id)?'unlike':'like');
    el('reason-label').hidden=action!=='report';(actionForm.elements.namedItem('reason') as HTMLTextAreaElement).required=action==='report';
    root.querySelector('#annotation-action-title')!.textContent=tr(action==='report'?'reportTitle':'actionTitle');actionDialog.showModal();
    try{await mountChallenge(el('action-challenge'),action==='report'?'report':action==='like'?'reaction':'annotation');}catch{el('action-status').textContent=tr('challengeFailed');}
  }
  actionForm.addEventListener('submit',async event=>{
    event.preventDefault();if(!pendingAction)return;if(!token){el('action-status').textContent=tr('verify');return;}
    const button=actionForm.querySelector<HTMLButtonElement>('[type="submit"]')!;button.disabled=true;const current=pendingAction;
    try{await api(`/api/annotations/${current.item.id}/${current.action}`,'POST',{entity:current.entity,liked:current.liked,reason:(actionForm.elements.namedItem('reason') as HTMLTextAreaElement).value,turnstile:token});actionDialog.close();el('panel-status').textContent=tr(current.action==='report'?'reported':'done');await refresh();}
    catch(error){el('action-status').textContent=(error as Error).message;await mountChallenge(el('action-challenge'),current.action==='report'?'report':current.action==='like'?'reaction':'annotation').catch(()=>{});}finally{button.disabled=false;}
  });
  const cleanupWidget=()=>{challengeGeneration++;token='';if(widget&&window.turnstile)window.turnstile.remove(widget);widget=undefined;};
  actionDialog.addEventListener('close',cleanupWidget);el('action-close').addEventListener('click',()=>actionDialog.close());
  el('open').addEventListener('click',()=>void open(true));el('selection').addEventListener('click',()=>void open(true));
  el('browse').addEventListener('click',()=>void showPanel());el('mine').addEventListener('click',()=>void showPanel('personal'));
  el('panel-close').addEventListener('click',()=>panel.close());el('refresh').addEventListener('click',()=>{el('panel-status').textContent='';void refresh().catch(()=>el('panel-status').textContent=tr('partial'));});
  root.querySelectorAll<HTMLElement>('[data-tab]').forEach(b=>b.addEventListener('click',()=>void showPanel(b.dataset.tab)));
  el<HTMLInputElement>('highlights').addEventListener('change',()=>{highlightOn=el<HTMLInputElement>('highlights').checked;try{localStorage.setItem('qs:highlights',highlightOn?'on':'off');}catch{}paint();});
  field<HTMLSelectElement>('kind').addEventListener('change',()=>{requestId=crypto.randomUUID();renderKind();saveDraft();if(identity.user)void mountChallenge(el('challenge'),submissionAction());});
  field<HTMLTextAreaElement>('body').addEventListener('input',()=>{requestId=crypto.randomUUID();saveDraft();});
  el('close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{saveDraft();cleanupWidget();});
  el('discard').addEventListener('click',()=>{form.reset();replyTarget=null;quote=emptyQuote();requestId=crypto.randomUUID();dialog.close();clearDraft();renderKind();});
  form.addEventListener('submit',async event=>{
    event.preventDefault();saveDraft();if(!token){el('form-status').textContent=tr('verify');return;}
    const button=el<HTMLButtonElement>('submit');button.disabled=true;
    try{
      if(!identity.user){const response=await api('/api/auth/start','POST',{turnstile:token,return_path:path});window.location.assign(response.url);return;}
      const kind=field<HTMLSelectElement>('kind').value;const action=submissionAction();
      if(!replyTarget&&['highlight','discussion'].includes(kind)&&!quote.exact){el('form-status').textContent=tr('quoteRequired');return;}
      const body={path,content_sha:config.revision,...quote,kind,body:field<HTMLTextAreaElement>('body').value,consent:field<HTMLInputElement>('consent').checked,notify_email:field<HTMLInputElement>('notify_email').checked,request_id:requestId,turnstile:token,reply_to:replyTarget?.reply_to};
      const submitted=await api(replyTarget?`/api/annotations/${replyTarget.id}/replies`:action==='annotation'?'/api/annotations':'/api/feedback','POST',body);
      const threadId=replyTarget?.id??submitted.id;
      form.reset();quote=emptyQuote();selection=emptyQuote();replyTarget=null;requestId=crypto.randomUUID();dialog.close();clearDraft();el('status').textContent=tr('saved');await refresh();await showPanel('personal',threadId);
    }catch(error){el('form-status').textContent=(error as Error).message;await mountChallenge(el('challenge'),identity.user?submissionAction():'login').catch(()=>{});}finally{button.disabled=false;}
  });
  el('logout').addEventListener('click',async()=>{try{await api('/api/auth/logout','POST',{});forgetIdentity();await refresh();}catch{el('status').textContent=tr('failed');}});
  const deleteDialog=el<HTMLDialogElement>('delete-dialog');
  el('delete').addEventListener('click',async()=>{deleteDialog.showModal();try{await mountChallenge(el('delete-challenge'),'delete');}catch{el('delete-status').textContent=tr('challengeFailed');}});
  el('cancel-delete').addEventListener('click',()=>deleteDialog.close());deleteDialog.addEventListener('close',cleanupWidget);
  el('confirm-delete').addEventListener('click',async()=>{
    if(!token){el('delete-status').textContent=tr('verify');return;}const b=el<HTMLButtonElement>('confirm-delete');b.disabled=true;
    try{await api('/api/me','DELETE',{confirm:'delete',turnstile:token});forgetIdentity();form.reset();replyTarget=null;quote=emptyQuote();clearDraft();deleteDialog.close();el('status').textContent=tr('deleted');tab='discussions';await refresh();}
    catch{el('delete-status').textContent=tr('failed');await mountChallenge(el('delete-challenge'),'delete').catch(()=>{});}finally{b.disabled=false;}
  });
  applyCopy();new MutationObserver(()=>{applyCopy();paint();void directoryCounts().catch(()=>{});if(panel.open)void renderList();}).observe(document.documentElement,{attributes:true,attributeFilter:['data-ui-lang']});
  try{
    config=await api('/api/feedback/config');if(!config.enabled)return;
    el('availability').hidden=true;el('enabled').hidden=false;identity=await api('/api/me');restoreDraft();renderIdentity();renderKind();await refresh();
    if(location.hash==='#feedback'&&identity.user){if(field<HTMLTextAreaElement>('body').value||quote.exact||replyTarget)await open();else await showPanel('personal');}
  }catch{el('availability').hidden=false;el('availability').textContent=tr('loadError');}
}
