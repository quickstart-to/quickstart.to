const calculator = document.querySelector<HTMLElement>('[data-pricing-calculator]');
if (calculator) {
  const price = calculator.querySelector<HTMLInputElement>('[data-pricing-price]')!;
  const orders = calculator.querySelector<HTMLInputElement>('[data-pricing-orders]')!;
  const minutes = calculator.querySelector<HTMLInputElement>('[data-pricing-minutes]')!;
  const fixed = calculator.querySelector<HTMLInputElement>('[data-pricing-fixed]')!;
  const inputs = [price, orders, minutes, fixed];
  const error = calculator.querySelector<HTMLElement>('[data-pricing-error]')!;
  const write = (name: string, text: string) => {
    calculator.querySelector<HTMLElement>(`[data-pricing-${name}]`)!.textContent = text;
  };
  const money = (cents: number) => (cents / 100).toFixed(2);
  const render = () => {
    const invalid = inputs.filter(input => !input.validity.valid || !Number.isFinite(input.valueAsNumber));
    inputs.forEach(input => input.setAttribute('aria-invalid', String(invalid.includes(input))));
    error.hidden = invalid.length === 0;
    if (invalid.length) {
      error.textContent = '价格填写 1–100 美元，以 0.5 美元递增；人数 0–100、分钟 0–120、固定支出 0–500，后三项填写整数。下方保留上一次有效结果。';
      return;
    }
    const priceCents = Math.round(price.valueAsNumber * 100);
    const count = orders.valueAsNumber;
    const supportCents = minutes.valueAsNumber * 30;
    const fixedCents = fixed.valueAsNumber * 100;
    const unitCents = priceCents - 200 - supportCents;
    const cashCents = count * (priceCents - 200) - fixedCents;
    write('revenue', money(priceCents));
    write('time', money(supportCents));
    write('unit', money(unitCents));
    write('cash', money(cashCents));
    write('total', money(cashCents - count * supportCents));
    write('hours', (count * minutes.valueAsNumber / 60).toFixed(2));
    let reading: string;
    if (unitCents < 0) {
      reading = `每增加一单，计入支持时间后就多出 ${money(-unitCents)} 美元缺口；增加订单无法靠这个单价填平所列成本。先检查交付范围和支持工作。`;
    } else if (unitCents === 0) {
      reading = fixedCents > 0
        ? `每单剩余为 0 美元；无论增加多少订单，都无法填上 ${money(fixedCents)} 美元固定支出。`
        : '每单恰好覆盖所列变动支出和支持时间，没有固定支出，也没有剩余；尚未计入的工作仍需另算。';
    } else {
      const totalCents = cashCents - count * supportCents;
      const outcome = totalCents >= 0
        ? `当前 ${count} 单已覆盖，还剩 ${money(totalCents)} 美元。`
        : `当前 ${count} 单尚有 ${money(-totalCents)} 美元缺口。`;
      reading = fixedCents > 0
        ? `每单剩余 ${money(unitCents)} 美元；至少需要 ${Math.ceil(fixedCents / unitCents)} 单覆盖所列成本。${outcome}`
        : `每单剩余 ${money(unitCents)} 美元；本轮没有设固定支出，当前 ${count} 单合计剩余 ${money(totalCents)} 美元。`;
    }
    const noOrders = fixedCents > 0
      ? '本轮尚无订单，销售收入与支持时间均为 0，仍承担固定支出。'
      : '本轮尚无订单，销售收入、支持时间与所列固定支出均为 0。';
    write('reading', count === 0 ? `${noOrders}${reading}` : reading);
  };
  inputs.forEach(input => { input.disabled = false; input.addEventListener('input', render); });
  const reset = calculator.querySelector<HTMLButtonElement>('[data-pricing-reset]')!;
  reset.hidden = false;
  reset.addEventListener('click', () => {
    [price.value, orders.value, minutes.value, fixed.value] = ['20', '10', '20', '60'];
    render();
  });
  render();
}
