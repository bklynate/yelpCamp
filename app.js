var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")

// mongoose.connect("mongodb://localhost/yelpcamp_db");

mongoose.connect("mongodb://admin:password@ds017432.mlab.com:17432/heroku_0x90k9m5");


// SCHEMA SET UP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create({
  name: "Lion Head",
  image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg",
  description: "Brave the wilderness of the beautiful 'Lion Head Preservation' "
},function(error,campground){
  if(error){
    console.log("Error: Something farted...");
  } else {
    console.log(campground);
  }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(request, response){
  response.render("landing");
});

app.get("/campgrounds", function(request, response){
  var campgrounds = Campground.find({}, function(error, campgrounds){
    if(error){
      console.log(error);
    } else {
      response.render("index", {campgrounds: campgrounds});
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
  })
});

app.get("/campgrounds/new", function(request, response){
  response.render("new");
});

// SHOW - Show page for each campsite
app.get("/campgrounds/:id", function(request, response){
  var id = request.params.id
  var campground = Campground.findById(id, function(error, foundCamp){
    if(error){
      console.log(error)
    } else {
      response.render("show",{ campground: foundCamp });
    }
  })
})

// App Begins Listening Here
app.listen(3000, function(){
  console.log("Nathaniel made me listen...");
});
