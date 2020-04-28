$(document).ready(function() {
  // resourceResults holds all of our resources
  var resourceResults = $(".resource-results");
  // Variable to hold our resources
  var resources;
  // Getting references to our form and inputs
  const resourceSelect = $("#resource-select");
  
  function getFields() {
    $.get("/api/fields")
      .then(data => {
        const select = $("<select>").addClass("uk-select");
        // Expecting data to be an array of "fields" as objects
        for (let i = 0; i < data.length; i++) {
            const option = $("<option>");
            option.text(data[i].name);
            select.append(option);
        };
        resourceSelect.append(select);
    })
      .catch(err => {
        console.log(err);
    });
  };

  // The code below handles the case where we want to get resources for a specific field
  // Looks for a query param in the url for field_id
  const url = window.location.search;
  const fieldId;
  if (url.indexOf("?field_id=") !== -1) {
    fieldId = url.split("=")[1];
    getResources(fieldId);
  }
  // If there's no fieldId we just get the first one
  else {
    getResources(0);
  }

  // This function grabs resources from the database and updates the view
  function getResources(field) {
    fieldId = field || "";
    if (fieldId) {
      fieldId = "/?field_id=" + fieldId;
    }
    $.get("/api/resources" + fieldId)
      .then(data => {
        console.log("Resources", data);
        resources = data;
        if (!resources || !resources.length) {
          displayEmpty(field);
        }
        else {
          initializeRows();
        }
      })
      .catch(err => {
          if (err) throw err;
      })
  }

    // InitializeRows handles appending all of our constructed post HTML inside blogContainer
    function initializeRows() {
        resourceResults.empty();
        var resourcesToAdd = [];
        for (let i = 0; i < resourcess.length; i++) {
          resourcesToAdd.push(createNewCard(resources[i]));
        }
        resourceResults.append(resourcesToAdd);
      }
    
      // This function constructs a post's HTML
      function createNewCard(resource) {
        // Get the date and format it
        const formattedDate = new Date(resource.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        // Create divs
        const newResourceCard = $("<div>");
        const resourceCardWrapper = $("<div>").addClass("uk-card uk-card-default");
        const cardImageDiv = $("<div>").addClass("uk-card-media-top");
        const cardImage = $("<img>").attr({src: resource.imageUrl, alt: resource.title + " thumbnail."});
        const bodyDiv = $("<div>").addClass("uk-card-body");
        const cardTitle = $("<h3>").addClass("uk-card-title").text(resource.title);
        const descriptionDiv = $("<div>").addClass("descript-button uk-flex");
        const description = $("<p>").text(resource.description);
        const resourceButton = $("<button>").addClass("go-button uk-flex uk-flex-center uk-flex-middle");
        const buttonIcon = $("<span>").attr("uk-icon", "icon: chevron-right");
        // Append to each other
        bodyDiv.append(cardTitle).append(descriptionDiv.append(description).append(resourceButton.append(buttonIcon)));
        newResourceCard.append(resourceCardWrapper.append(cardImageDiv.append(cardImage)).append(bodyDiv));
        // Return the new resource card
        return newResourceCard;
      }

  function init() {
        getFields();
        getResources();
    }; 

  init();

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
