// // const fs = require("fs");
// $(document).ready(function() {
//   const searchForm = $("#searchForm");
//   // const searchicon = $("#searchicon");
//   searchForm.submit(function(e) {
//     e.preventDefault();
//     const keywords = $("#keywords").val();

//     $.get("/api/jobSearch/" + keywords)
//       .then(function(data) {
//         console.log(data);
//       })
//       .catch(function(err) {
//         console.log(err);
//       });
//   });
$(document).ready(function() {
  $.get("/api/jobSearch/software")
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});
