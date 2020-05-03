$(document).ready(function() {
  $(".book-search-form").on("submit", function(e) {
    e.preventDefault();
    const userInput = $(".book-search-input")
      .val()
      .trim();
    // console.log(userInput);
    $.ajax({
      url: `http://openlibrary.org/search.json?q=${userInput}`,
      method: "GET"
    })
      .then(function(result) {
        console.log(result);
      })
      .catch(function(err) {
        console.log(err);
      });
  });
  // });
  // function bookSearch() {
  //   console.log("this function runs");
  //   // var search = document.getElementById("search").value;
  //   // document.getElementById("results").innerHTML = "";
  //   // console.log(search);

  //   // $.ajax({
  //   //   url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
  //   //   dataType: "json",

  //   //   success: function(data) {
  //   //     for (i = 0; i < data.items.length; i++) {
  //   //       results.innerHTML += "<h2>" + data.items[i].volumeInfo.title + "</h2>";
  // }
  // //   },
  // //   type: "GET"
  // // });
  // // document.getElementById("form").addEventListener("submit", bookSearch, false);
});
