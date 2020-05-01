$(document).ready(function() {
  // Render field select
  var addForm = $("#addResource");
  // Getting references to our form and inputs
  var fieldsSelect = $("#form-field");
  var titleField = $("#form-title");
  var descriptionField = $("#form-description");
  var linkField = $("#form-link");
  var imageUrlField = $("#form-imageUrl");

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

    $.get("/api/user_data")
      .then(function(data) {
        var resourceData = {
          FieldId: parseInt(selectedFieldId.val()),
          title: titleField.val().trim(),
          description: descriptionField.val().trim(),
          link: linkField.val().trim(),
          imageUrl: imageUrlField.val().trim(),
          UserId: data.id
        };
        console.log(resourceData);

        // if (!userData.email || !userData.password) {
        //   return;
        // }
        var {
          FieldId,
          title,
          description,
          link,
          imageUrl,
          UserId
        } = resourceData;
        // Add resource
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

  // Does a post to the resources/:fieldId route. If successful, we are redirected to the resource page
  // Otherwise we log any errors
  function addResource(FieldId, title, description, link, imageUrl, UserId) {
    $.post("/api/resources", {
      FieldId: FieldId,
      title: title,
      description: description,
      link: link,
      imageUrl: imageUrl,
      UserId: UserId
    })
      .then(function() {
        window.location.replace("/resources");
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
