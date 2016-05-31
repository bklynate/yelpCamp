var Comment = require("../models/comment"),
    Campground = require("../models/campground")

var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(request, response, next){
  // check if request is authenticated
  // if it is authenticated, then check for
  // ownership of the comment
  if(request.isAuthenticated()){
    Comment.findById(request.params.comment_id, function(error, foundComment){
      if(error){
        console.log(error);
        response.redirect("back");
      } else if(foundComment.author.id.equals(request.user._id)) {
        next();
      } else {
        console.log("You Don't Have Permission To Complete This Action");
        response.redirect("back")
      }
    })
  } else {
    console.log("DENIED");
    response.redirect("back")
  }
}

middlewareObj.isLoggedIn = function(request, response, next){
  if(request.isAuthenticated()){
    return next();
  }
  request.flash("error", "Please log in to the application..")
  response.redirect("/login");
}

middlewareObj.checkCampsiteOwnership = function(request, response, next){
  // check if request is authenticated
  // if it is authenticated, then check for
  // ownership of the campsite
  if(request.isAuthenticated()){
    Campground.findById(request.params.id, function(error, foundCamp){
      if(error){
        request.flash("error", "Campsite Not Found");
        response.redirect("back");
      } else if(foundCamp.author.id.equals(request.user._id)) {
        next();
      } else {
        request.flash("error", "You Don't Have Permission To Complete This Action");
        response.redirect("back")
      }
    })
  } else {
    request.flash("error", "Please log into the application..");
        response.redirect("back")
  }
}

module.exports = middlewareObj;
