var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", function(request, response){
  Campground.find({}, function(error, campgrounds){
    if(error){
      console.log(error);
    } else {
      response.render("campgrounds/index", {campgrounds: campgrounds});
    }
  });
});

router.post("/", middleware.isLoggedIn, function(request, response){
  var campgroundName = request.body.campgroundName;
  var image = request.body.image;
  var description = request.body.description;
  var author = {
    id: request.user._id,
    username: request.user.username
  }
  var newCampground = {
    name: campgroundName,
    image: image,
    description: description,
    author: author
  };

  Campground.create(newCampground, function(error, newCampground){
    if(error){
      console.log(error);
    } else {
      console.log(newCampground);
      response.redirect("/campgrounds");
    }
  });
});

router.get("/new", middleware.isLoggedIn, function(request, response){
  response.render("campgrounds/new");
});

// SHOW - Show page for each campsite
router.get("/:id", function(request, response){
  var id = request.params.id
  Campground.findById(id).populate("comments").exec(function(error, foundCamp){
    if(error){
      console.log(error);
    } else {
      response.render("campgrounds/show", { campground: foundCamp });
    }
  });
});

// EDIT - Edit the a campsite
router.get("/:id/edit", middleware.checkCampsiteOwnership, function(request, response){
  Campground.findById(request.params.id, function(error, foundCamp){
    if(error){
      console.log(error);
    } else {
      response.render("campgrounds/edit", {campground:foundCamp});
    }
  })
});

// UPDATE - Update the campsite information
router.put("/:id", middleware.checkCampsiteOwnership, function(request, response){
  Campground.findByIdAndUpdate(request.params.id, request.body.campground, function(error, editedCamp){
    if(error){
      console.log(error);
      response.render("/campgrounds");
    } else {
      response.redirect("/campgrounds/" + request.params.id);
    }
  });
});

// DESTROY - Delete a campsite
router.delete("/:id", middleware.checkCampsiteOwnership, function(request, repsonse){
  Campground.findByIdAndRemove(request.params.id, function(error, deletedCamp){
    if(error){
      response.redirect("/campgrounds");
    } else {
      repsonse.redirect("/campgrounds");
    }
  });
});

module.exports = router;
