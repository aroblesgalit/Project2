$(document).ready(function() {
  // Add a submit event to the book search form
  $(".book-search-form").on("submit", function(e) {
    e.preventDefault();
    // Target the div that will contain the rendered data
    var bookResults = $(".book-results");
    // Empty out the div
    bookResults.empty();
    // Get the value from the search input
    var userInput = $(".book-search-input")
      .val()
      .trim();
    // Use ajax to make a get request to the open library api
    $.ajax({
      url: `https://openlibrary.org/search.json?q=${userInput}`,
      method: "GET"
    })
      .then(function(result) {
        console.log(result);
        for (let i = 0; i < 10; i++) {
          render10(i);
        }
        renderPagination();

        $(document).on("click", ".pg1", function() {
          console.log("pg1 clicked");
          bookResults.empty();
          for (let i = 1; i < 10; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg2", function() {
          console.log("pg2 clicked");
          bookResults.empty();
          for (let i = 10; i < 19; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg3", function() {
          console.log("pg3 clicked");
          bookResults.empty();
          for (let i = 19; i < 28; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg4", function() {
          console.log("pg4 clicked");
          bookResults.empty();
          for (let i = 28; i < 37; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg5", function() {
          console.log("pg5 clicked");
          bookResults.empty();
          for (let i = 37; i < 46; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg6", function() {
          console.log("pg6 clicked");
          bookResults.empty();
          for (let i = 46; i < 55; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg7", function() {
          console.log("pg7 clicked");
          bookResults.empty();
          for (let i = 55; i < 64; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg8", function() {
          console.log("pg8 clicked");
          bookResults.empty();
          for (let i = 64; i < 73; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg9", function() {
          console.log("pg9 clicked");
          bookResults.empty();
          for (let i = 73; i < 82; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg10", function() {
          console.log("pg10 clicked");
          bookResults.empty();
          for (let i = 82; i < 91; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg11", function() {
          console.log("pg11 clicked");
          bookResults.empty();
          for (let i = 91; i < 100; i++) {
            render10(i);
          }
          renderPagination();
        });

        function renderPagination() {
          bookResults.append(`
            <ul id="bookPagination" class="uk-pagination uk-flex-center" uk-margin>
              <li><a class="pg1" href="#">1</a></li>
              <li><a class="pg2" href="#">2</a></li>
              <li><a class="pg3" href="#">3</a></li>
              <li><a class="pg4" href="#">4</a></li>
              <li><a class="pg5" href="#">5</a></li>
              <li><a class="pg6" href="#">6</a></li>
              <li><a class="pg7" href="#">7</a></li>
              <li><a class="pg8" href="#">8</a></li>
              <li><a class="pg9" href="#">9</a></li>
              <li><a class="pg10" href="#">10</a></li>
              <li><a class="pg11" href="#">11</a></li>
            </ul>
          `);
        }

        function render10(i) {
          var book = result.docs[i];
          var bookAuthor;
          if (book.author_name) {
            bookAuthor = book.author_name[0];
          } else {
            bookAuthor =
              "<span class='uk-text-warning uk-text-small'>No author found.</span>";
          }
          var bookCover;
          if (book.cover_i) {
            bookCover =
              "http://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg";
          } else {
            bookCover =
              "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTi4ib-a5nE5I_-dNhV7mYgu4ENJYctW-EbAkxO4d4gwDcfC_-F&usqp=CAU";
          }
          var bookPublisher;
          if (book.publisher) {
            bookPublisher = book.publisher[0];
          } else if (book.publish_place) {
            bookPublisher = book.publish_place[0];
          } else {
            bookPublisher =
              "<span class='uk-text-warning uk-text-small'>No publisher found.</span>";
          }
          var published;
          if (book.publish_date) {
            published = book.publish_date[0];
          } else if (book.publish_year) {
            published = book.publish_year[0];
          } else {
            published =
              "<span class='uk-text-warning uk-text-small'>No publish date found.</span>";
          }

          bookResults.append(
            `
            <div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin" uk-grid>
            <div class="uk-card-media-left uk-cover-container uk-flex uk-flex-center bookImageBg">
                <img src="${bookCover}" 
    alt="Random GitHub image" class="uk-height-responsive uk-height-1-1 uk-center">
            </div>
            <div>
                <div class="uk-card-body">
                    <h3 class="uk-card-title uk-margin-small-bottom">${book.title}</h3>
                    <p class="uk-text-meta uk-margin-remove-bottom">Author:</p>
                    <p class="uk-margin-remove-top bookData">${bookAuthor}</p>
                    <p class="uk-text-meta uk-margin-remove-bottom">Published:</p>
                    <p class="uk-margin-remove-top bookData">${published}</p>
                    <p class="uk-text-meta uk-margin-remove-bottom">Publisher:</p>
                    <p class="uk-margin-remove-top bookData">${bookPublisher}</p>
                    <p class="uk-label">${book.type}</p>
                </div>
            </div>
        </div>
            `
          );
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  });
});
