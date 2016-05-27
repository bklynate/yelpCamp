var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds"),
    Comment = require("./models/comment"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user")

// mongoose.connect(process.env.DATABASEURL);
mongoose.connect("mongodb://localhost/yelpcamp_db_v6");

app.set('port', (process.env.PORT || 3000));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
// seedDB();

//=============================
//=====PASSPORT CONFIG=========
//=============================
app.use(require("express-session")({
  secret: "5674382910",
  resave: false,
  saveUninitialized: false
}));

passport.use(new LocalStrategy(User.authenticate()));
// THEY READ THE SESSION ENCODES AND
// THEN DECODES THE SESSION
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=============================
//=============ROUTES==========
//=============================

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

//============================
// SIGN UP ROUTES
//============================
app.get("/signup", function(request, response){
  response.render("signup");
});

app.post("/signup", function(request, response){
  var newUser = new User({username: request.body.username})
  User.register(newUser, request.body.password, function(error, user){
    if(error){
      console.log(error);
      return response.render("signup");
    }
    passport.authenticate("local")(request, response, function(){
      response.redirect("/campgrounds");
    });
  });
});

// App Begins Listening Here
app.listen(app.get('port'), function(){
  console.log("Nathaniel made me listen...");
});
