// js/profile_doctor.js
document.addEventListener('DOMContentLoaded', () => {
    checkDoctorLogin();
    loadDoctorProfile();
});

function checkDoctorLogin() {
    if (!localStorage.getItem('isDoctorLoggedIn')) {
        window.location.href = 'login_doctor.html';
    }
}

function loadDoctorProfile() {
    // In a real application, you would fetch the doctor's profile
    // from a server based on their logged-in ID.
    // For this example, we'll use hardcoded data or data from local storage if available.
    const storedProfile = localStorage.getItem('doctorProfile');
    if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        document.getElementById('profile-name').textContent = profile.name || 'Dr. Smith';
        document.getElementById('profile-specialization').textContent = profile.specialization || 'Cardiologist';
        document.getElementById('profile-contact').textContent = profile.contact || '123-456-7890';
    } else {
        // Default hardcoded data if no profile is stored
        document.getElementById('profile-name').textContent = 'Dr. Smith';
        document.getElementById('profile-specialization').textContent = 'Cardiologist';
        document.getElementById('profile-contact').textContent = '123-456-7890';
    }
}