var express = require("express")
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//============================
// COMMENTS ROUTES
//============================
router.get("/new", middleware.isLoggedIn, function(request, response){
  console.log(request.params.id);
  Campground.findById(request.params.id, function(error, campground){
    if(error){
      console.log(error);
    } else {
      console.log(campground);
      response.render("comments/new", {campground:campground});
    }
  });
});

router.post("/", middleware.isLoggedIn, function(request, response){
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
          comment.author.username = request.user.username;
          comment.author.id = request.user._id;
          comment.save();
          console.log(comment);
          campground.comments.push(comment);
          campground.save();
          // redirect to the campground page
          response.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  })
});

// EDIT - Edit comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(request, response){
  Comment.findById(request.params.comment_id, function(error, foundComment){
    if(error){
      console.log(error);
      response.redirect("back");
    } else {
      response.render("comments/edit", {campground_id: request.params.id, comment: foundComment})
    }
  })
});

router.put("/:comment_id", middleware.checkCommentOwnership, function(request, response){
  Comment.findByIdAndUpdate(request.params.comment_id, request.body.comment, function(error, updatedComment){
    if(error){
      console.log(error);
      response.redirect("back");
    } else {
      response.redirect("/campgrounds/" + request.params.id);
    }
  });
})

router.delete("/:comment_id", middleware.checkCommentOwnership, function(request, response){
  Comment.findByIdAndRemove(request.params.comment_id, function(error){
    if(error){
      response.redirect("back");
    } else {
      response.redirect("back");
    }
  })
});

module.exports = router;
