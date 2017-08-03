// Node Dependencies
var express = require("express");
var router = express.Router();
var models = require("../models"); // Pulls out the Burger Models

// Create routes
// ----------------------------------------------------

// Index Redirect
router.get("/", function(req, res) {
  res.redirect("/index");
});

// Index Page (render all burgers to DOM)
router.get("/index", function(req, res) {
  // Sequelize Query to get all burgers from database (and join them to their devourers, if applicable)
  models.Burger.findAll({}).then(function(data) {
    // Pass the returned data into a Handlebars object and then render it
    var hbsObject = { burgers: data };
    // console.log(data);
    res.render("index", hbsObject);
  });
});

// Create a New Burger
router.post("/", function(req, res) {
  // Sequelize Query to add new burger to database
  models.Burger
    .create({
      burger_name: req.body.name
    })
    .then(function() {
      // After the burger is added to the database, refresh the page
      res.redirect("/index");
    });
});

// Devour a Burger
router.post("/:id", function(req, res) {
  models.Burger.update(
    {
      devoured: true
    },
    { where: { id: req.params.id } }
  ).then(function(){
    res.redirect("/index");
  })
});

router.delete("/:id", function(req, res) {
  models.Burger.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(data){
    res.json(data);
  })
})

// ----------------------------------------------------

// Export routes
module.exports = router;
