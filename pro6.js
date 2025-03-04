document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");

    const form = document.getElementById('infoForm');

    // Check if form is found in the document
    if (!form) {
        console.error("Form not found in the document.");
        return;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        // Clear previous error messages
        clearErrors();

        try {
            let isValid = true;

            // Get the values from form fields
            const fullname = form.fullname.value.trim();
            const username = form.username.value.trim();
            const email = form.email.value.trim();
            const password = form.password.value.trim();
            const confirmPassword = form.confirmPassword.value.trim();
            const phone = form.phone.value.trim();
            const dob = form.dob.value.trim();
            const agreeToTerms = form.agreeToTerms.checked;

            // Validate Full Name
            if (!fullname || /[^a-zA-Z\s]/.test(fullname)) {
                showError('fullnameError', "Full Name must be a non-empty string with only letters and spaces.");
                isValid = false;
            }

            // Validate Username
            const usernamePattern = /^[A-Za-z][A-Za-z0-9]{5,14}$/;
            if (!username || !usernamePattern.test(username)) {
                showError('usernameError', "Username must be between 6-15 characters and start with a letter.");
                isValid = false;
            }

            // Validate Email
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!email || !emailPattern.test(email)) {
                showError('emailError', "Please enter a valid email address.");
                isValid = false;
            }

            // Validate Password
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;
            if (!password || !passwordPattern.test(password)) {
                showError('passwordError', "Password must be between 8-20 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
                isValid = false;
            }

            // Validate Confirm Password
            if (password !== confirmPassword) {
                showError('confirmPasswordError', "Passwords must match.");
                isValid = false;
            }

            // Validate Phone Number (valid phone format)
            const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
            if (!phone || !phonePattern.test(phone)) {
                showError('phoneError', "Phone number must be in the format: 123-456-7890.");
                isValid = false;
            }

            // Validate Date of Birth (must be 18 or older)
            const birthDate = new Date(dob);
            const age = calculateAge(birthDate);
            if (age < 18) {
                showError('dobError', "You must be at least 18 years old.");
                isValid = false;
            }

            // Validate Agree to Terms
            if (!agreeToTerms) {
                showError('termsError', "You must agree to the terms and conditions.");
                isValid = false;
            }

            // If all validations passed, submit the form (you can remove the next line for real submission)
            if (isValid) {
                console.log("Form is valid and ready to submit.");
            } else {
                console.warn("Form has validation errors. Please fix them.");
            }
        } catch (error) {
            console.error("An error occurred during form validation: ", error);
        } finally {
            // This block will always execute, regardless of success or failure
            console.log("Form validation process completed.");
        }
    });

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearErrors() {
        document.getElementById('fullnameError').textContent = '';
        document.getElementById('usernameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('passwordError').textContent = '';
        document.getElementById('confirmPasswordError').textContent = '';
        document.getElementById('phoneError').textContent = '';
        document.getElementById('dobError').textContent = '';
        document.getElementById('termsError').textContent = '';
    }
    

    function calculateAge(birthDate) {
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }
        return age;
    }
});
