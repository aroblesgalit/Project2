$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the user's profile page
  $.get("/api/user_data").then(function(data) {
    $("#userProfileEmailRender").append(data.email);
  });
  // soon we will add the field the user selects as their own to their profile.
  //   $.get("/api/fields").then(function(data) {
  //     $("#userFieldRender").append(data.email);
  //   });
  //updates the user's chosen field choice, and returns them to their userProfile when done
  function updateProfile(user) {
    $.ajax({
      method: "PUT",
      url: "/api/userProfile",
      data: user.fieldChoice,
      validate: {
        len: [1]
      }
    }).then(function() {
      window.location.href = "/userProfile";
    });
  }
});
