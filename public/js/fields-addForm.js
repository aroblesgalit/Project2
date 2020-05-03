$(document).ready(function() {
  // Target the form
  var addForm = $("#addField");
  // Get reference to our form input
  var titleField = $("#form-title");

  // Get list of fields
  var fieldsList = [];
  // Render fields select
  getFields();
  // Function to render fields select
  function getFields() {
    // Make a get request to /apifields
    $.get("/api/fields")
      .then(function(data) {
        // Expecting data to be an array of "fields" as objects
        // Loop through array and push the titles of each field into the fieldsList empty array
        for (var i = 0; i < data.length; i++) {
          fieldsList.push(data[i].title);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  // Add a submit event listener to the form
  addForm.on("submit", function(event) {
    event.preventDefault();
    // Get user input for the title
    var titleInput = titleField.val().trim();
    // If the title already exists in our list, then alert user and return
    if (fieldsList.indexOf(titleInput) > -1) {
      alert("Field already exists.");
      return;
    }

    // Otherwise add the field
    addField(titleInput);
  });

  // Function to add a field given the title input
  function addField(title) {
    // Make a post request to /api/fields route
    $.post("/api/fields", {
      title: title
    })
      // Then redirect user to the fields page if successful
      .then(function() {
        window.location.replace("/fields");
      })
      // If there's an error, handle it by logging the error to the console
      .catch(function(err) {
        console.log(err);
      });
  }

  // Lisent to a click event on the cancel button
  $("#cancelFieldButton").click(function() {
    // Redirect user to the fields page
    window.location.replace("/fields");
  });
});
