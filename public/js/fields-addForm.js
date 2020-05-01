$(document).ready(function() {
  // Target the form
  var addForm = $("#addField");
  // Getting references to our form and inputs
  var titleField = $("#form-title");

  // Get list of fields
  var fieldsList = [];
  getFields();
  function getFields() {
    $.get("/api/fields")
      .then(function(data) {
        // Expecting data to be an array of "fields" as objects
        for (var i = 0; i < data.length; i++) {
          fieldsList.push(data[i].title);
        }
        console.log(fieldsList);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  // When the signup button is clicked, we validate the email and password are not blank
  addForm.on("submit", function(event) {
    event.preventDefault();

    var titleInput = titleField.val().trim();

    if (fieldsList.indexOf(titleInput) > -1) {
      alert("Field already exists.");
      return;
    }

    // Add resource
    addField(titleInput);
  });

  // Does a post to the resources/:fieldId route. If successful, we are redirected to the resource page
  // Otherwise we log any errors
  function addField(title) {
    $.post("/api/fields", {
      title: title
    })
      .then(function() {
        window.location.replace("/fields");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }
  //this will alert users signing up with an email already being used
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON.original.sqlMessage);
    //console.log(err);
    $("#alert").fadeIn(500);
  }

  // Cancel button logic
  $("#cancelFieldButton").click(function() {
    window.location.replace("/fields");
  });
});
