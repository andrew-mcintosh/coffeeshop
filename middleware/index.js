var Coffeeshop = require("../models/coffeeshop");
var Comment    = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCoffeeshopOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Coffeeshop.findById(req.params.id, function(err, foundCoffeeshop){
        if(err){
            req.flash("error", "Coffeeshop not found!");
            res.redirect("back");
        } else {
            if(foundCoffeeshop.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
                 } 
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
              return res.redirect("back");
           }  
            if(foundComment.author.username === (req.user.username)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
                 } 
            }
        );
    } else {
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};

module.exports = middlewareObj;