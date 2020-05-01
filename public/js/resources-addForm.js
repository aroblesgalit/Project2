$(document).ready(function() {
  // Getting references to our form and input
  var addForm = $("#addResource");
  var selectedFieldId;
  var title = $("#form-title");
  var description = $("#form-description");
  var link = $("#form-link");
  var imageUrl = $("#form-imageUrl");

  // Get user's id
  var UserId = $.get("/api/user_data").then(function(data) {
    return data.id;
  });

  // Render field select
  // Getting references to our form and inputs
  var fieldsSelect = $("#form-field");

  // Render fields select options
  getFields();

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

  var selectedFieldId = fieldsSelect.change(function() {
    return $(this)
      .children("option:selected")
      .val();
  });

  // When the signup button is clicked, we validate the email and password are not blank
  addForm.on("submit", function(event) {
    event.preventDefault();
    var resourceData = {
      FieldId: selectedFieldId,
      title: title,
      description: description,
      link: link,
      imageUrl: imageUrl,
      UserId: UserId
    };
    console.log(resourceData);

    // if (!userData.email || !userData.password) {
    //   return;
    // }
    // Add resource
    addResource();
    title.val("");
    description.val("");
    link.val("");
    imageUrl.val("");
  });

  // Does a post to the resources/:fieldId route. If successful, we are redirected to the resource page
  // Otherwise we log any errors
  function addResource(FieldId, title, description, link, imageUrl, UserId) {
    $.post("/api/resources/" + FieldId, {
      FieldId: FieldId,
      title: title,
      description: description,
      link: link,
      imageUrl: imageUrl,
      UserId: UserId
    })
      .then(function() {
        window.location.replace("/resources/" + selectedFieldId);
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
});
