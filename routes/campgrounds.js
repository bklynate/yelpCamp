var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/campgrounds", function(request, response){
  console.log(request.user);
  Campground.find({}, function(error, campgrounds){
    if(error){
      console.log(error);
    } else {
      response.render("campgrounds/index", {campgrounds: campgrounds});
    }
  });
});

router.post("/campgrounds", function(request, response){
  var campgroundName = request.body.campgroundName;
  var image = request.body.image;
  var description = request.body.description;
  var newCampground = {
    name: campgroundName,
    image: image,
    description: description
  };

  Campground.create(newCampground, isLoggedIn, function(error, newCampground){
    if(error){
      console.log(error);
    } else {
      response.redirect("/campgrounds");
    }
  });
});

router.get("/campgrounds/new", isLoggedIn, function(request, response){
  response.render("campgrounds/new");
});

// SHOW - Show page for each campsite
router.get("/campgrounds/:id", function(request, response){
  var id = request.params.id
  Campground.findById(id).populate("comments").exec(function(error, foundCamp){
    if(error){
      console.log(error);
    } else {
      response.render("campgrounds/show", { campground: foundCamp });
    }
  });
});

function isLoggedIn(request, response, next){
  if(request.isAuthenticated()){
    return next();
  }
  response.redirect("/login");
}
module.exports = router;
