// Teaching protocol only. These are verified, normalized facts, not Creem payloads.
// Production still needs provider verification, lookup, durable transactions and reconciliation.
export const DELIVERY_NOW = Date.parse('2026-10-25T00:00:00Z');
const DAY = 86_400_000;

export function initialDeliveryState() {
  return {
    seen: [],
    orders: [
      { id: 'demo-001', user: 'A', amount: 2000 },
      { id: 'demo-002', user: 'A', amount: 2000 },
      { id: 'demo-review', user: 'reviewer', amount: 0 },
    ].map(order => ({
      ...order, product: 'report-pass', currency: 'USD', environment: 'lesson',
      paidAt: null, expiresAt: null, refunds: [], grants: 0,
    })),
  };
}

export const refundTotal = order => order.refunds.reduce((sum, refund) => sum + refund.amount, 0);
export const fullyRefunded = order => order.refunds.length > 0 && refundTotal(order) >= order.amount;
export const activeOrders = (state, user, now = DELIVERY_NOW) => state.orders.filter(order =>
  order.user === user && order.paidAt !== null && !fullyRefunded(order) && now < order.expiresAt,
);

export function deliveryEvent(id, type, options = {}) {
  return {
    id, type, order: 'demo-001', product: 'report-pass', currency: 'USD',
    environment: 'lesson', amount: 2000, at: Date.parse('2026-10-09T00:00:00Z'),
    ...options,
  };
}

export function applyDeliveryEvent(state, event, now = DELIVERY_NOW) {
  const rejected = reason => ({ state, result: 'rejected', reason });
  if (!event || typeof event !== 'object' || typeof event.id !== 'string' || !event.id || event.id.length > 100) {
    return rejected('invalid-event');
  }
  if (!['payment-confirmed', 'refund-confirmed'].includes(event.type)) return rejected('unknown-type');
  const original = state.orders.find(order => order.id === event.order);
  if (!original) return rejected('unknown-order');
  if (['product', 'currency', 'environment'].some(key => event[key] !== original[key])) return rejected('binding-mismatch');
  if (!Number.isSafeInteger(event.amount) || event.amount < 0 || !Number.isSafeInteger(event.at) || event.at <= 0 || event.at > now) {
    return rejected('invalid-value');
  }
  if (event.type === 'payment-confirmed' && event.amount !== original.amount) return rejected('amount-mismatch');
  if (event.type === 'refund-confirmed' && (typeof event.refund !== 'string' || !event.refund || event.amount <= 0)) {
    return rejected('invalid-refund');
  }
  if (state.seen.includes(event.id)) return { state, result: 'duplicate-event' };
  const next = structuredClone(state);
  const order = next.orders.find(item => item.id === event.order);
  let result;
  if (event.type === 'payment-confirmed') {
    if (order.paidAt !== null) {
      result = 'duplicate-order';
    } else {
      order.paidAt = event.at;
      order.expiresAt = event.at + 30 * DAY;
      if (fullyRefunded(order)) {
        result = 'payment-recorded-refund-retained';
      } else if (order.expiresAt <= now) {
        result = 'payment-recorded-expired';
      } else {
        order.grants += 1;
        result = 'granted';
      }
    }
  } else {
    const previous = order.refunds.find(refund => refund.id === event.refund);
    if (previous) {
      if (previous.amount !== event.amount) return rejected('refund-conflict');
      result = 'duplicate-refund';
    } else {
      if (refundTotal(order) + event.amount > order.amount) return rejected('refund-exceeds-payment');
      order.refunds.push({ id: event.refund, amount: event.amount });
      result = fullyRefunded(order) ? 'fully-refunded' : 'partially-refunded';
    }
  }
  // In production, event receipt and order/entitlement changes must commit together.
  next.seen.push(event.id);
  return { state: next, result };
}
