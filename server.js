"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const cookieSession = require('cookie-session');
const queries = require("./db/knex-queries.js");

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

app.use(cookieSession({
  name: 'id',
  keys: ['key1']
}));


// Home page
app.get("/", (req, res) => {
  const templateVars = {
    user_id: req.session.id
  }
  res.render("index", templateVars);
});

app.get("/users", (req, res) => {
  const templateVars = {
    user_id: req.session.id
  }
  res.render("users", templateVars);
});

app.get("/settings", (req, res) => {
  const templateVars = {
    user_id: req.session.id
  }
  res.render("settings", templateVars);
});

// route setup for adding new resources
app.get("/resources/new", (req, res) => {
  const templateVars = {
    user_id: req.session.id
  }
  res.render("addNewResource", templateVars);
});

// route setup for login and registering
app.get("/login", (req, res) => {
  const templateVars = {
    user_id: req.session.id
  }
  res.render("login", templateVars);
});

app.get('/register', (req, res) => {
  const templateVars = {
    user_id: req.session.id
  }
  res.render('register', templateVars);
});

app.get('/test', (req, res) => {
  res.render('popTest');
});

//populate the topics
app.get("/popNeuro", (req, res) => {
  queries.findResourceByTopicId(1, (popNeuro) => {
    res.json(popNeuro);
  });
});

app.get("/popGraphic", (req, res) => {
  queries.findResourceByTopicId(3, (popGraphic) => {
    res.json(popGraphic);
  });
});

app.get("/popOctopus", (req, res) => {
  queries.findResourceByTopicId(2, (popOctopus) => {
    res.json(popOctopus);
  });
});

app.get("/popCreative", (req, res) => {
  queries.findResourceByTopicId(4, (popCreative) => {
    res.json(popCreative);
  });
});

// route setup for testing purposes
app.get("/resource", (req, res) => {
  queries.findCommentByResourceId(1, (comments) => {
    const templateVars = {
      comments: JSON.stringify(comments),
      user_id: req.session.id
    }
    res.render("resource", templateVars);
  });
});

app.post('/search', (req, res) => {
    const templateVars = {
    user_id: req.session.id,
    search_term: req.body.searchTerm
  }
  res.render('search', templateVars);
});

//populateing resources
app.get('/popResource/:id', (req, res) => {
  queries.findResourceByResourceId(req.params.id, (popResource) => {
    res.json(popResource);
  });
});

// Route for when user clicks on a resource
app.get("/resources/:resourceId", (req, res) => {
  const templateVars = {
    user_id: req.session.id,
    resource_id: req.params.resourceId
  }
  res.render('resource', templateVars);
});

app.get("/resources/new", (req, res) => {
  const templateVars = {
    user_id: req.session.id
  }
  res.render('addNewResource', templateVars);
});

//populating search box
app.get('/popSearch/:searchTerm', (req, res) => {
  queries.searchResources(req.params.searchTerm, (popSearch) => {
    res.json(popSearch);
  });
});

// Route for loggin out a user. ** - Max NEW
app.get("/logout", (req, res) => {
  req.session.id = null;
  res.redirect('/login');
});

app.get('/popComments/:id', (req, res) => {
  queries.findCommentByResourceId(req.params.id, (popComments) => {
    res.json(popComments);
  });
});

app.get('/myResource', (req, res) => {
  const templateVars = {
    user_id: req.session.id
  }
  res.render('users', templateVars);
});

app.get('/popMine', (req, res) => {
  queries.findResourceByUserId(req.session.id, (popMine) => {
    res.json(popMine);
  });
});

app.get('/popLiked', (req, res) => {
  queries.findResourceByUserLikes(req.session.id, (popLiked) => {
    res.json(popLiked);
  });
});


// route setup for testing purposes
app.post("/users", (req, res) => {
  queries.updateUserInfo(req.session.id, {name: req.body.newName}, function() {
    res.redirect("/users");
  })
});

app.post('/login', (req, res) => {
  req.session.id = req.body.loginHandle;
  res.redirect("/");
});


app.post("/register", (req, res) => {
  req.session.id = req.body.registerHandle;
  queries.newUser(req.session.id);
  res.redirect("/");
});


// Route for user creating a new resource     ** -Max NEW
app.post("/resources/new", (req, res) => {

  let newResource = {
    url: req.body.url,
    title: req.body.title,
    description: req.body.description,
    user_id: req.session.id,
    topic_id: req.body.topic_id,
    date_posted: req.body.date_posted,
    img_url: req.body.img_url
  };

  queries.newResource(newResource);

  res.redirect('/');
});


// comment routes 
app.post("/comments", (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ error: 'invalid request: no data in POST body' });
    return;
  }
  const comment = {
    resourceId: req.body.id,
    userId: req.session.id,
    comment: req.body.text
  }
  queries.newComment(comment);

  res.redirect(`/resources/${req.body.id}`);
});

//'like' route
app.post("/like", (req, res) => {
  const like = {
    user_id: req.session.id,
    value: req.value
  }

  queries.likeResource(req.session.id, req.body.id)
  res.status(200);
});



app.post("/resources/:resourceId", (req, res) => {
  let urlName = `/resources/${req.params.resourceId}`;
  res.json({ url: urlName });
})



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

