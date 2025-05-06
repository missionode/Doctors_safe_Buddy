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

    //  This is a placeholder function.  You MUST replace this with your 
    //  actual method of getting the patient's name.  This could involve
    //  reading it from a hidden form field,  retrieving it from a
    //  session variable,  or looking it up from a database.
    function getPatientName() {
        //  Replace this with your actual logic.  For example:
        //  1. If you have a hidden input field in your form:
        //     return document.getElementById('patientName').value;
        //  2. If you store the patient's name in localStorage during login:
        //     return localStorage.getItem('loggedInPatientName');
        //  3. If you have it in a server-side session (you'd need to 
        //     make an AJAX request):
        //     //  Example (requires you to set up a server endpoint):
        //     let xhr = new XMLHttpRequest();
        //     xhr.open('GET', '/api/getPatientName', false); //  `false` for synchronous
        //     xhr.send();
        //     if (xhr.status === 200) {
        //        return JSON.parse(xhr.responseText).name;
        //     } else {
        //        console.error('Failed to get patient name');
        //        return 'Unknown Patient'; //  Fallback
        //     }
        return "John Doe";  //  Placeholder
    }
});
