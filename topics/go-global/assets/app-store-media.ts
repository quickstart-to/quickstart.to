const releaseDemo = document.querySelector<HTMLElement>('[data-app-release]');
if (releaseDemo) {
  const devices = [...releaseDemo.querySelectorAll<HTMLElement>('[data-app-device]')];
  const install = releaseDemo.querySelector<HTMLButtonElement>('[data-app-install]')!;
  const halt = releaseDemo.querySelector<HTMLButtonElement>('[data-app-halt]')!;
  const fix = releaseDemo.querySelector<HTMLButtonElement>('[data-app-fix]')!;
  const reset = releaseDemo.querySelector<HTMLButtonElement>('[data-app-reset]')!;
  let installed = 4;
  let repaired = 0;
  let paused = false;
  const render = () => {
    devices.forEach((device, index) => {
      const version = index < repaired ? 'v1.2' : index < installed ? 'v1.1' : 'v1.0';
      device.textContent = `${String(index + 1).padStart(2, '0')} · ${version}`;
      device.dataset.version = version === 'v1.2' ? 'fixed' : version === 'v1.1' ? 'bad' : 'old';
    });
    install.disabled = paused || installed === devices.length;
    halt.disabled = paused;
    fix.disabled = !paused || repaired === installed;
    releaseDemo.querySelector<HTMLElement>('[data-app-result]')!.textContent = `${devices.length - installed} 台仍是 v1.0；${installed - repaired} 台为有缺陷的 v1.1；${repaired} 台装好 v1.2 修复版。`;
    releaseDemo.querySelector<HTMLElement>('[data-app-explanation]')!.textContent = repaired > 0
      ? `本例中 ${repaired} 台已实际装好修复版；暂停操作本身没有修复它们。v1.1 仍停止发布，其他设备维持原版本。`
      : paused
        ? `v1.1 已暂停，但 ${installed} 台仍保留有问题的版本；没有自动退回 v1.0。下一步是修复并确认这些设备实际安装。`
        : installed === devices.length
          ? '20 台都已装上有问题的版本。现在暂停不会撤回这些安装，仍需提供修复并确认安装结果。'
          : `v1.1 仍在发布。本例再模拟一台安装，有缺陷版本的设备数会从 ${installed} 台增加到 ${installed + 1} 台。`;
  };
  install.addEventListener('click', () => {
    if (!paused && installed < devices.length) { installed += 1; render(); }
  });
  halt.addEventListener('click', () => { paused = true; render(); });
  fix.addEventListener('click', () => {
    if (paused) { repaired = installed; render(); }
  });
  reset.addEventListener('click', () => { installed = 4; repaired = 0; paused = false; render(); });
  releaseDemo.querySelector<HTMLElement>('[data-app-actions]')!.hidden = false;
  render();
}
