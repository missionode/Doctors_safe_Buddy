// js/edit_schedule_doctor.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed (no default schedule)');
    initializeDoctorScheduleEdit();
});

function initializeDoctorScheduleEdit() {
    checkDoctorLogin();
    loadAvailabilityForEdit();

    const availabilityForm = document.getElementById('availabilityForm');
    if (availabilityForm) {
        availabilityForm.addEventListener('submit', saveAvailability);
    } else {
        console.error('Could not find the availabilityForm element (no default schedule).');
    }
}

function checkDoctorLogin() {
    if (!localStorage.getItem('isDoctorLoggedIn')) {
        window.location.href = 'login_doctor.html';
    }
}

function loadAvailabilityForEdit() {
    const storedAvailability = localStorage.getItem('doctorAvailability');
    const availabilityData = storedAvailability ? JSON.parse(storedAvailability) : {
        Mon: [],
        Tue: [],
        Wed: [],
        Thu: [],
        Fri: [],
        Sat: [],
        Sun: []
    };

    const dayKeys = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    dayKeys.forEach(dayKey => {
        const lowerDayKey = dayKey.toLowerCase();
        const slotsContainerId = `${lowerDayKey}-slots`;
        const slotsContainer = document.getElementById(slotsContainerId);
console.log("slotsContainer", slotsContainer)
        if (!slotsContainer) {
            console.error(`Could not find element with ID: ${slotsContainerId} (no default schedule)`);
            return; // Skip to the next day if container is not found
        }

        slotsContainer.innerHTML = ''; // Ensure it's empty initially
        const slots = availabilityData[dayKey] || [];
        slots.forEach(slot => { // Now load existing slots if any
            addSlot(lowerDayKey, slotsContainer, slot.start, slot.end);
        });
    });
}

function addSlot(day, container, startTime = '09:00', endTime = '10:00') {
    if (!container) {
        const slotsContainer = document.getElementById(`${day}-slots`);
        if (!slotsContainer) {
            console.error(`Could not find container with ID: ${day}-slots in addSlot (no default schedule)`);
            return;
        }
        container = slotsContainer;
    }
    const newSlot = document.createElement('div');
    newSlot.classList.add('time-slot');
    newSlot.innerHTML = `
        <input type="time" class="start-time" value="${startTime}"> -
        <input type="time" class="end-time" value="${endTime}">
        <button type="button" class="remove-slot" onclick="removeSlot(this)">Remove</button>
    `;
    container.appendChild(newSlot);
}

function removeSlot(button) {
    const slotDiv = button.parentNode;
    if (slotDiv && slotDiv.parentNode) {
        slotDiv.parentNode.removeChild(slotDiv);
    } else {
        console.error('Could not remove slot: parent element not found (no default schedule).');
    }
}

function saveAvailability(event) {
    event.preventDefault();

    const availability = {};
    const daysLower = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayKeysUpper = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    daysLower.forEach((lowerDay, index) => {
        const slotsContainer = document.getElementById(`${lowerDay}-slots`);
        const slots = [];
        if (slotsContainer) {
            for (let i = 0; i < slotsContainer.children.length; i++) {
                const slotDiv = slotsContainer.children[i];
                const startTimeInput = slotDiv.querySelector('.start-time');
                const endTimeInput = slotDiv.querySelector('.end-time');
                if (startTimeInput && endTimeInput && startTimeInput.value && endTimeInput.value) {
                    slots.push({ start: startTimeInput.value, end: endTimeInput.value });
                }
            }
            availability[dayKeysUpper[index]] = slots;
        } else {
            console.error(`Could not find container with ID: ${lowerDay}-slots in saveAvailability (no default schedule)`);
        }
    });

    localStorage.setItem('doctorAvailability', JSON.stringify(availability));
    alert('Availability saved successfully!');
    window.location.href = 'schedule_doctor.html';
}