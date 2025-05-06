// Hypothetical signup.js
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', handleSignup);

    function handleSignup(event) {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value.trim();

        const newUser = { username: username, password: password, phone: phone };

        let users = localStorage.getItem('users');
        if (users) {
            users = JSON.parse(users);
            users.push(newUser);
        } else {
            users = [newUser];
        }
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.removeItem('currentUser'); // Remove the old format
        alert('Sign up successful! Please log in.');
        window.location.href = 'login.html';
    }
});