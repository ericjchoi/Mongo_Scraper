var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");

// create router for the app
var router = express.Router();

// Require all models
var db = require("../models");

// Initialize Express
/////////////////////////////var app = express();

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
            // Add new headlines only
            if (result.headline !== "" && result.summary !== "") {
                db.Article.findOne({ headline: result.headline }, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (data === null) {
                            db.Article.create(result)
                                .then(function (dbArticle) {
                                    // View the added result in the console
                                    console.log(dbArticle);
                                })
                                .catch(function (err) {
                                    // If an error occurred, log it
                                    console.log(err);
                                });
                        }
                    }
                });
            }
        });
        res.send("Scrape completed!");
    });
});

// homepage Route
router.get("/", function (req, res) {
    db.Article.find({ articleSaved: false }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            res.render("homepage", { homepage: true, article: data.map(x => x.toJSON()) });
        }
    });
});

// savedpage Route
router.get("/savedpage", function (req, res) {
    db.Article.find({ articleSaved: true }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.render("savedpage", { homepage: false, article: data.map(x => x.toJSON()) });
        }
    });
});

// save article Route
router.put("/jsonDB/:id", function (req, res) {
    if (req.body.articleSaved) {
        db.Article.updateOne({ _id: req.body._id }, { $set: { articleSaved: true } }, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                return res.send(true);
            }
        });
    }
});

// delete article Route
router.delete("/jsonDB/:id", function (req, res) {
    if (req.params.id) {
        db.Article.deleteOne({ _id: req.params.id }, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                return res.send(true);
            }
        });
    }
});

// clear all articles Route deletes all articles in the database
router.get("/clear", function (req, res) {
    console.log(req.body)
    db.Article.deleteMany({}, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(true);
        }
    })
});

module.exports = router;