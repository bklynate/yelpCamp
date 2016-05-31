var express = require("express")
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

//=============================
//=============ROUTES==========
//=============================

router.get("/", function(request, response){
  response.render("landing");
});


//============================
// SIGN UP ROUTES
//============================
router.get("/signup", function(request, response){
  response.render("signup");
});

router.post("/signup", function(request, response){
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

//============================
// LOGIN ROUTES
//============================
router.get("/login", function(request, response){
  response.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(request, response){
  // -------------
});

router.get("/logout", function(request, response){
  request.logout();
  response.redirect("/");
});

module.exports = router;
