// js/edit_profile_doctor.js
document.addEventListener('DOMContentLoaded', () => {
    checkDoctorLogin();
    loadDoctorProfileForEdit();

    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', saveDoctorProfile);
});

function checkDoctorLogin() {
    if (!localStorage.getItem('isDoctorLoggedIn')) {
        window.location.href = 'login_doctor.html';
    }
}

function loadDoctorProfileForEdit() {
    const storedProfile = localStorage.getItem('doctorProfile');
    if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        document.getElementById('name').value = profile.name || '';
        document.getElementById('specialization').value = profile.specialization || '';
        document.getElementById('contact').value = profile.contact || '';
    }
}

function saveDoctorProfile(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const specialization = document.getElementById('specialization').value.trim();
    const contact = document.getElementById('contact').value.trim();

    const doctorProfile = {
        name: name,
        specialization: specialization,
        contact: contact
    };

    localStorage.setItem('doctorProfile', JSON.stringify(doctorProfile));
    alert('Profile saved successfully!');
    window.location.href = 'profile_doctor.html';
}