const form = document.querySelector<HTMLFormElement>('[data-email-form]');
if (form) {
  const stage = form.querySelector<HTMLSelectElement>('#email-stage')!;
  const purpose = form.querySelector<HTMLSelectElement>('#email-purpose')!;
  const reasons: Record<string, string> = {
    E1: '', E2: '未确认', E3: '没有教程许可', E4: '已退订',
    E5: '投诉抑制', E6: '退信抑制', E7: '防止重复提交', E8: '依据不明',
  };
  const labels: Record<string, string> = {
    queue: '08:00 · 建候选队列', check: '08:59 · 发前复核',
    import: '09:00 · 导入旧名单后', paused: '09:00 · 整个序列暂停',
  };
  const decisions: Record<string, string> = {
    queue: 'E1、E4 可以成为候选，但候选名单会过期。提交给发送服务前仍须重新检查，当前并未发送任何邮件。',
    check: 'E4 的退订已生效。E1 仍有教程许可；队列必须移除 E4，不能继续使用 08:00 的快照。',
    import: '导入只带来旧记录，不带来新许可。E4 仍被停止记录拦住，E8 仍然依据不明；只有 E1 符合教程条件。',
    paused: '全局暂停先拦住本轮任务，不删除任何人的许可或停止记录。恢复后还要逐条复核，不能直接复用旧队列。',
  };
  const update = () => {
    const current = Object.hasOwn(labels, stage.value) ? stage.value : 'check';
    const isLesson = purpose.value === 'lesson';
    let eligible = 0;
    document.querySelectorAll<HTMLElement>('[data-email-row]').forEach(row => {
      const id = row.dataset.emailRow!;
      const reason = id === 'E4' && current === 'queue' ? '' : reasons[id];
      const included = isLesson && current !== 'paused' && !reason;
      eligible += Number(included);
      row.dataset.eligible = String(included);
      const state = included
        ? (current === 'queue' ? '可建候选队列' : '可进入发送流程')
        : !isLesson ? '不进入：没有每周优惠许可'
        : current === 'paused' ? `暂停${reason ? `；原状态：${reason}` : '；保留教程许可'}`
        : `不进入：${reason}`;
      row.querySelector<HTMLElement>('[data-email-state]')!.textContent = state;
    });
    const output = document.querySelector<HTMLElement>('[data-email-result]')!;
    const unit = current === 'queue' ? '可建候选队列' : '符合本例发送前条件';
    output.textContent = `${labels[current]} · ${isLesson ? '第 2 封教程' : '每周产品优惠'}：${eligible} 条${unit}，${8 - eligible} 条不进入发送流程。`;
    document.querySelector<HTMLElement>('[data-email-decision]')!.textContent = isLesson
      ? decisions[current]
      : '没有人选择过每周优惠。教程订阅、资料下载和名单导入都不能扩大许可范围；本次为 0 条，不发送优惠邮件。';
  };
  form.hidden = false;
  form.addEventListener('change', update);
  form.addEventListener('reset', () => setTimeout(update, 0));
  update();
}
