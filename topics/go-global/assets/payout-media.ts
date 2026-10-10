import { reconcile, money } from './payout-model.mjs';

const demo = document.querySelector<HTMLElement>('[data-payout-demo]');
if (demo) {
  const start = demo.querySelector<HTMLSelectElement>('[data-payout-start]')!;
  const evidence = demo.querySelector<HTMLSelectElement>('[data-payout-evidence]')!;
  const reset = demo.querySelector<HTMLButtonElement>('[data-payout-reset]')!;
  const write = (key: string, text: string) => { demo.querySelector<HTMLElement>(`[data-payout-${key}]`)!.textContent = text; };
  const update = () => {
    const r = reconcile(start.value, evidence.value);
    write('start-amount', money(r.startAmount, 'USD'));
    write('platform-fee', r.remainingPlatformFee ? '减已列明的平台费用 7.00 USD → 发送 333.00 USD' : '平台费用已扣；从发送金额起算，不再扣同一笔 7.00 USD');
    write('expected', r.explainedCredit === null ? '暂不能计算' : money(r.explainedCredit, 'CNY'));
    write('conversion', r.converted === null ? '兑换本金为 330.00 USD；缺这笔交易的实际汇率' : r.confirmedLocalFee === null ? '330.00 USD × 7.2000；本地收费明细尚未取得' : '330.00 USD × 7.2000 − 已确认费用 15.00 CNY');
    write('result', r.difference === null ? '先取得换汇明细。汇率未知时，不能确定人民币差额，也不能当作差额为零。' : r.complete ? '差额 0.00 CNY：本例的金额已解释。还须核对交易编号、期间与接收账户，不能只凭金额认定同一笔。' : `仍有 ${money(r.difference, 'CNY')} 未解释。先取得收费明细，不把差额直接归为汇率损失。`);
  };
  start.addEventListener('change', update);
  evidence.addEventListener('change', update);
  reset.addEventListener('click', () => { start.value = 'before'; evidence.value = 'rate'; update(); });
  demo.querySelector<HTMLFieldSetElement>('fieldset')!.disabled = false;
  reset.hidden = false;
  update();
}
