const demo = document.querySelector<HTMLElement>('[data-infra-latency]');
if (demo) {
  const queries = demo.querySelector<HTMLInputElement>('[data-infra-queries]')!;
  const distance = demo.querySelector<HTMLInputElement>('[data-infra-distance]')!;
  const error = demo.querySelector<HTMLElement>('[data-infra-error]')!;
  const reading = demo.querySelector<HTMLElement>('[data-infra-reading]')!;
  const setText = (selector: string, value: string | number) => {
    demo.querySelector<HTMLElement>(selector)!.textContent = String(value);
  };
  const render = () => {
    const invalid = [queries, distance].filter(input => !input.validity.valid || !Number.isFinite(input.valueAsNumber));
    for (const input of [queries, distance]) input.setAttribute('aria-invalid', String(invalid.includes(input)));
    error.hidden = invalid.length === 0;
    if (invalid.length) {
      error.textContent = '请填写 1–8 次查询和 20–250 毫秒的整数。下方保留上一次有效输入的结果。';
      return;
    }
    const count = queries.valueAsNumber;
    const roundTrip = distance.valueAsNumber;
    const edge = 20 + count * roundTrip;
    const near = 160 + count * 5;
    setText('[data-infra-query-label]', count);
    setText('[data-infra-near-query-label]', count);
    setText('[data-infra-distance-label]', roundTrip);
    setText('[data-infra-edge]', edge);
    setText('[data-infra-near]', near);
    setText('[data-infra-edge-formula]', `20 ＋ ${count} × ${roundTrip} ＝ ${edge}`);
    setText('[data-infra-near-formula]', `160 ＋ ${count} × 5 ＝ ${near}`);
    demo.querySelector<HTMLElement>('[data-infra-edge-bar]')!.style.width = `${edge / Math.max(edge, near) * 100}%`;
    demo.querySelector<HTMLElement>('[data-infra-near-bar]')!.style.width = `${near / Math.max(edge, near) * 100}%`;
    reading.textContent = edge === near
      ? `这组设定下，两条路径都是 ${edge} 毫秒。仅凭网络往返无法决定位置，还要比较执行时间和其他条件。`
      : edge > near
        ? `这组设定下，B 少等待 ${edge - near} 毫秒。减少反复跨距离查询，比缩短最初那一次连接更有影响。`
        : `这组设定下，A 少等待 ${near - edge} 毫秒。数据库往返成本降下来以后，靠近用户的路径更短；实际系统仍需测完整任务。`;
  };
  for (const input of [queries, distance]) {
    input.disabled = false;
    input.addEventListener('input', render);
  }
  const reset = demo.querySelector<HTMLButtonElement>('[data-infra-reset]')!;
  reset.hidden = false;
  reset.addEventListener('click', () => { queries.value = '4'; distance.value = '150'; render(); });
  render();
}
