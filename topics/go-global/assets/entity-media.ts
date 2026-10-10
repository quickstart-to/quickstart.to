const demo = document.querySelector<HTMLElement>('[data-entity-budget]');
if (demo) {
  const scope = demo.querySelector<HTMLSelectElement>('[data-entity-scope]')!;
  const reset = demo.querySelector<HTMLButtonElement>('[data-entity-reset]')!;
  // Synthetic, equal-scope service quotes; state tax is one annual 2026 obligation.
  const quotes = [
    { setup: 450, agent: 150, accounting: 900, state: 400 },
    { setup: 650, agent: 100, accounting: 650, state: 400 },
  ];
  const write = (key: string, value: string) => { demo.querySelector<HTMLElement>(`[data-entity-${key}]`)!.textContent = value; };
  const update = () => {
    const kind = scope.value;
    const terms = quotes.map(q => kind === 'setup' ? [q.setup] : kind === 'annual' ? [q.agent, q.accounting, q.state] : [q.setup, q.agent, q.accounting, q.state]);
    const totals = terms.map(values => values.reduce((sum, value) => sum + value, 0));
    write('a', `${totals[0]} USD`);
    write('b', `${totals[1]} USD`);
    write('equation', `甲：${terms[0].join(' + ')} = ${totals[0]}；乙：${terms[1].join(' + ')} = ${totals[1]}。`);
    write('result', kind === 'setup'
      ? '只看设立，方案甲少 200 USD；这还不是包含维护的完整比较。'
      : kind === 'annual'
      ? '之后每轮维护，方案乙少 300 USD。此时不再重复计入一次设立费用。'
      : '范围相同的前提下，方案乙少 100 USD。只看较低的设立价，会漏掉代理与申报成本。');
  };
  scope.addEventListener('change', update);
  reset.addEventListener('click', () => { scope.value = 'first'; update(); });
  scope.disabled = false;
  reset.hidden = false;
  update();
}
