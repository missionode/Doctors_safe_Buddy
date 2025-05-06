// js/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', handleLogin);

    function handleLogin(event) {
        event.preventDefault();

        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        // For demonstration, we'll check against a hardcoded user
        // In a real application, you would verify against stored user data.
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            const users = JSON.parse(storedUsers);
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'landing_patient.html';
            } else {
                alert('Invalid username or password.');
            }
        } else {
            alert('No user accounts found. Please sign up.');
        }
    }
});