(function () {
  const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  if (!user) return window.location.href = '/login.php';

  document.getElementById('userEmail').textContent = user.email;

  const getTickets = () => JSON.parse(localStorage.getItem('tickets') || '[]');
  const all = getTickets().filter(t => t.owner === user.email);

  document.getElementById('totalTickets').textContent = all.length;
  document.getElementById('openTickets').textContent = all.filter(t => t.status === 'open').length;
  document.getElementById('closedTickets').textContent = all.filter(t => t.status === 'closed').length;

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login.php';
  });
})();
