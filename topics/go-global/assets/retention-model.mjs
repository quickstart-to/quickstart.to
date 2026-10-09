// Synthetic teaching records: no analytics, private data, or platform-specific retention formula.
export const BASE_RECORDS = Object.freeze([
  { id: 'A', state: 'independent' },
  { id: 'B', state: 'independent' },
  { id: 'C', state: 'assisted' },
  { id: 'D', state: 'alternative' },
  { id: 'E', state: 'alternative' },
  { id: 'F', state: 'no-task' },
  { id: 'G', state: 'no-task' },
  { id: 'H', state: 'unknown' },
].map(Object.freeze));

export const STATE_LABELS = Object.freeze({
  independent: '独立完成并用上',
  assisted: '协助完成后用上',
  alternative: '任务发生，采用旧办法',
  'no-task': '确认尚无下一次任务',
  unknown: '任务与结果尚不清楚',
});

export function scenarioRecords(hState = 'unknown') {
  if (!Object.hasOwn(STATE_LABELS, hState)) throw new RangeError('Unknown observation state');
  return BASE_RECORDS.map(row => ({ ...row, state: row.id === 'H' ? hState : row.state }));
}

export function summarizeRecords(records, criterion = 'used') {
  if (!['used', 'independent'].includes(criterion)) throw new RangeError('Unknown result criterion');
  const seen = new Set();
  let eligible = 0, qualified = 0, unknown = 0, noTask = 0;
  for (const row of records) {
    if (!row.id || seen.has(row.id) || !Object.hasOwn(STATE_LABELS, row.state)) {
      throw new TypeError('Each participant needs a unique ID and a valid observation state');
    }
    seen.add(row.id);
    if (row.state === 'unknown') unknown++;
    else if (row.state === 'no-task') noTask++;
    else eligible++;
    if (row.state === 'independent' || (criterion === 'used' && row.state === 'assisted')) qualified++;
  }
  return {
    total: records.length, eligible, qualified, unknown, noTask,
    fixedRate: records.length ? qualified / records.length : null,
    conditionalRate: eligible ? qualified / eligible : null,
    qualifyingIds: records.filter(row => row.state === 'independent' || (criterion === 'used' && row.state === 'assisted')).map(row => row.id),
  };
}

export function percent(rate) {
  return rate === null ? '—' : `${Number((rate * 100).toFixed(1))}%`;
}
