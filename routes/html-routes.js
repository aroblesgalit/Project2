// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/resources", function(req, res) {
    if (req.user) {
      res.sendFile(path.join(__dirname, "../public/resources-loggedIn.html"));
    } else {
      res.sendFile(path.join(__dirname, "../public/resources.html"));
    }
  });

  /* Job Search path*/
  app.get("/jobsearch", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/jobSearch.html"));
  });

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page >> User profile
    if (req.user) {
      return res.redirect("/userProfile");
    }
    res.sendFile(path.join(__dirname, "../public/homePage.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/userProfile");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/userProfile", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/userProfile.html"));
  });
  app.get("/fields", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/fields.html"));
  });
  app.get("/resources/addForm", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/resources-addForm.html"));
  });
  app.get("/fields/addForm", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/fields-addForm.html"));
  });
};
