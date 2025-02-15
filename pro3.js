// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed"); // Test log to verify DOMContentLoaded event
    
    const dailyMessages = [
        "Happy Weekend!",           // Sunday (0)
        "Let's start the week strong!", // Monday (1)
        "Keep pushing forward!",    // Tuesday (2)
        "Keep pushing forward!",    // Wednesday (3)
        "Keep pushing forward!",    // Thursday (4)
        "Keep pushing forward!",    // Friday (5)
        "Happy Weekend!"            // Saturday (6)
    ];

    // Get the current day
    const day = new Date().getDay();
    const message = dailyMessages[day];

    // Show message in the div
    const dailyMessageDiv = document.getElementById("daily-message");
    if (dailyMessageDiv) {
        dailyMessageDiv.textContent = message;
    } else {
        console.error("Element with ID 'daily-message' not found.");
    }

    // Variables for fun fact and encouraging message
    let newmessage = "";
    let funFact = "";

    // Using a switch statement to set the message and a fun fact
    switch (day) {
        case 0: // Sunday
            newmessage = "Relax and recharge. It's Sunday!";
            funFact = "Did you know? I played volleyball for six years!";
            break;
        case 1: // Monday
            newmessage = "New week, new goals. Let's get started!";
            funFact = "Did you know? I can play the flute!";
            break;
        case 2: // Tuesday
            newmessage = "Keep the momentum going!";
            funFact = "Did you know? I went to University of Oregon to participate in Nike's Outdoor Nationals!";
            break;
        case 3: // Wednesday
            newmessage = "You're halfway there! Stay strong!";
            funFact = "Did you know? I got a 100% on my first NYSSMA solo playing the flute in 5th grade!";
            break;
        case 4: // Thursday
            newmessage = "Almost at the finish line!";
            funFact = "Did you know? I will be interning at Trans World Radio (TWR) this summer!";
            break;
        case 5: // Friday
            newmessage = "Finish strong and enjoy the weekend!";
            funFact = "Did you know? My sister Kayla will be graduating this June!";
            break;
        case 6: // Saturday
            newmessage = "Have fun and relax. It's Saturday!";
            funFact = "Did you know? My sister Sabrina loves the show Stranger Things!";
            break;
        default:
            newmessage = "Have an amazing day!";
            funFact = "Did you know? I am from New York!";
    }

    // Show the message and fun fact in the correct divs
    const funFactDiv = document.getElementById("fun-fact");
    if (funFactDiv) {
        funFactDiv.innerHTML = `${newmessage}<br>${funFact}`;
    } else {
        console.error("Element with ID 'fun-fact' not found.");
    }

    // Countdown output (greetings)
    const messages = ["Hey there!", "Nice to meet you!", "Welcome to my portfolio!", "Enjoy your stay!"];
    const welcomeDiv = document.getElementById("greetings");

    if (welcomeDiv) {
        welcomeDiv.textContent = "Greeting Messages: ";

        for (let i = 0; i < messages.length; i++) {
            setTimeout(() => {
                let newElement = document.createElement("p");
                newElement.textContent = messages[i]; // Display each message in order
                welcomeDiv.appendChild(newElement);
            }, (i + 1) * 1000); // Delay increases by 1 second per iteration
        }
    } else {
        console.error("Element with ID 'greetings' not found.");
    }
});
