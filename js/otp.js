// js/otp.js
document.addEventListener('DOMContentLoaded', () => {
    const otpForm = document.getElementById('otpForm');

    otpForm.addEventListener('submit', handleOtpConfirmation);

    function handleOtpConfirmation(event) {
        event.preventDefault();

        const otpInput = document.getElementById('otp');
        const enteredOtp = otpInput.value.trim();

        // Since it's a free pass, we'll just check if the input is not empty
        if (enteredOtp !== '') {
            // Redirect to the landing page
            window.location.href = 'landing_patient.html';
        } else {
            alert('Please enter the OTP.');
        }
    }
});