var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds"),
    Comment = require("./models/comment")

// mongoose.connect(process.env.DATABASEURL);
mongoose.connect("mongodb://localhost/yelpcamp_db_v3");

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
// seedDB();

app.get("/", function(request, response){
  response.render("landing");
});

app.get("/campgrounds", function(request, response){
  var campgrounds = Campground.find({}, function(error, campgrounds){
    if(error){
      console.log(error);
    } else {
      response.render("campgrounds/index", {campgrounds: campgrounds});
    }
  });
});

app.post("/campgrounds", function(request, response){
  var campgroundName = request.body.campgroundName;
  var image = request.body.image;
  var description = request.body.description;
  var newCampground = {
    name: campgroundName,
    image: image,
    description: description
  };

  Campground.create(newCampground, function(error, newCampground){
    if(error){
      console.log(error);
    } else {
      response.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function(request, response){
  response.render("campgrounds/new");
});

// SHOW - Show page for each campsite
app.get("/campgrounds/:id", function(request, response){
  var id = request.params.id
  Campground.findById(id).populate("comments").exec(function(error, foundCamp){
    if(error){
      console.log(error);
    } else {
      response.render("campgrounds/show", { campground: foundCamp });
    }
  });
});

//============================
// COMMENTS ROUTES
//============================
app.get("/campgrounds/:id/comments/new", function(request, response){
  Campground.findById(request.params.id, function(error,campground){
    if(error){
      console.log(error);
    } else {
      response.render("comments/new", { campground: campground});
    }
  })
});

app.post("/campgrounds/:id/comments", function(request, response){
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

// App Begins Listening Here
app.listen(app.get('port'), function(){
  console.log("Nathaniel made me listen...");
});
