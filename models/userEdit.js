$(document).ready(function() {
  //sets our updating variable to false initially
  var updating = false;
  //sets this variable to plug into our user's field choice html element
  var userField = $("#userFieldRenderChoice");
  // handles the form submission when the user enters a field and hits submit
  $(userFieldForm).on("submit", handleFormSubmit);
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the change if we are missing a string
    if (!userField.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    // var newFieldChoice = {
    //   title: fieldTitle.val().trim(),
    //   fieldId: authorSelect.val()
    // };

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    } else {
      submitPost(newPost);
    }
  }

  //updates the user's chosen field choice, and returns them to their userProfile when done
  //   function updateProfile(user) {
  //     $.ajax({
  //       method: "PUT",
  //       url: "/api/userProfile",
  //       data: user.fieldChoice,
  //       validate: {
  //         len: [1]
  //       }
  //     }).then(function() {
  //       window.location.href = "/userProfile";
  //     });
  //   }
});