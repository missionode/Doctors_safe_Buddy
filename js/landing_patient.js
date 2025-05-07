// js/landing_patient.js

// Hamburger Menu functionality
function toggleMenu() {
    const menuItems = document.querySelector('.menu-items');
    menuItems.style.display = menuItems.style.display === 'flex' ? 'none' : 'flex';
}


function displayAppointmentHistory() {
    const appointmentGrid = document.querySelector('.appointment-grid');
    if (!appointmentGrid) {
        console.error("Could not find the '.appointment-grid' container.");
        return;
    }

    const storedAppointments = localStorage.getItem('patientAppointments');
    if (storedAppointments) {
        const appointments = JSON.parse(storedAppointments);

        if (appointments.length > 0) {
            appointmentGrid.innerHTML = ''; // Clear the hardcoded content
            appointments.forEach(appointment => {
                const appointmentCard = document.createElement('div');
                appointmentCard.classList.add('card', 'appointment-card');
                appointmentCard.innerHTML = `
                    <h3>Appointment Details</h3>
                    <p>Date: ${appointment.date}</p>
                    <p>Time: ${appointment.startTime} - ${appointment.endTime}</p>
                    <p>Reason: ${appointment.reason}</p>
                    <p>Status: ${appointment.status}</p>
                    <button onclick="window.location.href='appointment_view_patient.html'">View Details</button>
                `;
                appointmentGrid.appendChild(appointmentCard);
            });
        } else {
            appointmentGrid.innerHTML = '<p>No appointments booked yet.</p>';
        }
    } else {
        appointmentGrid.innerHTML = '<p>No appointments booked yet.</p>';
    }
}


// JavaScript - appointment_history.js
document.addEventListener('DOMContentLoaded', () => {

    if (!customElements.get('appointment-history-header')) {
        class AppointmentHistoryHeader extends HTMLElement {
            connectedCallback() {
                this.innerHTML = `<header class="appointment-history-header">
                    <h2>Appointment History</h2>
                    <p>View your past and upcoming appointments.</p>
                </header>`;
            }
        }
        customElements.define('appointment-history-header', AppointmentHistoryHeader);
    }

    if (!customElements.get('appointment-history-list')) {
        class AppointmentHistoryList extends HTMLElement {
            connectedCallback() {
                this.innerHTML = `<ul class="appointment-list"></ul>`;
                this.renderAppointments();
            }

            renderAppointments() {
                const appointmentList = this.querySelector('.appointment-list');
                const appointments = this.getAppointments();

                if (appointments.length === 0) {
                    appointmentList.innerHTML = `<p>No appointments found.</p>`;
                    return;
                }

                const appointmentItems = appointments.map(appointment => {
                    let prescriptionHTML = '';
                    if (appointment.prescription) {
                        prescriptionHTML = `
                            <div class="appointment-item__prescription">
                                <span class="appointment-item__prescription-title">Prescription:</span>
                                <p>Observations: ${appointment.prescription.observations}</p>
                                <p>Medications:</p>
                                <ul class="appointment-item__medications">
                                ${appointment.prescription.medications.map(med => `<li>${med}</li>`).join('')}
                                </ul>
                            </div>
                        `;
                    }

                    return `<li class="appointment-item">
                        <span class="appointment-item__date">Date: ${appointment.date}</span>
                        <span class="appointment-item__details">Time: ${appointment.startTime} - ${appointment.endTime}</span>
                        <span class="appointment-item__details">Reason: ${appointment.reason}</span>
                        <span class="appointment-item__details">Patient: ${appointment.patientName || 'N/A'}</span>
                        <span class="appointment-item__status">Status: ${appointment.status}</span>
                        ${prescriptionHTML}
                    </li>`;
                }).join('');

                appointmentList.innerHTML = appointmentItems;
            }

            getAppointments() {
                //  Fetch the data from local storage
                const storedAppointments = localStorage.getItem('patientAppointments');
                if (storedAppointments) {
                    try {
                        return JSON.parse(storedAppointments);
                    } catch (error) {
                        console.error('Error parsing patientAppointments from localStorage:', error);
                        return []; // Return an empty array in case of an error to avoid crashing
                    }
                }
                return []; // Return empty array if patientAppointments does not exist
            }
        }
        customElements.define('appointment-history-list', AppointmentHistoryList);
    }
});
