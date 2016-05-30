var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  created:{
    type: Date,
    default: Date.now
  }
});

// ADDS THE METHODS FOR USER AUTH
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
