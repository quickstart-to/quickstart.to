// Synthetic cash reconciliation only. USD and CNY both use two minor digits.
// Fees before the selected starting document must never be deducted again.
export const settlement = Object.freeze({ opening: 4000, payments: 50000, tax: 3000, transactionFees: 2500, refunds: 4500, held: 10000, payoutFee: 700, receivingFee: 300, rate: 72000, localFee: 1500, credited: 236100 });

export function reconcile(start, evidence) {
  if (!['before', 'sent'].includes(start) || !['unknown', 'rate', 'complete'].includes(evidence)) throw new RangeError('Unknown teaching scenario');
  const s = settlement;
  const available = s.opening + s.payments - s.tax - s.transactionFees - s.refunds - s.held;
  const sent = available - s.payoutFee;
  const startAmount = start === 'before' ? available : sent;
  const remainingPlatformFee = start === 'before' ? s.payoutFee : 0;
  const exchangeAmount = startAmount - remainingPlatformFee - s.receivingFee;
  // Rate is CNY per USD, stored in ten-thousandths; round once to CNY fen.
  const converted = evidence === 'unknown' ? null : Number((BigInt(exchangeAmount) * BigInt(s.rate) + 5000n) / 10000n);
  const confirmedLocalFee = evidence === 'complete' ? s.localFee : null;
  const explainedCredit = converted === null ? null : converted - (confirmedLocalFee ?? 0);
  const difference = explainedCredit === null ? null : explainedCredit - s.credited;
  return { available, sent, startAmount, remainingPlatformFee, exchangeAmount, converted, confirmedLocalFee, explainedCredit, difference, credited: s.credited, complete: evidence === 'complete' && difference === 0 };
}

export function money(minor, currency) {
  return `${(minor / 100).toFixed(2)} ${currency}`;
}
