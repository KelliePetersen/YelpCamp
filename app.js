const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      flash = require('connect-flash'),
      Campground = require("./models/campground"),
      Comment = require("./models/comment"),
      seedDB = require("./seeds"),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      methodOverride = require('method-override'),
      User = require('./models/user'),
      campgroundRoutes = require('./routes/campgrounds'),
      commentRoutes = require('./routes/comments'),
      indexRoutes = require('./routes/index');

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());
// seedDB();

app.use(require('express-session')({
  secret: 'I love my ewey',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use(indexRoutes);

app.listen(3000, function() {
  console.log("server has started");
});