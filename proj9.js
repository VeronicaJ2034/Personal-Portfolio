// Function to get query string value
function getQueryStringParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

 // Check and style aboutImage only if it exists
 var aboutImage = document.getElementById('aboutImage');
 if (aboutImage) {
     aboutImage.style.border = '1px solid black';
     aboutImage.style.borderRadius = '60%';
     aboutImage.style.boxShadow = '0 0 10px rgb(0, 0, 0)';
 }

 // New York Image
 var NewYorkImage = document.getElementById('NewYorkImage');
 if (NewYorkImage) {
    NewYorkImage.style.border = '1px solid black';
    NewYorkImage.style.borderRadius = '60%';
    NewYorkImage.style.boxShadow = '0 0 10px rgb(0, 0, 0)';
 }

 //  Games Image
 var GamesImage = document.getElementById('GamesImage');
 if (GamesImage) {
    GamesImage.style.border = '1px solid black';
    GamesImage.style.borderRadius = '60%';
    GamesImage.style.boxShadow = '0 0 10px rgb(0, 0, 0)';
 }

// Function to get cookie value
function getCookie(name) {
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return "";
}

// Function to set a cookie with expiration
function setCookie(name, value, days) {
    let d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to delete a cookie
function deleteCookie(name) {
    setCookie(name, "", -1); // Setting expiration to past will delete the cookie
}

// Apply customization from query string or cookies
function applyCustomization() {
    let color = getQueryStringParam('bgColor') || getCookie('bgColor');
    
    // Apply customization if color is found
    if (color) {
        document.body.style.backgroundColor = color;
        console.log('Background color is set to ' + color);
    } else {
        console.log('No customization applied.');
    }

    // Only update the customization-status on about.html
    if (window.location.pathname.includes('about.html')) {
        const statusElement = document.getElementById('customization-status');
        if (statusElement) {
            if (color) {
                statusElement.textContent = 'Background color is set to ' + color;
            } else {
                statusElement.textContent = 'No customization applied.';
            }
        } else {
            console.warn("Customization status element not found.");
        }
    }
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const color = document.getElementById('bgColor').value;
    // Update URL with selected background color
    window.location.search = 'bgColor=' + color;
    // Save background color in cookies
    setCookie('bgColor', color, 7); // Cookie expires in 7 days
}

// Show the cookie notice if not accepted
function showCookieNotice() {
    const cookieNotice = document.getElementById('cookie-notice');
    const cookieConsent = getCookie('cookieConsent');

    // Check if the element exists before trying to access its style property
    if (cookieNotice) {
        if (!cookieConsent) {
            cookieNotice.style.display = 'block'; // Show the notice if not accepted
        } else {
            cookieNotice.style.display = 'none'; // Hide the notice if already accepted
        }
    } else {
        console.warn("Cookie notice element not found.");
    }
}

// Handle accepting cookies
function acceptCookies() {
    setCookie('cookieConsent', 'true', 365); // Set cookie consent for 1 year
    document.getElementById('cookie-notice').style.display = 'none'; // Hide the notice
    console.log('Cookies accepted.');
}

// Clear customization (reset background and delete cookies)
function clearCustomization() {
    // Reset background color to default (white)
    document.body.style.backgroundColor = '#ffffff';
    
    // Clear cookies related to customization
    deleteCookie('bgColor');
    deleteCookie('cookieConsent');
    
    // Reset the query string by removing the bgColor parameter
    window.history.pushState({}, document.title, window.location.pathname);
    
    // Update the status text on about.html
    if (window.location.pathname.includes('about.html')) {
        document.getElementById('customization-status').textContent = 'Customization cleared. No background color set.';
    }
    console.log('Customization cleared. No background color set.');
}

// Wait for the DOM to load before running applyCustomization and cookie handling
document.addEventListener('DOMContentLoaded', function() {
    applyCustomization();
    showCookieNotice();

    if (window.location.pathname.includes('about.html')) {
        const form = document.getElementById('customization-form');
        form.addEventListener('submit', handleFormSubmit);
   

        const acceptButton = document.getElementById('accept-cookies');
        acceptButton.addEventListener('click', acceptCookies)

        const clearButton = document.getElementById('clear-btn');
        clearButton.addEventListener('click', clearCustomization);
    }
});
