// js/schedule_doctor.js
document.addEventListener('DOMContentLoaded', () => {
    checkDoctorLogin();
    loadDoctorAvailability();
    loadUpcomingAppointments();
});

function checkDoctorLogin() {
    if (!localStorage.getItem('isDoctorLoggedIn')) {
        window.location.href = 'login_doctor.html';
    }
}

function loadDoctorAvailability() {
    // In a real application, you would fetch the doctor's availability
    // from a server or local storage.
    const availabilityData = JSON.parse(localStorage.getItem('doctorAvailability')) || {
        Mon: [{ start: '09:00', end: '17:00' }],
        Tue: [{ start: '09:00', end: '17:00' }],
        Wed: [{ start: '09:00', end: '13:00' }],
        Thu: [{ start: '09:00', end: '17:00' }],
        Fri: [{ start: '09:00', end: '17:00' }],
        Sat: [],
        Sun: []
    };

    const availabilityDisplay = document.getElementById('availability-display');
    availabilityDisplay.innerHTML = '';

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayKeys = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    dayKeys.forEach((key, index) => {
        const day = daysOfWeek[index];
        const slots = availabilityData[key];
        let availabilityText = `<strong>${day}:</strong> `;
        if (slots && slots.length > 0) {
            availabilityText += slots.map(slot => `${formatTime(slot.start)} - ${formatTime(slot.end)}`).join(', ');
        } else {
            availabilityText += 'Closed';
        }
        const p = document.createElement('p');
        p.innerHTML = availabilityText;
        availabilityDisplay.appendChild(p);
    });
}

function loadUpcomingAppointments() {
    // In a real application, you would fetch upcoming appointments
    // for the logged-in doctor from a server.
    const today = new Date().toISOString().split('T')[0];
    const allPatientAppointments = JSON.parse(localStorage.getItem('patientAppointments')) || [];
    const upcomingAppointments = allPatientAppointments.filter(appt => appt.date >= today);

    const upcomingAppointmentsDiv = document.getElementById('upcoming-appointments');
    const noUpcomingAppointmentsMessage = document.getElementById('no-upcoming-appointments');
    upcomingAppointmentsDiv.innerHTML = '';

    if (upcomingAppointments.length > 0) {
        upcomingAppointments.forEach((appointment, index) => {
            const appointmentCard = document.createElement('div');
            appointmentCard.classList.add('card', 'appointment-card');
            // You'd likely need to fetch patient names based on patient IDs
            appointmentCard.innerHTML = `
                <h3>Patient: ${appointment.patientName}</h3>
                <p>Date: ${appointment.date}</p>
                <p>Time: ${formatTime(appointment.startTime)} - ${formatTime(appointment.endTime)}</p>
                <button onclick="window.location.href='appointment_details_doctor.html?id=${index}'">View Details</button>
            `;
            upcomingAppointmentsDiv.appendChild(appointmentCard);
        });
    } else {
        upcomingAppointmentsDiv.style.display = 'none';
        noUpcomingAppointmentsMessage.style.display = 'block';
    }
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    return new Date(0, 0, 0, hours, minutes).toLocaleTimeString([],
        { hour: 'numeric', minute: '2-digit', hour12: true });
}