const deletion = document.querySelector<HTMLElement>('[data-privacy-deletion]');
if (deletion) {
  const remove = deletion.querySelector<HTMLButtonElement>('[data-privacy-remove]')!;
  const restore = deletion.querySelector<HTMLButtonElement>('[data-privacy-restore]')!;
  const reapply = deletion.querySelector<HTMLButtonElement>('[data-privacy-reapply]')!;
  const reset = deletion.querySelector<HTMLButtonElement>('[data-privacy-reset]')!;
  // Fixed synthetic records stay in page memory. The retained deletion record is
  // deliberately outside the old snapshot, so it can be applied after restore.
  const snapshot = { account: 'demo@example.invalid', session: 'DEMO-SESSION', attachment: 'synthetic.csv' };
  let current = { ...snapshot };
  let deletionRecorded = false;
  let recovered = false;
  const clearCurrent = () => { current = { account: '', session: '', attachment: '' }; };
  const render = () => {
    deletion.querySelector<HTMLElement>('[data-privacy-account]')!.textContent = current.account || '已移除';
    deletion.querySelector<HTMLElement>('[data-privacy-session]')!.textContent = current.session ? '1 个合成会话' : '0 个';
    deletion.querySelector<HTMLElement>('[data-privacy-attachment]')!.textContent = current.attachment || '已移除';
    deletion.querySelector<HTMLElement>('[data-privacy-record]')!.textContent = deletionRecorded ? '已记录 DEMO-DELETE-001' : '尚未记录';
    deletion.querySelector<HTMLElement>('[data-privacy-result]')!.textContent = !deletionRecorded
      ? '尚未删除。当前三类合成记录都有一份副本，旧备份也保留了这组记录。'
      : current.account
        ? '遗漏了删除记录：旧备份把账号、会话和附件带回来了。此时不能把恢复后的系统开放给用户。'
        : recovered
          ? '恢复后重新应用删除记录，三类数据均已移除。对外恢复前，还应核对其他接收方和实际备份清理结果。'
          : '当前三类记录已移除，删除请求已记录；旧备份仍含原数据。试一次遗漏删除记录的恢复，看看会发生什么。';
    remove.disabled = deletionRecorded;
    restore.disabled = !deletionRecorded || Boolean(current.account);
    reapply.disabled = !deletionRecorded || !current.account;
  };
  remove.addEventListener('click', () => { deletionRecorded = true; clearCurrent(); render(); });
  restore.addEventListener('click', () => { if (deletionRecorded) { current = { ...snapshot }; recovered = true; render(); } });
  reapply.addEventListener('click', () => { if (deletionRecorded) { clearCurrent(); render(); } });
  reset.addEventListener('click', () => { current = { ...snapshot }; deletionRecorded = false; recovered = false; render(); });
  deletion.querySelector<HTMLElement>('[data-privacy-actions]')!.hidden = false;
  render();
}
