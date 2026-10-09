// Synthetic records are also present in the article's complete no-script state.
const review = document.querySelector<HTMLElement>('[data-launch-review]');
if (review) {
  const metric = review.querySelector<HTMLSelectElement>('[data-launch-metric]')!;
  const support = review.querySelector<HTMLInputElement>('[data-launch-support]')!;
  const records = {
    a: { completed: 18, independent: 4, used: 2, preparation: 240, assistance: 210 },
    b: { completed: 10, independent: 6, used: 3, preparation: 360, assistance: 60 },
  };
  const descriptions = {
    completed: { unit: '完成者', reading: '包括陪同，A 有 18 人完成，B 有 10 人。这个口径没有区分产品自己完成了多少工作。' },
    independent: { unit: '独立完成者', reading: '独立完成，A 有 4 人，B 有 6 人。A 其余 14 位完成者和 B 其余 4 位完成者需要陪同；先看帮助发生在哪里。' },
    used: { unit: '回访称已使用者', reading: '回访称已用于实际工作，A 有 2 人，B 有 3 人。人数很少，也不是付款或持续使用的证据；它们只是下一轮要继续了解的对象。' },
  };
  const format = (n: number) => n.toLocaleString('zh-CN', { maximumFractionDigits: 1 });
  const render = () => {
    const key = metric.value as keyof typeof descriptions;
    const description = descriptions[key];
    for (const [round, record] of Object.entries(records)) {
      const count = record[key];
      const minutes = record.preparation + (support.checked ? record.assistance : 0);
      review.querySelector(`[data-launch-count="${round}"]`)!.textContent = format(count);
      review.querySelector<HTMLElement>(`[data-launch-bar="${round}"]`)!.style.width = `${count / 18 * 100}%`;
      review.querySelector(`[data-launch-effort="${round}"]`)!.textContent = `共投入 ${format(minutes / 60)} 小时；每位${description.unit} ${format(minutes / count)} 分钟。`;
    }
    review.querySelector('[data-launch-reading]')!.textContent = description.reading + (support.checked ? '' : ' 当前未计陪同时间，会低估作者的全部投入。');
  };
  metric.disabled = false;
  support.disabled = false;
  metric.addEventListener('change', render);
  support.addEventListener('change', render);
  const reset = review.querySelector<HTMLButtonElement>('[data-launch-reset]')!;
  reset.hidden = false;
  reset.addEventListener('click', () => { metric.value = 'completed'; support.checked = true; render(); });
  render();
}

// No third-party player or thumbnail request before explicit activation.
const video = document.querySelector<HTMLElement>('[data-launch-video]');
if (video) {
  const button = video.querySelector<HTMLButtonElement>('[data-launch-video-load]')!;
  button.hidden = false;
  button.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/hyYCn_kAngI?start=525&autoplay=0&rel=0';
    iframe.title = 'Y Combinator: How to Get Your First Customers';
    iframe.allow = 'encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    video.querySelector('[data-launch-video-stage]')!.replaceChildren(iframe);
    iframe.focus();
  }, { once: true });
}
