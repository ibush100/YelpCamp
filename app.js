var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");
var campgrounds = [ 
    {name: "New Symrna Beach", image: "https://ccsearch.creativecommons.org/photos/32b70627-867f-4980-b85f-45b75919b779"},
    {name: "PlayaLinda", image: "https://farm6.staticflickr.com/5542/12121979263_6bfe23485e_b.jpg"}
]

app.get("/", (req, res) => {
res.render("landing");
});

app.get("/campgrounds", (req, res) => {

res.render("campgrounds", {campgrounds:campgrounds});

});

app.post("/campgrounds", (req, res) => {
var name = req.body.name;
var image = req.body.image; 
var newCampGround = {name: name, image: image}
campgrounds.push(newCampGround);
res.redirect("campgrounds"); 

}); 

app.get("/campgrounds/new", (req, res) => {
res.render("new.ejs"); 
});

app.listen(3000, () => {
	console.log('server listening on port 3000');
});