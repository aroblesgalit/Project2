$(document).ready(function() {
  // Target the table that will hold our data for fields
  var fieldTable = $("#fieldTable");

  // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");

  // Function to render the data
  function getFields() {
    // Make a get request to /api/fields
    $.get("/api/fields")
      // Then take the data
      .then(function(data) {
        var tbody = $("<tbody>");
        // Expecting data to be an array of "fields" as objects and loop through
        for (var i = 0; i < data.length; i++) {
          // Create the divs
          var tr = $("<tr>");
          var tdName = $("<td>").text(data[i].title);
          // var tdUsers = $("<td>").text(data[i].users);
          // var tdResources = $("<td>").text(data[i].resources);
          var tdCreated = $("<td>").text(
            moment(data[i].createdAt).format("MMM Do YYYY, h:mm a")
          );
          var tdUpdated = $("<td>").text(
            moment(data[i].updatedAt).format("MMM Do YYYY, h:mm a")
          );
          // Append them to each other
          tr.append(tdName)
            // .append(tdUsers)
            // .append(tdResources)
            .append(tdCreated)
            .append(tdUpdated);
          tbody.append(tr);
        }
        // Append everything to the container
        fieldTable.append(tbody);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  // Render the data
  getFields();
});
