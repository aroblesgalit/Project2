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
        console.log(result.docs);
        // Loop through the first 10 results and render
        for (let i = 0; i < 10; i++) {
          render10(i);
        }
        // Render pagination
        renderPagination();

        // Add click events on each page
        $(document).on("click", ".pg1", function() {
          bookResults.empty();
          for (let i = 1; i < 10; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg2", function() {
          bookResults.empty();
          for (let i = 10; i < 19; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg3", function() {
          bookResults.empty();
          for (let i = 19; i < 28; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg4", function() {
          bookResults.empty();
          for (let i = 28; i < 37; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg5", function() {
          bookResults.empty();
          for (let i = 37; i < 46; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg6", function() {
          bookResults.empty();
          for (let i = 46; i < 55; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg7", function() {
          bookResults.empty();
          for (let i = 55; i < 64; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg8", function() {
          bookResults.empty();
          for (let i = 64; i < 73; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg9", function() {
          bookResults.empty();
          for (let i = 73; i < 82; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg10", function() {
          bookResults.empty();
          for (let i = 82; i < 91; i++) {
            render10(i);
          }
          renderPagination();
        });
        $(document).on("click", ".pg11", function() {
          bookResults.empty();
          for (let i = 91; i < 100; i++) {
            render10(i);
          }
          renderPagination();
        });

        function renderPagination() {
          const totalPages = result.docs.length / 9;
          bookResults.append(`
          <ul id="bookPagination" class="uk-pagination uk-flex-center" uk-margin></ul>`);
          for (let i = 1; i < totalPages; i++) {
            $("#bookPagination").append(`
            <li><a class="pg${i}" href="#">${i}</a></li>
            `);
          }
        }

        function render10(i) {
          // Grab all necessary data from result
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
          var languages;
          if (book.language) {
            var langArr = [];
            for (var i = 0; i < book.language.length; i++) {
              langArr.push(
                `<p class="uk-label uk-float-left uk-margin-small-right">${book.language[i]}</p>`
              );
            }
            languages = langArr.join("");
          } else {
            languages = book.type;
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
                    ${languages}
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
