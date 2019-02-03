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

// route setup for testing purposes
app.get("/users", (req, res) => {
  const templateVars = {
    user_id: req.session.id
  }
  res.render("users", templateVars);
});

// route setup for testing purposes
app.get("/settings", (req, res) => {
  const templateVars = {
    user_id: req.session.id
  }
  res.render("settings", templateVars);
});

// route setup for testing purposes
app.get("/resources/new", (req, res) => {
  const templateVars = {
    user_id: req.session.id
  }
  res.render("addNewResource", templateVars);
});

// route setup for testing purposes
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
  // changed to register to test route
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

// route setup for testing purposes -JR PLZ LEAVE
app.get("/resource", (req, res) => {
  queries.findCommentByResourceId(1, (comments) => {
    const templateVars = {
      //   comments: comments
      comments: JSON.stringify(comments),
      user_id: req.session.id
      //just leave comments and remove json.stringify and parenthesis after**********
    }
    // queries.findResourceByUserId(1(resource))
    res.render("resource", templateVars);
  });
});

app.post('/search', (req, res) => {
  console.log('searching: ',req.body.searchTerm);
  const templateVars = {
    user_id: req.session.id,
    search_term: req.body.searchTerm
  }
  res.render('search', templateVars);
});

//added new route for new resources - JR ****


app.get('/popResource/:id', (req, res) => {
  console.log('NOW THIS', req.params.id);
  queries.findResourceByResourceId(req.params.id, (popResource) => {
    console.log(popResource);
    res.json(popResource);
  });
});

// Route for when user clicks on a resource ** -Max - NEW
app.get("/resources/:resourceId", (req, res) => {
  console.log('THIS ONE', req.params.resourceId);
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

// Route for getting to a users information page ** -Max NEW
//doesn't work yet

app.get("/users/:userId", (req, res) => {
  const templateVars = {
    user_id: req.session.id
  }
  queries.findUserById(request.params.userId, (userInfo) => {

    let pageResources = json(userInfo);

    res.render('users', pageResources, templateVars);
  });
});

// Route for getting all of a users resources
// and liked resources                            ** -Max NEW
// app.get("/resources/:userId", (req, res) => {

//   let pageResources = {
//     userResources: {},
//     likedResources: {}
//   };

//   const templateVars = {
//     user_id: req.session.id
//   }


//   queries.findResourceByUserId(request.params.userId, (userResources) => {
//     pageResources.userResources = json(userResources);
//   });

//   queries.findResourceByUserLikes(request.params.userId, (likedResources) => {
//     pageResources.likedResources = json(likedResources);
//   });

//   res.render('index', pageResources, templateVars);

// });

app.get('/popSearch/:searchTerm', (req, res) => {
  console.log(req.params.searchTerm);
  queries.searchResources(req.params.searchTerm, (popSearch) => {
    console.log(popSearch);
    res.json(popSearch);
  });
});

// Route for loggin out a user. ** - Max NEW
app.get("/logout", (req, res) => {
  req.session.id = null;
  res.redirect('/login');
});

// // Route for when user searches recources ** -Max - NEW
// app.post("/search/:searchTerm", (req, res) => {

//   res.json('search', temp)
// });

// route setup for testing purposes
app.post("/users", (req, res) => {
  queries.findResourceByResourceId(req.session.id, (testData) => {
    console.log('Data Recieved');
    res.redirect(testData[0].url);
  });
});

app.post('/login', (req, res) => {
  // let testid = 'testUser';
  req.session.id = req.body.loginHandle;
  console.log(req.session.id);
  res.redirect("/");
});


app.post("/register", (req, res) => {
  req.session.id = req.body.registerHandle;
  queries.newUser(req.session.id);
  console.log('registered');
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

// Route for user liking a resource         ** -Max NEW
app.put('/resources/like', (req, res) => {

  queries.likeResource(req.session.id, resourceId);

});

// Route for user rating a resource       ** -Max

//NEW comment routes - Julia
app.post("/comments", (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ error: 'invalid request: no data in POST body' });
    return;
  }
  //make function that checks if a user is logged in
  // const user = req.body.user ?
  const comment = {
    user: req.body.user,
    text: req.body.text
  }
  //needs to be fixed - only redirects to comments JSON element right now
  res.json(comment)
});

app.post("/resources/:resourceId", (req, res) => {
  console.log('post recieved', req.params.resourceId);
  let urlName = `/resources/${req.params.resourceId}`;
  res.json({ url: urlName });
})



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

