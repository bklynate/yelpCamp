var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelpcamp_db");
// SCHEMA SET UP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//   name: "Lion Head",
//   image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg"
// },function(error,campground){
//   if(error){
//     console.log("Error: Something farted...");
//   } else {
//     console.log(campground);
//   }
// });

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(request, response){
  response.render("landing")
});

app.get("/campgrounds", function(request, response){
  var campgrounds = Campground.find({}, function(error, campgrounds){
    if(error){
      console.log(error);
    } else {
      response.render("campgrounds", {campgrounds: campgrounds})
    }
  });
});

app.post("/campgrounds", function(request, response){
  var campgroundName = request.body.campgroundName
  var image = request.body.image
  var newCampground = {name: campgroundName, image: image};
  campgrounds.push(newCampground);
  response.redirect("/campgrounds")
});

app.get("/campgrounds/new", function(request, response){
  response.render("new")
});

// App Begins Listening Here
app.listen(3000, function(){
  console.log("Nathaniel made me listen...");
});
