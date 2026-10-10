import { fixture, report, cutoff, revisedCutoff, roughSample, rawReport } from './measurement-model.mjs';
const form = document.querySelector<HTMLFormElement>('[data-measurement-form]');
if (form) {
  const select = form.querySelector<HTMLSelectElement>('select')!;
  const result = document.querySelector<HTMLElement>('[data-measurement-result]')!;
  const labels: Record<string, string> = { included: '计入', rejected: '拒收：多余字段', duplicate: '重复', conflict: '冲突待查', test: '测试', old: '旧语义', late: '迟到', outside: '期间外' };
  function update() {
    const mode = select.value, raw = mode === 'raw';
    const r = report(fixture, mode === 'revised' ? revisedCutoff : cutoff);
    if (raw) {
      const unfiltered = rawReport(fixture);
      result.textContent = `粗报：${unfiltered.ready} 条 export_ready ÷ ${unfiltered.starts} 条 task_started = ${(unfiltered.ready / unfiltered.starts * 100).toFixed(0)}%。付款通知相加 ${unfiltered.paid / 100} USD；减退款 ${unfiltered.refunded / 100} USD 后显示 ${(unfiltered.paid - unfiltered.refunded) / 100} USD。这里混入了重复、测试、旧语义和拒收记录，不能当完成率或收入。`;
    }
    else result.textContent = `${mode === 'revised' ? '迟到修订' : '初报'}：${r.included} 条记录计入；${r.starts} 次任务中，${r.ready} 次已生成可导出文件（${(r.ready / r.starts * 100).toFixed(1)}%），${r.blocked} 次有阻塞且未见成功，${r.unknown} 次结果未知。付款 40 USD − 已确认退款 20 USD = 净收 20 USD，未扣费用，未核对到账。`;
    for (const [i, row] of r.classified.entries()) {
      const cell = document.querySelector<HTMLElement>(`[data-measurement-row="${i}"]`);
      if (cell) cell.textContent = raw ? '粗报未筛选' : labels[row.status];
    }
    for (const cell of document.querySelectorAll<HTMLElement>('[data-task]')) {
      const task = cell.dataset.task;
      const events = r.classified.filter(row => row.status === 'included' && row.event.task_id === task);
      const state = raw ? 'raw' : events.some(row => row.event.kind === 'export_ready') ? 'ready' : events.some(row => row.event.kind === 'validation_blocked') ? 'blocked' : 'unknown';
      cell.dataset.state = state;
      cell.querySelector('span')!.textContent = { raw: '未按任务核对', ready: '文件已生成', blocked: '阻塞未见成功', unknown: '结果未知' }[state];
    }
    const note = document.querySelector<HTMLElement>('[data-measurement-change]')!;
    note.textContent = mode === 'revised' ? 'C 的事件在 10 月 8 日 09:00 UTC 到达。修订只补回原观察日的记录；从 33.3% 到 50.0% 是信息变完整，不能说明产品变好了。' : mode === 'raw' ? '这份粗报故意使用错误口径。展开下面 19 条记录，找出被相加的通知和被当作完成的点击。' : '初报于 10 月 8 日 00:00 UTC 截止；排除 1 条拒收、2 条重复、2 条测试、1 条旧语义和 1 条迟到。未知仍留在 6 次任务的分母中。';
  }
  form.hidden = false;
  select.addEventListener('change', update);
  form.addEventListener('reset', () => setTimeout(update, 0));
  update();
}
const sample = document.querySelector<HTMLFormElement>('[data-measurement-sample]');
if (sample) {
  const delta = sample.querySelector<HTMLSelectElement>('#measurement-delta')!;
  const traffic = sample.querySelector<HTMLSelectElement>('#measurement-traffic')!;
  const out = document.querySelector<HTMLElement>('[data-measurement-sample-result]')!;
  const bar = document.querySelector<HTMLElement>('[data-measurement-bar]')!;
  function update() {
    const d = Number(delta.value), n = roughSample(d), total = n * 2, weekly = Number(traffic.value);
    out.textContent = `基线 20% → 目标 ${(20 + d * 100).toFixed(0)}%，增加 ${d * 100} 个百分点。粗估每组约 ${n} 个独立单位，两组约 ${total} 个；每周 ${weekly} 个合格新单位，约需 ${(total / weekly).toFixed(1)} 周入组，再等最后一批完成观察窗口。这是规模估计，不是试验胜率或建议运行时长。`;
    bar.style.setProperty('--portion', `${Math.min(100, weekly * 4 / total * 100)}%`);
    bar.textContent = `4 周预计 ${weekly * 4} 个 / 粗估所需 ${total} 个`;
  }
  sample.hidden = false;
  sample.addEventListener('change', update);
  sample.addEventListener('reset', () => setTimeout(update, 0));
  update();
}
