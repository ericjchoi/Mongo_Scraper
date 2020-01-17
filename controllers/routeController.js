var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// create router for the app
var router = express.Router();

// Require all models
var db = require("../models");

// Initialize Express
var app = express();

// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
// DeprecationWarning from using 'mongoose.connect(MONGODB_URI);' resolved
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes

// A GET route for scraping the nytime.com website
router.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.nytimes.com/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        // Now, we grab every h2 within an article tag, and do the following:
        $("article").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.headline = $(element)
                .find("h2")
                .text()
                .trim();
            if ($(element).find("a").attr("href").includes("nytimes.com")) {
                result.url = $(element)
                    .find("a")
                    .attr("href");
            } else {
                result.url = "https://www.nytimes.com" + $(element)
                    .find("a")
                    .attr("href");
            }
            result.summary = $(element)
                .find("p")
                .text()
                .trim();
            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });
        res.send("Scrape completed!");
    });
});

// homepage Route
router.get("/", function (req, res) {
    db.Article.find({ articleSaved: false }, function (err, data) {
        res.render("homepage", { homepage: true, article: data });
    })
});

// savedpage Route
router.get("/savedpage", function (req, res) {
    db.Article.find({ articleSaved: true }, function (err, data) {
        res.render("savedpage", { homepage: false, article: data });
    })
});



// export routes for server.js to use
module.exports = router;