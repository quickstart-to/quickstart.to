const rotation = document.querySelector<HTMLElement>('[data-risk-rotation]');
if (rotation) {
  const inputs = [...rotation.querySelectorAll<HTMLInputElement>('[data-risk-action]')];
  const reset = rotation.querySelector<HTMLButtonElement>('[data-risk-reset]')!;
  const render = () => {
    const done = (name: string) => inputs.find(input => input.dataset.riskAction === name)!.checked;
    const revoked = done('revoked');
    const web = done('web');
    const job = done('job');
    rotation.querySelector<HTMLElement>('[data-risk-old]')!.textContent = revoked ? '401 · 旧访问被拒绝' : '200 · 仍可访问';
    const clientResult = (updated: boolean) => updated ? '200 · 使用新密钥' : revoked ? '401 · 仍使用已撤销的旧密钥' : '200 · 使用旧密钥';
    rotation.querySelector<HTMLElement>('[data-risk-web]')!.textContent = clientResult(web);
    rotation.querySelector<HTMLElement>('[data-risk-job]')!.textContent = clientResult(job);
    rotation.querySelector<HTMLElement>('[data-risk-explanation]')!.textContent = !revoked
      ? web && job ? '两个使用位置都换好了，但旧密钥仍被接受；换好配置没有收回旧访问。' : '网站和任务可用，但旧密钥仍被接受；尚未收回旧访问。'
      : web && job ? '本例两条验证都通过：旧访问被拒绝，网站与后台任务都使用新密钥成功请求。这不证明真实事件中没有其他异常权限。'
      : `旧访问已被拒绝；${!web && !job ? '网站和后台任务都' : !web ? '网站' : '后台任务'}仍使用已撤销的旧密钥，尚未恢复。`;
    rotation.querySelector<HTMLElement>('[data-risk-file]')!.textContent = done('deleted')
      ? '文件副本已删除。这一步没有改变签发方接受哪把密钥。'
      : '文件副本仍在。清理副本可以减少继续暴露，却不能使别人已复制的密钥失效。';
  };
  inputs.forEach(input => { input.disabled = false; input.addEventListener('change', render); });
  reset.hidden = false;
  reset.addEventListener('click', () => { inputs.forEach(input => { input.checked = false; }); render(); });
  render();
}
