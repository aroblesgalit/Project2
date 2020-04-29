$(document).ready(function() {
  $("#login").on("click", function() {
    $.get("/login", function(err) {
      if (err) {
        console.log(err);
      }
      window.location.replace("/login");
    });
  });
});
