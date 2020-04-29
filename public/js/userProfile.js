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
});
