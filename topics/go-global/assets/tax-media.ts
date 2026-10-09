const demo = document.querySelector<HTMLElement>('[data-tax-conversion]');
if (demo) {
  const bank = demo.querySelector<HTMLInputElement>('[data-tax-bank]')!;
  const rate = demo.querySelector<HTMLInputElement>('[data-tax-rate]')!;
  const reset = demo.querySelector<HTMLButtonElement>('[data-tax-reset]')!;
  const read = (input: HTMLInputElement) => input.value.trim() !== '' && input.validity.valid && Number.isFinite(input.valueAsNumber) ? input.valueAsNumber : null;
  const write = (key: string, value: string) => { demo.querySelector<HTMLElement>(`[data-tax-${key}]`)!.textContent = value; };
  const update = () => {
    const bankRate = read(bank), incomeRate = read(rate);
    // Separate synthetic bases: 94 USD received; 100 USD income already assumed confirmed.
    const cash = bankRate === null ? null : Math.round(94 * bankRate * 100);
    const income = incomeRate === null ? null : Math.round(100 * incomeRate * 100);
    write('cash', cash === null ? '待确认有效的银行换汇价' : `94 × ${bankRate!.toFixed(4)} = ${(cash / 100).toFixed(2)} CNY`);
    write('income', income === null ? '待确认有效的申报中间价' : `100 × ${incomeRate!.toFixed(4)} = ${(income / 100).toFixed(2)} CNY`);
    if (cash === null || income === null) {
      write('result', '汇率未确认或超出演示范围，暂不比较差额；未知数不会按零处理。');
    } else {
      const difference = income - cash;
      write('result', difference === 0
        ? '本组金额恰好相同，但收入基数与汇率依据仍须分别保留；这不是应缴税额。'
        : `税务折算收入比现金入账${difference > 0 ? '多' : '少'} ${(Math.abs(difference) / 100).toFixed(2)} CNY；差别来自基数与汇率口径，不是应缴税额。`);
    }
  };
  bank.addEventListener('input', update);
  rate.addEventListener('input', update);
  reset.addEventListener('click', () => { bank.value = '7.05'; rate.value = '7.10'; update(); });
  bank.disabled = false;
  rate.disabled = false;
  reset.hidden = false;
  update();
}
