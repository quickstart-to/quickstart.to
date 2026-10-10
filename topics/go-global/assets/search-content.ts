const form = document.querySelector<HTMLFormElement>('[data-search-form]');
if (form) {
  const period = form.querySelector<HTMLSelectElement>('#search-period')!;
  const scope = form.querySelector<HTMLSelectElement>('#search-scope')!;
  const records = {
    a: { broad: [1000, 10], task: [100, 10], other: [100, 4] },
    b: { broad: [2000, 20], task: [100, 15], other: [100, 5] },
  };
  const ranges: Record<string, (keyof typeof records.a)[]> = {
    page: ['broad', 'task', 'other'], visible: ['broad', 'task'], task: ['task'], broad: ['broad'], empty: [],
  };
  const labels: Record<string, string> = { page: '完整页面汇总', visible: '仅可见查询', task: 'CSV 任务查询', broad: '宽泛模板查询', empty: '未观察查询' };
  const decisions: Record<string, string> = {
    page: '从 A 期到 B 期，点击变多、总点击率变低；先拆查询构成，不能据此认定标题变差或用户质量下降。',
    visible: '只加可见查询无法还原完整页面。真实差额要排查隐私省略、行数限制与聚合方式，不擅自补查询或分配转化。',
    task: '任务查询两期曝光相同，从 A 期到 B 期，点击率从 10% 到 15%；可继续检查页面用途，但无对照，不能归因于改稿。',
    broad: '从 A 期到 B 期，宽泛查询曝光和点击同时翻倍，点击率仍是 1%；它在总量中的占比变大，会拉低全页点击率。',
    empty: '没有观察记录，点击率不适用；不等于没人有这个需求，也不支持新建页面或宣布该方向失败。',
  };
  const total = (key: keyof typeof records, selected: (keyof typeof records.a)[]) => selected.reduce((sum, row) => [sum[0] + records[key][row][0], sum[1] + records[key][row][1]], [0, 0]);
  const ctr = ([impressions, clicks]: number[]) => impressions ? `${(clicks / impressions * 100).toFixed(2)}%` : '不适用';
  const set = (selector: string, text: string) => { const el = document.querySelector<HTMLElement>(selector); if (el) el.textContent = text; };
  const update = () => {
    const current = period.value === 'a' ? 'a' : 'b';
    const previous = current === 'a' ? 'b' : 'a';
    const selected = ranges[scope.value] ?? [];
    const now = total(current, selected), other = total(previous, selected);
    set('[data-search-impressions]', `${now[0]}`);
    set('[data-search-clicks]', `${now[1]}`);
    set('[data-search-ctr]', ctr(now));
    set('[data-search-result]', `${current.toUpperCase()} 期 · ${labels[scope.value]}：${now[0]} 次曝光、${now[1]} 次点击，点击率${now[0] ? ` ${ctr(now)}` : '不适用'}。${previous.toUpperCase()} 期为 ${other[0]} 次曝光、${other[1]} 次点击，点击率${other[0] ? ` ${ctr(other)}` : '不适用'}。`);
    set('[data-search-decision]', decisions[scope.value]);
    document.querySelectorAll<HTMLElement>('[data-search-row]').forEach(row => {
      row.dataset.selected = String(selected.includes(row.dataset.searchRow as keyof typeof records.a));
    });
  };
  form.hidden = false;
  form.addEventListener('change', update);
  form.addEventListener('reset', () => setTimeout(update, 0));
  update();
}
