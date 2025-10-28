(function () {
  const toastRoot = document.getElementById('toast-root');
  window.showToast = (msg, type='success', ttl=3000) => {
    if (!toastRoot) return alert(msg);
    const div = document.createElement('div');
    div.className = `px-4 py-2 rounded shadow-md mb-2 text-sm ${type==='error'?'bg-red-100 text-red-800':'bg-green-100 text-green-800'}`;
    div.textContent = msg;
    toastRoot.appendChild(div);
    setTimeout(()=>{ div.classList.add('opacity-0'); setTimeout(()=>div.remove(),300); }, ttl);
  };

  window.openModal = ({ title='Modal' }={})=>{
    const root = document.getElementById('modalRoot');
    if (!root) return;
    document.getElementById('modalTitle').textContent = title;
    root.classList.remove('hidden');
    root.classList.add('flex');
    setTimeout(()=>document.getElementById('m_title')?.focus(),50);
  };

  window.closeModal = ()=>{
    const root = document.getElementById('modalRoot');
    if (!root) return;
    root.classList.add('hidden');
    root.classList.remove('flex');
    const form = document.getElementById('modalForm');
    if (form) { form.reset(); delete form.dataset.editId; }
  };

  document.addEventListener('click', e => { if(e.target?.id==='modalCancel') window.closeModal(); });
})();
