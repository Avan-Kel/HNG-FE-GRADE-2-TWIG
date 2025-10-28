(function(){
  const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  if (!user) return window.location.href='/login.php';

  const ticketsGrid = document.getElementById('ticketsGrid');
  const openCreateBtn = document.getElementById('openCreateModal');
  const logoutTop = document.getElementById('logoutBtnTop');
  const modalForm = document.getElementById('modalForm');

  const getTickets = () => JSON.parse(localStorage.getItem('tickets') || '[]');
  const saveTickets = ts => localStorage.setItem('tickets', JSON.stringify(ts));

  function escapeHtml(unsafe){ return unsafe.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"); }

  function renderCard(ticket){
    const statusClass = ticket.status==='open'?'bg-green-100 text-green-800':
                        ticket.status==='in_progress'?'bg-amber-100 text-amber-800':'bg-slate-100 text-slate-800';
    return `<div class="p-4 bg-white rounded-lg shadow flex flex-col justify-between">
      <div>
        <h3 class="font-semibold text-lg">${escapeHtml(ticket.title)}</h3>
        <div class="text-sm text-slate-500 mt-1">${new Date(ticket.createdAt).toLocaleString()}</div>
        <p class="mt-3 text-slate-700">${escapeHtml(ticket.description||'')}</p>
      </div>
      <div class="mt-4 flex items-center justify-between">
        <div class="${statusClass} px-2 py-1 rounded text-xs font-medium">${ticket.status.replace('_',' ')}</div>
        <div class="flex gap-2">
          <button data-id="${ticket.id}" data-action="edit" class="px-2 py-1 border rounded text-sm">Edit</button>
          <button data-id="${ticket.id}" data-action="delete" class="px-2 py-1 border rounded text-sm">Delete</button>
        </div>
      </div>
    </div>`;
  }

  function renderTickets(){
    const all = getTickets().filter(t=>t.owner===user.email);
    if(!all.length){ ticketsGrid.innerHTML='<div class="text-center text-slate-500">No tickets yet — create one.</div>'; return; }
    ticketsGrid.innerHTML = all.map(renderCard).join('');
  }

  if(openCreateBtn) openCreateBtn.addEventListener('click', ()=>{
    document.getElementById('modalTitle').textContent='Add Ticket';
    ['m_title','m_description'].forEach(id=>document.getElementById(id).value='');
    document.getElementById('m_priority').value='low';
    document.getElementById('m_status').value='open';
    delete modalForm.dataset.editId;
    window.openModal({title:'Add Ticket'});
  });

  if(logoutTop) logoutTop.addEventListener('click', ()=>{
    localStorage.removeItem('loggedInUser');
    window.location.href='/login.php';
  });

  modalForm.addEventListener('submit', e=>{
    e.preventDefault();
    const title=document.getElementById('m_title').value.trim();
    const description=document.getElementById('m_description').value.trim();
    const priority=document.getElementById('m_priority').value;
    const status=document.getElementById('m_status').value;
    if(!title){ window.showToast('Title required','error'); return; }
    if(!['open','in_progress','closed'].includes(status)){ window.showToast('Invalid status','error'); return; }

    const tickets=getTickets();
    const editId=modalForm.dataset.editId;
    if(editId){
      const idx=tickets.findIndex(t=>t.id===editId);
      if(idx===-1){ window.showToast('Ticket not found','error'); return; }
      tickets[idx]={...tickets[idx], title, description, priority, status};
      window.showToast('Ticket updated','success');
    }else{
      tickets.push({id:Date.now().toString(),title,description,priority,status,owner:user.email,createdAt:new Date().toISOString()});
      window.showToast('Ticket created','success');
    }
    saveTickets(tickets);
    window.closeModal();
    renderTickets();
  });

  ticketsGrid.addEventListener('click', e=>{
    const btn=e.target.closest('button[data-action]');
    if(!btn) return;
    const id=btn.dataset.id;
    const action=btn.dataset.action;
    if(action==='edit'){
      const ticket=getTickets().find(t=>t.id===id);
      if(!ticket) return;
      document.getElementById('modalTitle').textContent='Edit Ticket';
      document.getElementById('m_title').value=ticket.title;
      document.getElementById('m_description').value=ticket.description||'';
      document.getElementById('m_priority').value=ticket.priority||'low';
      document.getElementById('m_status').value=ticket.status||'open';
      modalForm.dataset.editId=id;
      window.openModal({title:'Edit Ticket'});
    }else if(action==='delete'){
      if(!confirm('Are you sure you want to delete this ticket?')) return;
      saveTickets(getTickets().filter(t=>t.id!==id));
      window.showToast('Ticket deleted','success');
      renderTickets();
    }
  });

  renderTickets();
})();
