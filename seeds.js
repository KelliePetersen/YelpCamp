const mongoose = require("mongoose"),
Campground = require("./models/campground"),
Comment = require("./models/comment");

const data = [
  {
    name: "Cloud's Rest",
    image: "https://vignette.wikia.nocookie.net/battlefordreamisland/images/c/c4/Manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg/revision/latest/scale-to-width-down/1024?cb=20180311032918",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Desert Mesa",
    image: "https://www.rei.com/adventures/assets/adventures/images/trip/core/asia/fta_hero",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Canyon Floor",
    image: "http://camptrend.com/wp-content/uploads/2016/06/Julia-Reflection-Canyon-camptrend.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Blah River",
    image: "http://camptrend.com/wp-content/uploads/2016/01/Plural-Photography-Camping-on-the-Kern-River_CampTrend.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
]

function seedDB() {
  Campground.remove({}, function(err) {
    if(err) {
      console.log(err);
    }
    console.log("removed campgrounds");
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if(err) {
          console.log(err);
        } else {
          console.log("added a campground");
          Comment.create(
            {
              text: "comment comment comment",
              author: "Kellie"
            }, function(err, comment) {
                if(err) {
                  console.log(err);
                } else {
                  campground.comments.push(comment);
                  campground.save();
                  console.log("created new comment");
                }
          });
        }
      })
    })
  });
}

module.exports = seedDB;