const root = document.querySelector<HTMLElement>('[data-revenue-demo]');
if (root && root.dataset.ready !== 'true') {
  const views = root.querySelector<HTMLInputElement>('#revenue-views')!;
  const rpm = root.querySelector<HTMLInputElement>('#revenue-rpm')!;
  const reset = root.querySelector<HTMLButtonElement>('[data-revenue-reset]')!;
  const number = (value: number) => value.toLocaleString('en-US');
  const money = (value: number) => `${value < 0 ? '−' : ''}${Math.abs(value).toFixed(2)} 美元`;
  function render() {
    const pageViews = Number(views.value);
    const rate = Number(rpm.value);
    const estimate = pageViews / 1000 * rate;
    root!.querySelector<HTMLOutputElement>('#revenue-views-value')!.value = number(pageViews);
    root!.querySelector<HTMLOutputElement>('#revenue-rpm-value')!.value = rate.toFixed(2);
    views.setAttribute('aria-valuetext', `${number(pageViews)} 次页面浏览`);
    rpm.setAttribute('aria-valuetext', `每千次页面浏览 ${rate.toFixed(2)} 美元`);
    root!.querySelector<HTMLElement>('[data-revenue-estimate]')!.textContent = money(estimate);
    root!.querySelector<HTMLElement>('[data-revenue-margin]')!.textContent = money(estimate - 180);
    root!.querySelector<HTMLElement>('[data-revenue-time]')!.textContent = money(estimate - 324);
    const balance = estimate - 324;
    const comparison = balance < 0 ? `仍差 ${money(-balance)}` : balance === 0 ? '刚好覆盖列明费用与时间估值' : `剩余 ${money(balance)}`;
    root!.querySelector<HTMLElement>('[data-revenue-explanation]')!.textContent = `${number(pageViews)} ÷ 1000 × ${rate.toFixed(2)} = ${money(estimate)}。减去 180 美元费用和 144 美元时间估值，${comparison}。${rate === 0 ? '页面 RPM 为 0 时，单靠增加浏览量无法覆盖这些成本。' : ''}这是基于预估收益的比较，不能当作银行余额；新增流量若增加费用，还要重新计算。`;
  }
  views.addEventListener('input', render);
  rpm.addEventListener('input', render);
  reset.addEventListener('click', () => {
    views.value = '100000';
    rpm.value = '3';
    render();
    views.focus();
  });
  render();
  root.querySelector<HTMLFieldSetElement>('[data-revenue-controls]')!.disabled = false;
  reset.hidden = false;
  root.dataset.ready = 'true';
}
