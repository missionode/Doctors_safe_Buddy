// js/create_edit_profile.js
document.addEventListener('DOMContentLoaded', () => {
    loadProfileDataForEdit();

    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', saveProfileData);
});

function loadProfileDataForEdit() {
    const profileData = localStorage.getItem('userProfile');

    if (profileData) {
        const userProfile = JSON.parse(profileData);
        document.getElementById('name').value = userProfile.name || '';
        document.getElementById('age').value = userProfile.age || '';
        document.getElementById('sex').value = userProfile.sex || '';
        document.getElementById('dob').value = userProfile.dob || '';
        document.getElementById('bloodGroup').value = userProfile.bloodGroup || '';
    }
}

function saveProfileData(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const sex = document.getElementById('sex').value;
    const dob = document.getElementById('dob').value;
    const bloodGroup = document.getElementById('bloodGroup').value;

    const userProfile = {
        name: name,
        age: age,
        sex: sex,
        dob: dob,
        bloodGroup: bloodGroup
    };

    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    alert('Profile saved successfully!');
    window.location.href = 'profile_view.html';
}