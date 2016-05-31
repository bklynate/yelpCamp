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
    User = require("./models/user"),
    methodOverride = require("method-override")


var commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index"),
    campgroundRoutes = require("./routes/campgrounds")

// mongoose.connect(process.env.DATABASEURL);
mongoose.connect("mongodb://localhost/yelpcamp_db_v6");

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
// seedDB();

//=============================
//=====PASSPORT CONFIG=========
//=============================
app.use(require("express-session")({
  secret: "5674382910",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// THEY READ THE SESSION ENCODES AND
// THEN DECODES THE SESSION
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=============================
//=========MIDDLEWARE==========
//=============================
app.use(function(request, response, next){
  response.locals.currentUser = request.user;
  next();
});

//=============================
//=====IMPORT   ROUTES=========
//=============================
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//=============================
//= App Begins Listening Here =
//=============================
app.listen(app.get('port'), function(){
  console.log("Nathaniel made me listen...");
});
