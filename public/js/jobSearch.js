$(document).ready(function() {
  $.get("/api/jobSearch/software")
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});
