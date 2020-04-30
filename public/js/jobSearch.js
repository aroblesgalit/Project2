<<<<<<< HEAD
// const fs = require("fs");
$(document).ready(function() {
  const searchForm = $("#searchForm");
  // const searchicon = $("#searchicon");
  searchForm.submit(function(e) {
    e.preventDefault();
    const keywords = $("#keywords").val();

    $.get("/api/jobSearch/" + keywords)
      .then(function(data) {
        console.log(data);
      })
      .catch(function(err) {
        console.log(err);
      });
  });
=======
$(document).ready(function() {
  $.get("/api/jobSearch/software")
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.log(err);
    });
>>>>>>> 5d878d134600e77bef6cf456ca616059e4ebb267
});
