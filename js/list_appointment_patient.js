// js/list_appointment_patient.js
document.addEventListener('DOMContentLoaded', () => {
    loadAppointments();

    const searchInput = document.getElementById('search-input');
    const filterStatus = document.getElementById('filter-status');

    searchInput.addEventListener('input', filterAppointments);
    filterStatus.addEventListener('change', filterAppointments);
});

let allAppointments = []; // To store all loaded appointments

function loadAppointments() {
    const appointmentsData = localStorage.getItem('patientAppointments');
    const appointmentListDiv = document.getElementById('appointment-list');
    const noAppointmentsMessage = document.getElementById('no-appointments');

    if (appointmentsData) {
        allAppointments = JSON.parse(appointmentsData);
        displayAppointments(allAppointments);
    } else {
        appointmentListDiv.style.display = 'none';
        noAppointmentsMessage.style.display = 'block';
    }
}

function displayAppointments(appointments) {
    const appointmentListDiv = document.getElementById('appointment-list');
    const noAppointmentsMessage = document.getElementById('no-appointments');
    appointmentListDiv.innerHTML = ''; // Clear previous list

    if (appointments.length === 0) {
        appointmentListDiv.style.display = 'none';
        noAppointmentsMessage.style.display = 'block';
        return;
    }

    appointmentListDiv.style.display = 'grid';
    noAppointmentsMessage.style.display = 'none';

    appointments.forEach((appointment, index) => {
        const appointmentItem = document.createElement('div');
        appointmentItem.classList.add('card', 'appointment-item');
        appointmentItem.innerHTML = `
            <h3>Reason: ${appointment.reason}</h3>
            <p>Date: ${appointment.date}</p>
            <p>Time: ${formatTime(appointment.startTime)} - ${formatTime(appointment.endTime)}</p>
            <p>Status: ${appointment.status}</p>
            <button onclick="window.location.href='appointment_view_patient.html?id=${index}'">View Details</button>
        `;
        appointmentListDiv.appendChild(appointmentItem);
    });
}

function filterAppointments() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const selectedStatus = document.getElementById('filter-status').value;

    const filteredAppointments = allAppointments.filter(appointment => {
        const searchMatch =
            appointment.reason.toLowerCase().includes(searchTerm) ||
            appointment.date.includes(searchTerm);
        const statusMatch =
            selectedStatus === '' || appointment.status === selectedStatus;
        return searchMatch && statusMatch;
    });

    displayAppointments(filteredAppointments);
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    return new Date(0, 0, 0, hours, minutes).toLocaleTimeString([],
        { hour: 'numeric', minute: '2-digit', hour12: true });
}