// The article includes a complete static example before this enhancement runs.
const demo = document.querySelector<HTMLElement>('[data-adoption-demo]');
if (demo) {
  const keys = ['prepare', 'check', 'setup', 'repeat'] as const;
  const fields = Object.fromEntries(keys.map(key => [key, demo.querySelector<HTMLInputElement>(`[data-cost-input="${key}"]`)!])) as Record<typeof keys[number], HTMLInputElement>;
  const oldParts = [5, 12, 8, 5];
  const format = (n: number) => n.toLocaleString('zh-CN');
  const render = () => {
    const values = Object.fromEntries(keys.map(key => [key, Number(fields[key].value)])) as Record<typeof keys[number], number>;
    const { prepare, check, setup, repeat } = values;
    const each = prepare + 2 + check + 5;
    const oldTotal = 30 * repeat;
    const total = setup + each * repeat;
    const extra = total - oldTotal;
    for (const key of keys) {
      demo.querySelectorAll<HTMLElement>(`[data-cost-value="${key}"]`).forEach(el => { el.textContent = format(values[key]); });
    }
    demo.querySelector('[data-cost-each]')!.textContent = format(each);
    const axis = Math.max(60, each);
    const newParts: Record<string, number> = { prepare, build: 2, check, send: 5 };
    demo.querySelectorAll<HTMLElement>('[data-cost-segment]').forEach(el => {
      el.style.width = `${newParts[el.dataset.costSegment!] / axis * 100}%`;
    });
    demo.querySelectorAll<HTMLElement>('.vd-bar-row:first-child .vd-bar-track i').forEach((el, i) => {
      el.style.width = `${oldParts[i] / axis * 100}%`;
    });
    demo.querySelector('[data-cost-chart]')!.setAttribute('aria-label', `每次旧流程30分钟（准备5、整理12、核对8、发送5）；新流程${each}分钟（准备${prepare}、生成2、核对${check}、发送5）；首次设置另计${setup}分钟。`);
    const comparison = extra > 0 ? `多花${format(extra)}分钟` : extra < 0 ? `少花${format(-extra)}分钟` : '总耗时相同';
    demo.querySelector('[data-cost-total]')!.textContent = `做${repeat}次：旧办法${format(oldTotal)}分钟，新工具${format(total)}分钟，${comparison}。`;
    let reason: string;
    if (each > 30) {
      reason = `日常每次已经多花${each - 30}分钟，增加使用次数也无法收回设置成本。下一轮先检查导入准备和核对工作。`;
    } else if (each === 30) {
      reason = setup === 0 ? '两种流程的时间成本相同。需要另外比较输出质量、出错风险和支持负担。' : `日常每次耗时相同，初次设置的${setup}分钟无法靠重复使用收回。`;
    } else {
      const saving = 30 - each;
      const breakEven = Math.max(1, Math.ceil(setup / saving));
      reason = setup === 0
        ? `没有初次设置成本，每次可少花${saving}分钟。这仍不代表愿意购买；还要核对输出质量与支持负担。`
        : `每次可少花${saving}分钟，累计到第${breakEven}次可收回初次设置成本。还要确认任务是否会重复，以及节省是否值得学习和购买。`;
    }
    demo.querySelector('[data-cost-reason]')!.textContent = reason;
  };
  for (const key of keys) {
    fields[key].disabled = false;
    fields[key].addEventListener('input', render);
  }
  const setValues = (values: [number, number, number, number]) => {
    keys.forEach((key, i) => { fields[key].value = String(values[i]); });
    render();
  };
  const preset = demo.querySelector<HTMLButtonElement>('[data-cost-preset]')!;
  const reset = demo.querySelector<HTMLButtonElement>('[data-cost-reset]')!;
  preset.hidden = false;
  reset.hidden = false;
  preset.addEventListener('click', () => setValues([4, 8, 20, 4]));
  reset.addEventListener('click', () => setValues([14, 12, 20, 4]));
  render();
}
