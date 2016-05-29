var express = require("express")
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//============================
// COMMENTS ROUTES
//============================
router.get("/campgrounds/:id/comments/new", isLoggedIn, function(request, response){
  Campground.findById(request.params.id, function(error,campground){
    if(error){
      console.log(error);
    } else {
      response.render("comments/new", { campground: campground});
    }
  })
});

router.post("/campgrounds/:id/comments", isLoggedIn, function(request, response){
  // Find the correct campground to leave the comment on
  Campground.findById(request.params.id, function(error, campground){
    if(error){
      console.log(error);
    } else {
      // Creates the new comment
      Comment.create(request.body.comment, function(error, comment){
        if(error){
          console.log(error);
        } else {
          campground.comments.push(comment);
          campground.save();
          // redirect to the campground page
          response.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  })
});

function isLoggedIn(request, response, next){
  if(request.isAuthenticated()){
    return next();
  }
  response.redirect("/login");
}

module.exports = router;
