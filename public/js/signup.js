$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // Render field select
  // Getting references to our form and inputs
  var fieldsSelect = $("#fieldsSelect");

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

  console.log(selectedFieldId);

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      FieldId: selectedFieldId[0].value
    };
    console.log(userData);

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.FieldId);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, FieldId) {
    $.post("/api/signup", {
      email: email,
      password: password,
      FieldId: FieldId
    })
      .then(function() {
        window.location.replace("/userProfile");
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
