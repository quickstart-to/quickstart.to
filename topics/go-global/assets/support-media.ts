const supportDemo = document.querySelector<HTMLElement>('[data-support-capacity]');
if (supportDemo) {
  const form = supportDemo.querySelector<HTMLFormElement>('[data-support-form]');
  const fields = supportDemo.querySelector<HTMLFieldSetElement>('[data-support-inputs]');
  const result = supportDemo.querySelector<HTMLElement>('[data-support-result]');
  const chart = supportDemo.querySelector<HTMLElement>('.support-budget-chart');
  if (form && fields && result && chart) {
    const update = () => {
      const data = new FormData(form);
      const count = Number(data.get('count'));
      const minutes = Number(data.get('minutes'));
      const available = Number(data.get('hours')) * 60;
      const docs = data.has('defer') ? 0 : 30;
      const incoming = count * minutes;
      const total = incoming + 40 + 60 + docs + 20 + 30;
      const balance = available - total;
      const label = balance < 0 ? `还差 ${-balance} 分钟` : balance === 0 ? '刚好用满，没有额外余量' : `余下 ${balance} 分钟`;
      const decision = balance < 0
        ? '当前计划已超过可用时间。先处理已给出的承诺，暂停增加新需求；挪出实际可用时间、安排替补或重新约定，不能把未完成工作记作解决。'
        : balance === 0
          ? '计划已经用满。虽有预算内的 30 分钟缓冲，仍没有额外余量；问题集中到来或事件扩大时，需要重排。'
          : '可以按当前假设排期；这不保证所有问题都能解决，也不保证来信均匀分布。';
      const lines = [
        `需要 ${total} 分钟 / 可用 ${available} 分钟，${label}。`,
        `新工单 ${incoming} + 旧单 40 + 修复 60 + 文档 ${docs} + 复盘 20 + 缓冲 30 = ${total} 分钟。缓冲已经包含在总额里。`,
        decision,
        ...(docs === 0 ? ['暂缓文档只少做当周的 30 分钟；旧说明仍待更新。这里不预测未来会减少多少工单。'] : []),
        ...(count === 0 ? ['没有新工单，仍需处理旧单、修复和维护；也不能据此认定用户没有问题。'] : []),
      ];
      result.replaceChildren(...lines.map((text, i) => {
        const p = document.createElement('p');
        if (i === 0) {
          const strong = document.createElement('strong');
          strong.textContent = text;
          p.append(strong);
        } else p.textContent = text;
        return p;
      }));
      result.dataset.over = String(balance < 0);
      const values = [incoming, 40, 60, docs, 20, 30, Math.abs(balance)];
      const labels = ['新单', '旧单', '修复', '文档', '复盘', '缓冲', balance < 0 ? '缺口' : '余量'];
      const max = Math.max(...values, 1);
      chart.querySelectorAll<HTMLElement>(':scope > div').forEach((row, i) => {
        row.querySelector('b')!.textContent = labels[i];
        const bar = row.querySelector<HTMLElement>('span')!;
        bar.textContent = `${values[i]} 分钟`;
        bar.style.setProperty('--portion', `${values[i] / max * 100}%`);
        row.dataset.deficit = String(i === 6 && balance < 0);
      });
      chart.setAttribute('aria-label', `用时分配，单位分钟：${labels.map((label, i) => `${label} ${values[i]}`).join('，')}。`);
    };
    fields.disabled = false;
    form.addEventListener('change', update);
    form.addEventListener('submit', event => event.preventDefault());
    form.addEventListener('reset', () => setTimeout(update, 0));
    update();
  }
}
