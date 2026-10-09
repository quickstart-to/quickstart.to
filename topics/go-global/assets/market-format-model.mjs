// Synthetic report example. This is deliberately not a general CSV/date parser.
export const REPORT_SAMPLE = Object.freeze({
  rawDate: '11/10/2026', budget: 1234.5, currency: 'USD',
  updatedAt: '2026-10-09T00:30:00Z',
});
export const REPORT_LOCALES = ['en-GB', 'en-US', 'de-DE'];
export const REPORT_ZONES = ['Europe/London', 'America/Los_Angeles', 'Asia/Tokyo'];

export function confirmReportDate(input, order) {
  if (!['mdy', 'dmy', 'iso'].includes(order)) return { ok: false, reason: 'choose-format' };
  const value = input.trim();
  const parts = order === 'iso' ? /^(\d{4})-(\d{2})-(\d{2})$/.exec(value) : /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value);
  if (!parts) return { ok: false, reason: 'wrong-shape' };
  const [a, b, c] = parts.slice(1).map(Number);
  const [year, month, day] = order === 'iso' ? [a, b, c] : order === 'mdy' ? [c, a, b] : [c, b, a];
  if (year < 1900 || year > 2100) return { ok: false, reason: 'year-outside-example' };
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    return { ok: false, reason: 'invalid-date' };
  }
  return { ok: true, iso: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` };
}

export function reportPreview(input, order, locale, timeZone) {
  if (!REPORT_LOCALES.includes(locale) || !REPORT_ZONES.includes(timeZone)) throw new RangeError('Unsupported example setting');
  if (Intl.DateTimeFormat.supportedLocalesOf([locale]).length !== 1 || Intl.NumberFormat.supportedLocalesOf([locale]).length !== 1) {
    throw new RangeError('The requested locale is unavailable in this runtime');
  }
  const parsed = confirmReportDate(input, order);
  // A deadline here is a calendar date, not an instant that shifts with a time zone.
  const deadline = parsed.ok ? new Intl.DateTimeFormat(locale, {
    year: 'numeric', month: 'long', day: 'numeric', calendar: 'gregory', numberingSystem: 'latn', timeZone: 'UTC',
  }).format(new Date(`${parsed.iso}T00:00:00Z`)) : null;
  const budget = new Intl.NumberFormat(locale, { style: 'currency', currency: REPORT_SAMPLE.currency,
    currencyDisplay: 'code', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(REPORT_SAMPLE.budget);
  const updated = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZoneName: 'shortOffset',
    calendar: 'gregory', numberingSystem: 'latn', timeZone }).format(new Date(REPORT_SAMPLE.updatedAt));
  return { parsed, deadline, budget, updated };
}
