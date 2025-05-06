// js/appointment_details_doctor.js
document.addEventListener('DOMContentLoaded', () => {
    checkDoctorLogin();
    loadAppointmentDetails();
});

function checkDoctorLogin() {
    if (!localStorage.getItem('isDoctorLoggedIn')) {
        window.location.href = 'login_doctor.html';
    }
}

function getAppointmentId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function loadAppointmentDetails() {
    const appointmentIndex = getAppointmentId();

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

                const completeButton = document.getElementById('complete-button');
                const addPrescriptionButton = document.getElementById('add-prescription-button');

                if (appointment.status === 'completed') {
                    completeButton.style.display = 'none';
                    addPrescriptionButton.style.display = 'block';
                    if (appointment.prescription) {
                        document.getElementById('add-prescription-button').textContent = 'View/Edit Prescription';
                    } else {
                        document.getElementById('add-prescription-button').textContent = 'Add Prescription';
                    }
                } else {
                    completeButton.style.display = 'block';
                    addPrescriptionButton.style.display = 'none';
                }
            } else {
                alert('Appointment not found.');
                window.location.href = 'landing_doctor.html';
            }
        } else {
            alert('No appointments data found.');
            window.location.href = 'landing_doctor.html';
        }
    } else {
        alert('Invalid appointment ID.');
        window.location.href = 'landing_doctor.html';
    }
}

function markAsCompleted() {
    const appointmentIndex = getAppointmentId();
    if (appointmentIndex !== null) {
        const appointmentsData = localStorage.getItem('patientAppointments');
        if (appointmentsData) {
            const appointments = JSON.parse(appointmentsData);
            if (appointments[appointmentIndex]) {
                appointments[appointmentIndex].status = 'completed';
                localStorage.setItem('patientAppointments', JSON.stringify(appointments));
                loadAppointmentDetails(); // Reload to update UI
            }
        }
    }
}

function openPrescriptionForm() {
    document.getElementById('prescription-form').style.display = 'block';
    // Load existing prescription data if available
    const appointmentIndex = getAppointmentId();
    const appointmentsData = localStorage.getItem('patientAppointments');
    if (appointmentsData) {
        const appointments = JSON.parse(appointmentsData);
        if (appointments[appointmentIndex] && appointments[appointmentIndex].prescription) {
            const prescription = appointments[appointmentIndex].prescription;
            document.getElementById('observations').value = prescription.observations || '';
            // Populate medication fields (we'll need to handle dynamic fields here if needed)
            const medicationInputsDiv = document.getElementById('medication-inputs');
            medicationInputsDiv.innerHTML = ''; // Clear existing
            if (prescription.medications && prescription.medications.length > 0) {
                prescription.medications.forEach(med => {
                    addMedicationField(med);
                });
            } else {
                addMedicationField(); // Add at least one empty field
            }
        } else {
            // Add one empty medication field if no prescription exists
            const medicationInputsDiv = document.getElementById('medication-inputs');
            medicationInputsDiv.innerHTML = '';
            addMedicationField();
        }
    }
}

function closePrescriptionForm() {
    document.getElementById('prescription-form').style.display = 'none';
}

function addMedicationField(medication = '') {
    const medicationInputsDiv = document.getElementById('medication-inputs');
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.classList.add('medication-input');
    newInput.placeholder = 'Medication';
    newInput.value = medication;
    medicationInputsDiv.appendChild(newInput);
}

function savePrescription() {
    const appointmentIndex = getAppointmentId();
    if (appointmentIndex !== null) {
        const appointmentsData = localStorage.getItem('patientAppointments');
        if (appointmentsData) {
            const appointments = JSON.parse(appointmentsData);
            if (appointments[appointmentIndex]) {
                const observations = document.getElementById('observations').value.trim();
                const medicationInputs = document.querySelectorAll('#medication-inputs input');
                const medications = Array.from(medicationInputs)
                    .map(input => input.value.trim())
                    .filter(value => value !== '');

                appointments[appointmentIndex].prescription = {
                    observations: observations,
                    medications: medications
                };
                localStorage.setItem('patientAppointments', JSON.stringify(appointments));
                alert('Prescription saved.');
                closePrescriptionForm();
                loadAppointmentDetails(); // Update button text
            }
        }
    }
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    return new Date(0, 0, 0, hours, minutes).toLocaleTimeString([],
        { hour: 'numeric', minute: '2-digit', hour12: true });
}