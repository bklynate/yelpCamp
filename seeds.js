var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Sleepy Crest",
    image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg",
    description: "Seek peace and sleep will follow, at Sleepy Crest"
  },
  {
    name: "Lion Grove",
    image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg",
    description: "Find a Roaring good time in this wonderful grove"
  },
  {
    name: "Creek Land",
    image: "https://farm4.staticflickr.com/3686/9702289969_e54a47d7a8.jpg",
    description: "Fishing Glore in the Land of Creeks"
  },
  {
    name: "Burnwell Common",
    image: "https://farm3.staticflickr.com/2524/3875579827_d74d424902.jpg",
    description: "Visit the uncommon wonders of Burnwell Common"
  }
]

 function seedDB(){
//   // remove all campground data from the db
//   Campground.remove({},function(error){
//     if(error){
//       console.log(error);
//     } else {
//       console.log("removed data");
//     }
//   });
//   // seed the db with campground information
//   data.forEach(function(seed){
//     Campground.create(seed, function(error, campground){
//       if(error){
//         console.log(error);
//       } else {
//         console.log("added campground");
//         // Create a comment
//         Comment.create({
//           text: "This is a great place for burgers~!",
//           author: "Bob Belcher"
//         }, function(error, comment){
//           if(error){
//             console.log(error);
//           } else{
//             campground.comments.push(comment)
//             campground.save();
//             console.log("Created a new comment");
//           }
//         });
//       }
//     });
//   });
}

module.exports = seedDB;
