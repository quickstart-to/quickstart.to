import { scenarioRecords, summarizeRecords, percent, STATE_LABELS } from './retention-model.mjs';

const demo = document.querySelector<HTMLElement>('[data-retention-demo]');
if (demo) {
  const criterion = demo.querySelector<HTMLSelectElement>('[data-retention-criterion]')!;
  const evidence = demo.querySelector<HTMLSelectElement>('[data-retention-evidence]')!;
  const reset = demo.querySelector<HTMLButtonElement>('[data-retention-reset]')!;
  const write = (key: string, value: string) => { demo.querySelector<HTMLElement>(`[data-retention-${key}]`)!.textContent = value; };
  const update = () => {
    const rows = scenarioRecords(evidence.value);
    const s = summarizeRecords(rows, criterion.value);
    write('fixed', `${s.qualified} / ${s.total} · ${percent(s.fixedRate)}`);
    write('conditional', `${s.qualified} / ${s.eligible} · ${percent(s.conditionalRate)}`);
    write('missing', `确认暂无任务 ${s.noTask} 人；任务与结果未知 ${s.unknown} 人。所有 ${s.total} 人仍保留在整批记录中。`);
    write('status', `当前要求：${criterion.value === 'used' ? '结果用进客户交付，可以包含开发者协助' : '独立完成，且结果用进客户交付'}。符合记录为 ${s.qualifyingIds.join('、') || '无'}。H 的补充是模拟证据；切换口径不是改善产品。`);
    for (const row of rows) {
      const item = demo.querySelector<HTMLElement>(`[data-retention-person="${row.id}"]`)!;
      item.querySelector('span')!.textContent = STATE_LABELS[row.state as keyof typeof STATE_LABELS];
      item.dataset.qualified = String(s.qualifyingIds.includes(row.id));
      item.querySelector('em')!.textContent = s.qualifyingIds.includes(row.id) ? '符合当前口径' : '未计入分子';
    }
  };
  criterion.addEventListener('change', update);
  evidence.addEventListener('change', update);
  reset.addEventListener('click', () => { criterion.value = 'used'; evidence.value = 'unknown'; update(); });
  demo.querySelector('fieldset')!.disabled = false;
  reset.hidden = false;
  update();
}
