document.addEventListener("DOMContentLoaded", function () {
    var accessKey = "gpZtG3t8VGt387WRdp19nRQp67A6OveJfVe5eChKWcE"; // Access key for Unsplash API
    var searchBtn = document.getElementById("search-btn");
    var xhrBtn = document.getElementById("xhr-btn");
    var searchTermInput = document.getElementById("search-term");
    var imageGrid = document.getElementById("image-grid");
    var errorMessage = document.getElementById("error-message");
  
    // Function to display images
    function displayImages(results) {
      imageGrid.innerHTML = ""; // Clear old images
      results.forEach(function (photo) {
        var img = document.createElement("img");
        img.src = photo.urls.small;
        img.alt = photo.alt_description || "Image";
        img.classList.add("result-img");
        imageGrid.appendChild(img);
      });
    }
  
    // Function to handle UI errors
    function showError(message) {
      errorMessage.textContent = message;
    }
  
    // Fetch method
    // It is simpler and more modern than XMLHttpRequest
    // It uses promises to handle asynchronous operations
    // It is more readable and easier to work with than XMLHttpRequest
    searchBtn.addEventListener("click", function () {
      var query = searchTermInput.value.trim();
      if (query !== "") {
        errorMessage.textContent = ""; // Clear any old errors
  
        // The fetch API is used to make the request
        fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${accessKey}`)
          .then(function (res) {
            if (!res.ok) {
              throw new Error("Failed to fetch images");
            }
            return res.json();
          })
          .then(function (data) {
            if (data.results.length === 0) {
              showError("No images found for that search.");
            } else {
              displayImages(data.results);
            }
          })
          .catch(function (err) {
            console.error("Fetch error:", err);
            showError("Error fetching images. Please try again.");
          });
      } else {
        showError("Please enter a search term.");
      }
    });
  
    // XMLHttpRequest method
    // An older way to make HTTP requests 
    // Uses callback functions to handle the response instead of promises
    // It is less readable and more complex than the fetch API
    xhrBtn.addEventListener("click", function () {
      var query = searchTermInput.value.trim();
      errorMessage.textContent = ""; // Clear errors
  
      // Create a new XMLHttpRequest object for making the request
      var xhr = new XMLHttpRequest();
      var url = `https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${accessKey}`;
      
      // Check if the input is empty
      xhr.open("GET", url);
      xhr.onload = function () {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          if (data.results.length === 0) {
            showError("No images found for that search.");
          } else {
            displayImages(data.results);
          }
        } else {
          console.error("XHR error:", xhr.status, xhr.statusText);
          showError("Error with the request. Please try again.");
        }
      };
      // Handle network errors
      xhr.onerror = function () {
        console.error("Network error during XHR request");
        showError("Network error. Please check your connection.");
      };
      xhr.send();
    });
});