var db = require("../models");

module.exports = function(app) {
  //GETs all resources for given field **CHECK
  app.get("/api/fields", function(req, res) {
    db.Field.findAll({
        order: [
            ['title', 'ASC'],
        ]})
      // findAll returns all entries for table when used alone
      .then(function(dbFields) {
        // We can access all resources as argument inside of callback
        res.json(dbFields);
      });
  });

  //retrieves a Field post
  app.get("/api/fields/:id", function(req, res) {
    db.Field.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbFields) {
      console.log(dbFields);
      res.json(dbFields);

    });
  });

  //   creates and saves new fields
  app.post("/api/field", function(req, res) {
    db.Fields.create(req.body).then(function(dbFields) {
      res.json(dbFields);
    });
  });

  //   deletes fields
//   app.delete("/api/field/:id", function(req, res) {
//     db.Fields.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbFields) {
//       res.json(dbFields);
//     });
//   });

  //   updates fields
//   app.put("/api/field", function(req, res) {
//     db.Fields.update(req.body, {
//       where: {
//         id: req.body.id
//       }
//     }).then(function(dbFields) {
//       res.json(dbFields);
//     });
//   });
};
