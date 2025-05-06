// js/settings_doctor.js
document.addEventListener('DOMContentLoaded', () => {
    checkDoctorLogin();
    console.log('Doctor settings page loaded.');
});

function checkDoctorLogin() {
    if (!localStorage.getItem('isDoctorLoggedIn')) {
        window.location.href = 'login_doctor.html';
    }
}