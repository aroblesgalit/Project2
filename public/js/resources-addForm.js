$(document).ready(function() {
  // Target the form
  var addForm = $("#addResource");
  // Getting references to our form and inputs
  var fieldsSelect = $("#form-field");
  var titleField = $("#form-title");
  var descriptionField = $("#form-description");
  var linkField = $("#form-link");
  var imageUrlField = $("#form-imageUrl");

  // Render fields select options
  getFields();
  // Function to render fields select options
  function getFields() {
    $.get("/api/fields")
      .then(function(data) {
        // Expecting data to be an array of "fields" as objects
        for (var i = 0; i < data.length; i++) {
          var option = $("<option>").val(data[i].id);
          option.text(data[i].title);
          fieldsSelect.append(option);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  // Listen to a change event on the select input and store the value to selectedFieldId
  var selectedFieldId = fieldsSelect.change(function() {
    return $(this)
      .children("option:selected")
      .val();
  });

  // Listen to a submit event on the form
  addForm.on("submit", function(event) {
    event.preventDefault();
    // Make a get request to /api/user_data
    $.get("/api/user_data")
      .then(function(data) {
        // Store user inputs into resourceData
        var resourceData = {
          FieldId: parseInt(selectedFieldId.val()),
          title: titleField.val().trim(),
          description: descriptionField.val().trim(),
          link: linkField.val().trim(),
          imageUrl: imageUrlField.val().trim(),
          UserId: data.id
        };

        // if (!userData.email || !userData.password) {
        //   return;
        // }
        // Destructure resourceData
        var {
          FieldId,
          title,
          description,
          link,
          imageUrl,
          UserId
        } = resourceData;
        // Add resource and pass in the variables from resourceData
        addResource(FieldId, title, description, link, imageUrl, UserId);
        // titleField.val("");
        // descriptionField.val("");
        // linkField.val("");
        // imageUrlField.val("");
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  // Function to add a resource using user inputs
  function addResource(FieldId, title, description, link, imageUrl, UserId) {
    // Make a post request to /api/resources
    $.post("/api/resources", {
      // Use user input for appropriate params
      FieldId: FieldId,
      title: title,
      description: description,
      link: link,
      imageUrl: imageUrl,
      UserId: UserId
    })
      // Redirect user to the resource page
      .then(function() {
        window.location.replace("/resources");
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  // Add a click event to the cancel button
  $("#cancelResourceButton").click(function() {
    // Redirect user to the resources page
    window.location.replace("/resources");
  });
});
