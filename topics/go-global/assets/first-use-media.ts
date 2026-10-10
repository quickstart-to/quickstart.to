const root = document.querySelector<HTMLElement>('[data-first-demo]');
if (root) {
  const form = root.querySelector<HTMLFormElement>('[data-first-form]')!;
  const hours = root.querySelector<HTMLInputElement>('#first-hours')!;
  const projectStatus = root.querySelector<HTMLInputElement>('#first-project-status')!;
  const next = root.querySelector<HTMLInputElement>('#first-next')!;
  const exclude = root.querySelector<HTMLInputElement>('[data-first-exclude]')!;
  const presets = [...root.querySelectorAll<HTMLButtonElement>('[data-first-preset]')];
  const status = root.querySelector<HTMLElement>('[data-first-state]')!;
  const errors = root.querySelector<HTMLElement>('[data-first-errors]')!;
  const preview = root.querySelector<HTMLElement>('[data-first-preview]')!;
  const report = root.querySelector<HTMLElement>('[data-first-report]')!;
  const download = root.querySelector<HTMLButtonElement>('[data-first-download]')!;
  const reset = root.querySelector<HTMLButtonElement>('[data-first-reset]')!;
  const fields = [hours, projectStatus, next];
  const errorIds = ['first-hours-error', 'first-status-error', 'first-next-error'];
  let hasRows = false;
  let downloadableReport = '';

  function clearErrors() {
    errors.replaceChildren();
    fields.forEach((field, index) => {
      field.removeAttribute('aria-invalid');
      root!.querySelector<HTMLElement>(`#${errorIds[index]}`)!.textContent = '';
    });
  }
  function invalidate() {
    preview.hidden = true;
    download.disabled = true;
    downloadableReport = '';
    clearErrors();
    root!.dataset.state = hasRows ? 'editing' : 'empty';
  }
  function showErrors(items: { field: HTMLInputElement; text: string }[]) {
    const title = document.createElement('p');
    title.textContent = `有 ${items.length} 处需要检查，其他输入仍然保留：`;
    const list = document.createElement('ul');
    for (const item of items) {
      item.field.setAttribute('aria-invalid', 'true');
      root!.querySelector<HTMLElement>(`#${errorIds[fields.indexOf(item.field)]}`)!.textContent = item.text;
      const row = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${item.field.id}`;
      link.textContent = item.text;
      link.addEventListener('click', event => {
        event.preventDefault();
        item.field.focus();
      });
      row.append(link);
      list.append(row);
    }
    errors.append(title, list);
    root!.dataset.state = 'error';
    status.textContent = '尚未生成草稿。修正提示中的字段，再次检查；已写的项目状态和下一步没有清空。';
    items[0].field.focus();
  }
  presets.forEach(button => button.addEventListener('click', () => {
    hasRows = button.dataset.firstPreset !== 'empty';
    invalidate();
    hours.value = button.dataset.firstPreset === 'bad' ? 'two' : '2';
    exclude.checked = false;
    hours.disabled = false;
    root.querySelector<HTMLElement>('[data-first-rows]')!.hidden = !hasRows;
    presets.forEach(preset => preset.setAttribute('aria-pressed', String(preset === button)));
    form.hidden = false;
    status.textContent = hasRows
      ? '已载入 2 行合成记录。核对工时与负责人判断，再生成预览；更换样本会保留手写说明。'
      : '读到了表头，但没有任务记录。手写说明仍保留；可以换一份样本继续，不能生成 0 小时的成功报告。';
  }));
  form.addEventListener('input', () => {
    invalidate();
    hours.disabled = exclude.checked;
    status.textContent = hasRows
      ? '输入已改变，旧预览已收起。请重新检查；暂时排除一行只能生成局部预览。'
      : '手写说明已保留在当前页面。输入仍没有任务记录，请换一份样本。';
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    invalidate();
    if (!hasRows) {
      status.textContent = '没有任务记录，无法生成预览。请换一份样本；手写说明仍然保留。';
      presets[0].focus();
      return;
    }
    const problems: { field: HTMLInputElement; text: string }[] = [];
    const raw = hours.value.trim();
    const validHours = /^\d+(?:\.\d{1,2})?$/.test(raw) && Number(raw) <= 1000;
    if (!exclude.checked && !validHours) {
      problems.push({ field: hours, text: '第 3 行的工时需为 0–1000 的数字，最多两位小数，例如 2 或 1.5；空白不能当作 0。' });
    }
    if (!projectStatus.value.trim()) problems.push({ field: projectStatus, text: '请填写负责人确认的项目状态；工具不能从工时推断。' });
    if (!next.value.trim()) problems.push({ field: next, text: '请填写下一步；暂不行动时，也请明确写出安排。' });
    if (problems.length) { showErrors(problems); return; }
    const partial = exclude.checked;
    const total = partial ? 3 : (300 + Math.round(Number(raw) * 100)) / 100;
    const lines = [
      'Client update — Project North',
      ...(partial ? ['PARTIAL PREVIEW — Draft report row excluded.'] : []),
      '', 'Recorded work', 'Research: 3 h',
      ...(partial ? [] : [`Draft report: ${Number(raw)} h`]),
      `${partial ? 'Included subtotal' : 'Total'}: ${total} h`,
      '', `Project status: ${projectStatus.value.trim()}`,
      `Next step: ${next.value.trim()}`,
      '', 'Draft for review. Not sent to the client.',
    ];
    report.textContent = lines.join('\n');
    root.querySelector<HTMLElement>('[data-first-preview-label]')!.textContent = partial ? '局部预览 · 缺少第 3 行' : '交付前预览 · 两行均已计入';
    root.querySelector<HTMLElement>('[data-first-preview-note]')!.textContent = partial
      ? '只计 Research 的 3 小时；这不是完整报告。取消排除并修正第 3 行，才能导出。'
      : '请将两行与合计对照，再核对手写说明。下载后打开文件检查，是否交付仍由你决定。';
    preview.hidden = false;
    download.disabled = partial;
    downloadableReport = partial ? '' : report.textContent;
    root.dataset.state = partial ? 'partial' : 'ready';
    status.textContent = partial
      ? '局部预览已生成：只计 1 行、3 小时，另一行明确排除，完整导出不可用。'
      : `预览已生成：2 行，共 ${total} 小时；手写说明已保留。可以继续核对并下载。`;
  });
  download.addEventListener('click', () => {
    if (!downloadableReport || download.disabled) return;
    const url = URL.createObjectURL(new Blob([downloadableReport + '\n'], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'project-north-draft.txt';
    root.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = '已发起本地草稿下载。请打开文件检查内容；这不表示客户已收到或采用。';
  });
  reset.addEventListener('click', () => {
    hasRows = false;
    form.reset();
    hours.disabled = false;
    invalidate();
    form.hidden = true;
    presets.forEach(preset => preset.setAttribute('aria-pressed', 'false'));
    status.textContent = '已清空本次编辑，回到起点。选择一份输入，开始制作 Project North 的草稿。';
    presets[0].focus();
  });
  root.querySelector<HTMLFieldSetElement>('[data-first-presets]')!.disabled = false;
  presets.forEach(preset => preset.setAttribute('aria-pressed', 'false'));
  reset.hidden = false;
  root.dataset.state = 'empty';
}
