const library = document.querySelector<HTMLElement>('[data-resource-library]');
if (library) {
  const buttons = [...library.querySelectorAll<HTMLButtonElement>('[data-resource-filter]')];
  const cards = [...library.querySelectorAll<HTMLElement>('[data-resource-topic]')];
  const count = library.querySelector<HTMLElement>('[data-resource-count]')!;
  const filter = (button: HTMLButtonElement) => {
    const selected = button.dataset.resourceFilter;
    let visible = 0;
    for (const card of cards) {
      card.hidden = selected !== 'all' && card.dataset.resourceTopic !== selected;
      if (!card.hidden) visible += 1;
    }
    for (const item of buttons) item.setAttribute('aria-pressed', String(item === button));
    count.textContent = selected === 'all'
      ? `全部 ${visible} 份外部材料。选择一项当前任务即可缩小范围。`
      : `“${button.textContent?.trim()}”：${visible} 份材料。点击“全部”恢复完整列表。`;
  };
  for (const button of buttons) button.addEventListener('click', () => filter(button));
  library.querySelector<HTMLElement>('[data-resource-controls]')!.hidden = false;
  filter(buttons[0]);
}
