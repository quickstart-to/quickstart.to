import { reportPreview, REPORT_SAMPLE } from './market-format-model.mjs';

const demo = document.querySelector<HTMLElement>('[data-market-demo]');
if (demo) {
  const raw = demo.querySelector<HTMLInputElement>('[data-market-input]')!;
  const order = demo.querySelector<HTMLSelectElement>('[data-market-order]')!;
  const locale = demo.querySelector<HTMLSelectElement>('[data-market-locale]')!;
  const zone = demo.querySelector<HTMLSelectElement>('[data-market-zone]')!;
  const reset = demo.querySelector<HTMLButtonElement>('[data-market-reset]')!;
  const write = (key: string, text: string) => { demo.querySelector<HTMLElement>(`[data-market-${key}]`)!.textContent = text; };
  const errors: Record<string, string> = {
    'choose-format': '先确认源文件的日期顺序。显示语言和时区都不能替你作出这个判断。',
    'wrong-shape': '输入不符合所选格式。请核对分隔符、日期顺序与四位年份；本例不猜测。',
    'year-outside-example': '这个小演示只处理 1900–2100 年的公历日期。',
    'invalid-date': '这不是一个有效的公历日期。预览保留待确认状态，不自动挪到下个月。',
  };
  const render = () => {
    try {
      const preview = reportPreview(raw.value, order.value, locale.value, zone.value);
      write('deadline', preview.deadline ?? '待确认，不生成截止日期');
      write('stored', preview.parsed.ok ? preview.parsed.iso : '尚未得到确定的日期');
      write('budget', preview.budget);
      write('updated', preview.updated);
      write('result', preview.parsed.ok
        ? '已按你确认的格式生成预览。检查这个日期是不是原作者的意思；格式有效不代表理解正确。'
        : errors[preview.parsed.reason] ?? '日期尚未确认。');
      raw.setAttribute('aria-invalid', String(!preview.parsed.ok && order.value !== ''));
    } catch {
      for (const key of ['stored', 'deadline', 'budget', 'updated']) write(key, '当前显示设置不可用');
      write('result', '当前浏览器无法处理这个显示设置。请使用下方静态示例核对，不把默认格式当作已确认的结果。');
    }
  };
  for (const control of [raw, order, locale, zone]) control.addEventListener(control === raw ? 'input' : 'change', render);
  reset.addEventListener('click', () => {
    raw.value = REPORT_SAMPLE.rawDate; order.value = ''; locale.value = 'en-GB'; zone.value = 'Europe/London'; render();
  });
  demo.querySelector<HTMLFieldSetElement>('fieldset')!.disabled = false;
  reset.hidden = false;
  render();
}
