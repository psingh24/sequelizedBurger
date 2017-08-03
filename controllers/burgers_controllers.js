// Node Dependencies
var express = require("express");
var router = express.Router();
var models = require("../models"); 

// Create routes
// ----------------------------------------------------


router.get("/", function(req, res) {
  res.redirect("/index");
});


router.get("/index", function(req, res) {
 
  models.Burger.findAll({}).then(function(data) {
    
    var hbsObject = { burgers: data };
   
    res.render("index", hbsObject);
  });
});

// Create a New Burger
router.post("/", function(req, res) {
  
  models.Burger
    .create({
      burger_name: req.body.name
    })
    .then(function() {
     
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

//Delete burger
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


module.exports = router;
