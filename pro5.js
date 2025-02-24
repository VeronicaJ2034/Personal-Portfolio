document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");
    
        // Check and dynamically create the projectImage only if the section exists
        var projectSection = document.getElementById('projectSection'); // Ensure this div exists in your HTML
        if (projectSection) {
            var newImage = document.createElement('img'); // Create a new <img> element for projectImage
            newImage.src = 'project_image.png'; // Path to your project image
            newImage.alt = 'Project Image';
            newImage.style.width = '300px'; // Set the width
            newImage.style.border = '5px solid goldenrod'; // Add a stylish border
            newImage.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)'; // Stronger shadow effect
            newImage.style.borderRadius = '10px'; // Rounded edges
            newImage.style.margin = '20px auto'; // Centering the image
    
            // Append the image to the projectSection div
            projectSection.appendChild(newImage);
    
            // Adding hover effects to the project image
            newImage.addEventListener('mouseover', function() {
                newImage.style.transform = 'scale(1.1)';
                newImage.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.8)';
            });
    
            newImage.addEventListener('mouseout', function() {
                newImage.style.transform = 'scale(1)';
                newImage.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
            });
        }
    
        // Check and style profileImage only if it exists
        var profileImage = document.getElementById('profileImage');
        if (profileImage) {
            profileImage.style.border = '5px solid black';
            profileImage.style.borderRadius = '50%';
            profileImage.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        }
    
        // Check and style aboutImage only if it exists
        var aboutImage = document.getElementById('aboutImage');
        if (aboutImage) {
            aboutImage.style.border = '1px solid black';
            aboutImage.style.borderRadius = '60%';
            aboutImage.style.boxShadow = '0 0 10px rgb(0, 0, 0)';
        }
    
        // Check and style projectImage only if it exists
        var projectImage = document.getElementById('projectImage');
        if (projectImage) {
            projectImage.style.border = '6px solid goldenrod';
            projectImage.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.8)';
            projectImage.style.borderRadius = '15px';
            projectImage.style.transition = 'all 0.3s ease-in-out';
    
            // Hover effect for projectImage
            projectImage.addEventListener('mouseover', function() {
                projectImage.style.transform = 'scale(1.1)';
                projectImage.style.boxShadow = '0 0 40px rgba(255, 215, 0, 1)';
            });
    
            projectImage.addEventListener('mouseout', function() {
                projectImage.style.transform = 'scale(1)';
                projectImage.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.8)';
            });
        }
    
        // Check and update the date only if the element exists
        var dateElement = document.getElementById('currentDate');
        if (dateElement) {
            dateElement.textContent = "Today's date is: " + new Date().toDateString();
        }
    
        // Show alert box only if button and alert exist
        var alertButton = document.getElementById('alertButton');
        var customAlert = document.getElementById('customAlert');
        if (alertButton && customAlert) {
            alertButton.addEventListener('click', function() {
                customAlert.style.display = 'block';
            });
        }
    
        // Close alert box only if close button and alert exist
        var closeAlert = document.getElementById('closeAlert');
        if (closeAlert && customAlert) {
            closeAlert.addEventListener('click', function() {
                customAlert.style.display = 'none';
            });
        }
    });
    


    // Slideshow logic
    var slideshowImages = [
        "searchlight_consulting.jpg",
        "twr_360.jpg",
        "twr_logo.jpg"
    ];

    var currentImageIndex = 0;

    // Get the slideshow image element
    var slideshowImage = document.getElementById('slideshowImage');
    if (slideshowImage) {
        slideshowImage.src = slideshowImages[currentImageIndex]; // Set the first image
    }

    // Get previous and next buttons
    var prevButton = document.getElementById('prevButton');
    var nextButton = document.getElementById('nextButton');

    // Update the slideshow image
    function updateSlideshow() {
        if (slideshowImage) {
            slideshowImage.src = slideshowImages[currentImageIndex];
        }
    }

    // Event listener for the previous button
    if (prevButton) {
        prevButton.addEventListener('click', function () {
            currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : slideshowImages.length - 1;
            updateSlideshow();
        });
    }

    // Event listener for the next button
    if (nextButton) {
        nextButton.addEventListener('click', function () {
            currentImageIndex = (currentImageIndex < slideshowImages.length - 1) ? currentImageIndex + 1 : 0;
            updateSlideshow();
        });
    }

    // Overlay functionality
    var overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.display = 'none';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'none';

    //Applies createElement
    var overlayImage = document.createElement('img');
    overlayImage.id = 'overlayImage';
    overlayImage.style.position = 'absolute';
    overlayImage.style.top = '50%';
    overlayImage.style.left = '50%';
    overlayImage.style.transform = 'translate(-50%, -50%)';
    overlayImage.style.maxWidth = '100%';
    overlayImage.style.maxHeight = '100%';
    overlayImage.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.5)';

    //Applies appendChild to overlay and overlayImage
    overlay.appendChild(overlayImage);
    document.body.appendChild(overlay);

    // Function to open overlay with the selected image
    function openOverlay(imageSrc) {
        overlay.style.display = 'block';
        overlayImage.src = imageSrc;
    }

    // Function to close the overlay
    overlay.addEventListener('click', function () {
        overlay.style.display = 'none';
    });

    // Make the slideshow image clickable to trigger the overlay
    if (slideshowImage) {
        slideshowImage.addEventListener('click', function () {
            openOverlay(slideshowImage.src);
        });
    };
