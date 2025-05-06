// js/profile_view.js
document.addEventListener('DOMContentLoaded', () => {
    loadProfileData();
});

function loadProfileData() {
    const profileData = localStorage.getItem('userProfile');

    if (profileData) {
        const userProfile = JSON.parse(profileData);
        document.getElementById('profile-name').textContent = userProfile.name || 'N/A';
        document.getElementById('profile-age').textContent = userProfile.age || 'N/A';
        document.getElementById('profile-sex').textContent = userProfile.sex || 'N/A';
        document.getElementById('profile-dob').textContent = userProfile.dob || 'N/A';
        document.getElementById('profile-blood-group').textContent = userProfile.bloodGroup || 'N/A';
    } else {
        // Optionally display a message if no profile data is found
        console.log('No profile data found in local storage.');
    }
}