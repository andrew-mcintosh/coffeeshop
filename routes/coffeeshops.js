var express    = require("express");
var router     = express.Router();
var Coffeeshop = require("../models/coffeeshop");
var middleware = require("../middleware");
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

//INDEX COFFEESHOPS
router.get("/", function(req, res){
        Coffeeshop.find({}, function(err, allCoffeeshops){
       if(err){
           console.log(err);
       } else {
          res.render("coffeeshops/index",{coffeeshops: allCoffeeshops, page: 'coffeeshops'});
            }
        });
});

//CREATE COFFEESHOP
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var address = req.body.address;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCoffeeshop = {name: name, image: image, description: desc, address: address, author:author};
    Coffeeshop.create(newCoffeeshop, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/coffeeshops");
        }
        });
    });

//NEW COFFEESHOP
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("coffeeshops/new");
});

//SHOW COFFEESHOPS
router.get("/:id", function(req, res){
    Coffeeshop.findById(req.params.id).populate("comments").exec(function(err, foundCoffeeshop){
       if(err){
           console.log(err);
       } else {
           console.log(foundCoffeeshop);
           res.render("coffeeshops/show", {coffeeshop: foundCoffeeshop});
       }
    });
});

//EDIT COFFEESHOP
router.get("/:id/edit", middleware.checkCoffeeshopOwnership, function(req, res){
        Coffeeshop.findById(req.params.id, function(err, foundCoffeeshop){
            res.render("coffeeshops/edit", {coffeeshop: foundCoffeeshop});
        });
    });

//UPDATE COFFEESHOP
router.put("/:id", middleware.checkCoffeeshopOwnership, function(req, res){
    Coffeeshop.findByIdAndUpdate(req.params.id, req.body.coffeeshop, function(err, coffeeshop){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/coffeeshops/" + coffeeshop._id);
        }
    });
  });

//DESTROY COFFEESHOP
router.delete("/:id", middleware.checkCoffeeshopOwnership, function (req, res){
    Coffeeshop.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/coffeeshops");
        } else {
            res.redirect("/coffeeshops");
        }
    });
});

module.exports = router;