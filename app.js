var express = require("express");
var app = express();
var campgrounds

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(request,response){
  response.render("landing")
});

app.get("/campgrounds", function(request,response){
  var campgrounds = [
    {name: "Eagle Head", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
    {name: "Owl Head", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
    {name: "Lion Head", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg"}
  ]

  response.render("campgrounds", {campgrounds: campgrounds})
});




app.listen(3000, function(){
  console.log("Nathaniel made me listen...");
});
