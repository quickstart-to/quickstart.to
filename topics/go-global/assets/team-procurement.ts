const demo = document.querySelector<HTMLElement>('[data-team-demo]');
if (demo) {
  const form = demo.querySelector<HTMLFormElement>('form')!;
  const fields = demo.querySelector<HTMLFieldSetElement>('[data-team-fields]')!;
  const tests = ['total', 'independent', 'missing'].map((name) => form.elements.namedItem(name) as HTMLSelectElement);
  const accepted = form.elements.namedItem('accepted') as HTMLInputElement;
  const order = form.elements.namedItem('order') as HTMLSelectElement;
  const write = (key: string, text: string) => { demo.querySelector<HTMLElement>(`[data-team-${key}]`)!.textContent = text; };
  const update = () => {
    const passed = tests.filter((test) => test.value === 'pass').length;
    const failed = tests.flatMap((test, i) => test.value === 'fail' ? [`T${i + 1}`] : []);
    const unknown = tests.flatMap((test, i) => test.value === 'unknown' ? [`T${i + 1}`] : []);
    const ready = passed === 3;
    write('count', `技术记录：${passed} / 3 项通过`);
    write('technical', ready
      ? '三项记录齐备，可以提交验收包；这不会自动产生客户确认或后续订单。'
      : `${failed.length ? `${failed.join('、')} 未通过。` : ''}${unknown.length ? `${unknown.join('、')} 尚无完整证据。` : ''}先修复或补齐记录；不要用总体满意代替逐项结果。`);
    write('acceptance', accepted.checked
      ? ready
        ? '客户验收：已确认本次范围。本例可按约开具 300 美元尾款账单；应付不等于到账。'
        : '记录有冲突：勾选了客户确认，但技术证据未齐或未通过。先核对确认内容、例外及双方约定，不据此宣布原范围验收完成。'
      : '客户验收：尚未确认。本例的尾款验收条件尚未满足。');
    write('commercial', order.value === 'ready'
      ? ready && accepted.checked
        ? '后续采购：订单与开通条件已落实。按新订单交接使用期和支持安排，试点尾款另行核对。'
        : '后续采购：记录显示订单条件已落实，但原试点仍有未结事项。分别处理原范围的验收与新订单义务，不能用新订单抹掉旧问题。'
      : order.value === 'review'
        ? '后续采购：仍在审阅。跟进具体缺项与负责人，未完成前不把意向记成订单。'
        : '后续采购：预算尚未落实。试点到期按约收尾，不继续无期限免费服务。');
  };
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('change', update);
  // Native reset applies default control values after the reset event.
  form.addEventListener('reset', () => { setTimeout(update, 0); });
  demo.querySelector('[data-team-retest]')!.addEventListener('click', () => {
    tests.forEach((test) => { test.value = 'pass'; });
    update();
  });
  fields.disabled = false;
}
