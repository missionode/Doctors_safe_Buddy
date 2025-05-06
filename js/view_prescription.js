// js/view_prescription.js
document.addEventListener('DOMContentLoaded', () => {
    loadPrescription();
});

function getAppointmentId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function loadPrescription() {
    const appointmentIndex = getAppointmentId();

    if (appointmentIndex !== null) {
        const appointmentsData = localStorage.getItem('patientAppointments');
        if (appointmentsData) {
            const appointments = JSON.parse(appointmentsData);
            if (appointments[appointmentIndex] && appointments[appointmentIndex].prescription) {
                const prescription = appointments[appointmentIndex].prescription;
                document.getElementById('observations').textContent = prescription.observations || 'No observations provided.';

                const medicationsList = document.getElementById('medications-list');
                const noMedicationsMessage = document.getElementById('no-medications');
                medicationsList.innerHTML = ''; // Clear previous list

                if (prescription.medications && prescription.medications.length > 0) {
                    prescription.medications.forEach(medication => {
                        const listItem = document.createElement('li');
                        listItem.textContent = medication;
                        medicationsList.appendChild(listItem);
                    });
                    noMedicationsMessage.style.display = 'none';
                } else {
                    noMedicationsMessage.style.display = 'block';
                }
            } else {
                alert('Prescription not found for this appointment.');
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