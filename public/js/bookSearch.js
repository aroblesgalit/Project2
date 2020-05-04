$(document).ready(function() {
  $(".book-search-form").on("submit", function(e) {
    e.preventDefault();
    $(".row").empty();
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
        for (i = 0; i < 10; i++) {
          var coverId = result.docs[i].isbn[0];
          var bookTitle = result.docs[i].title;
          var bookAuthor = result.docs[i].author_name[0];
          var publishYear = result.docs[i].publish_year[0];
          var newCard = $("<div>")
            .addClass(
              "uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin"
            )
            .attr("uk-grid", true);
          var cardMedia = $("<div>").addClass(
            "uk-card-media-left uk-cover-container"
          );
          var cardImage = $("<img>").attr({
            src: `http://covers.openlibrary.org/b/isbn/${coverId}-M.jpg`,
            alt: "Book Cover",
            "uk-cover": true
          });
          var cardCanvas = $("<canvas>").attr({ width: "400", height: "200" });
          var bodyCardDiv = $("<div>");
          var bodyCard = $("<div>").addClass("uk-card-body");
          var cardTitle = $("<h3>")
            .addClass("uk-card-title")
            .text(bookTitle);
          var cardAuthor = $("<p>").text(bookAuthor);
          var cardPublish = $("<p>").text(publishYear);

          cardMedia.append(cardImage).append(cardCanvas);
          bodyCard
            .append(cardTitle)
            .append(cardAuthor)
            .append(cardPublish);
          bodyCardDiv.append(bodyCard);

          newCard.append(cardMedia).append(bodyCardDiv);
          $(".row").append(newCard);
        }
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
