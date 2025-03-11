document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");

    const form = document.getElementById('infoForm');

    // Check if form is found in the document
    if (!form) {
        console.error("Form not found in the document.");
        return;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent default form submission to handle it ourselves
        console.log("Form submitted!");  // Check if submit is fired

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

            // Validate Phone Number (no hyphens, parentheses required)
            const phonePattern = /^[0-9]{10}$/;  // Only allow digits
            if (!phone || !phonePattern.test(phone)) {
                showError('phoneError', "Phone number must be a 10-digit number.");
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

            // Validate Languages selection
            const selectedLanguagesArray = getSelectedLanguages();
            if (selectedLanguagesArray.length === 0) {
                showError('languagesError', "You must select at least one programming language.");
                isValid = false;
            }

            // Validate File Upload (only .txt files allowed)
            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];
            if (file && !file.name.endsWith('.txt')) {
                showError('fileError', "Only .txt files are allowed.");
                isValid = false;
            }

            // If all validations passed, show success message and reset the form
            if (isValid) {
                console.log("Form is valid and ready to submit.");
                
                // Show the success message
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.style.display = 'block';  // Show success message
                }

                // Optionally, you can reset the form here if you want:
                form.reset();  // Reset the form after successful submission
            } else {
                console.warn("Form has validation errors. Please fix them.");
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.style.display = 'none';  // Hide success message if validation fails
                }
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
        } else {
            console.error(`Error element with id "${elementId}" not found.`);
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
        document.getElementById('languagesError').textContent = '';
        document.getElementById('fileError').textContent = '';
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

    // Handle File Upload and display content in a separate div outside the form
    const fileInput = document.getElementById('fileInput');
    const fileContents = document.getElementById('fileContents');
    const fileDisplayArea = document.getElementById('fileDisplayArea');
    
    if (fileInput) {
        fileInput.addEventListener('change', function () {
            const file = fileInput.files[0]; // Get the first file selected
            if (file) {
                const reader = new FileReader(); // Create a FileReader instance
                
                reader.onload = function () {
                    // When file is loaded, set the contents to the fileContents div
                    const content = reader.result;
                    fileContents.textContent = content; // Display the file content
                    
                    // Show the file display area
                    fileDisplayArea.style.display = 'block';
                };

                reader.readAsText(file); // Read the file as plain text
            } else {
                fileContents.textContent = ''; // Clear previous content if no file is selected
                fileDisplayArea.style.display = 'none'; // Hide the file display area
            }
        });
    }

    // Function to display selected languages on the screen
    function displaySelectedLanguages() {
        const selectedLanguagesArray = getSelectedLanguages();
        const selectedLanguagesDiv = document.getElementById('selectedLanguages');
        if (selectedLanguagesArray.length > 0) {
            selectedLanguagesDiv.innerHTML = `You selected: ${selectedLanguagesArray.join(', ')}`;
        } else {
            selectedLanguagesDiv.innerHTML = 'No languages selected.';
        }
    }

    // Clear selected languages and display
    function clearLanguagesSelection() {
        const selectedLanguagesDiv = document.getElementById('selectedLanguages');
        selectedLanguagesDiv.innerHTML = 'No languages selected.';
    }

    // Add event listeners to language checkboxes
    const languageCheckboxes = document.querySelectorAll('input[name="languages"]');
    languageCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', displaySelectedLanguages);
    });

    // Function to get selected languages
    function getSelectedLanguages() {
        const selectedLanguagesArray = [];
        const checkboxes = document.querySelectorAll('input[name="languages"]:checked');
        checkboxes.forEach((checkbox) => selectedLanguagesArray.push(checkbox.value));
        return selectedLanguagesArray;
    }
});