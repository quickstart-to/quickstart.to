const demo = document.querySelector<HTMLElement>('[data-growth-demo]');
if (demo) {
  const records = [...demo.querySelectorAll<HTMLElement>('[data-growth-record]')].map(row => ({
    id: row.dataset.growthRecord!,
    path: row.dataset.growthPath!.split(','),
    complete: row.dataset.growthComplete === 'true',
  }));
  const modes = [...demo.querySelectorAll<HTMLInputElement>('input[name="growth-credit"]')];
  const evidence = demo.querySelector<HTMLInputElement>('[data-growth-evidence]')!;
  const status = demo.querySelector<HTMLElement>('[data-growth-status]')!;
  const reset = demo.querySelector<HTMLButtonElement>('[data-growth-reset]')!;
  const redraw = () => {
    const mode = modes.find(input => input.checked)!.value;
    const totals: Record<string, number> = { search: 0, partner: 0, email: 0, unknown: 0 };
    const completed = records.filter(record => record.complete);
    for (const record of completed) {
      const path = record.id === 'G5' && evidence.checked ? ['partner', 'email'] : record.path;
      const credited = mode === 'all' ? [...new Set(path)] : [mode === 'first' ? path[0] : path[path.length - 1]];
      for (const channel of credited) totals[channel] += 1;
    }
    for (const row of demo.querySelectorAll<HTMLElement>('[data-growth-channel]')) {
      const value = totals[row.dataset.growthChannel!];
      row.querySelector<HTMLElement>('[data-growth-number]')!.textContent = String(value);
      row.querySelector<HTMLElement>('i')!.style.width = `${value / completed.length * 100}%`;
    }
    demo.querySelector<HTMLElement>('[data-growth-missing-path]')!.textContent = evidence.checked
      ? '同业文章 → 许可邮件（模拟补充）' : '来源未知';
    const sum = Object.values(totals).reduce((a, b) => a + b, 0);
    const label = mode === 'all' ? '列出全部已知参与' : mode === 'first' ? '按首次已知接触分配' : '按最后已知接触分配';
    const total = mode === 'all'
      ? `已知渠道参与 ${sum - totals.unknown} 次，另有 ${totals.unknown} 人来源未知。`
      : `合计 ${sum} 人（含来源未知）。`;
    status.textContent = `${label}：搜索 ${totals.search}、同业文章 ${totals.partner}、许可邮件 ${totals.email}、来源未知 ${totals.unknown}。${total}独立完成并用上的始终是 ${completed.length} 人。${mode === 'all' ? '各栏可能包含同一个人，不能相加当成用户数。' : '分配方式不证明渠道造成了结果。'}`;
  };
  modes.forEach(input => input.addEventListener('change', redraw));
  evidence.addEventListener('change', redraw);
  reset.addEventListener('click', () => {
    modes[0].checked = true;
    evidence.checked = false;
    redraw();
  });
  demo.querySelector<HTMLFieldSetElement>('[data-growth-controls]')!.disabled = false;
  reset.hidden = false;
  redraw();
}
