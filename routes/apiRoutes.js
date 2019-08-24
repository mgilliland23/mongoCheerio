// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        console.log(dbArticle);

        var articlesObj = {
          articles: dbArticle
        };
        res.render("index", articlesObj);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.get("/saved", function(req, res) {
    db.Article.find({ saved: true })
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        console.log(dbArticle);

        var articlesObj = {
          articles: dbArticle
        };
        res.render("saved", articlesObj);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // A GET route for scraping the rising stack website
  app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://blog.risingstack.com/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every article tag, and do the following:
      $("article").each(function(i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("header")
          .children("h1")
          .children("a")
          .text();
        result.content = $(this)
          .children("section")
          .text()
          .trim();
        result.link =
          "https://blog.risingstack.com" +
          $(this)
            .children("header")
            .children("h1")
            .children("a")
            .attr("href");
        result.saved = false;

        //console.log(result);

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });

      // Send a message to the client
      res.send("Scrape Complete");
    });
  });

  // Route for saving an Article
  app.post("/articles/add", function(req, res) {
    var bool;

    // Create a new note and pass the req.body to the entry
    db.Article.update({ _id: req.body.id }, { $set: { saved: true } })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Route for deleting an Article
  app.post("/articles/remove", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Article.update({ _id: req.body.id }, { $set: { saved: false } })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
};
