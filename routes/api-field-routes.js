var db = require("../models");

module.exports = function(app) {
  //GETs all resources for given field **CHECK
  app.get("/api/resources", function(req, res) {
    db.Resources.findaAll({})
      // findAll returns all entries for table when used alone
      .then(function(dbResources) {
        // We can access all resources as argument inside of callback
        res.json(dbResources);
      });
  });

  // Get route for retrieving a single resource
  app.get("/api/resources/:id", function(req, res) {
    db.Resources.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbResources) {
      res.json(dbResources);
    });
  });
  let resourceId = req.params.resourceId;

  // Find all associated resources for given field with given title
  db.Titles.findAll({
    where: {
      resource: resourceId
    },
    include: [
      {
        model: db.Resources
      }
    ]
  }).then(function(dbResources) {
    res.json(dbResources);
  });
};

app.get("/api/fields");
