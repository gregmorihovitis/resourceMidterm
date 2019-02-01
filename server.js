"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

const queries = require("./db/test-queries.js");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));




// Home page
app.get("/", (req, res) => {

  queries.findAllResources((resources) => {
    res.json(resources);
  });

});

/**************************************************
As a user, I want to be able to see all my resources.
**************************************************/

app.get("/user/resources", (req, res) => {

  queries.findResourceByUserId('userId', (usersResources) => {
    res.json(usersResources);
  });

});

/**************************************************
As a user, I want to be able to see the recources
I have liked.
**************************************************/

app.get("/user/likes", (req, res) => {

  queries.findResourceByUserLikes('userId', (usersLikedResources) => {
    res.json(usersLikedResources);
  });

});

/**************************************************
As a user, I want to be able to see all my user
settings.
**************************************************/

app.get("/settings", (req, res) => {

  queries.findUserById('userId', (usersInfo) => {
    res.json(usersInfo);
  });

});

/**************************************************
As a user, to be able to change my user settings.
**************************************************/

app.put("/settings", (req, res) => {
  res.render("users");
});

/**************************************************
As a user, I want to be able to add new resources.
**************************************************/

app.put("/resources", (req, res) => {

  queries.newResource({url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes',
                       title: 'MDN: Express Tutorials',
                       description: 'A tutorial for using route controlers.',
                       user_id: 1,
                       topic_id: 2,
                       date_posted: '31 Jan 2019',
                       img_url: 'https://mdn.mozillademos.org/files/14456/MVC%20Express.png'});

  res.render("users");

});

/**************************************************
As a user, I want to be click on a resource, and
get more information on it.
**************************************************/

app.get("/resource", (req, res) => {

  queries.findResourceByResourceId('resourceId', (resource) => {
    res.json(resource);
  });

});

/**************************************************
As a user, I want to be able to like a resource.
**************************************************/

app.put("/resource/like", (req, res) => {

  queries.likeResource('userId', 'resourceId');

});

/**************************************************
As a user, I want to rate a resource.
**************************************************/

app.put("/resource/rating", (req, res) => {

  queries.rateResource('rating', 'userId', 'resourceId');

});

/**************************************************
As a user, I want to be able to delete one of my
resources.
**************************************************/

app.delete("/resource", (req, res) => {
  res.render("users");
});

/**************************************************
As a user, I want to be able to edit one of my
resources.
**************************************************/

app.put("/resource/edit", (req, res) => {
  res.render("users");
});

/**************************************************
As a user, I want to be able to comment on a
resource.
**************************************************/

app.put("/resource/comment", (req, res) => {
  res.render("users");
});



// route setup for testing purposes
app.get("/users", (req, res) => {
  res.render("users");
});

// route setup for testing purposes
app.get("/login", (req, res) => {
  res.render("login");
});

app.get('/test', (req, res) => {
  res.render('popTest');
});

app.get("/popTest", (req, res) => {
  queries.findAllResources((popTest) => {
    res.json(popTest);
  });
});


// route setup for testing purposes
app.post("/users", (req, res) => {
  queries.findResourceByResourceId(1, (testData) => {
    console.log('Data Recieved');
    res.redirect(testData[0].url);
  });  
});




app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
