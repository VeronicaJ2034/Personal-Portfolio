console.log("JavaScript file loaded successfully"); // Test to make sure the file is loaded

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed"); // Test log to verify DOMContentLoaded event

    // Get the form and result div elements
    const form = document.getElementById('ageForm');
    const resultDiv = document.getElementById('result');

    // Check if form and resultDiv are found in the document
    if (!form || !resultDiv) {
        console.error("Form or result div not found in the document.");
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        console.log("Form submitted"); // Logs that the form was submitted

        // Get the values from the form inputs
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;

        // Validate that firstname and lastname do not contain numbers
        const namePattern = /^[A-Za-z]+$/;
        if (!namePattern.test(firstname) || !namePattern.test(lastname)) {
            console.error("Invalid input: Name contains numbers or special characters");
            resultDiv.textContent = "Please enter a valid name without numbers or special characters.";
            return;
        }

        // Validate that age is a number, not empty, and within a reasonable range
        if (!firstname || !lastname || !email || !age || isNaN(age) || age <= 0) {
            console.error("Invalid input: Name, email, or age is empty or not a positive number");
            resultDiv.textContent = "Please enter a valid name, email, and age.";
            return;
        }

        // Clear any previous error messages
        resultDiv.textContent = "";

        // Stores age in months
        const ageInMonths = calculateAgeInMonths(age);

        // Logs user's input and calculated age
        console.log(`User's input: Name - ${firstname}, ${lastname}, Age - ${age}`);
        console.log(`Calculated age in months: ${ageInMonths}`);

        // Display the result with the greeting message
        const message = greetUser(firstname);
        resultDiv.textContent = `${message} You are ${ageInMonths} months old.`;
    });

    // Function to calculate age in months
    function calculateAgeInMonths(age) {
        return age * 12;
    }

    // Function to greet user
    function greetUser(firstname) {
        return `Hello, ${firstname}! I can't wait to get in touch with you!`;
    }
});
