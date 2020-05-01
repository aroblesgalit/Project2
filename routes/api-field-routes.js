var db = require("../models");

module.exports = function(app) {
  //GETs all resources for given field **CHECK
  app.get("/api/fields", function(req, res) {
    db.Field.findAll({})
      // findAll returns all entries for table when used alone
      .then(function(dbFields) {
        // We can access all resources as argument inside of callback
        res.json(dbFields);
      });
  });

  app.post("/api/fields", function(req, res) {
    db.Field.create(req.body)
      .then(function(dbField) {
        res.json(dbField);
      })
      .catch(function(err) {
        console.log(err);
      });
  });
};
