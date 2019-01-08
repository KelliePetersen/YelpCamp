const express = require('express'),
router = express.Router(),
Campground = require("../models/campground"),
middleware = require('../middleware');

router.get("/", function (req, res) {
  Campground.find({}, (err, allCampgrounds) => err ? console.log(err) :
    res.render("campgrounds/index", { campgrounds: allCampgrounds }));
});

// CREATE campground
router.post("/", middleware.isLoggedIn, function (req, res) {
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  };
  let newCamp = { name: name, image: image, description: description, author: author };
  Campground.create(newCamp, function (err, newCreation) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// SHOW FORM to create campground
router.get("/new", middleware.isLoggedIn, function (req, res) {
  res.render("campgrounds/new");
});

// SHOW CAMPGROUND information
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

// EDIT campground
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCamp) {
    res.render('campgrounds/edit', {campground: foundCamp});
  });
});

// UPDATE campground
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  })
});

// DESTROY campground
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if(err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect("/campgrounds");
    }
  })
});

module.exports = router;