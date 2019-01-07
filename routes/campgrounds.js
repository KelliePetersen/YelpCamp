const express = require('express'),
router = express.Router(),
Campground = require("../models/campground");

router.get("/", function (req, res) {
  Campground.find({}, (err, allCampgrounds) => err ? console.log(err) :
    res.render("campgrounds/index", { campgrounds: allCampgrounds }));
});

router.post("/", function (req, res) {
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let newCamp = { name: name, image: image, description: description };
  Campground.create(newCamp, function (err, newCreation) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

router.get("/new", function (req, res) {
  res.render("campgrounds/new");
});

router.get("/:id", function (req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function (err, foundCamp) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCamp);
      res.render("campgrounds/show", { campground: foundCamp });
    }
  });
});

module.exports = router;