const root = document.querySelector<HTMLElement>('[data-business-review]');
if (root && root.dataset.ready !== 'true') {
  const settlement = root.querySelector<HTMLSelectElement>('#review-settlement')!;
  const support = root.querySelector<HTMLSelectElement>('#review-support')!;
  const reset = root.querySelector<HTMLButtonElement>('[data-review-reset]')!;
  const money = (amount: number) => `${amount < 0 ? '−' : ''}${Math.abs(amount)} 美元`;
  function render() {
    const paidNow = settlement.value === 'now';
    const hours = Number(support.value);
    const totalHours = 48 + hours;
    root!.querySelector<HTMLElement>('[data-review-cash]')!.textContent = money(292 + (paidNow ? 160 : 0));
    root!.querySelector<HTMLElement>('[data-review-time-label]')!.textContent = `按 ${totalHours} 小时计入时间估值后`;
    root!.querySelector<HTMLElement>('[data-review-time]')!.textContent = money(485 - totalHours * 18);
    root!.querySelector<HTMLElement>('[data-review-explanation]')!.textContent = `${paidNow ? '160 美元提前到账，改变本月现金' : '160 美元留在待结款，本月还不能使用'}；支持用时 ${hours} 小时，总投入 ${totalHours} 小时。订单与列明费用不变，余量仍为 485 美元。减少时间不表示银行收到更多钱。`;
  }
  settlement.addEventListener('change', render);
  support.addEventListener('change', render);
  reset.addEventListener('click', () => {
    settlement.value = 'later';
    support.value = '12';
    render();
    settlement.focus();
  });
  root.querySelector<HTMLFieldSetElement>('[data-review-controls]')!.disabled = false;
  reset.hidden = false;
  render();
  root.dataset.ready = 'true';
}
