var express = require("express");
var app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
res.render("landing");
});

app.get("/campgrounds", (req, res) => {
var campgrounds = [ 
    {name: "New Symrna Beach", image: "https://ccsearch.creativecommons.org/photos/32b70627-867f-4980-b85f-45b75919b779"},
    {name: "PlayaLinda", image: "https://farm6.staticflickr.com/5542/12121979263_6bfe23485e_b.jpg"}
]
res.render("campgrounds", {campgrounds:campgrounds});
});

app.listen(3000, () => {
	console.log('server listening on port 3000');
});