const rightsDemo = document.querySelector<HTMLElement>('[data-rights-demo]');
if (rightsDemo) {
  const form = rightsDemo.querySelector<HTMLFormElement>('form')!;
  const fields = form.querySelector<HTMLFieldSetElement>('fieldset')!;
  const delivery = form.elements.namedItem('delivery') as RadioNodeList;
  const notice = form.elements.namedItem('notice') as HTMLInputElement;
  const write = (key: string, value: string) => {
    rightsDemo.querySelector<HTMLElement>(`[data-rights-${key}]`)!.textContent = value;
  };
  const update = () => {
    const raster = delivery.value === 'raster';
    write('package', raster ? '只交付点阵 PNG；不含字体文件，也不在网页中另行加载这份字体。' : delivery.value === 'web' ? '浏览器取得网页及字体文件；访客实际收到了一份字体副本。' : '客户取得可编辑模板和字体文件；以后转交他人还会再次分发字体。');
    write('result', raster
      ? '这次没有分发字体文件，因此不由这一步触发随字体副本附带许可的要求。OFL 不要求用字体做出的图片改用 OFL；图片中的其他材料仍另查。'
      : notice.checked
        ? '本例已安排随字体副本保留版权声明及 OFL 全文。下一步要检查实际发布包和访问入口，确认这些文件确实到达接收方；勾选并不代表已经交付。'
        : '当前交付安排缺少字体的版权声明及 OFL 全文。先补进发布包，并让接收方能找到；只有内部台账存着许可还不够。');
    write('notice-help', raster ? '切换前的勾选状态会保留，但不参与当前 PNG 路线的判断。' : '只讨论未修改的 Inter 4.1，不检查其他素材，也不判断整个产品是否可发布。');
    notice.disabled = raster;
  };
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('change', update);
  form.addEventListener('reset', () => { setTimeout(update, 0); });
  update();
  fields.disabled = false;
}
