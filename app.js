var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose", {useUnifiedTopology: true }); 
var Campground = require("./models/campgrounds"); 
var seedDB = require("./seeds")

seedDB(); 
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true,   useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

//INDEX
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});

//CREATE
app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW 
app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new.ejs"); 
});

// SHOW 
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//===============
//Coment Routes
//===============

app.get("/campgrounds/:id/comments/new", function(req, res){
res.render("comments/new")
});

app.listen(3000, () => {
	console.log('server listening on port 3000');
});