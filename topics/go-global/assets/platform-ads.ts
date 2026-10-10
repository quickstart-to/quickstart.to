const adsDemo = document.querySelector<HTMLElement>('[data-ads-demo]');
if (adsDemo) {
  const form = adsDemo.querySelector<HTMLFormElement>('form')!;
  const controls = form.querySelector<HTMLFieldSetElement>('fieldset')!;
  const choices = form.elements.namedItem('query-filter') as RadioNodeList;
  const records = [
    { key: 'core', clicks: 20, spend: 22, completed: 2, buyers: 1 },
    { key: 'trial', clicks: 4, spend: 4, completed: 2, buyers: 1 },
    { key: 'template', clicks: 16, spend: 12, completed: 0, buyers: 0 },
    { key: 'stock', clicks: 10, spend: 10, completed: 0, buyers: 0 },
  ];
  const update = () => {
    const mode = choices.value;
    const totals = { clicks: 0, spend: 0, completed: 0, buyers: 0 };
    for (const record of records) {
      const removed = (mode !== 'all' && record.key === 'stock')
        || (mode === 'free' && ['trial', 'template'].includes(record.key));
      const row = adsDemo.querySelector<HTMLElement>(`[data-query="${record.key}"]`)!;
      row.classList.toggle('ads-excluded', removed);
      row.querySelector<HTMLElement>('[data-query-status]')!.textContent = removed ? '会被排除' : '保留';
      if (!removed) {
        totals.clicks += record.clicks;
        totals.spend += record.spend;
        totals.completed += record.completed;
        totals.buyers += record.buyers;
      }
    }
    adsDemo.querySelector<HTMLElement>('[data-ads-total]')!.textContent =
      `保留的历史小计：${totals.clicks} 次点击 / ${totals.spend} 美元 / ${totals.completed} 次独立完成 / ${totals.buyers} 位买家。`;
    adsDemo.querySelector<HTMLElement>('[data-ads-explanation]')!.textContent = mode === 'all'
      ? '股票报告与产品任务不同；但免费模板和免费试用也不能只看一个 free 就当成同一种需求。'
      : mode === 'stock'
        ? '排除明确错位的股票查询，表内的独立完成与买家数保持不变。这为否定候选提供了理由，但不保证下一轮结果。'
        : 'free 同时挡住了模板需求和试用需求，历史表中少了 2 次独立完成、1 位买家。先拆清意图，再决定否定哪一类查询。';
    adsDemo.querySelector<HTMLElement>('[data-ads-removed]')!.textContent = mode === 'all'
      ? '当前没有排除任何历史记录。'
      : `会被排除的历史小计：${50 - totals.clicks} 次点击 / ${48 - totals.spend} 美元；这笔历史支出不会被退回。`;
  };
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('change', update);
  form.addEventListener('reset', () => setTimeout(update, 0));
  update();
  controls.disabled = false;
}
