var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/", function(request, response){
  Campground.find({}, function(error, campgrounds){
    if(error){
      console.log(error);
    } else {
      response.render("campgrounds/index", {campgrounds: campgrounds});
    }
  });
});

router.post("/", isLoggedIn, function(request, response){
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

router.get("/new", isLoggedIn, function(request, response){
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
router.get("/:id/edit", checkCampsiteOwnership, function(request, response){
  Campground.findById(request.params.id, function(error, foundCamp){
    if(error){
      console.log(error);
    } else {
      response.render("campgrounds/edit", {campground:foundCamp});
    }
  })
});

// UPDATE - Update the campsite information
router.put("/:id", checkCampsiteOwnership, function(request, response){
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
router.delete("/:id", checkCampsiteOwnership, function(request, repsonse){
  Campground.findByIdAndRemove(request.params.id, function(error, deletedCamp){
    if(error){
      response.redirect("/campgrounds");
    } else {
      repsonse.redirect("/campgrounds");
    }
  });
});

function isLoggedIn(request, response, next){
  if(request.isAuthenticated()){
    return next();
  }
  response.redirect("/login");
}

function checkCampsiteOwnership(request, response, next){
  // check if request is authenticated
  // if it is authenticated, then check for
  // ownership of the campsite
  if(request.isAuthenticated()){
    Campground.findById(request.params.id, function(error, foundCamp){
      if(error){
        console.log(error);
        response.redirect("back");
      } else if(foundCamp.author.id.equals(request.user._id)) {
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

module.exports = router;
