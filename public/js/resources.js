$(document).ready(function() {
  // resourceResults holds all of our resources
  var resourceResults = $(".resource-results");
  // Variable to hold our resources
  var resources;
  // Getting references to our form and inputs
  var fieldsSelect = $("#fieldsSelect");

  // Render fields select options
  getFields();

  fieldsSelect.change(function() {
    // Grab the id of the selected field
    var selectedFieldId = $(this)
      .children("option:selected")
      .val();
    getResources(selectedFieldId);
  });

  function getFields() {
    $.get("/api/fields")
      .then(function(data) {
        console.log(data);

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

  // The code below handles the case where we want to get resources for a specific field
  // Looks for a query param in the url for field_id
  //   var url = window.location.search;
  //   var fieldId;
  //   if (url.indexOf("?field_id=") !== -1) {
  //     fieldId = url.split("=")[1];
  //     getResources(fieldId);
  //   }
  //   // If there's no fieldId we just get the first one
  //   else {
  //     getResources(0);
  //   }

  // This function grabs resources from the database and updates the view
  function getResources(fieldId) {
    // fieldId = field || "";
    // if (fieldId) {
    //   fieldId = "/?field_id=" + fieldId;
    // }
    $.get("/api/resources/" + fieldId)
      .then(function(data) {
        console.log("Resources", data);
        resources = data;
        if (!resources || !resources.length) {
          displayEmpty();
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
    resourceResults.empty();
    var resourcesToAdd = [];
    for (var i = 0; i < resources.length; i++) {
      resourcesToAdd.push(createNewCard(resources[i]));
    }
    resourceResults.append(resourcesToAdd);
  }

  // This function constructs a resource's HTML
  function createNewCard(resource) {
    // Get the date and format it
    // var formattedDate = new Date(resource.createdAt);
    // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    // Create divs
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

  function displayEmpty() {
    resourceResults.html(
      "<p>No resources posted for this field yet. Log in to add.</p>"
    );
  }

  //   // When the form is submitted, we validate there's an email and password entered
  //   loginForm.on("submit", function(event) {
  //     event.preventDefault();
  //     var userData = {
  //       email: emailInput.val().trim(),
  //       password: passwordInput.val().trim()
  //     };
  //     if (!userData.email || !userData.password) {
  //       return;
  //     }
  //     // If we have an email and password we run the loginUser function and clear the form
  //     loginUser(userData.email, userData.password);
  //     emailInput.val("");
  //     passwordInput.val("");
  //   });
  //   // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  //   function loginUser(email, password) {
  //     $.post("/api/login", {
  //       email: email,
  //       password: password
  //     })
  //       .then(function() {
  //         window.location.replace("/members");
  //         // If there's an error, log the error
  //       })
  //       .catch(function(err) {
  //         console.log(err);
  //       });
  //   }
});
