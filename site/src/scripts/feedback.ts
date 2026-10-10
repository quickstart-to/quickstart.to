export {};
type Config = { enabled: boolean; revision: string; site_key: string; email_enabled: boolean };
type Identity = { user: { name: string; can_email: boolean } | null; csrf?: string };
type Quote = { exact: string; prefix: string; suffix: string };
type Item = Quote & { id: string; path: string; body: string; display_name: string; status: string; visibility: string; summary?: string; sources?: string; pr_url?: string };
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
  let quote = emptyQuote(); let selection = emptyQuote(); let requestId = crypto.randomUUID();
  let config: Config; let identity: Identity = { user: null }; let token = ''; let widget: string | undefined;
  let turnstileLoading: Promise<Turnstile> | undefined;
  const errors: Record<string,string> = {
    login_required: '登录已过期，草稿仍在，请重新登录。', challenge_failed: '验证未通过或已过期，请重新验证。',
    content_changed: '文章已更新。请保留草稿并刷新页面，重新选择需要反馈的文字。', quote_changed: '这段文字与当前文章不一致，请关闭窗口并重新选择。',
    rate_limited: '提交过于频繁，请稍后再试。', csrf_mismatch: '会话已变化，请刷新页面后重试，草稿会保留。',
    feedback_unavailable: '反馈服务暂未开放。', service_unavailable: '服务暂时不可用，草稿已保留，请稍后重试。',
    provider_unavailable: '登录或验证服务暂时不可用，请稍后重试。', idempotency_conflict: '草稿已变化，请关闭后重新打开再提交。',
  };
  async function api(url: string, method = 'GET', data?: unknown) {
    const response = await fetch(url, { method, credentials: 'same-origin', headers: { ...(data ? { 'Content-Type': 'application/json' } : {}), ...(identity.csrf ? { 'X-CSRF-Token': identity.csrf } : {}) }, body: data ? JSON.stringify(data) : undefined });
    const value = await response.json();
    if (!response.ok) {
      if (response.status === 401) { identity = { user: null }; renderIdentity(); }
      throw new Error(errors[value.error] ?? '操作未完成，请稍后重试。');
    }
    return value;
  }
  function saveDraft() {
    try { localStorage.setItem(draftKey, JSON.stringify({ saved: Date.now(), quote, body: field<HTMLTextAreaElement>('body').value, kind: field<HTMLSelectElement>('kind').value, requestId })); }
    catch { el('form-status').textContent = '浏览器无法保存草稿。登录前请先复制你的说明。'; }
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
      if (['confused','outdated','incorrect','supplement'].includes(value.kind)) field<HTMLSelectElement>('kind').value = value.kind;
      if (typeof value.quote?.exact === 'string' && typeof value.quote?.prefix === 'string' && typeof value.quote?.suffix === 'string') quote = value.quote;
      if (typeof value.requestId === 'string') requestId = value.requestId;
    } catch { clearDraft(); }
  }
  function renderQuote() {
    el('quote').textContent = quote.exact; el('quote').hidden = !quote.exact; el('whole').hidden = !!quote.exact;
  }
  function renderIdentity() {
    el('account').textContent = identity.user ? `已登录：${identity.user.name}` : '';
    el('settings').hidden = !identity.user;
    el('submit').textContent = identity.user ? '提交反馈' : '登录并继续';
    el('login-note').hidden = !!identity.user;
    el('email').hidden = !identity.user?.can_email || !config?.email_enabled;
    el('mine').textContent = identity.user ? '我的反馈与处理结果' : '登录查看我的反馈';
  }
  async function turnstile(): Promise<Turnstile> {
    if (window.turnstile) return window.turnstile;
    if (!turnstileLoading) turnstileLoading = new Promise<Turnstile>((resolve, reject) => {
      const script = document.createElement('script'); script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; script.async = true;
      const timer = setTimeout(() => { script.remove(); turnstileLoading = undefined; reject(new Error('验证组件加载超时，请关闭后重试。')); }, 15000);
      script.onload = () => { clearTimeout(timer); window.turnstile ? resolve(window.turnstile) : reject(new Error('验证组件加载失败。')); };
      script.onerror = () => { clearTimeout(timer); script.remove(); turnstileLoading = undefined; reject(new Error('验证组件加载失败，请检查网络后重试。')); };
      document.head.append(script);
    });
    return turnstileLoading;
  }
  async function mountChallenge(target: HTMLElement, action: string) {
    token = ''; if (widget && window.turnstile) window.turnstile.remove(widget);
    const service = await turnstile();
    if (!dialog.open && !el<HTMLDialogElement>('delete-dialog').open) return;
    widget = service.render(target, { sitekey: config.site_key, action, callback: (value: string) => { token = value; }, 'expired-callback': () => { token = ''; }, 'error-callback': () => { token = ''; el('form-status').textContent = '验证服务暂不可用，请稍后重试。'; } });
  }
  async function open(useSelection = false, loginOnly = false) {
    el('selection').hidden = true;
    form.noValidate = loginOnly && !identity.user;
    if (useSelection && selection.exact) { quote = selection; requestId = crypto.randomUUID(); }
    renderQuote(); renderIdentity(); el('form-status').textContent = '';
    if (!dialog.open) dialog.showModal();
    field<HTMLTextAreaElement>('body').focus();
    try { await mountChallenge(el('challenge'), identity.user ? 'feedback' : 'login'); }
    catch (error) { el('form-status').textContent = String((error as Error).message); }
  }
  // Text offsets use the same whitespace normalization and exclusions as the build manifest.
  function articleText() {
    const article = document.querySelector('[data-article-body]');
    if (!article) return null;
    const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT, { acceptNode: node => node.parentElement?.closest('script,style,.sources') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    const nodes: Text[] = []; let node: Node | null;
    while ((node = walker.nextNode())) nodes.push(node as Text);
    return { article, nodes, raw: nodes.map(node => node.data).join('') };
  }
  function indexedText(raw: string) {
    let normalized = ''; const offsets: number[] = [];
    for (let i=0;i<raw.length;i++) {
      const char = /\s/u.test(raw[i]) ? ' ' : raw[i];
      if (char === ' ' && (!normalized || normalized.endsWith(' '))) continue;
      normalized += char; offsets.push(i);
    }
    if (normalized.endsWith(' ')) { normalized=normalized.slice(0,-1); offsets.pop(); }
    return { normalized, offsets };
  }
  document.addEventListener('selectionchange', () => {
    if (dialog.open) return;
    const selected = window.getSelection(); const body = articleText();
    if (!selected?.rangeCount || selected.isCollapsed || !body) { el('selection').hidden=true; return; }
    const range = selected.getRangeAt(0);
    if (!body.article.contains(range.startContainer) || !body.article.contains(range.endContainer)) { el('selection').hidden=true; return; }
    const offsetAt = (container: Node, offset: number) => {
      const before = document.createRange(); before.selectNodeContents(body.article); before.setEnd(container,offset);
      const fragment = before.cloneContents();
      fragment.querySelectorAll('script,style,.sources').forEach(node=>node.remove());
      return fragment.textContent?.length ?? 0;
    };
    const start = offsetAt(range.startContainer,range.startOffset);
    const end = offsetAt(range.endContainer,range.endOffset);
    const indexed = indexedText(body.raw);
    const first = indexed.offsets.findIndex(offset => offset >= start && offset < end && !/\s/u.test(body.raw[offset]));
    let last = first;
    while (last + 1 < indexed.offsets.length && indexed.offsets[last+1] < end) last++;
    while (last > first && indexed.normalized[last] === ' ') last--;
    const exact = first < 0 ? '' : indexed.normalized.slice(first,last+1);
    if (!exact || exact.length > 1000) { selection = emptyQuote(); el('selection').hidden=true; return; }
    selection = { exact, prefix: indexed.normalized.slice(Math.max(0,first-40),first), suffix: indexed.normalized.slice(last+1,last+41) };
    el('open').textContent = '反馈所选段落';
    el('selection').hidden = !config?.enabled;
  });
  function locate(item: Item) {
    const body = articleText(); if (!body || !item.exact) return false;
    // Normalize while retaining raw offsets, so a changed paragraph can be relocated safely.
    const { normalized, offsets } = indexedText(body.raw);
    const needle = item.prefix + item.exact + item.suffix; const at = normalized.indexOf(needle);
    if (at < 0 || normalized.indexOf(needle, at+1) >= 0) return false;
    const rawStart = offsets[at+item.prefix.length]; const rawEnd = offsets[at+item.prefix.length+item.exact.length-1]+1;
    let cursor=0; const range=document.createRange(); let foundStart=false;
    for (const node of body.nodes) {
      if (!foundStart && rawStart < cursor+node.length) { range.setStart(node,rawStart-cursor); foundStart=true; }
      if (foundStart && rawEnd <= cursor+node.length) { range.setEnd(node,rawEnd-cursor); break; }
      cursor+=node.length;
    }
    const parent = range.startContainer.parentElement;
    let ancestor = parent?.closest('details'); while (ancestor) { ancestor.open=true; ancestor=ancestor.parentElement?.closest('details') ?? null; }
    window.getSelection()?.removeAllRanges(); window.getSelection()?.addRange(range);
    parent?.scrollIntoView({block:'center'}); return true;
  }
  async function loadItems(mine = false) {
    const result = await api(mine ? '/api/me/feedback' : `/api/feedback?path=${encodeURIComponent(path)}`);
    const target = el('items'); target.replaceChildren();
    const title = document.createElement('h3'); title.textContent = mine ? '我的反馈与处理结果' : '公开反馈'; target.append(title);
    if (!result.items.length) { const p=document.createElement('p'); p.textContent=mine ? '你还没有提交反馈。' : '本篇暂时没有公开反馈。'; target.append(p); }
    for (const item of result.items as Item[]) {
      const card=document.createElement('article'); card.className='feedback-item'; card.id=`feedback-${item.id}`;
      const label=document.createElement('p'); const states:Record<string,string>={open:'待处理',triaged:'已分类',accepted:'待修订',resolved:'已处理',rejected:'未采纳'};
      label.textContent=`${item.display_name} · ${states[item.status]}${mine && item.visibility!=='public' ? ' · 未公开' : ''}`; card.append(label);
      if (item.exact) {
        const quoted=document.createElement('blockquote'); quoted.textContent=item.exact; card.append(quoted);
        if (item.path===path) { const button=document.createElement('button');button.type='button';button.textContent='定位原文';button.onclick=()=>{if(!locate(item)) el('status').textContent='正文已变化，无法可靠定位。上方保留的是提交时的引用。';};card.append(button); }
      }
      const body=document.createElement('p');body.textContent=item.body;card.append(body);
      if (item.path!==path) { const link=document.createElement('a');link.href=`${item.path}#feedback`;link.textContent='打开对应文章';card.append(link); }
      if (item.summary) {
        const reply=document.createElement('div');reply.className='feedback-result';const name=document.createElement('strong');name.textContent='quickstart Agent';const summary=document.createElement('p');summary.textContent=item.summary;reply.append(name,summary);
        const urls: string[] = JSON.parse(item.sources ?? '[]'); if(item.pr_url)urls.push(item.pr_url);
        for(const [index,url] of urls.entries()){const a=document.createElement('a');a.href=url;a.textContent=item.pr_url===url?'查看修订 PR':`核验来源 ${index+1}`;a.rel='nofollow noopener';const p=document.createElement('p');p.append(a);reply.append(p);} card.append(reply);
      }
      target.append(card);
    }
  }
  el('open').addEventListener('click',()=>void open(true));
  el('selection').addEventListener('click',()=>void open(true));
  el('close').addEventListener('click',()=>{saveDraft();dialog.close();});
  el('discard').addEventListener('click',()=>{clearDraft();form.reset();quote=emptyQuote();requestId=crypto.randomUUID();dialog.close();});
  dialog.addEventListener('cancel',saveDraft);
  dialog.addEventListener('close',()=>{token='';if(widget&&window.turnstile)window.turnstile.remove(widget);widget=undefined;});
  form.addEventListener('input',()=>{requestId=crypto.randomUUID();saveDraft();});
  form.addEventListener('submit',async event=>{
    event.preventDefault();saveDraft();el('form-status').textContent='';
    if(!token){el('form-status').textContent='请先完成验证。';return;}
    const button=el<HTMLButtonElement>('submit');button.disabled=true;
    try{
      if(!identity.user){const response=await api('/api/auth/start','POST',{turnstile:token,return_path:path});window.location.assign(response.url);return;}
      await api('/api/feedback','POST',{path,content_sha:config.revision,...quote,kind:field<HTMLSelectElement>('kind').value,body:field<HTMLTextAreaElement>('body').value,consent:field<HTMLInputElement>('consent').checked,notify_email:field<HTMLInputElement>('notify_email').checked,request_id:requestId,turnstile:token});
      clearDraft();form.reset();quote=emptyQuote();selection=emptyQuote();requestId=crypto.randomUUID();dialog.close();el('open').textContent='写反馈';el('status').textContent='反馈已收到，审核前仅你和维护者可见。可在“我的反馈”查看后续结果。';await loadItems(true);
    }catch(error){el('form-status').textContent=(error as Error).message;await mountChallenge(el('challenge'),identity.user?'feedback':'login').catch(()=>{});}
    finally{button.disabled=false;}
  });
  el('mine').addEventListener('click',async()=>{try{if(!identity.user){await open(false,true);return;}await loadItems(true);}catch(error){el('status').textContent=(error as Error).message;}});
  el('logout').addEventListener('click',async()=>{try{await api('/api/auth/logout','POST',{});identity={user:null};renderIdentity();await loadItems();}catch(error){el('status').textContent=(error as Error).message;}});
  const deleteDialog=el<HTMLDialogElement>('delete-dialog');
  el('delete').addEventListener('click',async()=>{deleteDialog.showModal();try{await mountChallenge(el('delete-challenge'),'delete');}catch(error){el('delete-status').textContent=(error as Error).message;}});
  el('cancel-delete').addEventListener('click',()=>deleteDialog.close());
  deleteDialog.addEventListener('close',()=>{token='';if(widget&&window.turnstile)window.turnstile.remove(widget);widget=undefined;});
  el('confirm-delete').addEventListener('click',async()=>{
    if(!token){el('delete-status').textContent='请先完成验证。';return;}
    const button=el<HTMLButtonElement>('confirm-delete');button.disabled=true;
    try{await api('/api/me','DELETE',{confirm:'delete',turnstile:token});identity={user:null};clearDraft();renderIdentity();deleteDialog.close();el('status').textContent='本站账号与反馈已删除。';await loadItems();}
    catch(error){el('delete-status').textContent=(error as Error).message;await mountChallenge(el('delete-challenge'),'delete').catch(()=>{});}finally{button.disabled=false;}
  });
  try {
    config=await api('/api/feedback/config');if(!config.enabled)return;
    el('availability').hidden=true;el('enabled').hidden=false;identity=await api('/api/me');restoreDraft();renderIdentity();await loadItems();
    if(location.hash==='#feedback'&&identity.user){await loadItems(true);if(field<HTMLTextAreaElement>('body').value)await open();}
  }catch{el('availability').textContent='反馈服务暂时不可用，请稍后再试。';}
}
