// Native disclosures and links remain usable without this bulk-control enhancement.
const map = document.querySelector<HTMLElement>('[data-topic-map]');
if (map) {
  const branches = [...map.querySelectorAll<HTMLDetailsElement>('details')];
  const expand = map.querySelector<HTMLButtonElement>('[data-map-expand]')!;
  const collapse = map.querySelector<HTMLButtonElement>('[data-map-collapse]')!;
  expand.addEventListener('click', () => branches.forEach(branch => { branch.open = true; }));
  collapse.addEventListener('click', () => branches.forEach(branch => { branch.open = false; }));
  map.querySelector<HTMLElement>('[data-map-tools]')!.hidden = false;
}
