var express = require("express");
var logger = require("morgan");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Make public a static folder
app.use(express.static("public"));

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them
var routes = require("./controllers/routeController.js");
app.use(routes);


// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});