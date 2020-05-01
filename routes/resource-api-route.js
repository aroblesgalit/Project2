var db = require("../models");

module.exports = function(app) {
  //gets all resources for a given field
  app.get("/api/resources/:fieldId", function(req, res) {
    db.Resource.findAll({
      where: {
        FieldId: req.params.fieldId
      },
      include: [
        {
          model: db.Field
        }
      ],
      include: [
        {
          model: db.User
        }
      ]
    }).then(function(dbResource) {
      res.json(dbResource);
    });
  });
  // gits the resources for the specfic user
  app.get("/api/resources/:userId", function(req, res) {
    db.Resource.findAll({
      where: {
        userId: req.params.userId
      },
      include: [
        {
          model: db.Field
        }
      ],
      include: [
        {
          model: db.User
        }
      ]
    }).then(function(dbResource) {
      res.json(dbResource);
    });
  });

  // //retrieves a resource post
  // app.get("/api/resource/:id", function(req, res) {
  //   db.Resource.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbResource) {
  //     console.log(dbResource);
  //     res.json(dbResource);
  //   });
  // });

  // creates and saves new resources
  app.post("/api/resources", function(req, res) {
    db.Resource.create(req.body)
      .then(function(dbResource) {
        res.json(dbResource);
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  //deletes resources
  // app.delete("/api/resource/:id", function(req, res) {
  //   db.Resource.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbResource) {
  //     res.json(dbResource);
  //   });
  // });

  //updates resources
  // app.put("/api/resource", function(req, res) {
  //   db.Resource.update(req.body, {
  //     where: {
  //       id: req.body.id
  //     }
  //   }).then(function(dbResource) {
  //     res.json(dbResource);
  //   });
  // });
};
