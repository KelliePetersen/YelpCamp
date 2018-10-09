const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA
const campgroundsSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const Campground = mongoose.model("Campground", campgroundsSchema);

// Campground.create({ 
//   name: "Honeydew Farm", 
//   image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
//   description: "A peaceful farmland filled with rolling hills and exciting forests. Sample the rich honey produced here by over 3 million bees!"
//   }, (err, campground) => err ? console.log(err) : console.log(campground));


app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  Campground.find({}, (err, allCampgrounds) => err ? console.log(err) :
  res.render("index", {campgrounds:allCampgrounds}));
});

app.post("/campgrounds", function(req, res) {
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let newCamp = {name: name, image: image, description: description};
  Campground.create(newCamp, function(err, newCreation) {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id, function(err, foundCamp) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", {campground: foundCamp});
    }
  });
});

app.listen(3000, function() {
  console.log("server has started");
});




// let campgrounds = [
//   { name: "Snowy Mountains", image: "https://images.pexels.com/photos/176381/pexels-photo-176381.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" },
//   { name: "Ravenwood", image: "https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" },
//   { name: "White River Creek", image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" },
//   { name: "Big Mountain", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" }
// ];