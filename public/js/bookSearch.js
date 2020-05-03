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
        // var bookTitle = $("<h1>").text(result.docs[0].title);
        // $(".row").append(bookTitle);
        // console.log(result);
        var coverId = result.docs[0].cover_i;
        var newCard = $("<div>")
          .addClass(
            "uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin"
          )
          .attr("uk-grid", true);
        var cardMedia = $("<div>").addClass(
          "uk-card-media-left uk-cover-container"
        );
        var cardImage = $("<img>").attr({
          src: `http://covers.openlibrary.org/b/id/${coverId}-M.jpg`,
          alt: "Book Cover",
          "uk-cover": true
        });
        var cardCanvas = $("<canvas>").attr({ width: "400", height: "200" });

        cardMedia.append(cardImage).append(cardCanvas);

        newCard.append(cardMedia);
        $(".row").append(newCard);
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
