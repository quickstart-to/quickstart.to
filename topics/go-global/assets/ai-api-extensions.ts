const demo = document.querySelector<HTMLElement>('[data-aap-cost]');
if (demo) {
  const form = demo.querySelector<HTMLFormElement>('form')!;
  const fields = demo.querySelector<HTMLFieldSetElement>('[data-aap-fields]')!;
  const control = (name: string) => form.elements.namedItem(name) as HTMLInputElement;
  const write = (key: string, text: string) => { demo.querySelector<HTMLElement>(`[data-aap-${key}]`)!.textContent = text; };
  const update = () => {
    const accepted = Number(control('accepted').value);
    const extra = Number(control('extra').value);
    const review = Number(control('review').value);
    write('accepted-label', String(accepted));
    write('extra-label', String(extra));
    write('review-label', String(review));
    const cost = (100 + extra) * 0.02 + 10 + 15;
    const minutes = 100 * review + (100 - accepted) * 3;
    write('provider', `${100 + extra} 次模型尝试 × 0.02 + 10 + 15 = ${cost.toFixed(2)} 美元；${accepted ? `每份可用草稿约 ${(cost / accepted).toFixed(2)} 美元。` : '没有可用草稿，无法计算每份有效结果的成本；这笔投入仍已发生。'}`);
    write('user', `100 × ${review} + ${100 - accepted} × 3 = ${minutes} 分钟，${minutes === 300 ? '与原来的 300 分钟相同。' : `比原来的 300 分钟${minutes < 300 ? '少' : '多'} ${Math.abs(300 - minutes)} 分钟。`}`);
  };
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('input', update);
  form.addEventListener('reset', () => { setTimeout(update, 0); });
  fields.disabled = false;
}
