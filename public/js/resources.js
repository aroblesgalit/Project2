$(document).ready(function() {
  // Target div that will contain the results for resources
  var resourceResults = $(".resource-results");
  // Declare a variable to hold our resources
  var resources;
  // Get reference to our form and inputs
  var fieldsSelect = $("#fieldsSelect");

  // Render fields select options
  getFields();

  // Add an change event to the fieldsSelect dropdown
  fieldsSelect.change(function() {
    // Grab the id of the selected field option
    var selectedFieldId = $(this)
      .children("option:selected")
      .val();
    // Get the resources for the selected field using the id
    getResources(selectedFieldId);
  });

  // Declare a function to render the fields into the select dropdown
  function getFields() {
    $.get("/api/fields")
      .then(function(data) {
        // Expecting data to be an array of "fields" as objects
        for (var i = 0; i < data.length; i++) {
          var option = $("<option>").val(data[i].id);
          option.text(data[i].title);
          fieldsSelect.append(option);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  // This function grabs resources from the database and updates the view based on a field id
  function getResources(fieldId) {
    // Make a get request to /api/resources/ plust the field id
    $.get("/api/resources/" + fieldId)
      // Then use the data from the request
      .then(function(data) {
        console.log("Resources", data);
        // Store the data into our variable resources
        resources = data;
        // If no data then call the displayEmpty function
        if (!resources || !resources.length) {
          displayEmpty();
          // Else render the results
        } else {
          initializeRows();
        }
      })
      .catch(function(err) {
        if (err) {
          throw err;
        }
      });
  }

  // InitializeRows handles appending all of our constructed resource HTML inside resourceResults
  function initializeRows() {
    // First empty the container
    resourceResults.empty();
    // Declare a variable for an empty array to hold the resources
    var resourcesToAdd = [];
    // Loop through the data
    for (var i = 0; i < resources.length; i++) {
      // Render each data onto a new card and push each into the empty array
      resourcesToAdd.push(createNewCard(resources[i]));
    }
    // Append it to the container
    resourceResults.append(resourcesToAdd);
  }

  // This function constructs a resource's HTML
  function createNewCard(resource) {
    // Get the date and format it
    // var formattedDate = new Date(resource.createdAt);
    // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    // Create the divs
    var newResourceCard = $("<div>");
    var resourceCardWrapper = $("<div>").addClass("uk-card uk-card-default");
    var cardImageDiv = $("<div>").addClass("uk-card-media-top");
    var cardImage = $("<img>").attr({
      src: resource.imageUrl,
      alt: resource.title + " thumbnail."
    });
    var bodyDiv = $("<div>").addClass("uk-card-body");
    var cardTitle = $("<h3>")
      .addClass("uk-card-title")
      .text(resource.title);
    var descriptionDiv = $("<div>").addClass("descript-button uk-flex");
    var description = $("<p>").text(resource.description);
    var resourceButton = $("<button>").addClass(
      "go-button uk-flex uk-flex-center uk-flex-middle"
    );
    var buttonIcon = $("<span>").attr("uk-icon", "icon: chevron-right");
    // Append to each other
    bodyDiv
      .append(cardTitle)
      .append(
        descriptionDiv
          .append(description)
          .append(resourceButton.append(buttonIcon))
      );
    newResourceCard.append(
      resourceCardWrapper.append(cardImageDiv.append(cardImage)).append(bodyDiv)
    );
    // Return the new resource card
    return newResourceCard;
  }

  // This will display a message if there's no data
  function displayEmpty() {
    resourceResults.html(
      "<p>No resources posted for this field yet. Sign up or Log in to add.</p>"
    );
  }
});
