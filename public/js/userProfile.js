$(document).ready(function() {
  //sets our updating variable to false initially
  // var updating = false;
  // //sets this variable to plug into our user's field choice html element
  // var userField = $("#userFieldRenderChoice");
  // handles the form submission when the user enters a field and hits submit
  // HAD TO COMMENT THESE OUT CUZ IT WAS CAUSING ISSUE FOR NOW --ALVIN

  // $(userFieldForm).on("submit", handleFormSubmit);
  // function handleFormSubmit(event) {
  //   event.preventDefault();
  //   // Wont submit the change if we are missing a string
  //   if (!userField.val().trim()) {
  //     return;
  //   }
  //   // Constructing a newPost object to hand to the database
  //   // var newFieldChoice = {
  //   //   title: fieldTitle.val().trim(),
  //   //   fieldId: authorSelect.val()
  //   // };

  //   // If we're updating a post run updatePost to update a post
  //   // Otherwise run submitPost to create a whole new post
  //   if (updating) {
  //     newPost.id = postId;
  //     updatePost(newPost);
  //   } else {
  //     submitPost(newPost);
  //   }
  // }
  $("#profileImage").click(function() {
    $("#imageUpload").click();
  });

  function fasterPreview(uploader) {
    if (uploader.files && uploader.files[0]) {
      $("#profileImage").attr(
        "src",
        window.URL.createObjectURL(uploader.files[0])
      );
    }
  }

  $("#imageUpload").change(function() {
    fasterPreview(this);
  });

  $.get("/api/user_data").then(function(data) {
    $("#userProfileEmailRender").append(data.email);
    // Target div that will contain the results for resources
    var resourceResults = $(".resource-results");
    // Declare a variable to hold our resources
    var resources;
    //console.log(data.id);
    getResources(data.id);
    //make a get request for user's field
    $.get("/api/fields/" + data.FieldId).then(function(data) {
      $("#userFieldRender").append(data.title);
    });
    // This function grabs resources from the database and updates the view based on a field id
    function getResources(userId) {
      // Make a get request to /api/resources/ plust the field id
      $.get("/api/resources/" + userId)
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
      var newResourceCard = $("<div>").addClass(
        "resource-card uk-overflow-hidden"
      );
      var resourceCardWrapper = $("<div>").addClass("uk-card uk-card-default");
      var cardImageDiv = $("<div>").addClass(
        "uk-card-media-top uk-flex uk-flex-center uk-flex-middle card-image"
      );
      var cardImage = $("<img>")
        .attr({
          src: resource.imageUrl,
          alt: resource.title + " thumbnail."
        })
        .addClass("uk-width-responsive");
      var bodyDiv = $("<div>").addClass("uk-card-body uk-flex uk-flex-column");
      var cardTitle = $("<h3>")
        .addClass("card-title uk-card-title uk-text-break")
        .text(resource.title);
      var description = $("<p>")
        .addClass("card-description uk-overflow-hidden uk-text-break")
        .text(resource.description);
      var linkUrl = $("<a>").attr("href", resource.link);
      var resourceButton = $("<button>").addClass(
        "go-button uk-flex uk-flex-center uk-flex-middle uk-align-right"
      );
      var buttonIcon = $("<span>").attr("uk-icon", "icon: chevron-right");
      // Append to each other
      bodyDiv
        .append(cardTitle)
        .append(description)
        .append(linkUrl.append(resourceButton.append(buttonIcon)));
      newResourceCard.append(
        resourceCardWrapper
          .append(cardImageDiv.append(cardImage))
          .append(bodyDiv)
      );
      // Return the new resource card
      return newResourceCard;
    }

    // This will display a message if there's no data
    function displayEmpty() {
      resourceResults.html(
        "<p>You have not added any resources. Go to <a href='/resources'>Resources</a> to make your first post.</p>"
      );
    }
  });
});
// //sets our updating variable to false initially
// var updating = false;
// //sets this variable to plug into our user's field choice html element
// var userField = $("#userFieldRenderChoice");
// // handles the form submission when the user enters a field and hits submit
// $(userFieldForm).on("submit", handleFormSubmit);
// function handleFormSubmit(event) {
//   event.preventDefault();
//   // Wont submit the change if we are missing a string
//   if (!userField.val().trim()) {
//     return;
//   }
// Constructing a newPost object to hand to the database
// var newFieldChoice = {
//   title: fieldTitle.val().trim(),
//   fieldId: authorSelect.val()
// };
// If we're updating a post run updatePost to update a post
// Otherwise run submitPost to create a whole new post
//   if (updating) {
//     newPost.id = postId;
//     updatePost(newPost);
//   } else {
//     submitPost(newPost);
//   }
// }

//updates the user's chosen field choice, and returns them to their userProfile when done
//   function updateProfile(user) {
//     $.ajax({
//       method: "PUT",
//       url: "/api/userProfile",
//       data: user.fieldChoice,
//       validate: {
//         len: [1]
//       }
//     }).then(function() {
//       window.location.href = "/userProfile";
//     });
//   }
