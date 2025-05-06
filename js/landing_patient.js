// js/landing_patient.js

// Hamburger Menu functionality
function toggleMenu() {
    const menuItems = document.querySelector('.menu-items');
    menuItems.style.display = menuItems.style.display === 'flex' ? 'none' : 'flex';
}

// Feature Carousel functionality
let featureSlideIndex = 0; // Declare featureSlideIndex once here
const featureSlides = document.querySelectorAll('.carousel-slide');
const featureDots = document.querySelectorAll('.carousel-dots .dot');

function showFeatureSlide(n) {
    featureSlides.forEach(slide => slide.classList.remove('active'));
    featureDots.forEach(dot => dot.classList.remove('active'));
    featureSlideIndex = (n + featureSlides.length) % featureSlides.length;
    featureSlides[featureSlideIndex].classList.add('active');
    featureDots[featureSlideIndex].classList.add('active');
}

function nextFeatureSlide() {
    showFeatureSlide(featureSlideIndex + 1);
}

function prevFeatureSlide() {
    showFeatureSlide(featureSlideIndex - 1);
}

function currentFeatureSlide(n) {
    showFeatureSlide(n);
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

document.addEventListener('DOMContentLoaded', () => {
    showFeatureSlide(featureSlideIndex); // Show the initial slide
    displayAppointmentHistory(); // Call the function to display appointments
});
