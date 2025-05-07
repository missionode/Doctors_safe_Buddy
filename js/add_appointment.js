document.addEventListener('DOMContentLoaded', () => {
    const appointmentDateInput = document.getElementById('appointmentDate');
    const availableSlotsDiv = document.getElementById('availableSlots');
    const confirmButton = document.querySelector('button[type="submit"]');
    let selectedSlot = null;

    appointmentDateInput.addEventListener('change', loadAvailableSlots);
    availableSlotsDiv.addEventListener('click', selectSlot);
    confirmButton.addEventListener('click', confirmAppointment);

    function loadAvailableSlots() {
        const selectedDate = appointmentDateInput.value;
        if (!selectedDate) {
            availableSlotsDiv.innerHTML = '';
            return;
        }

        const date = new Date(selectedDate);
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayKey = days[date.getDay()];
        const availabilityData = JSON.parse(localStorage.getItem('doctorAvailability')) || {};
        const slotsForDay = availabilityData[dayKey] || [];

        availableSlotsDiv.innerHTML = '';
        if (slotsForDay.length > 0) {
            slotsForDay.forEach(slot => {
                const slotButton = document.createElement('button');
                slotButton.type = 'button';
                slotButton.textContent = `${formatTime(slot.start)} - ${formatTime(slot.end)}`;
                slotButton.dataset.startTime = slot.start;
                slotButton.dataset.endTime = slot.end;
                availableSlotsDiv.appendChild(slotButton);
            });
        } else {
            availableSlotsDiv.innerHTML = '<p>No available slots for this day.</p>';
        }
        // Disable confirm button when date changes
        confirmButton.disabled = true;
        selectedSlot = null;
    }

    function selectSlot(event) {
        if (event.target.tagName === 'BUTTON') {
            // Remove previous selection
            if (selectedSlot) {
                selectedSlot.classList.remove('selected');
            }
            selectedSlot = event.target;
            selectedSlot.classList.add('selected');
            confirmButton.disabled = false;
        }
    }

    function confirmAppointment() {
        if (selectedSlot) {
            const reason = document.getElementById('reason').value.trim();
            const appointmentDate = appointmentDateInput.value;
            const startTime = selectedSlot.dataset.startTime;
            const endTime = selectedSlot.dataset.endTime;
            //  Important:  Get the patient name.  This is just an example.
            //  Replace this with your actual method of getting the patient's name.
            const patientName = getPatientName();  

            if (reason && appointmentDate && startTime && endTime && patientName) {
                const appointmentDetails = {
                    reason: reason,
                    date: appointmentDate,
                    startTime: startTime,
                    endTime: endTime,
                    status: 'pending',
                    patientName: patientName
                };

                let appointments = JSON.parse(localStorage.getItem('patientAppointments')) || [];
                appointments.push(appointmentDetails);
                localStorage.setItem('patientAppointments', JSON.stringify(appointments));

                alert('Appointment booked successfully!');
                window.location.href = 'list_appointment_patient.html';
            } else {
                alert('Please select a reason and an available slot.');
            }
        } else {
            alert('Please select an available time slot.');
        }
    }

    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        return new Date(0, 0, 0, hours, minutes).toLocaleTimeString([],
            { hour: 'numeric', minute: '2-digit', hour12: true });
    }

    function getPatientName() {
        //  Replace this with your actual logic.
        //  2. If you store the patient's name in localStorage under the key 'userProfile':
        const userProfileString = localStorage.getItem('userProfile');
        if (userProfileString) {
            try {
                const userProfile = JSON.parse(userProfileString);
                if (userProfile && userProfile.name) {
                    return userProfile.name;
                } else {
                    console.error("Patient name not found in userProfile.");
                    return "Unknown Patient"; // Or handle the missing name as needed
                }
            } catch (error) {
                console.error("Error parsing userProfile from localStorage:", error);
                return "Unknown Patient"; // Or handle the error as needed
            }
        } else {
            console.error("userProfile not found in localStorage.");
            return "Unknown Patient"; // Or handle the missing profile as needed
        }
    }
});
