$(document).ready(function() {
  // fieldTable holds all of our fields
  var fieldTable = $("#fieldTable");

  function getFields() {
    $.get("/api/fields")
      .then(function(data) {
        var tbody = $("<tbody>");
        // Expecting data to be an array of "fields" as objects
        for (var i = 0; i < data.length; i++) {
          var tr = $("<tr>");
          var tdName = $("<td>").text(data[i].title);
          // var tdUsers = $("<td>").text(data[i].users);
          // var tdResources = $("<td>").text(data[i].resources);
          var tdCreated = $("<td>").text(data[i].createdAt);
          var tdUpdated = $("<td>").text(data[i].updatedAt);
          tr.append(tdName)
            // .append(tdUsers)
            // .append(tdResources)
            .append(tdCreated)
            .append(tdUpdated);
          tbody.append(tr);
        }
        fieldTable.append(tbody);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  getFields();
});
