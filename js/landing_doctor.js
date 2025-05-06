// js/landing_doctor.js
document.addEventListener('DOMContentLoaded', () => {
    checkDoctorLogin();
    loadTodaysAppointments();
});

function checkDoctorLogin() {
    if (!localStorage.getItem('isDoctorLoggedIn')) {
        window.location.href = 'login_doctor.html';
    }
}

function toggleMenu() {
    const menuItems = document.querySelector('.menu-items');
    menuItems.style.display = menuItems.style.display === 'flex' ? 'none' : 'flex';
}

function logoutDoctor() {
    localStorage.removeItem('isDoctorLoggedIn');
    window.location.href = 'login_doctor.html';
}

function loadTodaysAppointments() {
    // In a real application, you would fetch today's appointments
    // from a server based on the logged-in doctor's ID.
    // For this example, we'll simulate some appointments.
    const today = new Date().toISOString().split('T')[0];
    const allPatientAppointments = JSON.parse(localStorage.getItem('patientAppointments')) || [];
    const todaysAppointments = allPatientAppointments.filter(appt => appt.date === today);

    const appointmentsListDiv = document.getElementById('appointments-list');
    const noAppointmentsMessage = document.getElementById('no-appointments');
    appointmentsListDiv.innerHTML = ''; // Clear previous list

    if (todaysAppointments.length > 0) {
        todaysAppointments.forEach((appointment, index) => {
            const appointmentCard = document.createElement('div');
            appointmentCard.classList.add('card', 'appointment-card');
            // You'd likely need to fetch patient names based on patient IDs
            appointmentCard.innerHTML = `
                <h3>Patient: (Patient Name)</h3>
                <p>Time: ${formatTime(appointment.startTime)} - ${formatTime(appointment.endTime)}</p>
                <p>Reason: ${appointment.reason}</p>
                <button onclick="window.location.href='appointment_details_doctor.html?id=${index}'">View Details</button>
            `;
            appointmentsListDiv.appendChild(appointmentCard);
        });
    } else {
        appointmentsListDiv.style.display = 'none';
        noAppointmentsMessage.style.display = 'block';
    }
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    return new Date(0, 0, 0, hours, minutes).toLocaleTimeString([],
        { hour: 'numeric', minute: '2-digit', hour12: true });
}