// === Image styling ===
function styleImageById(id) {
    const img = document.getElementById(id);
    if (img) {
        img.style.border = '1px solid black';
        img.style.borderRadius = '60%';
        img.style.boxShadow = '0 0 10px rgb(0, 0, 0)';
    }
}

styleImageById('aboutImage');
styleImageById('NewYorkImage');
styleImageById('GamesImage');

// === Cookie Functions ===
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

function setCookie(name, value, days) {
    let d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function deleteCookie(name) {
    setCookie(name, "", -1);
}

// === Cookie Notice Handling ===
function showCookieNotice() {
    const cookieNotice = document.getElementById('cookie-notice');
    const cookieConsent = getCookie('cookieConsent');
    console.log('Cookie consent status:', cookieConsent);

    if (cookieNotice) {
        if (!cookieConsent) {
            cookieNotice.style.display = 'block';
            console.log('Cookie notice displayed.');
        } else {
            cookieNotice.style.display = 'none';
            console.log('Cookie notice already accepted.');
        }
    }
}

function acceptCookies() {
    setCookie('cookieConsent', 'true', 365);
    const notice = document.getElementById('cookie-notice');
    if (notice) {
        notice.style.display = 'none';
        console.log('Cookies accepted and notice hidden.');
    }
}

// === DOM Ready Setup ===
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');
    showCookieNotice();

    const acceptButton = document.getElementById('accept-cookies');
    if (acceptButton) {
        acceptButton.addEventListener('click', acceptCookies);
    }
});