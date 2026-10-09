// Keep the article's static results available when scripting is disabled.
const demo = document.querySelector<HTMLElement>('[data-report-demo]');
if (demo) {
  const research = demo.querySelector<HTMLInputElement>('[data-hours="research"]')!;
  const draft = demo.querySelector<HTMLInputElement>('[data-hours="draft"]')!;
  const judgment = demo.querySelector<HTMLInputElement>('[data-judgment]')!;
  const status = demo.querySelector<HTMLElement>('[data-demo-status]')!;
  const format = (value: string) => Number(value).toLocaleString('en', { maximumFractionDigits: 1 });
  const render = () => {
    const total = Number(research.value) + Number(draft.value);
    demo.querySelectorAll('[data-research-value]').forEach(el => { el.textContent = format(research.value); });
    demo.querySelectorAll('[data-draft-value]').forEach(el => { el.textContent = format(draft.value); });
    demo.querySelector('[data-total]')!.textContent = format(String(total));
    demo.querySelectorAll<HTMLElement>('[data-human-output]').forEach(el => {
      el.textContent = judgment.checked ? el.dataset.filled! : el.dataset.empty!;
      el.classList.toggle('gg-filled', judgment.checked);
    });
    status.textContent = `已汇总 ${format(String(total))} 小时。${judgment.checked ? '项目状态和下一步来自使用者补充的示例判断。' : '工时记录不能自动说明项目状态和下一步。'}`;
  };
  demo.querySelectorAll<HTMLInputElement>('input').forEach(input => {
    input.disabled = false;
    input.addEventListener('input', render);
  });
  const reset = demo.querySelector<HTMLButtonElement>('[data-demo-reset]')!;
  reset.hidden = false;
  reset.addEventListener('click', () => {
    research.value = '3';
    draft.value = '2';
    judgment.checked = false;
    render();
  });
  render();
}

// No YouTube request (including thumbnails) is made until the reader asks for the player.
for (const card of document.querySelectorAll<HTMLElement>('[data-video-card]')) {
  const button = card.querySelector<HTMLButtonElement>('[data-video-load]');
  const mount = card.querySelector<HTMLElement>('[data-video-mount]');
  const link = card.querySelector<HTMLAnchorElement>('[data-video-link]');
  if (!button || !mount || !link) continue;
  const url = new URL(link.href);
  const id = url.searchParams.get('v');
  if (!['www.youtube.com', 'youtube.com'].includes(url.hostname) || !id || !/^[\w-]{11}$/.test(id)) continue;
  button.hidden = false;
  button.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=0`;
    iframe.title = `YouTube: ${card.querySelector('h3')?.textContent?.trim() || 'Video'}`;
    iframe.allow = 'encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    mount.replaceChildren(iframe);
    button.hidden = true;
    card.querySelector<HTMLElement>('[data-video-placeholder]')!.hidden = true;
    mount.hidden = false;
    iframe.focus();
  }, { once: true });
}
