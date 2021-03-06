const express = require("express"),
  router = express.Router({ mergeParams: true }),
  Campground = require("../models/campground"),
  Comment = require("../models/comment"),
  middleware = require("../middleware");

// GET COMMENT FORM
router.get("/new", middleware.isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err || !campground) {
      req.flash('error', 'Campground not found.');
      res.redirect('back');
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

// POST COMMENT
router.post("/", middleware.isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
      req.flash("error", "Something went wrong when attempting to add your comment.");
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          req.flash("error", "Your comment has been added.");
          res.redirect(`/campgrounds/${campground._id}`);
        }
      });
    }
  });
});

// EDIT COMMENT
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err || !foundCampground) {
      req.flash('error', 'Campground not found.');
      return res.redirect('back');
    }
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if(err) {
        res.redirect('back');
      } else {
        res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
      }
    })
  });
});

// UPDATE COMMENT
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
    if(err) {
      res.redirect('back');
    } else {
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  })
});

// DELETE comment
router.delete('/:comment_id', middleware.checkCommentOwnership, function (req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function (err) {
    if (err) {
      res.redirect('back');
    } else {
      req.flash("success", "Comment deleted.");
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  })
});

module.exports = router;