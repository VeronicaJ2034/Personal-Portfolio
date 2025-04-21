// jQuery code to hide the element with id "demo" when the button with id "hideBtn" is clicked
$(document).ready(function() {
    $("#hideBtn").click(function() {
      $("#demo").hide();
    });
  });

// jQuery - Image fades out when the button is clicked
$(document).ready(function() {
    $("#fadeBtn").click(function() {
      $("#fruitChart").fadeOut();
    });
  });

// jQuery - Image fades in when the button is clicked
$(document).ready(function() {
    $("#fadeInBtn").click(function() {
      $("#fruitChart").fadeIn();
    });
  });

// Suggestions appear as it matches with the input
  $(document).ready(function() {
    const fruits = ["Apple", "Banana", "Cherry", "Date", "Grapes", "Mango", "Orange"]; //limited list of fruits
  
    $("#search").on("input", function() {
      let query = $(this).val().toLowerCase();
      let matches = fruits.filter(fruit => fruit.toLowerCase().includes(query));
  
      let suggestionsHtml = matches.map(fruit => `<li>${fruit}</li>`).join(""); //shows matched fruits
      $("#suggestions").html(suggestionsHtml);
    });
  });
  