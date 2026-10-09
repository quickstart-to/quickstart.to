import { initialDeliveryState, deliveryEvent, applyDeliveryEvent, activeOrders, refundTotal, fullyRefunded } from './payment-delivery-model.mjs';

const replay = document.querySelector<HTMLElement>('[data-payment-replay]');
if (replay) {
  let state = initialDeliveryState();
  const paid = deliveryEvent('paid-1', 'payment-confirmed');
  const events = {
    paid,
    retry: paid,
    refund: deliveryEvent('refund-event-1', 'refund-confirmed', { refund: 'refund-1' }),
    late: deliveryEvent('paid-2', 'payment-confirmed'),
  };
  const controls = replay.querySelector<HTMLFieldSetElement>('[data-pay-controls]')!;
  const buttons = [...replay.querySelectorAll<HTMLButtonElement>('[data-pay-action]')];
  const reset = replay.querySelector<HTMLButtonElement>('[data-pay-reset]')!;
  const write = (key: string, value: string) => {
    replay.querySelector<HTMLElement>(`[data-pay-${key}]`)!.textContent = value;
  };
  const render = (message: string) => {
    const order = state.orders[0];
    write('access', activeOrders(state, 'A').length ? '可使用' : fullyRefunded(order) ? '不可使用（该订单已全退）' : '未开通');
    write('grants', String(order.grants));
    write('refunded', (refundTotal(order) / 100).toFixed(2));
    write('expiry', order.expiresAt === null ? '尚无付款记录' : new Date(order.expiresAt).toISOString().replace('T', ' ').replace('.000Z', ''));
    write('result', message);
    buttons.forEach(button => {
      const action = button.dataset.payAction;
      button.disabled = action === 'retry' ? order.paidAt === null : action === 'late' ? order.paidAt === null && order.refunds.length === 0 : false;
    });
  };
  const messages: Record<string, string> = {
    granted: '付款已确认，为绑定的用户 A 开通 1 次；用户 B 不受影响。',
    'duplicate-event': '这个事件已经处理过，开通次数、退款金额与到期时间都不变。',
    'duplicate-order': '这是同一笔订单的旧付款。保留原期限和退款记录，不再开通。',
    'fully-refunded': '已记录全额退款，这笔订单不再提供使用权。',
    'payment-recorded-refund-retained': '付款记录补齐了，但全额退款仍然有效，未曾开通使用权。',
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    const action = button.dataset.payAction as keyof typeof events;
    const outcome = applyDeliveryEvent(state, events[action]);
    state = outcome.state;
    render(messages[outcome.result] ?? '事件未改变当前权益。');
  }));
  reset.addEventListener('click', () => {
    state = initialDeliveryState();
    render('已重置。只有成功页，没有服务端付款确认，仍未开通。');
  });
  controls.disabled = false;
  reset.hidden = false;
  render('只有成功页，没有服务端付款确认，仍未开通。');
}
