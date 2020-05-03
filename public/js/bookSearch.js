$(document).ready(function() {
  $(".book-search-form").on("sumbit", function() {
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

    //   var tBody = $("tbody");
    //   var tRow = $("<tr>");
    //   // Methods run on jQuery selectors return the selector they we run on
    //   // This is why we can create and save a reference to a td in the same statement we update its text
    //   var titleTd = $("<td>").text(response.Title);
    //   var yearTd = $("<td>").text(response.Year);
    //   var actorsTd = $("<td>").text(response.Actors);
    //   // Append the newly created table data to the table row
    //   tRow.append(titleTd, yearTd, actorsTd);
    //   // Append the table row to the table body
    //   tBody.append(tRow);
    // });
  });
  // $.get("http://openlibrary.org/search.json?q=" + user_input)
  //   .then(function(data) {
  //     console.log(data);
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  // });
});
