// js/login_doctor.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', handleLogin);

    function handleLogin(event) {
        event.preventDefault();

        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        // Hardcoded credentials for demonstration
        if (username === 'doctor1' && password === 'pass123') {
            // Store login status (you might use local storage for a simple implementation)
            localStorage.setItem('isDoctorLoggedIn', 'true');
            window.location.href = 'landing_doctor.html';
        } else {
            alert('Invalid username or password.');
        }
    }
});