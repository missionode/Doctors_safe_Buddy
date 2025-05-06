// js/appointment_view_patient.js
document.addEventListener('DOMContentLoaded', () => {
    loadAppointmentDetails();
});

function loadAppointmentDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const appointmentIndex = urlParams.get('id');

    if (appointmentIndex !== null) {
        const appointmentsData = localStorage.getItem('patientAppointments');
        if (appointmentsData) {
            const appointments = JSON.parse(appointmentsData);
            if (appointments[appointmentIndex]) {
                const appointment = appointments[appointmentIndex];
                document.getElementById('appointment-reason').textContent = appointment.reason;
                document.getElementById('appointment-date').textContent = appointment.date;
                document.getElementById('appointment-time').textContent = `${formatTime(appointment.startTime)} - ${formatTime(appointment.endTime)}`;
                document.getElementById('appointment-status').textContent = appointment.status;

                // Check if the appointment is completed to show prescription options
                if (appointment.status === 'completed' && appointment.prescription) {
                    document.getElementById('prescription-section').style.display = 'block';
                    document.getElementById('prescription-details').textContent = appointment.prescription.observations || 'No observations';
                    // You might want to display prescription items here as well
                    document.getElementById('edit-prescription-button').style.display = 'block';
                }
            } else {
                alert('Appointment not found.');
                window.location.href = 'list_appointment_patient.html';
            }
        } else {
            alert('No appointments data found.');
            window.location.href = 'list_appointment_patient.html';
        }
    } else {
        alert('Invalid appointment ID.');
        window.location.href = 'list_appointment_patient.html';
    }
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    return new Date(0, 0, 0, hours, minutes).toLocaleTimeString([],
        { hour: 'numeric', minute: '2-digit', hour12: true });
}