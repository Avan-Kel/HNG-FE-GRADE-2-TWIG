// auth.js - handles signup + login using localStorage
(function () {
  // -----------------
  // Helpers
  // -----------------
  function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  function showToast(msg, type = 'success') {
    if (window.showToast) return window.showToast(msg, type);
    alert(msg);
  }

  // -----------------
  // Signup
  // -----------------
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim().toLowerCase();
      const password = document.getElementById('password').value;

      if (!username || !email || !password) return alert('All fields required');

      const users = getUsers();
      if (users.find(u => u.email === email)) {
        showToast('User already exists', 'error');
        return;
      }
      users.push({ username, email, password });
      saveUsers(users);
      showToast('Account created — you can login now', 'success');
      setTimeout(() => window.location.href = '/login.php', 900);
    });
  }

  // -----------------
  // Login
  // -----------------
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim().toLowerCase();
      const password = document.getElementById('password').value;

      const users = getUsers();
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        showToast('Invalid credentials', 'error');
        return;
      }
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      showToast('Login successful', 'success');
      setTimeout(() => window.location.href = '/dashboard.php', 600);
    });
  }

  // -----------------
  // Redirect if already logged in
  // -----------------
  (function redirectIfLoggedIn(){
    try {
      const path = window.location.pathname;
      const logged = localStorage.getItem('loggedInUser');
      if (logged && (path.endsWith('/login.php') || path.endsWith('/signup.php'))) {
        window.location.href = '/dashboard.php';
      }
    } catch(e){}
  })();

  // -----------------
  // Dynamic Navbar Logic
  // -----------------
  (function(){
    const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');

    const loginLink = document.getElementById('navLogin');
    const signupLink = document.getElementById('navSignup');
    const greetingLi = document.getElementById('navUserGreeting');
    const greetingSpan = document.getElementById('greeting');
    const logoutBtn = document.getElementById('navLogout');

    if(user){
      if(loginLink) loginLink.style.display = 'none';
      if(signupLink) signupLink.style.display = 'none';

      if(greetingLi){
        greetingLi.classList.remove('hidden');
        if(greetingSpan) greetingSpan.textContent = `Hello, ${user.username || user.email}`;
      }

      if(logoutBtn){
        logoutBtn.addEventListener('click', ()=>{
          localStorage.removeItem('loggedInUser');
          window.location.href = '/';
        });
      }
    } else {
      if(greetingLi) greetingLi.classList.add('hidden');
    }
  })();

})();
